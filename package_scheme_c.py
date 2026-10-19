#!/usr/bin/env python3
"""
執行方案 C 打包：
1. 生成真・單一獨立離線 HTML 檔案（內嵌所有腳本與戰術機甲圖片 Base64，免解壓縮、免伺服器、點兩下即在任何瀏覽器離線遊玩）
2. 生成完整專案 ZIP 壓縮檔（含 assets/ 圖片資料夾、各模組檔案，方便透過 Line / Discord / 雲端硬碟整包傳送）
"""

import os
import sys
import base64
import zipfile

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def build_standalone_html():
    print("[*] 正在建構真・單一獨立離線 HTML 檔案...")
    with open(os.path.join(BASE_DIR, "index.html"), "r", encoding="utf-8") as f:
        html = f.read()

    with open(os.path.join(BASE_DIR, "questions.js"), "r", encoding="utf-8") as f:
        questions_js = f.read()

    with open(os.path.join(BASE_DIR, "concept_briefings.js"), "r", encoding="utf-8") as f:
        concept_briefings_js = f.read()

    with open(os.path.join(BASE_DIR, "audio.js"), "r", encoding="utf-8") as f:
        audio_js = f.read()

    with open(os.path.join(BASE_DIR, "app.js"), "r", encoding="utf-8") as f:
        app_js = f.read()

    # Inline scripts
    html = html.replace('<script src="questions.js"></script>', f'<script>\n// --- INLINED questions.js ---\n{questions_js}\n</script>')
    html = html.replace('<script src="concept_briefings.js"></script>', f'<script>\n// --- INLINED concept_briefings.js ---\n{concept_briefings_js}\n</script>')
    html = html.replace('<script src="audio.js"></script>', f'<script>\n// --- INLINED audio.js ---\n{audio_js}\n</script>')
    html = html.replace('<script src="app.js"></script>', f'<script>\n// --- INLINED app.js ---\n{app_js}\n</script>')

    # Inline assets images as base64 for 100% portable single-file execution
    assets_dir = os.path.join(BASE_DIR, "assets")
    if os.path.exists(assets_dir):
        for img_name in os.listdir(assets_dir):
            if img_name.lower().endswith((".jpg", ".jpeg", ".png")):
                img_path = os.path.join(assets_dir, img_name)
                with open(img_path, "rb") as img_file:
                    b64_data = base64.b64encode(img_file.read()).decode("ascii")
                    mime = "image/jpeg" if img_name.lower().endswith((".jpg", ".jpeg")) else "image/png"
                    data_uri = f"data:{mime};base64,{b64_data}"
                    html = html.replace(f'src="assets/{img_name}"', f'src="{data_uri}"')

    out_standalone = os.path.join(BASE_DIR, "python_agent_score100_standalone.html")
    with open(out_standalone, "w", encoding="utf-8") as f:
        f.write(html)

    size_mb = os.path.getsize(out_standalone) / (1024 * 1024)
    print(f"[+] 真・單一 HTML 產生完成: {out_standalone} ({size_mb:.2f} MB)")
    return out_standalone

def build_zip_archive():
    print("[*] 正在製作完整專案 ZIP 壓縮包...")
    zip_path = os.path.join(BASE_DIR, "python_agent_score100.zip")
    
    files_to_include = [
        "index.html",
        "questions.js",
        "concept_briefings.js",
        "audio.js",
        "app.js",
        "google_sheets_cloud_sync.gs",
        "CODE_REVIEW_REPORT.md",
        "run_game.py",
        "README.md",
        "deploy_to_github.py",
        "package_scheme_c.py",
        "verify_questions.py"
    ]

    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
        # Add root files
        for f in files_to_include:
            f_path = os.path.join(BASE_DIR, f)
            if os.path.exists(f_path):
                zipf.write(f_path, arcname=f)

        # Add assets folder
        assets_dir = os.path.join(BASE_DIR, "assets")
        if os.path.exists(assets_dir):
            for root, _, files in os.walk(assets_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, BASE_DIR)
                    zipf.write(file_path, arcname=arcname)

        # Also add standalone html
        standalone_path = os.path.join(BASE_DIR, "python_agent_score100_standalone.html")
        if os.path.exists(standalone_path):
            zipf.write(standalone_path, arcname="python_agent_score100_standalone.html")

    size_mb = os.path.getsize(zip_path) / (1024 * 1024)
    print(f"[+] ZIP 壓縮包產生完成: {zip_path} ({size_mb:.2f} MB)")
    return zip_path

if __name__ == "__main__":
    build_standalone_html()
    build_zip_archive()
    print("[★] 方案 C 打包作業 100% 完成！")
