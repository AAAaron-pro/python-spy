/**
 * Python 爬蟲特務：代碼覺醒 - 核心遊戲引擎與控制器
 * 對應台大「程式設計與網路資料搜集」(GenEdu5010) Exam 1
 */

// ==================== GLOBAL APP STATE & PROFILE SYSTEM ====================
const PROFILES_LIST_KEY = "ntu_python_agent_profiles_v2";
const ACTIVE_PROFILE_KEY = "ntu_python_agent_active_profile_v2";
const DEFAULT_STUDENT_ID = "B15609014";

const DEFAULT_DIMENSION_STATS = {
  syntax_io: { correct: 0, total: 0 },
  strings_ascii: { correct: 0, total: 0 },
  containers_memory: { correct: 0, total: 0 },
  control_flow: { correct: 0, total: 0 },
  functions_scope: { correct: 0, total: 0 },
  comprehensions_tools: { correct: 0, total: 0 }
};

const DIMENSION_MAP = {
  1: "syntax_io",
  2: "strings_ascii",
  3: "containers_memory",
  4: "control_flow",
  5: "functions_scope",
  6: "comprehensions_tools"
};

const DEFAULT_STATE = {
  studentId: DEFAULT_STUDENT_ID,
  level: 1,
  xp: 0,
  hp: 3,
  maxHp: 3,
  streak: 0,
  maxStreak: 0,
  totalAnswered: 0,
  totalCorrect: 0,
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

// ==================== STATE PERSISTENCE & PROFILES ====================
function getActiveStudentId() {
  const saved = localStorage.getItem(ACTIVE_PROFILE_KEY);
  return (saved || DEFAULT_STUDENT_ID).trim().toUpperCase();
}

function getAllProfiles() {
  try {
    const raw = localStorage.getItem(PROFILES_LIST_KEY);
    if (raw) {
      const list = JSON.parse(raw);
      if (Array.isArray(list) && list.length > 0) return list;
    }
  } catch (e) {}
  return [DEFAULT_STUDENT_ID];
}

function saveProfilesList(list) {
  try {
    localStorage.setItem(PROFILES_LIST_KEY, JSON.stringify(list));
  } catch (e) {}
}

function getStorageKeyForProfile(id) {
  return `ntu_python_agent_profile_${id}`;
}

function loadState() {
  const studentId = getActiveStudentId();
  try {
    const raw = localStorage.getItem(getStorageKeyForProfile(studentId));
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_STATE,
        ...parsed,
        studentId,
        dimensionStats: { ...DEFAULT_DIMENSION_STATS, ...(parsed.dimensionStats || {}) }
      };
    }
    // Migration check: if v1 exists and studentId is DEFAULT_STUDENT_ID
    const legacy = localStorage.getItem("ntu_python_agent_state_v1");
    if (legacy) {
      const parsed = JSON.parse(legacy);
      return {
        ...DEFAULT_STATE,
        ...parsed,
        studentId,
        dimensionStats: { ...DEFAULT_DIMENSION_STATS, ...(parsed.dimensionStats || {}) }
      };
    }
  } catch (e) {
    console.warn("Failed to load state:", e);
  }
  return { ...JSON.parse(JSON.stringify(DEFAULT_STATE)), studentId };
}

let appState = loadState();

function saveState() {
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

// ==================== PROFILE MODAL CONTROLLERS ====================
function openProfileModal() {
  window.soundFX.playClick();
  const modal = document.getElementById("profile-modal");
  const input = document.getElementById("input-student-id");
  const historyContainer = document.getElementById("profile-history-list");

  if (input) {
    input.value = appState.studentId || "";
  }

  if (historyContainer) {
    const profiles = getAllProfiles();
    historyContainer.innerHTML = profiles.map(id => `
      <button type="button" onclick="switchProfile('${id}')" class="px-2.5 py-1 rounded-lg text-xs font-mono transition border ${
        id === appState.studentId ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500 font-bold' : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
      }">
        ${id} ${id === appState.studentId ? '●' : ''}
      </button>
    `).join("");
  }

  modal.classList.remove("hidden");
  lucide.createIcons();
}

function closeProfileModal() {
  window.soundFX.playClick();
  const modal = document.getElementById("profile-modal");
  if (modal) modal.classList.add("hidden");
}

function handleProfileSubmit(e) {
  if (e) e.preventDefault();
  const input = document.getElementById("input-student-id");
  const newId = (input ? input.value : "").trim().toUpperCase();
  if (!newId) return;

  switchProfile(newId);
  closeProfileModal();
  showToast(`🎖️ 特務檔案已切換至：【${newId}】！`);
}

function switchProfile(targetId) {
  if (!targetId) return;
  targetId = targetId.trim().toUpperCase();

  // Save existing state first
  saveState();

  localStorage.setItem(ACTIVE_PROFILE_KEY, targetId);
  const profiles = getAllProfiles();
  if (!profiles.includes(targetId)) {
    profiles.push(targetId);
    saveProfilesList(profiles);
  }

  appState = loadState();
  updateHUD();
  renderChapters();
  renderMistakes();
  renderAnalytics();
  closeProfileModal();
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
    appState.hp = appState.maxHp; // Level up heals full HP
    window.soundFX.playLevelUp();
    showToast(`🎉 升級！特務軍階提升至 LV.${appState.level}【${getRank(appState.level).name}】！生命已補滿！`);
  }
  saveState();
}

