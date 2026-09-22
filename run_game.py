#!/usr/bin/env python3
"""
Python 爬蟲特務：代碼覺醒 - 本地啟動伺服器
執行本程式將在本地開啟網頁服務，並自動於預設瀏覽器中啟動遊戲。
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Prevent caching during development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def main():
    os.chdir(DIRECTORY)
    
    # Check port availability or fallback
    actual_port = PORT
    for attempt in range(10):
        try:
            with socketserver.TCPServer(("", actual_port), Handler) as httpd:
                url = f"http://localhost:{actual_port}/index.html"
                print("=" * 60)
                print("  ★ PYTHON 特務：滿分計畫 - NTU GENEDU5010 期中通關系統 ★")
                print("=" * 60)
                print(f"  [+] 伺服器正在執行中: {url}")
                print("  [+] 請按 Ctrl + C 停止伺服器")
                print("=" * 60)
                webbrowser.open(url)
                try:
                    httpd.serve_forever()
                except KeyboardInterrupt:
                    print("\n[*] 伺服器已正常停止。祝考試拿高分！")
                    sys.exit(0)
        except OSError:
            actual_port += 1

if __name__ == "__main__":
    main()
