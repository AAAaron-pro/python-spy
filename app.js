/**
 * Python 爬蟲特務：代碼覺醒 - 核心遊戲引擎與控制器
 * 對應台大「程式設計與網路資料搜集」(GenEdu5010) Exam 1
 */

// ==================== GLOBAL APP STATE & PROFILE SYSTEM ====================
const PROFILES_LIST_KEY = "ntu_python_agent_profiles_v2";
const ACTIVE_PROFILE_KEY = "ntu_python_agent_active_profile_v2";
const LEGACY_V1_KEY = "ntu_python_agent_state_v1";
const LEGACY_V1_MIGRATED_KEY = "ntu_python_agent_v1_migrated";
const CLOUD_SYNC_URL_KEY = "ntu_python_agent_cloud_sync_url_v2";
const DEFAULT_CLOUD_SYNC_URL = "";
const PUBLIC_ONLINE_BASE_URL = "https://aaaaron-pro.github.io/python-spy/";

const DEFAULT_DIMENSION_STATS = {
  syntax_io: { correct: 0, total: 0 },
  strings_ascii: { correct: 0, total: 0 },
  containers_memory: { correct: 0, total: 0 },
  control_flow: { correct: 0, total: 0 },
  functions_scope: { correct: 0, total: 0 },
  comprehensions_tools: { correct: 0, total: 0 }
};

const DIMENSION_KEYS = [
  "syntax_io",
  "strings_ascii",
  "containers_memory",
  "control_flow",
  "functions_scope",
  "comprehensions_tools"
];

const DIMENSION_MAP = {
  1: "syntax_io",
  2: "strings_ascii",
  3: "containers_memory",
  4: "control_flow",
  5: "functions_scope",
  6: "comprehensions_tools"
};

