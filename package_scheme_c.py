#!/usr/bin/env python3
"""
執行方案 C 打包：
1. 生成單一獨立 HTML 檔案（免解壓縮、免伺服器、點兩下即在任何瀏覽器離線遊玩）
2. 生成完整專案 ZIP 壓縮檔（方便整包傳送透過 Line / Discord / 雲端硬碟）
"""

import os
import shutil
import zipfile

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def build_standalone_html():
    print("[*] 正在建構單一獨立離線 HTML 檔案...")
    with open(os.path.join(BASE_DIR, "index.html"), "r", encoding="utf-8") as f:
        html = f.read()

    with open(os.path.join(BASE_DIR, "questions.js"), "r", encoding="utf-8") as f:
        questions_js = f.read()

    with open(os.path.join(BASE_DIR, "audio.js"), "r", encoding="utf-8") as f:
        audio_js = f.read()

    with open(os.path.join(BASE_DIR, "app.js"), "r", encoding="utf-8") as f:
        app_js = f.read()

    # Inline scripts
    html = html.replace('<script src="questions.js"></script>', f'<script>\n// --- INLINED questions.js ---\n{questions_js}\n</script>')
    html = html.replace('<script src="audio.js"></script>', f'<script>\n// --- INLINED audio.js ---\n{audio_js}\n</script>')
    html = html.replace('<script src="app.js"></script>', f'<script>\n// --- INLINED app.js ---\n{app_js}\n</script>')

    out_standalone = os.path.join(BASE_DIR, "python_agent_score100_standalone.html")
    with open(out_standalone, "w", encoding="utf-8") as f:
        f.write(html)

    size_kb = os.path.getsize(out_standalone) / 1024
    print(f"[+] 單一 HTML 產生完成: {out_standalone} ({size_kb:.1f} KB)")
    return out_standalone

def build_zip_archive():
    print("[*] 正在製作完整專案 ZIP 壓縮包...")
    zip_path = os.path.join(BASE_DIR, "python_agent_score100.zip")
    
    files_to_include = [
        "index.html",
        "questions.js",
        "audio.js",
        "app.js",
        "run_game.py",
        "README.md",
        "python_agent_score100_standalone.html"
    ]

    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
        for f in files_to_include:
            f_path = os.path.join(BASE_DIR, f)
            if os.path.exists(f_path):
                zipf.write(f_path, arcname=f)

    size_kb = os.path.getsize(zip_path) / 1024
    print(f"[+] ZIP 壓縮包產生完成: {zip_path} ({size_kb:.1f} KB)")
    return zip_path

if __name__ == "__main__":
    build_standalone_html()
    build_zip_archive()
    print("[★] 方案 C 打包作業 100% 完成！")
