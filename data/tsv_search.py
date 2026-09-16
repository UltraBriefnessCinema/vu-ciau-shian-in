#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
TSV 搜索工具（tkinter GUI，只读，不改任何数据文件）

功能:
  扫描脚本所在目录下各子目录的分片 tsv（每个子目录视为一张表），
  跨分片搜索关键字，给出命中的 分片文件 + 行号；双击结果弹出整行内容。

用法:  python3 tsv_search.py
"""
import os
import sys
import glob
import tkinter as tk
from tkinter import ttk, messagebox

if getattr(sys, "frozen", False):
    # PyInstaller 打包后，以 exe 所在目录为数据根目录
    DATA_ROOT = os.path.dirname(os.path.abspath(sys.executable))
else:
    DATA_ROOT = os.path.dirname(os.path.abspath(__file__))
MAX_DISPLAY = 2000  # 结果列表最多显示条数

IS_WINDOWS = sys.platform == "win32"
UI_FONT_FAMILY = "宋体" if IS_WINDOWS else "PingFang SC"


# ---------------- 核心逻辑 ----------------

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


def iter_rows(files, header_len):
    """逐分片产出 (文件路径, 文件内行号, 字段列表)。行号含表头: 首条数据行=2。"""
    for path in files:
        with open(path, encoding="utf-8") as f:
            f.readline()  # 表头
            for lineno, line in enumerate(f, start=2):
                fields = line.rstrip("\n").split("\t")
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


# ---------------- GUI ----------------

class App:
    def __init__(self, root):
        self.root = root
        root.title(f"TSV 搜索 — {DATA_ROOT}")
        root.geometry("1080x640")
        self.tables = {}
        self.header = []
        self.results = []
        self._build()
        self.refresh_tables()

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

        listf = ttk.Frame(self.root)
        listf.pack(fill="both", expand=True, padx=8, pady=4)
        self.tree = ttk.Treeview(
            listf, columns=("file", "row", "c0", "c1", "hits"), show="headings", height=22)
        for cid, text, w, anchor in (
                ("file", "分片文件", 200, "w"), ("row", "文件行号(数据行)", 140, "center"),
                ("c0", "列1", 240, "w"), ("c1", "列2", 240, "w"), ("hits", "命中列", 180, "w")):
            self.tree.heading(cid, text=text)
            self.tree.column(cid, width=w, anchor=anchor)
        sb = ttk.Scrollbar(listf, command=self.tree.yview)
        self.tree.configure(yscrollcommand=sb.set)
        self.tree.pack(side="left", fill="both", expand=True)
        sb.pack(side="right", fill="y")
        self.tree.bind("<Double-1>", lambda e: self.show_detail())

        self.status = ttk.Label(self.root, text="就绪（只读工具，不会修改数据）", anchor="w", relief="sunken")
        self.status.pack(fill="x", side="bottom")

    def refresh_tables(self):
        self.tables = scan_tables(DATA_ROOT)
        names = list(self.tables)
        self.table_cb["values"] = names
        if names and self.table_cb.get() not in names:
            self.table_cb.current(0)
            self.on_table_change()
        self.stat.config(text=f"发现 {len(names)} 张表")

    def on_table_change(self):
        files = self.tables[self.table_cb.get()]
        self.header = read_header(files[0])
        self.col_cb["values"] = ["(全部列)"] + self.header
        self.col_cb.current(0)
        self.tree.delete(*self.tree.get_children())
        self.results = []

    def col_choice(self):
        v = self.col_cb.get()
        return None if v == "(全部列)" else self.header.index(v)

    def do_search(self):
        if not self.tables:
            return
        kw = self.kw.get().strip()
        if not kw:
            messagebox.showwarning("提示", "请输入关键字")
            return
        name = self.table_cb.get()
        files = self.tables[name]
        ci = self.col_choice()
        self.tree.delete(*self.tree.get_children())
        self.results = []
        truncated = False
        for path, lineno, fields, hits in search(files, kw, ci, self.case_var.get()):
            self.results.append((path, lineno, fields, hits))
            self.tree.insert("", "end", iid=str(len(self.results) - 1), values=(
                os.path.basename(path), f"{lineno}（数据行 {lineno - 1}）",
                fields[0][:60], fields[1][:60] if len(fields) > 1 else "",
                "、".join(hits[:4])))
            if len(self.results) >= MAX_DISPLAY:
                truncated = True
                break
        msg = f"表「{name}」共 {len(files)} 个分片，命中 {len(self.results)} 条"
        if truncated:
            msg += f"（已截断，仅显示前 {MAX_DISPLAY} 条）"
        self.stat.config(text=msg)
        self.status.config(text=msg)

    def show_detail(self):
        sel = self.tree.selection()
        if not sel:
            return
        path, lineno, fields, hits = self.results[int(sel[0])]
        win = tk.Toplevel(self.root)
        win.title(f"{os.path.basename(path)} 第 {lineno} 行（数据行 {lineno - 1}）")
        win.geometry("760x520")
        text = tk.Text(win, wrap="word", font=(UI_FONT_FAMILY, 13))
        sb = ttk.Scrollbar(win, command=text.yview)
        text.configure(yscrollcommand=sb.set)
        sb.pack(side="right", fill="y")
        text.pack(fill="both", expand=True)
        text.insert("end", f"文件: {path}\n行号: {lineno}（数据行 {lineno - 1}）\n")
        text.insert("end", f"命中列: {'、'.join(hits)}\n\n")
        for h, v in zip(self.header, fields):
            mark = " ◀ 命中" if h in hits else ""
            text.insert("end", f"{h}{mark}: {v}\n")
        text.config(state="disabled")


def main():
    root = tk.Tk()
    try:
        from tkinter import font as tkfont
        default = tkfont.nametofont("TkDefaultFont")
        if IS_WINDOWS:
            default.configure(family=UI_FONT_FAMILY, size=13)
        else:
            default.configure(size=13)
        # 让所有 ttk/tk 控件默认字体同步为宋体
        root.option_add("*Font", default)
    except Exception:
        pass
    App(root)
    root.mainloop()


if __name__ == "__main__":
    main()
