#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
把一个文件夹中的所有 xlsx 合并转换为数据库可导入的 JSON 文件。

用法:
    python3 merge_xlsxs_to_json.py <xlsx文件夹> [输出json路径]

默认输出到 <文件夹>/<文件夹名>_merged.json。

输出结构（与参考文件 03_database/json/20220814_database_vocabulary_v1.json 同款）:
    每行一个独立、完整的 JSON 对象；行间【没有逗号】、【没有外层数组括号】:
    {"vocabulary":"挨(挨)","originalEntry":"挨",...,"updated_at":"2026-..."}
    {"vocabulary":"挨一挨二",...}
    - 键为表头列名，顺序与 xlsx 一致；使用紧凑分隔符（冒号/逗号后无空格）。
    - 值为 True/False 或 "true"/"false" 的字段输出为布尔值 true/false，
      其余值保持字符串/数值，空单元格输出 ""。
    - 编码 utf-8（无 BOM），中文原样输出不转义（ensure_ascii=False）。

约定与保护:
    - 自动忽略 Excel 临时锁文件（~$ 开头）。
    - 默认读取各 xlsx 文件的第一个工作表（Active Sheet）。
    - 每个 xlsx 第一行为表头，且所有文件表头必须完全一致；
      不一致直接报错中止并列出差异，避免把不同结构的表错误并到一起。
    - 自动跳过纯空行，每行补齐/截断到表头列数，防脏行。
    - 写完后自检：每一行都必须能独立 json.loads 成对象，任何一行失败即报错。
"""
import os
import sys
import json
import glob
from datetime import date, datetime

try:
    import openpyxl
except ImportError:
    sys.exit("错误: 缺少 openpyxl 依赖。请先运行: pip install openpyxl")


def to_value(v):
    """Excel 单元格值 -> JSON 值。true/false 转布尔，None 转空串，其余转为合适格式。"""
    if v is None:
        return ""
    if isinstance(v, bool):
        return v
    if isinstance(v, (datetime, date)):
        return v.isoformat()
    # 针对 Excel 常见问题：把整数字符或数字存成了浮点型（如 123.0）
    if isinstance(v, float) and v.is_integer():
        return str(int(v))
    
    s = str(v).strip()
    if s.lower() == "true":
        return True
    if s.lower() == "false":
        return False
    return s


def read_first_row(path):
    """读取 xlsx 文件的首行作为表头（自动截掉末尾的空白单元格）"""
    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    ws = wb.active
    first_row = next(ws.iter_rows(values_only=True), None)
    wb.close()
    if not first_row:
        return None
    
    header = [str(c).strip() if c is not None else "" for c in first_row]
    # 截断 Excel 末尾可能存在的空白列
    while header and header[-1] == "":
        header.pop()
    return header if header else None


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    folder = sys.argv[1].rstrip("/").rstrip(os.sep) or "."
    if not os.path.isdir(folder):
        sys.exit(f"错误: 不是文件夹: {folder}")
    name = os.path.basename(folder)
    out = sys.argv[2] if len(sys.argv) > 2 else os.path.join(folder, f"{name}_merged.json")

    # 过滤掉 Excel 生成的临时锁文件（~$ 开头）
    files = sorted([
        p for p in glob.glob(os.path.join(folder, "*.xlsx"))
        if not os.path.basename(p).startswith("~$")
    ])
    if not files:
        sys.exit(f"错误: {folder} 下没有找到 .xlsx 文件")

    # ---- 表头一致性检查 ----
    header = None
    mismatch = []
    for p in files:
        h = read_first_row(p)
        if h is None:
            mismatch.append((p, "空文件或无表头"))
            continue
        if header is None:
            header = h
        elif h != header:
            mismatch.append((p, "、".join(h)))
    if mismatch:
        print("错误: 以下文件表头与首个文件不一致，已中止:")
        for p, why in mismatch:
            print("  ", os.path.basename(p), "->", why)
        sys.exit(2)
    n = len(header)

    # ---- 合并写出：每行一个对象，无逗号、无外层数组 ----
    total = 0
    per_file = []
    with open(out, "w", encoding="utf-8") as fo:
        for p in files:
            cnt = 0
            wb = openpyxl.load_workbook(p, read_only=True, data_only=True)
            ws = wb.active
            rows_iter = ws.iter_rows(values_only=True)
            
            # 跳过表头行
            next(rows_iter, None)

            for row in rows_iter:
                # 忽略整行都是空值的脏行
                if not row or all(c is None or str(c).strip() == "" for c in row):
                    continue

                # 补齐或截断到表头列数
                row_list = list(row[:n])
                if len(row_list) < n:
                    row_list += [None] * (n - len(row_list))

                rec = {k: to_value(v) for k, v in zip(header, row_list)}
                fo.write(json.dumps(rec, ensure_ascii=False, separators=(",", ":")) + "\n")
                cnt += 1

            wb.close()
            per_file.append((os.path.basename(p), cnt))
            total += cnt

    # ---- 自检：每行必须独立可解析 ----
    bad = 0
    with open(out, encoding="utf-8") as f:
        for i, line in enumerate(f, 1):
            try:
                obj = json.loads(line)
                assert isinstance(obj, dict) and len(obj) == n
            except Exception:
                bad += 1
                if bad <= 3:
                    print(f"  警告: 第 {i} 行解析失败: {line[:80]}")
    if bad:
        print(f"格式自检失败: {bad} 行异常!")
        sys.exit(3)

    size_mb = os.path.getsize(out) / 1024 / 1024
    print(f"输入 {len(files)} 个 xlsx（列数 {n}）:")
    for fn, c in per_file:
        print(f"  {fn}: {c} 数据行")
    print(f"合并完成 -> {out} ({size_mb:.2f} MB)")
    print(f"共 {total} 行（每行一个独立 JSON 对象，无逗号分隔）")
    print("格式自检: 逐行 json.loads 全部通过 ✓（与参考导入文件格式一致）")


if __name__ == "__main__":
    main()