function updateHUD() {
  const levelEl = document.getElementById("hud-level");
  const rankEl = document.getElementById("hud-rank");
  const xpBarEl = document.getElementById("hud-xp-bar");
  const hpEl = document.getElementById("hud-hp");
  const comboEl = document.getElementById("hud-combo");
  const badgeEl = document.getElementById("mistake-badge");

  if (levelEl) levelEl.textContent = `L${appState.level}`;
  if (rankEl) rankEl.textContent = getRank(appState.level).name;
  if (xpBarEl) {
    const xpNeeded = appState.level * 100;
    const pct = Math.min(100, Math.round((appState.xp / xpNeeded) * 100));
    xpBarEl.style.width = `${pct}%`;
  }
  if (hpEl) hpEl.textContent = `${appState.hp}/${appState.maxHp}`;
  if (comboEl) comboEl.textContent = `${appState.streak} Combo`;

  if (badgeEl) {
    const count = appState.mistakes.length;
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
  toast.innerHTML = `<i data-lucide="bell" class="w-4 h-4 text-cyan-400"></i> <span>${msg}</span>`;
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
      btn.className = "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition bg-cyan-500/20 text-cyan-300 border border-cyan-500/30";
    } else {
      view.classList.add("hidden");
      btn.className = "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 transition";
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
        <button onclick="openBriefingModal(${ch.id})" class="w-full py-1.5 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium transition flex items-center justify-center gap-1.5">
          <i data-lucide="file-text" class="w-3.5 h-3.5 text-cyan-400"></i>
          <span>觀念情報卡 (重點統整)</span>
        </button>

        <div class="grid grid-cols-2 gap-2">
          <button onclick="startChapterQuiz(${ch.id}, 'basic')" class="py-2 px-3 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/50 text-xs font-bold transition flex items-center justify-center gap-1">
            <i data-lucide="shield" class="w-3.5 h-3.5"></i>
            <span>基礎突擊 (${prog.basicStars}/3⭐)</span>
          </button>
          
          <button onclick="startChapterQuiz(${ch.id}, 'advanced')" class="py-2 px-3 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/50 text-xs font-bold transition flex items-center justify-center gap-1">
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

// ==================== ALARM & REVIVAL MODAL ====================
function openAlarmModal() {
  const modal = document.getElementById("alarm-modal");
  if (modal) {
    modal.classList.remove("hidden");
    window.soundFX.playWrong();
    lucide.createIcons();
  }
}

function closeAlarmModal() {
  window.soundFX.playClick();
  const modal = document.getElementById("alarm-modal");
  if (modal) {
    modal.classList.add("hidden");
  }
}

function reviveAgent() {
  window.soundFX.playLevelUp();
  appState.hp = appState.maxHp;
  saveState();
  closeAlarmModal();
  showToast("🛡️ 核心重啟成功！特務生命值已修復至 3/3！");
}

/// ==================== RANDOMIZE OPTIONS & CHAPTER QUIZ RUNNER ====================
function randomizeQuestionOptions(q) {
  if (!q || !Array.isArray(q.options) || q.options.length !== 4) return q;
  const letters = ["A", "B", "C", "D"];
  const origAnsIdx = letters.indexOf(q.answer);
  if (origAnsIdx === -1) return q;

  const items = q.options.map((opt, idx) => ({
    text: opt.replace(/^[A-D]\.\s*/, ""),
    isCorrect: idx === origAnsIdx
  }));

  const shuffled = shuffle([...items]);
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
  window.soundFX.playClick();
  const pool = QUESTIONS_DATABASE.filter(q => q.chapterId === chapterId && q.difficulty === difficulty);

  if (pool.length === 0) {
    showToast("⚠️ 此難度題目尚在擴充中！");
    return;
  }

  const selectedQuestions = shuffle([...pool])
    .slice(0, Math.min(5, pool.length))
    .map(q => randomizeQuestionOptions(q));

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
      <span class="pt-0.5 leading-relaxed">${escapeHtml(opt)}</span>
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

    appState.chapterStats[q.chapterId].correct += 1;
    appState.totalCorrect += 1;
    appState.dimensionStats[dim].correct += 1;

    // Eliminate mistake if resolved!
    if (appState.mistakes && appState.mistakes.includes(q.id)) {
      appState.mistakes = appState.mistakes.filter(id => id !== q.id);
    }

    if (chosenBtn) {
      chosenBtn.classList.remove("bg-slate-900", "border-slate-700");
      chosenBtn.classList.add("bg-emerald-950/80", "border-emerald-500", "text-emerald-200");
    }
  } else {
    window.soundFX.playWrong();
    appState.streak = 0;
    appState.hp = Math.max(0, appState.hp - 1);

    // Save to mistakes
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

    if (appState.hp === 0) {
      setTimeout(() => {
        openAlarmModal();
      }, 700);
    }
  }

  appState.totalAnswered += 1;
  appState.chapterStats[q.chapterId].total += 1;
  appState.dimensionStats[dim].total += 1;
  saveState();

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
    // Finished Chapter Drill!
    finishChapterQuiz();
  }
}

