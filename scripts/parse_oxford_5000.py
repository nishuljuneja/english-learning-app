"""
Parse the Oxford 5000 PDF (same 4-column layout as Oxford 3000).

The Oxford 5000 = Oxford 3000 + ~2000 additional B2/C1 words.
This PDF contains only the additional words NOT in the 3000 list.
"""

import pdfplumber
import json
import re
from collections import defaultdict

pdf_path = r"C:\Users\nishuljuneja\Downloads\The_Oxford_5000_by_CEFR_level.pdf"
output_path = r"C:\Users\nishuljuneja\english-learning-app\src\content\oxford-5000-extra.json"

# Column boundaries (same as Oxford 3000 PDF)
COL_BOUNDS = [0, 108, 238, 369, 600]

LEVEL_RE = re.compile(r'^[ABC][12]$')
SKIP_RE = re.compile(
    r'Oxford|CEFR|most important|word list|© Oxford|5000™|5000 is|expanded|core|additional|learners|advanced|listed|3000,',
    re.IGNORECASE
)

POS_TOKENS = {
    'n.', 'v.', 'adj.', 'adv.', 'prep.', 'conj.', 'det.', 'pron.',
    'exclam.', 'n.,', 'v.,', 'adj.,', 'adv.,', 'prep.,', 'conj.,',
    'det.,', 'pron.,', 'exclam.,', 'number', 'modal', 'auxiliary',
    'indefinite', 'definite', 'linking', 'det./pron.', 'adj./adv.',
    'adj./pron.', 'exclam./n.', 'number/det.,', 'adj.,/adv.',
}


def get_column(x0):
    for i in range(len(COL_BOUNDS) - 1):
        if COL_BOUNDS[i] <= x0 < COL_BOUNDS[i + 1]:
            return i
    return len(COL_BOUNDS) - 2


def parse_entry(text):
    text = text.strip()
    if not text:
        return None, None
    if LEVEL_RE.match(text):
        return text, '__LEVEL__'
    if SKIP_RE.search(text):
        return None, None

    tokens = text.split()
    if not tokens:
        return None, None

    word_tokens = []
    pos_tokens = []
    in_pos = False
    in_parens = False

    for tok in tokens:
        if tok.startswith('('):
            in_parens = True
            if not in_pos:
                word_tokens.append(tok)
            else:
                pos_tokens.append(tok)
            if tok.endswith(')'):
                in_parens = False
            continue
        if in_parens:
            if not in_pos:
                word_tokens.append(tok)
            else:
                pos_tokens.append(tok)
            if tok.endswith(')'):
                in_parens = False
            continue

        if not in_pos and tok in POS_TOKENS:
            in_pos = True
            pos_tokens.append(tok)
        elif in_pos:
            pos_tokens.append(tok)
        else:
            word_tokens.append(tok)

    word = ' '.join(word_tokens).strip().rstrip(',')
    pos = ' '.join(pos_tokens).strip().rstrip(',')

    if not word or word.isdigit() or len(word) < 1:
        return None, None
    if re.match(r'^\d+\s*/\s*\d+$', word):
        return None, None

    return word.lower(), pos


def main():
    words = []
    current_level = 'B2'

    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages):
            page_words = page.extract_words()

            rows = defaultdict(list)
            for w in page_words:
                y = round(w['top'], 0)
                rows[y].append(w)

            for y in sorted(rows.keys()):
                row_words = sorted(rows[y], key=lambda w: w['x0'])

                col_texts = defaultdict(list)
                for w in row_words:
                    col = get_column(w['x0'])
                    col_texts[col].append(w['text'])

                for col in sorted(col_texts.keys()):
                    entry_text = ' '.join(col_texts[col])
                    word, pos = parse_entry(entry_text)

                    if word is None:
                        continue
                    if pos == '__LEVEL__':
                        current_level = word.upper()
                        continue

                    words.append({
                        'word': word,
                        'pos': pos,
                        'level': current_level
                    })

    # Deduplicate
    seen = set()
    unique_words = []
    for w in words:
        key = w['word'] + '|' + w['pos'] + '|' + w['level']
        if key not in seen:
            seen.add(key)
            unique_words.append(w)

    level_order = {'A1': 0, 'A2': 1, 'B1': 2, 'B2': 3, 'C1': 4, 'C2': 5}
    unique_words.sort(key=lambda w: (level_order.get(w['level'], 9), w['word']))

    level_counts = {}
    for w in unique_words:
        level_counts[w['level']] = level_counts.get(w['level'], 0) + 1

    print(f"Total unique words: {len(unique_words)}")
    for lvl in sorted(level_counts.keys(), key=lambda x: level_order.get(x, 9)):
        print(f"  {lvl}: {level_counts[lvl]} words")

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(unique_words, f, ensure_ascii=False, indent=2)
    print(f"\nSaved to {output_path}")

    print("\nFirst 20 words:")
    for w in unique_words[:20]:
        print(f"  {w['level']:3s} | {w['word']:20s} | {w['pos']}")

    print("\nLast 20 words:")
    for w in unique_words[-20:]:
        print(f"  {w['level']:3s} | {w['word']:20s} | {w['pos']}")


if __name__ == '__main__':
    main()