const DEFAULT_STATE = {
  studentId: null,
  level: 1,
  xp: 0,
  streak: 0,
  maxStreak: 0,
  totalAnswered: 0,
  totalCorrect: 0,
  answeredQuestions: [],
  dimensionStats: JSON.parse(JSON.stringify(DEFAULT_DIMENSION_STATS)),
  chapterProgress: {
    1: { basicStars: 0, advancedStars: 0, unlocked: true },
    2: { basicStars: 0, advancedStars: 0, unlocked: true },
    3: { basicStars: 0, advancedStars: 0, unlocked: true },
    4: { basicStars: 0, advancedStars: 0, unlocked: true },
    5: { basicStars: 0, advancedStars: 0, unlocked: true },
    6: { basicStars: 0, advancedStars: 0, unlocked: true }
  },
  chapterStats: {
    1: { correct: 0, total: 0 },
    2: { correct: 0, total: 0 },
    3: { correct: 0, total: 0 },
    4: { correct: 0, total: 0 },
    5: { correct: 0, total: 0 },
    6: { correct: 0, total: 0 }
  },
  mistakes: [], // Array of question IDs
  seenQuestions: [] // Array of question IDs seen in exams
};

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function sanitizeStudentId(rawId) {
  if (!rawId) return null;
  const cleaned = String(rawId).replace(/[<>"'&`]/g, "").trim().toUpperCase().slice(0, 20);
  return cleaned || null;
}

function getValidQuestionIdsSet() {
  if (typeof QUESTIONS_DATABASE !== "undefined" && Array.isArray(QUESTIONS_DATABASE)) {
    return new Set(QUESTIONS_DATABASE.map(q => q.id));
  }
  return new Set();
}

function cleanQuestionIdArray(arr) {
  if (!Array.isArray(arr)) return [];
  const validSet = getValidQuestionIdsSet();
  const deduped = Array.from(new Set(arr.filter(id => typeof id === "string" && id.trim().length > 0)));
  if (validSet.size === 0) return deduped;
  return deduped.filter(id => validSet.has(id));
}

/**
 * 深度拷貝與 Schema 正規化 (CHK-04 & CHK-09)
 * 嚴格避免淺拷貝污染 DEFAULT_STATE，自動過濾孤兒題目 ID，並在舊紀錄無 dimensionStats 時由 chapterStats 回填。
 */
function normalizeAndMigrateState(rawObj, overrideStudentId = null) {
  const base = cloneDefaultState();
  if (!rawObj || typeof rawObj !== "object") {
    base.studentId = sanitizeStudentId(overrideStudentId);
    return base;
  }

  base.studentId = sanitizeStudentId(overrideStudentId || rawObj.studentId);
  base.level = Math.max(1, Number(rawObj.level) || 1);
  base.xp = Math.max(0, Number(rawObj.xp) || 0);
  base.streak = Math.max(0, Number(rawObj.streak) || 0);
  base.maxStreak = Math.max(base.streak, Number(rawObj.maxStreak) || 0);
  base.totalAnswered = Math.max(0, Number(rawObj.totalAnswered) || 0);
  base.totalCorrect = Math.max(0, Number(rawObj.totalCorrect) || 0);

  // 逐層深拷貝合併 chapterProgress (1~6)
  if (rawObj.chapterProgress && typeof rawObj.chapterProgress === "object") {
    for (let ch = 1; ch <= 6; ch++) {
      const src = rawObj.chapterProgress[ch];
      if (src && typeof src === "object") {
        base.chapterProgress[ch] = {
          basicStars: Math.min(3, Math.max(0, Number(src.basicStars) || 0)),
          advancedStars: Math.min(3, Math.max(0, Number(src.advancedStars) || 0)),
          unlocked: true
        };
      }
    }
  }

  // 逐層深拷貝合併 chapterStats (1~6)
  let totalChStatCount = 0;
  if (rawObj.chapterStats && typeof rawObj.chapterStats === "object") {
    for (let ch = 1; ch <= 6; ch++) {
      const src = rawObj.chapterStats[ch];
      if (src && typeof src === "object") {
        const c = Math.max(0, Number(src.correct) || 0);
        const t = Math.max(c, Number(src.total) || 0);
        base.chapterStats[ch] = { correct: c, total: t };
        totalChStatCount += t;
      }
    }
  }

  // 逐層深拷貝合併 dimensionStats (6 大維度)
  let totalDimStatCount = 0;
  if (rawObj.dimensionStats && typeof rawObj.dimensionStats === "object") {
    DIMENSION_KEYS.forEach(dimKey => {
      const src = rawObj.dimensionStats[dimKey];
      if (src && typeof src === "object") {
        const c = Math.max(0, Number(src.correct) || 0);
        const t = Math.max(c, Number(src.total) || 0);
        base.dimensionStats[dimKey] = { correct: c, total: t };
        totalDimStatCount += t;
      }
    });
  }

  // 若舊版紀錄無 dimensionStats 數據但有 chapterStats，自動一次性無損回填至 dimensionStats
  if (totalDimStatCount === 0 && totalChStatCount > 0) {
    for (let ch = 1; ch <= 6; ch++) {
      const dimKey = DIMENSION_MAP[ch];
      base.dimensionStats[dimKey] = {
        correct: base.chapterStats[ch].correct,
        total: base.chapterStats[ch].total
      };
    }
  }

  // 過濾無效孤兒題目 ID 並去重
  base.mistakes = cleanQuestionIdArray(rawObj.mistakes);
  base.answeredQuestions = cleanQuestionIdArray(rawObj.answeredQuestions);
  base.seenQuestions = cleanQuestionIdArray(rawObj.seenQuestions);

  return base;
}

/**
 * 非破壞性智慧合併 (Smart Merge)：取最高星級、最高等級經驗值與題目紀錄聯集
 */
function smartMergeStates(stateA, stateB, targetStudentId = null) {
  const a = normalizeAndMigrateState(stateA, targetStudentId);
  const b = normalizeAndMigrateState(stateB, targetStudentId);
  const out = cloneDefaultState();

  out.studentId = sanitizeStudentId(targetStudentId || b.studentId || a.studentId);

  // 等級與 XP 智慧取高
  const scoreA = (a.level - 1) * 200 + a.xp;
  const scoreB = (b.level - 1) * 200 + b.xp;
  if (a.level > b.level || (a.level === b.level && a.xp >= b.xp) || scoreA >= scoreB) {
    out.level = Math.max(a.level, b.level);
    out.xp = a.level === b.level ? Math.max(a.xp, b.xp) : (a.level > b.level ? a.xp : b.xp);
  } else {
    out.level = b.level;
    out.xp = b.xp;
  }

  out.streak = Math.max(a.streak, b.streak);
  out.maxStreak = Math.max(a.maxStreak, b.maxStreak, out.streak);
  out.totalAnswered = Math.max(a.totalAnswered, b.totalAnswered);
  out.totalCorrect = Math.max(a.totalCorrect, b.totalCorrect);

  for (let ch = 1; ch <= 6; ch++) {
    out.chapterProgress[ch] = {
      basicStars: Math.max(a.chapterProgress[ch].basicStars, b.chapterProgress[ch].basicStars),
      advancedStars: Math.max(a.chapterProgress[ch].advancedStars, b.chapterProgress[ch].advancedStars),
      unlocked: true
    };
    const total = Math.max(a.chapterStats[ch].total, b.chapterStats[ch].total);
    const correct = Math.min(total, Math.max(a.chapterStats[ch].correct, b.chapterStats[ch].correct));
    out.chapterStats[ch] = { correct, total };
  }

  DIMENSION_KEYS.forEach(dimKey => {
    const total = Math.max(a.dimensionStats[dimKey].total, b.dimensionStats[dimKey].total);
    const correct = Math.min(total, Math.max(a.dimensionStats[dimKey].correct, b.dimensionStats[dimKey].correct));
    out.dimensionStats[dimKey] = { correct, total };
  });

  out.mistakes = cleanQuestionIdArray([...a.mistakes, ...b.mistakes]);
  out.answeredQuestions = cleanQuestionIdArray([...a.answeredQuestions, ...b.answeredQuestions]);
  out.seenQuestions = cleanQuestionIdArray([...a.seenQuestions, ...b.seenQuestions]);

  return normalizeAndMigrateState(out, out.studentId);
}

// ==================== STATE PERSISTENCE & PROFILES ====================
function getActiveStudentId() {
  const saved = localStorage.getItem(ACTIVE_PROFILE_KEY);
  return sanitizeStudentId(saved);
}

function getAllProfiles() {
  try {
    const raw = localStorage.getItem(PROFILES_LIST_KEY);
    if (raw) {
      const list = JSON.parse(raw);
      if (Array.isArray(list)) {
        return Array.from(new Set(list.map(id => sanitizeStudentId(id)).filter(Boolean)));
      }
    }
  } catch (e) {}
  return [];
}

function saveProfilesList(list) {
  try {
    const cleaned = Array.from(new Set((list || []).map(id => sanitizeStudentId(id)).filter(Boolean)));
    localStorage.setItem(PROFILES_LIST_KEY, JSON.stringify(cleaned));
  } catch (e) {}
}

function getStorageKeyForProfile(id) {
  return `ntu_python_agent_profile_${sanitizeStudentId(id)}`;
}

/**
 * 自動無損遷移舊版 v1 (`ntu_python_agent_state_v1`) 紀錄至指定特務學號檔案 (CHK-04)
 */
function migrateLegacyV1ToProfile(targetStudentId, currentProfileState = null) {
  const cleanId = sanitizeStudentId(targetStudentId);
  if (!cleanId) return currentProfileState;

  try {
    const v1Raw = localStorage.getItem(LEGACY_V1_KEY);
    const alreadyMigrated = localStorage.getItem(LEGACY_V1_MIGRATED_KEY);
    if (v1Raw && !alreadyMigrated) {
      const v1Parsed = JSON.parse(v1Raw);
      const v1Normalized = normalizeAndMigrateState(v1Parsed, cleanId);
      const merged = currentProfileState
        ? smartMergeStates(currentProfileState, v1Normalized, cleanId)
        : v1Normalized;

      localStorage.setItem(getStorageKeyForProfile(cleanId), JSON.stringify(merged));
      localStorage.setItem(LEGACY_V1_MIGRATED_KEY, cleanId);
      return merged;
    }
  } catch (e) {
    console.warn("Legacy v1 migration warning:", e);
  }
  return currentProfileState;
}

function loadState() {
  let studentId = getActiveStudentId();

  // 若尚無 v2 active profile，檢查舊版 v1 是否已存有學號或舊進度
  if (!studentId) {
    try {
      const v1Raw = localStorage.getItem(LEGACY_V1_KEY);
      if (v1Raw && !localStorage.getItem(LEGACY_V1_MIGRATED_KEY)) {
        const v1Parsed = JSON.parse(v1Raw);
        if (v1Parsed && v1Parsed.studentId) {
          studentId = sanitizeStudentId(v1Parsed.studentId);
          if (studentId) {
            localStorage.setItem(ACTIVE_PROFILE_KEY, studentId);
            const profiles = getAllProfiles();
            if (!profiles.includes(studentId)) {
              profiles.push(studentId);
              saveProfilesList(profiles);
            }
            return migrateLegacyV1ToProfile(studentId, null);
          }
        }
      }
    } catch (e) {}
    return normalizeAndMigrateState(null, null);
  }

  let loaded = normalizeAndMigrateState(null, studentId);
  try {
    const raw = localStorage.getItem(getStorageKeyForProfile(studentId));
    if (raw) {
      const parsed = JSON.parse(raw);
      loaded = normalizeAndMigrateState(parsed, studentId);
    }
  } catch (e) {
    console.warn("Failed to load state:", e);
  }

  // 若舊版 v1 尚未遷移，自動無損合併至當前啟用之特務學號檔案
  loaded = migrateLegacyV1ToProfile(studentId, loaded);
  return loaded;
}

let appState = loadState();

function saveState() {
  if (!appState || !appState.studentId) return;
  appState = normalizeAndMigrateState(appState, appState.studentId);
  try {
    localStorage.setItem(getStorageKeyForProfile(appState.studentId), JSON.stringify(appState));
    localStorage.setItem(ACTIVE_PROFILE_KEY, appState.studentId);
    const profiles = getAllProfiles();
    if (!profiles.includes(appState.studentId)) {
      profiles.push(appState.studentId);
      saveProfilesList(profiles);
    }
  } catch (e) {
    console.warn("Failed to save state:", e);
  }
  updateHUD();
}

// Active Quiz / Exam Variables
let currentSession = null;
let currentTraceIndex = 0;
let examTimerInterval = null;
let currentMistakeDimensionFilter = "all";

// ==================== A + C + D CROSS-DEVICE SYNC ARCHITECTURE (CHK-05) ====================

function bytesToBase64Url(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(b64url) {
  const b64 = String(b64url).replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  const binary = atob(b64 + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function utf8ToBase64Url(str) {
  const encoder = new TextEncoder();
  return bytesToBase64Url(encoder.encode(str));
}

function base64UrlToUtf8(b64url) {
  const decoder = new TextDecoder();
  return decoder.decode(base64UrlToBytes(b64url));
}

/**
 * 將題目 ID 陣列壓縮為緊湊索引陣列或 24-byte 位元遮罩 (~32 chars)，確保同步碼極致短小 (< 250 chars)
 */
function compressQuestionIds(idList) {
  if (!Array.isArray(idList) || idList.length === 0) return [];
  if (typeof QUESTIONS_DATABASE === "undefined" || !Array.isArray(QUESTIONS_DATABASE)) return idList;

  const indexMap = new Map();
  QUESTIONS_DATABASE.forEach((q, idx) => indexMap.set(q.id, idx));
  const indices = idList.map(id => indexMap.get(id)).filter(idx => idx !== undefined);

  if (indices.length <= 10) {
    return indices;
  }

  const byteLen = Math.ceil(QUESTIONS_DATABASE.length / 8);
  const mask = new Uint8Array(byteLen);
  indices.forEach(idx => {
    const byteIdx = idx >> 3;
    const bitIdx = idx & 7;
    mask[byteIdx] |= (1 << bitIdx);
  });
  return "~" + bytesToBase64Url(mask);
}

function decompressQuestionIds(compactVal) {
  if (!compactVal) return [];
  if (typeof QUESTIONS_DATABASE === "undefined" || !Array.isArray(QUESTIONS_DATABASE)) {
    return Array.isArray(compactVal) ? compactVal.filter(x => typeof x === "string") : [];
  }

  if (typeof compactVal === "string" && compactVal.startsWith("~")) {
    try {
      const mask = base64UrlToBytes(compactVal.slice(1));
      const out = [];
      for (let idx = 0; idx < QUESTIONS_DATABASE.length; idx++) {
        const byteIdx = idx >> 3;
        const bitIdx = idx & 7;
        if (byteIdx < mask.length && (mask[byteIdx] & (1 << bitIdx))) {
          out.push(QUESTIONS_DATABASE[idx].id);
        }
      }
      return out;
    } catch (e) {
      return [];
    }
  }

  if (Array.isArray(compactVal)) {
    return compactVal.map(item => {
      if (typeof item === "number" && QUESTIONS_DATABASE[item]) {
        return QUESTIONS_DATABASE[item].id;
      }
      return typeof item === "string" ? item : null;
    }).filter(Boolean);
  }
  return [];
}

/**
 * 【方案 A】產生位元/緊湊壓縮之特務同步碼 (AGENTv2.<base64url>)，長度控制在 70~190 字元內 (< 250 chars)
 */
function encodeCompactSyncToken(stateObj = appState) {
  const s = normalizeAndMigrateState(stateObj, stateObj ? stateObj.studentId : null);
  let cpStr = "";
  const cs = [];
  for (let ch = 1; ch <= 6; ch++) {
    const bStar = Math.min(3, Math.max(0, Number(s.chapterProgress[ch].basicStars) || 0));
    const aStar = Math.min(3, Math.max(0, Number(s.chapterProgress[ch].advancedStars) || 0));
    cpStr += String(bStar) + String(aStar);
    cs.push(s.chapterStats[ch].correct, s.chapterStats[ch].total);
  }
  cpStr = cpStr.replace(/0+$/, "");

  const ds = [];
  DIMENSION_KEYS.forEach(k => {
    ds.push(s.dimensionStats[k].correct, s.dimensionStats[k].total);
  });

  // 裁切尾部連續 0 以極小化 JSON 長度
  const trimZeros = (arr) => {
    const copy = arr.slice();
    while (copy.length > 0 && copy[copy.length - 1] === 0) copy.pop();
    return copy;
  };
  const csTrim = trimZeros(cs);
  const dsTrim = trimZeros(ds);
  const dsOut = JSON.stringify(csTrim) === JSON.stringify(dsTrim) ? 1 : dsTrim;

  const mComp = compressQuestionIds(s.mistakes);
  const aqComp = compressQuestionIds(s.answeredQuestions);
  const sqComp = compressQuestionIds(s.seenQuestions);
  const sqOut = JSON.stringify(aqComp) === JSON.stringify(sqComp) ? 1 : sqComp;

  const compactArray = [
    s.studentId || "AGENT",
    s.level,
    s.xp,
    s.streak,
    s.maxStreak,
    s.totalAnswered,
    s.totalCorrect,
    cpStr,
    csTrim,
    dsOut,
    mComp,
    aqComp,
    sqOut
  ];

  return "AGENTv2." + utf8ToBase64Url(JSON.stringify(compactArray));
}

/**
 * 【方案 A】解析 AGENTv2.<base64url> 緊湊同步碼或完整同步網址
 */
function decodeCompactSyncToken(rawInput) {
  if (!rawInput) return null;
  let token = String(rawInput).trim();

  // 若輸入為完整網址，提取 ?sync= 參數
  if (token.includes("sync=")) {
    try {
      const urlObj = new URL(token, window.location.origin);
      const param = urlObj.searchParams.get("sync");
      if (param) token = param.trim();
    } catch (e) {
      const m = token.match(/[?&]sync=([^&#]+)/);
      if (m) token = decodeURIComponent(m[1]);
    }
  }

  if (token.startsWith("AGENTv2.")) {
    token = token.slice("AGENTv2.".length);
  }

  const jsonStr = base64UrlToUtf8(token);
  const p = JSON.parse(jsonStr);

  // 若是位置陣列緊湊格式 (v2 ultra-compact)
  if (Array.isArray(p) && p.length >= 10) {
    const restored = cloneDefaultState();
    restored.studentId = sanitizeStudentId(p[0] || "AGENT");
    restored.level = Number(p[1]) || 1;
    restored.xp = Number(p[2]) || 0;
    restored.streak = Number(p[3]) || 0;
    restored.maxStreak = Number(p[4]) || 0;
    restored.totalAnswered = Number(p[5]) || 0;
    restored.totalCorrect = Number(p[6]) || 0;

    const cpStr = String(p[7] || "").padEnd(12, "0");
    for (let ch = 1; ch <= 6; ch++) {
      restored.chapterProgress[ch] = {
        basicStars: Number(cpStr[(ch - 1) * 2]) || 0,
        advancedStars: Number(cpStr[(ch - 1) * 2 + 1]) || 0,
        unlocked: true
      };
    }

    const csArr = Array.isArray(p[8]) ? p[8] : [];
    for (let ch = 1; ch <= 6; ch++) {
      restored.chapterStats[ch] = {
        correct: Number(csArr[(ch - 1) * 2]) || 0,
        total: Number(csArr[(ch - 1) * 2 + 1]) || 0
      };
    }

    const dsArr = p[9] === 1 ? csArr : (Array.isArray(p[9]) ? p[9] : []);
    DIMENSION_KEYS.forEach((k, idx) => {
      restored.dimensionStats[k] = {
        correct: Number(dsArr[idx * 2]) || 0,
        total: Number(dsArr[idx * 2 + 1]) || 0
      };
    });

    restored.mistakes = decompressQuestionIds(p[10]);
    restored.answeredQuestions = decompressQuestionIds(p[11]);
    restored.seenQuestions = p[12] === 1 ? restored.answeredQuestions.slice() : decompressQuestionIds(p[12]);

    return normalizeAndMigrateState(restored, restored.studentId);
  }

  // 若是完整 JSON state 格式亦向下相容
  if (p && p.chapterProgress && p.chapterStats) {
    return normalizeAndMigrateState(p, p.studentId);
  }

  if (!p || typeof p !== "object") return null;

  const restored = cloneDefaultState();
  restored.studentId = sanitizeStudentId(p.id || p.studentId || "AGENT");
  restored.level = Number(p.lv) || 1;
  restored.xp = Number(p.xp) || 0;
  restored.streak = Number(p.st) || 0;
  restored.maxStreak = Number(p.mst) || 0;
  restored.totalAnswered = Number(p.ta) || 0;
  restored.totalCorrect = Number(p.tc) || 0;

  if (Array.isArray(p.cp) && p.cp.length >= 12) {
    for (let ch = 1; ch <= 6; ch++) {
      restored.chapterProgress[ch] = {
        basicStars: Number(p.cp[(ch - 1) * 2]) || 0,
        advancedStars: Number(p.cp[(ch - 1) * 2 + 1]) || 0,
        unlocked: true
      };
    }
  }

  if (Array.isArray(p.cs) && p.cs.length >= 12) {
    for (let ch = 1; ch <= 6; ch++) {
      restored.chapterStats[ch] = {
        correct: Number(p.cs[(ch - 1) * 2]) || 0,
        total: Number(p.cs[(ch - 1) * 2 + 1]) || 0
      };
    }
  }

  if (Array.isArray(p.ds) && p.ds.length >= 12) {
    DIMENSION_KEYS.forEach((k, idx) => {
      restored.dimensionStats[k] = {
        correct: Number(p.ds[idx * 2]) || 0,
        total: Number(p.ds[idx * 2 + 1]) || 0
      };
    });
  }

  restored.mistakes = decompressQuestionIds(p.m);
  restored.answeredQuestions = decompressQuestionIds(p.aq);
  restored.seenQuestions = decompressQuestionIds(p.sq);

  return normalizeAndMigrateState(restored, restored.studentId);
}

function isLocalOrFileEnvironment() {
  const proto = window.location.protocol;
  const host = window.location.hostname;
  return proto === "file:" || host === "localhost" || host === "127.0.0.1" || !host;
}

function getSyncShareUrl(token = null) {
  const syncToken = token || encodeCompactSyncToken(appState);
  const baseUrl = isLocalOrFileEnvironment()
    ? PUBLIC_ONLINE_BASE_URL
    : `${window.location.origin}${window.location.pathname}`;
  return `${baseUrl}?sync=${encodeURIComponent(syncToken)}`;
}

/**
 * 【方案 C】前端動態生成高對比 QR Code (含 CDN qrcode-generator 與離線 SVG 容錯)
 */
function renderSyncQrCode() {
  const qrContainer = document.getElementById("sync-qr-container");
  const tokenOutput = document.getElementById("sync-token-output");
  const lenBadge = document.getElementById("sync-token-len-badge");
  const envNotice = document.getElementById("sync-qr-env-notice");
  const cloudInput = document.getElementById("input-cloud-sync-url");
  const cloudStatus = document.getElementById("cloud-sync-status");

  const token = encodeCompactSyncToken(appState);
  const shareUrl = getSyncShareUrl(token);

  if (tokenOutput) tokenOutput.value = token;
  if (lenBadge) lenBadge.textContent = `${token.length} chars (Compact)`;

  if (envNotice) {
    if (isLocalOrFileEnvironment()) {
      envNotice.classList.remove("hidden");
    } else {
      envNotice.classList.add("hidden");
    }
  }

  if (cloudInput) {
    const savedUrl = getCloudSyncUrl();
    cloudInput.value = savedUrl;
    if (cloudStatus) {
      cloudStatus.textContent = savedUrl ? "已綁定雲端中繼站" : "未連結雲端";
      cloudStatus.className = savedUrl ? "text-[10px] font-mono text-emerald-400" : "text-[10px] font-mono text-slate-400";
    }
  }

  if (!qrContainer) return;

  try {
    if (typeof window.qrcode === "function") {
      const qr = window.qrcode(0, "L");
      qr.addData(shareUrl);
      qr.make();
      qrContainer.innerHTML = qr.createSvgTag({ cellSize: 2, margin: 1, scalable: true });
      const svgEl = qrContainer.querySelector("svg");
      if (svgEl) {
        svgEl.setAttribute("width", "104");
        svgEl.setAttribute("height", "104");
        svgEl.classList.add("w-full", "h-full");
      }
      return;
    }
  } catch (e) {
    console.warn("QR render fallback triggered:", e);
  }

  // 離線無 CDN 時之決定性高對比矩陣 SVG 容錯圖騰
  const size = 21;
  let rects = "";
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const isFinder =
        (r < 7 && c < 7 && (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4))) ||
        (r < 7 && c >= size - 7 && (r === 0 || r === 6 || c === size - 7 || c === size - 1 || (r >= 2 && r <= 4 && c >= size - 5 && c <= size - 3))) ||
        (r >= size - 7 && c < 7 && (r === size - 7 || r === size - 1 || c === 0 || c === 6 || (r >= size - 5 && r <= size - 3 && c >= 2 && c <= 4)));
      const hashBit = ((token.charCodeAt((r * size + c) % token.length) + r * 7 + c * 13) % 3) === 0;
      if (isFinder || hashBit) {
        rects += `<rect x="${c}" y="${r}" width="1" height="1" fill="#0f172a"/>`;
      }
    }
  }
  qrContainer.innerHTML = `<svg viewBox="0 0 ${size} ${size}" width="104" height="104" class="w-full h-full">${rects}</svg>`;
}

function copySyncToken() {
  const token = encodeCompactSyncToken(appState);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(token).then(() => {
      showToast("📋 已複製特務緊湊同步碼！可跨裝置貼上還原！");
    }).catch(() => fallbackCopyText(token, "📋 已複製特務緊湊同步碼！"));
  } else {
    fallbackCopyText(token, "📋 已複製特務緊湊同步碼！");
  }
}

function copySyncUrl() {
  const url = getSyncShareUrl();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      showToast("🔗 已複製跨裝置同步連結！開啟連結即可自動合併進度！");
    }).catch(() => fallbackCopyText(url, "🔗 已複製跨裝置同步連結！"));
  } else {
    fallbackCopyText(url, "🔗 已複製跨裝置同步連結！");
  }
}

function fallbackCopyText(text, toastMsg) {
  const out = document.getElementById("sync-token-output");
  if (out) {
    out.value = text;
    out.select();
    try { document.execCommand("copy"); } catch (e) {}
  }
  showToast(toastMsg);
}

function applyIncomingSyncedState(incomingState, sourceLabel = "跨裝置同步") {
  if (!incomingState) {
    if (window.soundFX) window.soundFX.playWrong();
    showToast("⚠️ 同步碼格式無效或已損毀，請確認後重試！");
    return false;
  }

  const targetId = sanitizeStudentId(incomingState.studentId || (appState && appState.studentId) || "AGENT01");
  let existingForTarget = null;
  try {
    const raw = localStorage.getItem(getStorageKeyForProfile(targetId));
    if (raw) existingForTarget = JSON.parse(raw);
  } catch (e) {}

  if (!existingForTarget && appState && appState.studentId === targetId) {
    existingForTarget = appState;
  }

  const merged = existingForTarget
    ? smartMergeStates(existingForTarget, incomingState, targetId)
    : normalizeAndMigrateState(incomingState, targetId);

  appState = merged;
  saveState();
  renderChapters();
  renderMistakes();
  renderAnalytics();
  renderSyncQrCode();

  if (window.soundFX) window.soundFX.playLevelUp();
  showToast(`🔄 ${sourceLabel}完成！已智慧合併探員【${targetId}】進度！`);
  return true;
}

function applySyncTokenFromInput() {
  const inputEl = document.getElementById("import-sync-token-input");
  const raw = inputEl ? inputEl.value.trim() : "";
  if (!raw) {
    showToast("⚠️ 請先貼上 AGENTv2 同步碼或同步網址！");
    return;
  }
  try {
    const decoded = decodeCompactSyncToken(raw);
    if (applyIncomingSyncedState(decoded, "同步碼還原")) {
      inputEl.value = "";
      const inputId = document.getElementById("input-student-id");
      if (inputId && appState.studentId) inputId.value = appState.studentId;
    }
  } catch (e) {
    if (window.soundFX) window.soundFX.playWrong();
    showToast("⚠️ 無法解析同步碼，請確認複製內容完整！");
  }
}

/**
 * 【方案 D】Google Sheets (Google Apps Script) 免資料庫免費雲端自動同步
 */
function getCloudSyncUrl() {
  try {
    return (localStorage.getItem(CLOUD_SYNC_URL_KEY) || DEFAULT_CLOUD_SYNC_URL || "").trim();
  } catch (e) {
    return DEFAULT_CLOUD_SYNC_URL;
  }
}

function setCloudSyncUrl(url) {
  try {
    const clean = String(url || "").trim();
    if (clean) {
      localStorage.setItem(CLOUD_SYNC_URL_KEY, clean);
    } else {
      localStorage.removeItem(CLOUD_SYNC_URL_KEY);
    }
  } catch (e) {}
}

async function syncToCloud(silent = true) {
  const url = getCloudSyncUrl();
  if (!url || !appState || !appState.studentId) return false;

  const statusEl = document.getElementById("cloud-sync-status");
  if (statusEl) {
    statusEl.textContent = "雲端同步中...";
    statusEl.className = "text-[10px] font-mono text-cyan-400 animate-pulse";
  }

  try {
    // 關鍵：使用 text/plain;charset=utf-8 避免瀏覽器觸發 CORS OPTIONS preflight 阻擋 Google Apps Script
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        studentId: appState.studentId,
        state: appState,
        syncToken: encodeCompactSyncToken(appState),
        timestamp: new Date().toISOString()
      })
    });

    const data = await response.json();
    if (data && data.ok) {
      if (data.state) {
        appState = smartMergeStates(appState, data.state, appState.studentId);
        saveState();
      }
      if (statusEl) {
        statusEl.textContent = "✓ 雲端已同步";
        statusEl.className = "text-[10px] font-mono text-emerald-400";
      }
      if (!silent) showToast(`☁️ 已成功將探員【${appState.studentId}】進度同步至 Google Sheets 雲端！`);
      return true;
    }
  } catch (err) {
    console.warn("Cloud sync push warning:", err);
    if (statusEl) {
      statusEl.textContent = "雲端連線失敗(離線)";
      statusEl.className = "text-[10px] font-mono text-rose-400";
    }
    if (!silent) showToast("⚠️ 無法連線至 Google Apps Script，請確認網址與部署權限為「所有人」！");
  }
  return false;
}

