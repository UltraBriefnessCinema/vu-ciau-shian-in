#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
把一个文件夹中的所有 tsv 合并为一个大的 tsv。

用法:
    python3 merge_tsv.py <tsv文件夹> [输出tsv路径]

默认输出到 <文件夹>/<文件夹名>_all.tsv。

约定与保护:
    - 每个 tsv 第一行为表头；所有文件表头必须完全一致才合并，
      不一致直接报错中止并列出差异文件，避免把不同结构的表错误拼到一起。
    - 输出文件只保留一份表头（来自首个文件），其余文件跳过各自表头行。
    - 文件按名称排序拼接（part01、part02… 自然有序）。
    - 行内容原样透传，不做任何转义或格式转换。
    - 输出文件本身（如 _all.tsv）会被自动排除在输入之外，重复运行结果稳定。
    - 若指定 --check，合并前先逐行校验各文件列数是否与表头一致。
"""
import os
import sys
import glob


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    folder = sys.argv[1].rstrip("/").rstrip(os.sep) or "."
    if not os.path.isdir(folder):
        sys.exit(f"错误: 不是文件夹: {folder}")
    name = os.path.basename(folder)
    args = [a for a in sys.argv[2:] if not a.startswith("--")]
    out = args[0] if args else os.path.join(folder, f"{name}_all.tsv")

    out_abs = os.path.abspath(out)
    files = [p for p in sorted(glob.glob(os.path.join(folder, "*.tsv")))
             if os.path.abspath(p) != out_abs]  # 输出文件自身不算输入，可重复运行
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
    check = "--check" in sys.argv[2:] or "--check" in sys.argv[1:2]

    if check:
        bad_rows = []
        for p in files:
            with open(p, encoding="utf-8") as f:
                f.readline()
                for i, line in enumerate(f, 2):
                    if not line.strip():
                        continue
                    if len(line.rstrip("\n").split("\t")) != n:
                        bad_rows.append((os.path.basename(p), i))
        if bad_rows:
            print(f"错误: --check 发现 {len(bad_rows)} 行列数与表头({n}列)不符，已中止。前5处:")
            for fn, ln in bad_rows[:5]:
                print(f"   {fn} 第 {ln} 行")
            sys.exit(4)
        print(f"--check 通过: {len(files)} 个文件共 {n} 列，无脏行")

    # ---- 拼接: 写一份表头，各文件跳过表头后原样透传 ----
    total = 0
    per_file = []
    with open(out, "w", encoding="utf-8") as fo:
        fo.write("\t".join(header) + "\n")
        for p in files:
            cnt = 0
            with open(p, encoding="utf-8") as f:
                f.readline()  # 跳过表头
                for line in f:
                    if not line.strip():
                        continue  # 跳过空行
                    if not line.endswith("\n"):
                        line += "\n"
                    fo.write(line)
                    cnt += 1
            per_file.append((os.path.basename(p), cnt))
            total += cnt

    size_mb = os.path.getsize(out) / 1024 / 1024
    print(f"输入 {len(files)} 个 tsv（列数 {n}）:")
    for fn, c in per_file:
        print(f"  {fn}: {c} 数据行")
    print(f"合并完成 -> {out}")
    print(f"共 {total} 数据行 + 1 表头行，文件大小 {size_mb:.1f} MB")


if __name__ == "__main__":
    main()
