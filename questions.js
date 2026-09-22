/**
 * Python 爬蟲特務：代碼覺醒 - 題庫與章節資料庫
 * 對齊台大「程式設計與網路資料搜集」(GenEdu5010) Exam 1 (W1-W5)
 * 全部題目皆為原創變形題，緊扣考古題核心觀念與易錯陷阱
 */

const CHAPTERS_DATA = [
  {
    id: 1,
    title: "第一章：終端訊號基地",
    subtitle: "I/O、資料型態、運算子與 PEP 8",
    description: "掌握程式執行的起點！深入理解 print 格式控制、input 字串本質、各型態轉換與 Python 社群編碼風格。",
    briefing: [
      "📌 print(a, b, sep='-', end=' ')：sep 決定元素間的分隔符號，end 決定結尾字元（預設為換行）。",
      "📌 input() 永遠傳回字串（str）！若要進行數值運算，必須明確使用 int() 或 float() 轉型。",
      "📌 整數除法 // 是向下取整（如 7 // 2 = 3，-7 // 2 = -4），% 為取餘數。",
      "📌 bool() 評判準則：0、0.0、空字串 ''、空串列 []、None 均為 False，其餘非空非零值均為 True。",
      "📌 PEP 8 風格：二元運算子前後需空一格，逗號與冒號後空一格、前不空格，縮排使用 4 個空格，變數命名具語意且以底線分隔。"
    ]
  },
  {
    id: 2,
    title: "第二章：字符密碼解析室",
    subtitle: "字串切片、ASCII/ord/chr 與字串方法",
    description: "拆解被編碼的秘密資料！精通 s[start:stop:step] 切片規則、ASCII 碼數值運算及各類字串處理方法。",
    briefing: [
      "📌 切片格式 s[start:stop:step]：含頭不含尾（左閉右開）。負索引 -1 代表最後一個字元，step 為負代表反向讀取。",
      "📌 ord(c) 回傳字元的 ASCII 數值（'A'是65, 'a'是97, '0'是48），chr(n) 則將數值轉回字元。",
      "📌 大小寫轉換密碼：大小寫 ASCII 數值恰好相差 32！chr(ord('A') + 32) -> 'a'；chr(ord('z') - 32) -> 'Z'。",
      "📌 字串具有不可變性（Immutable）：所有字串方法（如 replace(), upper()）都不會修改原字串，而是產生新字串傳回！",
      "📌 s.split(sep) 將字串依分隔符切成串列；''.join(list) 將字串串列組裝回字串。"
    ]
  },
  {
    id: 3,
    title: "第三章：資料矩陣防線",
    subtitle: "串列 (List) 記憶體機制、淺拷貝與排序",
    description: "直面考古題最高頻失分點！弄清參照別名與獨立複製的記憶體真相，徹底辨析 sort() 與 sorted() 的差異。",
    briefing: [
      "📌 變數別名陷阱：y = x 是讓 y 指向同一個記憶體位址，修改 y[0] 同時會改變 x[0]！",
      "📌 淺拷貝方式：y = x[:] 或 y = x.copy() 或 y = list(x) 才會產生新的獨立副本，此時修改 y 不影響 x。",
      "📌 排序大對決：list.sort() 是原地排序，回傳 None！而 sorted(list) 則是回傳一個全新的已排序串列，原串列維持不變。",
      "📌 串列動態操作：append(v) 在末尾加入；insert(idx, v) 在指定位置插入；pop(idx) 移出並回傳指定索引元素；remove(v) 移除第一個相符的值。"
    ]
  },
  {
    id: 4,
    title: "第四章：循環迴路之謎",
    subtitle: "for/while 迴圈、巢狀結構、break 與 continue",
    description: "破解失控的指令迴圈！精確計算 range() 邊界、雙層巢狀迴圈的執行次數，並熟練運用中斷與跳過指令。",
    briefing: [
      "📌 range(start, stop, step)：依然是含頭不含尾。例如 range(2, 9, 3) 產出 [2, 5, 8]；range(5, 0, -1) 產出 [5, 4, 3, 2, 1]（長度為5）。",
      "📌 break vs continue：break 會立即跳出當前整層迴圈；continue 則是立刻略過當前迭代剩下的程式，進入下一次迭代。",
      "📌 巢狀迴圈運算量：外層 M 次、內層 N 次，內層主體將執行 M * N 次；若內層有 break，只會跳出最內層迴圈！",
      "📌 while ... else 結構：只有當 while 條件自然變為 False 退出時才會執行 else；若是被 break 強行中斷，則不會執行 else！"
    ]
  },
  {
    id: 5,
    title: "第五章：核心指令與領域",
    subtitle: "函式 def、預設參數陷阱、作用域與 UnboundLocalError",
    description: "進入程式的核心中樞！掌握函式回傳機制、預設引數的評估時機，以及全域與區域變數的作用域雷區。",
    briefing: [
      "📌 函式無 return 時：Python 預設回傳 None，不是 0 也不是 False！",
      "📌 預設參數順序：定義函式時，具有預設值的參數必須排在沒有預設值的參數之後（如 def f(x, y=5) 合法，def f(x=5, y) 語法錯誤）。",
      "📌 可變預設參數陷阱（必考！）：def f(x=[]) 中的預設串列只在函式定義時建立一次！後續多次呼叫若未傳入引數，將共用同一個串列並累積！",
      "📌 UnboundLocalError 陷阱：函式內部只要有賦值語句（如 x = 10），Python 就會將 x 視為區域變數。如果在賦值前就嘗試讀取 print(x)，便會報錯 UnboundLocalError！若要修改全域變數，必須在函式開頭宣告 global x。"
    ]
  },
  {
    id: 6,
    title: "第六章：特務高階工具箱",
    subtitle: "zip、enumerate、串列表達式與例外處理",
    description: "裝備最優雅的 Pythonic 武器！精通 zip/enumerate 的解包遍歷、單雙層 List Comprehension 及例外防禦。",
    briefing: [
      "📌 enumerate(iterable, start=0)：同時產生 (index, item) 元組（tuple）。常配合 for i, v in enumerate(...) 解包使用。",
      "📌 zip(list1, list2)：將多個可迭代物件按相同索引打包成元組 (a, b)。長度依最短者為準，可用 list(zip(...)) 轉為串列。",
      "📌 List Comprehension 格式：[運算式 for 變數 in 串列 if 條件]。過濾與轉換一行搞定。",
      "📌 巢狀 List Comprehension：[(x, y) for x in A for y in B]，等價於外層 for x、內層 for y 的雙層迴圈。",
      "📌 例外處理：try 區塊放置可能出錯的代碼，except 區塊捕捉對應錯誤（如 ValueError, IndexError, ZeroDivisionError），避免程式無預警崩潰。"
    ]
  }
];

