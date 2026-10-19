# 《Python 特務：滿分計畫》
### 國立臺灣大學「程式設計與網路資料搜集」(GenEdu5010) Exam 1 期中考專屬遊戲學習系統

---

## 🎮 遊戲簡介
本遊戲專為修習台大 **GenEdu5010 程式設計與網路資料搜集** 的同學設計，精準針對 **Week 1 至 Week 5** 範圍（I/O、字串、ASCII 編碼、串列記憶體機制、for/while 迴圈、函式預設參數與作用域、PEP 8 規範等）。

結合 **114-1 與 114-2 兩份考古題** 的核心考點，擴充為 **192 道原創題目（每章 16 題基礎 + 16 題進階，6 大作戰能力維度各 32 題）** 與 **36 個深度觀念情報模組**，讓你在遊戲闖關與計時模考中徹底消化 Python 直譯器底層邏輯與高頻陷阱！

---

## 🔄 跨裝置進度同步中心 (A + C + D 三合一混合架構)

點擊頂部導覽列的 **「特務學號」** 徽章，即可開啟【跨裝置進度同步中心】，支援三大免付費跨裝置同步管道與實體檔案備份：

### 1. 【方案 A】特務緊湊壓縮同步碼 (`AGENTv2.<base64url>`) 與 `?sync=` 連結
* 採用位元遮罩 (Bitmask) 與緊湊索引序列化技術，將全站 192 題作答紀錄、星級與六維度戰力壓縮至 **150~250 字元以內**。
* 一鍵點擊 **「複製同步碼」** 或 **「複製同步網址 (`?sync=AGENTv2...`)」**，在手機或平板貼上或開啟連結，系統即自動執行 **非破壞性智慧合併（Smart Merge：星級與等級取最高值、錯題與已答題取聯集）**。

### 2. 【方案 C】前端動態生成高對比 QR Code 掃碼轉移
* 視窗內自動將當前進度渲染為高對比 QR Code，直接拿手機相機掃描即可一秒帶走進度！
* 若於本機離線環境 (`file://` 或 `localhost`) 開啟，QR Code 會自動指向公開 GitHub Pages 線上版網址並提示連網掃碼同步。

### 3. 【方案 D】Google Sheets (Google Apps Script) 免資料庫免費雲端自動中繼站
無需架設付費後端伺服器，只需 3 分鐘即可利用你自己的 Google 雲端試算表建立專屬自動同步中繼站：
1. **步驟 1：建立試算表與開啟 Apps Script**
   * 前往 [Google Sheets (sheets.new)](https://sheets.new) 新建一份空白試算表，命名為 `Python_Agent_Cloud_Sync`。
   * 點選頂部選單 **「擴充功能 (Extensions)」 -> 「Apps Script」**。
2. **步驟 2：貼上後端腳本**
   * 將專案根目錄下的 [`google_sheets_cloud_sync.gs`](file:///C:/Users/88697/.gemini/antigravity/scratch/python-exam-game/google_sheets_cloud_sync.gs) 內容完整複製並貼入 `Code.gs` 中，按 `Ctrl + S` 儲存。
3. **步驟 3：部署為網頁應用程式 (Web App)**
   * 點選右上角 **「部署 (Deploy)」 -> 「新增部署作業 (New deployment)」**。
   * 選取類型為 **「網頁應用程式 (Web app)」**：
     * **執行身分 (Execute as)**：選擇 **「我 (Me)」**。
     * **誰可以存取 (Who has access)**：選擇 **「所有人 (Anyone)」**（前端使用 `text/plain` 免 CORS preflight 跨網域自動讀寫）。
   * 點擊「部署」，複製產生的 `https://script.google.com/macros/s/.../exec` 網址，貼入遊戲內「特務檔案 -> 方案 D 雲端同步設定」欄位並點擊 **「儲存並上傳雲端」**，此後登入學號、章節結算與模考交卷均會在背景自動雙向同步！

### 4. 實體 `.json` 存檔匯出與匯入
* 支援一鍵下載 `python_agent_<學號>_backup.json` 備份檔與上傳還原。

---

## 🚀 啟動與分享方式

### 單檔離線遊玩 / 壓縮包分享（零門檻）
* **真・單一離線 HTML** (`python_agent_score100_standalone.html`)：
  * 已將 192 題題庫、36 模組觀念卡、合成音效、核心程式與 4 大機甲視覺圖以 Base64 完整打包。
  * 雙擊即可在任何電腦或手機瀏覽器離線遊玩，完全不需安裝 Python 或開啟伺服器。
* **完整專案 ZIP 包** (`python_agent_score100.zip`)：
  * 適合直接分享或雲端硬碟整包備份。
* **本機一鍵啟動**：
  * 執行 `python run_game.py`，會自動啟動本機伺服器並開啟瀏覽器。

---

## 🛠️ 技術規格
* 前端技術：HTML5、Tailwind CSS、Lucide Icons、Prism.js（Python 代碼語法高亮）、QRCode-Generator
* 音效架構：Web Audio API 原生合成音效
* 題庫規模：192 道原創變形題（每章 16 基礎 + 16 進階），經 Python 3.12 直譯器驗證 100% 正確
* 無障礙與安全性：符合 WCAG AA 最小觸控熱區 (`>= 44x44px`)、Modal `role="dialog"` 規範與完整 XSS 輸出跳脫防護
