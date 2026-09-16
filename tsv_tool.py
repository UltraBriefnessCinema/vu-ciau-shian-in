#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
TSV 数据管理工具（tkinter GUI）

功能:
  1. 扫描 data/ 下各子目录的分片 tsv（每个子目录视为一张逻辑表）
  2. 跨分片搜索关键字，给出命中的 文件 + 行号
  3. 选中结果可直接编辑字段并写回原文件，保存时自动刷新 updated_at 列
  4. 选择某一列排序，整表重新生成（规则: 每片 ≤10000 数据行，带表头）；
     重新生成前旧分片自动备份到 _backup_时间戳/ 子目录

用法:  python3 tsv_tool.py    （脚本放在 data/ 目录下，自动以所在目录为数据根）
"""
import os
import re
import sys
import glob
import shutil
import datetime
import tkinter as tk
from tkinter import ttk, messagebox

MAX_ROWS = 10_000
DATA_ROOT = os.path.dirname(os.path.abspath(__file__))
DIRTY = re.compile(r"[\t\r\n]+")


# ---------------- 核心逻辑（不依赖 GUI，方便单独测试） ----------------

def scan_tables(root):
    """root 下每个含 tsv 的子目录是一张表。返回 {表名: [分片路径, ...]}"""
    tables = {}
    for name in sorted(os.listdir(root)):
        d = os.path.join(root, name)
        if not os.path.isdir(d) or name.startswith("_"):
            continue
        files = sorted(glob.glob(os.path.join(d, "*.tsv")))
        if files:
            tables[name] = files
    return tables


def read_header(path):
    with open(path, encoding="utf-8") as f:
        return f.readline().rstrip("\n").split("\t")


def parse_line(line):
    return line.rstrip("\n").split("\t")


def clean(s):
    return DIRTY.sub(" ", s)


def iter_rows(files, header_len):
    """逐分片产出 (文件路径, 文件内行号, 字段列表)。行号含表头: 首条数据行=2。"""
    for path in files:
        with open(path, encoding="utf-8") as f:
            f.readline()  # 表头
            for lineno, line in enumerate(f, start=2):
                fields = parse_line(line)
                if len(fields) < header_len:
                    fields += [""] * (header_len - len(fields))
                yield path, lineno, fields[:header_len]


def search(files, keyword, col_index, case_sensitive):
    """在整表所有分片中搜索。col_index=None 表示全列。产出 (file, lineno, fields, 命中列名)。"""
    header = read_header(files[0])
    kw = keyword if case_sensitive else keyword.lower()
    for path, lineno, fields in iter_rows(files, len(header)):
        hits = []
        for i, val in enumerate(fields):
            if col_index is not None and i != col_index:
                continue
            v = val if case_sensitive else val.lower()
            if kw in v:
                hits.append(header[i])
        if hits:
            yield path, lineno, fields, hits


def write_line(path, lineno, fields):
    """把某文件第 lineno 行原地替换（整文件重写，1~2MB 分片耗时可忽略）。"""
    with open(path, encoding="utf-8") as f:
        lines = f.read().splitlines()
    lines[lineno - 1] = "\t".join(fields)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lines) + "\n")


def now_iso():
    return datetime.datetime.now().astimezone().isoformat(timespec="seconds")


def sort_key(col_values):
    """整列排序键：全数值列按数字排，否则按去噪字符串排；空值垫底。"""
    def conv(v):
        s = v.strip()
        if s == "":
            return (2, 0.0, "")
        try:
            return (0, float(s), "")
        except ValueError:
            return (1, 0.0, s.casefold())
    return conv


def regenerate(outdir, header, rows):
    """按 MAX_ROWS 一片重写分片；旧分片先移到 _backup_时间戳/。返回新文件名列表。"""
    stamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    backup = os.path.join(outdir, f"_backup_{stamp}")
    os.makedirs(backup, exist_ok=True)
    moved = 0
    for p in sorted(glob.glob(os.path.join(outdir, "*.tsv"))):
        shutil.move(p, os.path.join(backup, os.path.basename(p)))
        moved += 1
    base = next(iter(glob.glob(os.path.join(backup, "*.tsv"))), None)
    prefix = re.sub(r"_part\d+$", "", os.path.splitext(os.path.basename(base))[0]) if base else "table"

    header_tsv = "\t".join(header) + "\n"
    written, names = [], []
    part = 0
    fh = None
    for i, fields in enumerate(rows):
        if i % MAX_ROWS == 0:
            if fh:
                fh.close()
            part += 1
            fname = f"{prefix}_part{part:02d}.tsv"
            fh = open(os.path.join(outdir, fname), "w", encoding="utf-8", newline="\n")
            fh.write(header_tsv)
            names.append(fname)
        fh.write("\t".join(fields) + "\n")
        written.append(fields)
    if fh:
        fh.close()
    assert len(written) == len(rows)
    return names, moved, backup


# ---------------- GUI ----------------

class App:
    def __init__(self, root):
        self.root = root
        root.title(f"TSV 数据管理工具 — {DATA_ROOT}")
        root.geometry("1180x720")
        self.tables = {}
        self.cur_table = None
        self.results = []          # [(file, lineno, fields, hits)]
        self.selected = None       # 正在编辑的 (表名, file, lineno, fields)
        self.entries = {}
        self._build()
        self.refresh_tables()

    # ---- 布局 ----
    def _build(self):
        top = ttk.Frame(self.root, padding=8)
        top.pack(fill="x")
        ttk.Label(top, text="数据表:").pack(side="left")
        self.table_cb = ttk.Combobox(top, width=24, state="readonly")
        self.table_cb.pack(side="left", padx=4)
        self.table_cb.bind("<<ComboboxSelected>>", lambda e: self.on_table_change())
        ttk.Button(top, text="重新扫描", command=self.refresh_tables).pack(side="left", padx=4)

        sf = ttk.Frame(self.root, padding=(8, 0, 8, 8))
        sf.pack(fill="x")
        ttk.Label(sf, text="关键字:").pack(side="left")
        self.kw = ttk.Entry(sf, width=36)
        self.kw.pack(side="left", padx=4)
        self.kw.bind("<Return>", lambda e: self.do_search())
        ttk.Label(sf, text="搜索列:").pack(side="left")
        self.col_cb = ttk.Combobox(sf, width=16, state="readonly")
        self.col_cb.pack(side="left", padx=4)
        self.case_var = tk.BooleanVar(value=False)
        ttk.Checkbutton(sf, text="区分大小写", variable=self.case_var).pack(side="left", padx=8)
        ttk.Button(sf, text="搜索", command=self.do_search).pack(side="left", padx=4)
        self.stat = ttk.Label(sf, text="")
        self.stat.pack(side="left", padx=10)

        panes = ttk.PanedWindow(self.root, orient="vertical")
        panes.pack(fill="both", expand=True, padx=8, pady=4)

        listf = ttk.Frame(panes)
        panes.add(listf, weight=3)
        self.tree = ttk.Treeview(
            listf, columns=("file", "row", "c0", "c1", "hits"), show="headings", height=14)
        for cid, text, w, anchor in (
                ("file", "分片文件", 210, "w"), ("row", "文件行号(数据行)", 130, "center"),
                ("c0", "列1", 220, "w"), ("c1", "列2", 220, "w"), ("hits", "命中列", 180, "w")):
            self.tree.heading(cid, text=text)
            self.tree.column(cid, width=w, anchor=anchor)
        sb = ttk.Scrollbar(listf, command=self.tree.yview)
        self.tree.configure(yscrollcommand=sb.set)
        self.tree.pack(side="left", fill="both", expand=True)
        sb.pack(side="right", fill="y")
        self.tree.bind("<<TreeviewSelect>>", lambda e: self.load_editor())

        bottom = ttk.Notebook(panes)
        panes.add(bottom, weight=2)

        # 编辑页
        ef = ttk.Frame(bottom)
        bottom.add(ef, text="编辑选中行（保存自动更新 updated_at）")
        form = ttk.Frame(ef)
        form.pack_forget()
        self.form_frame = form
        bar = ttk.Frame(ef)
        bar.pack(side="bottom", fill="x", pady=6)
        self.loc_lbl = ttk.Label(bar, text="未选中记录")
        self.loc_lbl.pack(side="left", padx=8)
        ttk.Button(bar, text="保存修改", command=self.save_current).pack(side="right", padx=8)
        ttk.Button(bar, text="刷新为文件当前值", command=self.load_editor).pack(side="right")
        self.form_scroll = ttk.Frame(ef)
        self.form_scroll.pack(fill="both", expand=True)

        # 排序页
        rf = ttk.Frame(bottom)
        bottom.add(rf, text="按列排序并重新生成分片")
        row = ttk.Frame(rf, padding=10)
        row.pack(fill="x")
        ttk.Label(row, text="排序列:").pack(side="left")
        self.sort_cb = ttk.Combobox(row, width=16, state="readonly")
        self.sort_cb.pack(side="left", padx=4)
        self.desc_var = tk.BooleanVar(value=False)
        ttk.Radiobutton(row, text="升序", variable=self.desc_var, value=False).pack(side="left", padx=6)
        ttk.Radiobutton(row, text="降序", variable=self.desc_var, value=True).pack(side="left", padx=6)
        ttk.Button(row, text="执行排序并重新生成", command=self.do_sort).pack(side="left", padx=16)
        ttk.Label(rf, foreground="#666", padding=(10, 0),
                  text="规则: 每片 ≤10000 数据行、均带表头；旧分片先备份到 _backup_时间戳/ 再覆盖重写。").pack(fill="x")

        self.status = ttk.Label(self.root, text="就绪", anchor="w", relief="sunken")
        self.status.pack(fill="x", side="bottom")

    # ---- 表切换 ----
    def refresh_tables(self):
        self.tables = scan_tables(DATA_ROOT)
        names = list(self.tables)
        self.table_cb["values"] = names
        if names and self.cur_table not in names:
            self.table_cb.current(0)
            self.on_table_change()
        self.stat.config(text=f"发现 {len(names)} 张表")

    def on_table_change(self):
        self.cur_table = self.table_cb.get()
        files = self.tables[self.cur_table]
        header = read_header(files[0])
        self.header = header
        cols = ["(全部列)"] + header
        self.col_cb["values"] = cols
        self.col_cb.current(0)
        self.sort_cb["values"] = header
        if header:
            self.sort_cb.current(0)
        self.tree.delete(*self.tree.get_children())
        self.results = []

    def col_choice(self):
        v = self.col_cb.get()
        return None if v == "(全部列)" else self.header.index(v)

    # ---- 搜索 ----
    def do_search(self):
        if not self.cur_table:
            return
        kw = self.kw.get().strip()
        if not kw:
            messagebox.showwarning("提示", "请输入关键字")
            return
        self.tree.delete(*self.tree.get_children())
        self.results = []
        ci = self.col_choice()
        for path, lineno, fields, hits in search(self.tables[self.cur_table], kw, ci, self.case_var.get()):
            self.results.append((path, lineno, fields, hits))
            rel = os.path.basename(path)
            self.tree.insert("", "end", iid=str(len(self.results) - 1), values=(
                rel, f"{lineno}（数据行 {lineno - 1}）",
                fields[0][:60], fields[1][:60] if len(fields) > 1 else "",
                "、".join(hits[:4])))
            if len(self.results) >= 2000:
                self.stat.config(text="结果超过 2000 条，已截断显示")
                break
        self.stat.config(text=f"表「{self.cur_table}」共 {len(self.tables[self.cur_table])} 个分片，命中 {len(self.results)} 条")

    # ---- 编辑 ----
    def load_editor(self):
        sel = self.tree.selection()
        if not sel:
            return
        idx = int(sel[0])
        path, lineno, fields, _ = self.results[idx]
        self.selected = [path, lineno, list(fields)]
        self.loc_lbl.config(text=f"{os.path.basename(path)} 第 {lineno} 行（数据行 {lineno - 1}）")
        for w in self.form_scroll.winfo_children():
            w.destroy()
        self.entries = {}
        canvas_frame = ttk.Frame(self.form_scroll)
        canvas_frame.pack(fill="both", expand=True)
        canvas = tk.Canvas(canvas_frame, height=150, highlightthickness=0)
        sb = ttk.Scrollbar(canvas_frame, orient="vertical", command=canvas.yview)
        inner = ttk.Frame(canvas)
        inner.bind("<Configure>", lambda e: canvas.configure(scrollregion=canvas.bbox("all")))
        canvas.create_window((0, 0), window=inner, anchor="nw")
        canvas.configure(yscrollcommand=sb.set)
        canvas.pack(side="left", fill="both", expand=True)
        sb.pack(side="right", fill="y")
        for i, (name, val) in enumerate(zip(self.header, fields)):
            ttk.Label(inner, text=name, width=14).grid(row=i, column=0, sticky="e", padx=(8, 4), pady=1)
            e = ttk.Entry(inner, width=110)
            e.insert(0, val)
            e.grid(row=i, column=1, sticky="we", pady=1)
            self.entries[name] = e
        self.form_scroll.bind_all(
            "<MouseWheel>", lambda ev: canvas.yview_scroll(-ev.delta, "units"))

    def save_current(self):
        if not self.selected:
            messagebox.showwarning("提示", "请先在结果列表中选中一条记录")
            return
        path, lineno, _ = self.selected
        fields = [clean(self.entries[h].get()) for h in self.header]
        if "updated_at" in self.header:
            fields[self.header.index("updated_at")] = now_iso()
        write_line(path, lineno, fields)
        self.results[int(self.tree.selection()[0])][2] = fields
        self.selected[2] = fields
        rel = os.path.basename(path)
        self.tree.item(self.tree.selection()[0], values=(
            rel, f"{lineno}（数据行 {lineno - 1}）",
            fields[0][:60], fields[1][:60] if len(fields) > 1 else "",
            self.tree.item(self.tree.selection()[0])["values"][4]))
        ts = fields[self.header.index("updated_at")] if "updated_at" in self.header else "（无该列）"
        self.status.config(text=f"已写回 {rel} 第 {lineno} 行，updated_at → {ts}")

    # ---- 排序 + 重新生成 ----
    def do_sort(self):
        if not self.cur_table:
            return
        col = self.sort_cb.get()
        if col not in self.header:
            return
        ci = self.header.index(col)
        files = self.tables[self.cur_table]
        rows = [f for _, _, f in iter_rows(files, len(self.header))]
        key = sort_key([f[ci] for f in rows])
        rows.sort(key=lambda f: key(f[ci]), reverse=self.desc_var.get())
        order = "降序" if self.desc_var.get() else "升序"
        d = os.path.dirname(files[0])
        if not messagebox.askyesno(
                "确认", f"将按「{col}」{order}重排表「{self.cur_table}」全部 {len(rows)} 行，\n"
                        f"并覆盖重写 {d} 下的分片（旧分片自动备份）。\n继续？"):
            return
        names, moved, backup = regenerate(d, self.header, rows)
        self.refresh_tables()
        self.on_table_change()
        self.status.config(
            text=f"排序完成：{len(rows)} 行 → {len(names)} 个分片；{moved} 个旧分片已备份到 {os.path.basename(backup)}")


def main():
    if "--selftest" in sys.argv:
        t = scan_tables(DATA_ROOT)
        assert t, "未找到任何表"
        name = sys.argv[sys.argv.index("--selftest") + 1] if len(sys.argv) > sys.argv.index("--selftest") + 1 else next(iter(t))
        hits = list(search(t[name], "陌哩", None, False))[:3]
        print(f"selftest 表={name} 分片={len(t[name])} 命中示例:")
        for p, ln, f, h in hits:
            print(" ", os.path.basename(p), "行", ln, "|", f[0][:30], "|命中列:", h)
        return

    root = tk.Tk()
    try:
        from tkinter import font as tkfont
        base = tkfont.nametofont("TkDefaultFont")
        base.configure(size=13)
    except Exception:
        pass
    App(root)
    root.mainloop()


if __name__ == "__main__":
    main()