async function syncFromCloud(studentId = null, silent = false) {
  const url = getCloudSyncUrl();
  const targetId = sanitizeStudentId(studentId || (appState && appState.studentId));
  if (!url || !targetId) {
    if (!silent) showToast("⚠️ 請先設定 Google Apps Script 網址並登入學號！");
    return false;
  }

  const statusEl = document.getElementById("cloud-sync-status");
  if (statusEl) {
    statusEl.textContent = "雲端拉取中...";
    statusEl.className = "text-[10px] font-mono text-cyan-400 animate-pulse";
  }

  try {
    const sep = url.includes("?") ? "&" : "?";
    const response = await fetch(`${url}${sep}studentId=${encodeURIComponent(targetId)}`, {
      method: "GET"
    });
    const data = await response.json();
    if (data && data.ok && data.found && data.state) {
      applyIncomingSyncedState(data.state, "Google 雲端試算表同步");
      if (statusEl) {
        statusEl.textContent = "✓ 雲端已同步";
        statusEl.className = "text-[10px] font-mono text-emerald-400";
      }
      return true;
    } else if (data && data.ok && !data.found) {
      if (!silent) showToast("☁️ 雲端尚無此學號紀錄，將自動為您上傳初始存檔！");
      return await syncToCloud(silent);
    }
  } catch (err) {
    console.warn("Cloud sync pull warning:", err);
    if (statusEl) {
      statusEl.textContent = "雲端拉取失敗";
      statusEl.className = "text-[10px] font-mono text-rose-400";
    }
    if (!silent) showToast("⚠️ 雲端拉取失敗，請檢查網路或 Google Apps Script 部署設定！");
  }
  return false;
}

