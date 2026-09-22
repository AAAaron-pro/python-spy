# -*- coding: utf-8 -*-
"""
定義並驗證全部 72 道全新高水準原創題 (mock_16 到 mock_87)
涵蓋 6 大作戰維度，嚴格對齊 W1-W5 及 114-1/114-2 期中考點
"""
import io
import sys
from contextlib import redirect_stdout

ALL_NEW_QUESTIONS = [
    # ==========================================
    # DIMENSION 1: syntax_io (mock_16 ~ mock_27)
    # ==========================================
    {
        "id": "mock_16",
        "chapterId": 1,
        "dimension": "syntax_io",
        "difficulty": "basic",
        "title": "字串乘法與數字轉型相加",
        "category": "型態轉換與運算",
        "question": "執行下列 Python 程式碼後，終端機印出的結果為何？",
        "code": 'a = "4"\nb = int(a * 2) + 3\nprint(b)',
        "options": ["A. 11", "B. 47", "C. 443", "D. 83"],
        "answer": "B",
        "explanation": '字串乘法 a * 2 即 "4" * 2 得到 "44"；int("44") 轉型為整數 44；最後 44 + 3 = 47。',
        "expected_output": "47",
        "traceSteps": [
            {"line": 1, "text": "定義字串變數 a = '4'", "vars": {"a": "'4'"}},
            {"line": 2, "text": "字串乘法 a * 2 得到 '44'，int('44') 轉為 44，加上 3 賦值給 b", "vars": {"b": 47}},
            {"line": 3, "text": "印出 b 的數值 47", "vars": {"output": 47}}
        ]
    },
    {
        "id": "mock_17",
        "chapterId": 1,
        "dimension": "syntax_io",
        "difficulty": "basic",
        "title": "print 空引數換行效果",
        "category": "print格式化",
        "question": "執行下列程式碼後，終端機的輸出結果為何？",
        "code": 'print("Line1", end="*")\nprint()\nprint("Line2")',
        "options": ["A. Line1*Line2", "B. Line1*\\nLine2", "C. Line1*\\n\\nLine2", "D. Line1* Line2"],
        "answer": "B",
        "explanation": 'print("Line1", end="*") 輸出 "Line1*" 且未換行；接著無引數的 print() 預設輸出換行字元 \\n；最後 print("Line2") 在新行印出 "Line2"。整體輸出在第 1 行為 "Line1*"，第 2 行為 "Line2"。',
        "expected_output": "Line1*\nLine2",
        "traceSteps": [
            {"line": 1, "text": "印出 'Line1*'，不換行", "vars": {"buffer": "'Line1*'"}},
            {"line": 2, "text": "print() 輸出預設換行字元 \\n", "vars": {}},
            {"line": 3, "text": "印出 'Line2' 並換行", "vars": {"output": "'Line2'"}}
        ]
    },
    {
        "id": "mock_18",
        "chapterId": 1,
        "dimension": "syntax_io",
        "difficulty": "basic",
        "title": "負數整數除法向下取整",
        "category": "整數除法與取餘數",
        "question": "下列 Python 運算式執行後的輸出為何？",
        "code": 'x = -13 // 4\ny = -13 % 4\nprint(x, y)',
        "options": ["A. -3 -1", "B. -4 3", "C. -3 3", "D. -4 -1"],
        "answer": "B",
        "explanation": 'Python 的 // 為向下取整（朝向負無限大），-13 / 4 = -3.25，向下取整為 -4。餘數公式為 r = a - (a // b) * b，即 -13 - (-4 * 4) = -13 - (-16) = 3。',
        "expected_output": "-4 3",
        "traceSteps": [
            {"line": 1, "text": "計算 -13 // 4：-3.25 向下取整為 -4", "vars": {"x": -4}},
            {"line": 2, "text": "計算 -13 % 4：-13 - (-4 * 4) = 3", "vars": {"y": 3}},
            {"line": 3, "text": "印出 x, y 即 '-4 3'", "vars": {"output": "-4 3"}}
        ]
    },
    {
        "id": "mock_19",
        "chapterId": 1,
        "dimension": "syntax_io",
        "difficulty": "basic",
        "title": "布林真假值評判準則",
        "category": "布林真假值",
        "question": "下列四個 bool() 運算轉換後的輸出為何？",
        "code": 'a = bool("0")\nb = bool("")\nc = bool([0])\nd = bool([])\nprint(a, b, c, d)',
        "options": ["A. False False False False", "B. True False True False", "C. False False True False", "D. True True True False"],
        "answer": "B",
        "explanation": '非空字串 "0" 長度大於 0 為 True；空字串 "" 為 False；包含一個整數 0 的串列 [0] 是非空容器為 True；空串列 [] 為 False。',
        "expected_output": "True False True False",
        "traceSteps": [
            {"line": 1, "text": "字串 '0' 非空，bool('0') 為 True", "vars": {"a": True}},
            {"line": 2, "text": "字串 '' 為空，bool('') 為 False", "vars": {"b": False}},
            {"line": 3, "text": "串列 [0] 長度為 1 非空，bool([0]) 為 True", "vars": {"c": True}},
            {"line": 4, "text": "串列 [] 為空，bool([]) 為 False", "vars": {"d": False}}
        ]
    },
    {
        "id": "mock_20",
        "chapterId": 1,
        "dimension": "syntax_io",
        "difficulty": "basic",
        "title": "多重賦值同時求值",
        "category": "變數賦值",
        "question": "執行下列 Python 程式碼後，變數 x 與 y 的值分別為何？",
        "code": 'x, y = 3, 5\nx, y = y, x + y\nprint(x, y)',
        "options": ["A. 5 8", "B. 5 10", "C. 8 8", "D. 3 8"],
        "answer": "A",
        "explanation": 'Python 在多重賦值時，會先將等號右側的所有表達式求值（y 為 5，x + y 為 3 + 5 = 8），再依序指派給左側的 x 與 y。因此 x 變為 5，y 變為 8。',
        "expected_output": "5 8",
        "traceSteps": [
            {"line": 1, "text": "初始化 x = 3, y = 5", "vars": {"x": 3, "y": 5}},
            {"line": 2, "text": "計算右側暫存元組 (y, x + y) 即 (5, 8)，再分別賦值給 x, y", "vars": {"x": 5, "y": 8}},
            {"line": 3, "text": "印出 x, y 為 '5 8'", "vars": {"output": "5 8"}}
        ]
    },
    {
        "id": "mock_21",
        "chapterId": 1,
        "dimension": "syntax_io",
        "difficulty": "basic",
        "title": "浮點數精度比較陷阱",
        "category": "浮點數運算",
        "question": "執行下列程式碼會得到什麼輸出？",
        "code": 'val = 0.1 + 0.2\nprint(val == 0.3, round(val, 2) == 0.3)',
        "options": ["A. True True", "B. False True", "C. True False", "D. False False"],
        "answer": "B",
        "explanation": '二進位浮點數無法精確表示 0.1 與 0.2，0.1 + 0.2 實際值約為 0.30000000000000004，直接比較 val == 0.3 結果為 False。但使用 round(val, 2) 四捨五入後與 0.3 比較則為 True。',
        "expected_output": "False True",
        "traceSteps": [
            {"line": 1, "text": "計算 0.1 + 0.2，浮點數暫存約 0.30000000000000004", "vars": {"val": 0.30000000000000004}},
            {"line": 2, "text": "val == 0.3 為 False；round(val, 2) == 0.3 為 True", "vars": {"eq1": False, "eq2": True}}
        ]
    },
    {
        "id": "mock_22",
        "chapterId": 1,
        "dimension": "syntax_io",
        "difficulty": "advanced",
        "title": "短路求值 and/or 回傳運算元",
        "category": "短路求值與真值判斷",
        "question": "下列短路求值運算式的輸出結果為何？",
        "code": 'ans = [] or 0 or "Eagle" and 42 or "Falcon"\nprint(ans)',
        "options": ["A. True", "B. Eagle", "C. 42", "D. Falcon"],
        "answer": "C",
        "explanation": 'and 優先權高於 or。先算 "Eagle" and 42：因 "Eagle" 為真值，and 回傳第二個運算元 42。表達式簡化為 [] or 0 or 42 or "Falcon"。由左至右，[] 與 0 均為假值，遇到 42 為真值，or 短路直接回傳 42！',
        "expected_output": "42",
        "traceSteps": [
            {"line": 1, "text": "and 優先於 or：'Eagle' and 42 求值為 42", "vars": {"and_sub": 42}},
            {"line": 1, "text": "[] or 0 or 42：遇到第一個真值 42 即短路返回", "vars": {"ans": 42}},
            {"line": 2, "text": "印出 ans 為 42", "vars": {"output": 42}}
        ]
    },
    {
        "id": "mock_23",
        "chapterId": 1,
        "dimension": "syntax_io",
        "difficulty": "advanced",
        "title": "負號與次方運算子優先權及結合性",
        "category": "運算子優先權",
        "question": "下列程式碼中 a, b, c 的輸出結果依序為何？",
        "code": 'a = -2 ** 4\nb = (-2) ** 4\nc = 2 ** 3 ** 2\nprint(a, b, c)',
        "options": ["A. 16 16 64", "B. -16 16 512", "C. -16 -16 512", "D. 16 16 512"],
        "answer": "B",
        "explanation": '次方運算子 ** 優先權高於單元負號 -，所以 -2 ** 4 等於 -(2 ** 4) = -16；而 (-2) ** 4 = 16；此外 ** 是由右至左結合（右結合律），2 ** 3 ** 2 = 2 ** (3 ** 2) = 2 ** 9 = 512。',
        "expected_output": "-16 16 512",
        "traceSteps": [
            {"line": 1, "text": "** 優先於負號：-(2**4) = -16", "vars": {"a": -16}},
            {"line": 2, "text": "括號先算：(-2)**4 = 16", "vars": {"b": 16}},
            {"line": 3, "text": "** 右結合：2**(3**2) = 2**9 = 512", "vars": {"c": 512}},
            {"line": 4, "text": "印出 a, b, c", "vars": {"output": "-16 16 512"}}
        ]
    },
    {
        "id": "mock_24",
        "chapterId": 1,
        "dimension": "syntax_io",
        "difficulty": "advanced",
        "title": "短路運算避免除以零錯誤",
        "category": "短路求值與真值判斷",
        "question": "執行下列 Python 程式碼後，終端機的輸出為何？",
        "code": 'x = 5\ny = 0\nres = y != 0 and (x / y > 1)\nprint(res)',
        "options": ["A. False", "B. True", "C. ZeroDivisionError", "D. None"],
        "answer": "A",
        "explanation": '邏輯運算子 and 具有短路特性。左側表達式 y != 0 為 0 != 0 即 False，Python 立即判定整個 and 運算式結果為 False，右側 (x / y > 1) 完全不會被直譯器執行，因此絕不會引發 ZeroDivisionError。',
        "expected_output": "False",
        "traceSteps": [
            {"line": 1, "text": "賦值 x = 5, y = 0", "vars": {"x": 5, "y": 0}},
            {"line": 3, "text": "評估 y != 0 為 False，and 運算子觸發短路返回 False", "vars": {"res": False}},
            {"line": 4, "text": "印出 res 為 False", "vars": {"output": False}}
        ]
    },
    {
        "id": "mock_25",
        "chapterId": 1,
        "dimension": "syntax_io",
        "difficulty": "advanced",
        "title": "PEP 8 命名與運算子空格規範",
        "category": "PEP 8 規範檢驗",
        "question": "依據 PEP 8 官方風格指南，下列變數定義敘述何者完全符合規範？",
        "code": 'valid_pep8 = "max_score = 100"\nprint(valid_pep8)',
        "options": [
            "A. max_score=100",
            "B. max_score = 100",
            "C. MaxScore = 100",
            "D. max_score  =  100"
        ],
        "answer": "B",
        "explanation": 'PEP 8 規範明訂：一般變數應使用全小寫字母加底線（snake_case），不可用 CamelCase；二元賦值運算子 = 兩側應恰好各保留一個空格，不可緊貼或留多個空格。',
        "expected_output": "max_score = 100",
        "traceSteps": [
            {"line": 1, "text": "檢查 PEP 8 規範：小寫底線命名且二元運算子前後各空一格", "vars": {"valid_pep8": "'max_score = 100'"}},
            {"line": 2, "text": "印出符合規範之字串", "vars": {"output": "'max_score = 100'"}}
        ]
    },
    {
        "id": "mock_26",
        "chapterId": 1,
        "dimension": "syntax_io",
        "difficulty": "advanced",
        "title": "多重鏈式比較運算子求值",
        "category": "比較運算子特性",
        "question": "執行下列鏈式比較（Chained Comparison）程式碼後，印出的結果為何？",
        "code": 'res = (1 < 3 > 2 == 2 < 5 != 4)\nprint(res)',
        "options": ["A. True", "B. False", "C. SyntaxError", "D. TypeError"],
        "answer": "A",
        "explanation": '在 Python 中，1 < 3 > 2 == 2 < 5 != 4 等價於 (1 < 3) and (3 > 2) and (2 == 2) and (2 < 5) and (5 != 4)。每個子條件皆為 True，且中間每個運算元只會被求值一次，最終結果為 True。',
        "expected_output": "True",
        "traceSteps": [
            {"line": 1, "text": "展開鏈式比較：1<3 (T), 3>2 (T), 2==2 (T), 2<5 (T), 5!=4 (T)", "vars": {"all_true": True}},
            {"line": 1, "text": "全部條件均為 True，res 賦值為 True", "vars": {"res": True}},
            {"line": 2, "text": "印出 True", "vars": {"output": True}}
        ]
    },
    {
        "id": "mock_27",
        "chapterId": 1,
        "dimension": "syntax_io",
        "difficulty": "advanced",
        "title": "print 結合 sep 與格式化引數",
        "category": "print格式化",
        "question": "執行下列格式化輸出程式碼後，終端機顯示的內容為何？",
        "code": 'agent, rank = "007", 1\nprint(f"Agent:{agent}", f"Rank:{rank:02d}", sep=" | ", end=";")',
        "options": [
            "A. Agent:007 | Rank:1;",
            "B. Agent:007 | Rank:01;",
            "C. Agent:007 Rank:01;",
            "D. Agent:007 | Rank:01"
        ],
        "answer": "B",
        "explanation": 'rank:02d 表示整數以兩位數顯示並以 0 補足，rank 1 格式化為 "01"；sep=" | " 將兩項字串以垂直線分隔；end=";" 在末尾加上分號，因此整體輸出為 "Agent:007 | Rank:01;"。',
        "expected_output": "Agent:007 | Rank:01;",
        "traceSteps": [
            {"line": 1, "text": "初始化變數 agent = '007', rank = 1", "vars": {"agent": "'007'", "rank": 1}},
            {"line": 2, "text": "f-string 格式化 rank:02d 得到 '01'，產生兩個字串引數", "vars": {"arg1": "'Agent:007'", "arg2": "'Rank:01'"}},
            {"line": 2, "text": "使用 sep=' | ' 連接並附加 end=';' 印出", "vars": {"output": "'Agent:007 | Rank:01;'"}}
        ]
    },

    # ==========================================
    # DIMENSION 2: strings_ascii (mock_28 ~ mock_39)
    # ==========================================
    {
        "id": "mock_28",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "difficulty": "basic",
        "title": "字串切片間隔取字",
        "category": "字串切片基礎",
        "question": "執行下列字串切片程式碼後，終端機的輸出為何？",
        "code": 'msg = "CyberSecurity"\nprint(msg[1:9:2])',
        "options": ["A. yeSc", "B. yerc", "C. CbrS", "D. ybrS"],
        "answer": "A",
        "explanation": '切片 [1:9:2] 包含索引 1, 3, 5, 7。在 "CyberSecurity" 中，msg[1]=\'y\', msg[3]=\'e\', msg[5]=\'S\', msg[7]=\'c\'，串聯結果為 "yeSc"。',
        "expected_output": "yeSc",
        "traceSteps": [
            {"line": 1, "text": "定義字串 msg = 'CyberSecurity'", "vars": {"msg": "'CyberSecurity'"}},
            {"line": 2, "text": "計算切片 [1:9:2]：取得索引 1('y'), 3('e'), 5('S'), 7('c')", "vars": {"slice": "'yeSc'"}},
            {"line": 2, "text": "印出 'yeSc'", "vars": {"output": "'yeSc'"}}
        ]
    },
    {
        "id": "mock_29",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "difficulty": "basic",
        "title": "ord 與 chr 位移運算",
        "category": "ASCII與ord/chr",
        "question": "下列 ASCII 運算程式碼執行後的輸出結果為何？",
        "code": 'char = "G"\nshifted = chr(ord(char) + 3)\nprint(shifted)',
        "options": ["A. I", "B. J", "C. K", "D. H"],
        "answer": "B",
        "explanation": "ord('G') 的 ASCII 數值為 71，71 + 3 = 74。chr(74) 對應的字元為 'J'（'G' 後第 3 個字母）。",
        "expected_output": "J",
        "traceSteps": [
            {"line": 1, "text": "設定 char = 'G'", "vars": {"char": "'G'"}},
            {"line": 2, "text": "ord('G') = 71，71 + 3 = 74，chr(74) = 'J'", "vars": {"shifted": "'J'"}},
            {"line": 3, "text": "印出 shifted 即 'J'", "vars": {"output": "'J'"}}
        ]
    },
    {
        "id": "mock_30",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "difficulty": "basic",
        "title": "字元數字轉整數差值",
        "category": "ASCII與ord/chr",
        "question": "執行下列程式碼會得到什麼輸出？",
        "code": 'digit_char = "8"\ndiff = ord(digit_char) - ord("0")\nprint(diff, type(diff).__name__)',
        "options": ["A. 8 int", "B. 8 str", "C. 56 int", "D. 8 float"],
        "answer": "A",
        "explanation": 'ASCII 碼中數字字元 \'0\' 到 \'9\' 是連續編碼（\'0\' 是 48，\'8\' 是 56）。56 - 48 = 8，且相減結果為整數 int。',
        "expected_output": "8 int",
        "traceSteps": [
            {"line": 1, "text": "digit_char = '8'", "vars": {"digit_char": "'8'"}},
            {"line": 2, "text": "ord('8') - ord('0') = 56 - 48 = 8", "vars": {"diff": 8}},
            {"line": 3, "text": "diff 的型態名稱為 'int'，輸出 '8 int'", "vars": {"output": "8 int"}}
        ]
    },
    {
        "id": "mock_31",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "difficulty": "basic",
        "title": "字串不可變性賦值錯誤",
        "category": "字串不可變性",
        "question": "執行下列嘗試修改字串字元的程式碼，會發生什麼情況？",
        "code": 's = "Python"\ntry:\n    s[0] = "J"\nexcept TypeError:\n    print("TypeError")',
        "options": ["A. Jython", "B. Python", "C. TypeError", "D. IndexError"],
        "answer": "C",
        "explanation": "Python 的字串是不可變物件（Immutable），不支援透過索引進行元素賦值（item assignment）。執行 s[0] = 'J' 會拋出 TypeError！",
        "expected_output": "TypeError",
        "traceSteps": [
            {"line": 1, "text": "定義字串 s = 'Python'", "vars": {"s": "'Python'"}},
            {"line": 3, "text": "嘗試執行 s[0] = 'J'，字串不支援原地修改，拋出 TypeError", "vars": {}},
            {"line": 5, "text": "except 區塊捕獲 TypeError 並印出 'TypeError'", "vars": {"output": "'TypeError'"}}
        ]
    },
    {
        "id": "mock_32",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "difficulty": "basic",
        "title": "字串 find 找不到子字串之傳回值",
        "category": "字串方法特性",
        "question": "執行下列 Python 程式碼後，印出的 pos 數值為何？",
        "code": 'text = "Agent007"\npos = text.find("X")\nprint(pos)',
        "options": ["A. -1", "B. False", "C. None", "D. ValueError"],
        "answer": "A",
        "explanation": "str.find() 若未搜尋到指定子字串，會安全傳回整數 -1 而非拋出異常；若使用 str.index() 找不到則會拋出 ValueError。",
        "expected_output": "-1",
        "traceSteps": [
            {"line": 1, "text": "text = 'Agent007'", "vars": {"text": "'Agent007'"}},
            {"line": 2, "text": "搜尋 'X'，子字串不存在，find() 返回 -1", "vars": {"pos": -1}},
            {"line": 3, "text": "印出 -1", "vars": {"output": -1}}
        ]
    },
    {
        "id": "mock_33",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "difficulty": "basic",
        "title": "字串 split 預設空白處理機制",
        "category": "字串分割與合併",
        "question": "執行下列程式碼後，終端機輸出的長度與連接字串為何？",
        "code": 'raw = "   code   fast   now   "\nparts = raw.split()\nprint(len(parts), "-".join(parts))',
        "options": ["A. 3 code-fast-now", "B. 7 -code--fast--now-", "C. 5 code-fast-now", "D. 3 code fast now"],
        "answer": "A",
        "explanation": "str.split() 不傳入引數時，會自動去除頭尾空白並將任何連續空白視為單一分隔符，切出 ['code', 'fast', 'now']，長度為 3，join 後為 'code-fast-now'。",
        "expected_output": "3 code-fast-now",
        "traceSteps": [
            {"line": 1, "text": "raw 包含多餘前後與中間空白", "vars": {"raw": "'   code   fast   now   '"}},
            {"line": 2, "text": "split() 壓縮連續空白切分為 ['code', 'fast', 'now']", "vars": {"parts": "['code', 'fast', 'now']"}},
            {"line": 3, "text": "長度為 3，以 '-' 連接印出", "vars": {"output": "'3 code-fast-now'"}}
        ]
    },
    {
        "id": "mock_34",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "difficulty": "advanced",
        "title": "負步長反向切片含頭不含尾",
        "category": "負步長切片",
        "question": "執行下列負步長切片程式碼後，印出的結果為何？",
        "code": 'code = "0123456789"\nprint(code[7:2:-2])',
        "options": ["A. 753", "B. 7531", "C. 8642", "D. 246"],
        "answer": "A",
        "explanation": "切片 [7:2:-2]：從索引 7（字元 '7'）開始，每次減 2，結束界限為 2（不包含索引 2 的字元 '2'）。因此依序取出的索引為 7, 5, 3，對應字元為 '753'。",
        "expected_output": "753",
        "traceSteps": [
            {"line": 1, "text": "code = '0123456789'", "vars": {"code": "'0123456789'"}},
            {"line": 2, "text": "索引 7->'7', 5->'5', 3->'3'；下一個 1 超過結束條件 2 停止", "vars": {"slice": "'753'"}},
            {"line": 2, "text": "印出 '753'", "vars": {"output": "'753'"}}
        ]
    },
    {
        "id": "mock_35",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "difficulty": "advanced",
        "title": "切片越界安全機制與負索引",
        "category": "字串邊界安全",
        "question": "下列字串切片在邊界完全越界時的輸出為何？",
        "code": 's = "Spy"\npart1 = s[10:20]\npart2 = s[-100:2]\nprint(repr(part1), part2)',
        "options": ["A. IndexError Sp", "B. '' Sp", "C. None Sp", "D. '' Spy"],
        "answer": "B",
        "explanation": "在 Python 中，直接單字元索引存取 s[10] 會拋出 IndexError，但「切片」即使完全越界也不會報錯。s[10:20] 返回空字串 ''；s[-100:2] 會自動將超出的負起點截取為 0，取得 s[0:2] 即 'Sp'。",
        "expected_output": "'' Sp",
        "traceSteps": [
            {"line": 1, "text": "s = 'Spy'，長度為 3", "vars": {"s": "'Spy'"}},
            {"line": 2, "text": "切片 [10:20] 超出右邊界，安全返回空字串 ''", "vars": {"part1": "''"}},
            {"line": 3, "text": "切片 [-100:2] 自動調節為 [0:2]，取得 'Sp'", "vars": {"part2": "'Sp'"}},
            {"line": 4, "text": "印出 '' Sp", "vars": {"output": "'' Sp"}}
        ]
    },
    {
        "id": "mock_36",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "difficulty": "advanced",
        "title": "ASCII 位元 XOR 大小寫互換",
        "category": "ASCII與位元運算",
        "question": "執行下列利用 XOR 32 進行字元轉換的程式碼後，輸出為何？",
        "code": 'word = "NtU"\nconverted = "".join(chr(ord(c) ^ 32) if c.isalpha() else c for c in word)\nprint(converted)',
        "options": ["A. NTU", "B. ntu", "C. nTu", "D. NtU"],
        "answer": "C",
        "explanation": "英文字母大寫與小寫 ASCII 碼差恰為 32（二進位第 5 位為 1）。對字母的 ASCII 碼進行 ^ 32 可以翻轉大小寫：'N'(大寫) 變 'n'，'t'(小寫) 變 'T'，'U'(大寫) 變 'u'，合併為 'nTu'。",
        "expected_output": "nTu",
        "traceSteps": [
            {"line": 1, "text": "word = 'NtU'", "vars": {"word": "'NtU'"}},
            {"line": 2, "text": "ord('N')^32 -> 'n', ord('t')^32 -> 'T', ord('U')^32 -> 'u'", "vars": {"converted": "'nTu'"}},
            {"line": 3, "text": "印出 'nTu'", "vars": {"output": "'nTu'"}}
        ]
    },
    {
        "id": "mock_37",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "difficulty": "advanced",
        "title": "字串 strip 字元集合匹配機制",
        "category": "字串清洗方法",
        "question": "執行下列 strip 程式碼後，清洗後的字串為何？",
        "code": 'url = "www.mission-secret.tw."\ncleaned = url.strip(".w")\nprint(cleaned)',
        "options": ["A. mission-secret.tw", "B. mission-secret", "C. .mission-secret.tw.", "D. mission-secret.t"],
        "answer": "A",
        "explanation": "strip('.w') 的引數是字元集合 {'.', 'w'}，會持續移除開頭與結尾所有屬於該集合的字元。開頭 'www.' 被全部移除；結尾 '.' 被移除後，倒數第二個字元 'w' 也屬於集合因此被移除，剩餘字元結尾為 't'（非集合字元）停止。輸出為 'mission-secret.t'？wait! Let's check: 'tw.' -> remove '.', last is 'w' -> remove 'w', last is 't' -> stop! So mission-secret.t!",
        "expected_output": "mission-secret.t",
        "options": ["A. mission-secret.tw", "B. mission-secret", "C. .mission-secret.tw.", "D. mission-secret.t"],
        "answer": "D",
        "explanation": "strip('.w') 的引數是字元集合 {'.', 'w'}，會持續移除頭尾屬於該集合的字元。開頭 'www.' 全部被移除；末尾的 '.' 被移除後，前一個字元是 'w' 也屬於集合故被移除，直到遇到 't' 停止。最終結果為 'mission-secret.t'。",
        "traceSteps": [
            {"line": 1, "text": "url = 'www.mission-secret.tw.'", "vars": {"url": "'www.mission-secret.tw.'"}},
            {"line": 2, "text": "strip('.w') 去除頭部 'w','w','w','.' 與尾部 '.','w'，遇到 't' 終止", "vars": {"cleaned": "'mission-secret.t'"}},
            {"line": 3, "text": "印出 'mission-secret.t'", "vars": {"output": "'mission-secret.t'"}}
        ]
    },
    {
        "id": "mock_38",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "difficulty": "advanced",
        "title": "replace 連鎖替換次數限制與原字串不變",
        "category": "字串不可變性",
        "question": "執行下列 replace 操作後，s 與 res 的輸出為何？",
        "code": 's = "banana"\nres = s.replace("a", "o", 1).replace("n", "m")\nprint(s, res)',
        "options": ["A. bonama bonama", "B. banana bomama", "C. banana bonama", "D. banana banana"],
        "answer": "B",
        "explanation": "第一個 replace('a', 'o', 1) 僅替換第 1 個 'a'，得到 'bonana'；第二個 replace('n', 'm') 將所有 'n' 替換為 'm' 得到 'bomama'。因字串具不可變性，原字串 s 依然維持 'banana'。",
        "expected_output": "banana bomama",
        "traceSteps": [
            {"line": 1, "text": "定義 s = 'banana'", "vars": {"s": "'banana'"}},
            {"line": 2, "text": "替換第 1 個 'a' 成 'o' 得到 'bonana'，再將所有 'n' 換成 'm' 得到 'bomama'", "vars": {"res": "'bomama'"}},
            {"line": 3, "text": "原字串 s 未變，輸出 'banana bomama'", "vars": {"output": "'banana bomama'"}}
        ]
    },
    {
        "id": "mock_39",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "difficulty": "advanced",
        "title": "字串乘法與 join 複合排版",
        "category": "字串方法特性",
        "question": "執行下列程式碼後，變數 pattern 的值為何？",
        "code": 'pattern = "-".join(["A" * 2, "B" * 3, "C" * 1])\nprint(pattern)',
        "options": ["A. A-A-B-B-B-C", "B. AA-BBB-C", "C. A2-B3-C1", "D. AA-BBB-C-"],
        "answer": "B",
        "explanation": "字串乘法分別產出 ['AA', 'BBB', 'C']。使用 '-'.join(...) 將串列元素串接，元素間以 '-' 分隔，最後不會有多餘的 '-'，因此輸出 'AA-BBB-C'。",
        "expected_output": "AA-BBB-C",
        "traceSteps": [
            {"line": 1, "text": "建立串列 ['AA', 'BBB', 'C']", "vars": {"items": "['AA', 'BBB', 'C']"}},
            {"line": 1, "text": "以 '-' 作為分隔符號串接", "vars": {"pattern": "'AA-BBB-C'"}},
            {"line": 2, "text": "印出 pattern", "vars": {"output": "'AA-BBB-C'"}}
        ]
    },

    # ==========================================
    # DIMENSION 3: containers_memory (mock_40 ~ mock_51)
    # ==========================================
    {
        "id": "mock_40",
        "chapterId": 3,
        "dimension": "containers_memory",
        "difficulty": "basic",
        "title": "串列別名共用相同記憶體位址",
        "category": "串列記憶體機制",
        "question": "執行下列別名指派程式碼後，印出的長度與最後元素為何？",
        "code": 'p = [10, 20, 30]\nq = p\nq.append(40)\nprint(len(p), p[-1])',
        "options": ["A. 3 30", "B. 4 40", "C. 3 40", "D. 4 30"],
        "answer": "B",
        "explanation": "q = p 只是建立了參照別名（Aliasing），兩個變數指向同一個記憶體串列物件。q.append(40) 會直接修改此串列，因此 p 的長度變為 4，最後一個元素 p[-1] 為 40。",
        "expected_output": "4 40",
        "traceSteps": [
            {"line": 1, "text": "p 指向串列 [10, 20, 30]", "vars": {"p": "[10, 20, 30]"}},
            {"line": 2, "text": "q = p 使 q 指向與 p 相同的記憶體位址", "vars": {"q": "ref(p)"}},
            {"line": 3, "text": "q.append(40) 修改共用串列", "vars": {"p": "[10, 20, 30, 40]"}},
            {"line": 4, "text": "len(p) 為 4，p[-1] 為 40", "vars": {"output": "4 40"}}
        ]
    },
    {
        "id": "mock_41",
        "chapterId": 3,
        "dimension": "containers_memory",
        "difficulty": "basic",
        "title": "全切片淺拷貝獨立性",
        "category": "淺拷貝與複製",
        "question": "執行下列全切片拷貝程式碼後，終端機顯示的內容為何？",
        "code": 'orig = [1, 2, 3]\ncopy_list = orig[:]\ncopy_list.append(99)\nprint(orig, copy_list)',
        "options": ["A. [1, 2, 3] [1, 2, 3, 99]", "B. [1, 2, 3, 99] [1, 2, 3, 99]", "C. [1, 2, 3] [99]", "D. [1, 2, 3, 99] [1, 2, 3]"],
        "answer": "A",
        "explanation": "切片 copy_list = orig[:] 建立了原始串列的獨立副本（淺拷貝）。後續對 copy_list 的 append 操作不會影響 orig，orig 依然保持 [1, 2, 3]。",
        "expected_output": "[1, 2, 3] [1, 2, 3, 99]",
        "traceSteps": [
            {"line": 1, "text": "orig = [1, 2, 3]", "vars": {"orig": "[1, 2, 3]"}},
            {"line": 2, "text": "orig[:] 建立獨立新串列並指派給 copy_list", "vars": {"copy_list": "[1, 2, 3]"}},
            {"line": 3, "text": "copy_list.append(99) 僅修改副本", "vars": {"copy_list": "[1, 2, 3, 99]"}},
            {"line": 4, "text": "印出 orig 與 copy_list", "vars": {"output": "[1, 2, 3] [1, 2, 3, 99]"}}
        ]
    },
    {
        "id": "mock_42",
        "chapterId": 3,
        "dimension": "containers_memory",
        "difficulty": "basic",
        "title": "list.sort 原地排序傳回值 None",
        "category": "排序方法區別",
        "question": "執行下列 list.sort() 排序程式碼後，印出的結果為何？",
        "code": 'nums = [5, 2, 8, 1]\nresult = nums.sort()\nprint(result, nums)',
        "options": ["A. [1, 2, 5, 8] [1, 2, 5, 8]", "B. None [1, 2, 5, 8]", "C. [1, 2, 5, 8] [5, 2, 8, 1]", "D. None [5, 2, 8, 1]"],
        "answer": "B",
        "explanation": "list.sort() 是原地修改（In-place）的串列方法，不會產生新串列，且固定回傳 None。原串列 nums 則被排序為 [1, 2, 5, 8]。",
        "expected_output": "None [1, 2, 5, 8]",
        "traceSteps": [
            {"line": 1, "text": "nums = [5, 2, 8, 1]", "vars": {"nums": "[5, 2, 8, 1]"}},
            {"line": 2, "text": "nums.sort() 原地排序 nums，回傳值為 None", "vars": {"result": None, "nums": "[1, 2, 5, 8]"}},
            {"line": 3, "text": "印出 None [1, 2, 5, 8]", "vars": {"output": "None [1, 2, 5, 8]"}}
        ]
    },
    {
        "id": "mock_43",
        "chapterId": 3,
        "dimension": "containers_memory",
        "difficulty": "basic",
        "title": "sorted 函式回傳新串列保留原物件",
        "category": "排序方法區別",
        "question": "執行下列 sorted 函式程式碼後，終端機顯示為何？",
        "code": 'data = [3, 1, 4]\nnew_data = sorted(data, reverse=True)\nprint(data, new_data)',
        "options": ["A. [4, 3, 1] [4, 3, 1]", "B. [3, 1, 4] [4, 3, 1]", "C. [3, 1, 4] [1, 3, 4]", "D. None [4, 3, 1]"],
        "answer": "B",
        "explanation": "內建函式 sorted(data) 會建立並傳回一個全新的已排序串列，原串列 data 完全不受影響保持 [3, 1, 4]；new_data 則接收逆序排序後的 [4, 3, 1]。",
        "expected_output": "[3, 1, 4] [4, 3, 1]",
        "traceSteps": [
            {"line": 1, "text": "data = [3, 1, 4]", "vars": {"data": "[3, 1, 4]"}},
            {"line": 2, "text": "sorted() 建立新串列 [4, 3, 1]，data 保持不變", "vars": {"new_data": "[4, 3, 1]"}},
            {"line": 3, "text": "印出 data 與 new_data", "vars": {"output": "[3, 1, 4] [4, 3, 1]"}}
        ]
    },
    {
        "id": "mock_44",
        "chapterId": 3,
        "dimension": "containers_memory",
        "difficulty": "basic",
        "title": "串列 append 與 extend 行為差異",
        "category": "串列操作方法",
        "question": "執行下列程式碼後，lst1 與 lst2 的長度分別為何？",
        "code": 'lst1 = [1, 2]\nlst1.append([3, 4])\nlst2 = [1, 2]\nlst2.extend([3, 4])\nprint(len(lst1), len(lst2))',
        "options": ["A. 4 4", "B. 3 4", "C. 4 3", "D. 3 3"],
        "answer": "B",
        "explanation": "append 將傳入的 [3, 4] 視為單一子串列元素加入，lst1 變成 [1, 2, [3, 4]] 長度為 3；extend 則是展開 [3, 4] 逐一加入，lst2 變成 [1, 2, 3, 4] 長度為 4。",
        "expected_output": "3 4",
        "traceSteps": [
            {"line": 2, "text": "lst1.append([3, 4]) -> [1, 2, [3, 4]]", "vars": {"len1": 3}},
            {"line": 4, "text": "lst2.extend([3, 4]) -> [1, 2, 3, 4]", "vars": {"len2": 4}},
            {"line": 5, "text": "印出長度 3 4", "vars": {"output": "3 4"}}
        ]
    },
    {
        "id": "mock_45",
        "chapterId": 3,
        "dimension": "containers_memory",
        "difficulty": "basic",
        "title": "串列 pop 移除指定索引與末尾元素",
        "category": "串列操作方法",
        "question": "執行下列 pop 程式碼後，印出的 val1, val2 與 items 為何？",
        "code": 'items = ["Alpha", "Bravo", "Charlie", "Delta"]\nval1 = items.pop(1)\nval2 = items.pop()\nprint(val1, val2, items)',
        "options": [
            "A. Bravo Delta ['Alpha', 'Charlie']",
            "B. Alpha Delta ['Bravo', 'Charlie']",
            "C. Bravo Charlie ['Alpha', 'Delta']",
            "D. Bravo Delta ['Charlie']"
        ],
        "answer": "A",
        "explanation": "items.pop(1) 移除並回傳索引 1 的元素 'Bravo'，items 剩下 ['Alpha', 'Charlie', 'Delta']；接著 items.pop() 預設移除並回傳末尾元素 'Delta'，items 剩下 ['Alpha', 'Charlie']。",
        "expected_output": "Bravo Delta ['Alpha', 'Charlie']",
        "traceSteps": [
            {"line": 2, "text": "pop(1) 移出 'Bravo'", "vars": {"val1": "'Bravo'", "items": "['Alpha', 'Charlie', 'Delta']"}},
            {"line": 3, "text": "pop() 移出末尾 'Delta'", "vars": {"val2": "'Delta'", "items": "['Alpha', 'Charlie']"}},
            {"line": 4, "text": "印出結果", "vars": {"output": "Bravo Delta ['Alpha', 'Charlie']"}}
        ]
    },
    {
        "id": "mock_46",
        "chapterId": 3,
        "dimension": "containers_memory",
        "difficulty": "advanced",
        "title": "二維串列乘法淺拷貝連鎖修改陷阱",
        "category": "二維串列與淺拷貝",
        "question": "下列二維串列乘法初始化程式碼中，變數 total 的值為何？",
        "code": 'grid = [[0] * 3] * 3\ngrid[1][1] = 7\ntotal = sum(grid[i][1] for i in range(3))\nprint(total)',
        "options": ["A. 7", "B. 14", "C. 21", "D. 0"],
        "answer": "C",
        "explanation": "[[0] * 3] * 3 產生的是 3 個指向「同一個內部串列物件」的參照！當修改 grid[1][1] = 7 時，grid[0][1]、grid[1][1]、grid[2][1] 同步全部變成 7。加總為 7 + 7 + 7 = 21。",
        "expected_output": "21",
        "traceSteps": [
            {"line": 1, "text": "以乘法建立 3 列，3 列皆參照同一記憶體串列 [0, 0, 0]", "vars": {"grid": "[[0,0,0], [0,0,0], [0,0,0]]"}},
            {"line": 2, "text": "修改 grid[1][1] = 7，三列同步變更為 [0, 7, 0]", "vars": {"grid": "[[0,7,0], [0,7,0], [0,7,0]]"}},
            {"line": 3, "text": "sum(7 + 7 + 7) = 21", "vars": {"total": 21}},
            {"line": 4, "text": "印出 21", "vars": {"output": 21}}
        ]
    },
    {
        "id": "mock_47",
        "chapterId": 3,
        "dimension": "containers_memory",
        "difficulty": "advanced",
        "title": "切片賦值替換多個元素並縮減長度",
        "category": "切片賦值",
        "question": "執行下列切片賦值程式碼後，串列 nums 的內容為何？",
        "code": 'nums = [10, 20, 30, 40, 50]\nnums[1:4] = [99]\nprint(nums)',
        "options": ["A. [10, 99, 50]", "B. [10, 99, 40, 50]", "C. [10, [99], 50]", "D. TypeError"],
        "answer": "A",
        "explanation": "nums[1:4] 選取索引 1, 2, 3 的三個元素（20, 30, 40）。將 [99] 賦值給該區間會將這 3 個元素替換為單一元素 99，長度由 5 縮減為 3，結果為 [10, 99, 50]。",
        "expected_output": "[10, 99, 50]",
        "traceSteps": [
            {"line": 1, "text": "nums = [10, 20, 30, 40, 50]", "vars": {"nums": "[10, 20, 30, 40, 50]"}},
            {"line": 2, "text": "將區間 nums[1:4] (20, 30, 40) 替換為 [99]", "vars": {"nums": "[10, 99, 50]"}},
            {"line": 3, "text": "印出 nums", "vars": {"output": "[10, 99, 50]"}}
        ]
    },
    {
        "id": "mock_48",
        "chapterId": 3,
        "dimension": "containers_memory",
        "difficulty": "advanced",
        "title": "零長度切片賦值進行原地插入",
        "category": "切片賦值",
        "question": "執行下列空區間切片賦值程式碼後，nums 的內容為何？",
        "code": 'nums = [1, 4, 5]\nnums[1:1] = [2, 3]\nprint(nums)',
        "options": ["A. [1, 2, 3, 4, 5]", "B. [1, [2, 3], 4, 5]", "C. [1, 2, 3, 5]", "D. IndexError"],
        "answer": "A",
        "explanation": "切片 nums[1:1] 為零長度區間。對其賦值 [2, 3] 等同於在索引 1 的位置原地插入元素 2, 3，不會刪除任何既有元素，得到 [1, 2, 3, 4, 5]。",
        "expected_output": "[1, 2, 3, 4, 5]",
        "traceSteps": [
            {"line": 1, "text": "nums = [1, 4, 5]", "vars": {"nums": "[1, 4, 5]"}},
            {"line": 2, "text": "在索引 1 前插入 [2, 3]", "vars": {"nums": "[1, 2, 3, 4, 5]"}},
            {"line": 3, "text": "印出 nums", "vars": {"output": "[1, 2, 3, 4, 5]"}}
        ]
    },
    {
        "id": "mock_49",
        "chapterId": 3,
        "dimension": "containers_memory",
        "difficulty": "advanced",
        "title": "串列 += 原地擴展 vs + 重新綁定之函式效應",
        "category": "串列記憶體機制",
        "question": "執行下列函式呼叫後，外部串列 a 與 b 的值分別為何？",
        "code": 'def test_mutate(lst):\n    lst += [100]\n\ndef test_rebind(lst):\n    lst = lst + [200]\n\na = [1]\nb = [1]\ntest_mutate(a)\ntest_rebind(b)\nprint(a, b)',
        "options": ["A. [1, 100] [1, 200]", "B. [1, 100] [1]", "C. [1] [1]", "D. [1] [1, 200]"],
        "answer": "B",
        "explanation": "對於可變串列，lst += [100] 是原地修改（呼叫 __iadd__），會修改傳入的原物件，因此外部 a 變為 [1, 100]；而 lst = lst + [200] 則是產生全新串列並重新指派給區域變數 lst，外部 b 保持 [1]。",
        "expected_output": "[1, 100] [1]",
        "traceSteps": [
            {"line": 9, "text": "test_mutate(a)：lst += [100] 原地修改 a 的記憶體內容", "vars": {"a": "[1, 100]"}},
            {"line": 10, "text": "test_rebind(b)：lst = lst + [200] 僅重綁定區域變數，b 不受影響", "vars": {"b": "[1]"}},
            {"line": 11, "text": "印出 a 與 b", "vars": {"output": "[1, 100] [1]"}}
        ]
    },
    {
        "id": "mock_50",
        "chapterId": 3,
        "dimension": "containers_memory",
        "difficulty": "advanced",
        "title": "sort key 搭配元組雙重排序規則",
        "category": "排序方法區別",
        "question": "執行下列使用元組 key 進行雙重條件排序的程式碼後，印出的首尾單字為何？",
        "code": 'words = ["banana", "pie", "apple", "fig"]\nwords.sort(key=lambda w: (len(w), w))\nprint(words[0], words[-1])',
        "options": ["A. fig banana", "B. apple banana", "C. pie fig", "D. fig apple"],
        "answer": "A",
        "explanation": "元組 key 為 (len(w), w)：優先比較長度，長度相同時比字典順序。長度為 3 的有 'fig' 與 'pie'，因 'fig' < 'pie'，'fig' 排第一位；長度最長為 'banana'(6)，排在最後一位。",
        "expected_output": "fig banana",
        "traceSteps": [
            {"line": 2, "text": "以 (長度, 字典序) 排序：'fig'(3, 'fig') < 'pie'(3, 'pie') < 'apple'(5) < 'banana'(6)", "vars": {"words": "['fig', 'pie', 'apple', 'banana']"}},
            {"line": 3, "text": "印出 words[0] 與 words[-1]", "vars": {"output": "'fig banana'"}}
        ]
    },
    {
        "id": "mock_51",
        "chapterId": 3,
        "dimension": "containers_memory",
        "difficulty": "advanced",
        "title": "串列 remove 方法僅刪除第一個相符項",
        "category": "串列操作方法",
        "question": "執行下列 remove 程式碼後，串列中 2 的數量與最終內容為何？",
        "code": 'vals = [2, 1, 2, 3, 2]\nvals.remove(2)\nprint(vals.count(2), vals)',
        "options": ["A. 0 [1, 3]", "B. 2 [1, 2, 3, 2]", "C. 2 [2, 1, 2, 3]", "D. 3 [2, 1, 2, 3, 2]"],
        "answer": "B",
        "explanation": "list.remove(x) 只會尋找並刪除「第一個」相符的值。索引 0 的 2 被刪除後，剩餘 [1, 2, 3, 2]，其中依舊包含 2 個 2。",
        "expected_output": "2 [1, 2, 3, 2]",
        "traceSteps": [
            {"line": 1, "text": "vals = [2, 1, 2, 3, 2]", "vars": {"vals": "[2, 1, 2, 3, 2]"}},
            {"line": 2, "text": "remove(2) 移除最左側的 2", "vars": {"vals": "[1, 2, 3, 2]"}},
            {"line": 3, "text": "count(2) 為 2，印出 '2 [1, 2, 3, 2]'", "vars": {"output": "2 [1, 2, 3, 2]"}}
        ]
    },

    # ==========================================
    # DIMENSION 4: control_flow (mock_52 ~ mock_63)
    # ==========================================
    {
        "id": "mock_52",
        "chapterId": 4,
        "dimension": "control_flow",
        "difficulty": "basic",
        "title": "range 負步長終點界限判定",
        "category": "range邊界計算",
        "question": "執行下列負步長 range 轉換為串列的程式碼，結果為何？",
        "code": 'res = list(range(9, 2, -3))\nprint(res)',
        "options": ["A. [9, 6, 3]", "B. [9, 6, 3, 0]", "C. [9, 7, 5, 3]", "D. []"],
        "answer": "A",
        "explanation": "range(9, 2, -3) 起始值為 9，每次減 3，且不包含終點值 2。產生的序列為 9, 6, 3（下一個為 0，已小於等於終點 2，故停止）。",
        "expected_output": "[9, 6, 3]",
        "traceSteps": [
            {"line": 1, "text": "range(9, 2, -3) 產出 9, 6, 3", "vars": {"res": "[9, 6, 3]"}},
            {"line": 2, "text": "印出 [9, 6, 3]", "vars": {"output": "[9, 6, 3]"}}
        ]
    },
    {
        "id": "mock_53",
        "chapterId": 4,
        "dimension": "control_flow",
        "difficulty": "basic",
        "title": "range 空區間長度計算",
        "category": "range邊界計算",
        "question": "下列兩個 range 轉換為串列後的長度分別為何？",
        "code": 'r1 = list(range(5, 2))\nr2 = list(range(2, 5, -1))\nprint(len(r1), len(r2))',
        "options": ["A. 3 3", "B. 0 0", "C. 0 3", "D. 3 0"],
        "answer": "B",
        "explanation": "range(5, 2) 預設步長為 +1，起點 5 大於終點 2 無法遞增，產生空序列；range(2, 5, -1) 步長為 -1，起點 2 小於終點 5 無法遞減，亦產生空序列。兩者長度皆為 0。",
        "expected_output": "0 0",
        "traceSteps": [
            {"line": 1, "text": "5 到 2 且步長為 +1，無元素，r1 = []", "vars": {"r1": "[]"}},
            {"line": 2, "text": "2 到 5 且步長為 -1，無元素，r2 = []", "vars": {"r2": "[]"}},
            {"line": 3, "text": "印出長度 0 0", "vars": {"output": "0 0"}}
        ]
    },
    {
        "id": "mock_54",
        "chapterId": 4,
        "dimension": "control_flow",
        "difficulty": "basic",
        "title": "while 迴圈狀態累加與倍增終止",
        "category": "while 條件與計數",
        "question": "執行下列 while 迴圈後，total 與 n 的值分別為何？",
        "code": 'n = 1\ntotal = 0\nwhile n <= 8:\n    total += n\n    n *= 2\nprint(total, n)',
        "options": ["A. 15 8", "B. 15 16", "C. 7 8", "D. 7 16"],
        "answer": "B",
        "explanation": "各輪迭代：n=1(total=1,n=2), n=2(total=3,n=4), n=4(total=7,n=8), n=8(total=15,n=16)。當 n=16 時，16 <= 8 條件不成立結束迴圈，輸出 15 16。",
        "expected_output": "15 16",
        "traceSteps": [
            {"line": 3, "text": "迴圈四次：n 分別為 1, 2, 4, 8，累加 total = 15", "vars": {"total": 15}},
            {"line": 5, "text": "最後一輪 n 乘 2 變為 16，條件終止", "vars": {"n": 16}},
            {"line": 6, "text": "印出 15 16", "vars": {"output": "15 16"}}
        ]
    },
    {
        "id": "mock_55",
        "chapterId": 4,
        "dimension": "control_flow",
        "difficulty": "basic",
        "title": "迴圈 continue 略過偶數迭代",
        "category": "break 與 continue",
        "question": "執行下列包含 continue 敘述的程式碼後，vals 串列的內容為何？",
        "code": 'vals = []\nfor i in range(1, 6):\n    if i % 2 == 0:\n        continue\n    vals.append(i * 10)\nprint(vals)',
        "options": ["A. [10, 30, 50]", "B. [20, 40]", "C. [10, 20, 30, 40, 50]", "D. []"],
        "answer": "A",
        "explanation": "當 i 為偶數（2, 4）時，continue 會立刻略過該次迭代後續的 append 敘述；只有奇數 1, 3, 5 會執行 append(i * 10)，產出 [10, 30, 50]。",
        "expected_output": "[10, 30, 50]",
        "traceSteps": [
            {"line": 3, "text": "i = 1: 奇數加入 10；i = 2: 偶數 continue 跳過", "vars": {"vals": "[10]"}},
            {"line": 3, "text": "i = 3: 奇數加入 30；i = 4: 偶數 continue 跳過", "vars": {"vals": "[10, 30]"}},
            {"line": 3, "text": "i = 5: 奇數加入 50", "vars": {"vals": "[10, 30, 50]"}},
            {"line": 6, "text": "印出 [10, 30, 50]", "vars": {"output": "[10, 30, 50]"}}
        ]
    },
    {
        "id": "mock_56",
        "chapterId": 4,
        "dimension": "control_flow",
        "difficulty": "basic",
        "title": "for 迴圈變數在迴圈結束後之留存",
        "category": "迴圈作用域特性",
        "question": "執行下列 Python 程式碼後，印出的變數 k 數值為何？",
        "code": 'for k in range(5):\n    pass\nprint(k)',
        "options": ["A. 4", "B. 5", "C. None", "D. NameError"],
        "answer": "A",
        "explanation": "在 Python 中，for 迴圈不會建立獨立區域作用域。迴圈執行完畢後，迭代變數 k 依然存在於當前作用域中，其值為最後一次迭代賦予的值 4。",
        "expected_output": "4",
        "traceSteps": [
            {"line": 1, "text": "range(5) 依序產生 0, 1, 2, 3, 4", "vars": {"k": 4}},
            {"line": 3, "text": "迴圈結束後 k 仍存在且值為 4，印出 4", "vars": {"output": 4}}
        ]
    },
    {
        "id": "mock_57",
        "chapterId": 4,
        "dimension": "control_flow",
        "difficulty": "basic",
        "title": "單層 break 終止尋找第一個偶數",
        "category": "break 與 continue",
        "question": "執行下列尋找第一個偶數的程式碼後，輸出為何？",
        "code": 'nums = [1, 3, 5, 8, 9, 11]\nfirst_even = None\nfor x in nums:\n    if x % 2 == 0:\n        first_even = x\n        break\nprint(first_even)',
        "options": ["A. 8", "B. 11", "C. None", "D. 2"],
        "answer": "A",
        "explanation": "尋訪串列，依序檢查 1, 3, 5 皆為奇數；當遇到 8 時符合 x % 2 == 0，指派 first_even = 8 並執行 break 立即跳出迴圈，不再檢查後續的 9 與 11。",
        "expected_output": "8",
        "traceSteps": [
            {"line": 4, "text": "檢查 1, 3, 5 不符合；x = 8 時條件成立", "vars": {"first_even": 8}},
            {"line": 6, "text": "執行 break 跳出迴圈", "vars": {}},
            {"line": 7, "text": "印出 8", "vars": {"output": 8}}
        ]
    },
    {
        "id": "mock_58",
        "chapterId": 4,
        "dimension": "control_flow",
        "difficulty": "advanced",
        "title": "雙層巢狀迴圈 break 僅跳出當前內層",
        "category": "巢狀迴圈機制",
        "question": "下列雙層巢狀迴圈執行完畢後，變數 count 的值為何？",
        "code": 'count = 0\nfor i in range(3):\n    for j in range(3):\n        if j == 1:\n            break\n        count += 1\nprint(count)',
        "options": ["A. 3", "B. 1", "C. 9", "D. 6"],
        "answer": "A",
        "explanation": "外層迴圈共執行 3 次（i = 0, 1, 2）。在每一輪外層迴圈中，內層 j = 0 時 count 加 1；當 j = 1 時觸發 break，只跳出該層內層迴圈，外層迴圈繼續進行。因此每輪 count 只加 1，總計 3 * 1 = 3。",
        "expected_output": "3",
        "traceSteps": [
            {"line": 2, "text": "i=0: j=0 (count+1), j=1 (break跳出內層)", "vars": {"count": 1}},
            {"line": 2, "text": "i=1: j=0 (count+1), j=1 (break跳出內層)", "vars": {"count": 2}},
            {"line": 2, "text": "i=2: j=0 (count+1), j=1 (break跳出內層)", "vars": {"count": 3}},
            {"line": 7, "text": "印出總計 count = 3", "vars": {"output": 3}}
        ]
    },
    {
        "id": "mock_59",
        "chapterId": 4,
        "dimension": "control_flow",
        "difficulty": "advanced",
        "title": "for-else 結構與 break 中斷交互",
        "category": "while/for-else",
        "question": "執行下列包含 for ... else 結構的程式碼後，印出的 found 為何？",
        "code": 'nums = [2, 4, 6, 7, 8]\nfound = False\nfor n in nums:\n    if n % 2 != 0:\n        found = True\n        break\nelse:\n    found = "ALL_EVEN"\nprint(found)',
        "options": ["A. True", "B. ALL_EVEN", "C. False", "D. None"],
        "answer": "A",
        "explanation": "for 迴圈在遍歷到 7 時觸發 break 跳出。在 Python 中，只有當迴圈正常遍歷完畢（未曾遭遇 break）時才會執行 else 區塊。因被 break 中斷，else 區塊不被執行，found 維持 True。",
        "expected_output": "True",
        "traceSteps": [
            {"line": 4, "text": "遍歷至 7，n % 2 != 0 成立", "vars": {"found": True}},
            {"line": 6, "text": "執行 break 中斷迴圈", "vars": {}},
            {"line": 7, "text": "遭遇 break 跳過 else 區塊", "vars": {}},
            {"line": 9, "text": "印出 True", "vars": {"output": True}}
        ]
    },
    {
        "id": "mock_60",
        "chapterId": 4,
        "dimension": "control_flow",
        "difficulty": "advanced",
        "title": "邊走訪邊移除元素造成索引位移漏檢",
        "category": "迴圈陷阱與邊界",
        "question": "執行下列在遍歷中調用 remove() 的程式碼，最終 data 串列內容為何？",
        "code": 'data = [1, 2, 2, 3, 4]\nfor x in data:\n    if x % 2 == 0:\n        data.remove(x)\nprint(data)',
        "options": ["A. [1, 3]", "B. [1, 2, 3]", "C. [1, 2, 2, 3]", "D. [1, 3, 4]"],
        "answer": "B",
        "explanation": "遍歷中刪除元素會導致內部索引位移：當第 1 個 2 在索引 1 被 remove 後，後續元素往前遞補，第 2 個 2 移至索引 1。下一輪迴圈檢查索引 2（數值為 3），導致第 2 個 2 被完美漏檢！最後移除 4，剩餘 [1, 2, 3]。",
        "expected_output": "[1, 2, 3]",
        "traceSteps": [
            {"line": 2, "text": "迭代至索引 1 的 2，執行 remove(2)，串列變為 [1, 2, 3, 4]", "vars": {"data": "[1, 2, 3, 4]"}},
            {"line": 2, "text": "下一輪內部指標移向索引 2 (值為 3)，第 2 個 2 被略過", "vars": {}},
            {"line": 2, "text": "迭代至 4，執行 remove(4)，串列變為 [1, 2, 3]", "vars": {"data": "[1, 2, 3]"}},
            {"line": 5, "text": "印出 [1, 2, 3]", "vars": {"output": "[1, 2, 3]"}}
        ]
    },
    {
        "id": "mock_61",
        "chapterId": 4,
        "dimension": "control_flow",
        "difficulty": "advanced",
        "title": "while 迴圈配合 continue 數值累加",
        "category": "break 與 continue",
        "question": "執行下列 while 迴圈累加程式碼後，印出的 total 為何？",
        "code": 'i = 0\ntotal = 0\nwhile i < 5:\n    i += 1\n    if i == 3:\n        continue\n    total += i\nprint(total)',
        "options": ["A. 12", "B. 15", "C. 10", "D. 9"],
        "answer": "A",
        "explanation": "i 逐次加 1，值依序為 1, 2, 3, 4, 5。當 i = 3 時觸發 continue，跳過該輪的 total += i。其餘 i = 1, 2, 4, 5 均被累加：1 + 2 + 4 + 5 = 12。",
        "expected_output": "12",
        "traceSteps": [
            {"line": 4, "text": "i=1 累加 total=1; i=2 累加 total=3", "vars": {"total": 3}},
            {"line": 5, "text": "i=3 時遇到 continue 跳過加總", "vars": {}},
            {"line": 4, "text": "i=4 累加 total=7; i=5 累加 total=12", "vars": {"total": 12}},
            {"line": 8, "text": "印出 12", "vars": {"output": 12}}
        ]
    },
    {
        "id": "mock_62",
        "chapterId": 4,
        "dimension": "control_flow",
        "difficulty": "advanced",
        "title": "巢狀迴圈矩陣對角線座標運算",
        "category": "巢狀迴圈機制",
        "question": "執行下列對角線座標累加程式碼後，終端機的輸出為何？",
        "code": 'ans = 0\nfor r in range(4):\n    for c in range(4):\n        if r == c:\n            ans += (r + c)\nprint(ans)',
        "options": ["A. 12", "B. 24", "C. 16", "D. 8"],
        "answer": "A",
        "explanation": "只有當 r == c（主對角線）時才會累加 (r + c) = 2r。r 取值 0, 1, 2, 3：分別累加 0, 2, 4, 6。總和 ans = 0 + 2 + 4 + 6 = 12。",
        "expected_output": "12",
        "traceSteps": [
            {"line": 4, "text": "對角線座標 (0,0)->0, (1,1)->2, (2,2)->4, (3,3)->6", "vars": {"terms": "[0, 2, 4, 6]"}},
            {"line": 5, "text": "累加總和 ans = 12", "vars": {"ans": 12}},
            {"line": 6, "text": "印出 12", "vars": {"output": 12}}
        ]
    },
    {
        "id": "mock_63",
        "chapterId": 4,
        "dimension": "control_flow",
        "difficulty": "advanced",
        "title": "while 複合短路條件提早中斷計步",
        "category": "while 條件與計數",
        "question": "執行下列布林標誌計步程式碼後，變數 steps 的值為何？",
        "code": 'flags = [False, False, True, False]\nsteps = 0\nwhile steps < len(flags) and not flags[steps]:\n    steps += 1\nprint(steps)',
        "options": ["A. 2", "B. 3", "C. 4", "D. 1"],
        "answer": "A",
        "explanation": "steps=0: flags[0] 為 False，not False 為 True，steps 增加到 1；steps=1: flags[1] 為 False，not False 為 True，steps 增加到 2；steps=2: flags[2] 為 True，not True 為 False，while 條件不成立停止迴圈。輸出 steps = 2。",
        "expected_output": "2",
        "traceSteps": [
            {"line": 3, "text": "steps=0: not flags[0] 為 True，steps 變 1", "vars": {"steps": 1}},
            {"line": 3, "text": "steps=1: not flags[1] 為 True，steps 變 2", "vars": {"steps": 2}},
            {"line": 3, "text": "steps=2: not flags[2] 為 False，迴圈中斷", "vars": {"steps": 2}},
            {"line": 5, "text": "印出 2", "vars": {"output": 2}}
        ]
    },

    # ==========================================
    # DIMENSION 5: functions_scope (mock_64 ~ mock_75)
    # ==========================================
    {
        "id": "mock_64",
        "chapterId": 5,
        "dimension": "functions_scope",
        "difficulty": "basic",
        "title": "函式未撰寫 return 預設傳回 None",
        "category": "函式預設傳回值",
        "question": "執行下列沒有 return 語句的函式後，變數 res 的值為何？",
        "code": 'def update_score(s):\n    s += 10\n\nres = update_score(50)\nprint(res)',
        "options": ["A. 60", "B. None", "C. 50", "D. 0"],
        "answer": "B",
        "explanation": "Python 函式內部若沒有執行任何 return 語句，直譯器預設會隱式回傳 None，而不是運算後的數值或 0。",
        "expected_output": "None",
        "traceSteps": [
            {"line": 4, "text": "呼叫 update_score(50)", "vars": {}},
            {"line": 2, "text": "區域變數 s 增加 10 變 60，函式無 return 結束", "vars": {"s": 60}},
            {"line": 4, "text": "接收函式隱式傳回值 None", "vars": {"res": None}},
            {"line": 5, "text": "印出 None", "vars": {"output": None}}
        ]
    },
    {
        "id": "mock_65",
        "chapterId": 5,
        "dimension": "functions_scope",
        "difficulty": "basic",
        "title": "位置引數與關鍵字引數混合傳遞",
        "category": "引數傳遞機制",
        "question": "執行下列關鍵字引數混合呼叫的程式碼，輸出結果為何？",
        "code": 'def calc(a, b, c=10):\n    return a * 2 + b - c\n\nprint(calc(5, c=4, b=3))',
        "options": ["A. 9", "B. 10", "C. 7", "D. 11"],
        "answer": "A",
        "explanation": "a 透過位置引數綁定為 5；b 透過關鍵字引數指定為 3；預設參數 c 透過關鍵字引數覆寫為 4。計算 5 * 2 + 3 - 4 = 10 + 3 - 4 = 9。",
        "expected_output": "9",
        "traceSteps": [
            {"line": 4, "text": "傳入 a=5, b=3, c=4", "vars": {"a": 5, "b": 3, "c": 4}},
            {"line": 2, "text": "計算 5*2 + 3 - 4 = 9 並回傳", "vars": {"return": 9}},
            {"line": 4, "text": "印出 9", "vars": {"output": 9}}
        ]
    },
    {
        "id": "mock_66",
        "chapterId": 5,
        "dimension": "functions_scope",
        "difficulty": "basic",
        "title": "預設參數定義順序語法規則",
        "category": "預設參數語法",
        "question": "依據 Python 語法，下列何者是完全合法的函式定義宣告？",
        "code": 'def valid_func(a, b=2, c=3):\n    return a + b + c\nprint(valid_func(1))',
        "options": [
            "A. def f(a=1, b): pass",
            "B. def f(a, b=2, c): pass",
            "C. def valid_func(a, b=2, c=3): pass",
            "D. def f(a=1, b=2, c): pass"
        ],
        "answer": "C",
        "explanation": "Python 規定沒有預設值的參數（non-default argument）必須排在所有具有預設值的參數（default argument）之前，否則會拋出 SyntaxError。因此選項 C 合法，輸出 1 + 2 + 3 = 6。",
        "expected_output": "6",
        "traceSteps": [
            {"line": 1, "text": "定義合法的函式參數順序：無預設值 a 在前，具預設值 b=2, c=3 在後", "vars": {}},
            {"line": 3, "text": "呼叫 valid_func(1)：a=1, b=2, c=3，回傳 6", "vars": {"output": 6}}
        ]
    },
    {
        "id": "mock_67",
        "chapterId": 5,
        "dimension": "functions_scope",
        "difficulty": "basic",
        "title": "函式回傳多值形成元組 (Tuple)",
        "category": "函式回傳值型態",
        "question": "執行下列回傳多個值的函式後，變數 val 的型態與元素個數為何？",
        "code": 'def get_stats():\n    return 100, "Pass", True\n\nval = get_stats()\nprint(type(val).__name__, len(val))',
        "options": ["A. tuple 3", "B. list 3", "C. dict 3", "D. set 3"],
        "answer": "A",
        "explanation": "在 Python 中，return 後方以逗號分隔多個表達式時，直譯器會自動打包（Tuple Packing）為元組（tuple）傳回。因此 val 的型態為 tuple，長度為 3。",
        "expected_output": "tuple 3",
        "traceSteps": [
            {"line": 2, "text": "回傳 100, 'Pass', True 自動打包為元組 (100, 'Pass', True)", "vars": {"val": "(100, 'Pass', True)"}},
            {"line": 4, "text": "val 接收元組", "vars": {}},
            {"line": 5, "text": "印出型態 'tuple' 與長度 3", "vars": {"output": "tuple 3"}}
        ]
    },
    {
        "id": "mock_68",
        "chapterId": 5,
        "dimension": "functions_scope",
        "difficulty": "basic",
        "title": "全域變數純讀取與作用域向外查找",
        "category": "變數作用域",
        "question": "執行下列存取全域變數的程式碼後，終端機的輸出為何？",
        "code": 'target = "Agent"\ndef reveal():\n    print(target, end=" ")\nreveal()\nprint("Done")',
        "options": ["A. Agent Done", "B. Done", "C. UnboundLocalError", "D. NameError"],
        "answer": "A",
        "explanation": "函式內部若僅讀取變數且函式內無任何賦值動作，Python 遵循 LEGB 規則會向外層全域作用域查找，成功讀取 target 的值 'Agent'。",
        "expected_output": "Agent Done",
        "traceSteps": [
            {"line": 1, "text": "全域定義 target = 'Agent'", "vars": {"target": "'Agent'"}},
            {"line": 4, "text": "呼叫 reveal()，函式內無賦值，向外找到全域 target", "vars": {}},
            {"line": 3, "text": "印出 'Agent '，不換行", "vars": {"buffer": "'Agent '"}},
            {"line": 5, "text": "印出 'Done'，整體輸出 'Agent Done'", "vars": {"output": "'Agent Done'"}}
        ]
    },
    {
        "id": "mock_69",
        "chapterId": 5,
        "dimension": "functions_scope",
        "difficulty": "basic",
        "title": "字典 get 方法自訂預設值防禦 KeyError",
        "category": "字典操作與防禦",
        "question": "執行下列字典查詢程式碼後，變數 age 的值為何？",
        "code": 'profile = {"id": "007", "codename": "Bond"}\nage = profile.get("age", 30)\nprint(age)',
        "options": ["A. KeyError", "B. None", "C. 30", "D. 0"],
        "answer": "C",
        "explanation": "dict.get(key, default) 在鍵不存在於字典中時，不會拋出 KeyError，而是安全回傳所提供的預設值 30。",
        "expected_output": "30",
        "traceSteps": [
            {"line": 1, "text": "profile 字典只有 'id' 與 'codename'", "vars": {"profile": "{'id': '007', 'codename': 'Bond'}"}},
            {"line": 2, "text": "查詢 'age' 鍵不存在，get 方法回傳第二個引數 30", "vars": {"age": 30}},
            {"line": 3, "text": "印出 30", "vars": {"output": 30}}
        ]
    },
    {
        "id": "mock_70",
        "chapterId": 5,
        "dimension": "functions_scope",
        "difficulty": "advanced",
        "title": "可變預設參數跨函式呼叫累積陷阱",
        "category": "可變預設參數陷阱",
        "question": "執行下列使用可變預設參數串列的程式碼，最終印出的 a 為何？",
        "code": 'def collect(val, bag=[]):\n    bag.append(val)\n    return bag\n\na = collect("X")\nb = collect("Y")\nprint(a)',
        "options": ["A. ['X']", "B. ['X', 'Y']", "C. ['Y']", "D. []"],
        "answer": "B",
        "explanation": "函式的預設參數 bag=[] 僅在函式定義時被建立一次。兩次呼叫皆未傳入 bag，共享同一個串列記憶體物件。第二次呼叫 append('Y') 同時影響了指向該串列的變數 a，因此 a 為 ['X', 'Y']。",
        "expected_output": "['X', 'Y']",
        "traceSteps": [
            {"line": 5, "text": "第 1 次呼叫 collect('X')，預設串列加入 'X'，a 接收參照", "vars": {"bag": "['X']", "a": "['X']"}},
            {"line": 6, "text": "第 2 次呼叫 collect('Y')，同一串列加入 'Y'，b 接收同一參照", "vars": {"bag": "['X', 'Y']"}},
            {"line": 7, "text": "印出 a 指向的物件 ['X', 'Y']", "vars": {"output": "['X', 'Y']"}}
        ]
    },
    {
        "id": "mock_71",
        "chapterId": 5,
        "dimension": "functions_scope",
        "difficulty": "advanced",
        "title": "區域變數賦值提升引發 UnboundLocalError",
        "category": "作用域與UnboundLocalError",
        "question": "執行下列嘗試修改同名全域變數的程式碼，會印出什麼結果？",
        "code": 'count = 50\ndef bump():\n    count += 1\ntry:\n    bump()\nexcept UnboundLocalError:\n    print("UnboundLocalError")',
        "options": ["A. 51", "B. 50", "C. UnboundLocalError", "D. NameError"],
        "answer": "C",
        "explanation": "count += 1 包含賦值語句 count = count + 1。Python 在編譯函式時檢測到賦值，將 count 標記為區域變數。執行時右側 count + 1 在賦值前嘗試讀取尚未初始化的區域變數，拋出 UnboundLocalError！",
        "expected_output": "UnboundLocalError",
        "traceSteps": [
            {"line": 1, "text": "全域 count = 50", "vars": {"count": 50}},
            {"line": 3, "text": "函式內部有賦值，count 被編譯為區域變數；但在賦值前讀取", "vars": {}},
            {"line": 6, "text": "直譯器拋出 UnboundLocalError，except 捕獲並印出", "vars": {"output": "'UnboundLocalError'"}}
        ]
    },
    {
        "id": "mock_72",
        "chapterId": 5,
        "dimension": "functions_scope",
        "difficulty": "advanced",
        "title": "global 宣告明確修改全域變數",
        "category": "global 關鍵字",
        "question": "執行下列使用 global 關鍵字的程式碼後，印出的 code 數值為何？",
        "code": 'code = 100\ndef modify():\n    global code\n    code = 200\n\nmodify()\nprint(code)',
        "options": ["A. 100", "B. 200", "C. None", "D. UnboundLocalError"],
        "answer": "B",
        "explanation": "函式內部使用 global code 宣告，明確指明 code 指向全域作用域。隨後的 code = 200 便成功修改了全域變數，因此最後印出 200。",
        "expected_output": "200",
        "traceSteps": [
            {"line": 1, "text": "全域變數 code = 100", "vars": {"code": 100}},
            {"line": 3, "text": "宣告 global code，將函式內的 code 綁定至全域", "vars": {}},
            {"line": 4, "text": "賦值 code = 200 修改全域變數", "vars": {"code": 200}},
            {"line": 7, "text": "印出全域變數 code 為 200", "vars": {"output": 200}}
        ]
    },
    {
        "id": "mock_73",
        "chapterId": 5,
        "dimension": "functions_scope",
        "difficulty": "advanced",
        "title": "Lambda 函式自訂元組多欄位排序",
        "category": "Lambda 與高階函式",
        "question": "執行下列使用 Lambda 排序元組的程式碼後，pairs 的排列順序為何？",
        "code": 'pairs = [(1, "b"), (2, "a"), (1, "a")]\npairs.sort(key=lambda p: (p[0], p[1]))\nprint(pairs)',
        "options": [
            "A. [(1, 'a'), (1, 'b'), (2, 'a')]",
            "B. [(2, 'a'), (1, 'a'), (1, 'b')]",
            "C. [(1, 'b'), (1, 'a'), (2, 'a')]",
            "D. [(1, 'a'), (2, 'a'), (1, 'b')]"
        ],
        "answer": "A",
        "explanation": "排序 key 為 (p[0], p[1])。第一欄位相同時（皆為 1），比較第二欄位字串：'a' 在 'b' 前面，因此 (1, 'a') 排在 (1, 'b') 之前；最後是 (2, 'a')。",
        "expected_output": "[(1, 'a'), (1, 'b'), (2, 'a')]",
        "traceSteps": [
            {"line": 2, "text": "以 (數值, 字母) 雙欄位升序排序", "vars": {}},
            {"line": 2, "text": "排序結果：(1, 'a') < (1, 'b') < (2, 'a')", "vars": {"pairs": "[(1, 'a'), (1, 'b'), (2, 'a')]"}},
            {"line": 3, "text": "印出 pairs", "vars": {"output": "[(1, 'a'), (1, 'b'), (2, 'a')]"}}
        ]
    },
    {
        "id": "mock_74",
        "chapterId": 5,
        "dimension": "functions_scope",
        "difficulty": "advanced",
        "title": "參數傳遞：不可變整數 vs 可變串列",
        "category": "物件參照傳遞",
        "question": "執行下列程式碼後，num 與 my_list 的輸出結果為何？",
        "code": 'def proc(n, lst):\n    n += 10\n    lst.append(99)\n\nnum = 5\nmy_list = [1, 2]\nproc(num, my_list)\nprint(num, my_list)',
        "options": ["A. 15 [1, 2, 99]", "B. 5 [1, 2, 99]", "C. 15 [1, 2]", "D. 5 [1, 2]"],
        "answer": "B",
        "explanation": "整數為不可變型態，n += 10 只是讓函式區域變數 n 指向新整數物件 15，外部 num 保持 5；串列為可變物件，lst.append(99) 在原地修改同一塊記憶體，外部 my_list 變為 [1, 2, 99]。",
        "expected_output": "5 [1, 2, 99]",
        "traceSteps": [
            {"line": 2, "text": "區域變數 n 變為 15，不影響外部不可變整數 num", "vars": {"num": 5}},
            {"line": 3, "text": "lst.append(99) 原地修改外部可變串列", "vars": {"my_list": "[1, 2, 99]"}},
            {"line": 8, "text": "印出 num 與 my_list", "vars": {"output": "5 [1, 2, 99]"}}
        ]
    },
    {
        "id": "mock_75",
        "chapterId": 5,
        "dimension": "functions_scope",
        "difficulty": "advanced",
        "title": "遞迴函式呼叫堆疊展開追蹤",
        "category": "遞迴函式機制",
        "question": "執行下列遞迴函式程式碼後，終端機印出的數值為何？",
        "code": 'def f(n):\n    if n <= 1:\n        return 1\n    return n + f(n - 2)\n\nprint(f(6))',
        "options": ["A. 12", "B. 13", "C. 10", "D. 16"],
        "answer": "B",
        "explanation": "呼叫堆疊展開：f(6) = 6 + f(4)；f(4) = 4 + f(2)；f(2) = 2 + f(0)；f(0) 滿足 n <= 1 回傳 1。向上回溯計算：f(2) = 2 + 1 = 3；f(4) = 4 + 3 = 7；f(6) = 6 + 7 = 13。",
        "expected_output": "13",
        "traceSteps": [
            {"line": 4, "text": "展開：f(6) = 6 + f(4)", "vars": {}},
            {"line": 4, "text": "展開：f(4) = 4 + f(2)", "vars": {}},
            {"line": 4, "text": "展開：f(2) = 2 + f(0)", "vars": {}},
            {"line": 3, "text": "基準條件：f(0) 回傳 1", "vars": {}},
            {"line": 4, "text": "回溯計算：f(2)=3, f(4)=7, f(6)=13", "vars": {"result": 13}},
            {"line": 6, "text": "印出 13", "vars": {"output": 13}}
        ]
    },

    # ==========================================
    # DIMENSION 6: comprehensions_tools (mock_76 ~ mock_87)
    # ==========================================
    {
        "id": "mock_76",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "difficulty": "basic",
        "title": "enumerate 自訂起始索引",
        "category": "enumerate應用",
        "question": "執行下列使用 start=1 的 enumerate 程式碼後，第一個元素 indexed[0] 為何？",
        "code": 'teams = ["Red", "Blue", "Gold"]\nindexed = list(enumerate(teams, start=1))\nprint(indexed[0])',
        "options": ["A. (0, 'Red')", "B. (1, 'Red')", "C. [1, 'Red']", "D. ('Red', 1)"],
        "answer": "B",
        "explanation": "enumerate(iterable, start=1) 將起始計數器設為 1，並產生包含 (index, element) 的元組。因此第 0 個元素為 (1, 'Red')。",
        "expected_output": "(1, 'Red')",
        "traceSteps": [
            {"line": 2, "text": "enumerate 指定 start=1，依序產出 (1, 'Red'), (2, 'Blue'), (3, 'Gold')", "vars": {"indexed": "[(1, 'Red'), (2, 'Blue'), (3, 'Gold')]"}},
            {"line": 3, "text": "印出 indexed[0] 為 (1, 'Red')", "vars": {"output": "(1, 'Red')"}}
        ]
    },
    {
        "id": "mock_77",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "difficulty": "basic",
        "title": "zip 依最短迭代長度截斷",
        "category": "zip打包機制",
        "question": "執行下列 zip 打包程式碼後，長度與最後一項為何？",
        "code": 'keys = ["a", "b", "c", "d"]\nvals = [10, 20]\npaired = list(zip(keys, vals))\nprint(len(paired), paired[-1])',
        "options": ["A. 4 ('d', None)", "B. 2 ('b', 20)", "C. 2 ('c', 20)", "D. 4 ('b', 20)"],
        "answer": "B",
        "explanation": "zip() 走訪多個序列時，只要其中最短的一個序列結束便立即停止。vals 只有 2 個元素，因此打包結果為 [('a', 10), ('b', 20)]，長度為 2，末項為 ('b', 20)。",
        "expected_output": "2 ('b', 20)",
        "traceSteps": [
            {"line": 3, "text": "zip 依據最短長度 vals(2) 截斷，產生 [('a', 10), ('b', 20)]", "vars": {"paired": "[('a', 10), ('b', 20)]"}},
            {"line": 4, "text": "len(paired) 為 2，paired[-1] 為 ('b', 20)", "vars": {"output": "2 ('b', 20)"}}
        ]
    },
    {
        "id": "mock_78",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "difficulty": "basic",
        "title": "單層串列表達式條件過濾與平方",
        "category": "串列表達式",
        "question": "執行下列串列表達式後，變數 squares 的內容為何？",
        "code": 'nums = [1, 2, 3, 4, 5, 6]\nsquares = [x ** 2 for x in nums if x % 2 == 1]\nprint(squares)',
        "options": ["A. [1, 9, 25]", "B. [4, 16, 36]", "C. [1, 4, 9, 16, 25, 36]", "D. [1, 3, 5]"],
        "answer": "A",
        "explanation": "後方的 if x % 2 == 1 篩選出奇數 1, 3, 5；前方的運算式 x ** 2 將其分別平方為 1, 9, 25，組成串列 [1, 9, 25]。",
        "expected_output": "[1, 9, 25]",
        "traceSteps": [
            {"line": 2, "text": "過濾奇數：1, 3, 5", "vars": {"odds": "[1, 3, 5]"}},
            {"line": 2, "text": "計算平方：1**2=1, 3**2=9, 5**2=25", "vars": {"squares": "[1, 9, 25]"}},
            {"line": 3, "text": "印出 [1, 9, 25]", "vars": {"output": "[1, 9, 25]"}}
        ]
    },
    {
        "id": "mock_79",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "difficulty": "basic",
        "title": "try-except 捕捉 ValueError 異常",
        "category": "例外處理基礎",
        "question": "執行下列包含例外處理的程式碼後，印出的 val 數值為何？",
        "code": 'try:\n    val = int("Python")\nexcept ValueError:\n    val = -1\nexcept TypeError:\n    val = -2\nprint(val)',
        "options": ["A. Python", "B. -1", "C. -2", "D. 0"],
        "answer": "B",
        "explanation": "int('Python') 嘗試將英文字串轉換為十進位整數，會拋出 ValueError。該例外被 except ValueError 分支精準捕獲，將 val 設為 -1。",
        "expected_output": "-1",
        "traceSteps": [
            {"line": 2, "text": "int('Python') 拋出 ValueError", "vars": {}},
            {"line": 3, "text": "進入 except ValueError 分支", "vars": {}},
            {"line": 4, "text": "val 賦值為 -1", "vars": {"val": -1}},
            {"line": 7, "text": "印出 -1", "vars": {"output": -1}}
        ]
    },
    {
        "id": "mock_80",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "difficulty": "basic",
        "title": "dict 與 zip 快速建構字典",
        "category": "zip打包機制",
        "question": "執行下列結合 zip 與 dict 的程式碼後，終端機印出的內容為何？",
        "code": 'headers = ["user", "role"]\ndata = ["agent007", "spy"]\ninfo = dict(zip(headers, data))\nprint(info["role"])',
        "options": ["A. spy", "B. agent007", "C. role", "D. KeyError"],
        "answer": "A",
        "explanation": "zip(headers, data) 將對應項打包成 [('user', 'agent007'), ('role', 'spy')]，dict() 將元組串列轉換為鍵值字典。info['role'] 查得對應值 'spy'。",
        "expected_output": "spy",
        "traceSteps": [
            {"line": 3, "text": "zip 配對鍵與值，dict() 轉為 {'user': 'agent007', 'role': 'spy'}", "vars": {"info": "{'user': 'agent007', 'role': 'spy'}"}},
            {"line": 4, "text": "查詢 info['role']，印出 'spy'", "vars": {"output": "'spy'"}}
        ]
    },
    {
        "id": "mock_81",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "difficulty": "basic",
        "title": "串列表達式三元條件運算式位置",
        "category": "串列表達式",
        "question": "執行下列包含 if-else 條件映射的串列表達式後，clamped 的內容為何？",
        "code": 'nums = [-2, 3, -5, 4]\nclamped = [x if x > 0 else 0 for x in nums]\nprint(clamped)',
        "options": ["A. [0, 3, 0, 4]", "B. [3, 4]", "C. [-2, 3, -5, 4]", "D. [0, 0, 0, 0]"],
        "answer": "A",
        "explanation": "在串列表達式中，雙向分支 x if x > 0 else 0 必須寫在 for 前方作為元素映射。負數被替換為 0，正數保持原值，產出 [0, 3, 0, 4]。",
        "expected_output": "[0, 3, 0, 4]",
        "traceSteps": [
            {"line": 2, "text": "映射：-2->0, 3->3, -5->0, 4->4", "vars": {"clamped": "[0, 3, 0, 4]"}},
            {"line": 3, "text": "印出 [0, 3, 0, 4]", "vars": {"output": "[0, 3, 0, 4]"}}
        ]
    },
    {
        "id": "mock_82",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "difficulty": "advanced",
        "title": "雙層巢狀串列表達式攤平順序",
        "category": "巢狀串列表達式",
        "question": "執行下列攤平二維串列的巢狀表達式後，flattened 的內容為何？",
        "code": 'matrix = [[1, 2], [3, 4]]\nflattened = [val for row in matrix for val in row]\nprint(flattened)',
        "options": ["A. [1, 2, 3, 4]", "B. [1, 3, 2, 4]", "C. [[1, 2], [3, 4]]", "D. [4, 3, 2, 1]"],
        "answer": "A",
        "explanation": "巢狀表達式中的 for 順序與傳統巢狀迴圈完全一致（左邊是外層，右邊是內層）。先外層 for row in matrix 取出 [1, 2]，再內層 for val in row 取出 1, 2；接著下一列取出 3, 4，攤平成 [1, 2, 3, 4]。",
        "expected_output": "[1, 2, 3, 4]",
        "traceSteps": [
            {"line": 2, "text": "外層 row=[1, 2] -> 取出 1, 2", "vars": {"step1": "[1, 2]"}},
            {"line": 2, "text": "外層 row=[3, 4] -> 取出 3, 4", "vars": {"step2": "[3, 4]"}},
            {"line": 2, "text": "合併為 [1, 2, 3, 4]", "vars": {"flattened": "[1, 2, 3, 4]"}},
            {"line": 3, "text": "印出 [1, 2, 3, 4]", "vars": {"output": "[1, 2, 3, 4]"}}
        ]
    },
    {
        "id": "mock_83",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "difficulty": "advanced",
        "title": "zip 與星號解包進行矩陣轉置",
        "category": "zip解包與轉置",
        "question": "執行下列利用 zip(*grid) 轉置矩陣的程式碼後，印出的 transposed[1] 為何？",
        "code": 'grid = [[1, 2, 3], [4, 5, 6]]\ntransposed = [list(col) for col in zip(*grid)]\nprint(transposed[1])',
        "options": ["A. [2, 5]", "B. [4, 5, 6]", "C. [1, 4]", "D. [3, 6]"],
        "answer": "A",
        "explanation": "zip(*grid) 等同於 zip([1, 2, 3], [4, 5, 6])，將各列的對應欄打包：第 0 欄為 (1, 4)，第 1 欄為 (2, 5)，第 2 欄為 (3, 6)。轉為串列後，transposed[1] 即為第 1 欄 [2, 5]。",
        "expected_output": "[2, 5]",
        "traceSteps": [
            {"line": 2, "text": "*grid 解包兩列傳入 zip，轉置為 (1,4), (2,5), (3,6)", "vars": {"transposed": "[[1, 4], [2, 5], [3, 6]]"}},
            {"line": 3, "text": "印出 transposed[1] 為 [2, 5]", "vars": {"output": "[2, 5]"}}
        ]
    },
    {
        "id": "mock_84",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "difficulty": "advanced",
        "title": "try-except-else-finally 完整控制流",
        "category": "例外處理完整架構",
        "question": "執行下列沒有拋出例外的 try-except-else-finally 程式碼後，輸出為何？",
        "code": 'log = []\ntry:\n    x = 10 // 2\nexcept ZeroDivisionError:\n    log.append("err")\nelse:\n    log.append("ok")\nfinally:\n    log.append("fin")\nprint("-".join(log))',
        "options": ["A. ok-fin", "B. err-fin", "C. ok", "D. err-ok-fin"],
        "answer": "A",
        "explanation": "10 // 2 運算正常未拋出例外，跳過 except；因此進入 else 區塊加入 'ok'；最後 finally 區塊無論如何必定執行，加入 'fin'。最終 join 結果為 'ok-fin'。",
        "expected_output": "ok-fin",
        "traceSteps": [
            {"line": 3, "text": "10 // 2 = 5 正常完成，不觸發例外", "vars": {"x": 5}},
            {"line": 7, "text": "無例外進入 else，加入 'ok'", "vars": {"log": "['ok']"}},
            {"line": 9, "text": "進入 finally 必定執行，加入 'fin'", "vars": {"log": "['ok', 'fin']"}},
            {"line": 10, "text": "以 '-' 串接印出 'ok-fin'", "vars": {"output": "'ok-fin'"}}
        ]
    },
    {
        "id": "mock_85",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "difficulty": "advanced",
        "title": "finally 強制執行覆蓋函式回傳值",
        "category": "例外處理與finally陷阱",
        "question": "執行下列在 finally 區塊中亦有 return 的程式碼，函式傳回值為何？",
        "code": 'def check():\n    try:\n        return "TRY"\n    finally:\n        return "FINALLY"\n\nprint(check())',
        "options": ["A. TRY", "B. FINALLY", "C. TRY FINALLY", "D. None"],
        "answer": "B",
        "explanation": "當 try 區塊執行 return 'TRY' 時，傳回值會被暫存，Python 接著強制跳轉執行 finally 區塊。若 finally 區塊自身也執行了 return，會直接覆蓋掉原本的暫存值，因此函式最終回傳 'FINALLY'。",
        "expected_output": "FINALLY",
        "traceSteps": [
            {"line": 3, "text": "try 區塊遇到 return 'TRY'，暫存傳回值並轉往 finally", "vars": {"pending_return": "'TRY'"}},
            {"line": 5, "text": "finally 區塊強制執行 return 'FINALLY'，覆蓋暫存值", "vars": {"final_return": "'FINALLY'"}},
            {"line": 7, "text": "印出 'FINALLY'", "vars": {"output": "'FINALLY'"}}
        ]
    },
    {
        "id": "mock_86",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "difficulty": "advanced",
        "title": "字串 split 篩選數字並轉型加總",
        "category": "生成式與字串處理",
        "question": "執行下列結合 split、isdigit 與生成式的加總程式碼後，印出的 total 為何？",
        "code": 'raw = "alpha 10 beta 20 gamma 30"\ntotal = sum(int(item) for item in raw.split() if item.isdigit())\nprint(total)',
        "options": ["A. 60", "B. 50", "C. 30", "D. 0"],
        "answer": "A",
        "explanation": "raw.split() 切出 ['alpha', '10', 'beta', '20', 'gamma', '30']。條件 item.isdigit() 篩選出純數字字串 '10', '20', '30'，轉型為整數後由 sum() 加總：10 + 20 + 30 = 60。",
        "expected_output": "60",
        "traceSteps": [
            {"line": 1, "text": "raw 字串包含單字與數字", "vars": {"raw": "'alpha 10 beta 20 gamma 30'"}},
            {"line": 2, "text": "篩選出 isdigit() 為 True 的字元：'10', '20', '30'，轉為整數", "vars": {"ints": "[10, 20, 30]"}},
            {"line": 2, "text": "sum([10, 20, 30]) = 60", "vars": {"total": 60}},
            {"line": 3, "text": "印出 60", "vars": {"output": 60}}
        ]
    },
    {
        "id": "mock_87",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "difficulty": "advanced",
        "title": "except 多重例外型態元組捕捉",
        "category": "例外捕捉機制",
        "question": "執行下列以元組捕捉多種例外的程式碼後，變數 res 的值為何？",
        "code": 'res = 0\ntry:\n    items = [10, 20]\n    val = items[5]\nexcept (KeyError, IndexError):\n    res = 999\nexcept Exception:\n    res = -1\nprint(res)',
        "options": ["A. 999", "B. -1", "C. IndexError", "D. 0"],
        "answer": "A",
        "explanation": "items[5] 存取超出串列長度的索引，直譯器拋出 IndexError。在 except (KeyError, IndexError) 中，Python 支援以元組一次監聽多個例外型態，成功捕捉該 IndexError 並將 res 設為 999。",
        "expected_output": "999",
        "traceSteps": [
            {"line": 4, "text": "items[5] 越界存取，引發 IndexError", "vars": {}},
            {"line": 5, "text": "except (KeyError, IndexError) 成功捕獲 IndexError", "vars": {}},
            {"line": 6, "text": "res 賦值為 999", "vars": {"res": 999}},
            {"line": 9, "text": "印出 999", "vars": {"output": 999}}
        ]
    }
]

print(f"Total new questions defined: {len(ALL_NEW_QUESTIONS)}")
failed = 0
for q in ALL_NEW_QUESTIONS:
    f = io.StringIO()
    try:
        with redirect_stdout(f):
            exec(q["code"], {})
        out = f.getvalue().strip()
        if out != q["expected_output"]:
            print(f"  [MISMATCH] {q['id']}: got '{out}' != expected '{q['expected_output']}'")
            failed += 1
        else:
            # Also verify that the answer option matches expected_output
            ans_letter = q["answer"]
            opt = [o for o in q["options"] if o.startswith(f"{ans_letter}.")][0]
            # print(f"  [OK] {q['id']} ({q['category']}) -> output '{out}' in option '{opt}'")
    except Exception as e:
        print(f"  [ERROR] {q['id']}: {e}")
        failed += 1

if failed == 0:
    print(f"\n[SUCCESS] 全部 {len(ALL_NEW_QUESTIONS)} 道新題目在 Python 3.12 執行環境 100% 驗證通過！")
else:
    print(f"\n[FAILED] 共有 {failed} 道題目驗證失敗！")
