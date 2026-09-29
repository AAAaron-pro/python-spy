# -*- coding: utf-8 -*-
"""
45 道高質量原創題目定義
涵蓋 Chapter 1 ~ Chapter 6，補足各章節題數至 Basic 16 題、Advanced 16 題 (總計 192 題)
"""

NEW_45_QUESTIONS = [
    # ==================== CHAPTER 1: syntax_io (基礎語法與 I/O 規範) ====================
    # Basic (5 題): ch1_b12 ~ ch1_b16
    {
        "id": "ch1_b12",
        "chapterId": 1,
        "dimension": "syntax_io",
        "title": "round 函式與浮點數型別",
        "difficulty": "basic",
        "category": "浮點數運算與四捨五入",
        "question": "執行下列 round() 函式程式碼後，印出的型別與數值為何？",
        "code": "val = round(3.14159, 2)\nprint(type(val) == float, val)",
        "options": [
            "A. True 3.14",
            "B. True 3.142",
            "C. False 3.14",
            "D. True 3.1"
        ],
        "answer": "A",
        "explanation": "round(x, n) 函式將數值 x 四捨五入至小數點後 n 位。round(3.14159, 2) 取小數後兩位得到 3.14；其回傳值仍為 float 浮點數型別，故 type(val) == float 判定為 True。印出 True 3.14。",
        "traceSteps": [
            {"line": 1, "text": "round(3.14159, 2) 計算四捨五入取小數兩位，得 3.14", "vars": {"val": 3.14}},
            {"line": 2, "text": "type(3.14) 為 float，判定為 True，印出 True 3.14", "vars": {"output": "True 3.14"}}
        ]
    },
    {
        "id": "ch1_b13",
        "chapterId": 1,
        "dimension": "syntax_io",
        "title": "二進制與十六進制常數表示法",
        "difficulty": "basic",
        "category": "數字進制常數",
        "question": "執行下列進制常數程式碼後，印出的十進制結果為何？",
        "code": "a = 0b1010\nb = 0x1F\nprint(a, b)",
        "options": [
            "A. 10 31",
            "B. 10 15",
            "C. 1010 31",
            "D. 12 31"
        ],
        "answer": "A",
        "explanation": "在 Python 中，以 0b 開頭為二進制常數，0b1010 對應十進制 1*8 + 0*4 + 1*2 + 0*1 = 10；以 0x 開頭為十六進制常數，0x1F 對應 1*16 + 15 = 31。print 預設以十進制印出數值，因此輸出 10 31。",
        "traceSteps": [
            {"line": 1, "text": "0b1010 解析為十進制整數 10", "vars": {"a": 10}},
            {"line": 2, "text": "0x1F 解析為十進制整數 31", "vars": {"b": 31}},
            {"line": 3, "text": "印出十進制數值 10 31", "vars": {"output": "10 31"}}
        ]
    },
    {
        "id": "ch1_b14",
        "chapterId": 1,
        "dimension": "syntax_io",
        "title": "布林值數值運算特性",
        "difficulty": "basic",
        "category": "布林與整數運算",
        "question": "執行下列布林值算術運算程式碼後，輸出的數值為何？",
        "code": "res = (True + True) * (False + 3)\nprint(res)",
        "options": [
            "A. 6",
            "B. 3",
            "C. TypeError",
            "D. 0"
        ],
        "answer": "A",
        "explanation": "在 Python 中，bool 型別是 int 的子類別（subclass），True 的數值等同於整數 1，False 等同於整數 0。因此 (True + True) 等於 (1 + 1) = 2；(False + 3) 等於 (0 + 3) = 3。相乘為 2 * 3 = 6。",
        "traceSteps": [
            {"line": 1, "text": "True 轉換為數值 1，False 轉換為數值 0", "vars": {}},
            {"line": 1, "text": "計算 (1 + 1) * (0 + 3) = 2 * 3 = 6", "vars": {"res": 6}},
            {"line": 2, "text": "印出計算結果 6", "vars": {"output": 6}}
        ]
    },
    {
        "id": "ch1_b15",
        "chapterId": 1,
        "dimension": "syntax_io",
        "title": "print 函式之 sep 與 end 組合",
        "difficulty": "basic",
        "category": "print 格式控制",
        "question": "執行下列包含 sep 與 end 參數的 print 程式碼後，印出的結果為何？",
        "code": "print(\"A\", \"B\", sep=\"->\", end=\"==\")\nprint(\"C\")",
        "options": [
            "A. A->B==C",
            "B. A->B==\\nC",
            "C. A B==C",
            "D. A->B\\n==C"
        ],
        "answer": "A",
        "explanation": "第一個 print 輸出引數 'A' 與 'B'，中間由 sep='->' 連接成 'A->B'；因為設定了 end='=='，結尾不會換行，而是輸出 '=='。第二個 print('C') 緊接在後方輸出 'C' 並換行。終端機輸出完整字串為 A->B==C。",
        "traceSteps": [
            {"line": 1, "text": "輸出 'A->B' 並以 '==' 結尾（不換行）", "vars": {"buffer": "'A->B=='"}},
            {"line": 2, "text": "接續輸出 'C' 並換行", "vars": {"output": "'A->B==C'"}}
        ]
    },
    {
        "id": "ch1_b16",
        "chapterId": 1,
        "dimension": "syntax_io",
        "title": "字串轉型與複合賦值運算",
        "difficulty": "basic",
        "category": "型別轉換與賦值",
        "question": "執行下列字串轉型與複合賦值程式碼後，輸出的內容為何？",
        "code": "x = 10\nx += int(\"20\")\nprint(f\"Total: {x}\")",
        "options": [
            "A. Total: 30",
            "B. Total: 1020",
            "C. TypeError",
            "D. Total: 20"
        ],
        "answer": "A",
        "explanation": "int('20') 將字串 '20' 轉換為整數 20。接著 x += 20 等同於 x = x + 20，因此 x 變為 30。最後以格式化字串 f-string 印出 'Total: 30'。",
        "traceSteps": [
            {"line": 1, "text": "初始化 x = 10", "vars": {"x": 10}},
            {"line": 2, "text": "int('20') 得 20，x += 20 賦值後 x 變為 30", "vars": {"x": 30}},
            {"line": 3, "text": "印出格式化字串 Total: 30", "vars": {"output": "'Total: 30'"}}
        ]
    },
    # Advanced (2 題): ch1_a15, ch1_a16
    {
        "id": "ch1_a15",
        "chapterId": 1,
        "dimension": "syntax_io",
        "title": "位元 XOR 與位移運算求值",
        "difficulty": "advanced",
        "category": "位元運算子",
        "question": "執行下列位元互斥或（XOR）與左移運算程式碼後，印出的結果為何？",
        "code": "x = 5\ny = 3\nz = (x ^ y) << 1\nprint(z)",
        "options": [
            "A. 12",
            "B. 6",
            "C. 16",
            "D. 8"
        ],
        "answer": "A",
        "explanation": "x = 5（二進制 0101），y = 3（二進制 0011）。x ^ y 進行位元互斥或運算：0101 ^ 0011 = 0110（十進制 6）。接著 << 1 進行左移一位運算，相當於乘以 2 的 1 次方，6 * 2 = 12。故印出 12。",
        "traceSteps": [
            {"line": 1, "text": "x = 5 (0b0101), y = 3 (0b0011)", "vars": {"x": 5, "y": 3}},
            {"line": 3, "text": "計算 5 ^ 3 = 6 (0b0110)，接著左移 1 位 6 << 1 = 12", "vars": {"z": 12}},
            {"line": 4, "text": "印出 z 之值 12", "vars": {"output": 12}}
        ]
    },
    {
        "id": "ch1_a16",
        "chapterId": 1,
        "dimension": "syntax_io",
        "title": "負數地板除法與餘數運算規律",
        "difficulty": "advanced",
        "category": "算術運算子特性",
        "question": "執行下列包含負數的地板除法與取餘數程式碼後，印出的結果為何？",
        "code": "q = -17 // 5\nr = -17 % 5\nprint(q, r)",
        "options": [
            "A. -4 3",
            "B. -3 -2",
            "C. -3 2",
            "D. -4 -2"
        ],
        "answer": "A",
        "explanation": "Python 的地板除法 // 是向下取整（往負無限大方向取整）。-17 / 5 = -3.4，向下取整得到 -4。Python 的除法與餘數恆滿足 x = (x // y) * y + (x % y)，即 -17 = (-4) * 5 + r = -20 + r，解得 r = 3。因此輸出 -4 3。",
        "traceSteps": [
            {"line": 1, "text": "-17 // 5 向下取整得 -4", "vars": {"q": -4}},
            {"line": 2, "text": "-17 % 5 滿足 -17 = -4 * 5 + 3，餘數為 3", "vars": {"r": 3}},
            {"line": 3, "text": "輸出 q 與 r 為 -4 3", "vars": {"output": "-4 3"}}
        ]
    },

    # ==================== CHAPTER 2: strings_ascii (字串索引與 ASCII 演算) ====================
    # Basic (5 題): ch2_b12 ~ ch2_b16
    {
        "id": "ch2_b12",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "title": "strip 去除兩端空白與 upper 轉換",
        "difficulty": "basic",
        "category": "字串基本方法",
        "question": "執行下列字串 strip 與 upper 連鎖呼叫程式碼後，印出的字串為何？",
        "code": "text = \"  python code  \"\nresult = text.strip().upper()\nprint(result)",
        "options": [
            "A. PYTHON CODE",
            "B.   PYTHON CODE  ",
            "C. python code",
            "D. PYTHONCODE"
        ],
        "answer": "A",
        "explanation": "text.strip() 移除字串頭尾所有多餘的空白字元，得到中間的 'python code'（單詞間的單個空白保留）；接著呼叫 .upper() 將字母轉為全大寫，得到 'PYTHON CODE'。",
        "traceSteps": [
            {"line": 1, "text": "text = '  python code  '", "vars": {"text": "'  python code  '"}},
            {"line": 2, "text": "strip() 去除前後空格得 'python code'，upper() 轉大寫得 'PYTHON CODE'", "vars": {"result": "'PYTHON CODE'"}},
            {"line": 3, "text": "印出 result 為 PYTHON CODE", "vars": {"output": "'PYTHON CODE'"}}
        ]
    },
    {
        "id": "ch2_b13",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "title": "find 方法查詢子字串與 in 關鍵字",
        "difficulty": "basic",
        "category": "字串查詢操作",
        "question": "執行下列字串 find 方法與 in 運算子程式碼後，輸出的結果為何？",
        "code": "msg = \"cyber_agent_007\"\nidx = msg.find(\"agent\")\nprint(idx, \"agent\" in msg)",
        "options": [
            "A. 6 True",
            "B. 7 True",
            "C. 6 False",
            "D. 5 True"
        ],
        "answer": "A",
        "explanation": "msg.find('agent') 從頭搜尋子字串 'agent' 第一次出現的起始索引。字元 'c'(0), 'y'(1), 'b'(2), 'e'(3), 'r'(4), '_'(5), 'a'(6)，因此索引為 6。'agent' in msg 為成員檢查運算子，回傳 True。輸出 6 True。",
        "traceSteps": [
            {"line": 1, "text": "msg = 'cyber_agent_007'", "vars": {"msg": "'cyber_agent_007'"}},
            {"line": 2, "text": "find('agent') 找到起始索引為 6", "vars": {"idx": 6}},
            {"line": 3, "text": "'agent' 確實在 msg 中，in 運算子回傳 True，印出 6 True", "vars": {"output": "6 True"}}
        ]
    },
    {
        "id": "ch2_b14",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "title": "字串乘法重複與長度計算",
        "difficulty": "basic",
        "category": "字串序列運算",
        "question": "執行下列字串乘法與 len() 程式碼後，印出的結果為何？",
        "code": "pattern = \"-=\" * 4\nprint(pattern, len(pattern))",
        "options": [
            "A. -=-=-=-= 8",
            "B. -=-=-=-= 4",
            "C. ----==== 8",
            "D. -=-=-= 6"
        ],
        "answer": "A",
        "explanation": "字串乘法 '-=' * 4 會將長度為 2 的字串重複串接 4 次，產生 '-=-=-=-='；其總字元長度 len(pattern) 為 2 * 4 = 8。因此輸出 -=-=-=-= 8。",
        "traceSteps": [
            {"line": 1, "text": "'-=' 重複 4 次產生 '-=-=-=-='", "vars": {"pattern": "'-=-=-=-='"}},
            {"line": 2, "text": "len('-=-=-=-=') 為 8，印出 -=-=-=-= 8", "vars": {"output": "'-=-=-=-= 8'"}}
        ]
    },
    {
        "id": "ch2_b15",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "title": "ord 與 chr 雙向轉換運算",
        "difficulty": "basic",
        "category": "ASCII 編碼轉換",
        "question": "執行下列 ord 與 chr 相互轉換的運算程式碼後，印出的字元為何？",
        "code": "ch = chr(ord('a') + 3)\nprint(ch)",
        "options": [
            "A. d",
            "B. c",
            "C. e",
            "D. 100"
        ],
        "answer": "A",
        "explanation": "ord('a') 回傳小寫英文字母 'a' 的 ASCII 編碼數值 97。97 + 3 = 100。接著 chr(100) 將 ASCII 碼 100 轉回對應字元，即為 'd'（a:97, b:98, c:99, d:100）。印出 d。",
        "traceSteps": [
            {"line": 1, "text": "ord('a') 為 97，97 + 3 = 100；chr(100) 轉換為字元 'd'", "vars": {"ch": "'d'"}},
            {"line": 2, "text": "印出字元 d", "vars": {"output": "'d'"}}
        ]
    },
    {
        "id": "ch2_b16",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "title": "count 方法計算非重疊子字串",
        "difficulty": "basic",
        "category": "字串次數統計",
        "question": "執行下列字串 count() 方法程式碼後，印出的出現次數為何？",
        "code": "s = \"bananana\"\nprint(s.count(\"ana\"))",
        "options": [
            "A. 2",
            "B. 3",
            "C. 1",
            "D. 4"
        ],
        "answer": "A",
        "explanation": "Python 的 str.count(sub) 計算子字串出現次數時，採用「非重疊（non-overlapping）」原則：在 'bananana' 中，索引 1~3 匹配第一個 'ana'；接著從索引 4 開始繼續尋找，索引 5~7 匹配第二個 'ana'。因此總計出現 2 次。",
        "traceSteps": [
            {"line": 1, "text": "s = 'bananana'", "vars": {"s": "'bananana'"}},
            {"line": 2, "text": "統計非重疊 'ana' 出現次數為 2", "vars": {"output": 2}}
        ]
    },
    # Advanced (2 題): ch2_a15, ch2_a16
    {
        "id": "ch2_a15",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "title": "字串負步長切片與迴文驗證",
        "difficulty": "advanced",
        "category": "進階切片語法",
        "question": "執行下列雙冒號切片與負步長程式碼後，印出的結果為何？",
        "code": "word = \"radar\"\ncode = \"Python3\"\nprint(word == word[::-1], code[6:0:-2])",
        "options": [
            "A. True 3ht",
            "B. True 3h",
            "C. False 3htP",
            "D. True 3ty"
        ],
        "answer": "A",
        "explanation": "1. word[::-1] 步長為 -1，代表反轉字串，'radar' 反轉仍為 'radar'，word == word[::-1] 評估為 True；2. code[6:0:-2] 起點為索引 6（'3'），終點為索引 0（不包含索引 0 的 'P'），步長為 -2：取索引 6（'3'）、4（'h'）、2（'t'），得到 '3ht'。故輸出 True 3ht。",
        "traceSteps": [
            {"line": 1, "text": "word = 'radar', code = 'Python3'", "vars": {"word": "'radar'", "code": "'Python3'"}},
            {"line": 3, "text": "word[::-1] 為 'radar'，相等為 True", "vars": {"is_palindrome": True}},
            {"line": 3, "text": "code[6:0:-2] 取索引 6, 4, 2 得 '3ht'", "vars": {"sliced": "'3ht'"}},
            {"line": 3, "text": "印出 True 3ht", "vars": {"output": "True 3ht"}}
        ]
    },
    {
        "id": "ch2_a16",
        "chapterId": 2,
        "dimension": "strings_ascii",
        "title": "f-string 欄位寬度與對齊補零格式化",
        "difficulty": "advanced",
        "category": "字串格式化規範",
        "question": "執行下列包含寬度與對齊規範的 f-string 程式碼後，印出的結果為何？",
        "code": "num = 42\ntag = \"OK\"\nprint(f\"{num:05d}|{tag:>6s}\")",
        "options": [
            "A. 00042|    OK",
            "B. 42000|OK    ",
            "C. 00042|  OK  ",
            "D. 42|OK"
        ],
        "answer": "A",
        "explanation": "{num:05d} 指定十進制整數最小寬度為 5，不足位數在左側以 '0' 補滿，得到 '00042'；{tag:>6s} 指定字串最小寬度為 6 且向右對齊（>），左側補 4 個空格得到 '    OK'。以管道符號連接後輸出 00042|    OK。",
        "traceSteps": [
            {"line": 1, "text": "num = 42, tag = 'OK'", "vars": {"num": 42, "tag": "'OK'"}},
            {"line": 3, "text": "num:05d 補零得 '00042'；tag:>6s 靠右得 '    OK'", "vars": {"formatted": "'00042|    OK'"}},
            {"line": 3, "text": "輸出 00042|    OK", "vars": {"output": "'00042|    OK'"}}
        ]
    },

    # ==================== CHAPTER 3: containers_memory (容器機制與記憶體參照) ====================
    # Basic (5 題): ch3_b12 ~ ch3_b16
    {
        "id": "ch3_b12",
        "chapterId": 3,
        "dimension": "containers_memory",
        "title": "字典鍵值新增、更新與長度計算",
        "difficulty": "basic",
        "category": "字典基本操作",
        "question": "執行下列字典增改與長度計算程式碼後，印出的結果為何？",
        "code": "profile = {\"name\": \"Alice\", \"role\": \"Agent\"}\nprofile[\"role\"] = \"Leader\"\nprofile[\"level\"] = 5\nprint(len(profile), profile[\"role\"])",
        "options": [
            "A. 3 Leader",
            "B. 2 Leader",
            "C. 3 Agent",
            "D. 4 Leader"
        ],
        "answer": "A",
        "explanation": "profile['role'] = 'Leader' 會更新已有鍵 'role' 的值為 'Leader'；profile['level'] = 5 新增一對全新鍵值對。因此字典共有 'name', 'role', 'level' 3 個鍵，len(profile) 為 3。印出 3 Leader。",
        "traceSteps": [
            {"line": 1, "text": "profile 初始化包含 2 個鍵值對", "vars": {"len": 2}},
            {"line": 2, "text": "更新已有鍵 'role' 為 'Leader'", "vars": {"role": "'Leader'"}},
            {"line": 3, "text": "新增鍵 'level' 為 5", "vars": {"len": 3}},
            {"line": 4, "text": "輸出 3 Leader", "vars": {"output": "3 Leader"}}
        ]
    },
    {
        "id": "ch3_b13",
        "chapterId": 3,
        "dimension": "containers_memory",
        "title": "集合容器去重特性與成員檢驗",
        "difficulty": "basic",
        "category": "集合基本操作",
        "question": "執行下列 set() 集合轉換與成員檢驗程式碼後，印出的結果為何？",
        "code": "raw_data = [1, 2, 2, 3, 3, 3, 4]\nunique_set = set(raw_data)\nprint(len(unique_set), 2 in unique_set)",
        "options": [
            "A. 4 True",
            "B. 7 True",
            "C. 4 False",
            "D. 3 True"
        ],
        "answer": "A",
        "explanation": "set() 會自動剔除所有重複元素。清單 [1, 2, 2, 3, 3, 3, 4] 轉換為集合後為 {1, 2, 3, 4}，共有 4 個相異元素，故 len 為 4；數值 2 確實存在於集合中，2 in unique_set 為 True。輸出 4 True。",
        "traceSteps": [
            {"line": 1, "text": "raw_data 包含重複數字 1, 2, 3, 4", "vars": {"len": 7}},
            {"line": 2, "text": "set() 剔除重複值，得 {1, 2, 3, 4}", "vars": {"unique_set": "{1, 2, 3, 4}"}},
            {"line": 3, "text": "長度為 4 且 2 in set 為 True，輸出 4 True", "vars": {"output": "4 True"}}
        ]
    },
    {
        "id": "ch3_b14",
        "chapterId": 3,
        "dimension": "containers_memory",
        "title": "單元素元組逗號不可或缺性",
        "difficulty": "basic",
        "category": "元組語法規範",
        "question": "執行下列判定元組型別的程式碼後，印出的結果為何？",
        "code": "t1 = (42)\nt2 = (42,)\nprint(type(t1) == tuple, type(t2) == tuple)",
        "options": [
            "A. False True",
            "B. True True",
            "C. False False",
            "D. True False"
        ],
        "answer": "A",
        "explanation": "在 Python 中，僅使用小括號 (42) 會被視為一般數學運算的括號，其型別依舊是整數 int；只有在括號內加上逗號 (42,)，Python 直譯器才會將其識別為「單元素元組（tuple）」。因此 type(t1) == tuple 為 False，type(t2) == tuple 為 True。印出 False True。",
        "traceSteps": [
            {"line": 1, "text": "t1 = (42) 為整數 42，type(t1) 為 int", "vars": {"type_t1": "<class 'int'>"}},
            {"line": 2, "text": "t2 = (42,) 包含逗號，type(t2) 為 tuple", "vars": {"type_t2": "<class 'tuple'>"}},
            {"line": 3, "text": "印出 False True", "vars": {"output": "False True"}}
        ]
    },
    {
        "id": "ch3_b15",
        "chapterId": 3,
        "dimension": "containers_memory",
        "title": "串列 append 與 extend 行為差異",
        "difficulty": "basic",
        "category": "串列方法比較",
        "question": "執行下列比較 append 與 extend 的程式碼後，印出的長度為何？",
        "code": "a = [1, 2]\na.append([3, 4])\nb = [1, 2]\nb.extend([3, 4])\nprint(len(a), len(b))",
        "options": [
            "A. 3 4",
            "B. 4 4",
            "C. 3 3",
            "D. 4 3"
        ],
        "answer": "A",
        "explanation": "a.append([3, 4]) 將整個串列 [3, 4] 作為單一元素加入尾端，a 變成 [1, 2, [3, 4]]，長度為 3；b.extend([3, 4]) 則是將傳入的引數逐一拆解後追加加入，b 變成 [1, 2, 3, 4]，長度為 4。因此印出 3 4。",
        "traceSteps": [
            {"line": 2, "text": "append([3, 4]) 加入單一子串列，a 變為 [1, 2, [3, 4]]", "vars": {"len_a": 3}},
            {"line": 4, "text": "extend([3, 4]) 展開串列追加元素，b 變為 [1, 2, 3, 4]", "vars": {"len_b": 4}},
            {"line": 5, "text": "印出 3 4", "vars": {"output": "3 4"}}
        ]
    },
    {
        "id": "ch3_b16",
        "chapterId": 3,
        "dimension": "containers_memory",
        "title": "串列 index 方法定位元素索引",
        "difficulty": "basic",
        "category": "串列搜尋操作",
        "question": "執行下列串列 index() 搜尋方法程式碼後，印出的索引值為何？",
        "code": "colors = [\"red\", \"green\", \"blue\", \"green\"]\nprint(colors.index(\"green\"))",
        "options": [
            "A. 1",
            "B. 3",
            "C. [1, 3]",
            "D. 2"
        ],
        "answer": "A",
        "explanation": "list.index(x) 會從頭開始搜尋元素 x，並回傳「第一個」符合條件元素的索引值。在 colors 中，索引 1 處即為第一個 'green'，因此直接回傳 1（後方的索引 3 不會回傳）。印出 1。",
        "traceSteps": [
            {"line": 1, "text": "colors = ['red', 'green', 'blue', 'green']", "vars": {"colors": "['red', 'green', 'blue', 'green']"}},
            {"line": 2, "text": "index('green') 找到首個匹配索引為 1", "vars": {"output": 1}}
        ]
    },
    # Advanced (2 題): ch3_a15, ch3_a16
    {
        "id": "ch3_a15",
        "chapterId": 3,
        "dimension": "containers_memory",
        "title": "copy.copy 淺拷貝與內部物件參照共享",
        "difficulty": "advanced",
        "category": "物件記憶體與拷貝",
        "question": "執行下列淺拷貝（shallow copy）程式碼後，印出的結果為何？",
        "code": "import copy\norig = [[1, 2], [3, 4]]\nclone = copy.copy(orig)\nclone[0].append(99)\nclone.append([5, 6])\nprint(len(orig), orig[0])",
        "options": [
            "A. 2 [1, 2, 99]",
            "B. 3 [1, 2, 99]",
            "C. 2 [1, 2]",
            "D. 3 [1, 2]"
        ],
        "answer": "A",
        "explanation": "copy.copy 進行淺拷貝：外層串列複製了一個全新容器，因此 clone.append([5, 6]) 只增加 clone 的長度，不影響 orig，len(orig) 仍為 2；然而內層的子串列 [1, 2] 依然指向同一個記憶體位址！因此 clone[0].append(99) 會直接修改到 orig[0]，使其變成 [1, 2, 99]。印出 2 [1, 2, 99]。",
        "traceSteps": [
            {"line": 3, "text": "淺拷貝建立新外層串列，但內層子串列參照同一記憶體", "vars": {}},
            {"line": 4, "text": "clone[0].append(99) 同步修改共享的子串列", "vars": {"orig[0]": "[1, 2, 99]"}},
            {"line": 5, "text": "clone.append([5, 6]) 僅擴增 clone 外層，orig 長度維持 2", "vars": {"len(orig)": 2}},
            {"line": 6, "text": "印出 2 [1, 2, 99]", "vars": {"output": "2 [1, 2, 99]"}}
        ]
    },
    {
        "id": "ch3_a16",
        "chapterId": 3,
        "dimension": "containers_memory",
        "title": "集合交集與差集運算求值",
        "difficulty": "advanced",
        "category": "集合運算子",
        "question": "執行下列集合交集（&）與差集（-）程式碼後，印出的結果為何？",
        "code": "s1 = {1, 2, 3, 4}\ns2 = {3, 4, 5, 6}\ninter = s1 & s2\ndiff = s1 - s2\nprint(sorted(list(inter)), sorted(list(diff)))",
        "options": [
            "A. [3, 4] [1, 2]",
            "B. [3, 4] [5, 6]",
            "C. [1, 2, 3, 4] [1, 2]",
            "D. [3, 4] [1, 2, 5, 6]"
        ],
        "answer": "A",
        "explanation": "1. s1 & s2 是交集運算（同時存在於兩集合者），得到 {3, 4}；2. s1 - s2 是差集運算（在 s1 中但不在 s2 中者），{1, 2, 3, 4} 扣除 3 與 4 後剩餘 {1, 2}。排序後輸出 [3, 4] [1, 2]。",
        "traceSteps": [
            {"line": 3, "text": "s1 & s2 取兩者交集得 {3, 4}", "vars": {"inter": "{3, 4}"}},
            {"line": 4, "text": "s1 - s2 取差集得 {1, 2}", "vars": {"diff": "{1, 2}"}},
            {"line": 5, "text": "轉串列並排序後印出 [3, 4] [1, 2]", "vars": {"output": "[3, 4] [1, 2]"}}
        ]
    },

    # ==================== CHAPTER 4: control_flow (流程控制與迴圈運算) ====================
    # Basic (5 題): ch4_b12 ~ ch4_b16
    {
        "id": "ch4_b12",
        "chapterId": 4,
        "dimension": "control_flow",
        "title": "while 迴圈累加與終止條件狀態",
        "difficulty": "basic",
        "category": "while 迴圈基礎",
        "question": "執行下列 while 迴圈累加程式碼後，印出的 total 與 n 為何？",
        "code": "n = 1\ntotal = 0\nwhile n <= 4:\n    total += n\n    n += 1\nprint(total, n)",
        "options": [
            "A. 10 5",
            "B. 10 4",
            "C. 6 4",
            "D. 15 5"
        ],
        "answer": "A",
        "explanation": "迴圈執行 4 次：n 依序為 1, 2, 3, 4，total 累加 1 + 2 + 3 + 4 = 10。在第 4 次迴圈尾端執行 n += 1 後 n 變為 5；接著檢查 while n <= 4 條件不成立跳出迴圈。因此印出 10 5。",
        "traceSteps": [
            {"line": 4, "text": "迴圈依序累加 1, 2, 3, 4 至 total 得 10", "vars": {"total": 10}},
            {"line": 5, "text": "最後一次執行 n += 1 使 n 遞增為 5，跳出迴圈", "vars": {"n": 5}},
            {"line": 6, "text": "輸出 10 5", "vars": {"output": "10 5"}}
        ]
    },
    {
        "id": "ch4_b13",
        "chapterId": 4,
        "dimension": "control_flow",
        "title": "Python 假值 (Falsy values) 隱式布林求值",
        "difficulty": "basic",
        "category": "條件式真假值規則",
        "question": "執行下列常見物件的 bool 判定程式碼後，印出的 truthy 數量為何？",
        "code": "items = [0, \"\", [], {}, None, False]\ntruthy_count = sum(bool(x) for x in items)\nprint(truthy_count)",
        "options": [
            "A. 0",
            "B. 1",
            "C. 2",
            "D. 6"
        ],
        "answer": "A",
        "explanation": "在 Python 中，數值 0、空字串 ''、空串列 []、空字典 {}、None 以及 False 在布林環境中皆被視為 False（Falsy 值）。因此 items 中的所有元素 bool(x) 皆為 False（即 0），加總 sum 為 0。印出 0。",
        "traceSteps": [
            {"line": 1, "text": "items 包含 0, '', [], {}, None, False", "vars": {}},
            {"line": 2, "text": "所有元素之 bool 值皆為 False (0)，sum 結果為 0", "vars": {"truthy_count": 0}},
            {"line": 3, "text": "印出 0", "vars": {"output": 0}}
        ]
    },
    {
        "id": "ch4_b14",
        "chapterId": 4,
        "dimension": "control_flow",
        "title": "if-elif 多分支順序與先滿足特性",
        "difficulty": "basic",
        "category": "條件分支結構",
        "question": "執行下列 if-elif 多分支評估程式碼後，印出的評級為何？",
        "code": "score = 85\ngrade = \"F\"\nif score >= 70:\n    grade = \"C\"\nelif score >= 80:\n    grade = \"B\"\nelif score >= 90:\n    grade = \"A\"\nprint(grade)",
        "options": [
            "A. C",
            "B. B",
            "C. A",
            "D. F"
        ],
        "answer": "A",
        "explanation": "在 if-elif-else 結構中，直譯器由上而下循序評估，只要「第一個條件成立」就會執行其區塊並立即跳出整組分支！因為 score = 85 >= 70 已經成立，因此 grade 被設定為 'C'，後續的 elif score >= 80 永遠不會被執行。印出 C。",
        "traceSteps": [
            {"line": 3, "text": "評估 score >= 70 成立 (85 >= 70 為 True)", "vars": {}},
            {"line": 4, "text": "執行 grade = 'C' 並跳出所有後續 elif 分支", "vars": {"grade": "'C'"}},
            {"line": 9, "text": "印出 grade 為 C", "vars": {"output": "'C'"}}
        ]
    },
    {
        "id": "ch4_b15",
        "chapterId": 4,
        "dimension": "control_flow",
        "title": "range 步長與空區間邊界有效性",
        "difficulty": "basic",
        "category": "range 函式特性",
        "question": "執行下列兩個 range 轉換為串列的程式碼後，輸出的內容為何？",
        "code": "nums1 = list(range(5, 5))\nnums2 = list(range(5, 2, -1))\nprint(nums1, nums2)",
        "options": [
            "A. [] [5, 4, 3]",
            "B. [5] [5, 4, 3, 2]",
            "C. [] [5, 4, 3, 2]",
            "D. [5] [5, 4, 3]"
        ],
        "answer": "A",
        "explanation": "1. range(5, 5) 起始值與終止值相同（左閉右開 [5, 5)），不產生任何元素，轉為串列為空串列 []；2. range(5, 2, -1) 步長為 -1，從 5 遞減至 2（不包含終止點 2），依序產生 5, 4, 3。因此印出 [] [5, 4, 3]。",
        "traceSteps": [
            {"line": 1, "text": "range(5, 5) 起終相同，產生空串列 []", "vars": {"nums1": "[]"}},
            {"line": 2, "text": "range(5, 2, -1) 遞減產生 [5, 4, 3]", "vars": {"nums2": "[5, 4, 3]"}},
            {"line": 3, "text": "輸出 [] [5, 4, 3]", "vars": {"output": "[] [5, 4, 3]"}}
        ]
    },
    {
        "id": "ch4_b16",
        "chapterId": 4,
        "dimension": "control_flow",
        "title": "pass 佔位語句與 continue 關鍵字區別",
        "difficulty": "basic",
        "category": "迴圈控制關鍵字",
        "question": "執行下列在迴圈中使用 pass 的程式碼後，串列 res 的內容為何？",
        "code": "res = []\nfor x in range(3):\n    if x == 1:\n        pass\n    res.append(x)\nprint(res)",
        "options": [
            "A. [0, 1, 2]",
            "B. [0, 2]",
            "C. [0]",
            "D. [1, 2]"
        ],
        "answer": "A",
        "explanation": "pass 是 Python 中的空操作佔位語句（no-op），不會改變任何執行流程或跳過迴圈（那是 continue 的功能）。當 x == 1 時執行 pass 什麼都不做，接著依舊會執行下一行的 res.append(x)。因此 0, 1, 2 全部被加入，輸出 [0, 1, 2]。",
        "traceSteps": [
            {"line": 2, "text": "迴圈 x 依序為 0, 1, 2", "vars": {}},
            {"line": 4, "text": "當 x == 1 執行 pass，程式繼續向下執行 append", "vars": {}},
            {"line": 5, "text": "res 依序加入 0, 1, 2", "vars": {"res": "[0, 1, 2]"}},
            {"line": 6, "text": "輸出 [0, 1, 2]", "vars": {"output": "[0, 1, 2]"}}
        ]
    },
    # Advanced (3 題): ch4_a14, ch4_a15, ch4_a16
    {
        "id": "ch4_a14",
        "chapterId": 4,
        "dimension": "control_flow",
        "title": "for-else 迴圈結構與正常結束機制",
        "difficulty": "advanced",
        "category": "for-else 語法",
        "question": "執行下列包含 for-else 結構的程式碼後，印出的 found 變數為何？",
        "code": "found = False\nfor n in [3, 5, 7, 9]:\n    if n % 2 == 0:\n        found = True\n        break\nelse:\n    found = \"ALL_ODD\"\nprint(found)",
        "options": [
            "A. ALL_ODD",
            "B. False",
            "C. True",
            "D. None"
        ],
        "answer": "A",
        "explanation": "在 Python 中，for 迴圈可以搭配 else 區塊。其觸發條件為：當迴圈「完整巡訪完畢且未被 break 中斷」時，會執行 else 區塊。因為串列全為奇數，if n % 2 == 0 從未成立，break 從未執行，故迴圈結束後執行 else 將 found 設為 'ALL_ODD'。印出 ALL_ODD。",
        "traceSteps": [
            {"line": 2, "text": "遍歷 [3, 5, 7, 9]，所有元素皆不滿足偶數條件", "vars": {}},
            {"line": 6, "text": "迴圈未遇 break 正常結束，觸發 else 區塊", "vars": {"found": "'ALL_ODD'"}},
            {"line": 8, "text": "印出 ALL_ODD", "vars": {"output": "'ALL_ODD'"}}
        ]
    },
    {
        "id": "ch4_a15",
        "chapterId": 4,
        "dimension": "control_flow",
        "title": "while-else 遇 break 中斷時 else 的略過",
        "difficulty": "advanced",
        "category": "while-else 語法",
        "question": "執行下列 while-else 迴圈程式碼後，印出的 val 數值為何？",
        "code": "val = 10\nwhile val > 0:\n    val -= 3\n    if val == 4:\n        break\nelse:\n    val = -99\nprint(val)",
        "options": [
            "A. 4",
            "B. -99",
            "C. 1",
            "D. 0"
        ],
        "answer": "A",
        "explanation": "val 初始為 10；第一次迴圈 val -= 3 變為 7；第二次迴圈 val -= 3 變為 4，滿足 if val == 4 條件觸發 break 中斷迴圈。因為迴圈是被 break 終止的，直譯器會完全略過 else 區塊，因此 val 保持為 4。印出 4。",
        "traceSteps": [
            {"line": 3, "text": "第一次迴圈：val 變為 7；第二次迴圈：val 變為 4", "vars": {"val": 4}},
            {"line": 5, "text": "命中 val == 4 觸發 break 離開迴圈", "vars": {}},
            {"line": 6, "text": "因 break 中斷，else 區塊被略過不執行", "vars": {}},
            {"line": 8, "text": "印出 val 為 4", "vars": {"output": 4}}
        ]
    },
    {
        "id": "ch4_a16",
        "chapterId": 4,
        "dimension": "control_flow",
        "title": "短路求值中 or 與 and 回傳運算元本體",
        "difficulty": "advanced",
        "category": "邏輯短路與運算子",
        "question": "執行下列包含 or 與 and 的非布林短路程式碼後，印出的結果為何？",
        "code": "a = [] or \"default\"\nb = [1, 2] and \"success\"\nprint(a, b)",
        "options": [
            "A. default success",
            "B. True True",
            "C. [] success",
            "D. default [1, 2]"
        ],
        "answer": "A",
        "explanation": "Python 的 or 與 and 運算子不會將結果強制轉為布林值，而是回傳「決定該運算式結果的運算元本身」：1. [] 為 False，or 運算子繼續求值並回傳右邊的 'default'；2. [1, 2] 為 True，and 運算子需取決於右側運算元，故回傳 'success'。輸出 default success。",
        "traceSteps": [
            {"line": 1, "text": "[] 為假，or 運算子短路評估右邊運算元，回傳 'default'", "vars": {"a": "'default'"}},
            {"line": 2, "text": "[1, 2] 為真，and 運算子結果取決於右側，回傳 'success'", "vars": {"b": "'success'"}},
            {"line": 3, "text": "印出 default success", "vars": {"output": "'default success'"}}
        ]
    },

    # ==================== CHAPTER 5: functions_scope (函式參數與變數作用域) ====================
    # Basic (5 題): ch5_b12 ~ ch5_b16
    {
        "id": "ch5_b12",
        "chapterId": 5,
        "dimension": "functions_scope",
        "title": "位置引數與關鍵字引數混合傳遞",
        "difficulty": "basic",
        "category": "函式引數傳遞",
        "question": "執行下列包含預設參數與關鍵字引數的程式碼後，印出的字串為何？",
        "code": "def greet(greeting, name=\"Agent\", punct=\"!\"):\n    return f\"{greeting}, {name}{punct}\"\n\nprint(greet(\"Hello\", punct=\".\"))",
        "options": [
            "A. Hello, Agent.",
            "B. Hello, Agent!",
            "C. Hello, punct=.",
            "D. TypeError"
        ],
        "answer": "A",
        "explanation": "呼叫 greet('Hello', punct='.') 時，'Hello' 作為第一個位置引數傳給 greeting；name 未指定故採用預設值 'Agent'；punct='.' 以關鍵字引數傳遞，覆寫原本的預設值 '!'。組合為 'Hello, Agent.' 並印出。",
        "traceSteps": [
            {"line": 4, "text": "呼叫 greet: greeting='Hello', name='Agent'(預設), punct='.'", "vars": {}},
            {"line": 2, "text": "格式化組合回傳 'Hello, Agent.'", "vars": {"return": "'Hello, Agent.'"}},
            {"line": 4, "text": "印出 Hello, Agent.", "vars": {"output": "'Hello, Agent.'"}}
        ]
    },
    {
        "id": "ch5_b13",
        "chapterId": 5,
        "dimension": "functions_scope",
        "title": "函式多重回傳值與元組自動打包拆包",
        "difficulty": "basic",
        "category": "函式回傳值機制",
        "question": "執行下列回傳多個值的函式程式碼後，印出的 low 與 high 為何？",
        "code": "def stats(nums):\n    return min(nums), max(nums)\n\nlow, high = stats([12, 5, 27, 8])\nprint(low, high)",
        "options": [
            "A. 5 27",
            "B. 12 8",
            "C. (5, 27)",
            "D. 27 5"
        ],
        "answer": "A",
        "explanation": "在 Python 中，return 後以逗號分隔多個運算式會自動打包為元組 tuple：stats 回傳 (5, 27)。接收呼叫時，low, high = stats(...) 進行序列解包（unpacking），將 5 指派給 low，27 指派給 high。印出 5 27。",
        "traceSteps": [
            {"line": 2, "text": "計算 min 得 5，max 得 27，打包回傳 (5, 27)", "vars": {}},
            {"line": 4, "text": "解包指派 low = 5, high = 27", "vars": {"low": 5, "high": 27}},
            {"line": 5, "text": "印出 5 27", "vars": {"output": "5 27"}}
        ]
    },
    {
        "id": "ch5_b14",
        "chapterId": 5,
        "dimension": "functions_scope",
        "title": "區域變數賦值對同名全域變數之獨立性",
        "difficulty": "basic",
        "category": "作用域遮蔽 (Shadowing)",
        "question": "執行下列展示變數作用域的程式碼後，印出的數值為何？",
        "code": "x = 100\n\ndef modify():\n    x = 200\n    return x\n\nres = modify()\nprint(x, res)",
        "options": [
            "A. 100 200",
            "B. 200 200",
            "C. 100 100",
            "D. UnboundLocalError"
        ],
        "answer": "A",
        "explanation": "函式 modify 內部直接賦值 x = 200，在未宣告 global 的情況下，Python 會在函式的區域作用域建立一個全新的區域變數 x。函式回傳 200，而外部的全域變數 x 完全不受影響仍為 100。因此輸出 100 200。",
        "traceSteps": [
            {"line": 1, "text": "定義全域變數 x = 100", "vars": {"x_global": 100}},
            {"line": 4, "text": "函式內部建立區域變數 x = 200 並回傳", "vars": {"x_local": 200}},
            {"line": 8, "text": "印出全域 x(100) 與 res(200)", "vars": {"output": "100 200"}}
        ]
    },
    {
        "id": "ch5_b15",
        "chapterId": 5,
        "dimension": "functions_scope",
        "title": "lambda 匿名函式與預設參數求值",
        "difficulty": "basic",
        "category": "lambda 表示式",
        "question": "執行下列包含預設引數的 lambda 程式碼後，印出的結果為何？",
        "code": "multiply = lambda a, b=2: a * b\nprint(multiply(7), multiply(7, 3))",
        "options": [
            "A. 14 21",
            "B. 14 14",
            "C. 7 21",
            "D. TypeError"
        ],
        "answer": "A",
        "explanation": "lambda 函式支援預設引數：multiply(7) 未傳入第二個引數，因此使用預設值 b=2，計算 7 * 2 = 14；multiply(7, 3) 顯式傳入引數 b=3，計算 7 * 3 = 21。故印出 14 21。",
        "traceSteps": [
            {"line": 1, "text": "定義 lambda 函式，預設 b = 2", "vars": {}},
            {"line": 2, "text": "multiply(7) 計算 7 * 2 = 14；multiply(7, 3) 計算 7 * 3 = 21", "vars": {}},
            {"line": 2, "text": "輸出 14 21", "vars": {"output": "14 21"}}
        ]
    },
    {
        "id": "ch5_b16",
        "chapterId": 5,
        "dimension": "functions_scope",
        "title": "可變長度位置引數 *args 打包機制",
        "difficulty": "basic",
        "category": "*args 語法特性",
        "question": "執行下列 *args 函式程式碼後，印出的型別判定與總和為何？",
        "code": "def sum_all(*args):\n    return type(args) == tuple, sum(args)\n\nis_tup, total = sum_all(10, 20, 30)\nprint(is_tup, total)",
        "options": [
            "A. True 60",
            "B. False 60",
            "C. True 30",
            "D. TypeError"
        ],
        "answer": "A",
        "explanation": "函式參數使用 *args 語法時，Python 會將傳入的所有多餘位置引數自動打包為一個「元組（tuple）」。呼叫 sum_all(10, 20, 30) 時 args 為 (10, 20, 30)，因此 type(args) == tuple 為 True，sum(args) 加總為 60。輸出 True 60。",
        "traceSteps": [
            {"line": 4, "text": "傳入 (10, 20, 30)，打包為 tuple", "vars": {"args": "(10, 20, 30)"}},
            {"line": 2, "text": "判定 type(args) 為 tuple (True)，sum 為 60", "vars": {"is_tup": True, "total": 60}},
            {"line": 5, "text": "輸出 True 60", "vars": {"output": "True 60"}}
        ]
    },
    # Advanced (2 題): ch5_a15, ch5_a16
    {
        "id": "ch5_a15",
        "chapterId": 5,
        "dimension": "functions_scope",
        "title": "可變長度關鍵字引數 **kwargs 字典打包",
        "difficulty": "advanced",
        "category": "**kwargs 語法特性",
        "question": "執行下列 **kwargs 打包與 get 預設值取值的程式碼後，印出的結果為何？",
        "code": "def build_profile(user_id, **kwargs):\n    role = kwargs.get(\"role\", \"guest\")\n    active = kwargs.get(\"active\", False)\n    return f\"{user_id}:{role}:{active}\"\n\nprint(build_profile(99, role=\"admin\", level=3))",
        "options": [
            "A. 99:admin:False",
            "B. 99:guest:False",
            "C. 99:admin:True",
            "D. TypeError"
        ],
        "answer": "A",
        "explanation": "**kwargs 會將傳入的所有額外關鍵字引數打包成 dict：{'role': 'admin', 'level': 3}。kwargs.get('role', 'guest') 找到已有鍵 'role' 其值為 'admin'；kwargs.get('active', False) 在字典中找不到 'active'，故回傳預設值 False。組合輸出 99:admin:False。",
        "traceSteps": [
            {"line": 6, "text": "呼叫 build_profile(99, role='admin', level=3)", "vars": {}},
            {"line": 1, "text": "kwargs 打包為 {'role': 'admin', 'level': 3}", "vars": {"kwargs": "{'role': 'admin', 'level': 3}"}},
            {"line": 2, "text": "role 取出 'admin'，active 取預設值 False", "vars": {"role": "'admin'", "active": False}},
            {"line": 6, "text": "輸出 99:admin:False", "vars": {"output": "'99:admin:False'"}}
        ]
    },
    {
        "id": "ch5_a16",
        "chapterId": 5,
        "dimension": "functions_scope",
        "title": "global 關鍵字宣告修改全域變數狀態",
        "difficulty": "advanced",
        "category": "global 作用域修改",
        "question": "執行下列宣告 global 關鍵字的累加程式碼後，印出的全域變數 count 為何？",
        "code": "count = 0\n\ndef increment(step):\n    global count\n    count += step\n\nincrement(5)\nincrement(10)\nprint(count)",
        "options": [
            "A. 15",
            "B. 0",
            "C. 10",
            "D. UnboundLocalError"
        ],
        "answer": "A",
        "explanation": "在函式內部加入 global count 宣告，明確指示直譯器：此函式中對 count 的所有讀寫皆針對全域變數進行，而非建立區域變數。第一次呼叫 increment(5) 使全域 count 變為 5；第二次 increment(10) 使其變為 15。印出 15。",
        "traceSteps": [
            {"line": 1, "text": "初始化全域 count = 0", "vars": {"count": 0}},
            {"line": 7, "text": "第一次呼叫 increment(5)，修改全域 count 為 5", "vars": {"count": 5}},
            {"line": 8, "text": "第二次呼叫 increment(10)，修改全域 count 為 15", "vars": {"count": 15}},
            {"line": 9, "text": "印出全域 count 之值 15", "vars": {"output": 15}}
        ]
    },

    # ==================== CHAPTER 6: comprehensions_tools (高效工具與解析式) ====================
    # Basic (5 題): ch6_b12 ~ ch6_b16
    {
        "id": "ch6_b12",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "title": "串列生成式帶 if 條件篩選求值",
        "difficulty": "basic",
        "category": "串列生成式",
        "question": "執行下列包含條件篩選的串列生成式程式碼後，印出的串列為何？",
        "code": "evens = [x * 2 for x in range(5) if x % 2 == 0]\nprint(evens)",
        "options": [
            "A. [0, 4, 8]",
            "B. [0, 2, 4, 6, 8]",
            "C. [4, 8]",
            "D. [0, 2, 4]"
        ],
        "answer": "A",
        "explanation": "range(5) 依序產生 0, 1, 2, 3, 4；if x % 2 == 0 篩選出偶數：0, 2, 4；最左邊的表示式 x * 2 對其進行計算：0*2=0, 2*2=4, 4*2=8。因此產生的串列為 [0, 4, 8]。",
        "traceSteps": [
            {"line": 1, "text": "range(5) 篩選偶數 x = 0, 2, 4", "vars": {"filtered": [0, 2, 4]}},
            {"line": 1, "text": "計算 x * 2 得 [0, 4, 8]", "vars": {"evens": "[0, 4, 8]"}},
            {"line": 2, "text": "輸出 [0, 4, 8]", "vars": {"output": "[0, 4, 8]"}}
        ]
    },
    {
        "id": "ch6_b13",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "title": "字典生成式配對鍵與字串長度",
        "difficulty": "basic",
        "category": "字典生成式",
        "question": "執行下列字典生成式程式碼後，印出的結果為何？",
        "code": "words = [\"py\", \"exam\", \"ai\"]\nlength_map = {w: len(w) for w in words}\nprint(length_map[\"exam\"], len(length_map))",
        "options": [
            "A. 4 3",
            "B. 4 2",
            "C. 2 3",
            "D. KeyError"
        ],
        "answer": "A",
        "explanation": "{w: len(w) for w in words} 為字典生成式，以單字為鍵、長度為值建立字典：{'py': 2, 'exam': 4, 'ai': 2}。length_map['exam'] 的值為 4；字典總共有 3 個鍵，len(length_map) 為 3。因此印出 4 3。",
        "traceSteps": [
            {"line": 2, "text": "生成字典 {'py': 2, 'exam': 4, 'ai': 2}", "vars": {"length_map": "{'py': 2, 'exam': 4, 'ai': 2}"}},
            {"line": 3, "text": "length_map['exam'] 為 4，長度為 3", "vars": {"output": "4 3"}}
        ]
    },
    {
        "id": "ch6_b14",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "title": "any 與 all 內建函式布林判定",
        "difficulty": "basic",
        "category": "內建輔助函式",
        "question": "執行下列包含 any 與 all 的布林判定程式碼後，印出的結果為何？",
        "code": "vals = [True, True, False]\nprint(any(vals), all(vals))",
        "options": [
            "A. True False",
            "B. True True",
            "C. False False",
            "D. False True"
        ],
        "answer": "A",
        "explanation": "any(iterable) 只要迭代物件中存在「至少一個」True 即回傳 True，此處前兩項為 True，故 any 回傳 True；all(iterable) 要求「全部元素皆為 True」才回傳 True，因最後一項為 False，故 all 回傳 False。輸出 True False。",
        "traceSteps": [
            {"line": 1, "text": "vals = [True, True, False]", "vars": {"vals": "[True, True, False]"}},
            {"line": 2, "text": "any 判定有真得 True，all 判定非全真得 False", "vars": {"output": "True False"}}
        ]
    },
    {
        "id": "ch6_b15",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "title": "集合生成式自動去重運算",
        "difficulty": "basic",
        "category": "集合生成式",
        "question": "執行下列集合生成式平方運算程式碼後，印出的排序串列為何？",
        "code": "nums = [-2, -1, 1, 2]\nsquared_set = {x ** 2 for x in nums}\nprint(sorted(list(squared_set)))",
        "options": [
            "A. [1, 4]",
            "B. [4, 1, 1, 4]",
            "C. [1, 2, 4]",
            "D. [0, 1, 4]"
        ],
        "answer": "A",
        "explanation": "集合生成式使用花括號 {x ** 2 for x in nums}：依序計算 (-2)^2=4, (-1)^2=1, 1^2=1, 2^2=4。由於集合具有「元素唯一性」，重複的 1 與 4 會被自動去重，產生的集合為 {1, 4}。排序後輸出 [1, 4]。",
        "traceSteps": [
            {"line": 2, "text": "計算平方得 4, 1, 1, 4；集合去重後為 {1, 4}", "vars": {"squared_set": "{1, 4}"}},
            {"line": 3, "text": "轉串列並排序輸出 [1, 4]", "vars": {"output": "[1, 4]"}}
        ]
    },
    {
        "id": "ch6_b16",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "title": "map 批次轉型與 sum 聚合計算",
        "difficulty": "basic",
        "category": "map 迭代器處理",
        "question": "執行下列使用 map 將字串轉為整數並加總的程式碼後，印出的總和為何？",
        "code": "raw_nums = [\"10\", \"20\", \"30\"]\nint_nums = list(map(int, raw_nums))\nprint(sum(int_nums))",
        "options": [
            "A. 60",
            "B. 102030",
            "C. [10, 20, 30]",
            "D. 50"
        ],
        "answer": "A",
        "explanation": "map(int, raw_nums) 會將 int 轉型函式依序套用至 raw_nums 的每一個元素，回傳一個 map 迭代器。透過 list() 將其具現化為整數串列 [10, 20, 30]，接著 sum() 加總 10 + 20 + 30 = 60。輸出 60。",
        "traceSteps": [
            {"line": 2, "text": "map(int, ...) 將字串串列轉換為整數串列 [10, 20, 30]", "vars": {"int_nums": "[10, 20, 30]"}},
            {"line": 3, "text": "sum([10, 20, 30]) 計算總和 60", "vars": {"output": 60}}
        ]
    },
    # Advanced (4 題): ch6_a13 ~ ch6_a16
    {
        "id": "ch6_a13",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "title": "雙重 for 迴圈串列生成式扁平化",
        "difficulty": "advanced",
        "category": "巢狀解析式語序",
        "question": "執行下列將二維矩陣扁平化的串列生成式程式碼後，印出的串列為何？",
        "code": "matrix = [[1, 2], [3, 4]]\nflat = [item for row in matrix for item in row]\nprint(flat)",
        "options": [
            "A. [1, 2, 3, 4]",
            "B. [[1, 2], [3, 4]]",
            "C. [1, 3, 2, 4]",
            "D. [4, 3, 2, 1]"
        ],
        "answer": "A",
        "explanation": "在多重 for 串列生成式中，for 子句的順序與傳統巢狀迴圈完全一致（從左到右等於外層到內層）：先外層 for row in matrix 取出 [1, 2]，再內層 for item in row 取出 1, 2；接著取出 [3, 4] 之 3, 4。扁平化後輸出 [1, 2, 3, 4]。",
        "traceSteps": [
            {"line": 2, "text": "外層取出 row=[1, 2]，內層取出 1, 2 加入串列", "vars": {}},
            {"line": 2, "text": "外層取出 row=[3, 4]，內層取出 3, 4 加入串列", "vars": {"flat": "[1, 2, 3, 4]"}},
            {"line": 3, "text": "印出 [1, 2, 3, 4]", "vars": {"output": "[1, 2, 3, 4]"}}
        ]
    },
    {
        "id": "ch6_a14",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "title": "filter 搭配 lambda 進行及格篩選",
        "difficulty": "advanced",
        "category": "filter 高階函式",
        "question": "執行下列 filter 與 lambda 結合篩選的程式碼後，印出的結果為何？",
        "code": "scores = [45, 88, 60, 92, 59]\npassed = list(filter(lambda s: s >= 60, scores))\nprint(len(passed), passed)",
        "options": [
            "A. 3 [88, 60, 92]",
            "B. 2 [88, 92]",
            "C. 3 [45, 59, 60]",
            "D. 5 [45, 88, 60, 92, 59]"
        ],
        "answer": "A",
        "explanation": "filter(func, iterable) 只保留使 func 回傳 True 的元素。lambda s: s >= 60 判定大於等於 60 分為及格，在 scores 中符合條件的有 88, 60, 92（共 3 個）。經 list() 轉換為串列 [88, 60, 92]，len 為 3。輸出 3 [88, 60, 92]。",
        "traceSteps": [
            {"line": 2, "text": "filter 篩選 s >= 60 之元素：88, 60, 92", "vars": {"passed": "[88, 60, 92]"}},
            {"line": 3, "text": "len 為 3，印出 3 [88, 60, 92]", "vars": {"output": "3 [88, 60, 92]"}}
        ]
    },
    {
        "id": "ch6_a15",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "title": "sorted 多重鍵 (Multi-key) 元組自訂排序",
        "difficulty": "advanced",
        "category": "進階排序機制",
        "question": "執行下列依分數降冪、同分依名稱升冪的多鍵排序程式碼後，印出排名前兩位的特務為何？",
        "code": "agents = [(\"B\", 80), (\"A\", 90), (\"B\", 90)]\nsorted_agents = sorted(agents, key=lambda a: (-a[1], a[0]))\nprint(sorted_agents[0], sorted_agents[1])",
        "options": [
            "A. ('A', 90) ('B', 90)",
            "B. ('B', 90) ('A', 90)",
            "C. ('B', 80) ('A', 90)",
            "D. ('A', 90) ('B', 80)"
        ],
        "answer": "A",
        "explanation": "key 函式回傳元組 (-a[1], a[0])：第一排序鍵為 -a[1]（負的分數，等價於分數由高到低降冪）；第二排序鍵為 a[0]（姓名字母由小到大升冪）。最高分 90 分有 ('A', 90) 與 ('B', 90)，同分比第二鍵 'A' < 'B'，故 ('A', 90) 排第一、('B', 90) 排第二。印出 ('A', 90) ('B', 90)。",
        "traceSteps": [
            {"line": 2, "text": "按 (-分數, 姓名) 排序：90 分同分時比姓名字母 'A' < 'B'", "vars": {}},
            {"line": 2, "text": "排序結果：[('A', 90), ('B', 90), ('B', 80)]", "vars": {"first": "('A', 90)", "second": "('B', 90)"}},
            {"line": 3, "text": "印出 ('A', 90) ('B', 90)", "vars": {"output": "('A', 90) ('B', 90)"}}
        ]
    },
    {
        "id": "ch6_a16",
        "chapterId": 6,
        "dimension": "comprehensions_tools",
        "title": "生成式中 if-else 三元運算表達式位置差異",
        "difficulty": "advanced",
        "category": "生成式三元條件式",
        "question": "執行下列在 for 前方包含 if-else 三元運算的串列生成式程式碼後，印出的結果為何？",
        "code": "res = [x if x > 2 else -1 for x in range(5)]\nprint(res)",
        "options": [
            "A. [-1, -1, -1, 3, 4]",
            "B. [3, 4]",
            "C. [-1, -1, 2, 3, 4]",
            "D. [0, 1, 2, -1, -1]"
        ],
        "answer": "A",
        "explanation": "在串列生成式中，三元運算式 'val1 if cond else val2' 位於 for 之前，作用是「元素值映射轉換」而非過濾。對 range(5) 中的 0, 1, 2, 3, 4 逐一求值：0, 1, 2 不滿足 > 2，皆轉為 -1；3 與 4 滿足 > 2，保留原值。故生成 [-1, -1, -1, 3, 4]。",
        "traceSteps": [
            {"line": 1, "text": "x 為 0, 1, 2 時，條件不滿足映射為 -1", "vars": {}},
            {"line": 1, "text": "x 為 3, 4 時，條件滿足映射為 x 本身", "vars": {"res": "[-1, -1, -1, 3, 4]"}},
            {"line": 2, "text": "輸出 [-1, -1, -1, 3, 4]", "vars": {"output": "[-1, -1, -1, 3, 4]"}}
        ]
    }
]