function saveAndPushCloudSync() {
  const input = document.getElementById("input-cloud-sync-url");
  const url = input ? input.value.trim() : "";
  setCloudSyncUrl(url);
  if (!url) {
    showToast("🗑️ 已清除雲端同步網址設定。");
    renderSyncQrCode();
    return;
  }
  syncToCloud(false);
}

function pullCloudSync() {
  const input = document.getElementById("input-cloud-sync-url");
  if (input && input.value.trim()) {
    setCloudSyncUrl(input.value.trim());
  }
  syncFromCloud(appState ? appState.studentId : null, false);
}

/**
 * 實體 .json 存檔匯出與匯入備份 (CHK-05)
 */
function exportProfileJson() {
  if (!appState || !appState.studentId) {
    showToast("⚠️ 請先輸入特務學號再匯出存檔！");
    return;
  }
  const payload = {
    exportVersion: "2.0",
    exportedAt: new Date().toISOString(),
    syncToken: encodeCompactSyncToken(appState),
    state: appState
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `python_agent_${appState.studentId}_backup.json`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 200);
  showToast(`💾 已匯出特務【${appState.studentId}】之 .json 備份檔！`);
}

function importProfileJson(event) {
  const file = event && event.target && event.target.files ? event.target.files[0] : null;
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      const stateObj = (parsed && parsed.state) ? parsed.state : parsed;
      applyIncomingSyncedState(stateObj, "JSON 檔案匯入");
    } catch (err) {
      if (window.soundFX) window.soundFX.playWrong();
      showToast("⚠️ 匯入的 JSON 檔案格式不正確！");
    }
    event.target.value = "";
  };
  reader.readAsText(file, "utf-8");
}

// ==================== PROFILE MODAL CONTROLLERS ====================
function openProfileModal(isMandatory = false) {
  const isActuallyMandatory = isMandatory || !appState || !appState.studentId;
  if (!isActuallyMandatory && window.soundFX) window.soundFX.playClick();

  const modal = document.getElementById("profile-modal");
  const input = document.getElementById("input-student-id");
  const closeBtn = document.getElementById("btn-close-profile-modal");
  const noticeEl = document.getElementById("profile-mandatory-notice");
  const historySec = document.getElementById("profile-history-section");
  const historyContainer = document.getElementById("profile-history-list");

  if (closeBtn) {
    if (isActuallyMandatory) {
      closeBtn.classList.add("hidden");
    } else {
      closeBtn.classList.remove("hidden");
    }
  }

  if (noticeEl) {
    if (isActuallyMandatory) {
      noticeEl.classList.remove("hidden");
    } else {
      noticeEl.classList.add("hidden");
    }
  }

  if (input) {
    input.value = (appState && appState.studentId) ? appState.studentId : "";
    setTimeout(() => input.focus(), 150);
  }

  // 安全渲染歷史學號清單，徹底防止 XSS 注入 (CHK-09)
  const profiles = getAllProfiles();
  if (historySec && historyContainer) {
    historyContainer.innerHTML = "";
    if (profiles.length > 0) {
      historySec.classList.remove("hidden");
      profiles.forEach(id => {
        const cleanId = sanitizeStudentId(id);
        if (!cleanId) return;
        const btn = document.createElement("button");
        btn.type = "button";
        const isCurrent = appState && cleanId === appState.studentId;
        btn.className = `min-h-[38px] px-3 py-1 rounded-lg text-xs font-mono transition border ${
          isCurrent
            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500 font-bold"
            : "bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500"
        }`;
        btn.textContent = isCurrent ? `${cleanId} ●` : cleanId;
        btn.addEventListener("click", () => switchProfile(cleanId));
        historyContainer.appendChild(btn);
      });
    } else {
      historySec.classList.add("hidden");
    }
  }

  renderSyncQrCode();
  modal.classList.remove("hidden");
  lucide.createIcons();
}

function closeProfileModal() {
  if (!appState || !appState.studentId) {
    if (window.soundFX) window.soundFX.playWrong();
    showToast("⚠️ 請先輸入特務學號以完成建檔！");
    const input = document.getElementById("input-student-id");
    if (input) input.focus();
    return;
  }
  if (window.soundFX) window.soundFX.playClick();
  const modal = document.getElementById("profile-modal");
  if (modal) modal.classList.add("hidden");
}

function handleProfileSubmit(e) {
  if (e) e.preventDefault();
  const input = document.getElementById("input-student-id");
  const newId = sanitizeStudentId(input ? input.value : "");
  if (!newId || newId.length < 2) {
    if (window.soundFX) window.soundFX.playWrong();
    showToast("⚠️ 請輸入有效的特務學號或代號！");
    return;
  }

  switchProfile(newId);
  const modal = document.getElementById("profile-modal");
  if (modal) modal.classList.add("hidden");
  showToast(`🎖️ 特務檔案已啟動：探員【${escapeHtml(newId)}】！`);
}

function switchProfile(targetId) {
  const cleanId = sanitizeStudentId(targetId);
  if (!cleanId) return;

  // Save existing state first if there was a student
  if (appState && appState.studentId) {
    saveState();
  }

  localStorage.setItem(ACTIVE_PROFILE_KEY, cleanId);
  const profiles = getAllProfiles();
  if (!profiles.includes(cleanId)) {
    profiles.push(cleanId);
    saveProfilesList(profiles);
  }

  appState = loadState();
  saveState();
  updateHUD();
  renderChapters();
  renderMistakes();
  renderAnalytics();
  renderSyncQrCode();

  // 若已設定 Google Sheets 雲端中繼站，背景自動雙向同步
  if (getCloudSyncUrl()) {
    syncFromCloud(cleanId, true);
  }

  const modal = document.getElementById("profile-modal");
  if (modal) modal.classList.add("hidden");
  if (window.soundFX) window.soundFX.playCorrect();
}

// ==================== XP & RANK SYSTEM ====================
const RANKS = [
  { lv: 1, name: "見習探員", title: "Novice Agent" },
  { lv: 2, name: "終端操作員", title: "Terminal Operator" },
  { lv: 3, name: "字符解碼師", title: "Cipher Breaker" },
  { lv: 4, name: "資料特務", title: "Data Operative" },
  { lv: 5, name: "語法駭客", title: "Syntax Hacker" },
  { lv: 6, name: "爬蟲專家", title: "Scraper Specialist" },
  { lv: 7, name: "系統總架構師", title: "Master Architect" }
];

function getRank(level) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (level >= RANKS[i].lv) return RANKS[i];
  }
  return RANKS[0];
}

function addXP(amount) {
  appState.xp += amount;
  const xpNeeded = appState.level * 100;
  if (appState.xp >= xpNeeded) {
    appState.level += 1;
    appState.xp -= xpNeeded;
    window.soundFX.playLevelUp();
    showToast(`🎉 升級！特務軍階提升至 LV.${appState.level}【${getRank(appState.level).name}】！`);
  }
  saveState();
}

function updateHUD() {
  const studentIdEl = document.getElementById("hud-student-id");
  if (studentIdEl) {
    studentIdEl.textContent = (appState && appState.studentId) ? appState.studentId : "未登入特務";
  }

  const levelEl = document.getElementById("hud-level");
  const rankEl = document.getElementById("hud-rank");
  const xpBarEl = document.getElementById("hud-xp-bar");
  const comboEl = document.getElementById("hud-combo");
  const badgeEl = document.getElementById("mistake-badge");

  if (levelEl) levelEl.textContent = `L${appState.level}`;
  if (rankEl) rankEl.textContent = getRank(appState.level).name;
  if (xpBarEl) {
    const xpNeeded = appState.level * 100;
    const pct = Math.min(100, Math.round((appState.xp / xpNeeded) * 100));
    xpBarEl.style.width = `${pct}%`;
  }
  if (comboEl) comboEl.textContent = `${appState.streak} Combo`;

  if (badgeEl) {
    // 僅統計存在於題庫中之有效錯題 ID (CHK-09)
    const validMistakes = cleanQuestionIdArray(appState.mistakes);
    appState.mistakes = validMistakes;
    const count = validMistakes.length;
    if (count > 0) {
      badgeEl.textContent = count;
      badgeEl.classList.remove("hidden");
    } else {
      badgeEl.classList.add("hidden");
    }
  }
}

function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "fixed bottom-5 right-5 z-50 bg-cyan-950 border border-cyan-500 text-cyan-200 px-4 py-3 rounded-xl shadow-2xl pop-anim text-sm font-medium flex items-center gap-2";
  toast.innerHTML = `<i data-lucide="bell" class="w-4 h-4 text-cyan-400"></i> <span>${escapeHtml(msg)}</span>`;
  document.body.appendChild(toast);
  lucide.createIcons();
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease";
    setTimeout(() => toast.remove(), 500);
  }, 3500);
}

// ==================== TAB NAVIGATION ====================
function switchTab(tabId) {
  window.soundFX.playClick();
  const tabs = ["chapters", "arena", "mistakes", "analytics"];
  tabs.forEach(t => {
    const view = document.getElementById(`view-${t}`);
    const btn = document.getElementById(`tab-btn-${t}`);
    if (t === tabId) {
      view.classList.remove("hidden");
      btn.className = "min-h-[44px] flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition bg-cyan-500/20 text-cyan-300 border border-cyan-500/30";
    } else {
      view.classList.add("hidden");
      btn.className = "min-h-[44px] flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 transition";
    }
  });

  if (tabId === "chapters") renderChapters();
  if (tabId === "mistakes") renderMistakes();
  if (tabId === "analytics") renderAnalytics();
  lucide.createIcons();
}

