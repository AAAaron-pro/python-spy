#!/usr/bin/env python3
"""
使用本機 Chrome 截取遊戲各主畫面的真實運作截圖
"""

import subprocess
import time
import os
import threading
import http.server
import socketserver

PORT = 8089
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
ARTIFACT_DIR = r"C:\Users\88697\.gemini\antigravity\brain\bf0abd99-38d5-439e-81ee-f6f20a0ea016"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

def capture_page(url, output_path, delay=2):
    # Use Chrome to take screenshot after waiting for JS execution
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--window-size=1280,900",
        "--hide-scrollbars",
        "--virtual-time-budget=2000",
        f"--screenshot={output_path}",
        url
    ]
    subprocess.run(cmd, check=True)
    print(f"[+] 截圖已儲存: {output_path}")

def main():
    server_t = threading.Thread(target=start_server, daemon=True)
    server_t.start()
    time.sleep(1)

    os.makedirs(ARTIFACT_DIR, exist_ok=True)

    targets = [
        ("preview_chapters_hub.png", f"http://localhost:{PORT}/index.html"),
        ("preview_exam_arena.png", f"http://localhost:{PORT}/index.html?tab=arena"),
        ("preview_quiz_tracer.png", f"http://localhost:{PORT}/index.html?preview=quiz"),
        ("preview_briefing.png", f"http://localhost:{PORT}/index.html?preview=briefing"),
        ("preview_exam_active.png", f"http://localhost:{PORT}/index.html?tab=arena&preview=exam_run")
    ]

    for filename, url in targets:
        out_file = os.path.join(ARTIFACT_DIR, filename)
        capture_page(url, out_file)

    print("[*] 所有畫面截圖全部完成！")

if __name__ == "__main__":
    main()
