/**
 * 《Python 特務：滿分計畫》- 戰術情報智庫：全章節核心觀念卡 (Concept Briefings)
 * 對齊台大「程式設計與網路資料搜集」(GenEdu5010) Exam 1 (W1-W5)
 * 
 * 架構特點：
 * 1. 結構化分列 (keyPoints)：條列清晰，直擊考試核心機制。
 * 2. 實戰對照程式碼 (codeExample)：全數配備「# 正確寫法」與「# 陷阱/常見錯誤」鮮明對比。
 * 3. 考前 10 秒錦囊 (tip)：臨場秒殺題目的直覺心法與口訣。
 * 4. 支援動態 HTML 渲染 (renderConceptCardsHTML)，無縫升級 Briefing Modal。
 */

const CONCEPT_BRIEFINGS = {
  1: {
    chapterId: 1,
    chapterTitle: "第一章：終端訊號基地",
    chapterSubtitle: "I/O、資料型態、運算子與 PEP 8",
    description: "掌握程式執行的起點！深入理解 print 格式控制、input 字串本質、各型態轉換與 Python 社群編碼風格。",
    concepts: [
      {
        id: "ch1_c1",
        title: "print() 格式控制：sep 與 end 參數機制",
        keyPoints: [
          "print() 預設以單一空格 (sep=' ') 分隔多個引數，並以換行符 (end='\\n') 作為結尾。",
          "自訂 sep 可改變各項間的連接字元；設為空字串 sep='' 可實現無縫緊密串接。",
          "自訂 end 可阻止預設換行，讓下一次的 print() 接續在同一行輸出。",
          "連續多個 print() 搭配 end 時，最後一次若未顯式換行，後續內容依然會連在同一行。"
        ],
        codeExample: `# ✅ 正確寫法：精準控制分隔符與結尾符
print("NTU", "CSIE", sep=" - ", end=" -> ")
print("Pass")
# 輸出：NTU - CSIE -> Pass（同一行顯示）

# ⚠️ 高頻地雷 1：誤以為 sep 會影響結尾，或忘記 end 預設為換行
print("A", "B", sep=",")
print("C")
# 陷阱輸出：
# A,B （注意：已自動換行）
# C   （不是 A,B,C！）

# ⚠️ 高頻地雷 2：把引數名稱包進字串字面值
name, score = "Alice", 100
# ❌ 錯誤：print("name, score, sep=':'") -> 印出原文字串
# ✅ 正確：print(name, score, sep=": ")   -> Alice: 100`,
        tip: "考前 10 秒錦囊：看見多個 print()，先找有沒有 end=！沒有 end= 就是換行；有 end='' 才會把下一行吸到同一行；多個引數中間看 sep=。"
      },
      {
        id: "ch1_c2",
        title: "input() 字串本質、數值轉型與除法運算子",
        keyPoints: [
          "input() 無論使用者輸入數字、小數或符號，回傳型態永遠是字串 (str)！",
          "若未經 int() 或 float() 強制轉型直接進行 + 運算，會執行「字串串接」而非「數學相加」。",
          "包含小數點的字串（如 \"3.14\"）直接用 int() 會噴 ValueError，須先轉 float() 再取整。",
          "整數除法 // 為向下取整 (math.floor)，負數除法會向負無限大延伸（例如 -7 // 2 = -4）。"
        ],
        codeExample: `# ✅ 正確寫法：取得數值輸入後立即顯式轉型
raw_a, raw_b = "10", "20"     # 模擬 input() 取得的文字
num_a, num_b = int(raw_a), int(raw_b)
print(num_a + num_b)          # 數學相加：30

# ⚠️ 高頻地雷 1：忘記轉型直接相加（字串拼接陷阱）
print(raw_a + raw_b)          # 陷阱輸出："1020"，不是 30！

# ⚠️ 高頻地雷 2：帶小數點字串直接 int() 引發崩潰
s = "3.14"
# x = int(s)                  # 💥 拋出 ValueError: invalid literal for int()
x = int(float(s))             # ✅ 先轉 float 再轉 int：3

# ⚠️ 高頻地雷 3：負數整數除法向下取整
print(7 // 2)                 # 3
print(-7 // 2)                # -4（不是 -3！向更小的整數方向取整）
print(-7 % 2)                 # 1（餘數公式：r = a - (a // b) * b）`,
        tip: "考前 10 秒錦囊：先檢查相加的是字串還是整數！\"10\" + \"20\" = \"1020\"；整數除法負數往下掉：-7 // 2 = -4。"
      },
      {
        id: "ch1_c3",
        title: "bool() 真偽評判規則 (Truthy vs Falsy) 與短路求值",
        keyPoints: [
          "Python 中評判為 False 的值極少（Falsy）：0, 0.0, 空字串 '', 空串列 [], 空元組 (), 空字典 {}, None, False。",
          "其餘一切值皆為 True（Truthy），包括空白字元字串 ' '、只含 False 的串列 [False]、只含 0 的串列 [0]！",
          "短路求值 (Short-circuit Evaluation)：",
          "  - A and B：若 A 為假，立即回傳 A；否則回傳 B。",
          "  - A or B：若 A 為真，立即回傳 A；否則回傳 B。"
        ],
        codeExample: `# ✅ 正確寫法：利用容器真偽特性進行 Pythonic 判斷
items = []
if not items:
    print("串列是空的")       # [] 自然評判為 False

# ⚠️ 高頻地雷 1：非空容器內的假值陷阱
print(bool(""))               # False (長度為 0 的純空字串)
print(bool(" "))              # True  (長度為 1 的空白字串，非空！)
print(bool("False"))          # True  (長度為 5 的字串，內容是什麼都是 True)
print(bool([0]))              # True  (長度為 1 的串列，裡面有元素 0)
print(bool([None]))           # True  (非空串列)

# ⚠️ 高頻地雷 2：and 與 or 的回傳值並非一定是 True/False 布林
val1 = "Agent" and 0
print(val1)                   # 輸出 0（不是 False！\"Agent\" 是真，故求值並傳回右邊）

val2 = [] or "Default"
print(val2)                   # 輸出 "Default"（[] 為假，故求值並傳回右邊）`,
        tip: "考前 10 秒錦囊：只要容器或字串「裡面有裝東西」（哪怕裝的是 0 或 False），bool() 就一定是 True！短路求值傳回的是最後被決定的運算元本體。"
      },
      {
        id: "ch1_c4",
        title: "PEP 8 官方風格規範：空格、縮排與合法變數命名",
        keyPoints: [
          "縮排規範：嚴格使用 4 個空格，絕對禁止混用 Tab 與空白鍵。",
          "運算子空格：二元運算子（=, +, -, *, == 等）前後各留一個空格；函數預設引數的 = 不留空格。",
          "標點空格：逗號 , 與冒號 : 後面留一空格，前面絕對不留空格；括號內部兩側不留空格。",
          "命名規範：變數與函式用 snake_case（全小寫加底線）；常數用 UPPER_CASE；類別用 PascalCase。",
          "合法命名限制：開頭不可為數字、不可包含減號 - 或空格、不可使用 Python 保留字（如 class, def, if）。"
        ],
        codeExample: `# ✅ 符合 PEP 8 的優雅標準寫法
agent_score = 95
total_score = agent_score * 2.5
scores_list = [85, 90, 95]    # 逗號後空一格，括號內不空格

def get_profile(name, level=1):  # 預設參數的等號兩邊不空格
    return f"{name}:{level}"

# ⚠️ 違反 PEP 8 風格地雷（考古常見揪錯題）
# ❌ bad_1 = [ 1 , 2 , 3 ]      (括號內多餘空格、逗號前留空格)
# ❌ total=agent_score*2.5      (運算子兩側完全沒留空格)
# ❌ def myFunc( x ,y ):        (函式名稱不應用駝峰式、逗號空格混亂)

# ⚠️ 非法識別字語法錯誤地雷（SyntaxError）
# ❌ 2nd_agent = "James"       (不能以數字開頭)
# ❌ agent-id = "007"          (減號會被判定為減法運算子，應為 agent_id)
# ❌ pass = "Secret"           (pass 為 Python 關鍵保留字)`,
        tip: "考前 10 秒錦囊：PEP 8 記住口訣「逗號後面空一格，等號前後各一格，小括號緊抱不留空，變數名稱無減號」。"
      }
    ]
  },

  2: {
    chapterId: 2,
    chapterTitle: "第二章：字符密碼解析室",
    chapterSubtitle: "字串切片、ASCII/ord/chr 與字串不可變性",
    description: "拆解被編碼的秘密資料！精通 s[start:stop:step] 切片規則、ASCII 碼數值運算及各類字串處理方法。",
    concepts: [
      {
        id: "ch2_c1",
        title: "字串切片全方位解構：[start:stop:step] 與負步長逆序",
        keyPoints: [
          "切片格式為 s[start:stop:step]，區間為左閉右開 [start, stop)，即包含 start 但絕不包含 stop。",
          "step > 0（正步長）：向右走，預設 start=0，stop=len(s)。",
          "step < 0（負步長）：向左走，預設 start=-1，stop 預設延伸至字串最前端。",
          "方向衝突防禦：若 step 為負，但 start 在 stop 的左邊，兩者方向相撞，結果直接回傳空字串 \"\"（不報錯）。",
          "切片越界寬容：索引 s[99] 會噴 IndexError，但切片 s[1:99] 絕不報錯，只會取出範圍內存在的字元。"
        ],
        codeExample: `s = "PYTHON"  # 索引:  0:P,  1:Y,  2:T,  3:H,  4:O,  5:N
              # 負索: -6:P, -5:Y, -4:T, -3:H, -2:O, -1:N

# ✅ 正確寫法：標準切片、全反轉與指定跨步
print(s[1:4])          # "YTH" (含索引 1, 2, 3；不含 4)
print(s[::-1])         # "NOHTYP" (經典全字串逆序反轉)
print(s[4:1:-1])       # "OHT" (從索引 4 往左走到 2；不含 1)

# ⚠️ 高頻地雷 1：方向與步長衝突，回傳空字串
print(s[1:4:-1])       # 輸出 ""！start=1 在左，stop=4 在右，但 step=-1 要求往左走！
print(s[4:1])          # 輸出 ""！預設 step=+1 往右走，但 stop=1 在 start=4 的左邊！

# ⚠️ 高頻地雷 2：負索引切片少算最後一個字元
print(s[-4:-1])        # "THO" (只到 -2 的 'O'，不包含 -1 的 'N')
# 若想一路取到最後一個字元，stop 請務必「留空」：
print(s[-4:])          # "THON"`,
        tip: "考前 10 秒錦囊：切片先看 step！step 是負的就從右往左數（逆序），全反轉必背 s[::-1]；起點與步長方向背道而馳時直接傳回空字串 \"\"。"
      },
      {
        id: "ch2_c2",
        title: "ord() / chr() 數值轉換與大小寫 ASCII 位移密碼",
        keyPoints: [
          "ord(char)：輸入長度為 1 的字元，傳回其對應的整數 ASCII/Unicode 編碼。",
          "chr(code)：輸入整數編碼，傳回其對應的字元。兩者互為反函數：chr(ord('A')) == 'A'。",
          "三大考前必背基準碼：",
          "  - '0' 是 48（'9' 是 57）",
          "  - 'A' 是 65（'Z' 是 90）",
          "  - 'a' 是 97（'z' 是 122）",
          "大小寫差值規律：'a' 比 'A' 恰好大 32（97 - 65 = 32）。大轉小 +32，小轉大 -32。"
        ],
        codeExample: `# ✅ 正確寫法：利用 ASCII 差值進行字元位移與大小寫轉換
char = 'B'
shifted = chr(ord(char) + 3)   # 'B'(66) + 3 = 69 -> 'E'
print(shifted)                 # "E"

# 大寫轉小寫位移公式
lower_c = chr(ord('G') + 32)
print(lower_c)                 # "g" (71 + 32 = 103 -> 'g')

# ⚠️ 高頻地雷 1：ord() 只能接收單一字元，傳入字串會崩潰
# print(ord("AGENT"))          # 💥 TypeError: ord() expected a character, but string of length 5 found

# ⚠️ 高頻地雷 2：字元數字轉整數值，誤用 ord()
char_digit = "7"
print(int(char_digit))         # 7 (得到真正的數值 7)
print(ord(char_digit))         # 55 (得到 ASCII 碼 55，不是 7！)
# 若要以 ASCII 取得純數值，必須扣除基準 '0'：
print(ord(char_digit) - ord('0'))  # 55 - 48 = 7`,
        tip: "考前 10 秒錦囊：背住三組數字：0->48、A->65、a->97。小寫比較胖比較重 (+32)；數字字元 '5' 的 ord 不是 5 是 53！"
      },
      {
        id: "ch2_c3",
        title: "字串不可變性 (Immutable) 與常見方法回傳陷阱",
        keyPoints: [
          "字串具有不可變性 (Immutable)：字串一旦在記憶體中生成，內部任何字元內容均無法被修改。",
          "索引賦值錯誤：嘗試寫 s[0] = 'X' 會引發 TypeError，Python 不支援字串原地改寫。",
          "所有字串方法（如 replace(), strip(), upper(), lower()）絕不會修改原字串，而是傳回一個全「新」的字串！",
          "修改後的結果必須重新指派給變數（如 s = s.replace(...)），否則變更將會憑空蒸發。"
        ],
        codeExample: `# ✅ 正確寫法：重新指派接收方法回傳的新字串
text = "code_broken"
text = text.replace("broken", "fixed")
print(text)                    # "code_fixed"

# 透過切片與字串拼接待換特定字元
word = "Cat"
word = "B" + word[1:]          # 替換第 0 個字元
print(word)                    # "Bat"

# ⚠️ 高頻地雷 1：嘗試原地索引賦值（TypeError）
target = "Python"
# target[0] = "J"              # 💥 TypeError: 'str' object does not support item assignment

# ⚠️ 高頻地雷 2：呼叫方法卻未接收回傳值（原變數毫無改變）
secret = "secret_plan"
secret.replace("secret", "public")  # 孤立呼叫，回傳值被遺棄
print(secret)                  # 陷阱！依然是 "secret_plan"！原字串毫髮無傷`,
        tip: "考前 10 秒錦囊：字串是鐵打的 (Immutable)！看到 s.replace() 沒寫 s = 去接，s 就絕對沒有變！s[0] = 'x' 直接語法報錯。"
      },
      {
        id: "ch2_c4",
        title: "字串拆解與組裝：split() 與 join() 的主客互換規則",
        keyPoints: [
          "str.split(sep)：將字串依照分隔符切分為子字串串列 (list)。",
          "str.split() 若不傳參數，會自動將連續的多個空白字元（空格、\\t、\\n）合併視為單一分隔符，並自動去除頭尾空白！",
          "str.join(iterable)：由「連接符字串」主動呼叫，將串列中的每個元素串接起來。",
          "join 元素限制：iterable 內的元素必須全部為字串 (str)，若有整數會引發 TypeError。"
        ],
        codeExample: `# ✅ 正確寫法：split 與 join 的標準協同
raw_csv = "agent_007,alpha,ready"
tokens = raw_csv.split(",")
print(tokens)                  # ['agent_007', 'alpha', 'ready']
joined = " | ".join(tokens)
print(joined)                  # "agent_007 | alpha | ready"

# ✅ 技巧：無參數 split() 能完美消化雜亂的多重空格
messy_log = "  login    success  2026 \n"
print(messy_log.split())       # ['login', 'success', '2026']（自動過濾所有空字串）

# ⚠️ 高頻地雷 1：join 呼叫主客顛倒
# tokens.join("-")             # 💥 AttributeError: 'list' object has no attribute 'join'
# 記住：是 "連接字串".join(串列)，不是 串列.join("連接字串")！

# ⚠️ 高頻地雷 2：join 串列中含有整數
nums = [10, 20, 30]
# "-".join(nums)               # 💥 TypeError: sequence item 0: expected str instance, int found
safe_str = "-".join(str(n) for n in nums)  # ✅ 正確做法：先將整數轉字串
print(safe_str)                # "10-20-30"`,
        tip: "考前 10 秒錦囊：記住是「膠水.join(積木)」！字串呼叫 join，不是串列呼叫 join；且積木串列裡只要有一顆不是字串（例如數字 1），立即爆 TypeError。"
      }
    ]
  },

  3: {
    chapterId: 3,
    chapterTitle: "第三章：資料矩陣防線",
    chapterSubtitle: "串列 (List) 記憶體機制、淺拷貝與排序",
    description: "直面考古題最高頻失分點！弄清參照別名與獨立複製的記憶體真相，徹底辨析 sort() 與 sorted() 的差異。",
    concepts: [
      {
        id: "ch3_c1",
        title: "變數別名參照 (b = a) vs 獨立淺拷貝 (b = a[:])",
        keyPoints: [
          "在 Python 中，串列變數儲存的是物件的「記憶體位址 (參照標籤)」。",
          "別名賦值 (b = a)：並未建立新物件，b 與 a 完全指向同一個記憶體區塊。修改 b[0] 同步改變 a[0]！",
          "淺拷貝 (b = a[:]、b = a.copy()、b = list(a))：開闢全新記憶體區塊複製外層，修改 b 的外層元素不會影響 a。",
          "巢狀串列陷阱：淺拷貝只獨立了最外層，內層的子串列依然共用參照位址！若要徹底隔離需使用 copy.deepcopy()。"
        ],
        codeExample: `# ✅ 正確寫法：需要獨立作業時建立淺拷貝
original = [1, 2, 3]
clone = original[:]            # 或 original.copy()
clone[0] = 99
print(original)                # [1, 2, 3]（原本的完全不受影響！）
print(clone)                   # [99, 2, 3]

# ⚠️ 高頻地雷 1：別名連體嬰陷阱（考古題必考第 1 名！）
x = [10, 20, 30]
y = x                          # 僅複製位址標籤，指向同一個串列！
y.append(40)
print(x)                       # 陷阱輸出：[10, 20, 30, 40]（x 也跟著變了！）
print(x is y)                  # True（兩者就是同一個記憶體實體）

# ⚠️ 高頻地雷 2：二維巢狀串列的淺拷貝盲區
nested = [[1, 2], [3, 4]]
shallow = nested[:]
shallow[0][0] = 888            # 修改內層串列元素
print(nested[0][0])            # 陷阱輸出：888！（內層子串列依然共用參照！）`,
        tip: "考前 10 秒錦囊：看見 b = a，改 b 等同改 a（連體嬰）；看見 b = a[:]，外層搬新家彼此獨立，但內層子串列還是會牽連。"
      },
      {
        id: "ch3_c2",
        title: "原地排序 list.sort() (回傳 None) vs 內建排序 sorted()",
        keyPoints: [
          "list.sort() 是串列的專屬方法：執行原地排序 (in-place)，直接修改原串列，回傳值永遠是 None！",
          "絕對禁忌：若寫 a = a.sort()，a 會直接被指派為 None，導致整組資料被抹除毀滅！",
          "sorted(iterable) 是全域內建函式：絕不修改原資料，而是產生並回傳一個全新的已排序串列。",
          "兩者皆支援降序參數 reverse=True，以及自訂權重鍵值 key=lambda x: ...。"
        ],
        codeExample: `# ✅ 正確寫法 1：使用 list.sort() 原地修改（不接回傳值）
nums = [5, 2, 8, 1]
nums.sort()                    # 原地排序，不要指派給任何變數！
print(nums)                    # [1, 2, 5, 8]

# ✅ 正確寫法 2：使用 sorted() 保留原始資料並傳回新串列
raw_data = [5, 2, 8, 1]
new_data = sorted(raw_data, reverse=True)
print(raw_data)                # [5, 2, 8, 1] (原串列保持原樣)
print(new_data)                # [8, 5, 2, 1] (全新排序副本)

# ⚠️ 高頻地雷：將 a.sort() 的回傳值重新賦值回去
target = [3, 1, 2]
target = target.sort()         # 💥 致命錯誤！
print(target)                  # 陷阱輸出：None！（原本的串列消失，變數變成 None！）`,
        tip: "考前 10 秒錦囊：list.sort() 回傳 None！考題只要看見 x = a.sort()，x 保證是 None！想要新串列必須呼叫 sorted(a)。"
      },
      {
        id: "ch3_c3",
        title: "串列增刪元素五大神技：append, extend, insert, pop, remove",
        keyPoints: [
          "append(x)：將 x 整包當作「單一元素」塞入末尾。若 x 是串列，會形成巢狀結構。",
          "extend(iterable)：將 iterable 內的元素逐一拆開攤平加入末尾，等同於串列拼接。",
          "pop(index)：移出指定索引之元素並「回傳該元素」；預設 index=-1（移出最末元素）。",
          "remove(value)：從左到右尋找並移除「第一個匹配的值」，回傳值為 None；若值不存在會引發 ValueError！",
          "del lst[index]：直接刪除指定索引或切片區間的元素，屬於陳述句無回傳值。"
        ],
        codeExample: `# ✅ append vs extend 差異對比
a = [1, 2]
a.append([3, 4])
print(a)                       # [1, 2, [3, 4]] (長度為 3，包成一個元素)

b = [1, 2]
b.extend([3, 4])
print(b)                       # [1, 2, 3, 4] (長度為 4，逐一展開加入)

# ✅ pop vs remove 差異對比
stack = ["Alpha", "Bravo", "Charlie"]
popped = stack.pop(1)          # 移出索引 1 的 "Bravo"，並將其回傳
print(popped)                  # "Bravo"
print(stack)                   # ['Alpha', 'Charlie']

# ⚠️ 高頻地雷 1：誤以為 remove() 會回傳被刪除的值
names = ["Alice", "Bob"]
res = names.remove("Alice")
print(res)                     # 陷阱！輸出 None，不是 "Alice"！

# ⚠️ 高頻地雷 2：remove 不存在的值導致程式崩潰
# names.remove("Zack")         # 💥 ValueError: list.remove(x): x not in list`,
        tip: "考前 10 秒錦囊：pop() 拿走誰就吐出誰（有回傳值）；remove() 默默做工回傳 None！append([1,2]) 串列只長大 1 節，extend([1,2]) 長大 2 節。"
      },
      {
        id: "ch3_c4",
        title: "串列運算子深水區：lst += [...] vs lst = lst + [...] 與乘法陷阱",
        keyPoints: [
          "a += [x] 是「原地擴充 (in-place)」：直接修改 a 的原記憶體區塊（等價於 a.extend([x])）。若有別名 b = a，b 也會同步看到修改！",
          "a = a + [x] 是「新建指派」：計算並產生一個全新的串列物件，再讓 a 指向新物件。若有別名 b = a，b 依然停留在原舊物件上不受影響。",
          "二維陣列初始化陷阱：[[0] * 3] * 3 看似 3x3 矩陣，其實是 3 列指向同一個內層串列！改其中一列會三列全改。",
          "矩陣正確初始化：應使用串列表達式 [[0] * 3 for _ in range(3)]，確保每列都是獨立新物件。"
        ],
        codeExample: `# ✅ 原地擴展 (+=) vs 新建串列 (+) 對別名的影響
list1 = [1, 2]
ref1 = list1
list1 += [3]                   # 原地修改！
print(ref1)                    # [1, 2, 3]（ref1 一起改變）

list2 = [1, 2]
ref2 = list2
list2 = list2 + [3]            # 新建串列指派！
print(ref2)                    # [1, 2]（ref2 依然留在舊物件！）

# ⚠️ 高頻地雷：乘法複製二維矩陣的大浩劫
matrix = [[0] * 3] * 3         # 致命！三列是同一個內層串列的別名
matrix[0][0] = 99
print(matrix)                  # 💥 [[99, 0, 0], [99, 0, 0], [99, 0, 0]]（三列全變 99！）

# ✅ 正確寫法：使用推導式生成真正獨立的二維陣列
safe_matrix = [[0] * 3 for _ in range(3)]
safe_matrix[0][0] = 99
print(safe_matrix)             # [[99, 0, 0], [0, 0, 0], [0, 0, 0]]（只有首列被修改）`,
        tip: "考前 10 秒錦囊：別名遇到 += 一同進退；遇到 = a + [] 各奔東西！看到 [[0]*3]*3 一律視為「改一格全滅」的影子矩陣地雷。"
      }
    ]
  },

  4: {
    chapterId: 4,
    chapterTitle: "第四章：循環迴路之謎",
    chapterSubtitle: "for/while 迴圈、巢狀結構、break 與 continue",
    description: "破解失控的指令迴圈！精確計算 range() 邊界、雙層巢狀迴圈的執行次數，並熟練運用中斷與跳過指令。",
    concepts: [
      {
        id: "ch4_c1",
        title: "range(start, stop, step) 邊界判定與元素計算法",
        keyPoints: [
          "range(start, stop[, step]) 嚴格恪守「左閉右開」原則：包含 start，但絕對不包含 stop！",
          "單一參數 range(n)：預設 start=0, step=1，產生 0 到 n-1，元素個數恰好為 n 個。",
          "負步長倒數：range(5, 0, -1) 產出 5, 4, 3, 2, 1（絕不包含 stop=0！共 5 個數）。若要數到 0，stop 必須寫成 -1！",
          "方向衝突為空：當起點與方向矛盾時（如 range(5, 1) 預設 step=+1 向右，或 range(1, 5, -1)），產出長度為 0 的空序列，迴圈 0 次！"
        ],
        codeExample: `# ✅ 正確寫法：標準計數與精準倒數
print(list(range(2, 9, 3)))    # [2, 5, 8] (8+3=11 超過 9 故停止)
print(list(range(5, 0, -1)))   # [5, 4, 3, 2, 1] (不含 stop=0)

# 想一路倒數計時到 0 的寫法：
print(list(range(3, -1, -1)))  # [3, 2, 1, 0] (包含 0)

# ⚠️ 高頻地雷 1：方向相反導致空迴圈（執行 0 次）
count = 0
for i in range(5, 1):          # 預設 step=+1 向右，但 5 往右不可能碰到 1
    count += 1
print(count)                   # 陷阱輸出：0！（迴圈一次都沒有執行！）

# ⚠️ 高頻地雷 2：誤以為 range(len(s)) 包含 len(s)
s = "CODE"
# for i in range(len(s)): 取出的 i 最大是 3，s[3] 安全！若誤寫到 4 會噴 IndexError。`,
        tip: "考前 10 秒錦囊：range(A, B, C) 永遠拿不到 B！倒數 range(5, 0, -1) 只會數到 1，絕不會有 0；正向 range(0, 5) 只會到 4，絕不會有 5。"
      },
      {
        id: "ch4_c2",
        title: "雙層巢狀迴圈：執行總次數累乘與變數覆寫陷阱",
        keyPoints: [
          "矩形巢狀迴圈：外層跑 M 次，內層跑 N 次，內層主體總共執行 M × N 次。",
          "階梯依存巢狀迴圈：若內層範圍依賴外層變數（如 for j in range(i):），總次數為等差級數累加：0 + 1 + 2 + ... + (M-1)。",
          "變數名稱覆寫地雷：內外層若不幸使用同一個變數名稱（如都是 for i in ...），內層會覆寫外層的變數值，導致外層邏輯大亂！"
        ],
        codeExample: `# ✅ 正確追蹤：雙層迴圈總次數與輸出
total = 0
for i in range(3):             # 外層 i = 0, 1, 2 (3次)
    for j in range(2):         # 內層 j = 0, 1 (2次)
        total += 1
print(total)                   # 3 * 2 = 6 次

# ✅ 內層依賴外層變數（三角形階梯累加）
steps = 0
for i in range(1, 4):          # i = 1, 2, 3
    for j in range(i):         # 分別跑 1, 2, 3 次
        steps += 1
print(steps)                   # 1 + 2 + 3 = 6 次

# ⚠️ 高頻地雷：內外層使用相同變數名導致變數污染
for i in range(3):
    for i in range(2):         # 💥 覆寫了外層的變數 i！
        pass
    # 此時 i 已經被內層最後一次賦值變成 1，破壞了原本外層迴圈預期的狀態變數`,
        tip: "考前 10 秒錦囊：先看內層 range 有沒有出現外層變數！有出現是三角形累加，沒出現直接外層次數乘內層次數。內外層變數重名時，內層會把外層吃掉。"
      },
      {
        id: "ch4_c3",
        title: "流程控制：break (僅中斷當層) vs continue (略過當前迭代)",
        keyPoints: [
          "break：立即終止並徹底跳出「當前所在的那一層」迴圈，前往該層迴圈之外接續執行。",
          "核心關鍵：在雙層或多層巢狀迴圈中，內層的 break 絕對不會跳出外層迴圈！外層迴圈仍會繼續推進下一輪！",
          "continue：立即放棄當前這一次迭代剩下的程式碼，不跳出迴圈，而是直接前往下一輪迭代。",
          "while 迴圈遞增陷阱：在 while 迴圈中使用 continue 時，計數器遞增語句若寫在 continue 之後，會造成無窮迴圈！"
        ],
        codeExample: `# ✅ 正確理解：break 僅跳出「當層」內層迴圈
for i in range(3):             # 外層: i = 0, 1, 2
    for j in range(3):         # 內層: j = 0, 1, 2
        if j == 1:
            break              # ⚠️ 僅擊碎當層的內層 j 迴圈！
        print(f"({i},{j})", end=" ")
# 輸出：(0,0) (1,0) (2,0) （外層 i 依然老老實實跑滿 3 次！）

# ⚠️ 高頻地雷：continue 導致 while 陷入死循環
count = 0
while count < 3:
    count += 1
    if count == 2:
        continue               # 跳過本次印出，直接進入下一輪 while
    print(count, end=" ")      # 輸出：1 3
# ❌ 若把 count += 1 寫在 continue 之後，當 count==2 時將永久卡死！`,
        tip: "考前 10 秒錦囊：考巢狀迴圈配 break，千萬別以為整個程式停了！它只打碎內層玻璃，外層還在繼續轉下一輪！"
      },
      {
        id: "ch4_c4",
        title: "迴圈專屬 else 結構：正常結束 vs 暴力中斷觸發條件",
        keyPoints: [
          "Python 允許在 for 與 while 迴圈後直接接 else 區塊。",
          "else 觸發條件：只有當迴圈「自然走完結束」（for 迭代完所有元素、while 條件自然變為 False）時，才會執行 else！",
          "else 略過條件：如果迴圈中途被 break 強制打斷跳出，else 區塊會被徹底略過，絕對不執行！",
          "零次執行陷阱：若 while 條件一開始就為 False（或 for 迭代空序列），迴圈體 0 次執行，但依然屬於「自然結束」，因此 else 依然會執行！"
        ],
        codeExample: `# ✅ 正常走完：順利觸發 else 區塊
for n in [2, 4, 6]:
    if n % 2 != 0:
        break
else:
    print("檢查完畢：全數皆為偶數")  # 輸出：檢查完畢：全數皆為偶數

# ⚠️ 高頻地雷 1：中途被 break，else 徹底失效
for n in [2, 3, 6]:
    if n % 2 != 0:
        print("發現奇數:", n)
        break                  # 強制中斷！
else:
    print("全數皆為偶數")      # ❌ 被 break 略過，絕對不會印出！
# 輸出：發現奇數: 3

# ⚠️ 高頻地雷 2：一開始條件就為假，else 依然執行
k = 10
while k < 5:                   # 一次都沒有進入迴圈體
    print("執行迴圈")
else:
    print("依然觸發 else！")   # ✅ 輸出：依然觸發 else！（因為未遭遇 break）`,
        tip: "考前 10 秒錦囊：口訣「有 break 沒 else，沒 break 才 else」！哪怕迴圈一次都沒跑（一開始條件就假），只要沒碰到 break，else 都會乖乖執行。"
      }
    ]
  },

  5: {
    chapterId: 5,
    chapterTitle: "第五章：核心指令與領域",
    chapterSubtitle: "函式 def、預設參數陷阱、作用域與 UnboundLocalError",
    description: "進入程式的核心中樞！掌握函式回傳機制、預設引數的評估時機，以及全域與區域變數的作用域雷區。",
    concepts: [
      {
        id: "ch5_c1",
        title: "函式參數排布規範（位置 vs 預設）與預設回傳 None",
        keyPoints: [
          "參數定義順序：沒有預設值的「位置參數」必須嚴格排在具有預設值的參數之前！例如 def f(a, b=2) 合法，但 def f(a=1, b) 會直接引發 SyntaxError。",
          "呼叫引數順序：呼叫時，位置引數絕不能排在關鍵字引數 (keyword argument) 之後！例如 f(10, b=20) 合法，但 f(a=10, 20) 語法錯誤。",
          "未寫 return 的回傳本質：函式若沒有執行 return，或者只寫了單獨的 return，其回傳值一律為 None（不是 0，不是空字串，也不是 False）。"
        ],
        codeExample: `# ✅ 正確寫法：合法的參數順序與明確回傳
def create_agent(codename, clearance=1, active=True):
    return f"[{clearance}] Agent {codename} (Active={active})"

print(create_agent("Shadow"))                # [1] Agent Shadow (Active=True)
print(create_agent("Falcon", clearance=3))   # [3] Agent Falcon (Active=True)

# ⚠️ 高頻地雷 1：定義時預設參數排在非預設參數前方
# def bad_def(level=1, codename):            # 💥 SyntaxError: non-default argument follows default argument
#     pass

# ⚠️ 高頻地雷 2：呼叫時位置引數排在關鍵字引數後面
# create_agent(codename="Ghost", 2)          # 💥 SyntaxError: positional argument follows keyword argument

# ⚠️ 高頻地雷 3：忘記 return 導致接收到 None
def calculate_power(base):
    result = base ** 2                       # 運算完成但沒有 return！

p = calculate_power(5)
print(p)                                     # 陷阱輸出：None！（不是 25！）`,
        tip: "考前 10 秒錦囊：宣告函式「沒預設的站前面，有預設的站後面」；呼叫函式「純數值站前面，key=value 站後面」；沒寫 return 成果直接化為 None！"
      },
      {
        id: "ch5_c2",
        title: "可變預設參數陷阱：def f(x=[]) 跨呼叫共享記憶體真相",
        keyPoints: [
          "評估時機：Python 函式的預設引數只在函式被定義（def 語句被載入時）評估一次，而不是每次呼叫時重新生成！",
          "共享記憶體陷阱：若將可變物件（如串列 []、字典 {}）作為預設參數，所有未傳入該引數的呼叫將永久共用同一個記憶體實體！",
          "跨呼叫累積效應：先前呼叫中對該預設串列所做的修改（如 append），會持續殘留並累積到下一次呼叫中。",
          "標準安全解法：預設引數應使用不可變的 None，在函式內部再透過 if x is None: x = [] 動態建立全新容器。"
        ],
        codeExample: `# ⚠️ 考古題必考第 1 名大陷阱：可變預設參數跨呼叫累積
def enroll_student(name, roster=[]):         # roster 只在載入時建構一次！
    roster.append(name)
    return roster

print(enroll_student("Alice"))               # ['Alice']
print(enroll_student("Bob"))                 # 💥 陷阱！輸出 ['Alice', 'Bob']！不是 ['Bob']！
print(enroll_student("Charlie", []))         # ['Charlie'] (傳入自訂新串列，不使用預設)
print(enroll_student("David"))               # 💥 輸出 ['Alice', 'Bob', 'David']！（沿用舊預設串列）

# ✅ 正確標準防禦寫法：以 None 作為預設值
def safe_enroll(name, roster=None):
    if roster is None:
        roster = []                          # 每次呼叫都是獨立的新串列！
    roster.append(name)
    return roster

print(safe_enroll("Alice"))                  # ['Alice']
print(safe_enroll("Bob"))                    # ['Bob']（乾淨獨立，互不干擾！）`,
        tip: "考前 10 秒錦囊：看到 def f(x=[])，只要多次呼叫且沒傳 x，x 就會把每次 append 的東西一直串下去累積！要安全重設，預設值必須寫 x=None。"
      },
      {
        id: "ch5_c3",
        title: "作用域 LEGB 規則與 global 關鍵字宣告修改",
        keyPoints: [
          "LEGB 搜尋層級：Local (函式內部) -> Enclosing (閉包外層) -> Global (全域模組) -> Built-in (內建環境)。",
          "只讀不改無需 global：函式內部可以直接存取並讀取全域變數的值，無須宣告 global。",
          "賦值即區域：只要函式內部有出現對變數賦值（x = ...），Python 便會將其認定為「區域變數」，進而遮蔽外層全域同名變數。",
          "修改全域需宣告：若欲在函式內部對全域變數重新指派（修改其指向），必須在函式首行明確宣告 global x。"
        ],
        codeExample: `# ✅ 情境 1：純讀取全域變數（完全合法，無須 global）
base_url = "https://ntu.edu.tw"
def get_api():
    return base_url + "/api"                 # 直接讀取全域變數

print(get_api())                             # "https://ntu.edu.tw/api"

# ✅ 情境 2：正確使用 global 修改全域變數
kill_count = 0
def register_kill():
    global kill_count
    kill_count += 1                          # 成功修改全域變數

register_kill()
print(kill_count)                            # 輸出 1

# ⚠️ 高頻地雷：函式內指派未加 global（只是影子，改不到外面）
shield = 100
def damage():
    shield = 50                              # 這只是區域變數 shield，遮蔽了全域變數！

damage()
print(shield)                                # 陷阱！依然是 100，外層全域變數完全未受影響！`,
        tip: "考前 10 秒錦囊：只讀全域不用 global；但在函式裡想寫 x = 新值 來改變外面的變數，就非寫 global x 不可，否則改的只是同名的影子（區域變數）。"
      },
      {
        id: "ch5_c4",
        title: "考古熱門殺手：UnboundLocalError 發生成因與避坑策略",
        keyPoints: [
          "編譯期決定作用域：Python 解譯器在執行函式前會預先編譯掃描。只要函式內任何地方有出現賦值語句（如 x = 1 或 x += 1），x 在整座函式中就徹底被標定為區域變數！",
          "致命盲區：如果在賦值語句之前，就先嘗試讀取或 print(x)，Python 不會向外尋找全域變數，而是判定「區域變數尚未被賦值即被取用」，當場噴出 UnboundLocalError！",
          "x += 1 的陷阱：x += 1 本質是 x = x + 1，需要先讀取 x 的值再來賦值，若未宣告 global x，必然觸發 UnboundLocalError。"
        ],
        codeExample: `counter = 10

# ⚠️ 致命地雷：UnboundLocalError 經典現形
def buggy_func():
    # 下行會直接爆炸！因為後面有 counter = 20，導致 Python 將 counter 判定為區域變數；
    # 但此時它根本還沒被賦值，就提前被讀取！
    # print(counter)                         # 💥 UnboundLocalError: cannot access local variable 'counter'
    # counter = 20
    pass

def buggy_increment():
    # counter += 1                           # 💥 UnboundLocalError！（等價於 counter = counter + 1，先讀取再賦值）
    pass

# ✅ 正確解法 1：宣告 global
def safe_increment():
    global counter
    counter += 1                             # 合法修改全域 counter

safe_increment()
print(counter)                               # 11

# ✅ 正確解法 2：作為參數傳入並傳回新值（純函式無副作用，更佳風格）
def pure_increment(val):
    return val + 1
counter = pure_increment(counter)            # 12`,
        tip: "考前 10 秒錦囊：函式裡只要後面有 x = ... 或 x += 1，前面又想 print(x)，100% 噴 UnboundLocalError！因為看到賦值就把他當區域變數，前面沒給值就讀，直接當場陣亡。"
      }
    ]
  },

  6: {
    chapterId: 6,
    chapterTitle: "第六章：特務高階工具箱",
    chapterSubtitle: "zip、enumerate、串列表達式與例外處理",
    description: "裝備最優雅的 Pythonic 武器！精通 zip/enumerate 的解包遍歷、單雙層 List Comprehension 及例外防禦。",
    concepts: [
      {
        id: "ch6_c1",
        title: "zip() 多序列並行配對與最短截斷特性",
        keyPoints: [
          "zip(*iterables)：將多個可迭代物件按相同索引元素打包成一個個元組 (tuple)。",
          "最短長度截斷（重要考點）：當傳入的多個序列長度不一致時，zip() 會在最短的序列耗盡時立即終止，多出的元素直接被無聲丟棄，絕不報錯！",
          "惰性求值特性：zip() 傳回的是一個迭代器 (iterator)，只能被完整遍歷消耗一次；若要反覆使用需以 list(zip(...)) 或 dict(zip(...)) 實體化。",
          "反向解包矩陣：list(zip(*matrix)) 可神奇實現二維矩陣的轉置 (Transpose)！"
        ],
        codeExample: `agents = ["Alpha", "Bravo", "Charlie"]       # 長度 3
weapons = ["Pistol", "Rifle"]                # 長度 2 (較短)

# ✅ 正確寫法：zip 並行配對遍歷
for a, w in zip(agents, weapons):
    print(f"{a}: {w}")
# 輸出：
# Alpha: Pistol
# Bravo: Rifle
# ('Charlie' 因為 weapons 已經用盡，自動被截斷捨棄，不輸出也不報錯！)

# ✅ 二維矩陣轉置神技
matrix = [[1, 2], [3, 4], [5, 6]]
transposed = [list(row) for row in zip(*matrix)]
print(transposed)                            # [[1, 3, 5], [2, 4, 6]]

# ⚠️ 高頻地雷 1：忘記 zip 是迭代器，無法以索引取值
zipped = zip(agents, weapons)
# print(zipped[0])                           # 💥 TypeError: 'zip' object is not subscriptable
print(list(zipped))                          # [('Alpha', 'Pistol'), ('Bravo', 'Rifle')]

# ⚠️ 高頻地雷 2：迭代器消耗一次即枯竭變空
z = zip([1, 2], ["A", "B"])
print(list(z))                               # [(1, 'A'), (2, 'B')]
print(list(z))                               # 陷阱！輸出 []（已被抽乾消耗完畢！）`,
        tip: "考前 10 秒錦囊：zip() 是「短板理論」！兩條串列一長一短，長度以「短的」為準，長出來的尾巴全部被當作不存在！回傳的是 iterator，只能迭代一次。"
      },
      {
        id: "ch6_c2",
        title: "enumerate() 雙值解包與自訂起始索引技巧",
        keyPoints: [
          "enumerate(iterable, start=0)：同時遍歷「索引計數」與「元素本體」，每次迭代產出 (index, item) 元組。",
          "自訂起始序號：透過 start 參數可改變起始編號（例如 start=1，序號由 1 開始累加）。",
          "解包變數順序固定：Python 永遠將第一個變數賦值為索引序號，第二個變數賦值為元素內容，千萬不可顛倒！",
          "start 參數不影響切片：start=1 只是序號標籤從 1 號開始發放，依然是從 iterable 的第 0 個元素開始取出！"
        ],
        codeExample: `gear = ["Shield", "Drone", "EMP"]

# ✅ 正確寫法：設定 start=1 進行人類友善編號
for rank, item in enumerate(gear, start=1):
    print(f"等級 {rank}: {item}")
# 輸出：
# 等級 1: Shield
# 等級 2: Drone
# 等級 3: EMP

# ⚠️ 高頻地雷 1：解包變數順序顛倒（邏輯大災難）
for item, idx in enumerate(gear):            # 陷阱！Python 永遠把第一個當序號
    print(f"{item} -> {idx}")
# 輸出：0 -> Shield （變數名稱叫 item 卻拿到了整數 0！）

# ⚠️ 高頻地雷 2：誤以為 start=1 是從 gear[1] 開始讀取
# 錯誤認知：認為 start=1 會跳過 "Shield"
# 正確事實：gear[0] 的 "Shield" 被賦予序號 1；依然從頭完整遍歷！`,
        tip: "考前 10 秒錦囊：enumerate 吐出來永遠是 (序號, 內容)！start=1 只是改變序號貼紙從 1 號開始貼，陣列元素依然是從第 0 個開始取，千萬別搞混！"
      },
      {
        id: "ch6_c3",
        title: "串列表達式 (List Comprehension)：單層過濾與雙層展開順序",
        keyPoints: [
          "單層過濾語法：[expr for item in iterable if condition]。只有符合 if 條件的元素才會經過 expr 計算加入新串列。",
          "包含 else 的三元運算語法：[expr_if_true if cond else expr_if_false for item in iterable]。注意：帶有 else 時必須整個移到 for 前方！",
          "雙層巢狀展開語法：[expr for x in list1 for y in list2]，其閱讀與執行順序「完全等同於外層 for x、內層 for y」的巢狀迴圈！",
          "獨立作用域：串列表達式內部變數具獨立區域作用域，執行完畢後不會污染外層命名空間。"
        ],
        codeExample: `# ✅ 正確寫法 1：單層過濾（篩選偶數並平方）
squares = [x**2 for x in range(6) if x % 2 == 0]
print(squares)                               # [0, 4, 16]

# ✅ 正確寫法 2：三元運算子（含 else 放 for 前面）
status = ["Pass" if score >= 60 else "Fail" for score in [75, 40, 90]]
print(status)                                # ['Pass', 'Fail', 'Pass']

# ✅ 正確寫法 3：雙層展開（左邊是外層，右邊是內層）
colors = ["Red", "Blue"]
sizes = ["S", "M"]
tshirts = [f"{c}-{s}" for c in colors for s in sizes]
print(tshirts)                               # ['Red-S', 'Red-M', 'Blue-S', 'Blue-M']

# ⚠️ 高頻地雷 1：含 else 卻放在最後面（語法錯誤）
# bad_comp = [x for x in range(5) if x > 2 else 0]  # 💥 SyntaxError: invalid syntax

# ⚠️ 高頻地雷 2：雙層推導式的順序顛倒認知
# [f(x, y) for x in A for y in B]
# 等價於：
# for x in A:
#     for y in B:
#         ...`,
        tip: "考前 10 秒錦囊：只有 if 放在最後面過濾；要有 if ... else 必須放在 for 前面！雙層推導式 [x+y for x in A for y in B]，左邊的 for x 是外層，右邊的 for y 是內層！"
      },
      {
        id: "ch6_c4",
        title: "例外處理架構：try / except / else / finally 流程控制與回傳覆蓋",
        keyPoints: [
          "try 區塊：存放可能引發例外的危險代碼。",
          "except ErrorType 區塊：精準捕捉指定型態的錯誤（如 ValueError, ZeroDivisionError, IndexError）。",
          "else 區塊：只有在 try 區塊「完全沒有發生任何例外」時，才會順利執行！",
          "finally 區塊：無論有沒有例外、有沒有被 except 抓到、甚至 try 裡有 return，都保證「必定執行」！",
          "finally 覆蓋 return 陷阱：若 finally 區塊內部寫了 return，會強行抹除並覆蓋 try 或 except 裡原本的 return 值！"
        ],
        codeExample: `# ✅ 正確寫法：完整的四段式例外防禦
def divide_intel(a, b):
    try:
        res = a / b
    except ZeroDivisionError:
        print("攔截錯誤：除數不可為 0！")
        return None
    except TypeError:
        print("攔截錯誤：參數型態不符！")
        return None
    else:
        print("運算成功：無任何異常！")
        return res
    finally:
        print("清理工作：釋放系統資源。")

print("結果:", divide_intel(10, 2))
# 輸出：
# 運算成功：無任何異常！
# 清理工作：釋放系統資源。
# 結果: 5.0

# ⚠️ 高頻地雷：finally 霸道覆蓋 return 值
def override_test():
    try:
        return "ORIGINAL_VALUE"
    finally:
        return "FINALLY_OVERRIDE"            # 💥 強行霸道覆蓋前面的 return值！

print(override_test())                       # 陷阱輸出："FINALLY_OVERRIDE"！（不是 "ORIGINAL_VALUE"）`,
        tip: "考前 10 秒錦囊：記憶四部曲：try 試探、except 擋刀、else 沒事慶祝、finally 善後必跑。小心 finally 裡的 return 會霸道沒收前面的所有 return！"
      }
    ]
  }
};

