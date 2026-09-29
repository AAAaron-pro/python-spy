/**
 * 《Python 特務：滿分計畫》- 戰術情報智庫：全章節核心觀念卡 (Concept Briefings)
 * 對齊台大「程式設計與網路資料搜集」(GenEdu5010) Exam 1 (W1-W5)
 * 
 * 架構特點：
 * 1. 結構化分列 (keyPoints)：條列清晰，直擊考試核心機制。
 * 2. 實戰對照程式碼 (codeExample)：全數配備「# ✅ 正確寫法」與「# ⚠️ 高頻地雷」鮮明對比。
 * 3. 考前 10 秒錦囊 (tip)：臨場秒殺題目的直覺心法與口訣。
 * 4. 支援動態 HTML 渲染 (renderConceptCardsHTML)，無縫升級 Briefing Modal。
 * 5. 全 6 大章節 36 個模組極致擴充，徹底掃除所有解題觀念盲區！
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
        title: "print() 格式控制：sep 分隔符與 end 換行控制全解析",
        keyPoints: [
          "print(*objects, sep=' ', end='\\n') 預設在多個印出物件之間插入「單一空格」(sep=' ')，並在結尾加上「換行符」(end='\\n')。",
          "自訂 sep 可改變各項中間的連接字元；設為 sep='' 可消除所有間隔，緊密黏合無縫輸出。",
          "自訂 end 可阻斷預設換行（如 end='' 或 end=' -> '），使下一次呼叫的 print() 接續在同一行輸出。",
          "連續多個 print() 呼叫時，只要前面的 print 設定了非換行的 end，後續所有 print 都會緊跟在同一行，直到遇見換行符號為止。"
        ],
        codeExample: `# ✅ 正確寫法：精準控制分隔符號與同行延續輸出
print("Agent", "007", "Active", sep="-", end=" >>> ")
print("Mission Start")
# 輸出：Agent-007-Active >>> Mission Start（全部在同一行）

# ⚠️ 高頻地雷 1：誤以為 sep 會影響結尾，或忘記 end 預設自動換行
print("A", "B", sep=",")
print("C")
# 陷阱輸出：
# A,B （注意：已自動換行！）
# C   （絕不是 A,B,C！）

# ⚠️ 高頻地雷 2：連續同行輸出未在最後換行，干擾後續輸出
for i in range(3):
    print(i, end=" ")
print("Done")
# 陷阱輸出：0 1 2 Done（Done 會黏在同一行最後，而不是換行印出）`,
        tip: "考前 10 秒錦囊：看見多個 print() 先抓有沒有 end=！沒有 end= 就是各自分行；有 end 才會把下一個 print 抓到同一行；括號內多個參數中間看 sep=。"
      },
      {
        id: "ch1_c2",
        title: "input() 永遠回傳字串本質與強制型態轉換陷阱 (int / float / str)",
        keyPoints: [
          "input() 無論使用者在鍵盤敲入整數、浮點數或符號，解譯器回傳的型態百分之百永遠是「字串 (str)」！",
          "未轉型拼接陷阱：若字串未經 int() 或 float() 強制轉型直接進行 + 運算，會執行「字串串接」而非「數學相加」（例如 \"10\" + \"20\" 結果為 \"1020\" 而非 30）。",
          "小數字串轉型致命地雷：包含小數點的字串（如 \"3.14\"）直接執行 int(\"3.14\") 會當場引發 ValueError！必須先經 float(\"3.14\") 再轉 int()。",
          "字串與數值不可直接以 + 相加：\"Score: \" + 100 會直接拋出 TypeError，必須顯式轉為字串 str(100) 或使用 f-string。"
        ],
        codeExample: `# ✅ 正確寫法：取得輸入後立即顯式轉型、處理浮點字串取整
raw_a, raw_b = "10", "20"         # 模擬 input() 取得的文字
num_a, num_b = int(raw_a), int(raw_b)
print(num_a + num_b)              # 數學相加：30

s = "3.14"
val = int(float(s))               # 先轉 float 得到 3.14，再轉 int 截斷得到 3

# ⚠️ 高頻地雷 1：忘記轉型直接相加（字串拼接陷阱）
print(raw_a + raw_b)              # 陷阱輸出："1020"，不是 30！

# ⚠️ 高頻地雷 2：帶小數點字串直接使用 int() 轉型（當場崩潰）
# int("3.14")                     # 💥 ValueError: invalid literal for int() with base 10: '3.14'

# ⚠️ 高頻地雷 3：字串與數值直接用 + 號相加
# print("Level: " + 5)            # 💥 TypeError: can only concatenate str (not "int") to str
print(f"Level: {5}")              # ✅ 正確做法：使用 f-string 或 str(5)`,
        tip: "考前 10 秒錦囊：input() 出來永遠是字串！\"10\" + \"20\" = \"1020\"；想把 \"3.14\" 變整數，不能直接 int(\"3.14\")，必須先 float 再 int：int(float(\"3.14\"))！"
      },
      {
        id: "ch1_c3",
        title: "整數除法 // 與取餘數 %：負數向下取整規則與數學公式",
        keyPoints: [
          "浮點除法 / 的計算結果永遠是浮點數 (float)，即便能夠整除亦然（如 4 / 2 結果是 2.0，不是 2）。",
          "整數除法 // (Floor Division) 嚴格採取「向下取整（向負無限大取整，即 math.floor）」，而非向 0 截斷！",
          "負數整數除法震撼彈：正數 13 // 4 == 3，但負數 -13 // 4 == -4（因為 -3.25 往下掉到下一個更小的整數是 -4，絕對不是 -3！）。",
          "餘數運算 % 嚴格遵守 Python 數學公理：r = a - (a // b) * b。",
          "只要除數 b > 0，餘數 r 保證必定大於等於 0！例如 -13 % 4 == 3（驗算：-13 - (-4)*4 = -13 - (-16) = 3）。"
        ],
        codeExample: `# ✅ 正確計算：正負數整數除法與餘數公理
print(13 // 4)                    # 3  (因為 3.25 向下取整為 3)
print(13 % 4)                     # 1  (13 - 3*4 = 1)

print(-13 // 4)                   # -4 (因為 -3.25 向負無限大取整為 -4！)
print(-13 % 4)                    # 3  (驗算：-13 - (-4)*4 = -13 + 16 = 3)

# ⚠️ 高頻地雷 1：誤以為 // 是直接丟掉小數點（誤以為 -13 // 4 是 -3）
# 正確記憶：正數往下走是靠近 0，負數往下走是遠離 0 變得更小！
print(-7 // 2)                    # -4 (不是 -3！)
print(-7 % 2)                     # 1  (不是 -1！因為 -7 - (-4)*2 = -7 + 8 = 1)

# ⚠️ 高頻地雷 2：浮點除法 / 的型態陷阱
result = 6 / 3
print(type(result), result)       # <class 'float'> 2.0 (不是整數 2！)`,
        tip: "考前 10 秒錦囊：負數整數除法一律「往左邊掉」！-13 // 4 算出來是 -3.25，往左邊掉就是 -4；餘數套公式 r = a - (a//b)*b，所以 -13 - (-4*4) = 3！"
      },
      {
        id: "ch1_c4",
        title: "次方運算 ** 右結合律與運算子優先順序大解密",
        keyPoints: [
          "次方運算子 ** 是 Python 中少見具有「右結合律 (Right-associative)」的運算子！",
          "右結合運算順序：2 ** 3 ** 2 由右至左計算，即 2 ** (3 ** 2) = 2 ** 9 = 512，絕對不是 (2 ** 3) ** 2 = 64！",
          "負號與次方優先權陷阱：次方 ** 的優先級高於一元負號 -！因此 -3 ** 2 等於 -(3 ** 2) = -9；欲算負三的平方必須括號 (-3) ** 2 = 9。",
          "運算子優先級梯隊：小括號 () > 次方 ** > 正負號 +x, -x > 乘除整除取餘 *, /, //, % > 加減 +, - > 比較運算 ==, !=, <, > > 邏輯 not > and > or。"
        ],
        codeExample: `# ✅ 正確計算：次方右結合與括號優先級
print(2 ** 3 ** 2)                # 512 (等價於 2 ** (3 ** 2) = 2 ** 9 = 512)
print((2 ** 3) ** 2)              # 64  (有括號才先算左邊)

# ✅ 一元負號與次方的優先順序對比
print(-2 ** 4)                    # -16 (等價於 -(2 ** 4) = -16，次方比負號優先！)
print((-2) ** 4)                  # 16  (括號包覆負號，四次方轉正數)

# ⚠️ 高頻地雷 1：誤以為次方是由左向右計算（誤答 64）
# ⚠️ 高頻地雷 2：混合運算子優先級錯亂
x = 3 + 2 * 4 ** 2                # 4**2=16 -> 2*16=32 -> 3+32=35
print(x)                          # 35

# ⚠️ 高頻地雷 3：邏輯運算子優先順序（not > and > or）
print(True or False and False)    # True (先算 False and False -> False，再算 True or False -> True)`,
        tip: "考前 10 秒錦囊：2 ** 3 ** 2 先算右邊 3**2=9，再算 2**9=512！前面有負號沒括號 -3 ** 2 = -9！運算子順序：括號 > 次方 > 乘除 > 加減 > 比較 > not > and > or。"
      },
      {
        id: "ch1_c5",
        title: "bool() 真假值真諦 (Truthy vs Falsy) 與非空容器陷阱",
        keyPoints: [
          "Python 中判定為 False 的假值（Falsy）只有極少數特定值：數值 0, 0.0, 0j、空字串 ''、空串列 []、空元組 ()、空字典 {}、空集合 set()、特殊值 None 與 False。",
          "其餘一切值皆為 True（Truthy）！只要「非零」且「非空」，在布林環境下均判定為真。",
          "經典假值文字陷阱：'False'、'0'、'None' 均為非空字串，bool() 結果通通是 True！",
          "空白鍵陷阱：包含空格的字串 ' ' 長度為 1，bool(' ') 是 True！",
          "非空假值容器陷阱：串列內裝著假值（如 [0]、[False]、[None]），因為長度大於 0，bool() 結果保證為 True！"
        ],
        codeExample: `# ✅ 正確理解：Python 假值八大金剛 vs 非空真值
print(bool(0), bool(0.0), bool(""), bool([]), bool(None))  # 全部是 False

# ⚠️ 高頻地雷 1：字串文字外表是假，骨子裡是非空字串（通通是 True！）
print(bool("False"))              # True  (長度為 5 的非空字串)
print(bool("0"))                  # True  (長度為 1 的非空字串)
print(bool(" "))                  # True  (長度為 1 的空白字元字串，非空！)

# ⚠️ 高頻地雷 2：容器肚子裡裝了 0 或 False，依然是非空容器
print(bool([0]))                  # True  (串列長度為 1，包含元素 0)
print(bool([False]))              # True  (串列非空)
print(bool([None]))               # True  (串列非空)
print(bool([[]]))                 # True  (外層串列非空，裡面裝了子串列)

# ✅ Pythonic 條件判斷寫法：直接利用容器真假值
items = []
if not items:
    print("清單目前是空的")       # 簡潔優雅，無需寫 if len(items) == 0:`,
        tip: "考前 10 秒錦囊：背住假值八大金剛（0, 0.0, '', [], (), {}, None, False），其餘通通是 True！'False' 是 True、' ' 是 True、[0] 是 True，只要肚子裡有裝東西就是 True！"
      },
      {
        id: "ch1_c6",
        title: "短路邏輯 (and / or) 求值本質與 PEP 8 官方代碼風格規範",
        keyPoints: [
          "短路求值（Short-circuit Evaluation）核心：and 與 or 不一定回傳布林值，而是「直接回傳最後拍板定案的那個運算元物件本體」！",
          "A and B：若 A 為假，結果必定為假，立即短路回傳 A；若 A 為真，必須看 B，故回傳 B。",
          "A or B：若 A 為真，結果必定為真，立即短路回傳 A；若 A 為假，必須看 B，故回傳 B。",
          "PEP 8 命名規範：變數與函式用 snake_case（全小寫+底線），常數用 UPPER_CASE，類別用 PascalCase；嚴禁以數字開頭、不可使用保留字（如 pass, def, class）、不可用減號 -。",
          "PEP 8 空格規範：縮排使用 4 個空格（禁 Tab）；二元運算子（=, +, == 等）兩側各空一格；逗號 , 與冒號 : 後方空一格、前方不留空；函式預設參數的等號兩側「不空格」（def f(x=1):）。"
        ],
        codeExample: `# ✅ 短路邏輯求值示範：回傳拍板定案的運算元本身
print("Agent" and 0)              # 0 ("Agent"為真，必須看右邊，回傳 0)
print("Agent" and "Ready")        # "Ready" (兩者皆真，回傳最後決定者)
print([] or "Default")            # "Default" ([]為假，必須看右邊)
print("Host" or "Backup")         # "Host" ("Host"為真，立即短路回傳)

# ✅ 符合 PEP 8 的標準寫法
agent_id = "007"                  # 變數命名 snake_case，等號前後空一格
score_list = [85, 90, 95]         # 逗號後面空一格，中括號內部兩側不空格

def calculate_rank(points, level=1):  # 預設參數的等號兩邊不空格
    return points * level

# ⚠️ 違反 PEP 8 風格與語法地雷
# ❌ bad_var = [ 1 , 2 , 3 ]      (括號內多餘空格、逗號前留空格)
# ❌ 2nd_agent = "James"          (💥 SyntaxError: 不能以數字開頭)
# ❌ agent-score = 100            (💥 SyntaxError: 減號被判定為減法運算)
# ❌ pass = "Secret"              (💥 SyntaxError: pass 為關鍵保留字)`,
        tip: "考前 10 秒錦囊：短路運算「or 找第一個真值，and 找第一個假值（找不到就傳最後一個）」；PEP 8「逗號後面空一格，等號前後各一格，縮排用四格空格，變數全小寫加底線」。"
      }
    ]
  },

  2: {
    chapterId: 2,
    chapterTitle: "第二章：字符密碼解析室",
    chapterSubtitle: "字串切片、ASCII/ord/chr 與字串方法",
    description: "拆解被編碼的秘密資料！精通 s[start:stop:step] 切片規則、ASCII 碼數值運算及各類字串處理方法。",
    concepts: [
      {
        id: "ch2_c1",
        title: "字串切片語法 [start:stop:step] 與負索引/負步長逆序",
        keyPoints: [
          "切片基本語法為 s[start:stop:step]，嚴格遵循「左閉右開」原則 [start, stop)：包含 start，但「絕不包含 stop」！",
          "正索引從 0 開始（由左向右）；負索引從 -1 開始（-1 代表最後一個字元，由右向左）。",
          "步長 step 決定方向與間距：step > 0 向右前進；step < 0 向左倒退（逆向行走）。",
          "全字串反轉神技：s[::-1]。省略 start 與 stop 時，負步長會自動從字串最末端一路反轉走回最開頭。",
          "方向衝突為空字串：若起點與步長方向衝突（如 s[1:5:-1] 或 s[5:1] 預設 step=+1），走不到目標，回傳空字串 \"\"，絕不報錯！"
        ],
        codeExample: `s = "PYTHON"  # 索引:  0:P,  1:Y,  2:T,  3:H,  4:O,  5:N
              # 負索: -6:P, -5:Y, -4:T, -3:H, -2:O, -1:N

# ✅ 正確寫法：標準切片、負步長逆序與指定跨步
print(s[1:4])                     # "YTH" (含索引 1, 2, 3；不含 4)
print(s[::-1])                    # "NOHTYP" (經典全字串逆序反轉)
print(s[4:1:-1])                  # "OHT" (從索引 4 倒退走到 2；不含 1)

# ⚠️ 高頻地雷 1：方向與步長背道而馳，回傳空字串 ""
print(s[1:4:-1])                  # 輸出 ""！start=1 在左，stop=4 在右，但 step=-1 要求往左走！
print(s[4:1])                     # 輸出 ""！預設 step=+1 往右走，但 stop=1 在 start=4 左邊！

# ⚠️ 高頻地雷 2：負索引 stop 未算準導致少拿最後一個字元
print(s[-4:-1])                   # "THO" (只到 -2 的 'O'，不含 -1 的 'N'！)
# 若想一路取到最後一個字元，stop 請務必「留空」：
print(s[-4:])                     # "THON"`,
        tip: "考前 10 秒錦囊：切片先看 step！step 是負的從右往左倒著走，全反轉必背 s[::-1]；起點往步長方向走不到終點直接回傳空字串 \"\"。"
      },
      {
        id: "ch2_c2",
        title: "切片越界寬容性 (IndexError 防禦) 與邊界省略規則",
        keyPoints: [
          "單點索引與切片的致命差異：單點取值 s[i] 若索引超出合法範圍（i >= len(s) 或 i < -len(s)），立即拋出 IndexError: string index out of range！",
          "切片對越界極致包容：切片 s[start:stop] 無論數字寫得多麼誇張（如 s[2:999] 或 s[-999:2]），永遠「絕不拋出 IndexError」，只會自動截取邊界內實際存在的字元！",
          "省略邊界之預設值：當 step 為正時，start 預設為 0，stop 預設為 len(s)；當 step 為負時，start 預設為 -1，stop 預設為最前端前面（包含第 0 個字元）。",
          "靈活邊界截取：在提取不確定長度的字串片段時，切片是絕不崩潰的最佳防禦工具。"
        ],
        codeExample: `s = "AGENT"                       # 長度為 5，合法索引為 0 ~ 4

# ⚠️ 高頻地雷 1：單一索引越界（當場崩潰引發 IndexError）
# char = s[10]                    # 💥 IndexError: string index out of range
# char = s[-10]                   # 💥 IndexError: string index out of range

# ✅ 正確寫法：利用切片的安全寬容性（絕不拋出 IndexError）
print(s[1:999])                   # "GENT" (超出長度的部分自動忽略)
print(s[-999:3])                  # "AGE"  (負邊界過大自動對齊至最開頭)
print(s[10:20])                   # ""     (完全在範圍外，安全回傳空字串)

# ✅ 邊界留空的預設行為
print(s[:3])                      # "AGE"  (等同 s[0:3])
print(s[2:])                      # "ENT"  (等同 s[2:len(s)])`,
        tip: "考前 10 秒錦囊：單點 s[99] 必爆 IndexError！切片 s[1:99] 安全下莊絕不報錯，有多少拿多少！"
      },
      {
        id: "ch2_c3",
        title: "ord() 與 chr() 的 ASCII 碼位移運算與大小寫轉換",
        keyPoints: [
          "ord(char)：傳入長度為 1 的單字元，回傳其 ASCII / Unicode 整數編碼（傳入長度 > 1 噴 TypeError）。",
          "chr(code)：傳入整數編碼，回傳其對應的字元。兩者互為反函式：chr(ord('A')) == 'A'。",
          "考前三大必備基準 ASCII 碼：'0' 是 48（'9' 是 57）；'A' 是 65（'Z' 是 90）；'a' 是 97（'z' 是 122）。",
          "大小寫差值規律：ord('a') - ord('A') == 32。小寫比大寫大 32（大寫轉小寫 +32，小寫轉大寫 -32）。",
          "數字字元求數值：字元 '7' 的 ord 是 55，要獲得數值 7 需寫 ord('7') - ord('0')（55 - 48 = 7）或 int('7')。"
        ],
        codeExample: `# ✅ 正確寫法：凱薩密碼位移與大小寫 ASCII 位移運算
char = 'B'
shifted = chr(ord(char) + 3)      # 'B'(66) + 3 = 69 -> 'E'
print(shifted)                    # "E"

# 大寫轉小寫位移公式（+32）
lower_c = chr(ord('G') + 32)      # 71 + 32 = 103 -> 'g'
print(lower_c)                    # "g"

# ⚠️ 高頻地雷 1：ord() 只能接收單一字元，傳入字串直接崩潰
# ord("SECRET")                   # 💥 TypeError: ord() expected a character, but string of length 6 found

# ⚠️ 高頻地雷 2：數字字元的 ord 不是該數值本身
digit_char = "7"
print(int(digit_char))            # 7 (真正數值 7)
print(ord(digit_char))            # 55 (ASCII 編碼 55，不是 7！)
print(ord(digit_char) - ord('0')) # 55 - 48 = 7 (利用位移差計算純數值)`,
        tip: "考前 10 秒錦囊：背住三組數字：'0'->48、'A'->65、'a'->97！小寫比較胖比較重 (+32)；'A'+32='a'；數字字元 ord 減 48 才是真實數字。"
      },
      {
        id: "ch2_c4",
        title: "字串不可變性 (Immutable) 與拼接改寫技巧",
        keyPoints: [
          "字串具有「不可變性（Immutable）」：字串一旦在記憶體中建立，其內部任何字元內容均無法被修改！",
          "原地賦值報錯：嘗試寫 s[0] = 'X' 會當場引發 TypeError: 'str' object does not support item assignment！",
          "字串方法不改原值：所有字串方法（如 replace(), strip(), upper()）都不會改變原字串，而是產生並回傳一個「全新字串」。",
          "重新賦值接收：若要改變字串，必須以新變數或原變數重新接收回傳值（s = s.replace(...)），否則改動會直接消失在虛空中。",
          "改寫字串字元的安全手段：使用切片拼接（new_s = s[:i] + 'X' + s[i+1:]）或轉為串列修改後 join。"
        ],
        codeExample: `# ✅ 正確寫法：重新指派接收方法回傳的新字串
text = "broken_code"
text = text.replace("broken", "fixed")
print(text)                       # "fixed_code"

# 透過切片與拼接替換第 0 個字元
word = "Cat"
word = "B" + word[1:]             # 產生全新字串 "Bat"
print(word)                       # "Bat"

# ⚠️ 高頻地雷 1：嘗試原地索引賦值修改字串（拋出 TypeError）
target = "Python"
# target[0] = "J"                 # 💥 TypeError: 'str' object does not support item assignment

# ⚠️ 高頻地雷 2：呼叫方法卻未接收回傳值（原變數毫無改變）
secret = "mission_failed"
secret.replace("failed", "success")  # 孤立呼叫，回傳值被遺棄
print(secret)                     # 陷阱！依然是 "mission_failed"！原字串毫髮無傷`,
        tip: "考前 10 秒錦囊：字串是金剛不壞之身！s[0] = 'a' 絕對報錯 TypeError；看到 s.upper() 後面沒寫 s = 接住，s 就根本沒變！"
      },
      {
        id: "ch2_c5",
        title: "核心字串方法全面剖析：strip, split, join, replace, count, find vs index",
        keyPoints: [
          "strip(chars)：移除頭尾空白字元（或指定字元集），中間的空格不受影響；lstrip() 只除左側，rstrip() 只除右側。",
          "split(sep) vs split()：不傳參數時，連續多個空白（空格、\\t、\\n）會被自動壓縮合併為單一分隔符，且自動移除頭尾空白！傳入 sep=' ' 則嚴格按單一空格切，可能產出空字串 \"\"。",
          "sep.join(list_of_strs)：由「連接字串」呼叫，且串列內元素「必須全部是字串」，若含有整數會直接拋出 TypeError。",
          "count(sub)：計算子字串出現次數（非重疊計算）。",
          "查找大對決 find() vs index()：find() 找不到時「回傳 -1」（安全不報錯）；index() 找不到時「當場拋出 ValueError 崩潰」！"
        ],
        codeExample: `# ✅ 正確寫法：字串方法清洗、安全查詢與拼接
raw_csv = "  alpha, bravo, charlie \n"
cleaned = [item.strip() for item in raw_csv.split(",")]
print(cleaned)                    # ['alpha', 'bravo', 'charlie']
joined = " - ".join(cleaned)
print(joined)                     # "alpha - bravo - charlie"

# ✅ find vs index 找不到目標時的反應對比
msg = "TopSecret"
print(msg.find("Public"))         # -1 (安全回傳 -1，不報錯)
# print(msg.index("Public"))      # 💥 ValueError: substring not found

# ⚠️ 高頻地雷 1：join 呼叫主客顛倒
tokens = ["a", "b", "c"]
# tokens.join("-")                # 💥 AttributeError: 'list' object has no attribute 'join'
# 記住：是 "連接符".join(串列)！

# ⚠️ 高頻地雷 2：join 串列中含有整數
nums = [1, 2, 3]
# "-".join(nums)                  # 💥 TypeError: sequence item 0: expected str instance, int found
safe_str = "-".join(str(n) for n in nums)  # ✅ 正確：先轉字串`,
        tip: "考前 10 秒錦囊：找不到子字串時：find() 佛心回傳 -1，index() 暴怒噴 ValueError！join 記住「膠水.join(字串串列)」，裡面有數字必爆 TypeError！"
      },
      {
        id: "ch2_c6",
        title: "字串格式化精粹：f-string 運算表達式與對齊補零規範 (:02d, :.2f, >10)",
        keyPoints: [
          "f-string 基本語法：在字串引號前加上 f 或 F，大括號 {} 內可直接放入變數、算式、甚至呼叫函式。",
          "數值小數點控制：{val:.2f} 代表固定四捨五入輸出到小數點後兩位；{val:.0f} 取至整數。",
          "整數前導補零：{val:02d} 代表至少兩位數，不足補零（如 7 變成 \"07\"）；{val:04d}（如 5 變成 \"0005\"）。",
          "寬度與對齊控制：{val:>10} 靠右對齊（總寬度 10）；{val:<10} 靠左對齊；{val:^10} 置中對齊。",
          "格式千分位逗號：{1000000:,} 會輸出 \"1,000,000\"。"
        ],
        codeExample: `name = "Agent 007"
score = 98.456
code_id = 9

# ✅ 正確寫法：小數點、前導補零與靠右對齊
print(f"Agent: {name.upper()}")               # 運算表達式："Agent: AGENT 007"
print(f"Score: {score:.2f}")                  # 取小數後兩位："Score: 98.46"
print(f"ID: {code_id:04d}")                   # 四位數補零："ID: 0009"
print(f"Align: [{code_id:>5}]")               # 靠右對齊五格："Align: [    9]"
print(f"Amount: \${1234567:,}")                # 千分位逗號："Amount: $1,234,567"

# ⚠️ 高頻地雷 1：忘記在引號前加上前綴 f
print("Score: {score:.2f}")                   # 輸出原文："Score: {score:.2f}"

# ⚠️ 高頻地雷 2：對浮點數誤用整數格式代碼 d
# print(f"{3.14:02d}")                        # 💥 ValueError: Unknown format code 'd' for object of type 'float'
# 正確：浮點數應使用 f，如 {3.14:05.2f}`,
        tip: "考前 10 秒錦囊：:.2f 取兩位小數，:02d 補零成兩位數；> 箭頭朝右就是靠右對齊，< 箭頭朝左就是靠左對齊！字串前一定要記得寫 f。"
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
        title: "變數別名參照 (b = a) 的記憶體連體嬰陷阱",
        keyPoints: [
          "Python 的變數不是資料儲存盒子，而是貼在記憶體物件上的「便利貼標籤（Reference）」。",
          "別名賦值 b = a：並沒有建立任何新串列，而是讓標籤 b 指向與 a 完全相同的同一個記憶體位址！",
          "同生共死連體嬰：透過 b.append() 或 b[0] = 99 修改串列內容時，a 也會同步被修改！",
          "id() 與 is 檢驗：id(a) == id(b) 為 True，a is b 亦為 True，證明兩者本質上就是同一個物件實體。"
        ],
        codeExample: `# ✅ 正確理解：別名參照的記憶體共享機制
a = [10, 20, 30]
b = a                             # 僅複製參照標籤，指向同一個串列！
b.append(40)
print(a)                          # 陷阱輸出：[10, 20, 30, 40]（a 同步被修改！）
print(a is b)                     # True (記憶體位址完全同一處)

# ⚠️ 高頻地雷 1：以為 b = a 是獨立複製（考古題失分之冠！）
orig = ["Alpha", "Bravo"]
alias = orig
alias[0] = "ZULU"
print(orig[0])                    # 輸出："ZULU"！（不是原本的 "Alpha"！）

# ⚠️ 高頻地雷 2：函式傳入串列參數時的原地修改副作用
def modify_list(lst):
    lst.append(999)               # 原地修改外部串列！

data = [1, 2]
modify_list(data)
print(data)                       # [1, 2, 999]（外部串列被污染改變！）`,
        tip: "考前 10 秒錦囊：看見 b = a，那就是「同一支手機辦了兩個門號」！改 b 等於改 a，a is b 一定是 True！"
      },
      {
        id: "ch3_c2",
        title: "獨立淺拷貝 (b = a[:] / b = a.copy()) 的運作機制與外層獨立性",
        keyPoints: [
          "淺拷貝（Shallow Copy）建立方法：b = a[:]、b = a.copy()、b = list(a)。",
          "外層獨立新容器：淺拷貝會在記憶體中開闢一個全新的串列物件，並將原串列中的元素參照複製過來。",
          "獨立性表現：修改 b 的外層元素（如 b[0] = 99）或增刪 b 的元素（如 b.append(100)），原串列 a 毫髮無傷！",
          "位址驗證：a == b 為 True（內容相同），但 a is b 為 False（位址不同，id(a) != id(b)）。"
        ],
        codeExample: `# ✅ 正確寫法：使用 a[:] 或 a.copy() 獲得外層獨立副本
original = [1, 2, 3]
clone = original[:]               # 淺拷貝：開闢全新記憶體位址
clone[0] = 99
clone.append(100)

print(original)                   # [1, 2, 3] (原串列安然無恙！)
print(clone)                      # [99, 2, 3, 100]
print(original == clone)          # False (內容已不同)
print(original is clone)          # False (位址本來就不同)

# ⚠️ 高頻地雷：拷貝語法誤寫為等號
# safe_copy = original            # ❌ 依然是別名！
safe_copy = list(original)        # ✅ 正確淺拷貝方法之一`,
        tip: "考前 10 秒錦囊：一維串列想獨立複製，立刻寫 b = a[:] 或 b = a.copy()！此時 a is b 是 False，改動 b 的外層絕不傷及 a。"
      },
      {
        id: "ch3_c3",
        title: "二維巢狀串列淺拷貝盲區與 deepcopy() 深度拷貝救援",
        keyPoints: [
          "淺拷貝的極限：b = a[:] 只複製了「最外層的容器」，容器裡面裝的子串列位址「依然被複製過來繼續共用」！",
          "巢狀子串列連動地雷：若 a = [[1, 2], [3, 4]]，執行 b = a[:] 後修改 b[0][0] = 99，a[0][0] 也會變成 99！",
          "深度拷貝 copy.deepcopy()：遞迴向下複製每一層所有巢狀容器，完全切斷所有層級的記憶體關聯，真正實現 100% 絕對隔離。",
          "乘法複製二維串列大浩劫：matrix = [[0] * 3] * 3 是將「同一個內層串列複製 3 次別名」！改一列會三列全改；正確初始化必須用推導式 [[0] * 3 for _ in range(3)]。"
        ],
        codeExample: `import copy

# ⚠️ 高頻地雷 1：二維巢狀串列的淺拷貝盲區
nested = [[1, 2], [3, 4]]
shallow = nested[:]               # 僅拷貝外層！內層 [1, 2] 仍共用位址
shallow[0][0] = 888
print(nested[0][0])               # 💥 輸出 888！（原串列內層跟著被修改！）

# ✅ 正確解法：使用 copy.deepcopy() 實現徹底隔離
deep = copy.deepcopy(nested)
deep[0][0] = 777
print(nested[0][0])               # 888 (不受 deep 影響)
print(deep[0][0])                 # 777 (完全獨立)

# ⚠️ 高頻地雷 2：乘法複製二維矩陣的大浩劫
broken_mat = [[0] * 3] * 3        # 致命！三列全部是同一個內層串列的別名
broken_mat[0][0] = 99
print(broken_mat)                 # 💥 [[99, 0, 0], [99, 0, 0], [99, 0, 0]]（三列全變 99！）

# ✅ 正確矩陣初始化寫法：使用列表推導式
safe_mat = [[0] * 3 for _ in range(3)]
safe_mat[0][0] = 99
print(safe_mat)                   # [[99, 0, 0], [0, 0, 0], [0, 0, 0]]（僅首列改變）`,
        tip: "考前 10 秒錦囊：看見二維串列 a = [[...]] 配 a[:]，內層還是會連通！改 a[0][0] 還是會害慘別人！看見 [[0]*3]*3 一律視為「改一格、三列全變」的超級陷阱！"
      },
      {
        id: "ch3_c4",
        title: "原地排序 list.sort() (回傳 None!) vs 內建 sorted() (傳回新串列)",
        keyPoints: [
          "list.sort() 是「原地排序（In-place）」：直接在原串列的記憶體上重新排列，其回傳值「永遠是 None」！",
          "致命摧毀大錯：若寫 a = a.sort()，變數 a 會瞬間被賦值為 None，原本的所有資料當場被清空蒸發！",
          "sorted(iterable) 是全域內建函式：原串列完全不變，而是產生並回傳一個全新的已排序串列。",
          "常用參數：reverse=True 進行由大到小降序排列；key=abs 或 key=lambda x: ... 自訂排序基準。"
        ],
        codeExample: `# ✅ 正確寫法 1：使用 list.sort() 原地修改（絕不接收回傳值！）
nums = [5, 2, 8, 1]
nums.sort()                       # 原地排序，不能寫 a = a.sort()
print(nums)                       # [1, 2, 5, 8]

# ✅ 正確寫法 2：使用 sorted() 保留原始資料並傳回新串列
raw_data = [5, 2, 8, 1]
new_data = sorted(raw_data, reverse=True)
print(raw_data)                   # [5, 2, 8, 1] (原串列毫髮無損)
print(new_data)                   # [8, 5, 2, 1] (全新排序串列)

# ⚠️ 考古最高頻致命地雷：將 a.sort() 的回傳值重新指派
target = [3, 1, 2]
target = target.sort()            # 💥 致命失分！
print(target)                     # 陷阱輸出：None！（原本的串列消失，變數變成 None！）`,
        tip: "考前 10 秒錦囊：list.sort() 回傳 None！看到 x = a.sort()，x 100% 是 None！想要排序後的新串列，一定要找 sorted(a)。"
      },
      {
        id: "ch3_c5",
        title: "串列動態增刪改核心操作：append, extend, insert, pop, remove",
        keyPoints: [
          "append(x)：把 x 整包「當作單一元素」塞到串列最末尾。若 x 是串列，長度只會 +1（形成巢狀結構）。",
          "extend(iterable)：把 iterable 中的元素逐一「拆開倒進去」串列末尾，長度會增加 len(iterable)。",
          "insert(idx, x)：在指定索引前插入元素；若 idx 超過串列長度，直接塞在最末尾（不報錯）。",
          "pop(idx)：取出指定索引的元素，並「回傳該元素」！預設 idx=-1（取出最後一個）。",
          "remove(val)：從左到右尋找並刪除「第一個匹配的值」，回傳值為 None；若該值不存在會「當場拋出 ValueError 崩潰」！"
        ],
        codeExample: `# ✅ append vs extend 差異對照
a = [1, 2]
a.append([3, 4])
print(a)                          # [1, 2, [3, 4]] (長度為 3，包成一個子串列)

b = [1, 2]
b.extend([3, 4])
print(b)                          # [1, 2, 3, 4] (長度為 4，逐一展開加入)

# ✅ pop vs remove 差異對照
stack = ["Alpha", "Bravo", "Charlie"]
popped = stack.pop(1)             # 移出索引 1 的 "Bravo"，並將其回傳
print(popped)                     # "Bravo" (有回傳值！)
print(stack)                      # ['Alpha', 'Charlie']

# ⚠️ 高頻地雷 1：誤以為 remove() 會回傳被刪除的值
names = ["Alice", "Bob"]
res = names.remove("Alice")
print(res)                        # 陷阱！輸出 None，不是 "Alice"！

# ⚠️ 高頻地雷 2：remove 不存在的值導致程式崩潰
# names.remove("Zack")            # 💥 ValueError: list.remove(x): x not in list`,
        tip: "考前 10 秒錦囊：pop() 會吐出被拿掉的東西；remove() 默默做工回傳 None，且找不到值就噴 ValueError！append 是整包塞，extend 是拆箱倒。"
      },
      {
        id: "ch3_c6",
        title: "迴圈邊遍歷邊 remove 的索引跳號大陷阱與 lst += [...] vs lst = lst + [...]",
        keyPoints: [
          "迴圈迭代中刪除元素陷阱（Index Shift）：在 for x in lst: 迴圈中直接執行 lst.remove(x) 或 del lst[i]，串列長度會變短，後方元素集體向前補位，導致指標跳過緊鄰的下一個元素！",
          "安全過濾寫法：使用串列表達式 [x for x in lst if ...] 或建立副本遍歷 for x in lst[:]:。",
          "lst += [x]（原地擴充）：等價於 lst.extend([x])，在原記憶體修改，別名會同步看到變更！",
          "lst = lst + [x]（新建指派）：加法運算子產生全新串列後重新綁定，原別名留在舊物件上，互不干擾。"
        ],
        codeExample: `# ⚠️ 考古題超高頻地雷 1：邊遍歷邊刪除導致「跳號漏刪」
nums = [1, 2, 2, 3]
for n in nums:
    if n == 2:
        nums.remove(n)            # 刪除第 1 個 2 後，後面的 2 往前補位，指針卻前進到 3！
print(nums)                       # 💥 陷阱輸出：[1, 2, 3]！（第 2 個 2 被漏掉了！）

# ✅ 安全寫法 1：以淺拷貝切片副本作為遍歷目標
nums = [1, 2, 2, 3]
for n in nums[:]:                 # 遍歷複製品，修改原陣列
    if n == 2:
        nums.remove(n)
print(nums)                       # [1, 3] (成功刪除所有 2)

# ✅ +=（原地擴充）vs = lst + []（新建指派）對別名的影響
list1 = [1, 2]
ref1 = list1
list1 += [3]                      # 原地修改！
print(ref1)                       # [1, 2, 3] (ref1 同步被修改)

list2 = [1, 2]
ref2 = list2
list2 = list2 + [3]               # 產生新串列重新綁定！
print(ref2)                       # [1, 2] (ref2 依然停在舊串列)`,
        tip: "考前 10 秒錦囊：千萬不能「一邊 for x in lst 一邊 remove」！後面的元素往前滑，下一個直接被漏掉！別名遇到 += 連體嬰一同長大，遇到 = a + [] 各奔東西！"
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
        title: "range(start, stop, step) 邊界判定、負步長倒數與方向矛盾",
        keyPoints: [
          "range(start, stop[, step]) 嚴格遵守「左閉右開」原則：包含 start，但「絕對拿不到 stop」！",
          "單引數 range(n)：預設 start=0, step=1，產生 0 至 n-1，元素個數剛好是 n 個。",
          "負步長倒數陷阱：range(5, 0, -1) 產出 5, 4, 3, 2, 1（停在 1，絕對不會有 0！總共 5 個數）。若要倒數到 0，stop 必須設為 -1！",
          "方向矛盾長度為 0：當起點與方向衝突時（例如 range(5, 1) step 預設為 +1，或 range(1, 5, -1)），無法前進，產出空序列，迴圈執行 0 次！"
        ],
        codeExample: `# ✅ 正確寫法：標準計數與包含 0 的負步長倒數
print(list(range(2, 9, 3)))       # [2, 5, 8] (8+3=11 超過 9 故停止)
print(list(range(5, 0, -1)))      # [5, 4, 3, 2, 1] (不含 stop=0)

# 想一路倒數計時到 0 的標準寫法：
print(list(range(3, -1, -1)))     # [3, 2, 1, 0] (包含 0)

# ⚠️ 高頻地雷 1：方向相反導致空迴圈（執行 0 次）
count = 0
for i in range(5, 1):             # 預設 step=+1 向右，但 5 往右不可能碰到 1
    count += 1
print(count)                      # 陷阱輸出：0！（迴圈一次都沒有執行！）

# ⚠️ 高頻地雷 2：誤以為 range(len(s)) 包含 len(s)
s = "CODE"
# for i in range(len(s)): 取出的 i 最大是 3，s[3] 安全！若誤寫到 4 會噴 IndexError。`,
        tip: "考前 10 秒錦囊：range(A, B, C) 永遠拿不到 B！倒數 range(5, 0, -1) 只會數到 1，絕不會有 0！想數到 0 stop 要寫 -1；起點終點方向相反迴圈直接跑 0 次。"
      },
      {
        id: "ch4_c2",
        title: "while 迴圈條件控制、無窮迴圈陷阱與邊界差一錯誤 (Off-by-one)",
        keyPoints: [
          "while 迴圈在每一次迭代開始前先「評估條件」：條件為 True 則執行迴圈體，條件為 False 立即終止退出。",
          "忘記推進計數器死循環：在 while 迴圈體內若忘記寫遞增陳述（如 i += 1），條件永遠保持 True，導致陷入永久卡死的無窮死循環！",
          "邊界差一錯誤（Off-by-one）：while i < n: 執行 n 次（0 到 n-1）；while i <= n: 執行 n+1 次（0 到 n）。",
          "遞增順序的影響：計數器遞增寫在 print 之前還是之後，輸出的首末數值截然不同！"
        ],
        codeExample: `# ✅ 正確寫法：標準計數 while 迴圈
i = 0
while i < 3:
    print(i, end=" ")             # 輸出：0 1 2
    i += 1                        # 務必確保迴圈狀態推進！
print()

# ⚠️ 高頻地雷 1：遞增位置對輸出數值的影響
x = 0
while x < 3:
    x += 1
    print(x, end=" ")             # 輸出：1 2 3（不是 0 1 2！）
print()

# ⚠️ 高頻地雷 2：忘記遞增造成無窮迴圈（伺服器卡死 TLE）
# count = 0
# while count < 5:
#     print("Looping")            # count 永遠是 0，永遠停不下來！`,
        tip: "考前 10 秒錦囊：while 迴圈先盯計數器寫在 print 前面還是後面！先加印出 1 2 3，後加印出 0 1 2；忘記寫 i += 1 直接卡死變無窮迴圈！"
      },
      {
        id: "ch4_c3",
        title: "雙層巢狀迴圈：執行次數乘積規律與階梯依賴累加",
        keyPoints: [
          "矩形巢狀迴圈：外層執行 M 次，內層執行 N 次，內層迴圈體總共執行 M × N 次！外層每推進一步，內層都必須從頭到尾完整跑完一整輪。",
          "階梯依賴巢狀迴圈：若內層範圍依賴外層變數（如 for i in range(1, 4): for j in range(i):），內層執行次數為等差級數累加：1 + 2 + 3 = 6 次。",
          "變數名稱污染陷阱：內層與外層絕不可使用同一個變數名稱（如都是 for i in ...），內層的賦值會強行覆寫外層變數，導致外層控制變數被污染破壞！"
        ],
        codeExample: `# ✅ 正確追蹤：雙層迴圈總次數與階梯式依賴
total = 0
for i in range(3):                # 外層 i = 0, 1, 2 (3次)
    for j in range(2):            # 內層 j = 0, 1 (2次)
        total += 1
print(total)                      # 3 * 2 = 6 次

# ✅ 內層依賴外層變數（三角形階梯累加）
steps = 0
for i in range(1, 4):             # i = 1, 2, 3
    for j in range(i):            # 分別跑 1, 2, 3 次
        steps += 1
print(steps)                      # 1 + 2 + 3 = 6 次

# ⚠️ 高頻地雷：內外層使用相同變數名導致變數污染
# for i in range(3):
#     for i in range(2):          # 💥 覆寫了外層的變數 i！
#         pass
# 此時 i 已經被內層最後一次賦值變成 1，破壞了原本外層迴圈預期的狀態變數`,
        tip: "考前 10 秒錦囊：雙層迴圈「外層動一步，內層跑一整圈」！獨立矩形直接 M×N，階梯依賴寫出外層每一步對應的內層次數手動加總；千萬別在內外層用同一個變數名！"
      },
      {
        id: "ch4_c4",
        title: "流程中斷：break (僅擊碎當層) vs continue (跳過當次迭代)",
        keyPoints: [
          "break：立即無條件終止並跳出「當前所在的那一層迴圈」，前往該層迴圈之外接續執行。",
          "核心考點（高頻失分）：在雙層或多層巢狀迴圈中，內層的 break「只會終止最內層迴圈」，外層迴圈絲毫不受影響，仍會繼續推進下一輪！",
          "continue：立即放棄當前這一次迭代後方未執行的代碼，不跳出迴圈，而是立即進入「下一次迭代」。",
          "while 搭配 continue 死循環陷阱：在 while 迴圈中，若計數器遞增陳述（如 i += 1）寫在 continue 之後，一旦觸發 continue，計數器永遠無法增加，導致陷入無窮死循環！"
        ],
        codeExample: `# ✅ 正確理解：break 僅跳出「當層」內層迴圈
for i in range(3):                # 外層: i = 0, 1, 2
    for j in range(3):            # 內層: j = 0, 1, 2
        if j == 1:
            break                 # ⚠️ 僅擊碎當層的內層 j 迴圈！
        print(f"({i},{j})", end=" ")
# 輸出：(0,0) (1,0) (2,0) （外層 i 依然老老實實跑滿 3 次！）

# ⚠️ 高頻地雷：continue 導致 while 陷入死循環
count = 0
while count < 3:
    count += 1
    if count == 2:
        continue                  # 跳過本次印出，直接進入下一輪 while
    print(count, end=" ")         # 輸出：1 3
# ❌ 若把 count += 1 寫在 continue 之後，當 count==2 時將永久卡死！`,
        tip: "考前 10 秒錦囊：巢狀迴圈裡的 break 是「只打碎自己這層玻璃，外層繼續轉」！while 迴圈裡的 continue 前面一定要先 i += 1，否則原地卡死變成無窮迴圈！"
      },
      {
        id: "ch4_c5",
        title: "迴圈專屬 else 結構：未遭 break 觸發法則與零次執行考點",
        keyPoints: [
          "Python 允許在 for 與 while 迴圈末尾直接加上 else 區塊（稱為 loop-else）。",
          "觸發條件：只有當迴圈「自然結束」（for 遍歷完所有元素、while 條件自然變為 False），才會執行 else！",
          "略過條件：如果迴圈中途遭遇 break 被強制打斷跳出，else 區塊會被徹底略過，絕對不執行！",
          "零次執行陷阱：若 while 條件一開始就是 False，或 for 迭代一個空串列 []，迴圈體執行 0 次，但這依然屬於「未遭遇 break 自然結束」，因此 else 依然「會被執行」！"
        ],
        codeExample: `# ✅ 正常走完：順利觸發 else 區塊
for n in [2, 4, 6]:
    if n % 2 != 0:
        break
else:
    print("檢查完畢：全數皆為偶數")     # 輸出：檢查完畢：全數皆為偶數

# ⚠️ 高頻地雷 1：中途被 break，else 徹底失效
for n in [2, 3, 6]:
    if n % 2 != 0:
        print("發現奇數:", n)
        break                     # 強制中斷！
else:
    print("全數皆為偶數")         # ❌ 被 break 略過，絕對不會印出！
# 輸出：發現奇數: 3

# ⚠️ 高頻地雷 2：一開始條件就為假，else 依然執行
k = 10
while k < 5:                      # 一次都沒有進入迴圈體
    print("執行迴圈")
else:
    print("依然觸發 else！")      # ✅ 輸出：依然觸發 else！（因為未遭遇 break）`,
        tip: "考前 10 秒錦囊：口訣「有 break 沒 else，沒 break 才 else」！只要沒被 break 砍斷（即使迴圈 0 次結束），else 都會昂首挺胸執行！"
      },
      {
        id: "ch4_c6",
        title: "累加器模式、哨兵值 (Sentinel Value) 與旗標變數 (Flag) 控制",
        keyPoints: [
          "累加器模式（Accumulator）：在迴圈外部先宣告累加變數（如 total = 0 或 prod = 1），在迴圈內逐步累計。絕對不能在迴圈內部初始化，否則每次轉圈都會被清零！",
          "累乘器初始值盲區：累加初始值設為 0，但「累乘」初始值必須設為 1！若設為 0，任何數乘以 0 結果永遠是 0。",
          "旗標變數（Flag）：使用布林變數（如 is_valid = True）監控狀態，一旦違規立即設為 False 並搭配 break 退出。",
          "哨兵值終止（Sentinel Loop）：以特定輸入值（如 -1 或 \"EXIT\"）作為退出信號，控制 while 迴圈優雅停止。"
        ],
        codeExample: `# ✅ 正確寫法：累加器與累乘器的外部初始化
total_sum = 0
total_product = 1
for x in [2, 3, 4]:
    total_sum += x                # 2 + 3 + 4 = 9
    total_product *= x            # 1 * 2 * 3 * 4 = 24
print(f"Sum={total_sum}, Prod={total_product}")

# ✅ 旗標變數控制搜尋
target = 7
found = False
for num in [1, 3, 5, 7, 9]:
    if num == target:
        found = True
        break
print("Found target:", found)     # True

# ⚠️ 高頻地雷：累加變數放在迴圈內部（每次迭代被強制洗白歸零）
for n in [10, 20, 30]:
    temp_sum = 0                  # 💥 致命錯誤！每次迴圈都重設為 0
    temp_sum += n
print("最終總和:", temp_sum)      # 陷阱輸出：30！（不是 60！）`,
        tip: "考前 10 秒錦囊：累加初始設 0，累乘初始設 1！累加變數一定要放在迴圈外面宣告，放進迴圈裡面每次轉圈都會被洗白重來！"
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
        title: "函式定義 def、位置參數與關鍵字參數順序排布規範",
        keyPoints: [
          "參數定義規範：無預設值的「位置參數」必須嚴格排在有預設值的參數之前！例如 def f(a, b=2) 合法，但 def f(a=1, b) 會當場拋出 SyntaxError！",
          "呼叫引數規範：呼叫函式時，位置引數絕不能排在關鍵字引數（keyword argument）之後！例如 f(10, b=20) 合法，但 f(a=10, 20) 會直接拋出 SyntaxError。",
          "關鍵字引數傳遞彈性：一旦以關鍵字形式指定參數名稱（如 f(b=2, a=1)），參數傳入順序可以自由調換。",
          "參數重覆傳值錯誤：不能對同一個參數同時以位置引數和關鍵字引數重複賦值（例如 f(10, a=20) 會噴 TypeError: got multiple values for argument）。"
        ],
        codeExample: `# ✅ 正確寫法：合法的參數順序與明確回傳
def create_agent(codename, clearance=1, active=True):
    return f"[{clearance}] Agent {codename} (Active={active})"

print(create_agent("Shadow"))                     # [1] Agent Shadow (Active=True)
print(create_agent("Falcon", clearance=3))        # [3] Agent Falcon (Active=True)
print(create_agent(active=False, codename="Ghost")) # 關鍵字引數可自由調換順序

# ⚠️ 高頻地雷 1：定義時預設參數排在非預設參數前方
# def bad_def(level=1, codename):                 # 💥 SyntaxError: non-default argument follows default argument
#     pass

# ⚠️ 高頻地雷 2：呼叫時位置引數排在關鍵字引數後面
# create_agent(codename="Ghost", 2)               # 💥 SyntaxError: positional argument follows keyword argument

# ⚠️ 高頻地雷 3：對同一個參數重複賦值
# create_agent("Ghost", codename="Spectre")       # 💥 TypeError: got multiple values for argument 'codename'`,
        tip: "考前 10 秒錦囊：宣告函式「沒預設的站前面，有預設的站後面」；呼叫函式「純數值站前面，key=value 站後面」；位置引數千萬不能跟在關鍵字引數屁股後面！"
      },
      {
        id: "ch5_c2",
        title: "函式回傳值機制：預設回傳 None 與多值解包 (Tuple Packing/Unpacking)",
        keyPoints: [
          "預設回傳 None：函式內部若沒有寫 return，或者只寫了單獨的 return 而沒有接任何運算式，其回傳值一律為 None（不是 0，不是 False，也不是空字串）。",
          "回傳值接取：呼叫未帶 return 的函式並將其指派給變數時，變數得到的值即為 None。",
          "多值回傳的真相：當寫 return x, y, z 時，Python 實際上是將多個值自動打包成一個「元組（Tuple）」回傳！",
          "多變數解包：接收多值回傳時，可直接用相同數量的變數解包（如 a, b = get_coords()），變數數量若與回傳元組長度不一致會拋出 ValueError。"
        ],
        codeExample: `# ✅ 正確寫法：多值元組打包與解包接收
def get_mission_data():
    return "Operation Omega", 95, True            # 自動打包為元組 ("Operation Omega", 95, True)

mission, score, success = get_mission_data()      # 多變數解包
print(f"Mission: {mission}, Score: {score}")

# ⚠️ 高頻地雷 1：忘記寫 return 導致接收到 None
def calculate_power(base):
    result = base ** 2                            # 運算完成但沒有 return！

p = calculate_power(5)
print(p)                                          # 陷阱輸出：None！（不是 25！）

# ⚠️ 高頻地雷 2：解包變數個數與 return 數量不符
# a, b = get_mission_data()                       # 💥 ValueError: too many values to unpack (expected 2, got 3)`,
        tip: "考前 10 秒錦囊：函式沒寫 return 就是吐出 None！return a, b 吐出來的是 tuple (a, b)；接的時候 a, b = f() 變數數量必須剛剛好，多一個少一個都爆 ValueError。"
      },
      {
        id: "ch5_c3",
        title: "可變預設參數陷阱：def f(x=[]) 跨呼叫共用記憶體大坑",
        keyPoints: [
          "預設參數評估時機：Python 函式的預設引數只在函式被定義載入（def 執行）的那一瞬間評估一次，而不是每次呼叫時重新生成！",
          "共享可變物件陷阱：若將可變物件（如串列 []、字典 {}）作為預設參數，所有未傳入該引數的呼叫都會「永久共用同一個記憶體實體」！",
          "跨呼叫滾雪球效應：前一次呼叫在該串列中的 append 修改，會永久殘留並累積到下一次呼叫中！",
          "業界標準防禦寫法：預設引數必須設為不可變的 None（def f(x=None):），在函式內部再以 if x is None: x = [] 動態建立全新獨立容器。"
        ],
        codeExample: `# ⚠️ 考古題必考第 1 名大陷阱：可變預設參數跨呼叫累積
def enroll_student(name, roster=[]):              # roster 只在載入時建構一次！
    roster.append(name)
    return roster

print(enroll_student("Alice"))                    # ['Alice']
print(enroll_student("Bob"))                      # 💥 陷阱！輸出 ['Alice', 'Bob']！不是 ['Bob']！
print(enroll_student("Charlie", []))              # ['Charlie'] (傳入自訂新串列，不使用預設)
print(enroll_student("David"))                    # 💥 輸出 ['Alice', 'Bob', 'David']！（沿用舊預設串列）

# ✅ 正確標準防禦寫法：以 None 作為預設值
def safe_enroll(name, roster=None):
    if roster is None:
        roster = []                               # 每次呼叫都是獨立的新串列！
    roster.append(name)
    return roster

print(safe_enroll("Alice"))                       # ['Alice']
print(safe_enroll("Bob"))                         # ['Bob']（乾淨獨立，互不干擾！）`,
        tip: "考前 10 秒錦囊：看到 def f(x=[])，連續呼叫沒傳 x，裡面的串列就會像滾雪球一樣越來越長！想要每一次呼叫都乾淨獨立，預設值必須寫 x=None。"
      },
      {
        id: "ch5_c4",
        title: "變數作用域 LEGB 規則與只讀不改的存取特性",
        keyPoints: [
          "變數搜尋順序遵循 LEGB 規則：Local（區域）-> Enclosing（閉包）-> Global（全域）-> Built-in（內建）。",
          "只讀全域變數無須宣告：函式內部可以直接讀取全域變數的值，只要「沒有對該變數賦值」，Python 就會順利沿著 LEGB 找到全域變數。",
          "區域遮蔽現象（Shadowing）：若函式內有同名區域變數，會遮蔽外層全域變數；在函式內部存取時只會看到區域變數的值，但外層全域變數絲毫未受影響。"
        ],
        codeExample: `# ✅ 情境 1：純讀取全域變數（完全合法，無須 global）
base_url = "https://ntu.edu.tw"
def get_api():
    return base_url + "/api"                      # 直接沿著 LEGB 讀取全域變數

print(get_api())                                  # "https://ntu.edu.tw/api"

# ⚠️ 高頻地雷：同名區域變數遮蔽全域變數
shield = 100
def damage():
    shield = 50                                   # 這是區域變數 shield，遮蔽了全域變數！
    print("函式內部 shield:", shield)             # 50

damage()
print("外部全域 shield:", shield)                 # 陷阱！依然是 100！外層變數完全沒變`,
        tip: "考前 10 秒錦囊：LEGB 由內向外找：Local -> Enclosing -> Global -> Built-in。在函式裡單純「讀取」全域變數完全沒問題，不用寫 global！"
      },
      {
        id: "ch5_c5",
        title: "global 關鍵字宣告與修改全域變數 vs 修改可變物件 (lst.append)",
        keyPoints: [
          "重新綁定需要 global：若欲在函式內部對全域變數「重新指派賦值」（如 x = 100 或 x += 1），必須在函式開頭明確宣告 global x。",
          "修改可變物件不需要 global：若全域變數是可變物件（如串列 lst = []），在函式內呼叫 lst.append(1) 或 lst[0] = 99 是「原地修改內部內容」，並沒有改變 lst 指向的記憶體標籤，因此「完全不需要 global 宣告」！",
          "兩者界線總結：改變指標方向（lst = [1, 2]）屬於重新賦值，需 global；原地修改內容（lst.append(1)）屬於內部變更，不需 global。"
        ],
        codeExample: `# ✅ 情境 1：正確使用 global 修改不可變全域變數（重新賦值）
kill_count = 0
def register_kill():
    global kill_count
    kill_count += 1                               # 成功修改全域變數

register_kill()
print(kill_count)                                 # 輸出 1

# ✅ 情境 2：可變物件在函式內原地修改（無需 global 宣告！）
targets = ["Alpha"]
def add_target():
    targets.append("Bravo")                       # 原地修改可變物件，完全合法！

add_target()
print(targets)                                    # ['Alpha', 'Bravo']

# ⚠️ 高頻地雷：誤以為可變物件重新賦值也不用 global
def reset_targets():
    # targets = []                                # 💥 若想把外面的 targets 指向全新串列，必須宣告 global！
    pass`,
        tip: "考前 10 秒錦囊：換房子（x = 新值）要向房東報備寫 global；掃房間（lst.append, lst[0]=1）原物件沒換，完全不需要寫 global！"
      },
      {
        id: "ch5_c6",
        title: "考古熱門殺手：UnboundLocalError 發生成因與完整避坑策略",
        keyPoints: [
          "編譯期靜態判定：Python 在執行函式前會預先編譯掃描。只要函式體內部「任何一行」出現賦值語句（x = ... 或 x += ...），變數 x 在整座函式中就被徹底烙印為「區域變數」！",
          "殺手觸發情境：在賦值語句之前，如果就提前嘗試讀取或 print(x)，Python 絕不會向外找全域變數，而是判定「區域變數尚未被指派數值即被讀取」，當場拋出 UnboundLocalError: cannot access local variable 'x' where it is not associated with a value！",
          "x += 1 陷阱本質：x += 1 本質是 x = x + 1，等號右側需要先讀取 x，但整句又是賦值，故未加 global x 必然引發 UnboundLocalError。",
          "避坑方案：宣告 global x，或者將變數作為參數傳入並 return 傳出（純函式寫法）。"
        ],
        codeExample: `counter = 10

# ⚠️ 致命地雷：UnboundLocalError 經典現形
def buggy_func():
    # 下行會直接爆炸！因為後面有 counter = 20，導致 Python 將 counter 標記為區域變數；
    # 但此時它根本還沒被賦值，就提前被讀取！
    # print(counter)                              # 💥 UnboundLocalError: cannot access local variable 'counter'
    # counter = 20
    pass

def buggy_increment():
    # counter += 1                                # 💥 UnboundLocalError！（等價於 counter = counter + 1，先讀取再賦值）
    pass

# ✅ 正確解法 1：宣告 global
def safe_increment():
    global counter
    counter += 1                                  # 合法修改全域 counter

safe_increment()
print(counter)                                    # 11

# ✅ 正確解法 2：作為參數傳入並傳回新值（純函式無副作用，更佳風格）
def pure_increment(val):
    return val + 1
counter = pure_increment(counter)                 # 12`,
        tip: "考前 10 秒錦囊：函式裡只要後面有 x = ... 或 x += 1，前面只要想偷看偷印 print(x)，100% 當場暴斃噴 UnboundLocalError！因為看到賦值就認定是區域變數，前面沒給值就讀直接崩潰！"
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
        title: "enumerate(iterable, start=0) 雙值解包與自訂起始索引技巧",
        keyPoints: [
          "enumerate(iterable, start=0)：同時遍歷「索引計數」與「元素本體」，每次迭代產出 (index, item) 二元元組。",
          "自訂起始序號：透過 start 參數可改變編號起點（例如 start=1，序號由 1 開始累加）。",
          "解包順序不可顛倒：Python 永遠將第一個變數賦值為索引序號，第二個變數賦值為元素內容，千萬不可寫反！",
          "start 不影響取值切片：start=1 只是序號貼紙從 1 號開始發，依然是從 iterable 的第 0 個元素開始取出！"
        ],
        codeExample: `gear = ["Shield", "Drone", "EMP"]

# ✅ 正確寫法：設定 start=1 進行人類友善編號
for rank, item in enumerate(gear, start=1):
    print(f"等級 {rank}: {item}")
# 輸出：
# 等級 1: Shield
# 等級 2: Drone
# 等級 3: EMP

# ⚠️ 高頻地雷 1：解包變數名稱順序顛倒（邏輯大災難）
for item, idx in enumerate(gear):                 # 陷阱！Python 永遠把第一個當序號
    print(f"{item} -> {idx}")
# 輸出：0 -> Shield （變數名稱叫 item 卻拿到了整數 0！）

# ⚠️ 高頻地雷 2：誤以為 start=1 是從 gear[1] 開始讀取
# 錯誤認知：認為 start=1 會跳過 "Shield"
# 正確事實：gear[0] 的 "Shield" 被賦予序號 1；依然從頭完整遍歷！`,
        tip: "考前 10 秒錦囊：for i, val in enumerate(...) 永遠是「先序號、後內容」！start=1 只是序號標籤從 1 開始貼，陣列元素依然從第 0 個開始取！"
      },
      {
        id: "ch6_c2",
        title: "zip(*iterables) 多序列打包、短邊截斷特性與矩陣轉置",
        keyPoints: [
          "zip(*iterables)：將多個可迭代物件按相同索引逐項打包成元組 (a, b, c)。",
          "最短長度截斷（重要考點）：傳入的多個序列長度不一致時，zip() 以「最短的序列」為準，短的耗盡時立即結束，多餘的元素直接被拋棄，絕不報錯！",
          "迭代器（Iterator）單次消耗特性：zip() 回傳的是迭代器，遍歷過一次後便被抽乾枯竭，再次使用會得到空容器；重複使用需以 list(zip(...)) 轉為實體串列。",
          "矩陣轉置神技：list(zip(*matrix)) 利用解包運算子 *，能神奇地在一行內實現二維矩陣的行列轉置（Transpose）！"
        ],
        codeExample: `agents = ["Alpha", "Bravo", "Charlie"]            # 長度 3
weapons = ["Pistol", "Rifle"]                     # 長度 2 (較短)

# ✅ 正確寫法：zip 並行配對遍歷與最短截斷
for a, w in zip(agents, weapons):
    print(f"{a}: {w}")
# 輸出：
# Alpha: Pistol
# Bravo: Rifle
# ('Charlie' 因為 weapons 已經用盡，自動被截斷捨棄，不輸出也不報錯！)

# ✅ 二維矩陣轉置神技
matrix = [[1, 2], [3, 4], [5, 6]]
transposed = [list(row) for row in zip(*matrix)]
print(transposed)                                 # [[1, 3, 5], [2, 4, 6]]

# ⚠️ 高頻地雷 1：忘記 zip 是迭代器，無法以索引取值
zipped = zip(agents, weapons)
# print(zipped[0])                                # 💥 TypeError: 'zip' object is not subscriptable
print(list(zipped))                               # [('Alpha', 'Pistol'), ('Bravo', 'Rifle')]

# ⚠️ 高頻地雷 2：迭代器消耗一次即枯竭變空
z = zip([1, 2], ["A", "B"])
print(list(z))                                    # [(1, 'A'), (2, 'B')]
print(list(z))                                    # 陷阱！輸出 []（已被抽乾消耗完畢！）`,
        tip: "考前 10 秒錦囊：zip 是「短板理論」！兩條長短不同以「短的」為準，長出來的尾巴全部當空氣蒸發！轉置矩陣必背 [list(r) for r in zip(*m)]。"
      },
      {
        id: "ch6_c3",
        title: "串列表達式 (List Comprehension)：單層過濾與三元運算子 (if-else)",
        keyPoints: [
          "單層過濾語法：[expr for item in iterable if condition]。只有符合 if 條件的元素才會經過運算加入新串列。此處的 if 放在「最後面」，且「不可加 else」！",
          "帶有 else 的三元運算語法：[expr_if_true if cond else expr_if_false for item in iterable]。注意：具有 else 替代分支時，整個三元運算式必須移到「for 的前方」！",
          "語法位置絕對禁忌：[x for x in data if x > 0 else 0] 會直接引發 SyntaxError！",
          "獨立區域作用域：推導式內部的變數（如 x）具備獨立作用域，執行完畢後絕不污染外層同名變數。"
        ],
        codeExample: `# ✅ 正確寫法 1：單層純過濾（if 在最後面，篩選偶數並平方）
squares = [x**2 for x in range(6) if x % 2 == 0]
print(squares)                                    # [0, 4, 16]

# ✅ 正確寫法 2：三元運算子二選一（含 else 放 for 前面）
status = ["Pass" if score >= 60 else "Fail" for score in [75, 40, 90]]
print(status)                                     # ['Pass', 'Fail', 'Pass']

# ⚠️ 高頻地雷 1：含 else 卻放在最後面（語法錯誤）
# bad_comp = [x for x in range(5) if x > 2 else 0]  # 💥 SyntaxError: invalid syntax

# ⚠️ 高頻地雷 2：誤以為純過濾可以在後方寫 else
# [x*2 for x in data if x > 0 else ...]           # 💥 只要有 else，必須整組移到 for 前面！`,
        tip: "考前 10 秒錦囊：純過濾 if 放在最後面（不准加 else）；要二選一 if ... else ... 必須整包移到 for 前面！順序放錯直接語法錯誤。"
      },
      {
        id: "ch6_c4",
        title: "雙層巢狀串列表達式：展開順序與巢狀矩陣生成",
        keyPoints: [
          "雙層展開順序：[expr for x in list1 for y in list2]，其閱讀與執行順序「完全等同於常規雙層迴圈：左邊是外層 for，右邊是內層 for」！",
          "產生平坦串列 vs 巢狀串列：一維平坦展開為 [x * y for x in A for y in B]；二維巢狀矩陣為 [[x * y for y in B] for x in A]（注意中括號位置！外層包住內層推導式）。",
          "矩陣安全初始化：[[0 for _ in range(cols)] for _ in range(rows)] 生成每一列均為獨立物件的安全矩陣。"
        ],
        codeExample: `colors = ["Red", "Blue"]
sizes = ["S", "M"]

# ✅ 正確寫法 1：雙層平坦展開（左邊是外層，右邊是內層）
tshirts = [f"{c}-{s}" for c in colors for s in sizes]
print(tshirts)                                    # ['Red-S', 'Red-M', 'Blue-S', 'Blue-M']
# 等價於：
# res = []
# for c in colors:
#     for s in sizes:
#         res.append(f"{c}-{s}")

# ✅ 正確寫法 2：生成獨立二維矩陣（內層推導式被 [] 包覆）
matrix_2x3 = [[row * 10 + col for col in range(3)] for row in range(2)]
print(matrix_2x3)                                 # [[0, 1, 2], [10, 11, 12]]

# ⚠️ 高頻地雷：雙層推導式的順序顛倒認知
# [f(x, y) for x in A for y in B] 中，先跑外層 x，x 鎖定後才跑完整個 y！`,
        tip: "考前 10 秒錦囊：雙層推導式 [x+y for x in A for y in B]，先寫的 for x 是外層，後寫的 for y 是內層！二維獨立矩陣外層還要包一層中括號。"
      },
      {
        id: "ch6_c5",
        title: "例外處理架構：try - except - else - finally 流程控制與 finally 覆蓋",
        keyPoints: [
          "try 區塊：放置可能發生錯誤的危險程式碼。",
          "except ErrorType 區塊：精準捕捉指定型態的錯誤；可由多個 except 分支捕捉不同例外。",
          "else 區塊：只有當 try 區塊「完全沒有引發任何例外」時，才會順利執行！",
          "finally 區塊：無論有沒有例外、有沒有被 except 捕捉、甚至 try/except 內部執行了 return，都保證「必定執行」！通常用於釋放檔案或網路資源。",
          "finally 霸道覆蓋 return 陷阱：若 finally 區塊內部寫了 return，會強行沒收並覆蓋 try 或 except 裡原本要回傳的值！"
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
# 輸出順序：
# 運算成功：無任何異常！
# 清理工作：釋放系統資源。
# 結果: 5.0

# ⚠️ 高頻地雷：finally 霸道覆蓋 return 值
def override_test():
    try:
        return "ORIGINAL_VALUE"
    finally:
        return "FINALLY_OVERRIDE"                 # 💥 強行霸道覆蓋前面的 return 值！

print(override_test())                            # 陷阱輸出："FINALLY_OVERRIDE"！（不是 "ORIGINAL_VALUE"）`,
        tip: "考前 10 秒錦囊：四部曲口訣：try 試探、except 擋災、else 沒事慶祝、finally 善後必跑！小心 finally 裡的 return 會硬生生搶走前面的 return。"
      },
      {
        id: "ch6_c6",
        title: "常見例外型態大閱兵 (TypeError, ValueError, IndexError 等) 與精準防禦",
        keyPoints: [
          "TypeError：操作或函式應用於「型態不相容」的物件（如 \"10\" + 5、len(123)、'str'[0] = 'a'、\"\".join([1,2])）。",
          "ValueError：型態正確但「內容值不合法」（如 int(\"abc\")、int(\"3.14\")、lst.remove(999)、lst.index(999)）。",
          "IndexError：序列索引「超出範圍」（如 lst[99]、s[99]）。",
          "KeyError：字典中查詢「不存在的鍵（Key）」（如 dict['unknown']；使用 dict.get(key) 可防禦）。",
          "ZeroDivisionError：除數為 0（如 10 / 0、10 // 0、10 % 0）。",
          "AttributeError：嘗試存取物件不存在的屬性或方法（如 lst.join()、num.upper()）。"
        ],
        codeExample: `# ✅ 常見 6 大例外型態觸發對照
# 1. TypeError：型態完全不相容
# "Score: " + 100                 # 💥 TypeError: can only concatenate str to str
# len(12345)                      # 💥 TypeError: object of type 'int' has no len()

# 2. ValueError：型態對但數值內容無法解析
# int("3.14")                     # 💥 ValueError: invalid literal for int()
# [1, 2].remove(99)               # 💥 ValueError: list.remove(x): x not in list

# 3. IndexError：超出序列範圍
# "ABC"[5]                        # 💥 IndexError: string index out of range

# 4. KeyError：字典鍵值不存在
user = {"name": "Alice"}
# role = user["role"]             # 💥 KeyError: 'role'
role = user.get("role", "Guest")  # ✅ 正確安全做法：使用 .get() 附帶預設值

# 5. ZeroDivisionError：除數為零
# 10 // 0                         # 💥 ZeroDivisionError: integer division or modulo by zero

# 6. AttributeError：物件無此方法
# [1, 2].join("-")                # 💥 AttributeError: 'list' object has no attribute 'join'`,
        tip: "考前 10 秒錦囊：搞懂三大常客：TypeError 是「型態對不上」（如字串加整數）、ValueError 是「型態對但內容不合理」（如 int(\"abc\")）、IndexError 是「編號越界」！"
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

    const modNumber = String(idx + 1).padStart(2, '0');

    return `
      <div class="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 shadow-lg space-y-3 transition hover:border-cyan-400/50">
        <!-- 模組標題列 -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-2">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              MODULE ${modNumber}
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