// ==================== VIEW 1: CHAPTERS MAP ====================
function renderChapters() {
  const container = document.getElementById("chapters-grid");
  if (!container) return;

  container.innerHTML = "";

  CHAPTERS_DATA.forEach(ch => {
    const prog = appState.chapterProgress[ch.id] || { basicStars: 0, advancedStars: 0, unlocked: true };
    const totalStars = prog.basicStars + prog.advancedStars;

    const card = document.createElement("div");
    card.className = "bg-agent-card border border-agent-border rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/40 transition group shadow-xl";

    const starsHtml = `
      <div class="flex items-center gap-1 text-amber-400 text-xs">
        ${Array.from({ length: 6 }).map((_, i) => `
          <i data-lucide="star" class="w-3.5 h-3.5 ${i < totalStars ? 'fill-current text-amber-400' : 'text-slate-700'}"></i>
        `).join("")}
        <span class="ml-1 text-slate-400 font-mono">(${totalStars}/6)</span>
      </div>
    `;

    card.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <span class="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
            CHAPTER 0${ch.id}
          </span>
          ${starsHtml}
        </div>

        <div>
          <h3 class="text-xl font-bold text-white group-hover:text-cyan-300 transition">${ch.title}</h3>
          <p class="text-xs text-cyan-400/80 font-mono mt-0.5">${ch.subtitle}</p>
        </div>

        <p class="text-xs text-slate-400 leading-relaxed line-clamp-2">
          ${ch.description}
        </p>
      </div>

      <div class="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
        <button onclick="openBriefingModal(${ch.id})" class="min-h-[44px] w-full py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium transition flex items-center justify-center gap-1.5">
          <i data-lucide="file-text" class="w-3.5 h-3.5 text-cyan-400"></i>
          <span>觀念情報卡 (重點統整)</span>
        </button>

        <div class="grid grid-cols-2 gap-2">
          <button onclick="startChapterQuiz(${ch.id}, 'basic')" class="min-h-[44px] py-2 px-3 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/50 text-xs font-bold transition flex items-center justify-center gap-1">
            <i data-lucide="shield" class="w-3.5 h-3.5"></i>
            <span>基礎突擊 (${prog.basicStars}/3⭐)</span>
          </button>
          
          <button onclick="startChapterQuiz(${ch.id}, 'advanced')" class="min-h-[44px] py-2 px-3 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/50 text-xs font-bold transition flex items-center justify-center gap-1">
            <i data-lucide="crosshair" class="w-3.5 h-3.5"></i>
            <span>進階陷阱 (${prog.advancedStars}/3⭐)</span>
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  lucide.createIcons();
}

// ==================== BRIEFING MODAL ====================
function openBriefingModal(chapterId) {
  window.soundFX.playClick();
  const ch = CHAPTERS_DATA.find(c => c.id === chapterId);
  if (!ch) return;

  const titleEl = document.getElementById("briefing-title");
  const contentEl = document.getElementById("briefing-content");
  const modal = document.getElementById("briefing-modal");

  titleEl.textContent = `${ch.title}：${ch.subtitle}`;

  if (typeof renderConceptCardsHTML === "function") {
    contentEl.innerHTML = renderConceptCardsHTML(chapterId);
  } else if (Array.isArray(ch.briefing)) {
    contentEl.innerHTML = ch.briefing.map(b => `
      <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
        ${b}
      </div>
    `).join("");
  }

  modal.classList.remove("hidden");
  Prism.highlightAllUnder(contentEl);
  lucide.createIcons();
}

function closeBriefingModal() {
  window.soundFX.playClick();
  document.getElementById("briefing-modal").classList.add("hidden");
}

// ==================== TACTICAL DRONE ALERT MODAL (CHK-07: alarm_drone.jpg) ====================
function openAlarmModal(customTitle = null, customDesc = null) {
  if (window.soundFX) window.soundFX.playWrong();
  const modal = document.getElementById("tactical-alert-modal");
  const titleEl = document.getElementById("tactical-alert-title");
  const descEl = document.getElementById("tactical-alert-desc");

  if (titleEl && customTitle) {
    titleEl.innerHTML = `<i data-lucide="alert-octagon" class="w-5 h-5"></i><span>${escapeHtml(customTitle)}</span>`;
  }
  if (descEl && customDesc) {
    descEl.textContent = customDesc;
  }
  if (modal) {
    modal.classList.remove("hidden");
    lucide.createIcons();
  }
}

function closeAlarmModal() {
  if (window.soundFX) window.soundFX.playClick();
  const modal = document.getElementById("tactical-alert-modal");
  if (modal) modal.classList.add("hidden");
}

function reviveAgent() {
  closeAlarmModal();
  switchTab("mistakes");
}

// ==================== RANDOMIZE OPTIONS & CHAPTER QUIZ RUNNER (CHK-02) ====================
function randomizeQuestionOptions(q) {
  if (!q || !Array.isArray(q.options) || q.options.length !== 4) return q;
  const letters = ["A", "B", "C", "D"];
  const origAnsIdx = letters.indexOf(q.answer);
  if (origAnsIdx === -1) return q;

  const items = q.options.map((opt, idx) => ({
    text: opt.replace(/^[A-D]\.\s*/, ""),
    isCorrect: idx === origAnsIdx
  }));

  // 防呆保護：若最後一個選項為「皆不會引發錯誤 / 以上皆...」之綜合描述選項，固定第 4 選項位置，僅洗牌前 3 個選項
  const lastText = items[3].text;
  let shuffled;
  if (lastText.includes("皆不會") || lastText.includes("以上") || lastText.includes("皆是") || lastText.includes("皆非")) {
    shuffled = [...shuffle(items.slice(0, 3)), items[3]];
  } else {
    shuffled = shuffle([...items]);
  }

  const newAnsIdx = shuffled.findIndex(item => item.isCorrect);
  const newOptions = shuffled.map((item, idx) => `${letters[idx]}. ${item.text}`);
  const newAnswer = letters[newAnsIdx];

  return {
    ...q,
    options: newOptions,
    answer: newAnswer
  };
}

function startChapterQuiz(chapterId, difficulty) {
  if (!appState || !appState.studentId) {
    openProfileModal(true);
    showToast("⚠️ 請先輸入特務學號以開始作戰！");
    return;
  }
  window.soundFX.playClick();
  const pool = QUESTIONS_DATABASE.filter(q => q.chapterId === chapterId && q.difficulty === difficulty);

  if (pool.length === 0) {
    showToast("⚠️ 此難度題目尚在擴充中！");
    return;
  }

  if (!appState.answeredQuestions) appState.answeredQuestions = [];

  // Smart Anti-Repetition: prioritize questions not yet answered
  const unseen = pool.filter(q => !appState.answeredQuestions.includes(q.id));
  let candidates = [];
  if (unseen.length >= 5) {
    candidates = shuffle([...unseen]).slice(0, 5);
  } else if (unseen.length > 0) {
    const seen = pool.filter(q => appState.answeredQuestions.includes(q.id));
    candidates = [...shuffle([...unseen]), ...shuffle([...seen]).slice(0, 5 - unseen.length)];
  } else {
    candidates = shuffle([...pool]).slice(0, Math.min(5, pool.length));
  }

  const selectedQuestions = candidates.map(q => randomizeQuestionOptions(q));

  currentSession = {
    type: "chapter",
    chapterId,
    difficulty,
    questions: selectedQuestions,
    currentIndex: 0,
    correctCount: 0,
    userAnswers: []
  };

  renderCurrentQuizQuestion();
  document.getElementById("quiz-modal").classList.remove("hidden");
}

function closeQuizModal() {
  window.soundFX.playClick();
  document.getElementById("quiz-modal").classList.add("hidden");
  currentSession = null;
}

function renderCurrentQuizQuestion() {
  if (!currentSession) return;
  const q = currentSession.questions[currentSession.currentIndex];

  document.getElementById("quiz-tag-difficulty").textContent = q.difficulty.toUpperCase();
  document.getElementById("quiz-tag-difficulty").className = `px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
    q.difficulty === 'basic' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
  }`;
  document.getElementById("quiz-tag-chapter").textContent = `CH ${q.chapterId}`;
  document.getElementById("quiz-tag-category").textContent = q.category;
  document.getElementById("quiz-current-num").textContent = currentSession.currentIndex + 1;
  document.getElementById("quiz-total-num").textContent = currentSession.questions.length;

  document.getElementById("quiz-question-text").textContent = q.question;

  // Render python code with Prism
  const codeContainer = document.getElementById("quiz-code-container");
  if (q.code && q.code.trim()) {
    codeContainer.classList.remove("hidden");
    codeContainer.innerHTML = `<pre class="language-python"><code class="language-python">${escapeHtml(q.code)}</code></pre>`;
    Prism.highlightAllUnder(codeContainer);
  } else {
    codeContainer.classList.add("hidden");
  }

  // Render 4 options
  const optionsContainer = document.getElementById("quiz-options-container");
  optionsContainer.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const letter = ["A", "B", "C", "D"][idx];
    const btn = document.createElement("button");
    btn.className = "w-full p-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400/80 hover:bg-slate-800/90 text-left text-xs sm:text-sm text-slate-200 transition flex items-start gap-3 group";
    btn.id = `opt-btn-${letter}`;
    btn.innerHTML = `
      <span class="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs shrink-0 group-hover:border-cyan-500 group-hover:text-cyan-300">
        ${letter}
      </span>
      <span class="pt-0.5 leading-relaxed whitespace-pre-wrap font-mono break-all sm:break-normal text-slate-100">${escapeHtml(opt)}</span>
    `;
    btn.onclick = () => selectQuizAnswer(letter);
    optionsContainer.appendChild(btn);
  });

  // Hide feedback container
  document.getElementById("quiz-feedback-container").classList.add("hidden");
  lucide.createIcons();
}

function selectQuizAnswer(chosenLetter) {
  if (!currentSession) return;
  const q = currentSession.questions[currentSession.currentIndex];
  const isCorrect = chosenLetter === q.answer;
  const dim = q.dimension || DIMENSION_MAP[q.chapterId] || "syntax_io";

  if (!appState.dimensionStats) {
    appState.dimensionStats = JSON.parse(JSON.stringify(DEFAULT_DIMENSION_STATS));
  }
  if (!appState.dimensionStats[dim]) {
    appState.dimensionStats[dim] = { correct: 0, total: 0 };
  }

  // Record into answeredQuestions for anti-repetition queue
  if (!appState.answeredQuestions) appState.answeredQuestions = [];
  if (!appState.answeredQuestions.includes(q.id)) {
    appState.answeredQuestions.push(q.id);
  }

  // Disable all option buttons
  const optBtns = document.querySelectorAll("#quiz-options-container button");
  optBtns.forEach(btn => (btn.disabled = true));

  // Visual highlights
  const chosenBtn = document.getElementById(`opt-btn-${chosenLetter}`);
  const correctBtn = document.getElementById(`opt-btn-${q.answer}`);

  if (isCorrect) {
    window.soundFX.playCorrect();
    appState.streak += 1;
    if (appState.streak > appState.maxStreak) appState.maxStreak = appState.streak;
    if (appState.streak % 3 === 0) window.soundFX.playCombo(appState.streak);

    const xpEarned = q.difficulty === "basic" ? 25 : 50;
    addXP(xpEarned);
    currentSession.correctCount += 1;

    if (appState.chapterStats[q.chapterId]) {
      appState.chapterStats[q.chapterId].correct += 1;
    }
    appState.totalCorrect += 1;
    appState.dimensionStats[dim].correct += 1;

    // Eliminate mistake if resolved!
    if (appState.mistakes && appState.mistakes.includes(q.id)) {
      appState.mistakes = appState.mistakes.filter(id => id !== q.id);
      showToast("🎯 錯題成功消滅！已自錯題情報庫移出！");
    }

    if (chosenBtn) {
      chosenBtn.classList.remove("bg-slate-900", "border-slate-700");
      chosenBtn.classList.add("bg-emerald-950/80", "border-emerald-500", "text-emerald-200");
    }
  } else {
    window.soundFX.playWrong();
    appState.streak = 0;

    // Save to mistakes (deduplicated)
    if (!appState.mistakes) appState.mistakes = [];
    if (!appState.mistakes.includes(q.id)) {
      appState.mistakes.push(q.id);
    }

    if (chosenBtn) {
      chosenBtn.classList.remove("bg-slate-900", "border-slate-700");
      chosenBtn.classList.add("bg-rose-950/80", "border-rose-500", "text-rose-200", "shake-anim");
    }
    if (correctBtn) {
      correctBtn.classList.remove("bg-slate-900", "border-slate-700");
      correctBtn.classList.add("bg-emerald-950/80", "border-emerald-500", "text-emerald-200");
    }
  }

  appState.totalAnswered += 1;
  if (appState.chapterStats[q.chapterId]) {
    appState.chapterStats[q.chapterId].total += 1;
  }
  appState.dimensionStats[dim].total += 1;
  saveState();
  updateHUD();

  // Show explanation & Python Tutor step tracer
  showQuizFeedback(isCorrect, q);
}

