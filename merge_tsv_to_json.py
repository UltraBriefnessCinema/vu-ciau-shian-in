#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
把一个文件夹中的所有 tsv 合并转换为数据库可导入的 JSON 文件。

用法:
    python3 merge_tsv_to_json.py <tsv文件夹> [输出json路径]

默认输出到 <文件夹>/<文件夹名>_merged.json。

输出结构（与参考文件 03_database/json/20220814_database_vocabulary_v1.json 同款）:
    每行一个独立、完整的 JSON 对象；行间【没有逗号】、【没有外层数组括号】:
    {"vocabulary":"挨(挨)","originalEntry":"挨",...,"updated_at":"2026-..."}
    {"vocabulary":"挨一挨二",...}
    - 键为表头列名，顺序与 tsv 一致；使用紧凑分隔符（冒号/逗号后无空格）。
    - 值为 "true"/"false" 的字段输出为布尔值 true/false（与参考文件 toggle 一致），
      其余值保持字符串（TSV 本身无类型信息），空单元格输出 ""。
    - 编码 utf-8（无 BOM），中文原样输出不转义（ensure_ascii=False）。

约定与保护:
    - 每个 tsv 第一行为表头，且所有文件表头必须完全一致；
      不一致直接报错中止并列出差异，避免把不同结构的表错误并到一起。
    - 每行补齐/截断到表头列数，防脏行。
    - 写完后自检：每一行都必须能独立 json.loads 成对象，任何一行失败即报错。
"""
import os
import sys
import json
import glob


def to_value(s):
    """TSV 字段 -> JSON 值。true/false 转布尔，其余保持字符串。"""
    if s == "true":
        return True
    if s == "false":
        return False
    return s


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    folder = sys.argv[1].rstrip("/").rstrip(os.sep) or "."
    if not os.path.isdir(folder):
        sys.exit(f"错误: 不是文件夹: {folder}")
    name = os.path.basename(folder)
    out = sys.argv[2] if len(sys.argv) > 2 else os.path.join(folder, f"{name}_merged.json")

    files = sorted(glob.glob(os.path.join(folder, "*.tsv")))
    if not files:
        sys.exit(f"错误: {folder} 下没有找到 .tsv 文件")

    # ---- 表头一致性检查 ----
    header = None
    mismatch = []
    for p in files:
        with open(p, encoding="utf-8") as f:
            line = f.readline().rstrip("\n")
        h = line.split("\t") if line else None
        if h is None:
            mismatch.append((p, "空文件"))
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
            with open(p, encoding="utf-8") as f:
                f.readline()  # 跳过各片表头
                for line in f:
                    row = line.rstrip("\n").split("\t")
                    if len(row) < n:
                        row += [""] * (n - len(row))
                    rec = {k: to_value(v) for k, v in zip(header, row[:n])}
                    fo.write(json.dumps(rec, ensure_ascii=False, separators=(",", ":")) + "\n")
                    cnt += 1
            per_file.append((os.path.basename(p), cnt))
            total += cnt

    # ---- 自检：每行必须独立可解析（导入器就是逐行读的） ----
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
    print(f"输入 {len(files)} 个 tsv（列数 {n}）:")
    for fn, c in per_file:
        print(f"  {fn}: {c} 数据行")
    print(f"合并完成 -> {out}")
    print(f"共 {total} 行（每行一个独立 JSON 对象，无逗号分隔）")
    print("格式自检: 逐行 json.loads 全部通过 ✓（与参考导入文件格式一致）")


if __name__ == "__main__":
    main()