/**
 * 輔助陣列格式：提供 CHAPTER_CONCEPTS 供依照順序遍歷或與章節 ID 匹配
 */
const CHAPTER_CONCEPTS = [
  CONCEPT_BRIEFINGS[1],
  CONCEPT_BRIEFINGS[2],
  CONCEPT_BRIEFINGS[3],
  CONCEPT_BRIEFINGS[4],
  CONCEPT_BRIEFINGS[5],
  CONCEPT_BRIEFINGS[6]
];

/**
 * HTML 生成函式：產出符合《Python 特務》電競科幻戰術 UI 風格的觀念卡片 HTML
 * @param {number} chapterId 章節編號 1 ~ 6
 * @returns {string} 完整的 HTML 字串，可直接賦值給 briefing-content 容器
 */
function renderConceptCardsHTML(chapterId) {
  const chapter = CONCEPT_BRIEFINGS[chapterId];
  if (!chapter) {
    return `<div class="p-4 text-center text-slate-400">情報資料庫查無此章節代號。</div>`;
  }

  return chapter.concepts.map((concept, idx) => {
    // Escape HTML for code preview
    const escapedCode = concept.codeExample
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    return `
      <div class="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 shadow-lg space-y-3 transition hover:border-cyan-400/50">
        <!-- 模組標題列 -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-2">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              MODULE 0${idx + 1}
            </span>
            <h4 class="text-sm sm:text-base font-bold text-white tracking-wide">
              ${concept.title}
            </h4>
          </div>
          <span class="text-[11px] font-mono text-cyan-400/70">TOP_SECRET</span>
        </div>

        <!-- 分列重點清單 -->
        <div class="space-y-1.5 pl-1">
          ${concept.keyPoints.map(point => `
            <div class="flex items-start gap-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span class="text-cyan-400 mt-1 flex-shrink-0 text-xs">◈</span>
              <span>${point}</span>
            </div>
          `).join("")}
        </div>

        <!-- 實戰程式碼對照區 -->
        <div class="space-y-1">
          <div class="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
            <span class="flex items-center gap-1.5 text-cyan-300">
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>TACTICAL CODE ANALYSIS // 語法剖析與陷阱</span>
            </span>
            <span class="text-slate-500">Python 3.x</span>
          </div>
          <pre class="p-3 rounded-lg bg-slate-950/95 border border-slate-800/80 font-mono text-[11px] sm:text-xs text-slate-200 overflow-x-auto whitespace-pre leading-relaxed shadow-inner"><code>${escapedCode}</code></pre>
        </div>

        <!-- 考前 10 秒解題錦囊 -->
        <div class="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2 shadow-sm">
          <span class="text-amber-400 flex-shrink-0 text-sm">⚡</span>
          <div class="leading-relaxed font-sans">
            <span class="font-bold text-amber-400">【考前 10 秒錦囊】</span>
            <span>${concept.tip.replace(/^考前 10 秒錦囊：/, '')}</span>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// 自動增強已存在的 CHAPTERS_DATA（若已在頁面載入）
if (typeof CHAPTERS_DATA !== 'undefined' && Array.isArray(CHAPTERS_DATA)) {
  CHAPTERS_DATA.forEach(ch => {
    if (CONCEPT_BRIEFINGS[ch.id]) {
      ch.concepts = CONCEPT_BRIEFINGS[ch.id].concepts;
    }
  });
}

// 支援 Node.js 環境匯出以利單元測試
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CONCEPT_BRIEFINGS,
    CHAPTER_CONCEPTS,
    renderConceptCardsHTML
  };
}

// 支援瀏覽器環境掛載至 window 全域
if (typeof window !== 'undefined') {
  window.CONCEPT_BRIEFINGS = CONCEPT_BRIEFINGS;
  window.CHAPTER_CONCEPTS = CHAPTER_CONCEPTS;
  window.renderConceptCardsHTML = renderConceptCardsHTML;
}

