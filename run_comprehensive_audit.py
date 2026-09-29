#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
《Python 特務：滿分計畫》全功能深度自動化驗證與檢驗測試
包含：
1. 題庫資料結構與 100% Python 3.12 執行校驗 (192 題)
2. 觀念情報卡 36 模組結構與重點對照校驗
3. Chrome CDP 全自動化無頭瀏覽器真實 UI 流程巡檢
4. 截圖存檔至 Artifact 目錄
5. 線上 GitHub Pages 連線驗證
"""

import os
import sys
import json
import time
import asyncio
import subprocess
import threading
import urllib.request
import http.server
import socketserver
from contextlib import redirect_stdout
import io

try:
    import websockets
except ImportError:
    print("Error: websockets package is required.")
    sys.exit(1)

import socket

def get_free_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('127.0.0.1', 0))
        return s.getsockname()[1]

PORT = get_free_port()
REMOTE_PORT = get_free_port()
PROJECT_DIR = r"C:\Users\88697\.gemini\antigravity\scratch\python-exam-game"
ARTIFACT_DIR = r"C:\Users\88697\.gemini\antigravity\brain\bf0abd99-38d5-439e-81ee-f6f20a0ea016"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(CHROME_PATH):
    CHROME_PATH = r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"

os.makedirs(ARTIFACT_DIR, exist_ok=True)

class SilentHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PROJECT_DIR, **kwargs)
    def log_message(self, format, *args):
        pass

def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", PORT), SilentHandler) as httpd:
        httpd.serve_forever()

async def cdp_call(ws, method, params=None, req_id=[1]):
    cid = req_id[0]
    req_id[0] += 1
    msg = {"id": cid, "method": method, "params": params or {}}
    await ws.send(json.dumps(msg))
    while True:
        resp = await ws.recv()
        data = json.loads(resp)
        if data.get("id") == cid:
            return data.get("result", {})

async def cdp_eval(ws, expr, req_id):
    res = await cdp_call(ws, "Runtime.evaluate", {
        "expression": expr,
        "returnByValue": True,
        "awaitPromise": True
    }, req_id)
    if "result" in res:
        return res["result"].get("value")
    return None

async def cdp_screenshot(ws, output_path, req_id):
    res = await cdp_call(ws, "Page.captureScreenshot", {"format": "png"}, req_id)
    if "data" in res:
        import base64
        img_bytes = base64.b64decode(res["data"])
        with open(output_path, "wb") as f:
            f.write(img_bytes)
        print(f"  [SCREENSHOT] {os.path.basename(output_path)} 已存檔 ({len(img_bytes)/1024:.1f} KB)")

async def run_cdp_tests():
    # 0. Verify HTTP server is answering
    for _ in range(10):
        try:
            with urllib.request.urlopen(f"http://127.0.0.1:{PORT}/index.html", timeout=1) as resp:
                if resp.status == 200:
                    print(f"  [HTTP] 本地伺服器已就緒: http://127.0.0.1:{PORT}")
                    break
        except Exception:
            await asyncio.sleep(0.3)

    # 1. Start Chrome
    user_data_dir = os.path.join(os.environ["TEMP"], f"chrome_audit_{int(time.time())}")
    cmd = [
        CHROME_PATH,
        f"--remote-debugging-port={REMOTE_PORT}",
        f"--user-data-dir={user_data_dir}",
        "--headless=new",
        "--disable-gpu",
        "--disable-extensions",
        "--window-size=1400,950",
        "--hide-scrollbars",
        f"http://127.0.0.1:{PORT}/index.html"
    ]
    chrome_proc = subprocess.Popen(cmd)
    await asyncio.sleep(2.0)

    try:
        # Get target ws
        target_found = None
        for _ in range(15):
            try:
                with urllib.request.urlopen(f"http://127.0.0.1:{REMOTE_PORT}/json", timeout=1) as resp:
                    targets = json.loads(resp.read().decode())
                    page_targets = [t for t in targets if t.get("type") == "page"]
                    if page_targets:
                        target_found = page_targets[0]
                        break
            except Exception:
                await asyncio.sleep(0.4)

        if not target_found:
            raise RuntimeError("無法連線至 Chrome 調試連接埠")

        ws_url = target_found["webSocketDebuggerUrl"]
        
        test_results = {}
        console_errors = []
        req_id = [1]

        async with websockets.connect(ws_url, max_size=50_000_000) as ws:
            await cdp_call(ws, "Page.enable", {}, req_id)
            await cdp_call(ws, "Runtime.enable", {}, req_id)
            await cdp_call(ws, "Console.enable", {}, req_id)

            # Navigate explicitly to make sure page loads
            await cdp_call(ws, "Page.navigate", {"url": f"http://127.0.0.1:{PORT}/index.html"}, req_id)
            await asyncio.sleep(1.5)

            # Wait for DOM and scripts ready
            for _ in range(20):
                ready = await cdp_eval(ws, "document.readyState === 'complete' && typeof QUESTIONS_DATABASE !== 'undefined'", req_id)
                if ready:
                    break
                await asyncio.sleep(0.5)

            print("\n=======================================================")
            print("   開始執行《Python 特務：滿分計畫》深度自動化檢驗")
            print("=======================================================")

            # Test 1: Questions Database & Dimensions Check
            total_qs = await cdp_eval(ws, "typeof QUESTIONS_DATABASE !== 'undefined' ? QUESTIONS_DATABASE.length : 0", req_id)
            ch_dist = await cdp_eval(ws, """
                (() => {
                    const stats = {};
                    QUESTIONS_DATABASE.forEach(q => {
                        const ch = q.chapterId;
                        stats[ch] = stats[ch] || { basic: 0, advanced: 0, total: 0 };
                        stats[ch][q.difficulty] += 1;
                        stats[ch].total += 1;
                    });
                    return stats;
                })()
            """, req_id)
            dim_dist = await cdp_eval(ws, """
                (() => {
                    const stats = {};
                    QUESTIONS_DATABASE.forEach(q => {
                        const d = q.dimension;
                        stats[d] = (stats[d] || 0) + 1;
                    });
                    return stats;
                })()
            """, req_id)

            print(f"\n[Test 1] 題庫規模與維度分佈:")
            print(f"  - 總題數: {total_qs} 題 (預期: 192 題)")
            test_results["q_count_192"] = (total_qs == 192)
            
            all_ch_16 = True
            for ch in range(1, 7):
                s = ch_dist.get(str(ch), {})
                b, a, tot = s.get("basic", 0), s.get("advanced", 0), s.get("total", 0)
                print(f"  - 第 {ch} 章: Basic={b}, Advanced={a} -> 共 {tot} 題")
                if b != 16 or a != 16:
                    all_ch_16 = False
            test_results["all_chapters_16_16"] = all_ch_16

            all_dim_32 = True
            for d, cnt in dim_dist.items():
                print(f"  - 維度 [{d}]: {cnt} 題")
                if cnt != 32:
                    all_dim_32 = False
            test_results["all_dimensions_balanced_32"] = all_dim_32

            # Test 2: Concept Briefing Notebook
            concept_count = await cdp_eval(ws, """
                (() => {
                    if (typeof CONCEPT_BRIEFINGS === 'undefined') return 0;
                    let count = 0;
                    for (let ch = 1; ch <= 6; ch++) {
                        if (CONCEPT_BRIEFINGS[ch] && Array.isArray(CONCEPT_BRIEFINGS[ch].concepts)) {
                            count += CONCEPT_BRIEFINGS[ch].concepts.length;
                        }
                    }
                    return count;
                })()
            """, req_id)
            print(f"\n[Test 2] 觀念情報卡模組檢查:")
            print(f"  - 總模組數: {concept_count} 個 (預期: 36 個, 6章 x 6模組)")
            test_results["concept_modules_36"] = (concept_count == 36)

            # Test 3: Mandatory Student ID Modal & Profile
            modal_visible = await cdp_eval(ws, "!document.getElementById('profile-modal').classList.contains('hidden')", req_id)
            print(f"\n[Test 3] 特務建檔彈窗檢查:")
            print(f"  - 首次啟動是否強制顯示學號彈窗: {modal_visible}")
            test_results["mandatory_modal_shows"] = modal_visible

            # Set student ID
            await cdp_eval(ws, """
                (() => {
                    document.getElementById('input-student-id').value = 'B11902001';
                    switchProfile('B11902001');
                })()
            """, req_id)
            await asyncio.sleep(0.5)

            hud_id = await cdp_eval(ws, "document.getElementById('hud-student-id').textContent", req_id)
            print(f"  - 儲存後頂部 HUD 特務學號顯示: '{hud_id}'")
            test_results["hud_student_id_updated"] = (hud_id == "B11902001")

            # Test 4: Heart HP & Alarm Drone modal completely removed
            hp_in_dom = await cdp_eval(ws, "document.getElementById('hud-hp') !== null", req_id)
            alarm_in_dom = await cdp_eval(ws, "document.getElementById('alarm-modal') !== null", req_id)
            print(f"\n[Test 4] 生命值 (HP) 與警報無人機拔除驗證:")
            print(f"  - 頂部 HUD 是否已不存在 #hud-hp: {not hp_in_dom}")
            print(f"  - 頁面中是否已完全刪除 #alarm-modal: {not alarm_in_dom}")
            test_results["hp_element_removed"] = (not hp_in_dom)
            test_results["alarm_modal_removed"] = (not alarm_in_dom)

            # Screenshot: Chapters Hub
            await cdp_screenshot(ws, os.path.join(ARTIFACT_DIR, "audit_01_chapters_hub.png"), req_id)

            # Test 5: Open Chapter 1 Concept Briefing
            await cdp_eval(ws, "openBriefingModal(1)", req_id)
            await asyncio.sleep(0.8)
            briefing_cards_count = await cdp_eval(ws, "document.querySelectorAll('#briefing-content > div').length", req_id)
            print(f"\n[Test 5] 觀念情報卡視窗互動:")
            print(f"  - 第一章開啟後渲染模組卡片數: {briefing_cards_count} 個 (預期: 6 個)")
            test_results["ch1_briefing_renders_6"] = (briefing_cards_count == 6)
            await cdp_screenshot(ws, os.path.join(ARTIFACT_DIR, "audit_02_concept_briefing_modal.png"), req_id)
            await cdp_eval(ws, "closeBriefingModal()", req_id)
            await asyncio.sleep(0.3)

            # Test 6: Option Whitespace and Monospace Styling in Quiz
            await cdp_eval(ws, "startChapterQuiz(1, 'basic')", req_id)
            await asyncio.sleep(0.8)
            opt_classes = await cdp_eval(ws, """
                (() => {
                    const btn = document.querySelector('#quiz-options-container button span:last-child');
                    return btn ? btn.className : '';
                })()
            """, req_id)
            opt_classes = opt_classes or ""
            has_pre_wrap = "whitespace-pre-wrap" in opt_classes
            has_mono = "font-mono" in opt_classes
            print(f"\n[Test 6] 選項字元防摺疊與字型驗證:")
            print(f"  - 選項文字標籤 Class: '{opt_classes}'")
            print(f"  - 包含 whitespace-pre-wrap: {has_pre_wrap}")
            print(f"  - 包含 font-mono: {has_mono}")
            test_results["options_whitespace_pre_wrap"] = has_pre_wrap
            test_results["options_font_mono"] = has_mono

            # Take screenshot of quiz
            await cdp_screenshot(ws, os.path.join(ARTIFACT_DIR, "audit_03_quiz_options_view.png"), req_id)

            # Test 7: Quiz Interaction & Anti-Repetition Queue
            # Pick an answer
            ans_res = await cdp_eval(ws, """
                (() => {
                    if (!currentSession || !currentSession.questions) return { streak: 0, xp: 0 };
                    const q = currentSession.questions[currentSession.currentIndex];
                    selectQuizAnswer(q.answer);
                    return { streak: appState.streak, xp: appState.xp };
                })()
            """, req_id)
            ans_res = ans_res or {}
            await asyncio.sleep(0.5)
            print(f"\n[Test 7] 單題作答反饋與 Python Tutor 單步追蹤:")
            print(f"  - 答對後連擊 Streak: {ans_res.get('streak')}, XP: {ans_res.get('xp')}")
            feedback_visible = await cdp_eval(ws, "!document.getElementById('quiz-feedback-container').classList.contains('hidden')", req_id)
            tracer_visible = await cdp_eval(ws, "!document.getElementById('quiz-feedback-container').classList.contains('hidden') && document.getElementById('trace-step-indicator') !== null", req_id)
            print(f"  - 考點解析與正解回饋橫幅已展開: {feedback_visible}")
            print(f"  - Python Tutor 變數追蹤面板已就緒: {tracer_visible}")
            test_results["feedback_banner_visible"] = feedback_visible
            test_results["python_tutor_visible"] = tracer_visible

            await cdp_screenshot(ws, os.path.join(ARTIFACT_DIR, "audit_04_quiz_tutor_feedback.png"), req_id)
            await cdp_eval(ws, "closeQuizModal()", req_id)
            await asyncio.sleep(0.3)

            # Test 8: Mistakes Library & Dismissal
            # Force add a mock mistake to test dismissal and re-quiz
            await cdp_eval(ws, """
                (() => {
                    if (!appState.mistakes.includes('mock_25')) {
                        appState.mistakes.push('mock_25');
                    }
                    saveState();
                    switchTab('mistakes');
                })()
            """, req_id)
            await asyncio.sleep(0.6)

            mistake_cards_cnt = await cdp_eval(ws, "document.querySelectorAll('#mistake-list > div').length", req_id)
            has_dismiss_btn = await cdp_eval(ws, "document.querySelector(\"button[onclick*='dismissMistake']\") !== null", req_id)
            print(f"\n[Test 8] 錯題情報庫與消滅功能驗證:")
            print(f"  - 錯題情報庫卡片數量: {mistake_cards_cnt}")
            print(f"  - 是否存在「消滅情報」手動移除按鈕: {has_dismiss_btn}")
            test_results["mistakes_rendered"] = (mistake_cards_cnt > 0)
            test_results["dismiss_button_present"] = has_dismiss_btn

            await cdp_screenshot(ws, os.path.join(ARTIFACT_DIR, "audit_05_mistakes_library.png"), req_id)

            # Test dismissing the mistake
            await cdp_eval(ws, "dismissMistake('mock_25')", req_id)
            await asyncio.sleep(0.4)
            mistakes_after_dismiss = await cdp_eval(ws, "appState.mistakes.length", req_id)
            print(f"  - 手動點擊消滅後剩餘錯題數: {mistakes_after_dismiss}")
            test_results["mistake_dismissal_works"] = (mistakes_after_dismiss == 0)

            # Test 9: Hexagon Radar Chart (特務戰力六邊形)
            await cdp_eval(ws, "switchTab('analytics')", req_id)
            await asyncio.sleep(0.6)
            has_radar_svg = await cdp_eval(ws, "document.querySelector('#radar-chart-container svg') !== null", req_id)
            radar_points = await cdp_eval(ws, """
                (() => {
                    const poly = document.querySelector('#radar-chart-container svg polygon');
                    return poly ? poly.getAttribute('points').split(' ').length : 0;
                })()
            """, req_id)
            print(f"\n[Test 9] 特務戰力六邊形多邊形雷達圖:")
            print(f"  - SVG 雷達圖是否存在: {has_radar_svg}")
            print(f"  - 多邊形頂點數: {radar_points} 個 (預期: 6 個頂點)")
            test_results["radar_svg_exists"] = has_radar_svg
            test_results["radar_hexagon_6_points"] = (radar_points == 6)

            await cdp_screenshot(ws, os.path.join(ARTIFACT_DIR, "audit_06_hexagon_radar_analytics.png"), req_id)

            # Test 10: Exam Arena (期中模擬考)
            await cdp_eval(ws, "switchTab('arena')", req_id)
            await asyncio.sleep(0.5)
            await cdp_eval(ws, "startExam('quick50', 25, 50)", req_id)
            await asyncio.sleep(0.8)
            exam_running = await cdp_eval(ws, "currentSession !== null && currentSession.type === 'exam'", req_id)
            exam_total_qs = await cdp_eval(ws, "currentSession.questions.length", req_id)
            timer_text = await cdp_eval(ws, "document.getElementById('exam-timer').textContent", req_id)
            dots_count = await cdp_eval(ws, "document.querySelectorAll('#exam-question-dots button').length", req_id)
            print(f"\n[Test 10] 考場大廳（期中模擬考系統）驗證:")
            print(f"  - 測驗是否成功啟動: {exam_running}")
            print(f"  - 模考出題數: {exam_total_qs} 題 (預期: 25 題)")
            print(f"  - 倒數計時器即時狀態: {timer_text}")
            print(f"  - 題目導航點格數: {dots_count} 格")
            test_results["exam_standard_starts"] = exam_running
            test_results["exam_standard_25_questions"] = (exam_total_qs == 25)

            # Check exam option formatting
            exam_opt_pre_wrap = await cdp_eval(ws, """
                (() => {
                    const btn = document.querySelector('#exam-question-body button span:last-child');
                    return btn ? btn.className.includes('whitespace-pre-wrap') : false;
                })()
            """, req_id)
            print(f"  - 考場大廳選項是否具備 whitespace-pre-wrap: {exam_opt_pre_wrap}")
            test_results["exam_options_pre_wrap"] = exam_opt_pre_wrap

            await cdp_screenshot(ws, os.path.join(ARTIFACT_DIR, "audit_07_exam_arena_running.png"), req_id)

            # Submit exam
            await cdp_eval(ws, """
                (() => {
                    for (let i = 0; i < currentSession.questions.length; i++) {
                        currentSession.userAnswers[i] = currentSession.questions[i].answer;
                    }
                    submitExam();
                })()
            """, req_id)
            await asyncio.sleep(1.0)

            exam_result_visible = await cdp_eval(ws, "!document.getElementById('exam-result-container').classList.contains('hidden')", req_id)
            exam_score_text = await cdp_eval(ws, """
                (() => {
                    const el = document.getElementById('exam-result-container');
                    return el ? el.innerText : '';
                })()
            """, req_id)
            print(f"  - 交卷後成績結算畫面顯示: {exam_result_visible}")
            print(f"  - 成績單得分標註檢驗: {'100 / 100' in str(exam_score_text)}")
            test_results["exam_result_modal_shows"] = exam_result_visible
            test_results["exam_score_100"] = ("100" in str(exam_score_text) and "等級 S" in str(exam_score_text))

            await cdp_screenshot(ws, os.path.join(ARTIFACT_DIR, "audit_08_exam_score_report.png"), req_id)
            await cdp_eval(ws, "switchTab('arena')", req_id)
            await asyncio.sleep(0.5)

            # Test 11: Anti-Repetition Queue Deep Audit
            anti_repeat_pass = await cdp_eval(ws, """
                (() => {
                    // Reset answeredQuestions
                    appState.answeredQuestions = [];
                    // Start quiz round 1
                    startChapterQuiz(1, 'basic');
                    const r1_ids = currentSession.questions.map(q => q.id);
                    // Answer all 5
                    r1_ids.forEach(id => appState.answeredQuestions.push(id));
                    closeQuizModal();

                    // Start quiz round 2
                    startChapterQuiz(1, 'basic');
                    const r2_ids = currentSession.questions.map(q => q.id);
                    r2_ids.forEach(id => appState.answeredQuestions.push(id));
                    closeQuizModal();

                    // Check overlap between r1 and r2
                    const overlap = r1_ids.filter(id => r2_ids.includes(id));
                    return { r1_count: r1_ids.length, r2_count: r2_ids.length, overlap_count: overlap.length };
                })()
            """, req_id)
            anti_repeat_pass = anti_repeat_pass or {}
            print(f"\n[Test 11] 反覆刷題防重複隊列 (Anti-Repetition Queue):")
            print(f"  - 第一輪 5 題與第二輪 5 題之重複題數: {anti_repeat_pass.get('overlap_count')} 題 (預期: 0 題重疊)")
            test_results["anti_repetition_zero_overlap"] = (anti_repeat_pass.get("overlap_count") == 0)

            # Test 12: Online GitHub Pages Verification
            print(f"\n[Test 12] 線上 GitHub Pages 連線驗證:")
            online_url = "https://aaronhuang1205-bit.github.io/python-spy/"
            try:
                req = urllib.request.Request(online_url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(req, timeout=10) as resp:
                    online_status = resp.status
                    online_html = resp.read().decode('utf-8', errors='ignore')
                    has_title = "<title>Python 特務：滿分計畫" in online_html
                    has_no_hp = "id=\"hud-hp\"" not in online_html
                    print(f"  - 線上 HTTP 狀態碼: {online_status}")
                    print(f"  - 頁面標題正確: {has_title}")
                    print(f"  - 線上版生命值 HUD 已徹底拔除: {has_no_hp}")
                    test_results["online_http_200"] = (online_status == 200)
                    test_results["online_has_title"] = has_title
                    test_results["online_hp_removed"] = has_no_hp
            except Exception as e:
                print(f"  - 線上請求錯誤: {e}")
                test_results["online_http_200"] = False

            # Final summary
            print("\n=======================================================")
            print("                 自動化檢驗矩陣總結")
            print("=======================================================")
            all_passed = True
            for k, v in test_results.items():
                mark = "[PASS]" if v else "[FAIL]"
                print(f"  {mark:<8} {k}")
                if not v:
                    all_passed = False

            print("=======================================================")
            if all_passed:
                print(">>> 恭喜！全系統 12 大測試項目全部 100% PASS 通過驗證！<<<")
            else:
                print(">>> 部分項目未達標，請檢閱上述日誌。 <<<")
            print("=======================================================\n")

            return test_results, all_passed

    finally:
        chrome_proc.terminate()

def main():
    # 1. Start HTTP server in background thread
    t = threading.Thread(target=start_server, daemon=True)
    t.start()
    time.sleep(1)

    # 2. Run Python 3.12 questions verification first
    print("=======================================================")
    print("   執行題庫直譯器原生校驗 (verify_questions.py)")
    print("=======================================================")
    cmd_verify = [sys.executable, "verify_questions.py"]
    res_verify = subprocess.run(cmd_verify, cwd=PROJECT_DIR, capture_output=True, text=True, encoding="utf-8", errors="ignore")
    if res_verify.returncode == 0 and "192/192" in res_verify.stdout:
        print("[PASS] 192/192 道題目 Python 3.12 直譯器驗證 100% PASS！")
    else:
        print("[FAIL] 題庫驗證異常:")
        print(res_verify.stdout[-500:])
        sys.exit(1)

    # 3. Run async CDP tests
    results, all_pass = asyncio.run(run_cdp_tests())
    
    # Save test results to JSON
    with open(os.path.join(ARTIFACT_DIR, "audit_summary.json"), "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    if not all_pass:
        sys.exit(1)

if __name__ == "__main__":
    main()
