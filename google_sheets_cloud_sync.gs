/**
 * 《Python 特務：滿分計畫》Google Sheets 免資料庫雲端同步中繼站 (Google Apps Script)
 * =========================================================================
 * 部署步驟 (3 分鐘完成)：
 * 1. 前往 https://sheets.new 建立一份空白 Google 試算表。
 * 2. 點選頂部選單「擴充功能 (Extensions)」->「Apps Script」，將本檔案內容完整貼入 Code.gs 並儲存。
 * 3. 點選右上角「部署 (Deploy)」->「新增部署作業 (New deployment)」：
 *    - 類型選擇：「網頁應用程式 (Web app)」
 *    - 執行身分 (Execute as)：「我 (Me)」
 *    - 誰可以存取 (Who has access)：「所有人 (Anyone)」(支援免登入前端跨域 text/plain 請求)
 * 4. 複製部署後的網址 (https://script.google.com/macros/s/.../exec)，貼入遊戲「特務檔案 -> 雲端同步設定」即可！
 */

const SHEET_NAME = "Agents";

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["studentId", "stateJson", "updatedAt", "level", "xp", "totalAnswered", "totalCorrect"]);
    sheet.getRange(1, 1, 1, 7).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * 伺服器端智慧合併 (Smart Merge)：確保雙向同步永遠保留最高星級、最高經驗值與題目聯集
 */
function smartMergeState(existing, incoming) {
  if (!existing || typeof existing !== "object") return incoming;
  if (!incoming || typeof incoming !== "object") return existing;

  const merged = JSON.parse(JSON.stringify(existing));
  merged.studentId = incoming.studentId || existing.studentId;
  merged.level = Math.max(Number(existing.level) || 1, Number(incoming.level) || 1);
  merged.xp = Math.max(Number(existing.xp) || 0, Number(incoming.xp) || 0);
  merged.streak = Math.max(Number(existing.streak) || 0, Number(incoming.streak) || 0);
  merged.maxStreak = Math.max(Number(existing.maxStreak) || 0, Number(incoming.maxStreak) || 0);
  merged.totalAnswered = Math.max(Number(existing.totalAnswered) || 0, Number(incoming.totalAnswered) || 0);
  merged.totalCorrect = Math.max(Number(existing.totalCorrect) || 0, Number(incoming.totalCorrect) || 0);

  // 合併章節星級 (1~6)
  merged.chapterProgress = merged.chapterProgress || {};
  const inCp = incoming.chapterProgress || {};
  for (let ch = 1; ch <= 6; ch++) {
    const eProg = merged.chapterProgress[ch] || { basicStars: 0, advancedStars: 0, unlocked: ch === 1 };
    const iProg = inCp[ch] || { basicStars: 0, advancedStars: 0, unlocked: ch === 1 };
    merged.chapterProgress[ch] = {
      basicStars: Math.max(Number(eProg.basicStars) || 0, Number(iProg.basicStars) || 0),
      advancedStars: Math.max(Number(eProg.advancedStars) || 0, Number(iProg.advancedStars) || 0),
      unlocked: Boolean(eProg.unlocked || iProg.unlocked || ch === 1)
    };
  }

  // 合併章節統計
  merged.chapterStats = merged.chapterStats || {};
  const inCs = incoming.chapterStats || {};
  for (let ch = 1; ch <= 6; ch++) {
    const eStat = merged.chapterStats[ch] || { correct: 0, total: 0 };
    const iStat = inCs[ch] || { correct: 0, total: 0 };
    merged.chapterStats[ch] = {
      correct: Math.max(Number(eStat.correct) || 0, Number(iStat.correct) || 0),
      total: Math.max(Number(eStat.total) || 0, Number(iStat.total) || 0)
    };
  }

  // 合併六維度統計
  const dims = ["syntax_io", "strings_ascii", "containers_memory", "control_flow", "functions_scope", "comprehensions_tools"];
  merged.dimensionStats = merged.dimensionStats || {};
  const inDs = incoming.dimensionStats || {};
  for (let i = 0; i < dims.length; i++) {
    const d = dims[i];
    const eDim = merged.dimensionStats[d] || { correct: 0, total: 0 };
    const iDim = inDs[d] || { correct: 0, total: 0 };
    merged.dimensionStats[d] = {
      correct: Math.max(Number(eDim.correct) || 0, Number(iDim.correct) || 0),
      total: Math.max(Number(eDim.total) || 0, Number(iDim.total) || 0)
    };
  }

  // 合併已答題與已見題 (取聯集)
  const unionArr = function(a, b) {
    const set = {};
    const out = [];
    (Array.isArray(a) ? a : []).concat(Array.isArray(b) ? b : []).forEach(function(item) {
      if (item && !set[item]) {
        set[item] = true;
        out.push(item);
      }
    });
    return out;
  };

  merged.answeredQuestions = unionArr(existing.answeredQuestions, incoming.answeredQuestions);
  merged.seenQuestions = unionArr(existing.seenQuestions, incoming.seenQuestions);
  // 錯題以最新傳入的狀態或聯集為準 (若 incoming 明確傳入 mistakes 陣列則採用 incoming 消滅後的結果與新錯題)
  merged.mistakes = Array.isArray(incoming.mistakes) ? incoming.mistakes : unionArr(existing.mistakes, incoming.mistakes);
  merged.updatedAt = new Date().toISOString();

  return merged;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 處理 GET 請求：依 studentId 讀取雲端存檔
 * 範例：GET https://script.google.com/macros/s/.../exec?studentId=B11902001
 */
function doGet(e) {
  try {
    const params = (e && e.parameter) ? e.parameter : {};
    const studentId = String(params.studentId || "").trim().toUpperCase();
    if (!studentId) {
      return jsonResponse({
        ok: true,
        service: "Python Agent Score 100 Cloud Sync Relay",
        status: "online"
      });
    }

    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]).trim().toUpperCase() === studentId) {
        let parsedState = null;
        try {
          parsedState = JSON.parse(data[i][1]);
        } catch (err) {
          parsedState = null;
        }
        return jsonResponse({
          ok: true,
          found: true,
          studentId: studentId,
          state: parsedState,
          updatedAt: data[i][2]
        });
      }
    }

    return jsonResponse({
      ok: true,
      found: false,
      studentId: studentId
    });
  } catch (err) {
    return jsonResponse({
      ok: false,
      error: String(err)
    });
  }
}