function showQuizFeedback(isCorrect, q) {
  const container = document.getElementById("quiz-feedback-container");
  const banner = document.getElementById("quiz-feedback-banner");

  banner.className = `p-4 rounded-xl flex items-start gap-3 ${
    isCorrect ? "bg-emerald-950/50 border border-emerald-500/40 text-emerald-200" : "bg-rose-950/50 border border-rose-500/40 text-rose-200"
  }`;

  banner.innerHTML = `
    <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
      isCorrect ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
    }">
      <i data-lucide="${isCorrect ? 'check-circle' : 'alert-triangle'}" class="w-5 h-5"></i>
    </div>
    <div class="space-y-1 text-xs sm:text-sm">
      <div class="font-bold flex items-center gap-2">
        <span>${isCorrect ? "答對！觀念完全正確！" : `答錯！正確解答是 (${q.answer})`}</span>
        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-900 font-mono text-cyan-300">陷阱解析</span>
      </div>
      <p class="text-slate-300 leading-relaxed">${q.explanation}</p>
    </div>
  `;

  // Init Python Tutor step tracer
  currentTraceIndex = 0;
  renderTraceStep(q);

  container.classList.remove("hidden");
  lucide.createIcons();
}

function renderTraceStep(q) {
  if (!q.traceSteps || q.traceSteps.length === 0) return;
  const step = q.traceSteps[currentTraceIndex];

  document.getElementById("trace-step-indicator").textContent = `${currentTraceIndex + 1} / ${q.traceSteps.length}`;
  document.getElementById("trace-line-indicator").innerHTML = `
    <i data-lucide="arrow-right-circle" class="w-3.5 h-3.5"></i>
    <span>執行階段：第 ${step.line} 行指令</span>
  `;
  document.getElementById("trace-step-text").textContent = step.text;

  const varsContainer = document.getElementById("trace-vars-pills");
  varsContainer.innerHTML = "";
  if (step.vars && Object.keys(step.vars).length > 0) {
    Object.entries(step.vars).forEach(([k, v]) => {
      const pill = document.createElement("span");
      pill.className = "px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-cyan-300 border border-slate-700";
      pill.textContent = `${k} = ${v}`;
      varsContainer.appendChild(pill);
    });
  } else {
    varsContainer.innerHTML = `<span class="text-slate-500 text-[11px] italic">（無全域/區域變數異動）</span>`;
  }
  lucide.createIcons();
}

function traceStepPrev() {
  if (!currentSession) return;
  const q = currentSession.questions[currentSession.currentIndex];
  if (currentTraceIndex > 0) {
    window.soundFX.playClick();
    currentTraceIndex -= 1;
    renderTraceStep(q);
  }
}

function traceStepNext() {
  if (!currentSession) return;
  const q = currentSession.questions[currentSession.currentIndex];
  if (currentTraceIndex < q.traceSteps.length - 1) {
    window.soundFX.playClick();
    currentTraceIndex += 1;
    renderTraceStep(q);
  }
}

function nextQuizQuestion() {
  window.soundFX.playClick();
  currentSession.currentIndex += 1;

  if (currentSession.currentIndex < currentSession.questions.length) {
    renderCurrentQuizQuestion();
  } else {
    finishChapterQuiz();
  }
}

/**
 * 結算單章突擊或錯題重練 (CHK-03)
 * 若為錯題重練 (`mistake_single` / `mistake_all`) 或 `chapterId` 無效，絕不污染章節星級亦不拋出 TypeError！
 */
function finishChapterQuiz() {
  const { type, chapterId, difficulty, correctCount, questions } = currentSession;
  const total = questions.length;

  if (type !== "chapter" || !appState.chapterProgress[chapterId]) {
    saveState();
    if (getCloudSyncUrl()) syncToCloud(true);
    closeQuizModal();
    showToast(`🎯 錯題特訓完成！成功擊破 ${correctCount}/${total} 道錯題！`);
    renderMistakes();
    renderAnalytics();
    return;
  }

  const starsEarned = correctCount >= 4 ? 3 : correctCount >= 3 ? 2 : correctCount >= 2 ? 1 : 0;
  const prog = appState.chapterProgress[chapterId];
  if (difficulty === "basic") {
    if (starsEarned > prog.basicStars) prog.basicStars = starsEarned;
  } else {
    if (starsEarned > prog.advancedStars) prog.advancedStars = starsEarned;
  }
  saveState();
  if (getCloudSyncUrl()) syncToCloud(true);

  closeQuizModal();
  showToast(`🎯 本輪突擊結束！答對 ${correctCount}/${total} 題，獲得 ${starsEarned} 顆星！`);
  renderChapters();
}

// ==================== VIEW 2: ARENA & EXAM ENGINE ====================
function startExam(modeKey, questionCount, durationMinutes, filterDifficulty = null) {
  if (!appState || !appState.studentId) {
    openProfileModal(true);
    showToast("⚠️ 請先輸入特務學號以進入考場！");
    return;
  }
  window.soundFX.playClick();

  let pool = [...QUESTIONS_DATABASE];
  if (filterDifficulty) {
    pool = pool.filter(q => q.difficulty === filterDifficulty);
  }

  const seenSet = new Set(appState.seenQuestions || []);
  const mistakeSet = new Set(appState.mistakes || []);

  const unseenPool = pool.filter(q => !seenSet.has(q.id) && !mistakeSet.has(q.id));
  const mistakePool = pool.filter(q => mistakeSet.has(q.id));
  const seenPool = pool.filter(q => seenSet.has(q.id) && !mistakeSet.has(q.id));

  let prioritized = [...shuffle(unseenPool), ...shuffle(mistakePool), ...shuffle(seenPool)];
  if (prioritized.length < questionCount) {
    prioritized = [...prioritized, ...shuffle(pool)];
  }

  const selectedQuestions = prioritized
    .slice(0, Math.min(questionCount, pool.length))
    .map(q => randomizeQuestionOptions(q));

  currentSession = {
    type: "exam",
    modeKey,
    questions: selectedQuestions,
    userAnswers: new Array(selectedQuestions.length).fill(null),
    currentIndex: 0,
    secondsLeft: durationMinutes * 60,
    startTime: Date.now()
  };

  document.getElementById("exam-active-container").classList.remove("hidden");
  document.getElementById("exam-result-container").classList.add("hidden");

  if (examTimerInterval) clearInterval(examTimerInterval);
  updateTimerDisplay();
  examTimerInterval = setInterval(() => {
    currentSession.secondsLeft -= 1;
    updateTimerDisplay();
    if (currentSession.secondsLeft <= 0) {
      clearInterval(examTimerInterval);
      showToast("⏰ 考試時間到！系統自動交卷！");
      submitExam(true);
    }
  }, 1000);

  renderExamQuestion();
  renderExamDots();
  window.scrollTo({ top: document.getElementById("exam-active-container").offsetTop - 80, behavior: "smooth" });
}

function updateTimerDisplay() {
  if (!currentSession) return;
  const m = Math.floor(currentSession.secondsLeft / 60);
  const s = currentSession.secondsLeft % 60;
  const str = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  const timerEl = document.getElementById("exam-timer");
  if (timerEl) {
    timerEl.textContent = str;
    if (currentSession.secondsLeft < 300) {
      timerEl.className = "font-mono text-base font-bold text-rose-400 animate-pulse";
    }
  }
}

function renderExamDots() {
  const container = document.getElementById("exam-dots");
  container.innerHTML = "";

  currentSession.questions.forEach((_, idx) => {
    const dot = document.createElement("button");
    const isAnswered = currentSession.userAnswers[idx] !== null;
    const isCurrent = currentSession.currentIndex === idx;

    dot.className = `w-7 h-7 rounded text-xs font-mono font-bold transition flex items-center justify-center ${
      isCurrent
        ? "ring-2 ring-cyan-400 bg-cyan-500 text-slate-950"
        : isAnswered
        ? "bg-slate-700 text-cyan-300 border border-cyan-500/40"
        : "bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-600"
    }`;
    dot.textContent = idx + 1;
    dot.onclick = () => {
      currentSession.currentIndex = idx;
      renderExamQuestion();
      renderExamDots();
    };
    container.appendChild(dot);
  });
}

function renderExamQuestion() {
  const q = currentSession.questions[currentSession.currentIndex];
  const total = currentSession.questions.length;
  const currentAnswer = currentSession.userAnswers[currentSession.currentIndex];

  document.getElementById("exam-progress-text").textContent = `${currentSession.currentIndex + 1} / ${total}`;
  document.getElementById("exam-progress-bar").style.width = `${((currentSession.currentIndex + 1) / total) * 100}%`;

  const body = document.getElementById("exam-question-body");
  body.innerHTML = `
    <div class="space-y-3">
      <div class="flex items-center gap-2">
        <span class="px-2 py-0.5 text-xs font-mono rounded bg-slate-800 text-cyan-400 border border-slate-700">
          Q${currentSession.currentIndex + 1}
        </span>
        <span class="text-xs text-slate-400 font-mono">CH ${q.chapterId} · ${q.category}</span>
      </div>
      <h3 class="text-lg font-bold text-white leading-relaxed">${q.question}</h3>
      ${
        q.code && q.code.trim()
          ? `<pre class="language-python"><code class="language-python">${escapeHtml(q.code)}</code></pre>`
          : ""
      }
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
      ${q.options.map((opt, idx) => {
        const letter = ["A", "B", "C", "D"][idx];
        const isSelected = currentAnswer === letter;
        return `
          <button onclick="pickExamAnswer('${letter}')" class="p-3.5 rounded-xl text-left text-xs sm:text-sm transition flex items-start gap-3 border ${
            isSelected
              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
          }">
            <span class="w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
              isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
            }">${letter}</span>
            <span class="pt-0.5 leading-relaxed whitespace-pre-wrap font-mono break-all sm:break-normal text-slate-200">${escapeHtml(opt)}</span>
          </button>
        `;
      }).join("")}
    </div>
  `;

  Prism.highlightAllUnder(body);

  document.getElementById("btn-exam-prev").disabled = currentSession.currentIndex === 0;
  document.getElementById("btn-exam-next").disabled = currentSession.currentIndex === total - 1;
}

