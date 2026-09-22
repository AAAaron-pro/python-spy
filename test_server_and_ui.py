#!/usr/bin/env python3
"""
測試本地伺服器運作與靜態資源完整性
"""

import http.server
import socketserver
import threading
import urllib.request
import time
import sys
import os

PORT = 8099
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

def test_endpoints():
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    time.sleep(1) # wait for server to bind

    files_to_check = [
        "index.html",
        "questions.js",
        "audio.js",
        "app.js"
    ]

    print("==================================================")
    print("   測試 Web 伺服器靜態資源載入")
    print("==================================================")

    all_ok = True
    for f in files_to_check:
        url = f"http://localhost:{PORT}/{f}"
        try:
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req) as resp:
                status = resp.status
                content = resp.read()
                size_kb = len(content) / 1024
                print(f"  [PASS] {f:<15} HTTP {status} ({size_kb:.1f} KB)")
                if status != 200:
                    all_ok = False
        except Exception as e:
            print(f"  [FAIL] {f:<15} 錯誤: {e}")
            all_ok = False

    if all_ok:
        print("\n[OK] 本地伺服器與所有前端核心資源 100% 完整無缺！")
        sys.exit(0)
    else:
        print("\n[!] 檢測到部分資源載入失敗！")
        sys.exit(1)

if __name__ == "__main__":
    test_endpoints()