/**
 * 處理 POST 請求：使用 text/plain 接收進度並執行雙向智慧合併寫入
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const raw = (e && e.postData && e.postData.contents) ? e.postData.contents : "{}";
    const body = JSON.parse(raw);
    const studentId = String(body.studentId || (body.state && body.state.studentId) || "").trim().toUpperCase();

    if (!studentId || !body.state) {
      return jsonResponse({ ok: false, error: "Missing studentId or state payload" });
    }

    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    const nowIso = new Date().toISOString();
    let targetRow = -1;
    let existingState = null;

    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]).trim().toUpperCase() === studentId) {
        targetRow = i + 1;
        try {
          existingState = JSON.parse(data[i][1]);
        } catch (err) {
          existingState = null;
        }
        break;
      }
    }

    const mergedState = existingState ? smartMergeState(existingState, body.state) : body.state;
    const rowValues = [
      studentId,
      JSON.stringify(mergedState),
      nowIso,
      mergedState.level || 1,
      mergedState.xp || 0,
      mergedState.totalAnswered || 0,
      mergedState.totalCorrect || 0
    ];

    if (targetRow > 0) {
      sheet.getRange(targetRow, 1, 1, rowValues.length).setValues([rowValues]);
    } else {
      sheet.appendRow(rowValues);
    }

    return jsonResponse({
      ok: true,
      studentId: studentId,
      state: mergedState,
      updatedAt: nowIso
    });
  } catch (err) {
    return jsonResponse({
      ok: false,
      error: String(err)
    });
  } finally {
    lock.releaseLock();
  }
}