function pickExamAnswer(letter) {
  window.soundFX.playClick();
  currentSession.userAnswers[currentSession.currentIndex] = letter;
  renderExamQuestion();
  renderExamDots();
}

function navigateExamQuestion(delta) {
  window.soundFX.playClick();
  const nextIdx = currentSession.currentIndex + delta;
  if (nextIdx >= 0 && nextIdx < currentSession.questions.length) {
    currentSession.currentIndex = nextIdx;
    renderExamQuestion();
    renderExamDots();
  }
}

function confirmSubmitExam() {
  const answered = currentSession.userAnswers.filter(a => a !== null).length;
  const total = currentSession.questions.length;
  if (confirm(`您目前已完成 ${answered} / ${total} 題，確定要現在交卷結算嗎？`)) {
    submitExam(false);
  }
}

function submitExam(isTimeout = false) {
  if (examTimerInterval) clearInterval(examTimerInterval);
  window.soundFX.playLevelUp();

  const total = currentSession.questions.length;
  let correct = 0;
  const reviewList = [];

  if (!appState.seenQuestions) appState.seenQuestions = [];
  if (!appState.dimensionStats) appState.dimensionStats = JSON.parse(JSON.stringify(DEFAULT_DIMENSION_STATS));

  currentSession.questions.forEach((q, idx) => {
    const userAns = currentSession.userAnswers[idx];
    const isRight = userAns === q.answer;
    const dim = q.dimension || DIMENSION_MAP[q.chapterId] || "syntax_io";

    if (!appState.dimensionStats[dim]) {
      appState.dimensionStats[dim] = { correct: 0, total: 0 };
    }
    appState.dimensionStats[dim].total += 1;
    if (appState.chapterStats[q.chapterId]) {
      appState.chapterStats[q.chapterId].total += 1;
    }
    appState.totalAnswered += 1;

    if (!appState.seenQuestions.includes(q.id)) {
      appState.seenQuestions.push(q.id);
    }

    if (isRight) {
      correct += 1;
      appState.totalCorrect += 1;
      if (appState.chapterStats[q.chapterId]) {
        appState.chapterStats[q.chapterId].correct += 1;
      }
      appState.dimensionStats[dim].correct += 1;
      if (appState.mistakes && appState.mistakes.includes(q.id)) {
        appState.mistakes = appState.mistakes.filter(id => id !== q.id);
      }
    } else {
      if (!appState.mistakes.includes(q.id)) appState.mistakes.push(q.id);
    }
    reviewList.push({ q, userAns, isRight });
  });

  const score = Math.round((correct / total) * 100);
  addXP(correct * 30);
  saveState();
  if (getCloudSyncUrl()) syncToCloud(true);

  document.getElementById("exam-active-container").classList.add("hidden");
  const resContainer = document.getElementById("exam-result-container");
  resContainer.classList.remove("hidden");

  let grade = "D";
  let gradeColor = "text-rose-400";
  if (score >= 90) { grade = "S"; gradeColor = "text-amber-400"; }
  else if (score >= 80) { grade = "A"; gradeColor = "text-cyan-400"; }
  else if (score >= 70) { grade = "B"; gradeColor = "text-blue-400"; }
  else if (score >= 60) { grade = "C"; gradeColor = "text-emerald-400"; }

  // 掛載戰術警戒無人機視覺資產 (assets/alarm_drone.jpg - CHK-07)
  const showDroneWarning = score < 60 || isTimeout;
  const droneWarningHtml = showDroneWarning ? `
    <div class="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 flex flex-col sm:flex-row items-center gap-4">
      <div class="relative w-full sm:w-36 h-24 rounded-xl overflow-hidden border border-rose-500/50 shrink-0 scanline-box">
        <img src="assets/alarm_drone.jpg" alt="Tactical Recon Drone Alert" class="w-full h-full object-cover object-center cyber-float" />
      </div>
      <div class="space-y-1 text-left flex-1">
        <div class="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
          <i data-lucide="alert-octagon" class="w-4 h-4"></i>
          <span>RECON DRONE ALERT // ${isTimeout ? "作答時間屆滿警戒" : "戰術防線失分警戒"}</span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">
          戰術偵察機已將本次答錯題目同步收錄至「特務錯題情報庫」。建議立即檢視下方單步詳解或啟動錯題重練，修補高頻陷阱漏洞！
        </p>
      </div>
      <button onclick="openAlarmModal('戰術無人機深度診斷', '系統已鎖定本次模考失分題型，點擊「前往錯題特訓」即可逐一擊破！')" class="min-h-[44px] px-3.5 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-500 text-white text-xs font-bold transition shrink-0">
        戰術通報
      </button>
    </div>
  ` : "";

  resContainer.innerHTML = `
    <div class="text-center space-y-3 pb-6 border-b border-slate-800">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
        MISSION REPORT // 測驗結算報告
      </div>
      <h2 class="text-3xl font-extrabold text-white">期中模擬試煉評定</h2>
      <div class="flex items-center justify-center gap-6 pt-2">
        <div>
          <div class="text-xs text-slate-400">總得分數</div>
          <div class="text-4xl font-extrabold font-mono text-cyan-400">${score} <span class="text-lg text-slate-500">/ 100</span></div>
        </div>
        <div class="h-10 w-[1px] bg-slate-800"></div>
        <div>
          <div class="text-xs text-slate-400">特務評等</div>
          <div class="text-4xl font-extrabold font-mono ${gradeColor}">等級 ${grade}</div>
        </div>
        <div class="h-10 w-[1px] bg-slate-800"></div>
        <div>
          <div class="text-xs text-slate-400">答對題數</div>
          <div class="text-4xl font-extrabold font-mono text-emerald-400">${correct} / ${total}</div>
        </div>
      </div>
    </div>

    ${droneWarningHtml}

    <!-- Review questions list -->
    <div class="space-y-4">
      <h3 class="font-bold text-white text-base flex items-center gap-2">
        <i data-lucide="list-checks" class="w-5 h-5 text-cyan-400"></i>
        <span>試卷題目檢視與單步解析</span>
      </h3>
      <div class="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
        ${reviewList.map((item, idx) => `
          <div class="p-4 rounded-xl border ${
            item.isRight ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-rose-950/20 border-rose-900/50'
          } space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-mono text-slate-400">第 ${idx + 1} 題 · CH ${item.q.chapterId}</span>
              <span class="font-bold font-mono ${item.isRight ? 'text-emerald-400' : 'text-rose-400'}">
                ${item.isRight ? '✓ 正確' : `✗ 你的回答: (${item.userAns || '未答'}) · 正解: (${item.q.answer})`}
              </span>
            </div>
            <p class="text-xs sm:text-sm font-medium text-slate-200">${item.q.question}</p>
            ${
              item.q.code && item.q.code.trim()
                ? `<pre class="language-python !my-1"><code class="language-python">${escapeHtml(item.q.code)}</code></pre>`
                : ""
            }
            <div class="p-2.5 rounded bg-slate-900 text-xs text-slate-300 leading-relaxed border border-slate-800 mt-2">
              <strong class="text-cyan-400">【特務詳解】</strong> ${item.q.explanation}
            </div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="pt-4 border-t border-slate-800 flex justify-end gap-3">
      <button onclick="switchTab('mistakes')" class="min-h-[44px] px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition">
        查看錯題情報庫
      </button>
      <button onclick="switchTab('arena')" class="min-h-[44px] px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition">
        返回考場大廳
      </button>
    </div>
  `;

  Prism.highlightAllUnder(resContainer);
  lucide.createIcons();
}

// ==================== VIEW 3: MISTAKES VAULT (CHK-03 & CHK-09) ====================
let currentMistakeFilter = 0;

function filterMistakes(chId) {
  window.soundFX.playClick();
  currentMistakeFilter = chId;
  const btns = document.querySelectorAll("#mistake-filter-bar button");
  btns.forEach((btn, idx) => {
    if (idx === chId) {
      btn.className = "px-3 py-1 rounded-lg text-xs font-mono font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30";
    } else {
      btn.className = "px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-800 text-slate-400 hover:text-slate-200";
    }
  });
  renderMistakes();
}

function filterMistakesByDimension(dim) {
  window.soundFX.playClick();
  currentMistakeDimensionFilter = dim;
  const dims = ['all', 'syntax_io', 'strings_ascii', 'containers_memory', 'control_flow', 'functions_scope', 'comprehensions_tools'];
  dims.forEach(d => {
    const btn = document.getElementById(`mdf-${d}`);
    if (btn) {
      if (d === dim) {
        btn.className = "px-3 py-1 rounded-lg text-xs font-mono font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30";
      } else {
        btn.className = "px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-800 text-slate-400 hover:text-slate-200";
      }
    }
  });
  renderMistakes();
}

function renderMistakes() {
  const container = document.getElementById("mistake-list");
  if (!container) return;

  appState.mistakes = cleanQuestionIdArray(appState.mistakes);
  const mistakeQuestions = QUESTIONS_DATABASE.filter(q => appState.mistakes.includes(q.id));
  let filtered = currentMistakeFilter === 0
    ? mistakeQuestions
    : mistakeQuestions.filter(q => q.chapterId === currentMistakeFilter);

  if (currentMistakeDimensionFilter !== 'all') {
    filtered = filtered.filter(q => q.dimension === currentMistakeDimensionFilter);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 bg-agent-card border border-agent-border rounded-2xl space-y-3">
        <i data-lucide="shield-check" class="w-12 h-12 text-emerald-400 mx-auto"></i>
        <h4 class="text-lg font-bold text-white">暫無錯題情報！</h4>
        <p class="text-xs text-slate-400">目前沒有需要消滅的錯題。繼續保持高水準，迎戰期中考！</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map(q => `
    <div class="bg-agent-card border border-rose-950/60 hover:border-rose-500/40 rounded-xl p-5 space-y-3 transition">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-rose-950 text-rose-400 border border-rose-800">CH ${q.chapterId}</span>
          <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">${q.dimension || ''}</span>
          <span class="text-xs text-slate-400 font-mono">${q.category}</span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="reQuizSingle('${q.id}')" class="min-h-[40px] px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition flex items-center gap-1">
            <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
            <span>重新挑戰</span>
          </button>
          <button onclick="dismissMistake('${q.id}')" class="min-h-[40px] px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/70 border border-slate-700 hover:border-rose-600/60 text-slate-400 hover:text-rose-200 font-bold text-xs transition flex items-center gap-1" title="消滅並自錯題情報庫移除">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            <span>消滅情報</span>
          </button>
        </div>
      </div>

      <h4 class="font-bold text-white text-sm sm:text-base leading-relaxed">${q.question}</h4>
      ${
        q.code && q.code.trim()
          ? `<pre class="language-python !my-1"><code class="language-python">${escapeHtml(q.code)}</code></pre>`
          : ""
      }

      <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <div class="font-bold text-cyan-400 mb-1">【正解 (${q.answer}) 及考點點撥】</div>
        ${q.explanation}
      </div>
    </div>
  `).join("");

  Prism.highlightAllUnder(container);
  lucide.createIcons();
}

function dismissMistake(questionId) {
  if (!appState.mistakes) return;
  appState.mistakes = appState.mistakes.filter(id => id !== questionId);
  saveState();
  updateHUD();
  renderMistakes();
  showToast("🗑️ 已成功從錯題情報庫移除！");
}

function reQuizSingle(questionId) {
  const q = QUESTIONS_DATABASE.find(x => x.id === questionId);
  if (!q) return;

  currentSession = {
    type: "mistake_single",
    chapterId: q.chapterId,
    difficulty: q.difficulty,
    questions: [randomizeQuestionOptions(q)],
    currentIndex: 0,
    correctCount: 0,
    userAnswers: []
  };

  renderCurrentQuizQuestion();
  document.getElementById("quiz-modal").classList.remove("hidden");
}

function reQuizAllMistakes() {
  appState.mistakes = cleanQuestionIdArray(appState.mistakes);
  if (appState.mistakes.length === 0) {
    showToast("目前沒有錯題需要練習！");
    return;
  }
  const questions = QUESTIONS_DATABASE.filter(q => appState.mistakes.includes(q.id));
  currentSession = {
    type: "mistake_all",
    chapterId: 0,
    difficulty: "all",
    questions: shuffle([...questions]).map(q => randomizeQuestionOptions(q)),
    currentIndex: 0,
    correctCount: 0,
    userAnswers: []
  };
  renderCurrentQuizQuestion();
  document.getElementById("quiz-modal").classList.remove("hidden");
}

function clearAllMistakes() {
  if (confirm("確定要清空所有錯題記錄嗎？")) {
    appState.mistakes = [];
    saveState();
    renderMistakes();
    showToast("錯題庫已清空！");
  }
}

// ==================== VIEW 4: ANALYTICS & RADAR CHART (CHK-06) ====================
function renderRadarChart() {
  const container = document.getElementById("radar-chart-container");
  if (!container) return;

  const dims = [
    { key: "syntax_io", label: "語法與I/O", ch: 1 },
    { key: "strings_ascii", label: "字串與ASCII", ch: 2 },
    { key: "containers_memory", label: "容器與記憶體", ch: 3 },
    { key: "control_flow", label: "流程與迴圈", ch: 4 },
    { key: "functions_scope", label: "函式與作用域", ch: 5 },
    { key: "comprehensions_tools", label: "高效工具解析", ch: 6 }
  ];

  // 單一真實來源計算掌握度，絕不將 dStat 與 chStat 重複相加 (CHK-06)
  const scores = dims.map(d => {
    const dStat = (appState.dimensionStats && appState.dimensionStats[d.key]) || { correct: 0, total: 0 };
    const total = dStat.total;
    const correct = dStat.correct;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { ...d, total, correct, pct, hasData: total > 0 };
  });

  const width = 360;
  const height = 360;
  const cx = width / 2;
  const cy = height / 2;
  const maxR = 115;
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const getCoord = (angle, radius) => ({
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle)
  });

  const gridPolygons = levels.map(lvl => {
    const pts = dims.map((_, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
      const c = getCoord(angle, maxR * lvl);
      return `${c.x.toFixed(1)},${c.y.toFixed(1)}`;
    }).join(" ");
    return `<polygon points="${pts}" fill="none" stroke="${lvl === 1.0 ? 'rgba(6, 182, 212, 0.45)' : 'rgba(71, 85, 105, 0.3)'}" stroke-width="${lvl === 1.0 ? '1.5' : '1'}" stroke-dasharray="${lvl === 1.0 ? 'none' : '3 3'}" />`;
  }).join("");

  const axisLines = dims.map((_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
    const c = getCoord(angle, maxR);
    return `<line x1="${cx}" y1="${cy}" x2="${c.x.toFixed(1)}" y2="${c.y.toFixed(1)}" stroke="rgba(100, 116, 139, 0.35)" stroke-width="1" />`;
  }).join("");

  const userPoints = scores.map((s, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
    const val = s.hasData ? Math.max(0.15, Math.min(1.0, s.pct / 100)) : 0.35;
    const c = getCoord(angle, maxR * val);
    return `${c.x.toFixed(1)},${c.y.toFixed(1)}`;
  }).join(" ");

  const vertexElements = scores.map((s, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
    const val = s.hasData ? Math.max(0.15, Math.min(1.0, s.pct / 100)) : 0.35;
    const dot = getCoord(angle, maxR * val);
    const labelCoord = getCoord(angle, maxR + 26);

    let textAnchor = "middle";
    if (labelCoord.x > cx + 15) textAnchor = "start";
    else if (labelCoord.x < cx - 15) textAnchor = "end";

    return `
      <circle cx="${dot.x.toFixed(1)}" cy="${dot.y.toFixed(1)}" r="4.5" fill="#06b6d4" stroke="#e0f2fe" stroke-width="1.5">
        <animate attributeName="r" values="4;5.5;4" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="${labelCoord.x.toFixed(1)}" y="${labelCoord.y.toFixed(1)}" text-anchor="${textAnchor}" dominant-baseline="central" class="font-mono text-[11px] font-bold" fill="#e2e8f0">
        ${s.label}
        <tspan dx="3" fill="${s.hasData ? (s.pct >= 80 ? '#34d399' : s.pct >= 60 ? '#22d3ee' : '#f87171') : '#64748b'}">
          ${s.hasData ? s.pct + '%' : '--'}
        </tspan>
      </text>
    `;
  }).join("");

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" class="w-full max-w-[340px] h-auto drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]">
      <defs>
        <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.38" />
          <stop offset="70%" stop-color="#3b82f6" stop-opacity="0.18" />
          <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0" />
        </radialGradient>
      </defs>
      
      <circle cx="${cx}" cy="${cy}" r="${maxR}" fill="rgba(15, 23, 42, 0.7)" />
      ${gridPolygons}
      ${axisLines}
      <polygon points="${userPoints}" fill="url(#radarGlow)" stroke="#22d3ee" stroke-width="2.5" stroke-linejoin="round" />
      ${vertexElements}
    </svg>
  `;

  const sorted = [...scores].sort((a, b) => b.pct - a.pct);
  const dataPresent = scores.some(s => s.hasData);

  const strongEl = document.getElementById("radar-strongest-name");
  const strongDesc = document.getElementById("radar-strongest-desc");
  const weakEl = document.getElementById("radar-weakest-name");
  const weakDesc = document.getElementById("radar-weakest-desc");

  if (!dataPresent) {
    if (strongEl) strongEl.textContent = "尚待累積作戰數據";
    if (strongDesc) strongDesc.textContent = "完成至少一次突擊練習或模擬考，特務 AI 將自動繪製精準戰力多邊形並診斷強弱項。";
    if (weakEl) weakEl.textContent = "尚待累積作戰數據";
    if (weakDesc) weakDesc.textContent = "完成測驗後，系統將鎖定失分率最高之語法防線，提供專項強化突擊。";
  } else {
    const strongest = sorted[0];
    const weakest = sorted[sorted.length - 1];

    if (strongEl) strongEl.textContent = `【${strongest.label}】 (掌握度 ${strongest.pct}%)`;
    if (strongDesc) strongDesc.textContent = `特務在此領域反應敏銳，答對率居全維度之冠！在期中考中可作為穩健奪分的基石防線。`;

    if (weakEl) weakEl.textContent = `【${weakest.label}】 (掌握度 ${weakest.pct}%)`;
    if (weakDesc) weakDesc.textContent = `此領域失分較多或對語法邊界較不熟悉，建議點擊下方按鈕立即啟動「15 題專案突擊試煉」，全面修補弱項！`;
  }
}

