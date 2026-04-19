#此脚本用于字体分析，即通过database中出现过的字 减去 基本文字区，补充区，扩展A区，做成一个子集字体文件以优化小程序性能
#使用時cd到此文件夾

#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import glob

# 定义A区（基本区 + 基本区补充 + 扩展A区）的Unicode范围
A_ZONES = [
    (0x4E00, 0x9FA5),   # 基本汉字区
    (0x9FA6, 0x9FEF),   # 基本汉字补充区
    (0x3400, 0x4DB5),   # 扩展A区
]

def is_in_zone_A(char):
    """判断一个字符是否属于A区"""
    code = ord(char)
    for start, end in A_ZONES:
        if start <= code <= end:
            return True
    return False

def get_all_csv_files(folder_path):
    """获取指定文件夹内所有 .csv 文件的完整路径列表"""
    # 使用 glob 匹配所有 .csv 文件（不区分大小写）
    pattern = os.path.join(folder_path, "*.csv")
    csv_files = glob.glob(pattern)
    # 去重
    csv_files = list(set(csv_files))
    return csv_files

def read_csv_files(csv_file_paths, encoding='utf-8'):
    """从多个 CSV 文件中读取全部文本内容（忽略CSV结构，只取字符）"""
    all_text = ""
    for file_path in csv_file_paths:
        try:
            with open(file_path, 'r', encoding=encoding) as f:
                all_text += f.read()
        except Exception as e:
            print(f"读取 {file_path} 时出错: {e}")
    return all_text

def analyze_text_from_csvs(csv_files):
    """分析多个CSV文件中的全部字符，分类为A区和B区"""
    if not csv_files:
        print("未找到任何 CSV 文件。")
        return None

    print(f"找到 {len(csv_files)} 个 CSV 文件：")
    for f in csv_files:
        print(f"  - {f}")

    text = read_csv_files(csv_files)
    if not text:
        print("没有读取到任何文本内容。")
        return None

    all_chars = set(text)
    zone_A_chars = set()
    zone_B_chars = set()

    for char in all_chars:
        # 跳过空白字符（空格、换行、制表等），可根据需要注释掉此行
        if char.isspace():
            continue
        if is_in_zone_A(char):
            zone_A_chars.add(char)
        else:
            zone_B_chars.add(char)

    return {
        'zone_A': zone_A_chars,
        'zone_B': zone_B_chars,
        'zone_C': zone_A_chars | zone_B_chars
    }

def save_char_list(chars, file_path):
    """将字符列表保存到文件（每行一个字符及其Unicode码点）"""
    with open(file_path, 'w', encoding='utf-8') as f:
        for char in sorted(chars):
            f.write(f"{char} U+{ord(char):04X}\n")

def main():
    #文件夾路徑
    CSV_FOLDER = "../03_database/csv"

    # 获取文件夹内所有 CSV 文件
    csv_files = get_all_csv_files(CSV_FOLDER)

    if not csv_files:
        print(f"在文件夹 '{CSV_FOLDER}' 中没有找到任何 .csv 文件。")
        return

    result = analyze_text_from_csvs(csv_files)

    if result:
        print("\n分析完成！")
        print(f"  - A区字符数: {len(result['zone_A'])}")
        print(f"  - B区字符数: {len(result['zone_B'])}")
        print(f"  - C区总字符数: {len(result['zone_C'])}")

        # 保存字符列表（带码点，便于查阅）
        save_char_list(result['zone_C'], 'zone_C_characters.txt')
        print(f"字符列表已保存到 zone_C_characters.txt")

        # 保存纯字符序列（用于后续 pyftsubset 提取字体）
        chars_text = ''.join(sorted(result['zone_C']))
        with open('chars_for_font.txt', 'w', encoding='utf-8') as f:
            f.write(chars_text)
        print(f"纯字符序列已保存到 chars_for_font.txt")

if __name__ == "__main__":
    main()