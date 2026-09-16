#該腳本可以將zone_C_characters.txt的字符，導入文件夾中含字體文件包的字形，合併爲一個文件
#做之前cd到根目錄

#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import glob
import tempfile
import shutil
import copy
from tqdm import tqdm
from fontTools.ttLib import TTFont
from fontTools.subset import Subsetter, Options
from fontTools.merge import Merger

# ==================== 配置區 ====================
FONT_FOLDER = "../../05_font"
INPUT_CHARS_FILE = "../zone_C_characters.txt"
OUTPUT_TTF = "chFont.ttf"
MISSING_CHARS_FILE = "missing_chars.txt"
SKIP_WHITESPACE = True

# ==================== 工具函數 ====================

def find_font_files(root_dir):
    """只查找 .ttf 文件，嚴格過濾 .otf"""
    if not os.path.isdir(root_dir):
        return [], []
    
    ttf_files = []
    otf_files = []
    
    for pattern in ("*.ttf", "*.TTF"):
        search_path = os.path.join(root_dir, '**', pattern)
        for file_path in glob.glob(search_path, recursive=True):
            ttf_files.append(os.path.abspath(file_path))
            
    for pattern in ("*.otf", "*.OTF"):
        search_path = os.path.join(root_dir, '**', pattern)
        for file_path in glob.glob(search_path, recursive=True):
            otf_files.append(os.path.abspath(file_path))
            
    return list(set(ttf_files)), list(set(otf_files))

def read_target_characters(filepath):
    char_set = set()
    if not os.path.isfile(filepath):
        return char_set
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
        for char in text:
            if SKIP_WHITESPACE and char.isspace():
                continue
            if len(char) == 1:
                char_set.add(char)
    return char_set

def create_subset_font(source_font_path, chars_text, output_path):
    try:
        font = TTFont(source_font_path)
        options = Options()
        
        # 初始清理
        options.layout_features = []  
        options.name_IDs = ['*']         
        options.name_languages = ['*']
        options.drop_tables += ['DSIG', 'BASE', 'JSTF', 'MATH', 'FFTM', 'gasp', 'VORG']
        
        subsetter = Subsetter(options=options)
        subsetter.populate(text=chars_text)
        subsetter.subset(font)
        font.save(output_path)
        font.close()
        return True
    except Exception as e:
        return str(e)

def get_missing_chars_from_font(font_path, char_set):
    try:
        font = TTFont(font_path)
        cmap = font.getBestCmap()
        missing = {char for char in char_set if ord(char) not in cmap}
        font.close()
        return missing
    except Exception:
        return char_set

