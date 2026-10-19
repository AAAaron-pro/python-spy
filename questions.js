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
  {
    id: "ch1_b1",
    chapterId: 1,
    dimension: "syntax_io",
    title: "print格式化",
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
    dimension: "syntax_io",
    title: "input型態",
    difficulty: "basic",
    category: "input型態",
    question: "若使用者在鍵盤輸入數字 7，下列程式碼印出的結果為何？",
    code: `num = input("請輸入數值: ")\nprint(num * 2)`,
    options: [
      "A. 14",
      "B. 77",
      "C. 7 * 2",
      "D. TypeError: can't multiply sequence by non-int of type 'str'"
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
    dimension: "syntax_io",
    title: "型態轉換與整數除法",
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
    dimension: "syntax_io",
    title: "布林真假值",
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
    explanation: "在 Python 中，數值 0、空字串 ''、空容器與 None 被 bool() 轉換時均為 False；非零數值 10 為 True，且包含一個空白鍵的字串 ' ' 不是空字串（長度為 1），因此為 True！故印出 False True False True。",
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
    dimension: "syntax_io",
    title: "變數多重賦值",
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
    dimension: "syntax_io",
    title: "型態轉換與複合運算",
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
    dimension: "syntax_io",
    title: "PEP 8 規範檢驗",
    difficulty: "advanced",
    category: "PEP 8 規範檢驗",
    question: "依據投影片所介紹的 PEP 8 與 Python 變數命名標準，下列何者符合良好的 Coding Style？",
    code: ``,
    options: [
      "A. 變數命名以數字開頭，如 2nd_score = 90",
      "B. 串列索引前加空格，如 items[ 0 ]",
      "C. 二元運算子前後空一格，如 total = score_a + score_b",
      "D. 使用關鍵字當變數名，如 class = 'A'"
    ],
    answer: "C",
    explanation: "根據 PEP 8：\n1. 二元運算子（如 =, +）前後應各留一個空白，變數命名應有語意且以底線分隔（snake_case）。\n2. 變數不可用數字開頭（2nd_score 語法錯誤）。\n3. 中括號、小括號內側緊鄰邊界處不應加空白（應為 items[0]）。\n4. class 是保留關鍵字，不能作為識別字。",
    traceSteps: [
      { line: 1, text: "檢查各選項語法與 PEP 8 風格", vars: {} },
      { line: 1, text: "total = score_a + score_b 符合運算子兩側留空格與蛇形命名法規範", vars: { valid: true } }
    ]
  },
  {
    id: "ch1_a3",
    chapterId: 1,
    dimension: "syntax_io",
    title: "浮點數格式化輸出",
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
    dimension: "syntax_io",
    title: "複合賦值運算順序",
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
    dimension: "syntax_io",
    title: "短路求值與真值判斷",
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
  {
    id: "ch2_b1",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "字串切片基礎",
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
    dimension: "strings_ascii",
    title: "字串方法與不可變性",
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
    dimension: "strings_ascii",
    title: "ASCII與ord/chr",
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
    dimension: "strings_ascii",
    title: "字串切片步長",
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
    dimension: "strings_ascii",
    title: "字串判定方法",
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
    dimension: "strings_ascii",
    title: "負數步長與反轉切片",
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
    dimension: "strings_ascii",
    title: "大小寫ASCII轉換演算",
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
    dimension: "strings_ascii",
    title: "字串切片與字元運算組合",
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
    dimension: "strings_ascii",
    title: "split與join組合過濾",
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
    dimension: "strings_ascii",
    title: "replace連鎖操作與不可變性",
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
  {
    id: "ch3_b1",
    chapterId: 3,
    dimension: "containers_memory",
    title: "串列基礎操作",
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
    dimension: "containers_memory",
    title: "sorted 與 list.sort 區別",
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
    dimension: "containers_memory",
    title: "sorted 函式特性",
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
    dimension: "containers_memory",
    title: "insert 與 remove 方法",
    difficulty: "basic",
    category: "insert 與 remove 方法",
    question: "下列程式碼的執行結果為何？",
    code: `data = ["x", "y", "z"]\ndata.insert(1, "a")\ndata.remove("y")\nprint(data)`,
    options: [
      "A. ['x', 'a', 'z']",
      "B. ['a', 'x', 'z']",
      "C. ['x', 'y', 'z', 'a']",
      "D. ['x', 'a', 'y']"
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
    dimension: "containers_memory",
    title: "成員運算子與長度",
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
    dimension: "containers_memory",
    title: "記憶體參照 vs 淺拷貝（考古超常考）",
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
    dimension: "containers_memory",
    title: "重綁定 vs 原地修改",
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
    dimension: "containers_memory",
    title: "二維串列淺拷貝陷阱",
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
    dimension: "containers_memory",
    title: "切片賦值（Slice Assignment）",
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
    dimension: "containers_memory",
    title: "sort key 與 reverse 組合",
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
  {
    id: "ch4_b1",
    chapterId: 4,
    dimension: "control_flow",
    title: "range 負步長運算",
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
    dimension: "control_flow",
    title: "while 條件與計數",
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
    dimension: "control_flow",
    title: "break 與 continue 行為",
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
    dimension: "control_flow",
    title: "巢狀迴圈總次數",
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
    dimension: "control_flow",
    title: "迴圈終止後變數值",
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
    dimension: "control_flow",
    title: "while ... else 機制陷阱",
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
    dimension: "control_flow",
    title: "巢狀迴圈與內層 break 交互",
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
    dimension: "control_flow",
    title: "圖形列印迴圈與變動範圍",
    difficulty: "advanced",
    category: "圖形列印迴圈與變動範圍",
    question: "下列程式碼的終端輸出排版為何？",
    code: `for i in range(1, 4):\n    for j in range(i):\n        print(j, end="")\n    print()`,
    options: [
      "A. 0\n01\n012 (三行遞增輸出)",
      "B. 1\n12\n123 (以 1 開頭三行)",
      "C. 0\n10\n210",
      "D. 012\n01\n0"
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
    dimension: "control_flow",
    title: "迴圈累加與對角線條件",
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
    dimension: "control_flow",
    title: "字串倒序累積技巧",
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
  {
    id: "ch5_b1",
    chapterId: 5,
    dimension: "functions_scope",
    title: "函式預設值回傳",
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
    dimension: "functions_scope",
    title: "預設參數語法規則",
    difficulty: "basic",
    category: "預設參數語法規則",
    question: "下列哪一個函式宣告語法是合法的 Python 語法？",
    code: ``,
    options: [
      "A. def build_query(table='users', fields):",
      "B. def build_query(table, fields='*'):",
      "C. def build_query(table, fields == '*'):",
      "D. def build_query(default table='users'):"
    ],
    answer: "B",
    explanation: "Python 語法規定：具有預設值的參數（default parameters）必須放在所有沒有預設值的「位置參數（positional parameters）」之後。若將具預設值的 table='users' 排在無預設值的 fields 前面，會引發 SyntaxError。只有 def build_query(table, fields='*'): 符合語法規範。",
    traceSteps: [
      { line: 1, text: "檢查參數順序：無預設值的 table 在前，具預設值 fields='*' 在後", vars: { isValid: true } }
    ]
  },
  {
    id: "ch5_b3",
    chapterId: 5,
    dimension: "functions_scope",
    title: "關鍵字引數傳遞",
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
    dimension: "functions_scope",
    title: "全域與區域變數隔離",
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
    dimension: "functions_scope",
    title: "字典基本存取",
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
    dimension: "functions_scope",
    title: "可變預設參數陷阱（考古題必考！）",
    difficulty: "advanced",
    category: "可變預設參數陷阱（考古題必考！）",
    question: "執行下列程式碼會印出什麼？（台大期中考最經典的可變物件預設引數陷阱）",
    code: `def collect_data(item, bucket=[]):\n    bucket.append(item)\n    return bucket\n\nprint(collect_data("A"))\nprint(collect_data("B"))`,
    options: [
      "A. ['A'] 和 ['B']",
      "B. ['A'] 和 ['A', 'B']",
      "C. ['A', 'B'] 和 ['A', 'B']",
      "D. Error (不可使用可變預設引數)"
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
    dimension: "functions_scope",
    title: "UnboundLocalError 陷阱（考古題最高頻失分）",
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
    dimension: "functions_scope",
    title: "global 關鍵字效果",
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
    dimension: "functions_scope",
    title: "高階函式與 Lambda 表達式",
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
    dimension: "functions_scope",
    title: "多重預設引數與求值順序",
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
  {
    id: "ch6_b1",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "enumerate 基礎應用",
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
    dimension: "comprehensions_tools",
    title: "zip 打包解包",
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
    dimension: "comprehensions_tools",
    title: "單層串列表達式",
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
    dimension: "comprehensions_tools",
    title: "例外處理基礎 try-except",
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
    dimension: "comprehensions_tools",
    title: "檔案基本概念",
    difficulty: "basic",
    category: "檔案基本概念",
    question: "在 Python 中使用 open() 讀取檔案，下列哪一種模式（mode）會在檔案不存在時拋出 FileNotFoundError，且只允許讀取？",
    code: ``,
    options: [
      "A. 'w' (寫入模式)",
      "B. 'a' (附加模式)",
      "C. 'r' (唯讀模式)",
      "D. 'x' (排他建立模式)"
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
    dimension: "comprehensions_tools",
    title: "巢狀串列表達式",
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
    dimension: "comprehensions_tools",
    title: "zip 矩陣轉置與索引存取",
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
    dimension: "comprehensions_tools",
    title: "例外處理 try-except-else-finally",
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
    dimension: "comprehensions_tools",
    title: "字串篩選與 join 綜合表達式",
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
    dimension: "comprehensions_tools",
    title: "enumerate 與字串條件解包",
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
  {
    id: "mock_01",
    chapterId: 1,
    dimension: "syntax_io",
    title: "print 與 end 分隔符",
    difficulty: "advanced",
    category: "print 與 end 分隔符",
    question: "執行下列程式碼會得到什麼輸出？",
    code: `for i in range(1, 4):\n    print(i, end="#")\nprint("FIN")`,
    options: [
      "A. 1#2#3#FIN (同一行無換行)",
      "B. 1#2#3# (換行)\nFIN",
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
    dimension: "containers_memory",
    title: "串列切片賦值與長度變化",
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
    dimension: "strings_ascii",
    title: "字串切片與邊界越界",
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
    dimension: "functions_scope",
    title: "函式可變參數與不可變數值對比",
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
    dimension: "control_flow",
    title: "while 迴圈與 break 次數",
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
    dimension: "syntax_io",
    title: "次方結合性（右結合律）",
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
    dimension: "syntax_io",
    title: "短路求值與零除保護",
    difficulty: "advanced",
    category: "短路求值與零除保護",
    question: "下列哪一段程式碼在執行時「不會」引發 ZeroDivisionError 錯誤？",
    code: ``,
    options: [
      "A. True or (1 / 0)",
      "B. False and (1 / 0)",
      "C. 1 == 1 or (5 / 0 == 0)",
      "D. 三段短路邏輯表達式（True or ...、False and ...、1 == 1 or ...）皆不會引發錯誤"
    ],
    answer: "D",
    explanation: "Python 的邏輯運算具備「短路求值（Short-circuit evaluation）」機制：\n1. or 運算中只要左側為 True（如 True or (1 / 0) 與 1 == 1 or (5 / 0 == 0)），就不會再去計算右側；\n2. and 運算中只要左側為 False（如 False and (1 / 0)），也不會去計算右側。\n因此這三段短路邏輯表達式中的除以零都不會被實際執行，全部都不會報錯！",
    traceSteps: [
      { line: 1, text: "檢查短路求值規則", vars: {} },
      { line: 1, text: "三段短路邏輯表達式的右側零除運算均因短路機制而被略過", vars: { safe: true } }
    ]
  },
  {
    id: "mock_08",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "字串不可變性與索引修改錯誤",
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
    dimension: "strings_ascii",
    title: "字串 split 空白處理差異",
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
    dimension: "containers_memory",
    title: "串列 reverse 原地修改回傳",
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
    dimension: "containers_memory",
    title: "串列乘法零長度",
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
    dimension: "functions_scope",
    title: "字典 get 方法與預設值",
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
    dimension: "functions_scope",
    title: "遞迴呼叫終止條件（課程投影片考點）",
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
    dimension: "comprehensions_tools",
    title: "Lambda 在 sorted 中的自訂排序 key",
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
    dimension: "control_flow",
    title: "巢狀迴圈與步長跳躍",
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
  },
  {
    id: "mock_16",
    chapterId: 1,
    dimension: "syntax_io",
    title: "字串乘法與數字轉型相加",
    difficulty: "basic",
    category: "型態轉換與運算",
    question: "執行下列 Python 程式碼後，終端機印出的結果為何？",
    code: `a = "4"
b = int(a * 2) + 3
print(b)`,
    options: [
      "A. 11",
      "B. 47",
      "C. 443",
      "D. 83"
    ],
    answer: "B",
    explanation: "字串乘法 a * 2 即 \'4\' * 2 得到 \'44\'；int(\'44\') 轉型為整數 44；最後 44 + 3 = 47。",
    traceSteps: [
      { line: 1, text: "定義字串變數 a = '4'", vars: {"a": "'4'"} },
      { line: 2, text: "字串乘法 a * 2 得到 '44'，int('44') 轉為 44，加上 3 賦值給 b", vars: {"b": 47} },
      { line: 3, text: "印出 b 的數值 47", vars: {"output": 47} }
    ]
  },
  {
    id: "mock_17",
    chapterId: 1,
    dimension: "syntax_io",
    title: "print 空引數換行效果",
    difficulty: "basic",
    category: "print格式化",
    question: "執行下列程式碼後，終端機的輸出結果為何？",
    code: `print("Line1", end="*")
print()
print("Line2")`,
    options: [
      "A. Line1*Line2 (同一行緊接)",
      "B. Line1* (換行)\nLine2",
      "C. Line1* (連續兩次換行)\n\nLine2",
      "D. Line1* Line2 (同一行以空格隔開)"
    ],
    answer: "B",
    explanation: "print(\'Line1\', end=\'*\') 輸出 \'Line1*\' 且未換行；接著無引數的 print() 預設輸出換行字元 \n；最後 print(\'Line2\') 在新行印出 \'Line2\'。整體輸出在第 1 行為 \'Line1*\'，第 2 行為 \'Line2\'。",
    traceSteps: [
      { line: 1, text: "印出 'Line1*'，不換行", vars: {"buffer": "'Line1*'"} },
      { line: 2, text: "print() 輸出預設換行字元 \n", vars: {} },
      { line: 3, text: "印出 'Line2' 並換行", vars: {"output": "'Line2'"} }
    ]
  },
  {
    id: "mock_18",
    chapterId: 1,
    dimension: "syntax_io",
    title: "負數整數除法向下取整",
    difficulty: "basic",
    category: "整數除法與取餘數",
    question: "下列 Python 運算式執行後的輸出為何？",
    code: `x = -13 // 4
y = -13 % 4
print(x, y)`,
    options: [
      "A. -3 -1",
      "B. -4 3",
      "C. -3 3",
      "D. -4 -1"
    ],
    answer: "B",
    explanation: "Python 的 // 為向下取整（朝向負無限大），-13 / 4 = -3.25，向下取整為 -4。餘數公式為 r = a - (a // b) * b，即 -13 - (-4 * 4) = -13 - (-16) = 3。",
    traceSteps: [
      { line: 1, text: "計算 -13 // 4：-3.25 向下取整為 -4", vars: {"x": -4} },
      { line: 2, text: "計算 -13 % 4：-13 - (-4 * 4) = 3", vars: {"y": 3} },
      { line: 3, text: "印出 x, y 即 '-4 3'", vars: {"output": "-4 3"} }
    ]
  },
  {
    id: "mock_19",
    chapterId: 1,
    dimension: "syntax_io",
    title: "布林真假值評判準則",
    difficulty: "basic",
    category: "布林真假值",
    question: "下列四個 bool() 運算轉換後的輸出為何？",
    code: `a = bool("0")
b = bool("")
c = bool([0])
d = bool([])
print(a, b, c, d)`,
    options: [
      "A. False False False False",
      "B. True False True False",
      "C. False False True False",
      "D. True True True False"
    ],
    answer: "B",
    explanation: "非空字串 \'0\' 長度大於 0 為 True；空字串 \'\' 為 False；包含一個整數 0 的串列 [0] 是非空容器為 True；空串列 [] 為 False。",
    traceSteps: [
      { line: 1, text: "字串 '0' 非空，bool('0') 為 True", vars: {"a": true} },
      { line: 2, text: "字串 '' 為空，bool('') 為 False", vars: {"b": false} },
      { line: 3, text: "串列 [0] 長度為 1 非空，bool([0]) 為 True", vars: {"c": true} },
      { line: 4, text: "串列 [] 為空，bool([]) 為 False", vars: {"d": false} }
    ]
  },
  {
    id: "mock_20",
    chapterId: 1,
    dimension: "syntax_io",
    title: "多重賦值同時求值",
    difficulty: "basic",
    category: "變數賦值",
    question: "執行下列 Python 程式碼後，變數 x 與 y 的值分別為何？",
    code: `x, y = 3, 5
x, y = y, x + y
print(x, y)`,
    options: [
      "A. 5 8",
      "B. 5 10",
      "C. 8 8",
      "D. 3 8"
    ],
    answer: "A",
    explanation: "Python 在多重賦值時，會先將等號右側的所有表達式求值（y 為 5，x + y 為 3 + 5 = 8），再依序指派給左側的 x 與 y。因此 x 變為 5，y 變為 8。",
    traceSteps: [
      { line: 1, text: "初始化 x = 3, y = 5", vars: {"x": 3, "y": 5} },
      { line: 2, text: "計算右側暫存元組 (y, x + y) 即 (5, 8)，再分別賦值給 x, y", vars: {"x": 5, "y": 8} },
      { line: 3, text: "印出 x, y 為 '5 8'", vars: {"output": "5 8"} }
    ]
  },
  {
    id: "mock_21",
    chapterId: 1,
    dimension: "syntax_io",
    title: "浮點數精度比較陷阱",
    difficulty: "basic",
    category: "浮點數運算",
    question: "執行下列程式碼會得到什麼輸出？",
    code: `val = 0.1 + 0.2
print(val == 0.3, round(val, 2) == 0.3)`,
    options: [
      "A. True True",
      "B. False True",
      "C. True False",
      "D. False False"
    ],
    answer: "B",
    explanation: "二進位浮點數無法精確表示 0.1 與 0.2，0.1 + 0.2 實際值約為 0.30000000000000004，直接比較 val == 0.3 結果為 False。但使用 round(val, 2) 四捨五入後與 0.3 比較則為 True。",
    traceSteps: [
      { line: 1, text: "計算 0.1 + 0.2，浮點數暫存約 0.30000000000000004", vars: {"val": 0.30000000000000004} },
      { line: 2, text: "val == 0.3 為 False；round(val, 2) == 0.3 為 True", vars: {"eq1": false, "eq2": true} }
    ]
  },
  {
    id: "mock_22",
    chapterId: 1,
    dimension: "syntax_io",
    title: "短路求值 and/or 回傳運算元",
    difficulty: "advanced",
    category: "短路求值與真值判斷",
    question: "下列短路求值運算式的輸出結果為何？",
    code: `ans = [] or 0 or "Eagle" and 42 or "Falcon"
print(ans)`,
    options: [
      "A. True",
      "B. Eagle",
      "C. 42",
      "D. Falcon"
    ],
    answer: "C",
    explanation: "and 優先權高於 or。先算 \'Eagle\' and 42：因 \'Eagle\' 為真值，and 回傳第二個運算元 42。表達式簡化為 [] or 0 or 42 or \'Falcon\'。由左至右，[] 與 0 均為假值，遇到 42 為真值，or 短路直接回傳 42！",
    traceSteps: [
      { line: 1, text: "and 優先於 or：'Eagle' and 42 求值為 42", vars: {"and_sub": 42} },
      { line: 1, text: "[] or 0 or 42：遇到第一個真值 42 即短路返回", vars: {"ans": 42} },
      { line: 2, text: "印出 ans 為 42", vars: {"output": 42} }
    ]
  },
  {
    id: "mock_23",
    chapterId: 1,
    dimension: "syntax_io",
    title: "負號與次方運算子優先權及結合性",
    difficulty: "advanced",
    category: "運算子優先權",
    question: "下列程式碼中 a, b, c 的輸出結果依序為何？",
    code: `a = -2 ** 4
b = (-2) ** 4
c = 2 ** 3 ** 2
print(a, b, c)`,
    options: [
      "A. 16 16 64",
      "B. -16 16 512",
      "C. -16 -16 512",
      "D. 16 16 512"
    ],
    answer: "B",
    explanation: "次方運算子 ** 優先權高於單元負號 -，所以 -2 ** 4 等於 -(2 ** 4) = -16；而 (-2) ** 4 = 16；此外 ** 是由右至左結合（右結合律），2 ** 3 ** 2 = 2 ** (3 ** 2) = 2 ** 9 = 512。",
    traceSteps: [
      { line: 1, text: "** 優先於負號：-(2**4) = -16", vars: {"a": -16} },
      { line: 2, text: "括號先算：(-2)**4 = 16", vars: {"b": 16} },
      { line: 3, text: "** 右結合：2**(3**2) = 2**9 = 512", vars: {"c": 512} },
      { line: 4, text: "印出 a, b, c", vars: {"output": "-16 16 512"} }
    ]
  },
  {
    id: "mock_24",
    chapterId: 1,
    dimension: "syntax_io",
    title: "短路運算避免除以零錯誤",
    difficulty: "advanced",
    category: "短路求值與真值判斷",
    question: "執行下列 Python 程式碼後，終端機的輸出為何？",
    code: `x = 5
y = 0
res = y != 0 and (x / y > 1)
print(res)`,
    options: [
      "A. False",
      "B. True",
      "C. ZeroDivisionError",
      "D. None"
    ],
    answer: "A",
    explanation: "邏輯運算子 and 具有短路特性。左側表達式 y != 0 為 0 != 0 即 False，Python 立即判定整個 and 運算式結果為 False，右側 (x / y > 1) 完全不會被直譯器執行，因此絕不會引發 ZeroDivisionError。",
    traceSteps: [
      { line: 1, text: "賦值 x = 5, y = 0", vars: {"x": 5, "y": 0} },
      { line: 3, text: "評估 y != 0 為 False，and 運算子觸發短路返回 False", vars: {"res": false} },
      { line: 4, text: "印出 res 為 False", vars: {"output": false} }
    ]
  },
  {
    id: "mock_25",
    chapterId: 1,
    dimension: "syntax_io",
    title: "PEP 8 命名與運算子空格規範",
    difficulty: "advanced",
    category: "PEP 8 規範檢驗",
    question: "依據 PEP 8 官方風格指南，下列變數定義敘述何者完全符合規範？",
    code: `valid_pep8 = "max_score = 100"
print(valid_pep8)`,
    options: [
      "A. max_score = 100 (前後各空一格，標準 PEP 8)",
      "B. max_score=100 (運算子兩側無空格)",
      "C. MaxScore = 100 (駝峰命名法 CamelCase，不符 PEP 8 變數命名)",
      "D. max_score  =  100 (運算子兩側有多個多餘空格)"
    ],
    answer: "A",
    explanation: "PEP 8 規範明訂：一般變數應使用全小寫字母加底線（snake_case），不可用 CamelCase；二元賦值運算子 = 兩側應恰好各保留一個空格，不可緊貼或留多個空格。",
    traceSteps: [
      { line: 1, text: "檢查 PEP 8 規範：小寫底線命名且二元運算子前後各空一格", vars: {"valid_pep8": "'max_score = 100'"} },
      { line: 2, text: "印出符合規範之字串", vars: {"output": "'max_score = 100'"} }
    ]
  },
  {
    id: "mock_26",
    chapterId: 1,
    dimension: "syntax_io",
    title: "多重鏈式比較運算子求值",
    difficulty: "advanced",
    category: "比較運算子特性",
    question: "執行下列鏈式比較（Chained Comparison）程式碼後，印出的結果為何？",
    code: `res = (1 < 3 > 2 == 2 < 5 != 4)
print(res)`,
    options: [
      "A. True",
      "B. False",
      "C. SyntaxError",
      "D. TypeError"
    ],
    answer: "A",
    explanation: "在 Python 中，1 < 3 > 2 == 2 < 5 != 4 等價於 (1 < 3) and (3 > 2) and (2 == 2) and (2 < 5) and (5 != 4)。每個子條件皆為 True，且中間每個運算元只會被求值一次，最終結果為 True。",
    traceSteps: [
      { line: 1, text: "展開鏈式比較：1<3 (T), 3>2 (T), 2==2 (T), 2<5 (T), 5!=4 (T)", vars: {"all_true": true} },
      { line: 1, text: "全部條件均為 True，res 賦值為 True", vars: {"res": true} },
      { line: 2, text: "印出 True", vars: {"output": true} }
    ]
  },
  {
    id: "mock_27",
    chapterId: 1,
    dimension: "syntax_io",
    title: "print 結合 sep 與格式化引數",
    difficulty: "advanced",
    category: "print格式化",
    question: "執行下列格式化輸出程式碼後，終端機顯示的內容為何？",
    code: `agent, rank = "007", 1
print(f"Agent:{agent}", f"Rank:{rank:02d}", sep=" | ", end=";")`,
    options: [
      "A. Agent:007 | Rank:1;",
      "B. Agent:007 | Rank:01;",
      "C. Agent:007 Rank:01;",
      "D. Agent:007 | Rank:01"
    ],
    answer: "B",
    explanation: "rank:02d 表示整數以兩位數顯示並以 0 補足，rank 1 格式化為 \'01\'；sep=\' | \' 將兩項字串以垂直線分隔；end=\';\' 在末尾加上分號，因此整體輸出為 \'Agent:007 | Rank:01;\'。",
    traceSteps: [
      { line: 1, text: "初始化變數 agent = '007', rank = 1", vars: {"agent": "'007'", "rank": 1} },
      { line: 2, text: "f-string 格式化 rank:02d 得到 '01'，產生兩個字串引數", vars: {"arg1": "'Agent:007'", "arg2": "'Rank:01'"} },
      { line: 2, text: "使用 sep=' | ' 連接並附加 end=';' 印出", vars: {"output": "'Agent:007 | Rank:01;'"} }
    ]
  },
  {
    id: "mock_28",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "字串切片間隔取字",
    difficulty: "basic",
    category: "字串切片基礎",
    question: "執行下列字串切片程式碼後，終端機的輸出為何？",
    code: `msg = "CyberSecurity"
print(msg[1:9:2])`,
    options: [
      "A. yeSc",
      "B. yerc",
      "C. CbrS",
      "D. ybrS"
    ],
    answer: "A",
    explanation: "切片 [1:9:2] 包含索引 1, 3, 5, 7。在 \'CyberSecurity\' 中，msg[1]='y', msg[3]='e', msg[5]='S', msg[7]='c'，串聯結果為 \'yeSc\'。",
    traceSteps: [
      { line: 1, text: "定義字串 msg = 'CyberSecurity'", vars: {"msg": "'CyberSecurity'"} },
      { line: 2, text: "計算切片 [1:9:2]：取得索引 1('y'), 3('e'), 5('S'), 7('c')", vars: {"slice": "'yeSc'"} },
      { line: 2, text: "印出 'yeSc'", vars: {"output": "'yeSc'"} }
    ]
  },
  {
    id: "mock_29",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "ord 與 chr 位移運算",
    difficulty: "basic",
    category: "ASCII與ord/chr",
    question: "下列 ASCII 運算程式碼執行後的輸出結果為何？",
    code: `char = "G"
shifted = chr(ord(char) + 3)
print(shifted)`,
    options: [
      "A. I",
      "B. J",
      "C. K",
      "D. H"
    ],
    answer: "B",
    explanation: "ord('G') 的 ASCII 數值為 71，71 + 3 = 74。chr(74) 對應的字元為 'J'（'G' 後第 3 個字母）。",
    traceSteps: [
      { line: 1, text: "設定 char = 'G'", vars: {"char": "'G'"} },
      { line: 2, text: "ord('G') = 71，71 + 3 = 74，chr(74) = 'J'", vars: {"shifted": "'J'"} },
      { line: 3, text: "印出 shifted 即 'J'", vars: {"output": "'J'"} }
    ]
  },
  {
    id: "mock_30",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "字元數字轉整數差值",
    difficulty: "basic",
    category: "ASCII與ord/chr",
    question: "執行下列程式碼會得到什麼輸出？",
    code: `digit_char = "8"
diff = ord(digit_char) - ord("0")
print(diff, type(diff).__name__)`,
    options: [
      "A. 8 int",
      "B. 8 str",
      "C. 56 int",
      "D. 8 float"
    ],
    answer: "A",
    explanation: "ASCII 碼中數字字元 '0' 到 '9' 是連續編碼（'0' 是 48，'8' 是 56）。56 - 48 = 8，且相減結果為整數 int。",
    traceSteps: [
      { line: 1, text: "digit_char = '8'", vars: {"digit_char": "'8'"} },
      { line: 2, text: "ord('8') - ord('0') = 56 - 48 = 8", vars: {"diff": 8} },
      { line: 3, text: "diff 的型態名稱為 'int'，輸出 '8 int'", vars: {"output": "8 int"} }
    ]
  },
  {
    id: "mock_31",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "字串不可變性賦值錯誤",
    difficulty: "basic",
    category: "字串不可變性",
    question: "執行下列嘗試修改字串字元的程式碼，會發生什麼情況？",
    code: `s = "Python"
try:
    s[0] = "J"
except TypeError:
    print("TypeError")`,
    options: [
      "A. Jython",
      "B. Python",
      "C. TypeError",
      "D. IndexError"
    ],
    answer: "C",
    explanation: "Python 的字串是不可變物件（Immutable），不支援透過索引進行元素賦值（item assignment）。執行 s[0] = 'J' 會拋出 TypeError！",
    traceSteps: [
      { line: 1, text: "定義字串 s = 'Python'", vars: {"s": "'Python'"} },
      { line: 3, text: "嘗試執行 s[0] = 'J'，字串不支援原地修改，拋出 TypeError", vars: {} },
      { line: 5, text: "except 區塊捕獲 TypeError 並印出 'TypeError'", vars: {"output": "'TypeError'"} }
    ]
  },
  {
    id: "mock_32",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "字串 find 找不到子字串之傳回值",
    difficulty: "basic",
    category: "字串方法特性",
    question: "執行下列 Python 程式碼後，印出的 pos 數值為何？",
    code: `text = "Agent007"
pos = text.find("X")
print(pos)`,
    options: [
      "A. -1",
      "B. False",
      "C. None",
      "D. ValueError"
    ],
    answer: "A",
    explanation: "str.find() 若未搜尋到指定子字串，會安全傳回整數 -1 而非拋出異常；若使用 str.index() 找不到則會拋出 ValueError。",
    traceSteps: [
      { line: 1, text: "text = 'Agent007'", vars: {"text": "'Agent007'"} },
      { line: 2, text: "搜尋 'X'，子字串不存在，find() 返回 -1", vars: {"pos": -1} },
      { line: 3, text: "印出 -1", vars: {"output": -1} }
    ]
  },
  {
    id: "mock_33",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "字串 split 預設空白處理機制",
    difficulty: "basic",
    category: "字串分割與合併",
    question: "執行下列程式碼後，終端機輸出的長度與連接字串為何？",
    code: `raw = "   code   fast   now   "
parts = raw.split()
print(len(parts), "-".join(parts))`,
    options: [
      "A. 3 code-fast-now",
      "B. 7 -code--fast--now-",
      "C. 5 code-fast-now",
      "D. 3 code fast now"
    ],
    answer: "A",
    explanation: "str.split() 不傳入引數時，會自動去除頭尾空白並將任何連續空白視為單一分隔符，切出 ['code', 'fast', 'now']，長度為 3，join 後為 'code-fast-now'。",
    traceSteps: [
      { line: 1, text: "raw 包含多餘前後與中間空白", vars: {"raw": "'   code   fast   now   '"} },
      { line: 2, text: "split() 壓縮連續空白切分為 ['code', 'fast', 'now']", vars: {"parts": "['code', 'fast', 'now']"} },
      { line: 3, text: "長度為 3，以 '-' 連接印出", vars: {"output": "'3 code-fast-now'"} }
    ]
  },
  {
    id: "mock_34",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "負步長反向切片含頭不含尾",
    difficulty: "advanced",
    category: "負步長切片",
    question: "執行下列負步長切片程式碼後，印出的結果為何？",
    code: `code = "0123456789"
print(code[7:2:-2])`,
    options: [
      "A. 753",
      "B. 7531",
      "C. 8642",
      "D. 246"
    ],
    answer: "A",
    explanation: "切片 [7:2:-2]：從索引 7（字元 '7'）開始，每次減 2，結束界限為 2（不包含索引 2 的字元 '2'）。因此依序取出的索引為 7, 5, 3，對應字元為 '753'。",
    traceSteps: [
      { line: 1, text: "code = '0123456789'", vars: {"code": "'0123456789'"} },
      { line: 2, text: "索引 7->'7', 5->'5', 3->'3'；下一個 1 超過結束條件 2 停止", vars: {"slice": "'753'"} },
      { line: 2, text: "印出 '753'", vars: {"output": "'753'"} }
    ]
  },
  {
    id: "mock_35",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "切片越界安全機制與負索引",
    difficulty: "advanced",
    category: "字串邊界安全",
    question: "下列字串切片在邊界完全越界時的輸出為何？",
    code: `s = "Spy"
part1 = s[10:20]
part2 = s[-100:2]
print(repr(part1), part2)`,
    options: [
      "A. IndexError Sp",
      "B. '' Sp",
      "C. None Sp",
      "D. '' Spy"
    ],
    answer: "B",
    explanation: "在 Python 中，直接單字元索引存取 s[10] 會拋出 IndexError，但「切片」即使完全越界也不會報錯。s[10:20] 返回空字串 ''；s[-100:2] 會自動將超出的負起點截取為 0，取得 s[0:2] 即 'Sp'。",
    traceSteps: [
      { line: 1, text: "s = 'Spy'，長度為 3", vars: {"s": "'Spy'"} },
      { line: 2, text: "切片 [10:20] 超出右邊界，安全返回空字串 ''", vars: {"part1": "''"} },
      { line: 3, text: "切片 [-100:2] 自動調節為 [0:2]，取得 'Sp'", vars: {"part2": "'Sp'"} },
      { line: 4, text: "印出 '' Sp", vars: {"output": "'' Sp"} }
    ]
  },
  {
    id: "mock_36",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "ASCII 位元 XOR 大小寫互換",
    difficulty: "advanced",
    category: "ASCII與位元運算",
    question: "執行下列利用 XOR 32 進行字元轉換的程式碼後，輸出為何？",
    code: `word = "NtU"
converted = "".join(chr(ord(c) ^ 32) if c.isalpha() else c for c in word)
print(converted)`,
    options: [
      "A. NTU",
      "B. ntu",
      "C. nTu",
      "D. NtU"
    ],
    answer: "C",
    explanation: "英文字母大寫與小寫 ASCII 碼差恰為 32（二進位第 5 位為 1）。對字母的 ASCII 碼進行 ^ 32 可以翻轉大小寫：'N'(大寫) 變 'n'，'t'(小寫) 變 'T'，'U'(大寫) 變 'u'，合併為 'nTu'。",
    traceSteps: [
      { line: 1, text: "word = 'NtU'", vars: {"word": "'NtU'"} },
      { line: 2, text: "ord('N')^32 -> 'n', ord('t')^32 -> 'T', ord('U')^32 -> 'u'", vars: {"converted": "'nTu'"} },
      { line: 3, text: "印出 'nTu'", vars: {"output": "'nTu'"} }
    ]
  },
  {
    id: "mock_37",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "字串 strip 字元集合匹配機制",
    difficulty: "advanced",
    category: "字串清洗方法",
    question: "執行下列 strip 程式碼後，清洗後的字串為何？",
    code: `url = "www.mission-secret.tw."
cleaned = url.strip(".w")
print(cleaned)`,
    options: [
      "A. mission-secret.tw",
      "B. mission-secret",
      "C. .mission-secret.tw.",
      "D. mission-secret.t"
    ],
    answer: "D",
    explanation: "strip('.w') 的引數是字元集合 {'.', 'w'}，會持續移除頭尾屬於該集合的字元。開頭 'www.' 全部被移除；末尾的 '.' 被移除後，前一個字元是 'w' 也屬於集合故被移除，直到遇到 't' 停止。最終結果為 'mission-secret.t'。",
    traceSteps: [
      { line: 1, text: "url = 'www.mission-secret.tw.'", vars: {"url": "'www.mission-secret.tw.'"} },
      { line: 2, text: "strip('.w') 去除頭部 'w','w','w','.' 與尾部 '.','w'，遇到 't' 終止", vars: {"cleaned": "'mission-secret.t'"} },
      { line: 3, text: "印出 'mission-secret.t'", vars: {"output": "'mission-secret.t'"} }
    ]
  },
  {
    id: "mock_38",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "replace 連鎖替換次數限制與原字串不變",
    difficulty: "advanced",
    category: "字串不可變性",
    question: "執行下列 replace 操作後，s 與 res 的輸出為何？",
    code: `s = "banana"
res = s.replace("a", "o", 1).replace("n", "m")
print(s, res)`,
    options: [
      "A. bonama bonama",
      "B. banana bomama",
      "C. banana bonama",
      "D. banana banana"
    ],
    answer: "B",
    explanation: "第一個 replace('a', 'o', 1) 僅替換第 1 個 'a'，得到 'bonana'；第二個 replace('n', 'm') 將所有 'n' 替換為 'm' 得到 'bomama'。因字串具不可變性，原字串 s 依然維持 'banana'。",
    traceSteps: [
      { line: 1, text: "定義 s = 'banana'", vars: {"s": "'banana'"} },
      { line: 2, text: "替換第 1 個 'a' 成 'o' 得到 'bonana'，再將所有 'n' 換成 'm' 得到 'bomama'", vars: {"res": "'bomama'"} },
      { line: 3, text: "原字串 s 未變，輸出 'banana bomama'", vars: {"output": "'banana bomama'"} }
    ]
  },
  {
    id: "mock_39",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "字串乘法與 join 複合排版",
    difficulty: "advanced",
    category: "字串方法特性",
    question: "執行下列程式碼後，變數 pattern 的值為何？",
    code: `pattern = "-".join(["A" * 2, "B" * 3, "C" * 1])
print(pattern)`,
    options: [
      "A. A-A-B-B-B-C",
      "B. AA-BBB-C",
      "C. A2-B3-C1",
      "D. AA-BBB-C-"
    ],
    answer: "B",
    explanation: "字串乘法分別產出 ['AA', 'BBB', 'C']。使用 '-'.join(...) 將串列元素串接，元素間以 '-' 分隔，最後不會有多餘的 '-'，因此輸出 'AA-BBB-C'。",
    traceSteps: [
      { line: 1, text: "建立串列 ['AA', 'BBB', 'C']", vars: {"items": "['AA', 'BBB', 'C']"} },
      { line: 1, text: "以 '-' 作為分隔符號串接", vars: {"pattern": "'AA-BBB-C'"} },
      { line: 2, text: "印出 pattern", vars: {"output": "'AA-BBB-C'"} }
    ]
  },
  {
    id: "mock_40",
    chapterId: 3,
    dimension: "containers_memory",
    title: "串列別名共用相同記憶體位址",
    difficulty: "basic",
    category: "串列記憶體機制",
    question: "執行下列別名指派程式碼後，印出的長度與最後元素為何？",
    code: `p = [10, 20, 30]
q = p
q.append(40)
print(len(p), p[-1])`,
    options: [
      "A. 3 30",
      "B. 4 40",
      "C. 3 40",
      "D. 4 30"
    ],
    answer: "B",
    explanation: "q = p 只是建立了參照別名（Aliasing），兩個變數指向同一個記憶體串列物件。q.append(40) 會直接修改此串列，因此 p 的長度變為 4，最後一個元素 p[-1] 為 40。",
    traceSteps: [
      { line: 1, text: "p 指向串列 [10, 20, 30]", vars: {"p": "[10, 20, 30]"} },
      { line: 2, text: "q = p 使 q 指向與 p 相同的記憶體位址", vars: {"q": "ref(p)"} },
      { line: 3, text: "q.append(40) 修改共用串列", vars: {"p": "[10, 20, 30, 40]"} },
      { line: 4, text: "len(p) 為 4，p[-1] 為 40", vars: {"output": "4 40"} }
    ]
  },
  {
    id: "mock_41",
    chapterId: 3,
    dimension: "containers_memory",
    title: "全切片淺拷貝獨立性",
    difficulty: "basic",
    category: "淺拷貝與複製",
    question: "執行下列全切片拷貝程式碼後，終端機顯示的內容為何？",
    code: `orig = [1, 2, 3]
copy_list = orig[:]
copy_list.append(99)
print(orig, copy_list)`,
    options: [
      "A. [1, 2, 3] [1, 2, 3, 99]",
      "B. [1, 2, 3, 99] [1, 2, 3, 99]",
      "C. [1, 2, 3] [99]",
      "D. [1, 2, 3, 99] [1, 2, 3]"
    ],
    answer: "A",
    explanation: "切片 copy_list = orig[:] 建立了原始串列的獨立副本（淺拷貝）。後續對 copy_list 的 append 操作不會影響 orig，orig 依然保持 [1, 2, 3]。",
    traceSteps: [
      { line: 1, text: "orig = [1, 2, 3]", vars: {"orig": "[1, 2, 3]"} },
      { line: 2, text: "orig[:] 建立獨立新串列並指派給 copy_list", vars: {"copy_list": "[1, 2, 3]"} },
      { line: 3, text: "copy_list.append(99) 僅修改副本", vars: {"copy_list": "[1, 2, 3, 99]"} },
      { line: 4, text: "印出 orig 與 copy_list", vars: {"output": "[1, 2, 3] [1, 2, 3, 99]"} }
    ]
  },
  {
    id: "mock_42",
    chapterId: 3,
    dimension: "containers_memory",
    title: "list.sort 原地排序傳回值 None",
    difficulty: "basic",
    category: "排序方法區別",
    question: "執行下列 list.sort() 排序程式碼後，印出的結果為何？",
    code: `nums = [5, 2, 8, 1]
result = nums.sort()
print(result, nums)`,
    options: [
      "A. [1, 2, 5, 8] [1, 2, 5, 8]",
      "B. None [1, 2, 5, 8]",
      "C. [1, 2, 5, 8] [5, 2, 8, 1]",
      "D. None [5, 2, 8, 1]"
    ],
    answer: "B",
    explanation: "list.sort() 是原地修改（In-place）的串列方法，不會產生新串列，且固定回傳 None。原串列 nums 則被排序為 [1, 2, 5, 8]。",
    traceSteps: [
      { line: 1, text: "nums = [5, 2, 8, 1]", vars: {"nums": "[5, 2, 8, 1]"} },
      { line: 2, text: "nums.sort() 原地排序 nums，回傳值為 None", vars: {"result": null, "nums": "[1, 2, 5, 8]"} },
      { line: 3, text: "印出 None [1, 2, 5, 8]", vars: {"output": "None [1, 2, 5, 8]"} }
    ]
  },
  {
    id: "mock_43",
    chapterId: 3,
    dimension: "containers_memory",
    title: "sorted 函式回傳新串列保留原物件",
    difficulty: "basic",
    category: "排序方法區別",
    question: "執行下列 sorted 函式程式碼後，終端機顯示為何？",
    code: `data = [3, 1, 4]
new_data = sorted(data, reverse=True)
print(data, new_data)`,
    options: [
      "A. [4, 3, 1] [4, 3, 1]",
      "B. [3, 1, 4] [4, 3, 1]",
      "C. [3, 1, 4] [1, 3, 4]",
      "D. None [4, 3, 1]"
    ],
    answer: "B",
    explanation: "內建函式 sorted(data) 會建立並傳回一個全新的已排序串列，原串列 data 完全不受影響保持 [3, 1, 4]；new_data 則接收逆序排序後的 [4, 3, 1]。",
    traceSteps: [
      { line: 1, text: "data = [3, 1, 4]", vars: {"data": "[3, 1, 4]"} },
      { line: 2, text: "sorted() 建立新串列 [4, 3, 1]，data 保持不變", vars: {"new_data": "[4, 3, 1]"} },
      { line: 3, text: "印出 data 與 new_data", vars: {"output": "[3, 1, 4] [4, 3, 1]"} }
    ]
  },
  {
    id: "mock_44",
    chapterId: 3,
    dimension: "containers_memory",
    title: "串列 append 與 extend 行為差異",
    difficulty: "basic",
    category: "串列操作方法",
    question: "執行下列程式碼後，lst1 與 lst2 的長度分別為何？",
    code: `lst1 = [1, 2]
lst1.append([3, 4])
lst2 = [1, 2]
lst2.extend([3, 4])
print(len(lst1), len(lst2))`,
    options: [
      "A. 4 4",
      "B. 3 4",
      "C. 4 3",
      "D. 3 3"
    ],
    answer: "B",
    explanation: "append 將傳入的 [3, 4] 視為單一子串列元素加入，lst1 變成 [1, 2, [3, 4]] 長度為 3；extend 則是展開 [3, 4] 逐一加入，lst2 變成 [1, 2, 3, 4] 長度為 4。",
    traceSteps: [
      { line: 2, text: "lst1.append([3, 4]) -> [1, 2, [3, 4]]", vars: {"len1": 3} },
      { line: 4, text: "lst2.extend([3, 4]) -> [1, 2, 3, 4]", vars: {"len2": 4} },
      { line: 5, text: "印出長度 3 4", vars: {"output": "3 4"} }
    ]
  },
  {
    id: "mock_45",
    chapterId: 3,
    dimension: "containers_memory",
    title: "串列 pop 移除指定索引與末尾元素",
    difficulty: "basic",
    category: "串列操作方法",
    question: "執行下列 pop 程式碼後，印出的 val1, val2 與 items 為何？",
    code: `items = ["Alpha", "Bravo", "Charlie", "Delta"]
val1 = items.pop(1)
val2 = items.pop()
print(val1, val2, items)`,
    options: [
      "A. Bravo Delta ['Alpha', 'Charlie']",
      "B. Alpha Delta ['Bravo', 'Charlie']",
      "C. Bravo Charlie ['Alpha', 'Delta']",
      "D. Bravo Delta ['Charlie']"
    ],
    answer: "A",
    explanation: "items.pop(1) 移除並回傳索引 1 的元素 'Bravo'，items 剩下 ['Alpha', 'Charlie', 'Delta']；接著 items.pop() 預設移除並回傳末尾元素 'Delta'，items 剩下 ['Alpha', 'Charlie']。",
    traceSteps: [
      { line: 2, text: "pop(1) 移出 'Bravo'", vars: {"val1": "'Bravo'", "items": "['Alpha', 'Charlie', 'Delta']"} },
      { line: 3, text: "pop() 移出末尾 'Delta'", vars: {"val2": "'Delta'", "items": "['Alpha', 'Charlie']"} },
      { line: 4, text: "印出結果", vars: {"output": "Bravo Delta ['Alpha', 'Charlie']"} }
    ]
  },
  {
    id: "mock_46",
    chapterId: 3,
    dimension: "containers_memory",
    title: "二維串列乘法淺拷貝連鎖修改陷阱",
    difficulty: "advanced",
    category: "二維串列與淺拷貝",
    question: "下列二維串列乘法初始化程式碼中，變數 total 的值為何？",
    code: `grid = [[0] * 3] * 3
grid[1][1] = 7
total = sum(grid[i][1] for i in range(3))
print(total)`,
    options: [
      "A. 7",
      "B. 14",
      "C. 21",
      "D. 0"
    ],
    answer: "C",
    explanation: "[[0] * 3] * 3 產生的是 3 個指向「同一個內部串列物件」的參照！當修改 grid[1][1] = 7 時，grid[0][1]、grid[1][1]、grid[2][1] 同步全部變成 7。加總為 7 + 7 + 7 = 21。",
    traceSteps: [
      { line: 1, text: "以乘法建立 3 列，3 列皆參照同一記憶體串列 [0, 0, 0]", vars: {"grid": "[[0,0,0], [0,0,0], [0,0,0]]"} },
      { line: 2, text: "修改 grid[1][1] = 7，三列同步變更為 [0, 7, 0]", vars: {"grid": "[[0,7,0], [0,7,0], [0,7,0]]"} },
      { line: 3, text: "sum(7 + 7 + 7) = 21", vars: {"total": 21} },
      { line: 4, text: "印出 21", vars: {"output": 21} }
    ]
  },
  {
    id: "mock_47",
    chapterId: 3,
    dimension: "containers_memory",
    title: "切片賦值替換多個元素並縮減長度",
    difficulty: "advanced",
    category: "切片賦值",
    question: "執行下列切片賦值程式碼後，串列 nums 的內容為何？",
    code: `nums = [10, 20, 30, 40, 50]
nums[1:4] = [99]
print(nums)`,
    options: [
      "A. [10, 99, 50]",
      "B. [10, 99, 40, 50]",
      "C. [10, [99], 50]",
      "D. TypeError"
    ],
    answer: "A",
    explanation: "nums[1:4] 選取索引 1, 2, 3 的三個元素（20, 30, 40）。將 [99] 賦值給該區間會將這 3 個元素替換為單一元素 99，長度由 5 縮減為 3，結果為 [10, 99, 50]。",
    traceSteps: [
      { line: 1, text: "nums = [10, 20, 30, 40, 50]", vars: {"nums": "[10, 20, 30, 40, 50]"} },
      { line: 2, text: "將區間 nums[1:4] (20, 30, 40) 替換為 [99]", vars: {"nums": "[10, 99, 50]"} },
      { line: 3, text: "印出 nums", vars: {"output": "[10, 99, 50]"} }
    ]
  },
  {
    id: "mock_48",
    chapterId: 3,
    dimension: "containers_memory",
    title: "零長度切片賦值進行原地插入",
    difficulty: "advanced",
    category: "切片賦值",
    question: "執行下列空區間切片賦值程式碼後，nums 的內容為何？",
    code: `nums = [1, 4, 5]
nums[1:1] = [2, 3]
print(nums)`,
    options: [
      "A. [1, 2, 3, 4, 5]",
      "B. [1, [2, 3], 4, 5]",
      "C. [1, 2, 3, 5]",
      "D. IndexError"
    ],
    answer: "A",
    explanation: "切片 nums[1:1] 為零長度區間。對其賦值 [2, 3] 等同於在索引 1 的位置原地插入元素 2, 3，不會刪除任何既有元素，得到 [1, 2, 3, 4, 5]。",
    traceSteps: [
      { line: 1, text: "nums = [1, 4, 5]", vars: {"nums": "[1, 4, 5]"} },
      { line: 2, text: "在索引 1 前插入 [2, 3]", vars: {"nums": "[1, 2, 3, 4, 5]"} },
      { line: 3, text: "印出 nums", vars: {"output": "[1, 2, 3, 4, 5]"} }
    ]
  },
  {
    id: "mock_49",
    chapterId: 3,
    dimension: "containers_memory",
    title: "串列 += 原地擴展 vs + 重新綁定之函式效應",
    difficulty: "advanced",
    category: "串列記憶體機制",
    question: "執行下列函式呼叫後，外部串列 a 與 b 的值分別為何？",
    code: `def test_mutate(lst):
    lst += [100]

def test_rebind(lst):
    lst = lst + [200]

a = [1]
b = [1]
test_mutate(a)
test_rebind(b)
print(a, b)`,
    options: [
      "A. [1, 100] [1, 200]",
      "B. [1, 100] [1]",
      "C. [1] [1]",
      "D. [1] [1, 200]"
    ],
    answer: "B",
    explanation: "對於可變串列，lst += [100] 是原地修改（呼叫 __iadd__），會修改傳入的原物件，因此外部 a 變為 [1, 100]；而 lst = lst + [200] 則是產生全新串列並重新指派給區域變數 lst，外部 b 保持 [1]。",
    traceSteps: [
      { line: 9, text: "test_mutate(a)：lst += [100] 原地修改 a 的記憶體內容", vars: {"a": "[1, 100]"} },
      { line: 10, text: "test_rebind(b)：lst = lst + [200] 僅重綁定區域變數，b 不受影響", vars: {"b": "[1]"} },
      { line: 11, text: "印出 a 與 b", vars: {"output": "[1, 100] [1]"} }
    ]
  },
  {
    id: "mock_50",
    chapterId: 3,
    dimension: "containers_memory",
    title: "sort key 搭配元組雙重排序規則",
    difficulty: "advanced",
    category: "排序方法區別",
    question: "執行下列使用元組 key 進行雙重條件排序的程式碼後，印出的首尾單字為何？",
    code: `words = ["banana", "pie", "apple", "fig"]
words.sort(key=lambda w: (len(w), w))
print(words[0], words[-1])`,
    options: [
      "A. fig banana",
      "B. apple banana",
      "C. pie fig",
      "D. fig apple"
    ],
    answer: "A",
    explanation: "元組 key 為 (len(w), w)：優先比較長度，長度相同時比字典順序。長度為 3 的有 'fig' 與 'pie'，因 'fig' < 'pie'，'fig' 排第一位；長度最長為 'banana'(6)，排在最後一位。",
    traceSteps: [
      { line: 2, text: "以 (長度, 字典序) 排序：'fig'(3, 'fig') < 'pie'(3, 'pie') < 'apple'(5) < 'banana'(6)", vars: {"words": "['fig', 'pie', 'apple', 'banana']"} },
      { line: 3, text: "印出 words[0] 與 words[-1]", vars: {"output": "'fig banana'"} }
    ]
  },
  {
    id: "mock_51",
    chapterId: 3,
    dimension: "containers_memory",
    title: "串列 remove 方法僅刪除第一個相符項",
    difficulty: "advanced",
    category: "串列操作方法",
    question: "執行下列 remove 程式碼後，串列中 2 的數量與最終內容為何？",
    code: `vals = [2, 1, 2, 3, 2]
vals.remove(2)
print(vals.count(2), vals)`,
    options: [
      "A. 0 [1, 3]",
      "B. 2 [1, 2, 3, 2]",
      "C. 2 [2, 1, 2, 3]",
      "D. 3 [2, 1, 2, 3, 2]"
    ],
    answer: "B",
    explanation: "list.remove(x) 只會尋找並刪除「第一個」相符的值。索引 0 的 2 被刪除後，剩餘 [1, 2, 3, 2]，其中依舊包含 2 個 2。",
    traceSteps: [
      { line: 1, text: "vals = [2, 1, 2, 3, 2]", vars: {"vals": "[2, 1, 2, 3, 2]"} },
      { line: 2, text: "remove(2) 移除最左側的 2", vars: {"vals": "[1, 2, 3, 2]"} },
      { line: 3, text: "count(2) 為 2，印出 '2 [1, 2, 3, 2]'", vars: {"output": "2 [1, 2, 3, 2]"} }
    ]
  },
  {
    id: "mock_52",
    chapterId: 4,
    dimension: "control_flow",
    title: "range 負步長終點界限判定",
    difficulty: "basic",
    category: "range邊界計算",
    question: "執行下列負步長 range 轉換為串列的程式碼，結果為何？",
    code: `res = list(range(9, 2, -3))
print(res)`,
    options: [
      "A. [9, 6, 3]",
      "B. [9, 6, 3, 0]",
      "C. [9, 7, 5, 3]",
      "D. []"
    ],
    answer: "A",
    explanation: "range(9, 2, -3) 起始值為 9，每次減 3，且不包含終點值 2。產生的序列為 9, 6, 3（下一個為 0，已小於等於終點 2，故停止）。",
    traceSteps: [
      { line: 1, text: "range(9, 2, -3) 產出 9, 6, 3", vars: {"res": "[9, 6, 3]"} },
      { line: 2, text: "印出 [9, 6, 3]", vars: {"output": "[9, 6, 3]"} }
    ]
  },
  {
    id: "mock_53",
    chapterId: 4,
    dimension: "control_flow",
    title: "range 空區間長度計算",
    difficulty: "basic",
    category: "range邊界計算",
    question: "下列兩個 range 轉換為串列後的長度分別為何？",
    code: `r1 = list(range(5, 2))
r2 = list(range(2, 5, -1))
print(len(r1), len(r2))`,
    options: [
      "A. 3 3",
      "B. 0 0",
      "C. 0 3",
      "D. 3 0"
    ],
    answer: "B",
    explanation: "range(5, 2) 預設步長為 +1，起點 5 大於終點 2 無法遞增，產生空序列；range(2, 5, -1) 步長為 -1，起點 2 小於終點 5 無法遞減，亦產生空序列。兩者長度皆為 0。",
    traceSteps: [
      { line: 1, text: "5 到 2 且步長為 +1，無元素，r1 = []", vars: {"r1": "[]"} },
      { line: 2, text: "2 到 5 且步長為 -1，無元素，r2 = []", vars: {"r2": "[]"} },
      { line: 3, text: "印出長度 0 0", vars: {"output": "0 0"} }
    ]
  },
  {
    id: "mock_54",
    chapterId: 4,
    dimension: "control_flow",
    title: "while 迴圈狀態累加與倍增終止",
    difficulty: "basic",
    category: "while 條件與計數",
    question: "執行下列 while 迴圈後，total 與 n 的值分別為何？",
    code: `n = 1
total = 0
while n <= 8:
    total += n
    n *= 2
print(total, n)`,
    options: [
      "A. 15 8",
      "B. 15 16",
      "C. 7 8",
      "D. 7 16"
    ],
    answer: "B",
    explanation: "各輪迭代：n=1(total=1,n=2), n=2(total=3,n=4), n=4(total=7,n=8), n=8(total=15,n=16)。當 n=16 時，16 <= 8 條件不成立結束迴圈，輸出 15 16。",
    traceSteps: [
      { line: 3, text: "迴圈四次：n 分別為 1, 2, 4, 8，累加 total = 15", vars: {"total": 15} },
      { line: 5, text: "最後一輪 n 乘 2 變為 16，條件終止", vars: {"n": 16} },
      { line: 6, text: "印出 15 16", vars: {"output": "15 16"} }
    ]
  },
  {
    id: "mock_55",
    chapterId: 4,
    dimension: "control_flow",
    title: "迴圈 continue 略過偶數迭代",
    difficulty: "basic",
    category: "break 與 continue",
    question: "執行下列包含 continue 敘述的程式碼後，vals 串列的內容為何？",
    code: `vals = []
for i in range(1, 6):
    if i % 2 == 0:
        continue
    vals.append(i * 10)
print(vals)`,
    options: [
      "A. [10, 30, 50]",
      "B. [20, 40]",
      "C. [10, 20, 30, 40, 50]",
      "D. []"
    ],
    answer: "A",
    explanation: "當 i 為偶數（2, 4）時，continue 會立刻略過該次迭代後續的 append 敘述；只有奇數 1, 3, 5 會執行 append(i * 10)，產出 [10, 30, 50]。",
    traceSteps: [
      { line: 3, text: "i = 1: 奇數加入 10；i = 2: 偶數 continue 跳過", vars: {"vals": "[10]"} },
      { line: 3, text: "i = 3: 奇數加入 30；i = 4: 偶數 continue 跳過", vars: {"vals": "[10, 30]"} },
      { line: 3, text: "i = 5: 奇數加入 50", vars: {"vals": "[10, 30, 50]"} },
      { line: 6, text: "印出 [10, 30, 50]", vars: {"output": "[10, 30, 50]"} }
    ]
  },
  {
    id: "mock_56",
    chapterId: 4,
    dimension: "control_flow",
    title: "for 迴圈變數在迴圈結束後之留存",
    difficulty: "basic",
    category: "迴圈作用域特性",
    question: "執行下列 Python 程式碼後，印出的變數 k 數值為何？",
    code: `for k in range(5):
    pass
print(k)`,
    options: [
      "A. 4",
      "B. 5",
      "C. None",
      "D. NameError"
    ],
    answer: "A",
    explanation: "在 Python 中，for 迴圈不會建立獨立區域作用域。迴圈執行完畢後，迭代變數 k 依然存在於當前作用域中，其值為最後一次迭代賦予的值 4。",
    traceSteps: [
      { line: 1, text: "range(5) 依序產生 0, 1, 2, 3, 4", vars: {"k": 4} },
      { line: 3, text: "迴圈結束後 k 仍存在且值為 4，印出 4", vars: {"output": 4} }
    ]
  },
  {
    id: "mock_57",
    chapterId: 4,
    dimension: "control_flow",
    title: "單層 break 終止尋找第一個偶數",
    difficulty: "basic",
    category: "break 與 continue",
    question: "執行下列尋找第一個偶數的程式碼後，輸出為何？",
    code: `nums = [1, 3, 5, 8, 9, 11]
first_even = None
for x in nums:
    if x % 2 == 0:
        first_even = x
        break
print(first_even)`,
    options: [
      "A. 8",
      "B. 11",
      "C. None",
      "D. 2"
    ],
    answer: "A",
    explanation: "尋訪串列，依序檢查 1, 3, 5 皆為奇數；當遇到 8 時符合 x % 2 == 0，指派 first_even = 8 並執行 break 立即跳出迴圈，不再檢查後續的 9 與 11。",
    traceSteps: [
      { line: 4, text: "檢查 1, 3, 5 不符合；x = 8 時條件成立", vars: {"first_even": 8} },
      { line: 6, text: "執行 break 跳出迴圈", vars: {} },
      { line: 7, text: "印出 8", vars: {"output": 8} }
    ]
  },
  {
    id: "mock_58",
    chapterId: 4,
    dimension: "control_flow",
    title: "雙層巢狀迴圈 break 僅跳出當前內層",
    difficulty: "advanced",
    category: "巢狀迴圈機制",
    question: "下列雙層巢狀迴圈執行完畢後，變數 count 的值為何？",
    code: `count = 0
for i in range(3):
    for j in range(3):
        if j == 1:
            break
        count += 1
print(count)`,
    options: [
      "A. 3",
      "B. 1",
      "C. 9",
      "D. 6"
    ],
    answer: "A",
    explanation: "外層迴圈共執行 3 次（i = 0, 1, 2）。在每一輪外層迴圈中，內層 j = 0 時 count 加 1；當 j = 1 時觸發 break，只跳出該層內層迴圈，外層迴圈繼續進行。因此每輪 count 只加 1，總計 3 * 1 = 3。",
    traceSteps: [
      { line: 2, text: "i=0: j=0 (count+1), j=1 (break跳出內層)", vars: {"count": 1} },
      { line: 2, text: "i=1: j=0 (count+1), j=1 (break跳出內層)", vars: {"count": 2} },
      { line: 2, text: "i=2: j=0 (count+1), j=1 (break跳出內層)", vars: {"count": 3} },
      { line: 7, text: "印出總計 count = 3", vars: {"output": 3} }
    ]
  },
  {
    id: "mock_59",
    chapterId: 4,
    dimension: "control_flow",
    title: "for-else 結構與 break 中斷交互",
    difficulty: "advanced",
    category: "while/for-else",
    question: "執行下列包含 for ... else 結構的程式碼後，印出的 found 為何？",
    code: `nums = [2, 4, 6, 7, 8]
found = False
for n in nums:
    if n % 2 != 0:
        found = True
        break
else:
    found = "ALL_EVEN"
print(found)`,
    options: [
      "A. True",
      "B. ALL_EVEN",
      "C. False",
      "D. None"
    ],
    answer: "A",
    explanation: "for 迴圈在遍歷到 7 時觸發 break 跳出。在 Python 中，只有當迴圈正常遍歷完畢（未曾遭遇 break）時才會執行 else 區塊。因被 break 中斷，else 區塊不被執行，found 維持 True。",
    traceSteps: [
      { line: 4, text: "遍歷至 7，n % 2 != 0 成立", vars: {"found": true} },
      { line: 6, text: "執行 break 中斷迴圈", vars: {} },
      { line: 7, text: "遭遇 break 跳過 else 區塊", vars: {} },
      { line: 9, text: "印出 True", vars: {"output": true} }
    ]
  },
  {
    id: "mock_60",
    chapterId: 4,
    dimension: "control_flow",
    title: "邊走訪邊移除元素造成索引位移漏檢",
    difficulty: "advanced",
    category: "迴圈陷阱與邊界",
    question: "執行下列在遍歷中調用 remove() 的程式碼，最終 data 串列內容為何？",
    code: `data = [1, 2, 2, 3, 4]
for x in data:
    if x % 2 == 0:
        data.remove(x)
print(data)`,
    options: [
      "A. [1, 3]",
      "B. [1, 2, 3]",
      "C. [1, 2, 2, 3]",
      "D. [1, 3, 4]"
    ],
    answer: "B",
    explanation: "遍歷中刪除元素會導致內部索引位移：當第 1 個 2 在索引 1 被 remove 後，後續元素往前遞補，第 2 個 2 移至索引 1。下一輪迴圈檢查索引 2（數值為 3），導致第 2 個 2 被完美漏檢！最後移除 4，剩餘 [1, 2, 3]。",
    traceSteps: [
      { line: 2, text: "迭代至索引 1 的 2，執行 remove(2)，串列變為 [1, 2, 3, 4]", vars: {"data": "[1, 2, 3, 4]"} },
      { line: 2, text: "下一輪內部指標移向索引 2 (值為 3)，第 2 個 2 被略過", vars: {} },
      { line: 2, text: "迭代至 4，執行 remove(4)，串列變為 [1, 2, 3]", vars: {"data": "[1, 2, 3]"} },
      { line: 5, text: "印出 [1, 2, 3]", vars: {"output": "[1, 2, 3]"} }
    ]
  },
  {
    id: "mock_61",
    chapterId: 4,
    dimension: "control_flow",
    title: "while 迴圈配合 continue 數值累加",
    difficulty: "advanced",
    category: "break 與 continue",
    question: "執行下列 while 迴圈累加程式碼後，印出的 total 為何？",
    code: `i = 0
total = 0
while i < 5:
    i += 1
    if i == 3:
        continue
    total += i
print(total)`,
    options: [
      "A. 12",
      "B. 15",
      "C. 10",
      "D. 9"
    ],
    answer: "A",
    explanation: "i 逐次加 1，值依序為 1, 2, 3, 4, 5。當 i = 3 時觸發 continue，跳過該輪的 total += i。其餘 i = 1, 2, 4, 5 均被累加：1 + 2 + 4 + 5 = 12。",
    traceSteps: [
      { line: 4, text: "i=1 累加 total=1; i=2 累加 total=3", vars: {"total": 3} },
      { line: 5, text: "i=3 時遇到 continue 跳過加總", vars: {} },
      { line: 4, text: "i=4 累加 total=7; i=5 累加 total=12", vars: {"total": 12} },
      { line: 8, text: "印出 12", vars: {"output": 12} }
    ]
  },
  {
    id: "mock_62",
    chapterId: 4,
    dimension: "control_flow",
    title: "巢狀迴圈矩陣對角線座標運算",
    difficulty: "advanced",
    category: "巢狀迴圈機制",
    question: "執行下列對角線座標累加程式碼後，終端機的輸出為何？",
    code: `ans = 0
for r in range(4):
    for c in range(4):
        if r == c:
            ans += (r + c)
print(ans)`,
    options: [
      "A. 12",
      "B. 24",
      "C. 16",
      "D. 8"
    ],
    answer: "A",
    explanation: "只有當 r == c（主對角線）時才會累加 (r + c) = 2r。r 取值 0, 1, 2, 3：分別累加 0, 2, 4, 6。總和 ans = 0 + 2 + 4 + 6 = 12。",
    traceSteps: [
      { line: 4, text: "對角線座標 (0,0)->0, (1,1)->2, (2,2)->4, (3,3)->6", vars: {"terms": "[0, 2, 4, 6]"} },
      { line: 5, text: "累加總和 ans = 12", vars: {"ans": 12} },
      { line: 6, text: "印出 12", vars: {"output": 12} }
    ]
  },
  {
    id: "mock_63",
    chapterId: 4,
    dimension: "control_flow",
    title: "while 複合短路條件提早中斷計步",
    difficulty: "advanced",
    category: "while 條件與計數",
    question: "執行下列布林標誌計步程式碼後，變數 steps 的值為何？",
    code: `flags = [False, False, True, False]
steps = 0
while steps < len(flags) and not flags[steps]:
    steps += 1
print(steps)`,
    options: [
      "A. 2",
      "B. 3",
      "C. 4",
      "D. 1"
    ],
    answer: "A",
    explanation: "steps=0: flags[0] 為 False，not False 為 True，steps 增加到 1；steps=1: flags[1] 為 False，not False 為 True，steps 增加到 2；steps=2: flags[2] 為 True，not True 為 False，while 條件不成立停止迴圈。輸出 steps = 2。",
    traceSteps: [
      { line: 3, text: "steps=0: not flags[0] 為 True，steps 變 1", vars: {"steps": 1} },
      { line: 3, text: "steps=1: not flags[1] 為 True，steps 變 2", vars: {"steps": 2} },
      { line: 3, text: "steps=2: not flags[2] 為 False，迴圈中斷", vars: {"steps": 2} },
      { line: 5, text: "印出 2", vars: {"output": 2} }
    ]
  },
  {
    id: "mock_64",
    chapterId: 5,
    dimension: "functions_scope",
    title: "函式未撰寫 return 預設傳回 None",
    difficulty: "basic",
    category: "函式預設傳回值",
    question: "執行下列沒有 return 語句的函式後，變數 res 的值為何？",
    code: `def update_score(s):
    s += 10

res = update_score(50)
print(res)`,
    options: [
      "A. 60",
      "B. None",
      "C. 50",
      "D. 0"
    ],
    answer: "B",
    explanation: "Python 函式內部若沒有執行任何 return 語句，直譯器預設會隱式回傳 None，而不是運算後的數值或 0。",
    traceSteps: [
      { line: 4, text: "呼叫 update_score(50)", vars: {} },
      { line: 2, text: "區域變數 s 增加 10 變 60，函式無 return 結束", vars: {"s": 60} },
      { line: 4, text: "接收函式隱式傳回值 None", vars: {"res": null} },
      { line: 5, text: "印出 None", vars: {"output": null} }
    ]
  },
  {
    id: "mock_65",
    chapterId: 5,
    dimension: "functions_scope",
    title: "位置引數與關鍵字引數混合傳遞",
    difficulty: "basic",
    category: "引數傳遞機制",
    question: "執行下列關鍵字引數混合呼叫的程式碼，輸出結果為何？",
    code: `def calc(a, b, c=10):
    return a * 2 + b - c

print(calc(5, c=4, b=3))`,
    options: [
      "A. 9",
      "B. 10",
      "C. 7",
      "D. 11"
    ],
    answer: "A",
    explanation: "a 透過位置引數綁定為 5；b 透過關鍵字引數指定為 3；預設參數 c 透過關鍵字引數覆寫為 4。計算 5 * 2 + 3 - 4 = 10 + 3 - 4 = 9。",
    traceSteps: [
      { line: 4, text: "傳入 a=5, b=3, c=4", vars: {"a": 5, "b": 3, "c": 4} },
      { line: 2, text: "計算 5*2 + 3 - 4 = 9 並回傳", vars: {"return": 9} },
      { line: 4, text: "印出 9", vars: {"output": 9} }
    ]
  },
  {
    id: "mock_66",
    chapterId: 5,
    dimension: "functions_scope",
    title: "預設參數定義順序語法規則",
    difficulty: "basic",
    category: "預設參數語法",
    question: "依據 Python 語法，下列何者是完全合法的函式定義宣告？",
    code: `def valid_func(a, b=2, c=3):
    return a + b + c
print(valid_func(1))`,
    options: [
      "A. def f(a=1, b): pass",
      "B. def f(a, b=2, c): pass",
      "C. def valid_func(a, b=2, c=3): pass",
      "D. def f(a=1, b=2, c): pass"
    ],
    answer: "C",
    explanation: "Python 規定沒有預設值的參數（non-default argument）必須排在所有具有預設值的參數（default argument）之前，否則會拋出 SyntaxError。因此只有 def valid_func(a, b=2, c=3): pass 合法，輸出 1 + 2 + 3 = 6。",
    traceSteps: [
      { line: 1, text: "定義合法的函式參數順序：無預設值 a 在前，具預設值 b=2, c=3 在後", vars: {} },
      { line: 3, text: "呼叫 valid_func(1)：a=1, b=2, c=3，回傳 6", vars: {"output": 6} }
    ]
  },
  {
    id: "mock_67",
    chapterId: 5,
    dimension: "functions_scope",
    title: "函式回傳多值形成元組 (Tuple)",
    difficulty: "basic",
    category: "函式回傳值型態",
    question: "執行下列回傳多個值的函式後，變數 val 的型態與元素個數為何？",
    code: `def get_stats():
    return 100, "Pass", True

val = get_stats()
print(type(val).__name__, len(val))`,
    options: [
      "A. tuple 3",
      "B. list 3",
      "C. dict 3",
      "D. set 3"
    ],
    answer: "A",
    explanation: "在 Python 中，return 後方以逗號分隔多個表達式時，直譯器會自動打包（Tuple Packing）為元組（tuple）傳回。因此 val 的型態為 tuple，長度為 3。",
    traceSteps: [
      { line: 2, text: "回傳 100, 'Pass', True 自動打包為元組 (100, 'Pass', True)", vars: {"val": "(100, 'Pass', True)"} },
      { line: 4, text: "val 接收元組", vars: {} },
      { line: 5, text: "印出型態 'tuple' 與長度 3", vars: {"output": "tuple 3"} }
    ]
  },
  {
    id: "mock_68",
    chapterId: 5,
    dimension: "functions_scope",
    title: "全域變數純讀取與作用域向外查找",
    difficulty: "basic",
    category: "變數作用域",
    question: "執行下列存取全域變數的程式碼後，終端機的輸出為何？",
    code: `target = "Agent"
def reveal():
    print(target, end=" ")
reveal()
print("Done")`,
    options: [
      "A. Agent Done",
      "B. Done",
      "C. UnboundLocalError",
      "D. NameError"
    ],
    answer: "A",
    explanation: "函式內部若僅讀取變數且函式內無任何賦值動作，Python 遵循 LEGB 規則會向外層全域作用域查找，成功讀取 target 的值 'Agent'。",
    traceSteps: [
      { line: 1, text: "全域定義 target = 'Agent'", vars: {"target": "'Agent'"} },
      { line: 4, text: "呼叫 reveal()，函式內無賦值，向外找到全域 target", vars: {} },
      { line: 3, text: "印出 'Agent '，不換行", vars: {"buffer": "'Agent '"} },
      { line: 5, text: "印出 'Done'，整體輸出 'Agent Done'", vars: {"output": "'Agent Done'"} }
    ]
  },
  {
    id: "mock_69",
    chapterId: 5,
    dimension: "functions_scope",
    title: "字典 get 方法自訂預設值防禦 KeyError",
    difficulty: "basic",
    category: "字典操作與防禦",
    question: "執行下列字典查詢程式碼後，變數 age 的值為何？",
    code: `profile = {"id": "007", "codename": "Bond"}
age = profile.get("age", 30)
print(age)`,
    options: [
      "A. KeyError",
      "B. None",
      "C. 30",
      "D. 0"
    ],
    answer: "C",
    explanation: "dict.get(key, default) 在鍵不存在於字典中時，不會拋出 KeyError，而是安全回傳所提供的預設值 30。",
    traceSteps: [
      { line: 1, text: "profile 字典只有 'id' 與 'codename'", vars: {"profile": "{'id': '007', 'codename': 'Bond'}"} },
      { line: 2, text: "查詢 'age' 鍵不存在，get 方法回傳第二個引數 30", vars: {"age": 30} },
      { line: 3, text: "印出 30", vars: {"output": 30} }
    ]
  },
  {
    id: "mock_70",
    chapterId: 5,
    dimension: "functions_scope",
    title: "可變預設參數跨函式呼叫累積陷阱",
    difficulty: "advanced",
    category: "可變預設參數陷阱",
    question: "執行下列使用可變預設參數串列的程式碼，最終印出的 a 為何？",
    code: `def collect(val, bag=[]):
    bag.append(val)
    return bag

a = collect("X")
b = collect("Y")
print(a)`,
    options: [
      "A. ['X']",
      "B. ['X', 'Y']",
      "C. ['Y']",
      "D. []"
    ],
    answer: "B",
    explanation: "函式的預設參數 bag=[] 僅在函式定義時被建立一次。兩次呼叫皆未傳入 bag，共享同一個串列記憶體物件。第二次呼叫 append('Y') 同時影響了指向該串列的變數 a，因此 a 為 ['X', 'Y']。",
    traceSteps: [
      { line: 5, text: "第 1 次呼叫 collect('X')，預設串列加入 'X'，a 接收參照", vars: {"bag": "['X']", "a": "['X']"} },
      { line: 6, text: "第 2 次呼叫 collect('Y')，同一串列加入 'Y'，b 接收同一參照", vars: {"bag": "['X', 'Y']"} },
      { line: 7, text: "印出 a 指向的物件 ['X', 'Y']", vars: {"output": "['X', 'Y']"} }
    ]
  },
  {
    id: "mock_71",
    chapterId: 5,
    dimension: "functions_scope",
    title: "區域變數賦值提升引發 UnboundLocalError",
    difficulty: "advanced",
    category: "作用域與UnboundLocalError",
    question: "執行下列嘗試修改同名全域變數的程式碼，會印出什麼結果？",
    code: `count = 50
def bump():
    count += 1
try:
    bump()
except UnboundLocalError:
    print("UnboundLocalError")`,
    options: [
      "A. 51",
      "B. 50",
      "C. UnboundLocalError",
      "D. NameError"
    ],
    answer: "C",
    explanation: "count += 1 包含賦值語句 count = count + 1。Python 在編譯函式時檢測到賦值，將 count 標記為區域變數。執行時右側 count + 1 在賦值前嘗試讀取尚未初始化的區域變數，拋出 UnboundLocalError！",
    traceSteps: [
      { line: 1, text: "全域 count = 50", vars: {"count": 50} },
      { line: 3, text: "函式內部有賦值，count 被編譯為區域變數；但在賦值前讀取", vars: {} },
      { line: 6, text: "直譯器拋出 UnboundLocalError，except 捕獲並印出", vars: {"output": "'UnboundLocalError'"} }
    ]
  },
  {
    id: "mock_72",
    chapterId: 5,
    dimension: "functions_scope",
    title: "global 宣告明確修改全域變數",
    difficulty: "advanced",
    category: "global 關鍵字",
    question: "執行下列使用 global 關鍵字的程式碼後，印出的 code 數值為何？",
    code: `code = 100
def modify():
    global code
    code = 200

modify()
print(code)`,
    options: [
      "A. 100",
      "B. 200",
      "C. None",
      "D. UnboundLocalError"
    ],
    answer: "B",
    explanation: "函式內部使用 global code 宣告，明確指明 code 指向全域作用域。隨後的 code = 200 便成功修改了全域變數，因此最後印出 200。",
    traceSteps: [
      { line: 1, text: "全域變數 code = 100", vars: {"code": 100} },
      { line: 3, text: "宣告 global code，將函式內的 code 綁定至全域", vars: {} },
      { line: 4, text: "賦值 code = 200 修改全域變數", vars: {"code": 200} },
      { line: 7, text: "印出全域變數 code 為 200", vars: {"output": 200} }
    ]
  },
  {
    id: "mock_73",
    chapterId: 5,
    dimension: "functions_scope",
    title: "Lambda 函式自訂元組多欄位排序",
    difficulty: "advanced",
    category: "Lambda 與高階函式",
    question: "執行下列使用 Lambda 排序元組的程式碼後，pairs 的排列順序為何？",
    code: `pairs = [(1, "b"), (2, "a"), (1, "a")]
pairs.sort(key=lambda p: (p[0], p[1]))
print(pairs)`,
    options: [
      "A. [(1, 'a'), (1, 'b'), (2, 'a')]",
      "B. [(2, 'a'), (1, 'a'), (1, 'b')]",
      "C. [(1, 'b'), (1, 'a'), (2, 'a')]",
      "D. [(1, 'a'), (2, 'a'), (1, 'b')]"
    ],
    answer: "A",
    explanation: "排序 key 為 (p[0], p[1])。第一欄位相同時（皆為 1），比較第二欄位字串：'a' 在 'b' 前面，因此 (1, 'a') 排在 (1, 'b') 之前；最後是 (2, 'a')。",
    traceSteps: [
      { line: 2, text: "以 (數值, 字母) 雙欄位升序排序", vars: {} },
      { line: 2, text: "排序結果：(1, 'a') < (1, 'b') < (2, 'a')", vars: {"pairs": "[(1, 'a'), (1, 'b'), (2, 'a')]"} },
      { line: 3, text: "印出 pairs", vars: {"output": "[(1, 'a'), (1, 'b'), (2, 'a')]"} }
    ]
  },
  {
    id: "mock_74",
    chapterId: 5,
    dimension: "functions_scope",
    title: "參數傳遞：不可變整數 vs 可變串列",
    difficulty: "advanced",
    category: "物件參照傳遞",
    question: "執行下列程式碼後，num 與 my_list 的輸出結果為何？",
    code: `def proc(n, lst):
    n += 10
    lst.append(99)

num = 5
my_list = [1, 2]
proc(num, my_list)
print(num, my_list)`,
    options: [
      "A. 15 [1, 2, 99]",
      "B. 5 [1, 2, 99]",
      "C. 15 [1, 2]",
      "D. 5 [1, 2]"
    ],
    answer: "B",
    explanation: "整數為不可變型態，n += 10 只是讓函式區域變數 n 指向新整數物件 15，外部 num 保持 5；串列為可變物件，lst.append(99) 在原地修改同一塊記憶體，外部 my_list 變為 [1, 2, 99]。",
    traceSteps: [
      { line: 2, text: "區域變數 n 變為 15，不影響外部不可變整數 num", vars: {"num": 5} },
      { line: 3, text: "lst.append(99) 原地修改外部可變串列", vars: {"my_list": "[1, 2, 99]"} },
      { line: 8, text: "印出 num 與 my_list", vars: {"output": "5 [1, 2, 99]"} }
    ]
  },
  {
    id: "mock_75",
    chapterId: 5,
    dimension: "functions_scope",
    title: "遞迴函式呼叫堆疊展開追蹤",
    difficulty: "advanced",
    category: "遞迴函式機制",
    question: "執行下列遞迴函式程式碼後，終端機印出的數值為何？",
    code: `def f(n):
    if n <= 1:
        return 1
    return n + f(n - 2)

print(f(6))`,
    options: [
      "A. 12",
      "B. 13",
      "C. 10",
      "D. 16"
    ],
    answer: "B",
    explanation: "呼叫堆疊展開：f(6) = 6 + f(4)；f(4) = 4 + f(2)；f(2) = 2 + f(0)；f(0) 滿足 n <= 1 回傳 1。向上回溯計算：f(2) = 2 + 1 = 3；f(4) = 4 + 3 = 7；f(6) = 6 + 7 = 13。",
    traceSteps: [
      { line: 4, text: "展開：f(6) = 6 + f(4)", vars: {} },
      { line: 4, text: "展開：f(4) = 4 + f(2)", vars: {} },
      { line: 4, text: "展開：f(2) = 2 + f(0)", vars: {} },
      { line: 3, text: "基準條件：f(0) 回傳 1", vars: {} },
      { line: 4, text: "回溯計算：f(2)=3, f(4)=7, f(6)=13", vars: {"result": 13} },
      { line: 6, text: "印出 13", vars: {"output": 13} }
    ]
  },
  {
    id: "mock_76",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "enumerate 自訂起始索引",
    difficulty: "basic",
    category: "enumerate應用",
    question: "執行下列使用 start=1 的 enumerate 程式碼後，第一個元素 indexed[0] 為何？",
    code: `teams = ["Red", "Blue", "Gold"]
indexed = list(enumerate(teams, start=1))
print(indexed[0])`,
    options: [
      "A. (0, 'Red')",
      "B. (1, 'Red')",
      "C. [1, 'Red']",
      "D. ('Red', 1)"
    ],
    answer: "B",
    explanation: "enumerate(iterable, start=1) 將起始計數器設為 1，並產生包含 (index, element) 的元組。因此第 0 個元素為 (1, 'Red')。",
    traceSteps: [
      { line: 2, text: "enumerate 指定 start=1，依序產出 (1, 'Red'), (2, 'Blue'), (3, 'Gold')", vars: {"indexed": "[(1, 'Red'), (2, 'Blue'), (3, 'Gold')]"} },
      { line: 3, text: "印出 indexed[0] 為 (1, 'Red')", vars: {"output": "(1, 'Red')"} }
    ]
  },
  {
    id: "mock_77",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "zip 依最短迭代長度截斷",
    difficulty: "basic",
    category: "zip打包機制",
    question: "執行下列 zip 打包程式碼後，長度與最後一項為何？",
    code: `keys = ["a", "b", "c", "d"]
vals = [10, 20]
paired = list(zip(keys, vals))
print(len(paired), paired[-1])`,
    options: [
      "A. 4 ('d', None)",
      "B. 2 ('b', 20)",
      "C. 2 ('c', 20)",
      "D. 4 ('b', 20)"
    ],
    answer: "B",
    explanation: "zip() 走訪多個序列時，只要其中最短的一個序列結束便立即停止。vals 只有 2 個元素，因此打包結果為 [('a', 10), ('b', 20)]，長度為 2，末項為 ('b', 20)。",
    traceSteps: [
      { line: 3, text: "zip 依據最短長度 vals(2) 截斷，產生 [('a', 10), ('b', 20)]", vars: {"paired": "[('a', 10), ('b', 20)]"} },
      { line: 4, text: "len(paired) 為 2，paired[-1] 為 ('b', 20)", vars: {"output": "2 ('b', 20)"} }
    ]
  },
  {
    id: "mock_78",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "單層串列表達式條件過濾與平方",
    difficulty: "basic",
    category: "串列表達式",
    question: "執行下列串列表達式後，變數 squares 的內容為何？",
    code: `nums = [1, 2, 3, 4, 5, 6]
squares = [x ** 2 for x in nums if x % 2 == 1]
print(squares)`,
    options: [
      "A. [1, 9, 25]",
      "B. [4, 16, 36]",
      "C. [1, 4, 9, 16, 25, 36]",
      "D. [1, 3, 5]"
    ],
    answer: "A",
    explanation: "後方的 if x % 2 == 1 篩選出奇數 1, 3, 5；前方的運算式 x ** 2 將其分別平方為 1, 9, 25，組成串列 [1, 9, 25]。",
    traceSteps: [
      { line: 2, text: "過濾奇數：1, 3, 5", vars: {"odds": "[1, 3, 5]"} },
      { line: 2, text: "計算平方：1**2=1, 3**2=9, 5**2=25", vars: {"squares": "[1, 9, 25]"} },
      { line: 3, text: "印出 [1, 9, 25]", vars: {"output": "[1, 9, 25]"} }
    ]
  },
  {
    id: "mock_79",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "try-except 捕捉 ValueError 異常",
    difficulty: "basic",
    category: "例外處理基礎",
    question: "執行下列包含例外處理的程式碼後，印出的 val 數值為何？",
    code: `try:
    val = int("Python")
except ValueError:
    val = -1
except TypeError:
    val = -2
print(val)`,
    options: [
      "A. Python",
      "B. -1",
      "C. -2",
      "D. 0"
    ],
    answer: "B",
    explanation: "int('Python') 嘗試將英文字串轉換為十進位整數，會拋出 ValueError。該例外被 except ValueError 分支精準捕獲，將 val 設為 -1。",
    traceSteps: [
      { line: 2, text: "int('Python') 拋出 ValueError", vars: {} },
      { line: 3, text: "進入 except ValueError 分支", vars: {} },
      { line: 4, text: "val 賦值為 -1", vars: {"val": -1} },
      { line: 7, text: "印出 -1", vars: {"output": -1} }
    ]
  },
  {
    id: "mock_80",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "dict 與 zip 快速建構字典",
    difficulty: "basic",
    category: "zip打包機制",
    question: "執行下列結合 zip 與 dict 的程式碼後，終端機印出的內容為何？",
    code: `headers = ["user", "role"]
data = ["agent007", "spy"]
info = dict(zip(headers, data))
print(info["role"])`,
    options: [
      "A. spy",
      "B. agent007",
      "C. role",
      "D. KeyError"
    ],
    answer: "A",
    explanation: "zip(headers, data) 將對應項打包成 [('user', 'agent007'), ('role', 'spy')]，dict() 將元組串列轉換為鍵值字典。info['role'] 查得對應值 'spy'。",
    traceSteps: [
      { line: 3, text: "zip 配對鍵與值，dict() 轉為 {'user': 'agent007', 'role': 'spy'}", vars: {"info": "{'user': 'agent007', 'role': 'spy'}"} },
      { line: 4, text: "查詢 info['role']，印出 'spy'", vars: {"output": "'spy'"} }
    ]
  },
  {
    id: "mock_81",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "串列表達式三元條件運算式位置",
    difficulty: "basic",
    category: "串列表達式",
    question: "執行下列包含 if-else 條件映射的串列表達式後，clamped 的內容為何？",
    code: `nums = [-2, 3, -5, 4]
clamped = [x if x > 0 else 0 for x in nums]
print(clamped)`,
    options: [
      "A. [0, 3, 0, 4]",
      "B. [3, 4]",
      "C. [-2, 3, -5, 4]",
      "D. [0, 0, 0, 0]"
    ],
    answer: "A",
    explanation: "在串列表達式中，雙向分支 x if x > 0 else 0 必須寫在 for 前方作為元素映射。負數被替換為 0，正數保持原值，產出 [0, 3, 0, 4]。",
    traceSteps: [
      { line: 2, text: "映射：-2->0, 3->3, -5->0, 4->4", vars: {"clamped": "[0, 3, 0, 4]"} },
      { line: 3, text: "印出 [0, 3, 0, 4]", vars: {"output": "[0, 3, 0, 4]"} }
    ]
  },
  {
    id: "mock_82",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "雙層巢狀串列表達式攤平順序",
    difficulty: "advanced",
    category: "巢狀串列表達式",
    question: "執行下列攤平二維串列的巢狀表達式後，flattened 的內容為何？",
    code: `matrix = [[1, 2], [3, 4]]
flattened = [val for row in matrix for val in row]
print(flattened)`,
    options: [
      "A. [1, 2, 3, 4]",
      "B. [1, 3, 2, 4]",
      "C. [[1, 2], [3, 4]]",
      "D. [4, 3, 2, 1]"
    ],
    answer: "A",
    explanation: "巢狀表達式中的 for 順序與傳統巢狀迴圈完全一致（左邊是外層，右邊是內層）。先外層 for row in matrix 取出 [1, 2]，再內層 for val in row 取出 1, 2；接著下一列取出 3, 4，攤平成 [1, 2, 3, 4]。",
    traceSteps: [
      { line: 2, text: "外層 row=[1, 2] -> 取出 1, 2", vars: {"step1": "[1, 2]"} },
      { line: 2, text: "外層 row=[3, 4] -> 取出 3, 4", vars: {"step2": "[3, 4]"} },
      { line: 2, text: "合併為 [1, 2, 3, 4]", vars: {"flattened": "[1, 2, 3, 4]"} },
      { line: 3, text: "印出 [1, 2, 3, 4]", vars: {"output": "[1, 2, 3, 4]"} }
    ]
  },
  {
    id: "mock_83",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "zip 與星號解包進行矩陣轉置",
    difficulty: "advanced",
    category: "zip解包與轉置",
    question: "執行下列利用 zip(*grid) 轉置矩陣的程式碼後，印出的 transposed[1] 為何？",
    code: `grid = [[1, 2, 3], [4, 5, 6]]
transposed = [list(col) for col in zip(*grid)]
print(transposed[1])`,
    options: [
      "A. [2, 5]",
      "B. [4, 5, 6]",
      "C. [1, 4]",
      "D. [3, 6]"
    ],
    answer: "A",
    explanation: "zip(*grid) 等同於 zip([1, 2, 3], [4, 5, 6])，將各列的對應欄打包：第 0 欄為 (1, 4)，第 1 欄為 (2, 5)，第 2 欄為 (3, 6)。轉為串列後，transposed[1] 即為第 1 欄 [2, 5]。",
    traceSteps: [
      { line: 2, text: "*grid 解包兩列傳入 zip，轉置為 (1,4), (2,5), (3,6)", vars: {"transposed": "[[1, 4], [2, 5], [3, 6]]"} },
      { line: 3, text: "印出 transposed[1] 為 [2, 5]", vars: {"output": "[2, 5]"} }
    ]
  },
  {
    id: "mock_84",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "try-except-else-finally 完整控制流",
    difficulty: "advanced",
    category: "例外處理完整架構",
    question: "執行下列沒有拋出例外的 try-except-else-finally 程式碼後，輸出為何？",
    code: `log = []
try:
    x = 10 // 2
except ZeroDivisionError:
    log.append("err")
else:
    log.append("ok")
finally:
    log.append("fin")
print("-".join(log))`,
    options: [
      "A. ok-fin",
      "B. err-fin",
      "C. ok",
      "D. err-ok-fin"
    ],
    answer: "A",
    explanation: "10 // 2 運算正常未拋出例外，跳過 except；因此進入 else 區塊加入 'ok'；最後 finally 區塊無論如何必定執行，加入 'fin'。最終 join 結果為 'ok-fin'。",
    traceSteps: [
      { line: 3, text: "10 // 2 = 5 正常完成，不觸發例外", vars: {"x": 5} },
      { line: 7, text: "無例外進入 else，加入 'ok'", vars: {"log": "['ok']"} },
      { line: 9, text: "進入 finally 必定執行，加入 'fin'", vars: {"log": "['ok', 'fin']"} },
      { line: 10, text: "以 '-' 串接印出 'ok-fin'", vars: {"output": "'ok-fin'"} }
    ]
  },
  {
    id: "mock_85",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "finally 強制執行覆蓋函式回傳值",
    difficulty: "advanced",
    category: "例外處理與finally陷阱",
    question: "執行下列在 finally 區塊中亦有 return 的程式碼，函式傳回值為何？",
    code: `def check():
    try:
        return "TRY"
    finally:
        return "FINALLY"

print(check())`,
    options: [
      "A. TRY",
      "B. FINALLY",
      "C. TRY FINALLY",
      "D. None"
    ],
    answer: "B",
    explanation: "當 try 區塊執行 return 'TRY' 時，傳回值會被暫存，Python 接著強制跳轉執行 finally 區塊。若 finally 區塊自身也執行了 return，會直接覆蓋掉原本的暫存值，因此函式最終回傳 'FINALLY'。",
    traceSteps: [
      { line: 3, text: "try 區塊遇到 return 'TRY'，暫存傳回值並轉往 finally", vars: {"pending_return": "'TRY'"} },
      { line: 5, text: "finally 區塊強制執行 return 'FINALLY'，覆蓋暫存值", vars: {"final_return": "'FINALLY'"} },
      { line: 7, text: "印出 'FINALLY'", vars: {"output": "'FINALLY'"} }
    ]
  },
  {
    id: "mock_86",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "字串 split 篩選數字並轉型加總",
    difficulty: "advanced",
    category: "生成式與字串處理",
    question: "執行下列結合 split、isdigit 與生成式的加總程式碼後，印出的 total 為何？",
    code: `raw = "alpha 10 beta 20 gamma 30"
total = sum(int(item) for item in raw.split() if item.isdigit())
print(total)`,
    options: [
      "A. 60",
      "B. 50",
      "C. 30",
      "D. 0"
    ],
    answer: "A",
    explanation: "raw.split() 切出 ['alpha', '10', 'beta', '20', 'gamma', '30']。條件 item.isdigit() 篩選出純數字字串 '10', '20', '30'，轉型為整數後由 sum() 加總：10 + 20 + 30 = 60。",
    traceSteps: [
      { line: 1, text: "raw 字串包含單字與數字", vars: {"raw": "'alpha 10 beta 20 gamma 30'"} },
      { line: 2, text: "篩選出 isdigit() 為 True 的字元：'10', '20', '30'，轉為整數", vars: {"ints": "[10, 20, 30]"} },
      { line: 2, text: "sum([10, 20, 30]) = 60", vars: {"total": 60} },
      { line: 3, text: "印出 60", vars: {"output": 60} }
    ]
  },
  {
    id: "mock_87",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "except 多重例外型態元組捕捉",
    difficulty: "advanced",
    category: "例外捕捉機制",
    question: "執行下列以元組捕捉多種例外的程式碼後，變數 res 的值為何？",
    code: `res = 0
try:
    items = [10, 20]
    val = items[5]
except (KeyError, IndexError):
    res = 999
except Exception:
    res = -1
print(res)`,
    options: [
      "A. 999",
      "B. -1",
      "C. IndexError",
      "D. 0"
    ],
    answer: "A",
    explanation: "items[5] 存取超出串列長度的索引，直譯器拋出 IndexError。在 except (KeyError, IndexError) 中，Python 支援以元組一次監聽多個例外型態，成功捕捉該 IndexError 並將 res 設為 999。",
    traceSteps: [
      { line: 4, text: "items[5] 越界存取，引發 IndexError", vars: {} },
      { line: 5, text: "except (KeyError, IndexError) 成功捕獲 IndexError", vars: {} },
      { line: 6, text: "res 賦值為 999", vars: {"res": 999} },
      { line: 9, text: "印出 999", vars: {"output": 999} }
    ]
  },
  {
    id: "ch1_b12",
    chapterId: 1,
    dimension: "syntax_io",
    title: "round 函式與浮點數型別",
    difficulty: "basic",
    category: "浮點數運算與四捨五入",
    question: "執行下列 round() 函式程式碼後，印出的型別與數值為何？",
    code: `val = round(3.14159, 2)
print(type(val) == float, val)`,
    options: [
      "A. True 3.14",
      "B. True 3.142",
      "C. False 3.14",
      "D. True 3.1"
    ],
    answer: "A",
    explanation: "round(x, n) 函式將數值 x 四捨五入至小數點後 n 位。round(3.14159, 2) 取小數後兩位得到 3.14；其回傳值仍為 float 浮點數型別，故 type(val) == float 判定為 True。印出 True 3.14。",
    traceSteps: [
      { line: 1, text: "round(3.14159, 2) 計算四捨五入取小數兩位，得 3.14", vars: {"val": 3.14} },
      { line: 2, text: "type(3.14) 為 float，判定為 True，印出 True 3.14", vars: {"output": "True 3.14"} }
    ]
  },
  {
    id: "ch1_b13",
    chapterId: 1,
    dimension: "syntax_io",
    title: "二進制與十六進制常數表示法",
    difficulty: "basic",
    category: "數字進制常數",
    question: "執行下列進制常數程式碼後，印出的十進制結果為何？",
    code: `a = 0b1010
b = 0x1F
print(a, b)`,
    options: [
      "A. 10 15",
      "B. 10 31",
      "C. 1010 31",
      "D. 12 31"
    ],
    answer: "B",
    explanation: "在 Python 中，以 0b 開頭為二進制常數，0b1010 對應十進制 1*8 + 0*4 + 1*2 + 0*1 = 10；以 0x 開頭為十六進制常數，0x1F 對應 1*16 + 15 = 31。print 預設以十進制印出數值，因此輸出 10 31。",
    traceSteps: [
      { line: 1, text: "0b1010 解析為十進制整數 10", vars: {"a": 10} },
      { line: 2, text: "0x1F 解析為十進制整數 31", vars: {"b": 31} },
      { line: 3, text: "印出十進制數值 10 31", vars: {"output": "10 31"} }
    ]
  },
  {
    id: "ch1_b14",
    chapterId: 1,
    dimension: "syntax_io",
    title: "布林值數值運算特性",
    difficulty: "basic",
    category: "布林與整數運算",
    question: "執行下列布林值算術運算程式碼後，輸出的數值為何？",
    code: `res = (True + True) * (False + 3)
print(res)`,
    options: [
      "A. TypeError",
      "B. 3",
      "C. 6",
      "D. 0"
    ],
    answer: "C",
    explanation: "在 Python 中，bool 型別是 int 的子類別（subclass），True 的數值等同於整數 1，False 等同於整數 0。因此 (True + True) 等於 (1 + 1) = 2；(False + 3) 等於 (0 + 3) = 3。相乘為 2 * 3 = 6。",
    traceSteps: [
      { line: 1, text: "True 轉換為數值 1，False 轉換為數值 0", vars: {} },
      { line: 1, text: "計算 (1 + 1) * (0 + 3) = 2 * 3 = 6", vars: {"res": 6} },
      { line: 2, text: "印出計算結果 6", vars: {"output": 6} }
    ]
  },
  {
    id: "ch1_b15",
    chapterId: 1,
    dimension: "syntax_io",
    title: "print 函式之 sep 與 end 組合",
    difficulty: "basic",
    category: "print 格式控制",
    question: "執行下列包含 sep 與 end 參數的 print 程式碼後，印出的結果為何？",
    code: `print("A", "B", sep="->", end="==")
print("C")`,
    options: [
      "A. A->B\n==C",
      "B. A->B==\nC",
      "C. A B==C",
      "D. A->B==C"
    ],
    answer: "D",
    explanation: "第一個 print 輸出引數 'A' 與 'B'，中間由 sep='->' 連接成 'A->B'；因為設定了 end='=='，結尾不會換行，而是輸出 '=='。第二個 print('C') 緊接在後方輸出 'C' 並換行。終端機輸出完整字串為 A->B==C。",
    traceSteps: [
      { line: 1, text: "輸出 'A->B' 並以 '==' 結尾（不換行）", vars: {"buffer": "'A->B=='"} },
      { line: 2, text: "接續輸出 'C' 並換行", vars: {"output": "'A->B==C'"} }
    ]
  },
  {
    id: "ch1_b16",
    chapterId: 1,
    dimension: "syntax_io",
    title: "字串轉型與複合賦值運算",
    difficulty: "basic",
    category: "型別轉換與賦值",
    question: "執行下列字串轉型與複合賦值程式碼後，輸出的內容為何？",
    code: `x = 10
x += int("20")
print(f"Total: {x}")`,
    options: [
      "A. Total: 30",
      "B. Total: 1020",
      "C. TypeError",
      "D. Total: 20"
    ],
    answer: "A",
    explanation: "int('20') 將字串 '20' 轉換為整數 20。接著 x += 20 等同於 x = x + 20，因此 x 變為 30。最後以格式化字串 f-string 印出 'Total: 30'。",
    traceSteps: [
      { line: 1, text: "初始化 x = 10", vars: {"x": 10} },
      { line: 2, text: "int('20') 得 20，x += 20 賦值後 x 變為 30", vars: {"x": 30} },
      { line: 3, text: "印出格式化字串 Total: 30", vars: {"output": "'Total: 30'"} }
    ]
  },
  {
    id: "ch1_a15",
    chapterId: 1,
    dimension: "syntax_io",
    title: "位元 XOR 與位移運算求值",
    difficulty: "advanced",
    category: "位元運算子",
    question: "執行下列位元互斥或（XOR）與左移運算程式碼後，印出的結果為何？",
    code: `x = 5
y = 3
z = (x ^ y) << 1
print(z)`,
    options: [
      "A. 6",
      "B. 12",
      "C. 16",
      "D. 8"
    ],
    answer: "B",
    explanation: "x = 5（二進制 0101），y = 3（二進制 0011）。x ^ y 進行位元互斥或運算：0101 ^ 0011 = 0110（十進制 6）。接著 << 1 進行左移一位運算，相當於乘以 2 的 1 次方，6 * 2 = 12。故印出 12。",
    traceSteps: [
      { line: 1, text: "x = 5 (0b0101), y = 3 (0b0011)", vars: {"x": 5, "y": 3} },
      { line: 3, text: "計算 5 ^ 3 = 6 (0b0110)，接著左移 1 位 6 << 1 = 12", vars: {"z": 12} },
      { line: 4, text: "印出 z 之值 12", vars: {"output": 12} }
    ]
  },
  {
    id: "ch1_a16",
    chapterId: 1,
    dimension: "syntax_io",
    title: "負數地板除法與餘數運算規律",
    difficulty: "advanced",
    category: "算術運算子特性",
    question: "執行下列包含負數的地板除法與取餘數程式碼後，印出的結果為何？",
    code: `q = -17 // 5
r = -17 % 5
print(q, r)`,
    options: [
      "A. -3 2",
      "B. -3 -2",
      "C. -4 3",
      "D. -4 -2"
    ],
    answer: "C",
    explanation: "Python 的地板除法 // 是向下取整（往負無限大方向取整）。-17 / 5 = -3.4，向下取整得到 -4。Python 的除法與餘數恆滿足 x = (x // y) * y + (x % y)，即 -17 = (-4) * 5 + r = -20 + r，解得 r = 3。因此輸出 -4 3。",
    traceSteps: [
      { line: 1, text: "-17 // 5 向下取整得 -4", vars: {"q": -4} },
      { line: 2, text: "-17 % 5 滿足 -17 = -4 * 5 + 3，餘數為 3", vars: {"r": 3} },
      { line: 3, text: "輸出 q 與 r 為 -4 3", vars: {"output": "-4 3"} }
    ]
  },
  {
    id: "ch2_b12",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "strip 去除兩端空白與 upper 轉換",
    difficulty: "basic",
    category: "字串基本方法",
    question: "執行下列字串 strip 與 upper 連鎖呼叫程式碼後，印出的字串為何？",
    code: `text = "  python code  "
result = text.strip().upper()
print(result)`,
    options: [
      "A. PYTHONCODE",
      "B. PYTHON CODE  ",
      "C. python code",
      "D. PYTHON CODE"
    ],
    answer: "D",
    explanation: "text.strip() 移除字串頭尾所有多餘的空白字元，得到中間的 'python code'（單詞間的單個空白保留）；接著呼叫 .upper() 將字母轉為全大寫，得到 'PYTHON CODE'。",
    traceSteps: [
      { line: 1, text: "text = '  python code  '", vars: {"text": "'  python code  '"} },
      { line: 2, text: "strip() 去除前後空格得 'python code'，upper() 轉大寫得 'PYTHON CODE'", vars: {"result": "'PYTHON CODE'"} },
      { line: 3, text: "印出 result 為 PYTHON CODE", vars: {"output": "'PYTHON CODE'"} }
    ]
  },
  {
    id: "ch2_b13",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "find 方法查詢子字串與 in 關鍵字",
    difficulty: "basic",
    category: "字串查詢操作",
    question: "執行下列字串 find 方法與 in 運算子程式碼後，輸出的結果為何？",
    code: `msg = "cyber_agent_007"
idx = msg.find("agent")
print(idx, "agent" in msg)`,
    options: [
      "A. 6 True",
      "B. 7 True",
      "C. 6 False",
      "D. 5 True"
    ],
    answer: "A",
    explanation: "msg.find('agent') 從頭搜尋子字串 'agent' 第一次出現的起始索引。字元 'c'(0), 'y'(1), 'b'(2), 'e'(3), 'r'(4), '_'(5), 'a'(6)，因此索引為 6。'agent' in msg 為成員檢查運算子，回傳 True。輸出 6 True。",
    traceSteps: [
      { line: 1, text: "msg = 'cyber_agent_007'", vars: {"msg": "'cyber_agent_007'"} },
      { line: 2, text: "find('agent') 找到起始索引為 6", vars: {"idx": 6} },
      { line: 3, text: "'agent' 確實在 msg 中，in 運算子回傳 True，印出 6 True", vars: {"output": "6 True"} }
    ]
  },
  {
    id: "ch2_b14",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "字串乘法重複與長度計算",
    difficulty: "basic",
    category: "字串序列運算",
    question: "執行下列字串乘法與 len() 程式碼後，印出的結果為何？",
    code: `pattern = "-=" * 4
print(pattern, len(pattern))`,
    options: [
      "A. -=-=-=-= 4",
      "B. -=-=-=-= 8",
      "C. ----==== 8",
      "D. -=-=-= 6"
    ],
    answer: "B",
    explanation: "字串乘法 '-=' * 4 會將長度為 2 的字串重複串接 4 次，產生 '-=-=-=-='；其總字元長度 len(pattern) 為 2 * 4 = 8。因此輸出 -=-=-=-= 8。",
    traceSteps: [
      { line: 1, text: "'-=' 重複 4 次產生 '-=-=-=-='", vars: {"pattern": "'-=-=-=-='"} },
      { line: 2, text: "len('-=-=-=-=') 為 8，印出 -=-=-=-= 8", vars: {"output": "'-=-=-=-= 8'"} }
    ]
  },
  {
    id: "ch2_b15",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "ord 與 chr 雙向轉換運算",
    difficulty: "basic",
    category: "ASCII 編碼轉換",
    question: "執行下列 ord 與 chr 相互轉換的運算程式碼後，印出的字元為何？",
    code: `ch = chr(ord('a') + 3)
print(ch)`,
    options: [
      "A. e",
      "B. c",
      "C. d",
      "D. 100"
    ],
    answer: "C",
    explanation: "ord('a') 回傳小寫英文字母 'a' 的 ASCII 編碼數值 97。97 + 3 = 100。接著 chr(100) 將 ASCII 碼 100 轉回對應字元，即為 'd'（a:97, b:98, c:99, d:100）。印出 d。",
    traceSteps: [
      { line: 1, text: "ord('a') 為 97，97 + 3 = 100；chr(100) 轉換為字元 'd'", vars: {"ch": "'d'"} },
      { line: 2, text: "印出字元 d", vars: {"output": "'d'"} }
    ]
  },
  {
    id: "ch2_b16",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "count 方法計算非重疊子字串",
    difficulty: "basic",
    category: "字串次數統計",
    question: "執行下列字串 count() 方法程式碼後，印出的出現次數為何？",
    code: `s = "bananana"
print(s.count("ana"))`,
    options: [
      "A. 4",
      "B. 3",
      "C. 1",
      "D. 2"
    ],
    answer: "D",
    explanation: "Python 的 str.count(sub) 計算子字串出現次數時，採用「非重疊（non-overlapping）」原則：在 'bananana' 中，索引 1~3 匹配第一個 'ana'；接著從索引 4 開始繼續尋找，索引 5~7 匹配第二個 'ana'。因此總計出現 2 次。",
    traceSteps: [
      { line: 1, text: "s = 'bananana'", vars: {"s": "'bananana'"} },
      { line: 2, text: "統計非重疊 'ana' 出現次數為 2", vars: {"output": 2} }
    ]
  },
  {
    id: "ch2_a15",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "字串負步長切片與迴文驗證",
    difficulty: "advanced",
    category: "進階切片語法",
    question: "執行下列雙冒號切片與負步長程式碼後，印出的結果為何？",
    code: `word = "radar"
code = "Python3"
print(word == word[::-1], code[6:0:-2])`,
    options: [
      "A. True 3ot",
      "B. True 3o",
      "C. False 3otP",
      "D. True 3no"
    ],
    answer: "A",
    explanation: "1. word[::-1] 步長為 -1，代表反轉字串，'radar' 反轉仍為 'radar'，word == word[::-1] 評估為 True；2. code[6:0:-2] 起點為索引 6（'3'），終點為索引 0（不包含索引 0 的 'P'），步長為 -2：取索引 6（'3'）、4（'o'）、2（'t'），得到 '3ot'。故輸出 True 3ot。",
    traceSteps: [
      { line: 1, text: "word = 'radar', code = 'Python3'", vars: {"word": "'radar'", "code": "'Python3'"} },
      { line: 3, text: "word[::-1] 為 'radar'，相等為 True", vars: {"is_palindrome": true} },
      { line: 3, text: "code[6:0:-2] 取索引 6, 4, 2 得 '3ot'", vars: {"sliced": "'3ot'"} },
      { line: 3, text: "印出 True 3ot", vars: {"output": "True 3ot"} }
    ]
  },
  {
    id: "ch2_a16",
    chapterId: 2,
    dimension: "strings_ascii",
    title: "f-string 欄位寬度與對齊補零格式化",
    difficulty: "advanced",
    category: "字串格式化規範",
    question: "執行下列包含寬度與對齊規範的 f-string 程式碼後，印出的結果為何？",
    code: `num = 42
tag = "OK"
print(f"{num:05d}|{tag:>6s}")`,
    options: [
      "A. 42000|OK    ",
      "B. 00042|    OK",
      "C. 00042|  OK  ",
      "D. 42|OK"
    ],
    answer: "B",
    explanation: "{num:05d} 指定十進制整數最小寬度為 5，不足位數在左側以 '0' 補滿，得到 '00042'；{tag:>6s} 指定字串最小寬度為 6 且向右對齊（>），左側補 4 個空格得到 '    OK'。以管道符號連接後輸出 00042|    OK。",
    traceSteps: [
      { line: 1, text: "num = 42, tag = 'OK'", vars: {"num": 42, "tag": "'OK'"} },
      { line: 3, text: "num:05d 補零得 '00042'；tag:>6s 靠右得 '    OK'", vars: {"formatted": "'00042|    OK'"} },
      { line: 3, text: "輸出 00042|    OK", vars: {"output": "'00042|    OK'"} }
    ]
  },
  {
    id: "ch3_b12",
    chapterId: 3,
    dimension: "containers_memory",
    title: "字典鍵值新增、更新與長度計算",
    difficulty: "basic",
    category: "字典基本操作",
    question: "執行下列字典增改與長度計算程式碼後，印出的結果為何？",
    code: `profile = {"name": "Alice", "role": "Agent"}
profile["role"] = "Leader"
profile["level"] = 5
print(len(profile), profile["role"])`,
    options: [
      "A. 3 Agent",
      "B. 2 Leader",
      "C. 3 Leader",
      "D. 4 Leader"
    ],
    answer: "C",
    explanation: "profile['role'] = 'Leader' 會更新已有鍵 'role' 的值為 'Leader'；profile['level'] = 5 新增一對全新鍵值對。因此字典共有 'name', 'role', 'level' 3 個鍵，len(profile) 為 3。印出 3 Leader。",
    traceSteps: [
      { line: 1, text: "profile 初始化包含 2 個鍵值對", vars: {"len": 2} },
      { line: 2, text: "更新已有鍵 'role' 為 'Leader'", vars: {"role": "'Leader'"} },
      { line: 3, text: "新增鍵 'level' 為 5", vars: {"len": 3} },
      { line: 4, text: "輸出 3 Leader", vars: {"output": "3 Leader"} }
    ]
  },
  {
    id: "ch3_b13",
    chapterId: 3,
    dimension: "containers_memory",
    title: "集合容器去重特性與成員檢驗",
    difficulty: "basic",
    category: "集合基本操作",
    question: "執行下列 set() 集合轉換與成員檢驗程式碼後，印出的結果為何？",
    code: `raw_data = [1, 2, 2, 3, 3, 3, 4]
unique_set = set(raw_data)
print(len(unique_set), 2 in unique_set)`,
    options: [
      "A. 3 True",
      "B. 7 True",
      "C. 4 False",
      "D. 4 True"
    ],
    answer: "D",
    explanation: "set() 會自動剔除所有重複元素。清單 [1, 2, 2, 3, 3, 3, 4] 轉換為集合後為 {1, 2, 3, 4}，共有 4 個相異元素，故 len 為 4；數值 2 確實存在於集合中，2 in unique_set 為 True。輸出 4 True。",
    traceSteps: [
      { line: 1, text: "raw_data 包含重複數字 1, 2, 3, 4", vars: {"len": 7} },
      { line: 2, text: "set() 剔除重複值，得 {1, 2, 3, 4}", vars: {"unique_set": "{1, 2, 3, 4}"} },
      { line: 3, text: "長度為 4 且 2 in set 為 True，輸出 4 True", vars: {"output": "4 True"} }
    ]
  },
  {
    id: "ch3_b14",
    chapterId: 3,
    dimension: "containers_memory",
    title: "單元素元組逗號不可或缺性",
    difficulty: "basic",
    category: "元組語法規範",
    question: "執行下列判定元組型別的程式碼後，印出的結果為何？",
    code: `t1 = (42)
t2 = (42,)
print(type(t1) == tuple, type(t2) == tuple)`,
    options: [
      "A. False True",
      "B. True True",
      "C. False False",
      "D. True False"
    ],
    answer: "A",
    explanation: "在 Python 中，僅使用小括號 (42) 會被視為一般數學運算的括號，其型別依舊是整數 int；只有在括號內加上逗號 (42,)，Python 直譯器才會將其識別為「單元素元組（tuple）」。因此 type(t1) == tuple 為 False，type(t2) == tuple 為 True。印出 False True。",
    traceSteps: [
      { line: 1, text: "t1 = (42) 為整數 42，type(t1) 為 int", vars: {"type_t1": "<class 'int'>"} },
      { line: 2, text: "t2 = (42,) 包含逗號，type(t2) 為 tuple", vars: {"type_t2": "<class 'tuple'>"} },
      { line: 3, text: "印出 False True", vars: {"output": "False True"} }
    ]
  },
  {
    id: "ch3_b15",
    chapterId: 3,
    dimension: "containers_memory",
    title: "串列 append 與 extend 行為差異",
    difficulty: "basic",
    category: "串列方法比較",
    question: "執行下列比較 append 與 extend 的程式碼後，印出的長度為何？",
    code: `a = [1, 2]
a.append([3, 4])
b = [1, 2]
b.extend([3, 4])
print(len(a), len(b))`,
    options: [
      "A. 4 4",
      "B. 3 4",
      "C. 3 3",
      "D. 4 3"
    ],
    answer: "B",
    explanation: "a.append([3, 4]) 將整個串列 [3, 4] 作為單一元素加入尾端，a 變成 [1, 2, [3, 4]]，長度為 3；b.extend([3, 4]) 則是將傳入的引數逐一拆解後追加加入，b 變成 [1, 2, 3, 4]，長度為 4。因此印出 3 4。",
    traceSteps: [
      { line: 2, text: "append([3, 4]) 加入單一子串列，a 變為 [1, 2, [3, 4]]", vars: {"len_a": 3} },
      { line: 4, text: "extend([3, 4]) 展開串列追加元素，b 變為 [1, 2, 3, 4]", vars: {"len_b": 4} },
      { line: 5, text: "印出 3 4", vars: {"output": "3 4"} }
    ]
  },
  {
    id: "ch3_b16",
    chapterId: 3,
    dimension: "containers_memory",
    title: "串列 index 方法定位元素索引",
    difficulty: "basic",
    category: "串列搜尋操作",
    question: "執行下列串列 index() 搜尋方法程式碼後，印出的索引值為何？",
    code: `colors = ["red", "green", "blue", "green"]
print(colors.index("green"))`,
    options: [
      "A. [1, 3]",
      "B. 3",
      "C. 1",
      "D. 2"
    ],
    answer: "C",
    explanation: "list.index(x) 會從頭開始搜尋元素 x，並回傳「第一個」符合條件元素的索引值。在 colors 中，索引 1 處即為第一個 'green'，因此直接回傳 1（後方的索引 3 不會回傳）。印出 1。",
    traceSteps: [
      { line: 1, text: "colors = ['red', 'green', 'blue', 'green']", vars: {"colors": "['red', 'green', 'blue', 'green']"} },
      { line: 2, text: "index('green') 找到首個匹配索引為 1", vars: {"output": 1} }
    ]
  },
  {
    id: "ch3_a15",
    chapterId: 3,
    dimension: "containers_memory",
    title: "copy.copy 淺拷貝與內部物件參照共享",
    difficulty: "advanced",
    category: "物件記憶體與拷貝",
    question: "執行下列淺拷貝（shallow copy）程式碼後，印出的結果為何？",
    code: `import copy
orig = [[1, 2], [3, 4]]
clone = copy.copy(orig)
clone[0].append(99)
clone.append([5, 6])
print(len(orig), orig[0])`,
    options: [
      "A. 3 [1, 2]",
      "B. 3 [1, 2, 99]",
      "C. 2 [1, 2]",
      "D. 2 [1, 2, 99]"
    ],
    answer: "D",
    explanation: "copy.copy 進行淺拷貝：外層串列複製了一個全新容器，因此 clone.append([5, 6]) 只增加 clone 的長度，不影響 orig，len(orig) 仍為 2；然而內層的子串列 [1, 2] 依然指向同一個記憶體位址！因此 clone[0].append(99) 會直接修改到 orig[0]，使其變成 [1, 2, 99]。印出 2 [1, 2, 99]。",
    traceSteps: [
      { line: 3, text: "淺拷貝建立新外層串列，但內層子串列參照同一記憶體", vars: {} },
      { line: 4, text: "clone[0].append(99) 同步修改共享的子串列", vars: {"orig[0]": "[1, 2, 99]"} },
      { line: 5, text: "clone.append([5, 6]) 僅擴增 clone 外層，orig 長度維持 2", vars: {"len(orig)": 2} },
      { line: 6, text: "印出 2 [1, 2, 99]", vars: {"output": "2 [1, 2, 99]"} }
    ]
  },
  {
    id: "ch3_a16",
    chapterId: 3,
    dimension: "containers_memory",
    title: "集合交集與差集運算求值",
    difficulty: "advanced",
    category: "集合運算子",
    question: "執行下列集合交集（&）與差集（-）程式碼後，印出的結果為何？",
    code: `s1 = {1, 2, 3, 4}
s2 = {3, 4, 5, 6}
inter = s1 & s2
diff = s1 - s2
print(sorted(list(inter)), sorted(list(diff)))`,
    options: [
      "A. [3, 4] [1, 2]",
      "B. [3, 4] [5, 6]",
      "C. [1, 2, 3, 4] [1, 2]",
      "D. [3, 4] [1, 2, 5, 6]"
    ],
    answer: "A",
    explanation: "1. s1 & s2 是交集運算（同時存在於兩集合者），得到 {3, 4}；2. s1 - s2 是差集運算（在 s1 中但不在 s2 中者），{1, 2, 3, 4} 扣除 3 與 4 後剩餘 {1, 2}。排序後輸出 [3, 4] [1, 2]。",
    traceSteps: [
      { line: 3, text: "s1 & s2 取兩者交集得 {3, 4}", vars: {"inter": "{3, 4}"} },
      { line: 4, text: "s1 - s2 取差集得 {1, 2}", vars: {"diff": "{1, 2}"} },
      { line: 5, text: "轉串列並排序後印出 [3, 4] [1, 2]", vars: {"output": "[3, 4] [1, 2]"} }
    ]
  },
  {
    id: "ch4_b12",
    chapterId: 4,
    dimension: "control_flow",
    title: "while 迴圈累加與終止條件狀態",
    difficulty: "basic",
    category: "while 迴圈基礎",
    question: "執行下列 while 迴圈累加程式碼後，印出的 total 與 n 為何？",
    code: `n = 1
total = 0
while n <= 4:
    total += n
    n += 1
print(total, n)`,
    options: [
      "A. 10 4",
      "B. 10 5",
      "C. 6 4",
      "D. 15 5"
    ],
    answer: "B",
    explanation: "迴圈執行 4 次：n 依序為 1, 2, 3, 4，total 累加 1 + 2 + 3 + 4 = 10。在第 4 次迴圈尾端執行 n += 1 後 n 變為 5；接著檢查 while n <= 4 條件不成立跳出迴圈。因此印出 10 5。",
    traceSteps: [
      { line: 4, text: "迴圈依序累加 1, 2, 3, 4 至 total 得 10", vars: {"total": 10} },
      { line: 5, text: "最後一次執行 n += 1 使 n 遞增為 5，跳出迴圈", vars: {"n": 5} },
      { line: 6, text: "輸出 10 5", vars: {"output": "10 5"} }
    ]
  },
  {
    id: "ch4_b13",
    chapterId: 4,
    dimension: "control_flow",
    title: "Python 假值 (Falsy values) 隱式布林求值",
    difficulty: "basic",
    category: "條件式真假值規則",
    question: "執行下列常見物件的 bool 判定程式碼後，印出的 truthy 數量為何？",
    code: `items = [0, "", [], {}, None, False]
truthy_count = sum(bool(x) for x in items)
print(truthy_count)`,
    options: [
      "A. 2",
      "B. 1",
      "C. 0",
      "D. 6"
    ],
    answer: "C",
    explanation: "在 Python 中，數值 0、空字串 ''、空串列 []、空字典 {}、None 以及 False 在布林環境中皆被視為 False（Falsy 值）。因此 items 中的所有元素 bool(x) 皆為 False（即 0），加總 sum 為 0。印出 0。",
    traceSteps: [
      { line: 1, text: "items 包含 0, '', [], {}, None, False", vars: {} },
      { line: 2, text: "所有元素之 bool 值皆為 False (0)，sum 結果為 0", vars: {"truthy_count": 0} },
      { line: 3, text: "印出 0", vars: {"output": 0} }
    ]
  },
  {
    id: "ch4_b14",
    chapterId: 4,
    dimension: "control_flow",
    title: "if-elif 多分支順序與先滿足特性",
    difficulty: "basic",
    category: "條件分支結構",
    question: "執行下列 if-elif 多分支評估程式碼後，印出的評級為何？",
    code: `score = 85
grade = "F"
if score >= 70:
    grade = "C"
elif score >= 80:
    grade = "B"
elif score >= 90:
    grade = "A"
print(grade)`,
    options: [
      "A. F",
      "B. B",
      "C. A",
      "D. C"
    ],
    answer: "D",
    explanation: "在 if-elif-else 結構中，直譯器由上而下循序評估，只要「第一個條件成立」就會執行其區塊並立即跳出整組分支！因為 score = 85 >= 70 已經成立，因此 grade 被設定為 'C'，後續的 elif score >= 80 永遠不會被執行。印出 C。",
    traceSteps: [
      { line: 3, text: "評估 score >= 70 成立 (85 >= 70 為 True)", vars: {} },
      { line: 4, text: "執行 grade = 'C' 並跳出所有後續 elif 分支", vars: {"grade": "'C'"} },
      { line: 9, text: "印出 grade 為 C", vars: {"output": "'C'"} }
    ]
  },
  {
    id: "ch4_b15",
    chapterId: 4,
    dimension: "control_flow",
    title: "range 步長與空區間邊界有效性",
    difficulty: "basic",
    category: "range 函式特性",
    question: "執行下列兩個 range 轉換為串列的程式碼後，輸出的內容為何？",
    code: `nums1 = list(range(5, 5))
nums2 = list(range(5, 2, -1))
print(nums1, nums2)`,
    options: [
      "A. [] [5, 4, 3]",
      "B. [5] [5, 4, 3, 2]",
      "C. [] [5, 4, 3, 2]",
      "D. [5] [5, 4, 3]"
    ],
    answer: "A",
    explanation: "1. range(5, 5) 起始值與終止值相同（左閉右開 [5, 5)），不產生任何元素，轉為串列為空串列 []；2. range(5, 2, -1) 步長為 -1，從 5 遞減至 2（不包含終止點 2），依序產生 5, 4, 3。因此印出 [] [5, 4, 3]。",
    traceSteps: [
      { line: 1, text: "range(5, 5) 起終相同，產生空串列 []", vars: {"nums1": "[]"} },
      { line: 2, text: "range(5, 2, -1) 遞減產生 [5, 4, 3]", vars: {"nums2": "[5, 4, 3]"} },
      { line: 3, text: "輸出 [] [5, 4, 3]", vars: {"output": "[] [5, 4, 3]"} }
    ]
  },
  {
    id: "ch4_b16",
    chapterId: 4,
    dimension: "control_flow",
    title: "pass 佔位語句與 continue 關鍵字區別",
    difficulty: "basic",
    category: "迴圈控制關鍵字",
    question: "執行下列在迴圈中使用 pass 的程式碼後，串列 res 的內容為何？",
    code: `res = []
for x in range(3):
    if x == 1:
        pass
    res.append(x)
print(res)`,
    options: [
      "A. [0, 2]",
      "B. [0, 1, 2]",
      "C. [0]",
      "D. [1, 2]"
    ],
    answer: "B",
    explanation: "pass 是 Python 中的空操作佔位語句（no-op），不會改變任何執行流程或跳過迴圈（那是 continue 的功能）。當 x == 1 時執行 pass 什麼都不做，接著依舊會執行下一行的 res.append(x)。因此 0, 1, 2 全部被加入，輸出 [0, 1, 2]。",
    traceSteps: [
      { line: 2, text: "迴圈 x 依序為 0, 1, 2", vars: {} },
      { line: 4, text: "當 x == 1 執行 pass，程式繼續向下執行 append", vars: {} },
      { line: 5, text: "res 依序加入 0, 1, 2", vars: {"res": "[0, 1, 2]"} },
      { line: 6, text: "輸出 [0, 1, 2]", vars: {"output": "[0, 1, 2]"} }
    ]
  },
  {
    id: "ch4_a14",
    chapterId: 4,
    dimension: "control_flow",
    title: "for-else 迴圈結構與正常結束機制",
    difficulty: "advanced",
    category: "for-else 語法",
    question: "執行下列包含 for-else 結構的程式碼後，印出的 found 變數為何？",
    code: `found = False
for n in [3, 5, 7, 9]:
    if n % 2 == 0:
        found = True
        break
else:
    found = "ALL_ODD"
print(found)`,
    options: [
      "A. True",
      "B. False",
      "C. ALL_ODD",
      "D. None"
    ],
    answer: "C",
    explanation: "在 Python 中，for 迴圈可以搭配 else 區塊。其觸發條件為：當迴圈「完整巡訪完畢且未被 break 中斷」時，會執行 else 區塊。因為串列全為奇數，if n % 2 == 0 從未成立，break 從未執行，故迴圈結束後執行 else 將 found 設為 'ALL_ODD'。印出 ALL_ODD。",
    traceSteps: [
      { line: 2, text: "遍歷 [3, 5, 7, 9]，所有元素皆不滿足偶數條件", vars: {} },
      { line: 6, text: "迴圈未遇 break 正常結束，觸發 else 區塊", vars: {"found": "'ALL_ODD'"} },
      { line: 8, text: "印出 ALL_ODD", vars: {"output": "'ALL_ODD'"} }
    ]
  },
  {
    id: "ch4_a15",
    chapterId: 4,
    dimension: "control_flow",
    title: "while-else 遇 break 中斷時 else 的略過",
    difficulty: "advanced",
    category: "while-else 語法",
    question: "執行下列 while-else 迴圈程式碼後，印出的 val 數值為何？",
    code: `val = 10
while val > 0:
    val -= 3
    if val == 4:
        break
else:
    val = -99
print(val)`,
    options: [
      "A. 0",
      "B. -99",
      "C. 1",
      "D. 4"
    ],
    answer: "D",
    explanation: "val 初始為 10；第一次迴圈 val -= 3 變為 7；第二次迴圈 val -= 3 變為 4，滿足 if val == 4 條件觸發 break 中斷迴圈。因為迴圈是被 break 終止的，直譯器會完全略過 else 區塊，因此 val 保持為 4。印出 4。",
    traceSteps: [
      { line: 3, text: "第一次迴圈：val 變為 7；第二次迴圈：val 變為 4", vars: {"val": 4} },
      { line: 5, text: "命中 val == 4 觸發 break 離開迴圈", vars: {} },
      { line: 6, text: "因 break 中斷，else 區塊被略過不執行", vars: {} },
      { line: 8, text: "印出 val 為 4", vars: {"output": 4} }
    ]
  },
  {
    id: "ch4_a16",
    chapterId: 4,
    dimension: "control_flow",
    title: "短路求值中 or 與 and 回傳運算元本體",
    difficulty: "advanced",
    category: "邏輯短路與運算子",
    question: "執行下列包含 or 與 and 的非布林短路程式碼後，印出的結果為何？",
    code: `a = [] or "default"
b = [1, 2] and "success"
print(a, b)`,
    options: [
      "A. default success",
      "B. True True",
      "C. [] success",
      "D. default [1, 2]"
    ],
    answer: "A",
    explanation: "Python 的 or 與 and 運算子不會將結果強制轉為布林值，而是回傳「決定該運算式結果的運算元本身」：1. [] 為 False，or 運算子繼續求值並回傳右邊的 'default'；2. [1, 2] 為 True，and 運算子需取決於右側運算元，故回傳 'success'。輸出 default success。",
    traceSteps: [
      { line: 1, text: "[] 為假，or 運算子短路評估右邊運算元，回傳 'default'", vars: {"a": "'default'"} },
      { line: 2, text: "[1, 2] 為真，and 運算子結果取決於右側，回傳 'success'", vars: {"b": "'success'"} },
      { line: 3, text: "印出 default success", vars: {"output": "'default success'"} }
    ]
  },
  {
    id: "ch5_b12",
    chapterId: 5,
    dimension: "functions_scope",
    title: "位置引數與關鍵字引數混合傳遞",
    difficulty: "basic",
    category: "函式引數傳遞",
    question: "執行下列包含預設參數與關鍵字引數的程式碼後，印出的字串為何？",
    code: `def greet(greeting, name="Agent", punct="!"):
    return f"{greeting}, {name}{punct}"

print(greet("Hello", punct="."))`,
    options: [
      "A. Hello, Agent!",
      "B. Hello, Agent.",
      "C. Hello, punct=.",
      "D. TypeError"
    ],
    answer: "B",
    explanation: "呼叫 greet('Hello', punct='.') 時，'Hello' 作為第一個位置引數傳給 greeting；name 未指定故採用預設值 'Agent'；punct='.' 以關鍵字引數傳遞，覆寫原本的預設值 '!'。組合為 'Hello, Agent.' 並印出。",
    traceSteps: [
      { line: 4, text: "呼叫 greet: greeting='Hello', name='Agent'(預設), punct='.'", vars: {} },
      { line: 2, text: "格式化組合回傳 'Hello, Agent.'", vars: {"return": "'Hello, Agent.'"} },
      { line: 4, text: "印出 Hello, Agent.", vars: {"output": "'Hello, Agent.'"} }
    ]
  },
  {
    id: "ch5_b13",
    chapterId: 5,
    dimension: "functions_scope",
    title: "函式多重回傳值與元組自動打包拆包",
    difficulty: "basic",
    category: "函式回傳值機制",
    question: "執行下列回傳多個值的函式程式碼後，印出的 low 與 high 為何？",
    code: `def stats(nums):
    return min(nums), max(nums)

low, high = stats([12, 5, 27, 8])
print(low, high)`,
    options: [
      "A. (5, 27)",
      "B. 12 8",
      "C. 5 27",
      "D. 27 5"
    ],
    answer: "C",
    explanation: "在 Python 中，return 後以逗號分隔多個運算式會自動打包為元組 tuple：stats 回傳 (5, 27)。接收呼叫時，low, high = stats(...) 進行序列解包（unpacking），將 5 指派給 low，27 指派給 high。印出 5 27。",
    traceSteps: [
      { line: 2, text: "計算 min 得 5，max 得 27，打包回傳 (5, 27)", vars: {} },
      { line: 4, text: "解包指派 low = 5, high = 27", vars: {"low": 5, "high": 27} },
      { line: 5, text: "印出 5 27", vars: {"output": "5 27"} }
    ]
  },
  {
    id: "ch5_b14",
    chapterId: 5,
    dimension: "functions_scope",
    title: "區域變數賦值對同名全域變數之獨立性",
    difficulty: "basic",
    category: "作用域遮蔽 (Shadowing)",
    question: "執行下列展示變數作用域的程式碼後，印出的數值為何？",
    code: `x = 100

def modify():
    x = 200
    return x

res = modify()
print(x, res)`,
    options: [
      "A. UnboundLocalError",
      "B. 200 200",
      "C. 100 100",
      "D. 100 200"
    ],
    answer: "D",
    explanation: "函式 modify 內部直接賦值 x = 200，在未宣告 global 的情況下，Python 會在函式的區域作用域建立一個全新的區域變數 x。函式回傳 200，而外部的全域變數 x 完全不受影響仍為 100。因此輸出 100 200。",
    traceSteps: [
      { line: 1, text: "定義全域變數 x = 100", vars: {"x_global": 100} },
      { line: 4, text: "函式內部建立區域變數 x = 200 並回傳", vars: {"x_local": 200} },
      { line: 8, text: "印出全域 x(100) 與 res(200)", vars: {"output": "100 200"} }
    ]
  },
  {
    id: "ch5_b15",
    chapterId: 5,
    dimension: "functions_scope",
    title: "lambda 匿名函式與預設參數求值",
    difficulty: "basic",
    category: "lambda 表示式",
    question: "執行下列包含預設引數的 lambda 程式碼後，印出的結果為何？",
    code: `multiply = lambda a, b=2: a * b
print(multiply(7), multiply(7, 3))`,
    options: [
      "A. 14 21",
      "B. 14 14",
      "C. 7 21",
      "D. TypeError"
    ],
    answer: "A",
    explanation: "lambda 函式支援預設引數：multiply(7) 未傳入第二個引數，因此使用預設值 b=2，計算 7 * 2 = 14；multiply(7, 3) 顯式傳入引數 b=3，計算 7 * 3 = 21。故印出 14 21。",
    traceSteps: [
      { line: 1, text: "定義 lambda 函式，預設 b = 2", vars: {} },
      { line: 2, text: "multiply(7) 計算 7 * 2 = 14；multiply(7, 3) 計算 7 * 3 = 21", vars: {} },
      { line: 2, text: "輸出 14 21", vars: {"output": "14 21"} }
    ]
  },
  {
    id: "ch5_b16",
    chapterId: 5,
    dimension: "functions_scope",
    title: "可變長度位置引數 *args 打包機制",
    difficulty: "basic",
    category: "*args 語法特性",
    question: "執行下列 *args 函式程式碼後，印出的型別判定與總和為何？",
    code: `def sum_all(*args):
    return type(args) == tuple, sum(args)

is_tup, total = sum_all(10, 20, 30)
print(is_tup, total)`,
    options: [
      "A. False 60",
      "B. True 60",
      "C. True 30",
      "D. TypeError"
    ],
    answer: "B",
    explanation: "函式參數使用 *args 語法時，Python 會將傳入的所有多餘位置引數自動打包為一個「元組（tuple）」。呼叫 sum_all(10, 20, 30) 時 args 為 (10, 20, 30)，因此 type(args) == tuple 為 True，sum(args) 加總為 60。輸出 True 60。",
    traceSteps: [
      { line: 4, text: "傳入 (10, 20, 30)，打包為 tuple", vars: {"args": "(10, 20, 30)"} },
      { line: 2, text: "判定 type(args) 為 tuple (True)，sum 為 60", vars: {"is_tup": true, "total": 60} },
      { line: 5, text: "輸出 True 60", vars: {"output": "True 60"} }
    ]
  },
  {
    id: "ch5_a15",
    chapterId: 5,
    dimension: "functions_scope",
    title: "可變長度關鍵字引數 **kwargs 字典打包",
    difficulty: "advanced",
    category: "**kwargs 語法特性",
    question: "執行下列 **kwargs 打包與 get 預設值取值的程式碼後，印出的結果為何？",
    code: `def build_profile(user_id, **kwargs):
    role = kwargs.get("role", "guest")
    active = kwargs.get("active", False)
    return f"{user_id}:{role}:{active}"

print(build_profile(99, role="admin", level=3))`,
    options: [
      "A. 99:admin:True",
      "B. 99:guest:False",
      "C. 99:admin:False",
      "D. TypeError"
    ],
    answer: "C",
    explanation: "**kwargs 會將傳入的所有額外關鍵字引數打包成 dict：{'role': 'admin', 'level': 3}。kwargs.get('role', 'guest') 找到已有鍵 'role' 其值為 'admin'；kwargs.get('active', False) 在字典中找不到 'active'，故回傳預設值 False。組合輸出 99:admin:False。",
    traceSteps: [
      { line: 6, text: "呼叫 build_profile(99, role='admin', level=3)", vars: {} },
      { line: 1, text: "kwargs 打包為 {'role': 'admin', 'level': 3}", vars: {"kwargs": "{'role': 'admin', 'level': 3}"} },
      { line: 2, text: "role 取出 'admin'，active 取預設值 False", vars: {"role": "'admin'", "active": false} },
      { line: 6, text: "輸出 99:admin:False", vars: {"output": "'99:admin:False'"} }
    ]
  },
  {
    id: "ch5_a16",
    chapterId: 5,
    dimension: "functions_scope",
    title: "global 關鍵字宣告修改全域變數狀態",
    difficulty: "advanced",
    category: "global 作用域修改",
    question: "執行下列宣告 global 關鍵字的累加程式碼後，印出的全域變數 count 為何？",
    code: `count = 0

def increment(step):
    global count
    count += step

increment(5)
increment(10)
print(count)`,
    options: [
      "A. UnboundLocalError",
      "B. 0",
      "C. 10",
      "D. 15"
    ],
    answer: "D",
    explanation: "在函式內部加入 global count 宣告，明確指示直譯器：此函式中對 count 的所有讀寫皆針對全域變數進行，而非建立區域變數。第一次呼叫 increment(5) 使全域 count 變為 5；第二次 increment(10) 使其變為 15。印出 15。",
    traceSteps: [
      { line: 1, text: "初始化全域 count = 0", vars: {"count": 0} },
      { line: 7, text: "第一次呼叫 increment(5)，修改全域 count 為 5", vars: {"count": 5} },
      { line: 8, text: "第二次呼叫 increment(10)，修改全域 count 為 15", vars: {"count": 15} },
      { line: 9, text: "印出全域 count 之值 15", vars: {"output": 15} }
    ]
  },
  {
    id: "ch6_b12",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "串列生成式帶 if 條件篩選求值",
    difficulty: "basic",
    category: "串列生成式",
    question: "執行下列包含條件篩選的串列生成式程式碼後，印出的串列為何？",
    code: `evens = [x * 2 for x in range(5) if x % 2 == 0]
print(evens)`,
    options: [
      "A. [0, 4, 8]",
      "B. [0, 2, 4, 6, 8]",
      "C. [4, 8]",
      "D. [0, 2, 4]"
    ],
    answer: "A",
    explanation: "range(5) 依序產生 0, 1, 2, 3, 4；if x % 2 == 0 篩選出偶數：0, 2, 4；最左邊的表示式 x * 2 對其進行計算：0*2=0, 2*2=4, 4*2=8。因此產生的串列為 [0, 4, 8]。",
    traceSteps: [
      { line: 1, text: "range(5) 篩選偶數 x = 0, 2, 4", vars: {"filtered": [0, 2, 4]} },
      { line: 1, text: "計算 x * 2 得 [0, 4, 8]", vars: {"evens": "[0, 4, 8]"} },
      { line: 2, text: "輸出 [0, 4, 8]", vars: {"output": "[0, 4, 8]"} }
    ]
  },
  {
    id: "ch6_b13",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "字典生成式配對鍵與字串長度",
    difficulty: "basic",
    category: "字典生成式",
    question: "執行下列字典生成式程式碼後，印出的結果為何？",
    code: `words = ["py", "exam", "ai"]
length_map = {w: len(w) for w in words}
print(length_map["exam"], len(length_map))`,
    options: [
      "A. 4 2",
      "B. 4 3",
      "C. 2 3",
      "D. KeyError"
    ],
    answer: "B",
    explanation: "{w: len(w) for w in words} 為字典生成式，以單字為鍵、長度為值建立字典：{'py': 2, 'exam': 4, 'ai': 2}。length_map['exam'] 的值為 4；字典總共有 3 個鍵，len(length_map) 為 3。因此印出 4 3。",
    traceSteps: [
      { line: 2, text: "生成字典 {'py': 2, 'exam': 4, 'ai': 2}", vars: {"length_map": "{'py': 2, 'exam': 4, 'ai': 2}"} },
      { line: 3, text: "length_map['exam'] 為 4，長度為 3", vars: {"output": "4 3"} }
    ]
  },
  {
    id: "ch6_b14",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "any 與 all 內建函式布林判定",
    difficulty: "basic",
    category: "內建輔助函式",
    question: "執行下列包含 any 與 all 的布林判定程式碼後，印出的結果為何？",
    code: `vals = [True, True, False]
print(any(vals), all(vals))`,
    options: [
      "A. False False",
      "B. True True",
      "C. True False",
      "D. False True"
    ],
    answer: "C",
    explanation: "any(iterable) 只要迭代物件中存在「至少一個」True 即回傳 True，此處前兩項為 True，故 any 回傳 True；all(iterable) 要求「全部元素皆為 True」才回傳 True，因最後一項為 False，故 all 回傳 False。輸出 True False。",
    traceSteps: [
      { line: 1, text: "vals = [True, True, False]", vars: {"vals": "[True, True, False]"} },
      { line: 2, text: "any 判定有真得 True，all 判定非全真得 False", vars: {"output": "True False"} }
    ]
  },
  {
    id: "ch6_b15",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "集合生成式自動去重運算",
    difficulty: "basic",
    category: "集合生成式",
    question: "執行下列集合生成式平方運算程式碼後，印出的排序串列為何？",
    code: `nums = [-2, -1, 1, 2]
squared_set = {x ** 2 for x in nums}
print(sorted(list(squared_set)))`,
    options: [
      "A. [0, 1, 4]",
      "B. [4, 1, 1, 4]",
      "C. [1, 2, 4]",
      "D. [1, 4]"
    ],
    answer: "D",
    explanation: "集合生成式使用花括號 {x ** 2 for x in nums}：依序計算 (-2)^2=4, (-1)^2=1, 1^2=1, 2^2=4。由於集合具有「元素唯一性」，重複的 1 與 4 會被自動去重，產生的集合為 {1, 4}。排序後輸出 [1, 4]。",
    traceSteps: [
      { line: 2, text: "計算平方得 4, 1, 1, 4；集合去重後為 {1, 4}", vars: {"squared_set": "{1, 4}"} },
      { line: 3, text: "轉串列並排序輸出 [1, 4]", vars: {"output": "[1, 4]"} }
    ]
  },
  {
    id: "ch6_b16",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "map 批次轉型與 sum 聚合計算",
    difficulty: "basic",
    category: "map 迭代器處理",
    question: "執行下列使用 map 將字串轉為整數並加總的程式碼後，印出的總和為何？",
    code: `raw_nums = ["10", "20", "30"]
int_nums = list(map(int, raw_nums))
print(sum(int_nums))`,
    options: [
      "A. 60",
      "B. 102030",
      "C. [10, 20, 30]",
      "D. 50"
    ],
    answer: "A",
    explanation: "map(int, raw_nums) 會將 int 轉型函式依序套用至 raw_nums 的每一個元素，回傳一個 map 迭代器。透過 list() 將其具現化為整數串列 [10, 20, 30]，接著 sum() 加總 10 + 20 + 30 = 60。輸出 60。",
    traceSteps: [
      { line: 2, text: "map(int, ...) 將字串串列轉換為整數串列 [10, 20, 30]", vars: {"int_nums": "[10, 20, 30]"} },
      { line: 3, text: "sum([10, 20, 30]) 計算總和 60", vars: {"output": 60} }
    ]
  },
  {
    id: "ch6_a13",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "雙重 for 迴圈串列生成式扁平化",
    difficulty: "advanced",
    category: "巢狀解析式語序",
    question: "執行下列將二維矩陣扁平化的串列生成式程式碼後，印出的串列為何？",
    code: `matrix = [[1, 2], [3, 4]]
flat = [item for row in matrix for item in row]
print(flat)`,
    options: [
      "A. [[1, 2], [3, 4]]",
      "B. [1, 2, 3, 4]",
      "C. [1, 3, 2, 4]",
      "D. [4, 3, 2, 1]"
    ],
    answer: "B",
    explanation: "在多重 for 串列生成式中，for 子句的順序與傳統巢狀迴圈完全一致（從左到右等於外層到內層）：先外層 for row in matrix 取出 [1, 2]，再內層 for item in row 取出 1, 2；接著取出 [3, 4] 之 3, 4。扁平化後輸出 [1, 2, 3, 4]。",
    traceSteps: [
      { line: 2, text: "外層取出 row=[1, 2]，內層取出 1, 2 加入串列", vars: {} },
      { line: 2, text: "外層取出 row=[3, 4]，內層取出 3, 4 加入串列", vars: {"flat": "[1, 2, 3, 4]"} },
      { line: 3, text: "印出 [1, 2, 3, 4]", vars: {"output": "[1, 2, 3, 4]"} }
    ]
  },
  {
    id: "ch6_a14",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "filter 搭配 lambda 進行及格篩選",
    difficulty: "advanced",
    category: "filter 高階函式",
    question: "執行下列 filter 與 lambda 結合篩選的程式碼後，印出的結果為何？",
    code: `scores = [45, 88, 60, 92, 59]
passed = list(filter(lambda s: s >= 60, scores))
print(len(passed), passed)`,
    options: [
      "A. 3 [45, 59, 60]",
      "B. 2 [88, 92]",
      "C. 3 [88, 60, 92]",
      "D. 5 [45, 88, 60, 92, 59]"
    ],
    answer: "C",
    explanation: "filter(func, iterable) 只保留使 func 回傳 True 的元素。lambda s: s >= 60 判定大於等於 60 分為及格，在 scores 中符合條件的有 88, 60, 92（共 3 個）。經 list() 轉換為串列 [88, 60, 92]，len 為 3。輸出 3 [88, 60, 92]。",
    traceSteps: [
      { line: 2, text: "filter 篩選 s >= 60 之元素：88, 60, 92", vars: {"passed": "[88, 60, 92]"} },
      { line: 3, text: "len 為 3，印出 3 [88, 60, 92]", vars: {"output": "3 [88, 60, 92]"} }
    ]
  },
  {
    id: "ch6_a15",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "sorted 多重鍵 (Multi-key) 元組自訂排序",
    difficulty: "advanced",
    category: "進階排序機制",
    question: "執行下列依分數降冪、同分依名稱升冪的多鍵排序程式碼後，印出排名前兩位的特務為何？",
    code: `agents = [("B", 80), ("A", 90), ("B", 90)]
sorted_agents = sorted(agents, key=lambda a: (-a[1], a[0]))
print(sorted_agents[0], sorted_agents[1])`,
    options: [
      "A. ('A', 90) ('B', 80)",
      "B. ('B', 90) ('A', 90)",
      "C. ('B', 80) ('A', 90)",
      "D. ('A', 90) ('B', 90)"
    ],
    answer: "D",
    explanation: "key 函式回傳元組 (-a[1], a[0])：第一排序鍵為 -a[1]（負的分數，等價於分數由高到低降冪）；第二排序鍵為 a[0]（姓名字母由小到大升冪）。最高分 90 分有 ('A', 90) 與 ('B', 90)，同分比第二鍵 'A' < 'B'，故 ('A', 90) 排第一、('B', 90) 排第二。印出 ('A', 90) ('B', 90)。",
    traceSteps: [
      { line: 2, text: "按 (-分數, 姓名) 排序：90 分同分時比姓名字母 'A' < 'B'", vars: {} },
      { line: 2, text: "排序結果：[('A', 90), ('B', 90), ('B', 80)]", vars: {"first": "('A', 90)", "second": "('B', 90)"} },
      { line: 3, text: "印出 ('A', 90) ('B', 90)", vars: {"output": "('A', 90) ('B', 90)"} }
    ]
  },
  {
    id: "ch6_a16",
    chapterId: 6,
    dimension: "comprehensions_tools",
    title: "生成式中 if-else 三元運算表達式位置差異",
    difficulty: "advanced",
    category: "生成式三元條件式",
    question: "執行下列在 for 前方包含 if-else 三元運算的串列生成式程式碼後，印出的結果為何？",
    code: `res = [x if x > 2 else -1 for x in range(5)]
print(res)`,
    options: [
      "A. [-1, -1, -1, 3, 4]",
      "B. [3, 4]",
      "C. [-1, -1, 2, 3, 4]",
      "D. [0, 1, 2, -1, -1]"
    ],
    answer: "A",
    explanation: "在串列生成式中，三元運算式 'val1 if cond else val2' 位於 for 之前，作用是「元素值映射轉換」而非過濾。對 range(5) 中的 0, 1, 2, 3, 4 逐一求值：0, 1, 2 不滿足 > 2，皆轉為 -1；3 與 4 滿足 > 2，保留原值。故生成 [-1, -1, -1, 3, 4]。",
    traceSteps: [
      { line: 1, text: "x 為 0, 1, 2 時，條件不滿足映射為 -1", vars: {} },
      { line: 1, text: "x 為 3, 4 時，條件滿足映射為 x 本身", vars: {"res": "[-1, -1, -1, 3, 4]"} },
      { line: 2, text: "輸出 [-1, -1, -1, 3, 4]", vars: {"output": "[-1, -1, -1, 3, 4]"} }
    ]
  }
];

// Export for both browser and Node/testing
if (typeof window !== 'undefined') {
  window.CHAPTERS_DATA = CHAPTERS_DATA;
  window.QUESTIONS_DATABASE = QUESTIONS_DATABASE;
}
if (typeof module !== 'undefined') {
  module.exports = { CHAPTERS_DATA, QUESTIONS_DATABASE };
}
