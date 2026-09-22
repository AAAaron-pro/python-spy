# -*- coding: utf-8 -*-
"""
從原始壓縮包讀取 75 道既有題目（全面標註 dimension 與 title）
並與 72 道全新高水準原創題 (mock_16 ~ mock_87) 合併，
生成精確且無重複的全新 questions.js（共 147 題，100% 覆蓋 6 大維度）。
"""

import re
import json
import zipfile
import io
import sys
from contextlib import redirect_stdout
from generate_all_new_questions import ALL_NEW_QUESTIONS

DIMENSION_MAP = {
    1: "syntax_io",
    2: "strings_ascii",
    3: "containers_memory",
    4: "control_flow",
    5: "functions_scope",
    6: "comprehensions_tools"
}

def load_original_75_questions():
    with zipfile.ZipFile("python_agent_score100.zip", "r") as z:
        with z.open("questions.js") as zf:
            content = zf.read().decode("utf-8")

    start_idx = content.find("const QUESTIONS_DATABASE = [")
    if start_idx == -1:
        raise Exception("找不到 QUESTIONS_DATABASE")

    preamble = content[:start_idx]

    q_blocks = re.findall(r'(\{\s*id:\s*"[^"]+".*?traceSteps:\s*\[.*?\]\s*\})', content, re.DOTALL)
    print(f"[*] 成功自 pristine 備份讀取現有題目：{len(q_blocks)} 題")

    existing_questions = []
    for block in q_blocks:
        qid_m = re.search(r'id:\s*"([^"]+)"', block)
        ch_m = re.search(r'chapterId:\s*(\d+)', block)
        diff_m = re.search(r'difficulty:\s*"([^"]+)"', block)
        cat_m = re.search(r'category:\s*"([^"]+)"', block)
        q_text_m = re.search(r'question:\s*"([^"]+)"', block)
        ans_m = re.search(r'answer:\s*"([A-D])"', block)
        exp_m = re.search(r'explanation:\s*"((?:[^"\\]|\\.)*)"', block)
        code_m = re.search(r'code:\s*`([^`]*)`', block)
        options = re.findall(r'["\']([A-D]\.\s*.*?)["\']', block)

        ts_m = re.search(r'traceSteps:\s*(\[.*?\])\s*\}', block, re.DOTALL)
        ts_raw = ts_m.group(1) if ts_m else "[]"

        ch_id = int(ch_m.group(1))
        cat = cat_m.group(1) if cat_m else ""
        diff = diff_m.group(1) if diff_m else "basic"
        qid = qid_m.group(1)
        q_text = q_text_m.group(1) if q_text_m else ""
        ans = ans_m.group(1)
        code = code_m.group(1) if code_m else ""
        exp = exp_m.group(1) if exp_m else ""

        # Map dimension based on chapterId
        dim = DIMENSION_MAP[ch_id]

        # Use category as title
        title = cat

        existing_questions.append({
            "id": qid,
            "chapterId": ch_id,
            "dimension": dim,
            "title": title,
            "difficulty": diff,
            "category": cat,
            "question": q_text,
            "code": code,
            "options": options,
            "answer": ans,
            "explanation": exp,
            "traceStepsRaw": ts_raw
        })

    return preamble, existing_questions

def format_question_js(q):
    lines = []
    lines.append("  {")
    lines.append(f'    id: "{q["id"]}",')
    lines.append(f'    chapterId: {q["chapterId"]},')
    lines.append(f'    dimension: "{q["dimension"]}",')
    lines.append(f'    title: "{q["title"]}",')
    lines.append(f'    difficulty: "{q["difficulty"]}",')
    lines.append(f'    category: "{q["category"]}",')
    lines.append(f'    question: "{q["question"]}",')
    
    code_str = q["code"]
    lines.append(f'    code: `{code_str}`,')
    
    lines.append("    options: [")
    for i, opt in enumerate(q["options"]):
        comma = "," if i < len(q["options"]) - 1 else ""
        opt_escaped = opt.replace('"', '\\"')
        lines.append(f'      "{opt_escaped}"{comma}')
    lines.append("    ],")
    
    lines.append(f'    answer: "{q["answer"]}",')
    
    exp_escaped = q["explanation"].replace('"', '\\"').replace('\n', '\\n')
    lines.append(f'    explanation: "{exp_escaped}",')
    
    if "traceStepsRaw" in q:
        lines.append(f'    traceSteps: {q["traceStepsRaw"]}')
    else:
        lines.append("    traceSteps: [")
        for i, step in enumerate(q["traceSteps"]):
            comma = "," if i < len(q["traceSteps"]) - 1 else ""
            vars_json = json.dumps(step.get("vars", {}), ensure_ascii=False)
            text_escaped = step["text"].replace('"', '\\"')
            lines.append(f'      {{ line: {step["line"]}, text: "{text_escaped}", vars: {vars_json} }}{comma}')
        lines.append("    ]")
    
    lines.append("  }")
    return "\n".join(lines)

def build_full_database():
    preamble, existing = load_original_75_questions()
    print(f"[*] 現有原始題目數量: {len(existing)}")
    print(f"[*] 全新原創題目數量: {len(ALL_NEW_QUESTIONS)}")
    total_questions = existing + ALL_NEW_QUESTIONS
    print(f"[*] 合計總題數: {len(total_questions)}")

    # Sanity check uniqueness
    all_ids = [q["id"] for q in total_questions]
    assert len(all_ids) == len(set(all_ids)), f"Duplicate IDs found: {[x for x in all_ids if all_ids.count(x) > 1]}"

    out_lines = []
    out_lines.append(preamble.rstrip())
    out_lines.append("\nconst QUESTIONS_DATABASE = [")

    for i, q in enumerate(total_questions):
        comma = "," if i < len(total_questions) - 1 else ""
        out_lines.append(format_question_js(q) + comma)

    out_lines.append("];")
    out_lines.append("")
    out_lines.append("// Export for both browser and Node/testing")
    out_lines.append("if (typeof window !== 'undefined') {")
    out_lines.append("  window.CHAPTERS_DATA = CHAPTERS_DATA;")
    out_lines.append("  window.QUESTIONS_DATABASE = QUESTIONS_DATABASE;")
    out_lines.append("}")
    out_lines.append("if (typeof module !== 'undefined' && module.exports) {")
    out_lines.append("  module.exports = { CHAPTERS_DATA, QUESTIONS_DATABASE };")
    out_lines.append("}")
    out_lines.append("")

    full_js = "\n".join(out_lines)

    with open("questions.js", "w", encoding="utf-8") as f:
        f.write(full_js)

    print(f"[+] 成功寫入全新 questions.js！大小: {len(full_js)} 位元組，題目總數: {len(total_questions)}")

if __name__ == "__main__":
    build_full_database()
