#!/usr/bin/env python3
"""
一鍵部署至 GitHub Pages 輔助腳本
協助使用者將本專案推送到自己的 GitHub 倉庫並開啟 GitHub Pages 公開網址。
"""

import subprocess
import os
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

GIT_BIN = r"C:\Program Files\Git\cmd\git.exe"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def run_git(args):
    cmd = [GIT_BIN] + args
    return subprocess.run(cmd, cwd=BASE_DIR, capture_output=True, text=True, encoding="utf-8")

def main():
    print("=" * 60)
    print("  ★ 《Python 特務：滿分計畫》一鍵發布至 GitHub Pages ★")
    print("=" * 60)
    print("\n【操作引導】：")
    print("1. 請先前往 https://github.com/new 建立一個新的公開倉庫 (Public Repository)")
    print("   （Repository name 可以輸入例如: python-agent-score100，其他選項維持預設即可）")
    print("2. 複製該倉庫的 HTTPS 網址 (例如: https://github.com/你的帳號/python-agent-score100.git)")
    print("=" * 60)

    if len(sys.argv) > 1:
        repo_url = sys.argv[1].strip()
    else:
        repo_url = input("\n請貼上您的 GitHub 倉庫網址後按 Enter: ").strip()

    if not repo_url:
        print("[!] 網址不能為空，部署已取消。")
        sys.exit(1)

    print(f"\n[*] 正在關聯遠端倉庫: {repo_url}...")
    run_git(["remote", "remove", "origin"]) # Remove old origin if any
    res_remote = run_git(["remote", "add", "origin", repo_url])
    if res_remote.returncode != 0 and "already exists" not in res_remote.stderr:
        print(f"[!] 關聯失敗: {res_remote.stderr}")

    print("[*] 正在將程式碼與題庫推送到 GitHub main 分支...")
    res_push = run_git(["push", "-u", "origin", "main", "--force"])
    if res_push.returncode == 0:
        print("\n[★] 推送成功！")
        print("=" * 60)
        print("【最後一步：開啟網頁分享】")
        print("1. 打開您的 GitHub 倉庫頁面")
        print("2. 點擊頂部【Settings】➔ 左側欄【Pages】")
        print("3. 在【Build and deployment】下的 Source 選擇「Deploy from a branch」")
        print("4. Branch 選擇【main】與【/ (root)】，點擊【Save】")
        print("5. 稍等約 1 分鐘，重新整理頁面，即可看到專屬公開遊戲網址：")
        
        # Parse username and repo name from URL to predict GitHub Pages URL
        # e.g. https://github.com/username/repo.git -> https://username.github.io/repo/
        if "github.com" in repo_url:
            parts = repo_url.replace(".git", "").split("github.com/")[-1].split("/")
            if len(parts) == 2:
                user, repo = parts[0], parts[1]
                print(f"\n👉 您的遊戲公開網址將會是: https://{user}.github.io/{repo}/")
        print("=" * 60)
    else:
        print(f"\n[!] 推送時發生提示或需身分驗證：\n{res_push.stderr}")
        print("\n提示：若提示需登入，請依照 Git 彈出視窗登入您的 GitHub 帳號即可！")

if __name__ == "__main__":
    main()