function finishChapterQuiz() {
  const { chapterId, difficulty, correctCount, questions } = currentSession;
  const total = questions.length;
  const starsEarned = correctCount >= 4 ? 3 : correctCount >= 3 ? 2 : correctCount >= 2 ? 1 : 0;

  const prog = appState.chapterProgress[chapterId];
  if (difficulty === "basic") {
    if (starsEarned > prog.basicStars) prog.basicStars = starsEarned;
  } else {
    if (starsEarned > prog.advancedStars) prog.advancedStars = starsEarned;
  }
  saveState();

  closeQuizModal();
  showToast(`🎯 本輪突擊結束！答對 ${correctCount}/${total} 題，獲得 ${starsEarned} 顆星！`);
  renderChapters();
}

// ==================== VIEW 2: ARENA & EXAM ENGINE ====================
function startExam(modeKey, questionCount, durationMinutes, filterDifficulty = null) {
  window.soundFX.playClick();

  let pool = [...QUESTIONS_DATABASE];
  if (filterDifficulty) {
    pool = pool.filter(q => q.difficulty === filterDifficulty);
  }

  // Smart Anti-Repetition Prioritization:
  // 1. Unseen questions first (never appeared in exam)
  // 2. Mistake questions second (reinforced practice)
  // 3. Seen questions third (cycled review)
  const seenSet = new Set(appState.seenQuestions || []);
  const mistakeSet = new Set(appState.mistakes || []);

  const unseenPool = pool.filter(q => !seenSet.has(q.id) && !mistakeSet.has(q.id));
  const mistakePool = pool.filter(q => mistakeSet.has(q.id));
  const seenPool = pool.filter(q => seenSet.has(q.id) && !mistakeSet.has(q.id));

  let prioritized = [...shuffle(unseenPool), ...shuffle(mistakePool), ...shuffle(seenPool)];
  if (prioritized.length < questionCount) {
    prioritized = [...prioritized, ...shuffle(pool)];
  }

  // Select questions and randomize ABCD option order
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

  // Switch UI to active exam view
  document.getElementById("exam-active-container").classList.remove("hidden");
  document.getElementById("exam-result-container").classList.add("hidden");

  // Setup Timer
  if (examTimerInterval) clearInterval(examTimerInterval);
  updateTimerDisplay();
  examTimerInterval = setInterval(() => {
    currentSession.secondsLeft -= 1;
    updateTimerDisplay();
    if (currentSession.secondsLeft <= 0) {
      clearInterval(examTimerInterval);
      showToast("⏰ 考試時間到！系統自動交卷！");
      submitExam();
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
            <span class="pt-0.5 leading-relaxed">${escapeHtml(opt)}</span>
          </button>
        `;
      }).join("")}
    </div>
  `;

  Prism.highlightAllUnder(body);

  // Prev / Next button states
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
    submitExam();
  }
}

function submitExam() {
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
    appState.chapterStats[q.chapterId].total += 1;
    appState.totalAnswered += 1;

    // Track seen questions for smart anti-repetition exam distribution
    if (!appState.seenQuestions.includes(q.id)) {
      appState.seenQuestions.push(q.id);
    }

    if (isRight) {
      correct += 1;
      appState.totalCorrect += 1;
      appState.chapterStats[q.chapterId].correct += 1;
      appState.dimensionStats[dim].correct += 1;
      // If was a mistake, eliminate it upon correct answer
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

  // Hide active exam, show result screen
  document.getElementById("exam-active-container").classList.add("hidden");
  const resContainer = document.getElementById("exam-result-container");
  resContainer.classList.remove("hidden");

  let grade = "D";
  let gradeColor = "text-rose-400";
  if (score >= 90) { grade = "S"; gradeColor = "text-amber-400"; }
  else if (score >= 80) { grade = "A"; gradeColor = "text-cyan-400"; }
  else if (score >= 70) { grade = "B"; gradeColor = "text-blue-400"; }
  else if (score >= 60) { grade = "C"; gradeColor = "text-emerald-400"; }

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
      <button onclick="switchTab('mistakes')" class="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition">
        查看錯題情報庫
      </button>
      <button onclick="switchTab('arena')" class="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition">
        返回考場大廳
      </button>
    </div>
  `;

  Prism.highlightAllUnder(resContainer);
  lucide.createIcons();
}

// ==================== VIEW 3: MISTAKES VAULT ====================
let currentMistakeFilter = 0;
let currentMistakeDimensionFilter = 'all';

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
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-rose-950 text-rose-400 border border-rose-800">CH ${q.chapterId}</span>
          <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">${q.dimension || ''}</span>
          <span class="text-xs text-slate-400 font-mono">${q.category}</span>
        </div>
        <button onclick="reQuizSingle('${q.id}')" class="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition flex items-center gap-1">
          <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
          <span>重新挑戰</span>
        </button>
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

function reQuizSingle(questionId) {
  const q = QUESTIONS_DATABASE.find(x => x.id === questionId);
  if (!q) return;

  currentSession = {
    type: "chapter",
    chapterId: q.chapterId,
    difficulty: q.difficulty,
    questions: [q],
    currentIndex: 0,
    correctCount: 0,
    userAnswers: []
  };

  renderCurrentQuizQuestion();
  document.getElementById("quiz-modal").classList.remove("hidden");
}

function reQuizAllMistakes() {
  if (appState.mistakes.length === 0) {
    showToast("目前沒有錯題需要練習！");
    return;
  }
  const questions = QUESTIONS_DATABASE.filter(q => appState.mistakes.includes(q.id));
  currentSession = {
    type: "chapter",
    chapterId: 0,
    difficulty: "all",
    questions: shuffle([...questions]),
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

// ==================== VIEW 4: ANALYTICS & RADAR CHART ====================
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

  // Calculate mastery rate for each dimension
  const scores = dims.map(d => {
    const dStat = (appState.dimensionStats && appState.dimensionStats[d.key]) || { correct: 0, total: 0 };
    const chStat = (appState.chapterStats && appState.chapterStats[d.ch]) || { correct: 0, total: 0 };
    const total = dStat.total + chStat.total;
    const correct = dStat.correct + chStat.correct;
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

  // Calculate polygon points for concentric grid webs
  const gridPolygons = levels.map(lvl => {
    const pts = dims.map((_, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
      const c = getCoord(angle, maxR * lvl);
      return `${c.x.toFixed(1)},${c.y.toFixed(1)}`;
    }).join(" ");
    return `<polygon points="${pts}" fill="none" stroke="${lvl === 1.0 ? 'rgba(6, 182, 212, 0.45)' : 'rgba(71, 85, 105, 0.3)'}" stroke-width="${lvl === 1.0 ? '1.5' : '1'}" stroke-dasharray="${lvl === 1.0 ? 'none' : '3 3'}" />`;
  }).join("");

  // Radial axes lines
  const axisLines = dims.map((_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
    const c = getCoord(angle, maxR);
    return `<line x1="${cx}" y1="${cy}" x2="${c.x.toFixed(1)}" y2="${c.y.toFixed(1)}" stroke="rgba(100, 116, 139, 0.35)" stroke-width="1" />`;
  }).join("");

  // User ability polygon
  const userPoints = scores.map((s, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
    const val = s.hasData ? Math.max(0.15, Math.min(1.0, s.pct / 100)) : 0.35;
    const c = getCoord(angle, maxR * val);
    return `${c.x.toFixed(1)},${c.y.toFixed(1)}`;
  }).join(" ");

  // Vertices dots & Labels
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

  // Update Tactical Diagnosis Cards
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
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==================== APP BOOTSTRAP ====================
document.addEventListener("DOMContentLoaded", () => {
  updateHUD();
  renderChapters();

  // Sound toggle handler
  const soundBtn = document.getElementById("btn-sound-toggle");
  const soundIcon = document.getElementById("icon-sound");
  if (soundBtn && soundIcon) {
    if (window.soundFX.muted) {
      soundIcon.setAttribute("data-lucide", "volume-x");
    }
    soundBtn.onclick = () => {
      const isMuted = window.soundFX.toggleMute();
      soundIcon.setAttribute("data-lucide", isMuted ? "volume-x" : "volume-2");
      lucide.createIcons();
      showToast(isMuted ? "🔇 音效已靜音" : "🔊 音效已開啟");
    };
  }
});
