@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================================
echo   Python 特務：滿分計畫 - 一鍵推送到 GitHub
echo   倉庫: https://github.com/aaronhuang1205-bit/python-spy.git
echo ========================================================
echo.
echo 正在推送到 GitHub，請稍候...
echo 若跳出登入視窗，請點選 [Sign in with your browser] 完成授權...
echo.
"C:\Program Files\Git\cmd\git.exe" push -u origin main
echo.
echo ========================================================
if %ERRORLEVEL% EQU 0 (
    echo [成功] 專案已成功推送到 GitHub！
    echo 請前往 GitHub 倉庫 Settings -^> Pages 開啟 GitHub Pages 網頁！
) else (
    echo [提示] 若出現錯誤，請確認網路連線或 GitHub 登入授權。
)
echo ========================================================
pause