# ==================== 主流程 ====================
def main():
    print("=== 字體子集化與合併工具啟動 ===\n")

    if not os.path.isdir(FONT_FOLDER):
        print(f"❌ 錯誤：字體文件夾 '{FONT_FOLDER}' 不存在！")
        return
    if not os.path.isfile(INPUT_CHARS_FILE):
        print(f"❌ 錯誤：找不到 '{INPUT_CHARS_FILE}'！請確保文件在當前目錄。")
        return

    char_set = read_target_characters(INPUT_CHARS_FILE)
    if not char_set:
        print("❌ 錯誤：未在文件中提取到任何有效字符。")
        return
    print(f"✅ 成功讀取並去重，共需提取 {len(char_set)} 個字符。\n")
    chars_text = ''.join(sorted(char_set))

    ttf_files, otf_files = find_font_files(FONT_FOLDER)
    
    if otf_files:
        print(f"⚠️ 警告：發現了 {len(otf_files)} 個 .otf 文件！腳本將自動忽略這些文件。")
    if not ttf_files:
        print(f"❌ 錯誤：在 '{FONT_FOLDER}' 中未找到任何 .ttf 文件！合併終止。")
        return
        
    print(f"✅ 找到待處理的 TTF 字體文件 {len(ttf_files)} 個。\n")

    temp_dir = tempfile.mkdtemp()
    subset_paths = []
    all_missing_per_font = []

    try:
        print("正在生成字體子集並檢測字符涵蓋率...")
        with tqdm(total=len(ttf_files), desc="處理進度", unit="字體") as pbar:
            for font_path in ttf_files:
                font_name = os.path.basename(font_path)
                subset_path = os.path.join(temp_dir, f"subset_{font_name}")
                
                missing = get_missing_chars_from_font(font_path, char_set)
                all_missing_per_font.append(missing)
                
                if len(missing) < len(char_set): 
                    result = create_subset_font(font_path, chars_text, subset_path)
                    if result is True:
                        subset_paths.append(subset_path)
                    else:
                        tqdm.write(f"⚠️ 警告：子集化失敗 '{font_name}' -> {result}")
                else:
                    tqdm.write(f"ℹ️ 提示：跳過 '{font_name}' (不包含任何目標字符)")
                
                pbar.update(1)

        if not subset_paths:
            print("\n❌ 錯誤：沒有成功生成任何子集字體，無法執行合併。")
            return

        # ==================== UPM 檢測與分組 ====================
        print("\n正在檢測字體 UPM 一致性...")
        upm_groups = {}
        for sp in subset_paths:
            try:
                f = TTFont(sp)
                upm = f['head'].unitsPerEm
                f.close()
                if upm not in upm_groups:
                    upm_groups[upm] = []
                upm_groups[upm].append(sp)
            except:
                pass

        best_upm = max(upm_groups.keys(), key=lambda k: len(upm_groups[k]))
        fonts_to_merge = upm_groups[best_upm]

        if len(upm_groups) > 1:
            print(f"⚠️ 警告：發現不同 UPM 規格的字體，將自動選用數量最多的 UPM {best_upm} 進行合併。")
        else:
            print(f"✅ 所有字體的 UPM 均為 {best_upm}，檢查通過。")

        # ==================== 核心！強制統一所有字體的元數據 ====================
        print("\n正在統一所有字體的元數據 (Metadata) 以防止合併崩潰...")
        
        # 這是構成一個有效 TTF 所需的絕對最少核心表
        core_tables = ['cmap', 'glyf', 'head', 'hhea', 'hmtx', 'loca', 'maxp', 'name', 'post', 'OS/2']
        
        # 提取第一款字體的元數據作為「母版」
        master_font = TTFont(fonts_to_merge[0])
        master_name = copy.deepcopy(master_font.get('name'))
        master_os2 = copy.deepcopy(master_font.get('OS/2'))
        master_post = copy.deepcopy(master_font.get('post'))
        master_font.close()
        
        for sp in fonts_to_merge:
            try:
                f = TTFont(sp)
                # 1. 暴力刪除所有非核心表（徹底清除排版特性、GSUB、GPOS等會衝突的表）
                for tag in list(f.keys()):
                    if tag not in core_tables and tag != 'GlyphOrder':
                        del f[tag]
                
                # 2. 強制克隆母版的名稱與屬性表，確保 fontTools 比較時數據 100% 一致
                if master_name: f['name'] = copy.deepcopy(master_name)
                if master_os2: f['OS/2'] = copy.deepcopy(master_os2)
                if master_post: f['post'] = copy.deepcopy(master_post)
                
                f.save(sp)
                f.close()
            except Exception as e:
                print(f"⚠️ 統一元數據失敗 {sp}: {e}")

        # ==================== 執行合併 ====================
        print(f"\n正在將 {len(fonts_to_merge)} 個子集字體合併為單一 TTF 文件...")
        try:
            merger = Merger()
            merged_font = merger.merge(fonts_to_merge)
            merged_font.save(OUTPUT_TTF)
            merged_font.close()
            print(f"🎉 合併完成！最終字體已保存為：{os.path.abspath(OUTPUT_TTF)}")
        except Exception as e:
            print(f"\n❌ 合併字體時發生嚴重錯誤：\n{e}")

        # ==================== 缺失字符報告 ====================
        print("\n" + "="*30)
        global_missing = set.intersection(*all_missing_per_font) if all_missing_per_font else set()
        if global_missing:
            with open(MISSING_CHARS_FILE, 'w', encoding='utf-8') as f:
                for char in sorted(global_missing):
                    f.write(f"{char} U+{ord(char):04X}\n")
            print(f"⚠️ 注意：有 {len(global_missing)} 個字符在所有源字體中都缺失！已記錄至：{MISSING_CHARS_FILE}")
        else:
            print("✅ 完美：所有目標字符至少在一個源字體中存在。")

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)

    print("\n=== 任務結束 ===")

if __name__ == "__main__":
    main()