function renderAnalytics() {
  document.getElementById("stat-total-answered").textContent = appState.totalAnswered;
  const acc = appState.totalAnswered > 0 ? Math.round((appState.totalCorrect / appState.totalAnswered) * 100) : 0;
  document.getElementById("stat-accuracy").textContent = `${acc}%`;
  document.getElementById("stat-max-streak").textContent = appState.maxStreak;

  let totalStars = 0;
  Object.values(appState.chapterProgress).forEach(p => {
    totalStars += p.basicStars + p.advancedStars;
  });
  document.getElementById("stat-total-stars").textContent = `${totalStars} / 36`;

  renderRadarChart();

  const container = document.getElementById("mastery-bars-container");
  container.innerHTML = "";

  CHAPTERS_DATA.forEach(ch => {
    const stat = appState.chapterStats[ch.id] || { correct: 0, total: 0 };
    const chAcc = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;

    const row = document.createElement("div");
    row.className = "space-y-1.5";
    row.innerHTML = `
      <div class="flex items-center justify-between text-xs">
        <span class="font-medium text-slate-200">CH 0${ch.id}：${ch.title}</span>
        <span class="font-mono text-cyan-400 font-bold">${chAcc}% (${stat.correct}/${stat.total})</span>
      </div>
      <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
        <div class="h-full rounded-full transition-all duration-500 ${
          chAcc >= 80 ? 'bg-emerald-400' : chAcc >= 60 ? 'bg-cyan-400' : 'bg-rose-400'
        }" style="width: ${chAcc}%"></div>
      </div>
    `;
    container.appendChild(row);
  });
}

// ==================== UTILITIES ====================
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==================== APP BOOTSTRAP ====================
document.addEventListener("DOMContentLoaded", () => {
  // 檢查網址是否帶有 ?sync=AGENTv2... 跨裝置同步參數 (CHK-05 Scheme A)
  try {
    const params = new URLSearchParams(window.location.search);
    const syncParam = params.get("sync");
    if (syncParam) {
      const incoming = decodeCompactSyncToken(syncParam);
      if (incoming) {
        applyIncomingSyncedState(incoming, "網址連結跨裝置同步");
      }
    }
  } catch (e) {
    console.warn("URL sync parameter parse warning:", e);
  }

  const currentId = getActiveStudentId();
  if (!currentId) {
    // 未登入特務：遊戲開始前強制彈出不可關閉之學號建檔視窗
    openProfileModal(true);
  } else if (getCloudSyncUrl()) {
    // 若已設定雲端中繼站，啟動時自動背景拉取合併
    syncFromCloud(currentId, true);
  }

  updateHUD();
  renderChapters();

  // Sound toggle handler
  const soundBtn = document.getElementById("btn-sound-toggle");
  const soundIcon = document.getElementById("icon-sound");
  if (soundBtn && soundIcon) {
    if (window.soundFX && window.soundFX.muted) {
      soundIcon.setAttribute("data-lucide", "volume-x");
    }
    soundBtn.onclick = () => {
      const isMuted = window.soundFX.toggleMute();
      soundIcon.setAttribute("data-lucide", isMuted ? "volume-x" : "volume-2");
      lucide.createIcons();
      showToast(isMuted ? "🔇 音效已靜音" : "🔊 音效已開啟");
    };
  }

  // Prevent Escape key from closing mandatory modal if unauthenticated
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const pModal = document.getElementById("profile-modal");
      if (pModal && !pModal.classList.contains("hidden")) {
        if (!appState || !appState.studentId) {
          e.preventDefault();
          showToast("⚠️ 請先輸入特務學號以完成建檔！");
          const input = document.getElementById("input-student-id");
          if (input) input.focus();
        }
      }
    }
  });
});