const QUESTIONS_DATABASE = [
  // ==========================================
  // CHAPTER 1: 訊號與變數基地
  // ==========================================
  {
    id: "ch1_b1",
    chapterId: 1,
    difficulty: "basic",
    category: "print格式化",
    question: "執行下列 Python 程式碼後，終端機的輸出結果為何？",
    code: `print("Alpha", "Beta", "Gamma", sep=" -> ", end="!\\n")`,
    options: [
      "A. Alpha Beta Gamma -> !",
      "B. Alpha -> Beta -> Gamma!",
      "C. Alpha -> Beta -> Gamma -> !",
      "D. AlphaBetaGamma!"
    ],
    answer: "B",
    explanation: "print 函式中的 sep 參數指定多個引數之間的分隔字元（此處為 ' -> '），end 參數指定最後印出的結尾字元（此處為 '!' 加上換行）。因此三個單字之間會被 ' -> ' 串接，末尾加上 '!'。",
    traceSteps: [
      { line: 1, text: "準備輸出引數：'Alpha', 'Beta', 'Gamma'", vars: { sep: "' -> '", end: "'!\\n'" } },
      { line: 1, text: "以 sep 串聯各字元：'Alpha -> Beta -> Gamma'", vars: { buffer: "'Alpha -> Beta -> Gamma'" } },
      { line: 1, text: "末端接上 end 字元並換行，印出最終字串", vars: { output: "'Alpha -> Beta -> Gamma!'" } }
    ]
  },
  {
    id: "ch1_b2",
    chapterId: 1,
    difficulty: "basic",
    category: "input型態",
    question: "若使用者在鍵盤輸入數字 7，下列程式碼印出的結果為何？",
    code: `num = input("請輸入數值: ")\nprint(num * 2)`,
    options: [
      "A. 14",
      "B. 77",
      "C. 7 * 2",
      "D. TypeError: can't multiply sequence by non-int"
    ],
    answer: "B",
    explanation: "input() 函式取得的輸入內容其型態永遠是字串（str），即使使用者輸入純數字也是字串 '7'。當字串乘上整數時（'7' * 2），Python 會執行字串重複操作，得到 '77'。",
    traceSteps: [
      { line: 1, text: "input() 接收使用者鍵盤輸入 '7'（型態為 str）", vars: { num: "'7' (str)" } },
      { line: 2, text: "計算 num * 2，字串乘整數代表重複兩次：'7' * 2 = '77'", vars: { result: "'77'" } },
      { line: 2, text: "print 印出 77", vars: { output: "77" } }
    ]
  },
  {
    id: "ch1_b3",
    chapterId: 1,
    difficulty: "basic",
    category: "型態轉換與整數除法",
    question: "下列程式碼的輸出結果是什麼？",
    code: `a = 19 // 4\nb = 19 % 4\nprint(a, b)`,
    options: [
      "A. 4.75 3",
      "B. 4 3",
      "C. 4 4",
      "D. 5 3"
    ],
    answer: "B",
    explanation: "// 為整數除法（floor division），19 除以 4 等於 4.75，向下取整為 4；% 為取餘數運算子（modulo），19 除以 4 的餘數為 3。因此印出 4 3。",
    traceSteps: [
      { line: 1, text: "計算整數除法：19 // 4 = 4", vars: { a: 4 } },
      { line: 2, text: "計算餘數：19 % 4 = 3", vars: { b: 3 } },
      { line: 3, text: "預設空格分隔輸出：4 3", vars: { output: "4 3" } }
    ]
  },
  {
    id: "ch1_b4",
    chapterId: 1,
    difficulty: "basic",
    category: "布林真假值",
    question: "執行下列程式碼會印出什麼？",
    code: `print(bool(0), bool(10), bool(""), bool(" "))`,
    options: [
      "A. False True False False",
      "B. False True False True",
      "C. True True False True",
      "D. False True True True"
    ],
    answer: "B",
    explanation: "在 Python 中，數值 0、空字串 \"\"、空容器與 None 被 bool() 轉換時均為 False；非零數值 10 為 True，且包含一個空白鍵的字串 \" \" 不是空字串（長度為 1），因此為 True！故印出 False True False True。",
    traceSteps: [
      { line: 1, text: "bool(0) 為數值 0，評估為 False", vars: { "bool(0)": "False" } },
      { line: 1, text: "bool(10) 為非零數值，評估為 True", vars: { "bool(10)": "True" } },
      { line: 1, text: "bool('') 為長度 0 的空字串，評估為 False", vars: { "bool('')": "False" } },
      { line: 1, text: "bool(' ') 包含空白字元（長度1），評估為 True", vars: { "bool(' ')": "True" } }
    ]
  },
  {
    id: "ch1_b5",
    chapterId: 1,
    difficulty: "basic",
    category: "變數多重賦值",
    question: "執行下列 Python 程式碼後，x 與 y 的值分別為何？",
    code: `x = 10\ny = 25\nx, y = y + 5, x * 2\nprint(x, y)`,
    options: [
      "A. 30 20",
      "B. 30 60",
      "C. 15 50",
      "D. 25 10"
    ],
    answer: "A",
    explanation: "在 Python 的多元賦值運算中，右邊的所有表達式會先同時計算完成，再對應指派給左側變數。右邊 y + 5 為 25 + 5 = 30，x * 2 為 10 * 2 = 20，因此 x 被賦值 30，y 被賦值 20。",
    traceSteps: [
      { line: 1, text: "變數初始化：x = 10", vars: { x: 10 } },
      { line: 2, text: "變數初始化：y = 25", vars: { y: 25 } },
      { line: 3, text: "評估等號右側表達式：(25 + 5, 10 * 2) = (30, 20)", vars: { "右側值": "(30, 20)" } },
      { line: 3, text: "解包賦值：x = 30, y = 20", vars: { x: 30, y: 20 } },
      { line: 4, text: "印出 30 20", vars: { output: "30 20" } }
    ]
  },
  {
    id: "ch1_a1",
    chapterId: 1,
    difficulty: "advanced",
    category: "型態轉換與複合運算",
    question: "下列程式碼的輸出結果為何？",
    code: `val1 = float("4.5")\nval2 = int(3.9)\nval3 = str(int("10") + 5)\nprint(val1 + val2, val3)`,
    options: [
      "A. 8.4 15",
      "B. 7.5 15",
      "C. 8.5 15",
      "D. 7.5 '15'"
    ],
    answer: "B",
    explanation: "1. float('4.5') 轉為 4.5；\n2. int(3.9) 是無條件捨去小數部分，得到整數 3（不是四捨五入成4！）；\n3. int('10') + 5 = 15，經 str() 轉為字串 '15'；\n4. val1 + val2 = 4.5 + 3 = 7.5。print(7.5, '15') 輸出 7.5 15。",
    traceSteps: [
      { line: 1, text: "float('4.5') 轉換為浮點數 4.5", vars: { val1: 4.5 } },
      { line: 2, text: "int(3.9) 直接無條件截斷小數，取得 3", vars: { val2: 3 } },
      { line: 3, text: "計算 10 + 5 = 15 並轉為字串 '15'", vars: { val3: "'15'" } },
      { line: 4, text: "4.5 + 3 = 7.5，印出 7.5 15", vars: { output: "7.5 15" } }
    ]
  },
  {
    id: "ch1_a2",
    chapterId: 1,
    difficulty: "advanced",
    category: "PEP 8 規範檢驗",
    question: "依據投影片所介紹的 PEP 8 與 Python 變數命名標準，下列何者符合良好的 Coding Style？",
    options: [
      "A. 變數命名以數字開頭，如 2nd_score = 90",
      "B. 串列索引前加空格，如 items[ 0 ]",
      "C. 二元運算子前後空一格，如 total = score_a + score_b",
      "D. 使用關鍵字當變數名，如 class = 'Data Science'"
    ],
    answer: "C",
    explanation: "根據 PEP 8：\n1. 二元運算子（如 =, +）前後應各留一個空白，變數命名應有語意且以底線分隔（snake_case）。\n2. 變數不可用數字開頭（2nd_score 語法錯誤）。\n3. 中括號、小括號內側緊鄰邊界處不應加空白（應為 items[0]）。\n4. class 是保留關鍵字，不能作為識別字。",
    traceSteps: [
      { line: 1, text: "檢查各選項語法與 PEP 8 風格", vars: {} },
      { line: 1, text: "C 符合運算子兩側留空格與蛇形命名法規範", vars: { valid: true } }
    ]
  },
  {
    id: "ch1_a3",
    chapterId: 1,
    difficulty: "advanced",
    category: "浮點數格式化輸出",
    question: "執行下列程式碼會印出什麼？",
    code: `pi_val = 3.1415926\nlabel = "PI"\nprint(f"{label}:{pi_val:.3f}:{type(pi_val).__name__}")`,
    options: [
      "A. PI:3.141:float",
      "B. PI:3.142:float",
      "C. PI:3.141:<class 'float'>",
      "D. PI:3.14:float"
    ],
    answer: "B",
    explanation: "在 f-string 中，{pi_val:.3f} 會將浮點數格式化為小數點後 3 位，第四位小數為 5，因此四捨五入為 3.142；type(pi_val).__name__ 取得型態的名稱字串 'float'。因此整體輸出 PI:3.142:float。",
    traceSteps: [
      { line: 1, text: "pi_val = 3.1415926", vars: { pi_val: 3.1415926 } },
      { line: 3, text: ".3f 格式化：3.1415... 取 3 位四捨五入成 3.142", vars: { formatted_pi: "'3.142'" } },
      { line: 3, text: "type(3.1415926).__name__ 取出型態名稱字串 'float'", vars: { type_name: "'float'" } },
      { line: 3, text: "組合 f-string 輸出 PI:3.142:float", vars: { output: "PI:3.142:float" } }
    ]
  },
  {
    id: "ch1_a4",
    chapterId: 1,
    difficulty: "advanced",
    category: "複合賦值運算順序",
    question: "下列程式碼執行完畢後，變數 total 的值為何？",
    code: `total = 12\ntotal += 4 * 2 ** 2\ntotal //= 3\nprint(total)`,
    options: [
      "A. 9",
      "B. 8",
      "C. 25",
      "D. 12"
    ],
    answer: "A",
    explanation: "運算子優先順序：次方 ** > 乘除 * / // % > 加減 + -。\n1. 2 ** 2 = 4；\n2. 4 * 4 = 16；\n3. total += 16 -> total 變為 12 + 16 = 28；\n4. total //= 3 -> 28 // 3 = 9。因此最終結果為 9。",
    traceSteps: [
      { line: 1, text: "total 初始化為 12", vars: { total: 12 } },
      { line: 2, text: "先算 2**2 = 4，再算 4*4 = 16", vars: { rhs: 16 } },
      { line: 2, text: "total += 16 -> total 成為 28", vars: { total: 28 } },
      { line: 3, text: "total //= 3 -> 28 // 3 = 9", vars: { total: 9 } },
      { line: 4, text: "輸出 9", vars: { output: 9 } }
    ]
  },
  {
    id: "ch1_a5",
    chapterId: 1,
    difficulty: "advanced",
    category: "短路求值與真值判斷",
    question: "下列程式碼的輸出結果為何？",
    code: `res = "" or 0 or "Python" and "Agent"\nprint(res)`,
    options: [
      "A. Python",
      "B. Agent",
      "C. True",
      "D. 0"
    ],
    answer: "B",
    explanation: "邏輯運算優先度：and 高於 or。\n1. 先計算 'Python' and 'Agent'：'Python' 為真，繼續看右邊，因此回傳最後一個真值 'Agent'；\n2. 表達式變為 '' or 0 or 'Agent'；\n3. '' 為假，看 0；0 也是假，繼續往後看；\n4. 遇上真值 'Agent'，直接回傳 'Agent'。",
    traceSteps: [
      { line: 1, text: "優先計算 'Python' and 'Agent'：兩者皆為非空字串（True），and 回傳後者 'Agent'", vars: { and_part: "'Agent'" } },
      { line: 1, text: "計算 '' or 0 or 'Agent'：前面皆為假值（Falsy），or 找到第一個真值 'Agent' 傳回", vars: { res: "'Agent'" } },
      { line: 2, text: "輸出 Agent", vars: { output: "Agent" } }
    ]
  },

  // ==========================================
  // CHAPTER 2: 字符密碼解析室
  // ==========================================
  {
    id: "ch2_b1",
    chapterId: 2,
    difficulty: "basic",
    category: "字串切片基礎",
    question: "執行下列程式碼會印出什麼內容？",
    code: `word = "CyberSecurity"\nprint(word[5:11])`,
    options: [
      "A. Securi",
      "B. Secur",
      "C. berSec",
      "D. Security"
    ],
    answer: "A",
    explanation: "字串切片 word[start:stop] 含頭不含尾。word[0]='C', word[1]='y', word[2]='b', word[3]='e', word[4]='r', word[5]='S'。\n索引 5 到 10 的字元依序為：word[5]='S', [6]='e', [7]='c', [8]='u', [9]='r', [10]='i'。因此切出 'Securi'（共 6 個字元）。",
    traceSteps: [
      { line: 1, text: "word = 'CyberSecurity'，長度 13", vars: { word: "'CyberSecurity'" } },
      { line: 2, text: "切片範圍 [5:11]，取索引 5, 6, 7, 8, 9, 10 的字元", vars: { slice_indices: "5..10" } },
      { line: 2, text: "截出子字串 'Securi' 並輸出", vars: { output: "'Securi'" } }
    ]
  },
  {
    id: "ch2_b2",
    chapterId: 2,
    difficulty: "basic",
    category: "字串方法與不可變性",
    question: "執行下列程式碼後，輸出為何？",
    code: `msg = "agent007"\nmsg.upper()\nprint(msg)`,
    options: [
      "A. AGENT007",
      "B. agent007",
      "C. Agent007",
      "D. None"
    ],
    answer: "B",
    explanation: "Python 中的字串是「不可變的（Immutable）」。呼叫 msg.upper() 會回傳轉換為大寫的新字串，但如果沒有把結果重新指派回變數（如 msg = msg.upper()），原本的 msg 不會受到任何影響！因此依然印出 agent007。",
    traceSteps: [
      { line: 1, text: "msg 指向不可變字串 'agent007'", vars: { msg: "'agent007'" } },
      { line: 2, text: "呼叫 msg.upper() 產生了新字串 'AGENT007'，但未指派給任何變數", vars: { returned: "'AGENT007'", msg: "'agent007'" } },
      { line: 3, text: "印出原變數 msg，仍為 'agent007'", vars: { output: "'agent007'" } }
    ]
  },
  {
    id: "ch2_b3",
    chapterId: 2,
    difficulty: "basic",
    category: "ASCII與ord/chr",
    question: "下列程式碼的執行結果為何？",
    code: `char_val = chr(ord('C') + 3)\nprint(char_val)`,
    options: [
      "A. F",
      "B. C3",
      "C. E",
      "D. 70"
    ],
    answer: "A",
    explanation: "ord('C') 取得字元 'C' 的 ASCII 編碼數值 67；67 + 3 = 70；chr(70) 則將 70 轉回對應的字元，字母表順序 'C' -> 'D'(68) -> 'E'(69) -> 'F'(70)。因此結果為 'F'。",
    traceSteps: [
      { line: 1, text: "ord('C') 得到數值 67", vars: { "ord('C')": 67 } },
      { line: 1, text: "67 + 3 = 70", vars: { sum: 70 } },
      { line: 1, text: "chr(70) 轉換為字母 'F'", vars: { char_val: "'F'" } },
      { line: 2, text: "印出 F", vars: { output: "F" } }
    ]
  },
  {
    id: "ch2_b4",
    chapterId: 2,
    difficulty: "basic",
    category: "字串切片步長",
    question: "執行下列程式碼會印出什麼？",
    code: `code_str = "A1B2C3D4"\nprint(code_str[::2])`,
    options: [
      "A. 1234",
      "B. ABCD",
      "C. A1B2",
      "D. DCBA"
    ],
    answer: "B",
    explanation: "切片語法 [start:stop:step]，當 start 與 stop 省略時代表整段字串，step=2 代表每隔 2 個字元挑選一個。因此挑選索引 0('A')、2('B')、4('C')、6('D')，組成 'ABCD'。",
    traceSteps: [
      { line: 1, text: "code_str = 'A1B2C3D4'", vars: { code_str: "'A1B2C3D4'" } },
      { line: 2, text: "以 step=2 提取索引 0, 2, 4, 6 處字元", vars: { chars: "['A', 'B', 'C', 'D']" } },
      { line: 2, text: "組合輸出 ABCD", vars: { output: "ABCD" } }
    ]
  },
  {
    id: "ch2_b5",
    chapterId: 2,
    difficulty: "basic",
    category: "字串判定方法",
    question: "下列程式碼的輸出結果為何？",
    code: `s1 = "NTU2026"\ns2 = "NTU"\nprint(s1.isalnum(), s2.isalpha(), s1.isdigit())`,
    options: [
      "A. True True False",
      "B. True False False",
      "C. False True False",
      "D. True True True"
    ],
    answer: "A",
    explanation: "1. isalnum()：所有字元皆為字母或數字時為 True，'NTU2026' 符合；\n2. isalpha()：所有字元皆為字母時為 True，'NTU' 符合；\n3. isdigit()：所有字元皆為純數字時為 True，'NTU2026' 含字母所以為 False。\n故輸出 True True False。",
    traceSteps: [
      { line: 1, text: "s1 = 'NTU2026', s2 = 'NTU'", vars: { s1: "'NTU2026'", s2: "'NTU'" } },
      { line: 3, text: "s1.isalnum() 是字母或數字 -> True", vars: { alnum: true } },
      { line: 3, text: "s2.isalpha() 全是字母 -> True", vars: { alpha: true } },
      { line: 3, text: "s1.isdigit() 不全為數字 -> False", vars: { digit: false } }
    ]
  },
  {
    id: "ch2_a1",
    chapterId: 2,
    difficulty: "advanced",
    category: "負數步長與反轉切片",
    question: "下列這段程式碼的輸出結果為何？",
    code: `text = "abcdefgh"\nprint(text[6:1:-2])`,
    options: [
      "A. g e c",
      "B. gec",
      "C. fdb",
      "D. hfd"
    ],
    answer: "B",
    explanation: "text[6:1:-2]：\n* start=6，對應字元 text[6] = 'g'；\n* stop=1，代表停止在索引 1 之前（不包含索引 1 的 'b'）；\n* step=-2，每次索引減 2：訪問索引 6('g') -> 4('e') -> 2('c')。\n下一個索引 0 已經小於/越過 stop=1，故停止。組合結果為 'gec'。",
    traceSteps: [
      { line: 1, text: "text = 'abcdefgh'，對應索引 0:a, 1:b, 2:c, 3:d, 4:e, 5:f, 6:g, 7:h", vars: {} },
      { line: 2, text: "Step 1: 索引 6，取出 'g'", vars: { current: "'g'", index: 6 } },
      { line: 2, text: "Step 2: 索引 6 - 2 = 4，取出 'e'", vars: { current: "'e'", index: 4 } },
      { line: 2, text: "Step 3: 索引 4 - 2 = 2，取出 'c'", vars: { current: "'c'", index: 2 } },
      { line: 2, text: "Step 4: 下一個索引 0 超出終點 (stop=1)，迴圈結束", vars: { final: "'gec'" } }
    ]
  },
  {
    id: "ch2_a2",
    chapterId: 2,
    difficulty: "advanced",
    category: "大小寫ASCII轉換演算",
    question: "執行下列程式碼會得到什麼輸出？（常考的大寫轉小寫位移演算法）",
    code: `def flip_case(s):\n    res = ""\n    for ch in s:\n        if 'A' <= ch <= 'Z':\n            res += chr(ord(ch) + 32)\n        else:\n            res += ch\n    return res\n\nprint(flip_case("PytHoN"))`,
    options: [
      "A. PYTHON",
      "B. python",
      "C. pyThOn",
      "D. PYTHon"
    ],
    answer: "B",
    explanation: "在 ASCII 碼中，大寫字母 'A'~'Z' 的數值比對應的小寫字母 'a'~'z' 小 32（例如 'A' 是 65，'a' 是 97）。\n程式中遇到大寫字母時加上 32 轉為小寫字元，原小寫字元保持不變。因此 'PytHoN' 中的 'P', 'H', 'N' 都被轉為小寫，整個字串變成了 'python'。",
    traceSteps: [
      { line: 1, text: "輸入 'PytHoN' 進行字元掃描", vars: { s: "'PytHoN'" } },
      { line: 4, text: "遇到 'P'（大寫）：ord('P')=80，80+32=112 -> chr(112)='p'", vars: { ch: "'P'", res: "'p'" } },
      { line: 7, text: "遇到 'y', 't'（小寫）：維持原樣", vars: { res: "'pyt'" } },
      { line: 4, text: "遇到 'H'（大寫）：轉成 'h'；'o' 維持；'N'（大寫）轉成 'n'", vars: { res: "'python'" } },
      { line: 10, text: "回傳最終結果 'python'", vars: { output: "'python'" } }
    ]
  },
  {
    id: "ch2_a3",
    chapterId: 2,
    difficulty: "advanced",
    category: "字串切片與字元運算組合",
    question: "下列程式碼的輸出結果為何？",
    code: `word = "Python"\nchar_diff = ord(word[0]) - ord(word[1])\nprint(char_diff)`,
    options: [
      "A. -41",
      "B. 41",
      "C. -9",
      "D. 9"
    ],
    answer: "A",
    explanation: "word[0] 是 'P'，word[1] 是 'y'。\n大寫字母 'P' 的 ASCII 碼為 80；小寫字母 'y' 的 ASCII 碼為 121。\n80 - 121 = -41。因此印出 -41。",
    traceSteps: [
      { line: 1, text: "word = 'Python'", vars: { "word[0]": "'P'", "word[1]": "'y'" } },
      { line: 2, text: "ord('P') = 80, ord('y') = 121", vars: { "ord('P')": 80, "ord('y')": 121 } },
      { line: 2, text: "80 - 121 = -41", vars: { char_diff: -41 } },
      { line: 3, text: "輸出 -41", vars: { output: -41 } }
    ]
  },
  {
    id: "ch2_a4",
    chapterId: 2,
    difficulty: "advanced",
    category: "split與join組合過濾",
    question: "下列程式碼將產生什麼輸出？",
    code: `raw = "root:x:0:0:admin:/root:/bin/bash"\nparts = raw.split(":")\nresult = "-".join([parts[0], parts[2], parts[-1]])\nprint(result)`,
    options: [
      "A. root-0-bash",
      "B. root-0-/bin/bash",
      "C. root-x-/bin/bash",
      "D. root-0-admin"
    ],
    answer: "B",
    explanation: "raw.split(':') 將字串按冒號切割：\nparts[0] = 'root'\nparts[1] = 'x'\nparts[2] = '0'\nparts[-1] 為最後一個元素 '/bin/bash'。\n用 '-' 將這三項串接起來，得到 'root-0-/bin/bash'。",
    traceSteps: [
      { line: 1, text: "raw 字串包含 7 個以冒號隔開的欄位", vars: {} },
      { line: 2, text: "split(':') 拆成串列：['root', 'x', '0', '0', 'admin', '/root', '/bin/bash']", vars: { "len(parts)": 7 } },
      { line: 3, text: "提取 parts[0]='root', parts[2]='0', parts[-1]='/bin/bash'", vars: { extracted: "['root', '0', '/bin/bash']" } },
      { line: 3, text: "'-'.join(...) 組合輸出 'root-0-/bin/bash'", vars: { result: "'root-0-/bin/bash'" } }
    ]
  },
  {
    id: "ch2_a5",
    chapterId: 2,
    difficulty: "advanced",
    category: "replace連鎖操作與不可變性",
    question: "執行下列程式碼後，印出的結果是什麼？",
    code: `msg = "mississippi"\nmsg.replace("s", "z")\nclean_msg = msg.replace("i", "1").count("s")\nprint(clean_msg)`,
    options: [
      "A. 0",
      "B. 4",
      "C. 2",
      "D. Error"
    ],
    answer: "B",
    explanation: "1. msg.replace('s', 'z') 產生新字串但未指派回 msg，因此 msg 仍為 'mississippi'！\n2. msg.replace('i', '1') 得到 'm1ss1ss1pp1'，接著呼叫 .count('s') 計算該字串中 's' 的數量，共有 4 個 's'！\n3. 所以印出 4。",
    traceSteps: [
      { line: 1, text: "msg = 'mississippi'", vars: { msg: "'mississippi'" } },
      { line: 2, text: "msg.replace('s', 'z') 未賦值，msg 保持不變！", vars: { msg: "'mississippi'" } },
      { line: 3, text: "msg.replace('i', '1') 得到 'm1ss1ss1pp1'", vars: { temp: "'m1ss1ss1pp1'" } },
      { line: 3, text: "計算 's' 出現次數：4 次", vars: { clean_msg: 4 } },
      { line: 4, text: "輸出 4", vars: { output: 4 } }
    ]
  },

  // ==========================================
  // CHAPTER 3: 資料矩陣防線
  // ==========================================
  {
    id: "ch3_b1",
    chapterId: 3,
    difficulty: "basic",
    category: "串列基礎操作",
    question: "下列程式碼的輸出結果為何？",
    code: `queue = [10, 20, 30]\nqueue.append(40)\nfirst = queue.pop(0)\nprint(first, queue)`,
    options: [
      "A. 10 [20, 30, 40]",
      "B. 40 [10, 20, 30]",
      "C. 10 [10, 20, 30, 40]",
      "D. 20 [30, 40]"
    ],
    answer: "A",
    explanation: "queue.append(40) 將 40 加在尾端，串列變為 [10, 20, 30, 40]。\nqueue.pop(0) 移除索引 0 的第一個元素並傳回，因此 first = 10，串列剩餘 [20, 30, 40]。",
    traceSteps: [
      { line: 1, text: "queue 初始化為 [10, 20, 30]", vars: { queue: "[10, 20, 30]" } },
      { line: 2, text: "append(40) -> 尾端新增 40", vars: { queue: "[10, 20, 30, 40]" } },
      { line: 3, text: "pop(0) -> 取出索引 0 的元素 10，其餘往前遞補", vars: { first: 10, queue: "[20, 30, 40]" } },
      { line: 4, text: "輸出 10 [20, 30, 40]", vars: { output: "10 [20, 30, 40]" } }
    ]
  },
  {
    id: "ch3_b2",
    chapterId: 3,
    difficulty: "basic",
    category: "sorted 與 list.sort 區別",
    question: "執行下列程式碼會印出什麼？",
    code: `nums = [4, 1, 3]\nret = nums.sort()\nprint(ret, nums)`,
    options: [
      "A. [1, 3, 4] [1, 3, 4]",
      "B. None [1, 3, 4]",
      "C. [1, 3, 4] [4, 1, 3]",
      "D. Error"
    ],
    answer: "B",
    explanation: "串列的內建方法 list.sort() 是「原地排序（in-place）」，它不會回傳排好的串列，而是回傳 None！但原串列 nums 本身已經被改變為 [1, 3, 4]。故印出 None [1, 3, 4]。",
    traceSteps: [
      { line: 1, text: "nums = [4, 1, 3]", vars: { nums: "[4, 1, 3]" } },
      { line: 2, text: "nums.sort() 原地修改 nums 為 [1, 3, 4]，方法回傳 None", vars: { ret: "None", nums: "[1, 3, 4]" } },
      { line: 3, text: "輸出 None [1, 3, 4]", vars: { output: "None [1, 3, 4]" } }
    ]
  },
  {
    id: "ch3_b3",
    chapterId: 3,
    difficulty: "basic",
    category: "sorted 函式特性",
    question: "執行下列程式碼後，輸出為何？",
    code: `orig = [9, 2, 7]\nnew_list = sorted(orig, reverse=True)\nprint(orig, new_list)`,
    options: [
      "A. [9, 7, 2] [9, 7, 2]",
      "B. [9, 2, 7] [9, 7, 2]",
      "C. [9, 2, 7] [2, 7, 9]",
      "D. None [9, 7, 2]"
    ],
    answer: "B",
    explanation: "sorted() 是內建函式，它絕不修改原串列，而是複製一份排好序的新串列回傳。reverse=True 代表由大到小排序。因此 orig 維持原樣 [9, 2, 7]，new_list 為 [9, 7, 2]。",
    traceSteps: [
      { line: 1, text: "orig = [9, 2, 7]", vars: { orig: "[9, 2, 7]" } },
      { line: 2, text: "sorted(orig, reverse=True) 產生新串列 [9, 7, 2]，orig 不受影響", vars: { orig: "[9, 2, 7]", new_list: "[9, 7, 2]" } },
      { line: 3, text: "輸出 [9, 2, 7] [9, 7, 2]", vars: { output: "[9, 2, 7] [9, 7, 2]" } }
    ]
  },
  {
    id: "ch3_b4",
    chapterId: 3,
    difficulty: "basic",
    category: "insert 與 remove 方法",
    question: "下列程式碼的執行結果為何？",
    code: `data = ["x", "y", "z"]\ndata.insert(1, "a")\ndata.remove("y")\nprint(data)`,
    options: [
      "A. ['x', 'a', 'z']",
      "B. ['a', 'x', 'z']",
      "C. ['x', 'y', 'a', 'z']",
      "D. ['x', 'a', 'y', 'z']"
    ],
    answer: "A",
    explanation: "1. data.insert(1, 'a') 在索引 1 處插入 'a'，原本的 'y', 'z' 往後挪移，串列變為 ['x', 'a', 'y', 'z']；\n2. data.remove('y') 尋找並移除第一個值為 'y' 的元素，剩餘 ['x', 'a', 'z']。",
    traceSteps: [
      { line: 1, text: "data = ['x', 'y', 'z']", vars: { data: "['x', 'y', 'z']" } },
      { line: 2, text: "insert(1, 'a') 在索引 1 插入 'a'", vars: { data: "['x', 'a', 'y', 'z']" } },
      { line: 3, text: "remove('y') 移除字元 'y'", vars: { data: "['x', 'a', 'z']" } },
      { line: 4, text: "輸出 ['x', 'a', 'z']", vars: { output: "['x', 'a', 'z']" } }
    ]
  },
  {
    id: "ch3_b5",
    chapterId: 3,
    difficulty: "basic",
    category: "成員運算子與長度",
    question: "執行下列程式碼會印出什麼？",
    code: `matrix = [[1, 2], [3, 4], [5, 6]]\nprint(len(matrix), [3, 4] in matrix, 3 in matrix)`,
    options: [
      "A. 6 True True",
      "B. 3 True False",
      "C. 3 True True",
      "D. 6 False False"
    ],
    answer: "B",
    explanation: "matrix 是包含 3 個子串列的二維串列，外層長度 len(matrix) 是 3。\n子串列 [3, 4] 確實是 matrix 的其中一個元素，因此 [3, 4] in matrix 為 True。\n而整數 3 並不是外層 matrix 的直接元素（它在子串列內部），因此 3 in matrix 為 False！故輸出 3 True False。",
    traceSteps: [
      { line: 1, text: "matrix 包含 3 個元素：[1, 2], [3, 4], [5, 6]", vars: { "len(matrix)": 3 } },
      { line: 2, text: "元素比較：[3, 4] 在 matrix 頂層 -> True", vars: { sublist_in: true } },
      { line: 2, text: "元素比較：3 不是頂層元素 -> False", vars: { item_in: false } }
    ]
  },
  {
    id: "ch3_a1",
    chapterId: 3,
    difficulty: "advanced",
    category: "記憶體參照 vs 淺拷貝（考古超常考）",
    question: "下列程式碼中，print(a, c) 會印出什麼？",
    code: `a = [1, 2, 3]\nb = a\nc = a[:]\nb.append(4)\nc.append(5)\nprint(a, c)`,
    options: [
      "A. [1, 2, 3] [1, 2, 3, 5]",
      "B. [1, 2, 3, 4] [1, 2, 3, 5]",
      "C. [1, 2, 3, 4, 5] [1, 2, 3, 5]",
      "D. [1, 2, 3, 4] [1, 2, 3, 4, 5]"
    ],
    answer: "B",
    explanation: "此題是期中考經典陷阱：\n1. b = a 只是建立了別名（指向同一塊記憶體位址），所以對 b.append(4) 就等於修改了 a，此時 a 和 b 都變成 [1, 2, 3, 4]！\n2. c = a[:] 則是透過切片複製出獨立的記憶體副本（淺拷貝），所以 c.append(5) 只會讓 c 變成 [1, 2, 3, 5]，絕不影響 a！\n因此 print(a, c) 輸出 [1, 2, 3, 4] [1, 2, 3, 5]。",
    traceSteps: [
      { line: 1, text: "a 指向記憶體中的串列 [1, 2, 3]", vars: { a: "[1, 2, 3]" } },
      { line: 2, text: "b = a：b 指向同一個串列位址", vars: { "id(a) == id(b)": true } },
      { line: 3, text: "c = a[:]：c 複製出全新獨立串列", vars: { c: "[1, 2, 3]", "id(a) == id(c)": false } },
      { line: 4, text: "b.append(4)：a 與 b 同步變為 [1, 2, 3, 4]", vars: { a: "[1, 2, 3, 4]", b: "[1, 2, 3, 4]" } },
      { line: 5, text: "c.append(5)：只有 c 新增 5", vars: { c: "[1, 2, 3, 5]" } },
      { line: 6, text: "印出 a 與 c", vars: { output: "[1, 2, 3, 4] [1, 2, 3, 5]" } }
    ]
  },
  {
    id: "ch3_a2",
    chapterId: 3,
    difficulty: "advanced",
    category: "重綁定 vs 原地修改",
    question: "執行下列這段程式碼，最後印出的結果是什麼？",
    code: `x = [10, 20]\ny = x\nx = [30, 40]\ny.append(50)\nprint(x, y)`,
    options: [
      "A. [30, 40, 50] [30, 40, 50]",
      "B. [30, 40] [10, 20, 50]",
      "C. [10, 20, 50] [30, 40]",
      "D. [10, 20] [30, 40, 50]"
    ],
    answer: "B",
    explanation: "1. x = [10, 20]，y = x，此時 y 指向 [10, 20]；\n2. x = [30, 40] 是「重新綁定（Rebinding）」，讓 x 改指向一個全新的串列，此操作並不會改變 y 指向的原串列！\n3. y.append(50) 將 50 加入 y 指向的原串列，變成 [10, 20, 50]；\n4. x 依然是 [30, 40]。因此結果是 [30, 40] [10, 20, 50]。",
    traceSteps: [
      { line: 1, text: "x 指向 [10, 20]", vars: { x: "[10, 20]" } },
      { line: 2, text: "y 指向同一個 [10, 20]", vars: { y: "[10, 20]" } },
      { line: 3, text: "x = [30, 40]：x 指向新物件，y 依然指向原本的物件", vars: { x: "[30, 40]", y: "[10, 20]" } },
      { line: 4, text: "y.append(50) 修改原物件，y 成為 [10, 20, 50]", vars: { y: "[10, 20, 50]" } },
      { line: 5, text: "輸出 [30, 40] [10, 20, 50]", vars: { output: "[30, 40] [10, 20, 50]" } }
    ]
  },
  {
    id: "ch3_a3",
    chapterId: 3,
    difficulty: "advanced",
    category: "二維串列淺拷貝陷阱",
    question: "下列程式碼的輸出結果為何？",
    code: `row = [1, 2]\ngrid = [row] * 3\ngrid[0][0] = 99\nprint(grid)`,
    options: [
      "A. [[99, 2], [1, 2], [1, 2]]",
      "B. [[99, 2], [99, 2], [99, 2]]",
      "C. [[1, 2], [1, 2], [1, 2]]",
      "D. Error"
    ],
    answer: "B",
    explanation: "[row] * 3 的乘法只會將 row 的參照（reference）複製 3 次，也就是 grid 裡面的三個子串列其實是「同一個 row 物件」！當你修改 grid[0][0] = 99 時，另外兩列也會跟著全部變成 99。因此輸出 [[99, 2], [99, 2], [99, 2]]。",
    traceSteps: [
      { line: 1, text: "建立 row = [1, 2]", vars: { row: "[1, 2]" } },
      { line: 2, text: "[row] * 3 將同一參照重複三次放入 grid", vars: { "grid[0] is grid[1]": true, "grid[1] is grid[2]": true } },
      { line: 3, text: "修改 grid[0][0] = 99，即修改了同一個 row", vars: { row: "[99, 2]" } },
      { line: 4, text: "輸出 [[99, 2], [99, 2], [99, 2]]", vars: { output: "[[99, 2], [99, 2], [99, 2]]" } }
    ]
  },
  {
    id: "ch3_a4",
    chapterId: 3,
    difficulty: "advanced",
    category: "切片賦值（Slice Assignment）",
    question: "執行下列程式碼會印出什麼？",
    code: `vals = [10, 20, 30, 40, 50]\nvals[1:3] = [88, 99, 100]\nprint(vals)`,
    options: [
      "A. [10, 88, 99, 100, 40, 50]",
      "B. [10, 88, 99, 40, 50]",
      "C. [10, [88, 99, 100], 40, 50]",
      "D. Error"
    ],
    answer: "A",
    explanation: "切片賦值 vals[1:3] 會將索引 1 到 2 的區間（即原本的 20, 30）替換為等號右邊可迭代物件的元素。右邊有 3 個元素 [88, 99, 100]，取代原本 2 個元素的位置，串列長度會動態增加 1，因此變為 [10, 88, 99, 100, 40, 50]。",
    traceSteps: [
      { line: 1, text: "vals = [10, 20, 30, 40, 50]", vars: { vals: "[10, 20, 30, 40, 50]" } },
      { line: 2, text: "鎖定切片區間 vals[1:3]（內容為 20, 30）", vars: { target: "[20, 30]" } },
      { line: 2, text: "以 [88, 99, 100] 替換原區間", vars: { vals: "[10, 88, 99, 100, 40, 50]" } },
      { line: 3, text: "輸出結果", vars: { output: "[10, 88, 99, 100, 40, 50]" } }
    ]
  },
  {
    id: "ch3_a5",
    chapterId: 3,
    difficulty: "advanced",
    category: "sort key 與 reverse 組合",
    question: "下列程式碼的輸出結果為何？",
    code: `words = ['apple', 'pear', 'banana', 'kiwi']\nwords.sort(key=len, reverse=True)\nprint(words[0], len(words[-1]))`,
    options: [
      "A. banana 4",
      "B. apple 4",
      "C. banana 5",
      "D. kiwi 6"
    ],
    answer: "A",
    explanation: "words.sort(key=len, reverse=True) 依照字串長度「由大到小」排序：\n'banana'(6) -> 'apple'(5) -> 'pear'(4) -> 'kiwi'(4)。\n所以 words[0] 是最長的 'banana'；words[-1] 則是最後一項（長度為 4 的字串），len(words[-1]) 為 4。故印出 banana 4。",
    traceSteps: [
      { line: 1, text: "words 包含長度分別為 5, 4, 6, 4 的字串", vars: {} },
      { line: 2, text: "按長度降冪排序：'banana'(6) 最前，'pear'/'kiwi'(4) 在後", vars: { words: "['banana', 'apple', 'pear', 'kiwi']" } },
      { line: 3, text: "words[0] = 'banana', len(words[-1]) = 4", vars: { first: "'banana'", last_len: 4 } },
      { line: 3, text: "輸出 banana 4", vars: { output: "banana 4" } }
    ]
  },

  // ==========================================
  // CHAPTER 4: 循環迴路之謎
  // ==========================================
  {
    id: "ch4_b1",
    chapterId: 4,
    difficulty: "basic",
    category: "range 負步長運算",
    question: "下列迴圈會印出什麼數字序列？",
    code: `for i in range(6, 1, -2):\n    print(i, end=" ")`,
    options: [
      "A. 6 4 2",
      "B. 6 4 2 0",
      "C. 6 4",
      "D. 4 2"
    ],
    answer: "A",
    explanation: "range(start=6, stop=1, step=-2)：\n* 第一輪 i = 6；\n* 第二輪 i = 6 - 2 = 4；\n* 第三輪 i = 4 - 2 = 2；\n* 下一輪 2 - 2 = 0，已不符合 > 1（stop=1 不包含 1 以下的值）。\n故印出 6 4 2 。",
    traceSteps: [
      { line: 1, text: "第一輪：i = 6", vars: { i: 6 } },
      { line: 2, text: "輸出 6", vars: { output: "6 " } },
      { line: 1, text: "第二輪：i = 4", vars: { i: 4 } },
      { line: 2, text: "輸出 4", vars: { output: "6 4 " } },
      { line: 1, text: "第三輪：i = 2", vars: { i: 2 } },
      { line: 2, text: "輸出 2", vars: { output: "6 4 2 " } },
      { line: 1, text: "下一個值 0 <= stop(1)，迴圈結束", vars: {} }
    ]
  },
  {
    id: "ch4_b2",
    chapterId: 4,
    difficulty: "basic",
    category: "while 條件與計數",
    question: "執行這段代碼後，變數 total 的值為何？",
    code: `total = 0\ni = 1\nwhile i <= 4:\n    total += i * 10\n    i += 1\nprint(total)`,
    options: [
      "A. 100",
      "B. 60",
      "C. 150",
      "D. 40"
    ],
    answer: "A",
    explanation: "i 從 1 到 4 逐一累加：\ni=1: total = 0 + 10 = 10\ni=2: total = 10 + 20 = 30\ni=3: total = 30 + 30 = 60\ni=4: total = 60 + 40 = 100\ni 增至 5 時條件 i <= 4 為假，退出迴圈，印出 100。",
    traceSteps: [
      { line: 3, text: "i=1: total 累加 10", vars: { i: 1, total: 10 } },
      { line: 3, text: "i=2: total 累加 20", vars: { i: 2, total: 30 } },
      { line: 3, text: "i=3: total 累加 30", vars: { i: 3, total: 60 } },
      { line: 3, text: "i=4: total 累加 40", vars: { i: 4, total: 100 } },
      { line: 3, text: "i=5: 退出迴圈", vars: { i: 5, total: 100 } }
    ]
  },
  {
    id: "ch4_b3",
    chapterId: 4,
    difficulty: "basic",
    category: "break 與 continue 行為",
    question: "下列程式碼會印出什麼結果？",
    code: `for n in range(1, 8):\n    if n % 2 == 0:\n        continue\n    if n > 4:\n        break\n    print(n, end=" ")`,
    options: [
      "A. 1 3 5",
      "B. 1 3",
      "C. 1 2 3",
      "D. 1 3 5 7"
    ],
    answer: "B",
    explanation: "* n=1: 奇數，不滿足 n>4，印出 1；\n* n=2: 偶數，觸發 continue，跳過 print；\n* n=3: 奇數，不滿足 n>4，印出 3；\n* n=4: 偶數，觸發 continue；\n* n=5: 滿足 n > 4，觸發 break，整個迴圈終止！\n因此只有印出 1 3 。",
    traceSteps: [
      { line: 2, text: "n=1: 奇數，未大於4，印出 1", vars: { n: 1, output: "1 " } },
      { line: 3, text: "n=2: 偶數，continue 跳過", vars: { n: 2 } },
      { line: 2, text: "n=3: 奇數，未大於4，印出 3", vars: { n: 3, output: "1 3 " } },
      { line: 3, text: "n=4: 偶數，continue 跳過", vars: { n: 4 } },
      { line: 5, text: "n=5: 5 > 4 成立，觸發 break 中斷迴圈", vars: { n: 5 } }
    ]
  },
  {
    id: "ch4_b4",
    chapterId: 4,
    difficulty: "basic",
    category: "巢狀迴圈總次數",
    question: "下列程式碼中，print('*', end='') 一共會被執行幾次？",
    code: `count = 0\nfor i in range(3):\n    for j in range(4):\n        print("*", end="")\n        count += 1\nprint("\\n總次數:", count)`,
    options: [
      "A. 7",
      "B. 12",
      "C. 9",
      "D. 16"
    ],
    answer: "B",
    explanation: "外層迴圈 range(3) 迭代 3 次（i = 0, 1, 2）；每次外層迴圈執行時，內層迴圈 range(4) 都會迭代 4 次（j = 0, 1, 2, 3）。\n因此總執行次數為 3 * 4 = 12 次。",
    traceSteps: [
      { line: 2, text: "外層 i=0 時，內層執行 4 次", vars: { i: 0, count: 4 } },
      { line: 2, text: "外層 i=1 時，內層執行 4 次", vars: { i: 1, count: 8 } },
      { line: 2, text: "外層 i=2 時，內層執行 4 次", vars: { i: 2, count: 12 } },
      { line: 6, text: "總計 12 次", vars: { count: 12 } }
    ]
  },
  {
    id: "ch4_b5",
    chapterId: 4,
    difficulty: "basic",
    category: "迴圈終止後變數值",
    question: "迴圈結束後，變數 x 的最終值為何？",
    code: `x = 0\nwhile x < 5:\n    x += 2\nprint(x)`,
    options: [
      "A. 4",
      "B. 5",
      "C. 6",
      "D. 7"
    ],
    answer: "C",
    explanation: "* 初始 x = 0 < 5 -> x 變為 2；\n* 檢查 2 < 5 -> x 變為 4；\n* 檢查 4 < 5 -> x 變為 6；\n* 檢查 6 < 5 為 False，跳出迴圈。\n此時 x 的值為 6。",
    traceSteps: [
      { line: 2, text: "x=0: 0 < 5 成立，x 增加 2 變成 2", vars: { x: 2 } },
      { line: 2, text: "x=2: 2 < 5 成立，x 增加 2 變成 4", vars: { x: 4 } },
      { line: 2, text: "x=4: 4 < 5 成立，x 增加 2 變成 6", vars: { x: 6 } },
      { line: 2, text: "x=6: 6 < 5 不成立，迴圈退出", vars: { x: 6 } },
      { line: 4, text: "印出 6", vars: { output: 6 } }
    ]
  },
  {
    id: "ch4_a1",
    chapterId: 4,
    difficulty: "advanced",
    category: "while ... else 機制陷阱",
    question: "下列這段程式碼的輸出結果為何？",
    code: `num = 1\nwhile num < 4:\n    if num == 2:\n        num += 1\n        continue\n    print(num, end=" ")\n    num += 1\nelse:\n    print("DONE")`,
    options: [
      "A. 1 3 DONE",
      "B. 1 3",
      "C. 1 2 3 DONE",
      "D. DONE"
    ],
    answer: "A",
    explanation: "在 Python 中，只有當 while 迴圈是「條件判斷為 False 自然退出」時，才會進入 else 區塊（若被 break 強行中斷則不執行 else）。\n本題中：\n* num=1: 印出 1，num 變 2；\n* num=2: 符合條件，num+1 變 3 並 continue；\n* num=3: 印出 3，num 變 4；\n* num=4: 4 < 4 為 False 自然結束，因此執行 else 區塊印出 DONE！\n結果為 1 3 DONE。",
    traceSteps: [
      { line: 2, text: "num=1: 印出 1，num 加 1 變 2", vars: { num: 2, output: "1 " } },
      { line: 3, text: "num=2: 觸發 num += 1 (變3) 並 continue", vars: { num: 3 } },
      { line: 2, text: "num=3: 印出 3，num 加 1 變 4", vars: { num: 4, output: "1 3 " } },
      { line: 2, text: "num=4: while 條件 4 < 4 為 False，非 break 中斷，觸發 else 區塊", vars: { num: 4 } },
      { line: 9, text: "印出 DONE", vars: { output: "1 3 DONE" } }
    ]
  },
  {
    id: "ch4_a2",
    chapterId: 4,
    difficulty: "advanced",
    category: "巢狀迴圈與內層 break 交互",
    question: "執行下列程式碼會印出什麼結果？",
    code: `for i in range(3):\n    for j in range(3):\n        if i == j:\n            break\n        print(f"{i}{j}", end=" ")`,
    options: [
      "A. 00 11 22",
      "B. 10 20 21",
      "C. 01 02 12",
      "D. 10 20 22"
    ],
    answer: "B",
    explanation: "* 外層 i=0: 內層 j=0，此時 i == j (0==0) 成立，立即 break 跳出內層！什麼都沒印。\n* 外層 i=1:\n  - j=0: 1 != 0，印出 10；\n  - j=1: 1 == 1，立即 break 跳出。\n* 外層 i=2:\n  - j=0: 2 != 0，印出 20；\n  - j=1: 2 != 1，印出 21；\n  - j=2: 2 == 2，立即 break 跳出。\n因此全部印出為 10 20 21 。",
    traceSteps: [
      { line: 3, text: "i=0, j=0: 0==0 觸發 break，本輪結束", vars: { i: 0, j: 0 } },
      { line: 5, text: "i=1, j=0: 1!=0，印出 '10 '", vars: { i: 1, j: 0, output: "10 " } },
      { line: 3, text: "i=1, j=1: 1==1 觸發 break，本輪結束", vars: { i: 1, j: 1 } },
      { line: 5, text: "i=2, j=0: 2!=0，印出 '20 '", vars: { i: 2, j: 0, output: "10 20 " } },
      { line: 5, text: "i=2, j=1: 2!=1，印出 '21 '", vars: { i: 2, j: 1, output: "10 20 21 " } },
      { line: 3, text: "i=2, j=2: 2==2 觸發 break，全部結束", vars: { i: 2, j: 2 } }
    ]
  },
  {
    id: "ch4_a3",
    chapterId: 4,
    difficulty: "advanced",
    category: "圖形列印迴圈與變動範圍",
    question: "下列程式碼的終端輸出排版為何？",
    code: `for i in range(1, 4):\n    for j in range(i):\n        print(j, end="")\n    print()`,
    options: [
      "A. 0\\n01\\n012",
      "B. 1\\n12\\n123",
      "C. 0\\n10\\n210",
      "D. 012\\n01\\n0"
    ],
    answer: "A",
    explanation: "* i=1: 內層 range(1) 產出 j=0，印出 0，換行。\n* i=2: 內層 range(2) 產出 j=0, 1，印出 01，換行。\n* i=3: 內層 range(3) 產出 j=0, 1, 2，印出 012，換行。\n因此輸出外觀為：\n0\n01\n012",
    traceSteps: [
      { line: 1, text: "第一行 (i=1): range(1) -> j=0，印出 '0' 並換行", vars: { row1: "0" } },
      { line: 1, text: "第二行 (i=2): range(2) -> j=0, 1，印出 '01' 並換行", vars: { row2: "01" } },
      { line: 1, text: "第三行 (i=3): range(3) -> j=0, 1, 2，印出 '012' 並換行", vars: { row3: "012" } }
    ]
  },
  {
    id: "ch4_a4",
    chapterId: 4,
    difficulty: "advanced",
    category: "迴圈累加與對角線條件",
    question: "執行這段計算總和的代碼後，變數 total 的值為何？",
    code: `total = 0\nfor i in range(1, 5):\n    for j in range(1, 5):\n        if i == j:\n            total += i\nprint(total)`,
    options: [
      "A. 10",
      "B. 16",
      "C. 20",
      "D. 30"
    ],
    answer: "A",
    explanation: "外層 i 從 1 到 4，內層 j 從 1 到 4。只有當 i == j 時才會累加 i：\n* i=1, j=1 -> total += 1\n* i=2, j=2 -> total += 2\n* i=3, j=3 -> total += 3\n* i=4, j=4 -> total += 4\ntotal = 1 + 2 + 3 + 4 = 10。",
    traceSteps: [
      { line: 4, text: "當 i=1, j=1 時，total 累加 1 -> total = 1", vars: { total: 1 } },
      { line: 4, text: "當 i=2, j=2 時，total 累加 2 -> total = 3", vars: { total: 3 } },
      { line: 4, text: "當 i=3, j=3 時，total 累加 3 -> total = 6", vars: { total: 6 } },
      { line: 4, text: "當 i=4, j=4 時，total 累加 4 -> total = 10", vars: { total: 10 } },
      { line: 6, text: "輸出 10", vars: { output: 10 } }
    ]
  },
  {
    id: "ch4_a5",
    chapterId: 4,
    difficulty: "advanced",
    category: "字串倒序累積技巧",
    question: "下列程式碼會印出什麼結果？",
    code: `word = "Python"\nrev = ""\nfor ch in word:\n    rev = ch + rev\nprint(rev)`,
    options: [
      "A. Python",
      "B. nohtyP",
      "C. PPyytt",
      "D. nohtyp"
    ],
    answer: "B",
    explanation: "注意到賦值語句是 rev = ch + rev，而不是 rev = rev + ch！\n每次迭代都把當前字元放在最前面：\n* ch='P': rev = 'P'\n* ch='y': rev = 'y' + 'P' = 'yP'\n* ch='t': rev = 't' + 'yP' = 'tyP'\n...\n依此類推，最後得到完整倒序的字串 'nohtyP'。",
    traceSteps: [
      { line: 4, text: "ch='P': rev = 'P'", vars: { rev: "'P'" } },
      { line: 4, text: "ch='y': rev = 'y' + 'P' = 'yP'", vars: { rev: "'yP'" } },
      { line: 4, text: "ch='t': rev = 't' + 'yP' = 'tyP'", vars: { rev: "'tyP'" } },
      { line: 4, text: "遍歷至最後字元 'n'，字串完全逆轉為 'nohtyP'", vars: { rev: "'nohtyP'" } },
      { line: 5, text: "輸出 nohtyP", vars: { output: "nohtyP" } }
    ]
  },

  // ==========================================
  // CHAPTER 5: 核心指令與領域
  // ==========================================
  {
    id: "ch5_b1",
    chapterId: 5,
    difficulty: "basic",
    category: "函式預設值回傳",
    question: "如果一個 Python 函式內沒有寫 return 語句，呼叫它時的預設回傳值為何？",
    code: `def log_action(user):\n    msg = f"User {user} logged in"\n\nres = log_action("Neo")\nprint(res)`,
    options: [
      "A. 0",
      "B. False",
      "C. None",
      "D. 會拋出 AttributeError"
    ],
    answer: "C",
    explanation: "在 Python 中，任何沒有明確執行 return 的函式，或者只有單純寫 return 後面沒帶任何數值的函式，預設回傳值皆為特殊物件 None（屬於 NoneType）。",
    traceSteps: [
      { line: 1, text: "定義函式 log_action", vars: {} },
      { line: 4, text: "執行函式內部代碼，到達函式末端而無 return", vars: { msg: "'User Neo logged in'" } },
      { line: 4, text: "Python 自動回傳 None 給呼叫者", vars: { res: "None" } },
      { line: 5, text: "print 印出 None", vars: { output: "None" } }
    ]
  },
  {
    id: "ch5_b2",
    chapterId: 5,
    difficulty: "basic",
    category: "預設參數語法規則",
    question: "下列哪一個函式宣告語法是合法的 Python 語法？",
    options: [
      "A. def build_query(table='users', fields):",
      "B. def build_query(table, fields='*'):",
      "C. def build_query(table, fields == '*'):",
      "D. def build_query(default table='users', fields):"
    ],
    answer: "B",
    explanation: "Python 語法規定：具有預設值的參數（default parameters）必須放在所有沒有預設值的「位置參數（positional parameters）」之後。選項 A 的 table 具預設值卻排在 fields 前面，會引發 SyntaxError。只有 B 符合語法規範。",
    traceSteps: [
      { line: 1, text: "檢查參數順序：無預設值的 table 在前，具預設值 fields='*' 在後", vars: { isValid: true } }
    ]
  },
  {
    id: "ch5_b3",
    chapterId: 5,
    difficulty: "basic",
    category: "關鍵字引數傳遞",
    question: "下列程式碼的輸出結果為何？",
    code: `def calc(a, b=3, c=5):\n    return a * 10 + b + c\n\nprint(calc(2, c=10))`,
    options: [
      "A. 33",
      "B. 38",
      "C. 28",
      "D. Error"
    ],
    answer: "A",
    explanation: "呼叫 calc(2, c=10) 時：\n* a = 2（位置引數傳遞）；\n* b 沒有傳入，使用預設值 b = 3；\n* c = 10（關鍵字引數傳遞，覆蓋預設值 5）。\n計算 2 * 10 + 3 + 10 = 20 + 3 + 10 = 33。",
    traceSteps: [
      { line: 4, text: "傳遞參數：a=2, b=3 (預設), c=10 (指定)", vars: { a: 2, b: 3, c: 10 } },
      { line: 2, text: "計算 2 * 10 + 3 + 10 = 33", vars: { return_val: 33 } },
      { line: 4, text: "印出 33", vars: { output: 33 } }
    ]
  },
  {
    id: "ch5_b4",
    chapterId: 5,
    difficulty: "basic",
    category: "全域與區域變數隔離",
    question: "下列程式碼執行後會印出什麼？",
    code: `x = 100\ndef update():\n    x = 200\n    print(x, end=" ")\n\nupdate()\nprint(x)`,
    options: [
      "A. 200 200",
      "B. 200 100",
      "C. 100 100",
      "D. 100 200"
    ],
    answer: "B",
    explanation: "在 update() 函式內部宣告的 x = 200 屬於該函式的「區域變數（local variable）」，它的作用範圍只在函式內部，不會修改到外層全域的 x = 100。因此 update() 內部印出 200，函式外印出的依然是全域的 100。",
    traceSteps: [
      { line: 1, text: "全域變數 x 初始化為 100", vars: { "global x": 100 } },
      { line: 3, text: "函式內部建立區域變數 x = 200", vars: { "local x": 200 } },
      { line: 4, text: "印出區域變數 200", vars: { output: "200 " } },
      { line: 7, text: "印出全域變數 100", vars: { output: "200 100" } }
    ]
  },
  {
    id: "ch5_b5",
    chapterId: 5,
    difficulty: "basic",
    category: "字典基本存取",
    question: "下列程式碼的輸出結果為何？",
    code: `agent = {"name": "Bond", "code": 7}\nagent["code"] = "007"\nagent["dept"] = "MI6"\nprint(len(agent), agent["code"])`,
    options: [
      "A. 3 007",
      "B. 2 7",
      "C. 3 7",
      "D. 2 007"
    ],
    answer: "A",
    explanation: "字典是鍵值對（key-value）結構：\n1. agent['code'] = '007' 修改了現有鍵 'code' 的值；\n2. agent['dept'] = 'MI6' 新增了一個鍵值對；\n此時字典共有 3 個鍵：'name', 'code', 'dept'，長度為 3，'code' 的值為 '007'。印出 3 007。",
    traceSteps: [
      { line: 1, text: "初始化字典，含 2 個鍵值對", vars: { agent: "{'name': 'Bond', 'code': 7}" } },
      { line: 2, text: "更新鍵 'code' 為 '007'", vars: { "agent['code']": "'007'" } },
      { line: 3, text: "新增鍵 'dept': 'MI6'", vars: { "len(agent)": 3 } },
      { line: 4, text: "輸出 3 007", vars: { output: "3 007" } }
    ]
  },
  {
    id: "ch5_a1",
    chapterId: 5,
    difficulty: "advanced",
    category: "可變預設參數陷阱（考古題必考！）",
    question: "執行下列程式碼會印出什麼？（台大期中考最經典的可變物件預設引數陷阱）",
    code: `def collect_data(item, bucket=[]):\n    bucket.append(item)\n    return bucket\n\nprint(collect_data("A"))\nprint(collect_data("B"))`,
    options: [
      "A. ['A'] 和 ['B']",
      "B. ['A'] 和 ['A', 'B']",
      "C. ['A'] 和 []",
      "D. Error"
    ],
    answer: "B",
    explanation: "在 Python 中，函式的預設參數只會在「函式定義被直譯時」建立一次，而不是每次呼叫時重新建立！\n因此，bucket=[] 這個串列在記憶體中只有一份。第一次呼叫加入了 'A'，預設串列變成 ['A']；第二次呼叫沒有傳入 bucket，再次使用同一個預設串列並加入 'B'，串列累積變成 ['A', 'B']！",
    traceSteps: [
      { line: 1, text: "函式定義時建立唯一的預設串列 bucket（初始為 []）", vars: { "預設 bucket 位址": "0x101" } },
      { line: 5, text: "第 1 次呼叫 collect_data('A')：bucket.append('A')", vars: { bucket: "['A']" } },
      { line: 5, text: "印出 ['A']", vars: { output1: "['A']" } },
      { line: 6, text: "第 2 次呼叫 collect_data('B')：未傳 bucket，共用同一串列，append('B')", vars: { bucket: "['A', 'B']" } },
      { line: 6, text: "印出 ['A', 'B']", vars: { output2: "['A', 'B']" } }
    ]
  },
  {
    id: "ch5_a2",
    chapterId: 5,
    difficulty: "advanced",
    category: "UnboundLocalError 陷阱（考古題最高頻失分）",
    question: "下列程式碼執行後的結果為何？",
    code: `secret_val = 50\ndef reveal():\n    print(secret_val)\n    secret_val = 100\n\nreveal()`,
    options: [
      "A. 50",
      "B. 100",
      "C. 50 接著 100",
      "D. 拋出 UnboundLocalError 錯誤"
    ],
    answer: "D",
    explanation: "只要函式內任何地方有對某變數進行賦值（此處 secret_val = 100），Python 在編譯該函式時就會把 secret_val 標記為「區域變數」！而在賦值之前，第一行就嘗試 print(secret_val)，此時區域變數尚未被賦值，因此 Python 會丟出：UnboundLocalError: cannot access local variable 'secret_val' where it is not associated with a value。",
    traceSteps: [
      { line: 1, text: "全域 secret_val = 50", vars: { "global secret_val": 50 } },
      { line: 2, text: "Python 直譯 reveal 函式：偵測到函式內部有賦值語句 secret_val = 100，將其歸類為區域變數！", vars: { scope: "local" } },
      { line: 3, text: "執行 print(secret_val)：此時區域變數 secret_val 尚未綁定數值！", vars: {} },
      { line: 3, text: "引發 UnboundLocalError 崩潰退出", vars: { error: "UnboundLocalError" } }
    ]
  },
  {
    id: "ch5_a3",
    chapterId: 5,
    difficulty: "advanced",
    category: "global 關鍵字效果",
    question: "下列程式碼的輸出結果為何？",
    code: `score = 80\ndef boost():\n    global score\n    score += 15\n\nboost()\nprint(score)`,
    options: [
      "A. 80",
      "B. 95",
      "C. None",
      "D. Error"
    ],
    answer: "B",
    explanation: "函式內部使用 global score 明確告知 Python：此函式內的 score 就是外層的全域變數。因此 score += 15 直接修改了全域變數，80 + 15 = 95。在函式外印出 score 時為 95。",
    traceSteps: [
      { line: 1, text: "全域變數 score = 80", vars: { score: 80 } },
      { line: 3, text: "boost 內部宣告 global score，綁定全域 score", vars: { target: "global score" } },
      { line: 4, text: "執行 score += 15，全域 score 更新為 95", vars: { score: 95 } },
      { line: 7, text: "印出 95", vars: { output: 95 } }
    ]
  },
  {
    id: "ch5_a4",
    chapterId: 5,
    difficulty: "advanced",
    category: "高階函式與 Lambda 表達式",
    question: "執行下列程式碼會印出什麼內容？",
    code: `def apply_filter(func, items):\n    return [func(x) for x in items]\n\nresult = apply_filter(lambda x: chr(ord(x) - 1), ['B', 'C', 'D'])\nprint(result)`,
    options: [
      "A. ['A', 'B', 'C']",
      "B. ['C', 'D', 'E']",
      "C. [65, 66, 67]",
      "D. Error"
    ],
    answer: "A",
    explanation: "apply_filter 將 lambda 函式套用在串列的每個元素上。\nlambda x: chr(ord(x) - 1) 的作用是把字元的 ASCII 碼減 1：\n* 'B'(66) - 1 = 65 -> 'A'\n* 'C'(67) - 1 = 66 -> 'B'\n* 'D'(68) - 1 = 67 -> 'C'\n因此產生 ['A', 'B', 'C']。",
    traceSteps: [
      { line: 4, text: "將字元 'B', 'C', 'D' 逐一傳入 lambda 函式", vars: {} },
      { line: 4, text: "ord('B') - 1 = 65 -> chr(65) = 'A'", vars: { item1: "'A'" } },
      { line: 4, text: "ord('C') - 1 = 66 -> chr(66) = 'B'", vars: { item2: "'B'" } },
      { line: 4, text: "ord('D') - 1 = 67 -> chr(67) = 'C'", vars: { item3: "'C'" } },
      { line: 5, text: "輸出 ['A', 'B', 'C']", vars: { output: "['A', 'B', 'C']" } }
    ]
  },
  {
    id: "ch5_a5",
    chapterId: 5,
    difficulty: "advanced",
    category: "多重預設引數與求值順序",
    question: "執行下列程式碼後，終端機顯示的內容為何？",
    code: `factor = 2\ndef multiply(val, mul=factor):\n    return val * mul\n\nfactor = 10\nprint(multiply(5))`,
    options: [
      "A. 50",
      "B. 10",
      "C. 25",
      "D. Error"
    ],
    answer: "B",
    explanation: "函式的預設引數是在「定義該函式的那一刻」被求值並綁定的！\n當 def multiply(val, mul=factor) 被直譯時，此時 factor 的值是 2，所以 mul 的預設值被永久定格為 2。即使後續在全域把 factor 改成了 10，mul 的預設值依然是 2！呼叫 multiply(5) 即為 5 * 2 = 10。",
    traceSteps: [
      { line: 1, text: "factor = 2", vars: { factor: 2 } },
      { line: 2, text: "定義 multiply：此時 factor 為 2，mul 的預設值固定為 2", vars: { "default mul": 2 } },
      { line: 5, text: "factor 更新為 10，但不影響已定格的 mul 預設值", vars: { factor: 10 } },
      { line: 6, text: "呼叫 multiply(5)：計算 5 * 2 = 10", vars: { return_val: 10 } },
      { line: 6, text: "輸出 10", vars: { output: 10 } }
    ]
  },

  // ==========================================
  // CHAPTER 6: 特務高階工具箱
  // ==========================================
  {
    id: "ch6_b1",
    chapterId: 6,
    difficulty: "basic",
    category: "enumerate 基礎應用",
    question: "下列程式碼會印出什麼？",
    code: `tasks = ['scan', 'parse', 'fetch']\nfor idx, val in enumerate(tasks, start=1):\n    if idx == 2:\n        print(f\"{idx}:{val}\")`,
    options: [
      "A. 2:parse",
      "B. 2:scan",
      "C. 1:parse",
      "D. (2, 'parse')"
    ],
    answer: "A",
    explanation: "enumerate(tasks, start=1) 從 1 開始計數：\n* idx=1, val='scan'\n* idx=2, val='parse'\n* idx=3, val='fetch'\n當 idx == 2 時印出，格式為 '2:parse'。",
    traceSteps: [
      { line: 2, text: "enumerate start=1: 產生 (1, 'scan'), (2, 'parse'), (3, 'fetch')", vars: {} },
      { line: 3, text: "當 idx == 2 時符合條件，此時 val = 'parse'", vars: { idx: 2, val: "'parse'" } },
      { line: 4, text: "輸出 2:parse", vars: { output: "2:parse" } }
    ]
  },
  {
    id: "ch6_b2",
    chapterId: 6,
    difficulty: "basic",
    category: "zip 打包解包",
    question: "下列程式碼執行後的輸出結果是什麼？",
    code: `ids = [101, 102]\nnames = ['Alice', 'Bob', 'Charlie']\npaired = list(zip(ids, names))\nprint(paired)`,
    options: [
      "A. [(101, 'Alice'), (102, 'Bob'), (None, 'Charlie')]",
      "B. [(101, 'Alice'), (102, 'Bob')]",
      "C. [[101, 'Alice'], [102, 'Bob']]",
      "D. Error"
    ],
    answer: "B",
    explanation: "zip() 會將多個可迭代物件按索引依序配對為元組（tuple）。當兩者長度不一致時，zip 會以「最短的那一個」為準並停止。ids 只有 2 個元素，因此只產生 2 組配對，且每一項是 tuple：[(101, 'Alice'), (102, 'Bob')]。",
    traceSteps: [
      { line: 1, text: "ids 長度為 2，names 長度為 3", vars: { "len(ids)": 2, "len(names)": 3 } },
      { line: 3, text: "zip 配對依最短者截止：(101, 'Alice') 與 (102, 'Bob')", vars: { paired: "[(101, 'Alice'), (102, 'Bob')]" } },
      { line: 4, text: "印出結果", vars: { output: "[(101, 'Alice'), (102, 'Bob')]" } }
    ]
  },
  {
    id: "ch6_b3",
    chapterId: 6,
    difficulty: "basic",
    category: "單層串列表達式",
    question: "這段串列表達式執行後的結果為何？",
    code: `squares = [n ** 2 for n in range(5) if n % 2 != 0]\nprint(squares)`,
    options: [
      "A. [1, 9]",
      "B. [0, 4, 16]",
      "C. [1, 9, 25]",
      "D. [1, 4, 9]"
    ],
    answer: "A",
    explanation: "range(5) 產出 0, 1, 2, 3, 4。\nif n % 2 != 0 篩選出奇數：1 和 3（注意 5 不在 range(5) 內！）。\n計算 n ** 2：1**2 = 1，3**2 = 9。\n因此得到串列 [1, 9]。",
    traceSteps: [
      { line: 1, text: "range(5) 提供候選值：0, 1, 2, 3, 4", vars: {} },
      { line: 1, text: "條件 if n % 2 != 0 過濾出奇數：1, 3", vars: { odds: "[1, 3]" } },
      { line: 1, text: "計算平方：1**2=1, 3**2=9", vars: { squares: "[1, 9]" } },
      { line: 2, text: "輸出 [1, 9]", vars: { output: "[1, 9]" } }
    ]
  },
  {
    id: "ch6_b4",
    chapterId: 6,
    difficulty: "basic",
    category: "例外處理基礎 try-except",
    question: "下列程式碼會印出什麼？",
    code: `try:\n    val = int("python")\n    print("Success")\nexcept ValueError:\n    print("Invalid Format")\nexcept Exception:\n    print("Other Error")`,
    options: [
      "A. Success",
      "B. Invalid Format",
      "C. Other Error",
      "D. 程式崩潰報錯"
    ],
    answer: "B",
    explanation: "字串 'python' 無法被 int() 轉為十進位整數，會拋出 ValueError。該錯誤會精準被 except ValueError 區塊捕捉並處理，印出 'Invalid Format'，程式正常結束而不崩潰。",
    traceSteps: [
      { line: 2, text: "int('python') 引發 ValueError", vars: { exception: "ValueError" } },
      { line: 4, text: "跳過後續 try 區塊，命中 except ValueError", vars: {} },
      { line: 5, text: "印出 Invalid Format", vars: { output: "Invalid Format" } }
    ]
  },
  {
    id: "ch6_b5",
    chapterId: 6,
    difficulty: "basic",
    category: "檔案基本概念",
    question: "在 Python 中使用 open() 讀取檔案，下列哪一種模式（mode）會在檔案不存在時拋出 FileNotFoundError，且只允許讀取？",
    options: [
      "A. 'w'",
      "B. 'a'",
      "C. 'r'",
      "D. 'x'"
    ],
    answer: "C",
    explanation: "'r' 代表唯讀模式（Read only），若指定檔案不存在會直接拋出 FileNotFoundError；'w' 與 'a' 若檔案不存在則會自動建立新檔。",
    traceSteps: [
      { line: 1, text: "檔案開啟模式驗證：'r' 為唯讀且要求檔案必須存在", vars: {} }
    ]
  },
  {
    id: "ch6_a1",
    chapterId: 6,
    difficulty: "advanced",
    category: "巢狀串列表達式",
    question: "下列巢狀串列表達式的輸出結果為何？",
    code: `matrix = [(i, j) for i in [1, 2] for j in [3, 4]]\nprint(matrix)`,
    options: [
      "A. [(1, 3), (2, 4)]",
      "B. [(1, 3), (1, 4), (2, 3), (2, 4)]",
      "C. [((1, 2), (3, 4))]",
      "D. [(1, 2), (3, 4)]"
    ],
    answer: "B",
    explanation: "串列表達式有多個 for 時，順序等同於一般巢狀迴圈（前外後內）：\nfor i in [1, 2]:\n    for j in [3, 4]:\n        (i, j)\n因此 i=1 時配對 j=3, 4；i=2 時配對 j=3, 4。輸出 [(1, 3), (1, 4), (2, 3), (2, 4)]。",
    traceSteps: [
      { line: 1, text: "外層 i=1：內層 j 遍歷 3, 4 -> 產出 (1, 3), (1, 4)", vars: { part1: "[(1, 3), (1, 4)]" } },
      { line: 1, text: "外層 i=2：內層 j 遍歷 3, 4 -> 產出 (2, 3), (2, 4)", vars: { part2: "[(2, 3), (2, 4)]" } },
      { line: 2, text: "輸出完整 Cartesian 積", vars: { output: "[(1, 3), (1, 4), (2, 3), (2, 4)]" } }
    ]
  },
  {
    id: "ch6_a2",
    chapterId: 6,
    difficulty: "advanced",
    category: "zip 矩陣轉置與索引存取",
    question: "下列程式碼的輸出結果為何？",
    code: `row1 = [10, 20]\nrow2 = [30, 40]\nzipped = list(zip(row1, row2))\nprint(zipped[1][0])`,
    options: [
      "A. 10",
      "B. 20",
      "C. 30",
      "D. 40"
    ],
    answer: "B",
    explanation: "zip(row1, row2) 配對為：\n索引 0: (10, 30)\n索引 1: (20, 40)\nzipped[1] 取得元組 (20, 40)；接著 [0] 取得該元組的第一個元素，即 20。因此輸出 20。",
    traceSteps: [
      { line: 3, text: "zip(row1, row2) 產生 [(10, 30), (20, 40)]", vars: { zipped: "[(10, 30), (20, 40)]" } },
      { line: 4, text: "zipped[1] 是 (20, 40)", vars: { "zipped[1]": "(20, 40)" } },
      { line: 4, text: "(20, 40)[0] 取出數值 20", vars: { "zipped[1][0]": 20 } },
      { line: 4, text: "印出 20", vars: { output: 20 } }
    ]
  },
  {
    id: "ch6_a3",
    chapterId: 6,
    difficulty: "advanced",
    category: "例外處理 try-except-else-finally",
    question: "下列這段程式碼的輸出順序為何？",
    code: `def test_flow(val):\n    res = []\n    try:\n        num = 10 // val\n        res.append("try")\n    except ZeroDivisionError:\n        res.append("except")\n    else:\n        res.append("else")\n    finally:\n        res.append("finally")\n    return "-".join(res)\n\nprint(test_flow(2))`,
    options: [
      "A. try-else-finally",
      "B. try-finally",
      "C. try-except-finally",
      "D. else-finally"
    ],
    answer: "A",
    explanation: "當 val = 2 時：\n1. try 區塊 10 // 2 = 5 正常完成無錯誤，res 加入 'try'；\n2. 因為沒有拋出例外，跳過 except，進入 else 區塊，res 加入 'else'；\n3. 無論是否出錯，finally 區塊必定會執行，res 加入 'finally'；\n4. 組合回傳 'try-else-finally'。",
    traceSteps: [
      { line: 4, text: "10 // 2 = 5 成功執行，加入 'try'", vars: { res: "['try']" } },
      { line: 9, text: "無例外發生，觸發 else 區塊，加入 'else'", vars: { res: "['try', 'else']" } },
      { line: 11, text: "必定執行的 finally 區塊，加入 'finally'", vars: { res: "['try', 'else', 'finally']" } },
      { line: 14, text: "輸出 try-else-finally", vars: { output: "'try-else-finally'" } }
    ]
  },
  {
    id: "ch6_a4",
    chapterId: 6,
    difficulty: "advanced",
    category: "字串篩選與 join 綜合表達式",
    question: "執行下列程式碼會印出什麼？",
    code: `text = "Sec2026-Lab"\ncleaned = "".join([c for c in text if c.isupper() or c.isdigit()])\nprint(cleaned)`,
    options: [
      "A. Sec2026Lab",
      "B. S2026L",
      "C. Sec2026",
      "D. S2026-L"
    ],
    answer: "B",
    explanation: "條件是 c.isupper()（大寫字母）或 c.isdigit()（數字）：\n* 'S': 大寫 (True) -> 保留\n* 'e', 'c': 小寫 (False) -> 捨棄\n* '2', '0', '2', '6': 數字 (True) -> 保留\n* '-': 符號 (False) -> 捨棄\n* 'L': 大寫 (True) -> 保留\n* 'a', 'b': 小寫 (False) -> 捨棄\n以 join 串聯保留的字元得到 'S2026L'。",
    traceSteps: [
      { line: 2, text: "過濾字元：檢查每個字元是否為大寫或數字", vars: {} },
      { line: 2, text: "篩選保留字元：['S', '2', '0', '2', '6', 'L']", vars: { selected: "['S', '2', '0', '2', '6', 'L']" } },
      { line: 3, text: "join 組合輸出 S2026L", vars: { output: "S2026L" } }
    ]
  },
  {
    id: "ch6_a5",
    chapterId: 6,
    difficulty: "advanced",
    category: "enumerate 與字串條件解包",
    question: "下列程式碼的輸出結果為何？",
    code: `s = "pyTHon"\nans = [i for i, ch in enumerate(s) if ch.islower()]\nprint(sum(ans))`,
    options: [
      "A. 10",
      "B. 11",
      "C. 3",
      "D. 8"
    ],
    answer: "A",
    explanation: "s = 'pyTHon' 的字元與索引：\n0:'p'(小寫)\n1:'y'(小寫)\n2:'T'(大寫)\n3:'H'(大寫)\n4:'o'(小寫)\n5:'n'(小寫)\n符合 ch.islower() 的索引為 0, 1, 4, 5。\nans = [0, 1, 4, 5]。\nsum(ans) = 0 + 1 + 4 + 5 = 10。",
    traceSteps: [
      { line: 1, text: "s = 'pyTHon'，各字元索引 0:p, 1:y, 2:T, 3:H, 4:o, 5:n", vars: {} },
      { line: 2, text: "過濾小寫字元索引：0('p'), 1('y'), 4('o'), 5('n')", vars: { ans: "[0, 1, 4, 5]" } },
      { line: 3, text: "sum([0, 1, 4, 5]) = 10", vars: { total: 10 } },
      { line: 3, text: "印出 10", vars: { output: 10 } }
    ]
  },

  // ==========================================
  // COMPREHENSIVE EXAM DRILL (跨章節混合全真題)
  // ==========================================
  {
    id: "mock_01",
    chapterId: 1,
    difficulty: "advanced",
    category: "print 與 end 分隔符",
    question: "執行下列程式碼會得到什麼輸出？",
    code: `for i in range(1, 4):\n    print(i, end="#")\nprint("FIN")`,
    options: [
      "A. 1#2#3#FIN",
      "B. 1#2#3#\\nFIN",
      "C. 1 2 3 FIN",
      "D. #1#2#3FIN"
    ],
    answer: "A",
    explanation: "range(1, 4) 產生 1, 2, 3。每一輪 print 末端都是 '#' 且不換行，因此產出 '1#2#3#'。接著下一行 print('FIN') 直接緊接在最後一個 '#' 後面，因此整體輸出為 '1#2#3#FIN'。",
    traceSteps: [
      { line: 2, text: "i=1: 印出 '1#'", vars: { buffer: "'1#'" } },
      { line: 2, text: "i=2: 印出 '2#'", vars: { buffer: "'1#2#'" } },
      { line: 2, text: "i=3: 印出 '3#'", vars: { buffer: "'1#2#3#'" } },
      { line: 3, text: "印出 'FIN' 接續其後，輸出 '1#2#3#FIN'", vars: { output: "'1#2#3#FIN'" } }
    ]
  },
  {
    id: "mock_02",
    chapterId: 3,
    difficulty: "advanced",
    category: "串列切片賦值與長度變化",
    question: "下列程式碼的執行結果是什麼？",
    code: `nums = [1, 2, 3, 4, 5]\nnums[2:4] = []\nprint(nums)`,
    options: [
      "A. [1, 2, 5]",
      "B. [1, 2, [], 5]",
      "C. [1, 2, 4, 5]",
      "D. Error"
    ],
    answer: "A",
    explanation: "將空串列 [] 賦值給切片區間 nums[2:4] 等同於直接刪除索引 2 和 3 的元素（即 3 與 4）。串列縮短，剩餘 [1, 2, 5]。",
    traceSteps: [
      { line: 1, text: "nums = [1, 2, 3, 4, 5]", vars: { nums: "[1, 2, 3, 4, 5]" } },
      { line: 2, text: "nums[2:4] 代表元素 [3, 4]，將其替換為空", vars: { removed: "[3, 4]" } },
      { line: 3, text: "nums 縮減為 [1, 2, 5]", vars: { nums: "[1, 2, 5]" } }
    ]
  },
  {
    id: "mock_03",
    chapterId: 2,
    difficulty: "advanced",
    category: "字串切片與邊界越界",
    question: "執行下列程式碼會印出什麼？",
    code: `s = "Python"\nprint(s[2:100])`,
    options: [
      "A. thon",
      "B. IndexError: string index out of range",
      "C. thon 加上空白",
      "D. None"
    ],
    answer: "A",
    explanation: "在 Python 中，直接以索引取單一字元越界會拋出 IndexError（例如 s[100]）。但是，字串「切片（Slicing）」對於超出字串長度的邊界是完全寬容的！它會自動在字串結尾停下。因此 s[2:100] 從索引 2('t') 取到最後，得到 'thon'。",
    traceSteps: [
      { line: 1, text: "s = 'Python'", vars: { s: "'Python'" } },
      { line: 2, text: "切片從索引 2 開始，stop=100 超過長度 6，自動截取至結尾", vars: { result: "'thon'" } },
      { line: 2, text: "輸出 thon", vars: { output: "thon" } }
    ]
  },
  {
    id: "mock_04",
    chapterId: 5,
    difficulty: "advanced",
    category: "函式可變參數與不可變數值對比",
    question: "下列程式碼中，印出的 a 和 b 分別為何？",
    code: `def mutate(num, lst):\n    num += 10\n    lst.append(99)\n\na = 5\nb = [1, 2]\nmutate(a, b)\nprint(a, b)`,
    options: [
      "A. 15 [1, 2, 99]",
      "B. 5 [1, 2, 99]",
      "C. 5 [1, 2]",
      "D. 15 [1, 2]"
    ],
    answer: "B",
    explanation: "整數（int）是不可變物件（immutable），在函式內部的 num += 10 只是讓區域變數 num 指向新數值 15，外部的 a 不受任何影響，依然是 5。\n但串列（list）是可變物件（mutable），傳遞的是參照，lst.append(99) 會直接在原記憶體串列中加入 99！因此外部的 b 變成了 [1, 2, 99]。印出 5 [1, 2, 99]。",
    traceSteps: [
      { line: 5, text: "a = 5 (不可變整數), b = [1, 2] (可變串列)", vars: { a: 5, b: "[1, 2]" } },
      { line: 2, text: "函式內 num += 10: 建立區域新數值 15，不影響外層 a", vars: { num: 15, a: 5 } },
      { line: 3, text: "函式內 lst.append(99): 修改了外層同一個串列 b", vars: { b: "[1, 2, 99]" } },
      { line: 8, text: "輸出 5 [1, 2, 99]", vars: { output: "5 [1, 2, 99]" } }
    ]
  },
  {
    id: "mock_05",
    chapterId: 4,
    difficulty: "advanced",
    category: "while 迴圈與 break 次數",
    question: "下列程式碼中，變數 count 最終為多少？",
    code: `count = 0\nx = 10\nwhile x > 0:\n    x -= 3\n    count += 1\n    if x == 4:\n        break\nprint(count, x)`,
    options: [
      "A. 2 4",
      "B. 4 -2",
      "C. 3 1",
      "D. 2 7"
    ],
    answer: "A",
    explanation: "* 初始 x = 10, count = 0。\n* 迭代 1: x -= 3 變 7, count += 1 變 1, 7 != 4 繼續。\n* 迭代 2: x -= 3 變 4, count += 1 變 2, 4 == 4 成立，觸發 break！\n退出迴圈時，count = 2, x = 4。印出 2 4。",
    traceSteps: [
      { line: 4, text: "第 1 輪: x 變為 7, count = 1", vars: { x: 7, count: 1 } },
      { line: 4, text: "第 2 輪: x 變為 4, count = 2", vars: { x: 4, count: 2 } },
      { line: 7, text: "x == 4 成立，觸發 break 跳出", vars: {} },
      { line: 8, text: "輸出 2 4", vars: { output: "2 4" } }
    ]
  },
  {
    id: "mock_06",
    chapterId: 1,
    difficulty: "advanced",
    category: "次方結合性（右結合律）",
    question: "在 Python 中，運算式 2 ** 3 ** 2 的計算結果為何？",
    code: `result = 2 ** 3 ** 2\nprint(result)`,
    options: [
      "A. 64",
      "B. 512",
      "C. 36",
      "D. 128"
    ],
    answer: "B",
    explanation: "Python 中的次方運算子 ** 具備「右結合性（right-associative）」！\n因此 2 ** 3 ** 2 實際上等同於 2 ** (3 ** 2) = 2 ** 9 = 512，而非 (2 ** 3) ** 2 = 64。",
    traceSteps: [
      { line: 1, text: "依右結合律，先計算右側 3 ** 2 = 9", vars: { exponent: 9 } },
      { line: 1, text: "再計算底數的 9 次方：2 ** 9 = 512", vars: { result: 512 } },
      { line: 2, text: "印出 512", vars: { output: 512 } }
    ]
  },
  {
    id: "mock_07",
    chapterId: 1,
    difficulty: "advanced",
    category: "短路求值與零除保護",
    question: "下列哪一段程式碼在執行時「不會」引發 ZeroDivisionError 錯誤？",
    options: [
      "A. True or (1 / 0)",
      "B. False and (1 / 0)",
      "C. 1 == 1 or (5 / 0 == 0)",
      "D. 以上選項皆不會出錯"
    ],
    answer: "D",
    explanation: "Python 的邏輯運算具備「短路求值（Short-circuit evaluation）」機制：\n1. or 運算中只要左側為 True，就不會再去計算右側（A 與 C 右側皆被略過）；\n2. and 運算中只要左側為 False，也不會去計算右側（B 右側被略過）。\n因此三個表達式中的 1/0 都不會被實際執行，全部都不會報錯！選 D。",
    traceSteps: [
      { line: 1, text: "檢查短路求值規則", vars: {} },
      { line: 1, text: "A, B, C 的右側零除表達式均因短路而被略過", vars: { safe: true } }
    ]
  },
  {
    id: "mock_08",
    chapterId: 2,
    difficulty: "advanced",
    category: "字串不可變性與索引修改錯誤",
    question: "執行下列程式碼會得到什麼結果？",
    code: `s = "crawler"\ns[0] = "C"`,
    options: [
      "A. s 變為 'Crawler'",
      "B. TypeError: 'str' object does not support item assignment",
      "C. ValueError: string is immutable",
      "D. s 變為 'C'"
    ],
    answer: "B",
    explanation: "在 Python 中，字串（str）與元組（tuple）都是「不可變物件（immutable）」。直接對字串索引進行賦值操作（s[0] = 'C'）會引發 TypeError: 'str' object does not support item assignment！若要替換開頭字母，應使用切片或 s = 'C' + s[1:]。",
    traceSteps: [
      { line: 1, text: "s = 'crawler' (不可變物件)", vars: { s: "'crawler'" } },
      { line: 2, text: "嘗試修改 s[0] 拋出 TypeError", vars: { error: "TypeError" } }
    ]
  },
  {
    id: "mock_09",
    chapterId: 2,
    difficulty: "advanced",
    category: "字串 split 空白處理差異",
    question: "下列程式碼的輸出結果為何？",
    code: `text = "  NTU   CSIER   "\nwords1 = text.split()\nwords2 = text.split(" ")\nprint(len(words1), len(words2))`,
    options: [
      "A. 2 2",
      "B. 2 9",
      "C. 2 8",
      "D. 4 8"
    ],
    answer: "B",
    explanation: "極度常考的 split() 細節：\n1. text.split() 不傳參數時，會將「任意連續的空白、換行、定位字元」整段視為單一分隔符，並自動去除前後空格，因此只切出 ['NTU', 'CSIER']，長度為 2；\n2. text.split(' ') 明確指定單一空格，相鄰的連續空格會切出空字串 ''，總共切出 9 個元素！故印出 2 9。",
    traceSteps: [
      { line: 2, text: "text.split() 智能收攏空白 -> ['NTU', 'CSIER']，長度 2", vars: { len1: 2 } },
      { line: 3, text: "text.split(' ') 按單空格切片 -> 包含多個空字串，長度 9", vars: { len2: 9 } },
      { line: 4, text: "輸出 2 9", vars: { output: "2 9" } }
    ]
  },
  {
    id: "mock_10",
    chapterId: 3,
    difficulty: "advanced",
    category: "串列 reverse 原地修改回傳",
    question: "下列程式碼執行後會印出什麼？",
    code: `items = [1, 2, 3]\nres = items.reverse()\nprint(res, items)`,
    options: [
      "A. [3, 2, 1] [3, 2, 1]",
      "B. None [3, 2, 1]",
      "C. [3, 2, 1] [1, 2, 3]",
      "D. None [1, 2, 3]"
    ],
    answer: "B",
    explanation: "與 list.sort() 一樣，list.reverse() 也是「原地修改（in-place）」的方法，它反轉原串列本身，並且回傳 None！因此 res 是 None，items 變成 [3, 2, 1]。印出 None [3, 2, 1]。",
    traceSteps: [
      { line: 1, text: "items = [1, 2, 3]", vars: { items: "[1, 2, 3]" } },
      { line: 2, text: "items.reverse() 原地反轉 items，回傳值為 None", vars: { res: "None", items: "[3, 2, 1]" } },
      { line: 3, text: "輸出 None [3, 2, 1]", vars: { output: "None [3, 2, 1]" } }
    ]
  },
  {
    id: "mock_11",
    chapterId: 3,
    difficulty: "advanced",
    category: "串列乘法零長度",
    question: "執行下列程式碼會印出什麼？",
    code: `lst = [10, 20] * 0\nprint(len(lst), bool(lst))`,
    options: [
      "A. 0 False",
      "B. 0 True",
      "C. 2 False",
      "D. Error"
    ],
    answer: "A",
    explanation: "串列乘上 0 或負整數時，會產生一個「空串列 []」。空串列的長度 len(lst) 為 0；且空串列在布林評估 bool(lst) 中被判定為 False。因此印出 0 False。",
    traceSteps: [
      { line: 1, text: "[10, 20] * 0 得到空串列 []", vars: { lst: "[]" } },
      { line: 2, text: "len([]) = 0, bool([]) = False", vars: { len: 0, bool: "False" } },
      { line: 2, text: "輸出 0 False", vars: { output: "0 False" } }
    ]
  },
  {
    id: "mock_12",
    chapterId: 5,
    difficulty: "advanced",
    category: "字典 get 方法與預設值",
    question: "下列程式碼的輸出結果為何？",
    code: `config = {"mode": "stealth", "timeout": 30}\nval1 = config.get("port", 8080)\nval2 = config.get("mode", "normal")\nprint(val1, val2)`,
    options: [
      "A. 8080 stealth",
      "B. None stealth",
      "C. 8080 normal",
      "D. KeyError"
    ],
    answer: "A",
    explanation: "字典的 .get(key, default) 方法：\n1. 若 key 存在，則直接回傳該 key 的值（val2 找到 'mode'，值為 'stealth'，不使用預設值 'normal'）；\n2. 若 key 不存在，則安全回傳指定的 default 預設值（'port' 不存在，回傳 8080），且不會報錯 KeyError。\n因此輸出 8080 stealth。",
    traceSteps: [
      { line: 2, text: "'port' 不在字典中，使用指定預設值 8080", vars: { val1: 8080 } },
      { line: 3, text: "'mode' 存在於字典，取出現有值 'stealth'", vars: { val2: "'stealth'" } },
      { line: 4, text: "輸出 8080 stealth", vars: { output: "8080 stealth" } }
    ]
  },
  {
    id: "mock_13",
    chapterId: 5,
    difficulty: "advanced",
    category: "遞迴呼叫終止條件（課程投影片考點）",
    question: "執行下列遞迴函式，fact(4) 的回傳值為何？",
    code: `def fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)\n\nprint(fact(4))`,
    options: [
      "A. 24",
      "B. 12",
      "C. 16",
      "D. 120"
    ],
    answer: "A",
    explanation: "階乘遞迴追蹤：\nfact(4) = 4 * fact(3)\n       = 4 * (3 * fact(2))\n       = 4 * (3 * (2 * fact(1)))\n       = 4 * 3 * 2 * 1 = 24。\n印出 24。",
    traceSteps: [
      { line: 2, text: "fact(4) -> 4 * fact(3)", vars: { n: 4 } },
      { line: 2, text: "fact(3) -> 3 * fact(2)", vars: { n: 3 } },
      { line: 2, text: "fact(2) -> 2 * fact(1)", vars: { n: 2 } },
      { line: 3, text: "fact(1) 命中終止條件，回傳 1", vars: { n: 1 } },
      { line: 4, text: "依序回溯計算：1 * 2 * 3 * 4 = 24", vars: { result: 24 } }
    ]
  },
  {
    id: "mock_14",
    chapterId: 6,
    difficulty: "advanced",
    category: "Lambda 在 sorted 中的自訂排序 key",
    question: "下列程式碼中，print(students[0][0]) 會印出哪位學生的名字？",
    code: `students = [("Alice", 88), ("Bob", 95), ("Charlie", 72)]\nstudents.sort(key=lambda s: s[1], reverse=True)\nprint(students[0][0])`,
    options: [
      "A. Bob",
      "B. Alice",
      "C. Charlie",
      "D. 95"
    ],
    answer: "A",
    explanation: "key=lambda s: s[1] 指定依照元組的第 2 個元素（分數）來進行排序。搭配 reverse=True（由高到低降冪排序）：\n('Bob', 95) -> ('Alice', 88) -> ('Charlie', 72)。\n排序後的第一個學生 students[0] 是 ('Bob', 95)，其名字 [0] 為 'Bob'。",
    traceSteps: [
      { line: 2, text: "按各元組索引 1 的分數降冪排序：Bob(95) 最高排第一", vars: { first: "('Bob', 95)" } },
      { line: 3, text: "students[0][0] 取出名字 'Bob'", vars: { name: "'Bob'" } },
      { line: 3, text: "輸出 Bob", vars: { output: "Bob" } }
    ]
  },
  {
    id: "mock_15",
    chapterId: 4,
    difficulty: "advanced",
    category: "巢狀迴圈與步長跳躍",
    question: "下列程式碼會印出什麼結果？",
    code: `out = []\nfor i in range(0, 4, 2):\n    for j in range(1, 3):\n        out.append(i + j)\nprint(out)`,
    options: [
      "A. [1, 2, 3, 4]",
      "B. [1, 2, 2, 4]",
      "C. [0, 2, 1, 3]",
      "D. [1, 3, 2, 4]"
    ],
    answer: "A",
    explanation: "* 外層 range(0, 4, 2) 產生 i = 0, 2。\n* 內層 range(1, 3) 產生 j = 1, 2。\n* 當 i = 0: i + j 產生 0+1=1, 0+2=2\n* 當 i = 2: i + j 產生 2+1=3, 2+2=4\n按順序 append 得到 [1, 2, 3, 4]。",
    traceSteps: [
      { line: 2, text: "i=0: j=1 -> append(1), j=2 -> append(2)", vars: { out: "[1, 2]" } },
      { line: 2, text: "i=2: j=1 -> append(3), j=2 -> append(4)", vars: { out: "[1, 2, 3, 4]" } },
      { line: 5, text: "印出 [1, 2, 3, 4]", vars: { output: "[1, 2, 3, 4]" } }
    ]
  }
];


// 模組匯出支援（若在瀏覽器全域環境則掛載至 window）
if (typeof window !== "undefined") {
  window.CHAPTERS_DATA = CHAPTERS_DATA;
  window.QUESTIONS_DATABASE = QUESTIONS_DATABASE;
}
if (typeof module !== "undefined") {
  module.exports = { CHAPTERS_DATA, QUESTIONS_DATABASE };
}
