"""
Parse the Oxford 3000 PDF (multi-column layout).

The PDF has 4 word columns per page:
  Col 1: x0 ~42   Col 2: x0 ~173   Col 3: x0 ~303   Col 4: x0 ~434

Each row contains one word entry per column in the format: word pos
Level headers (A1, A2, B1, B2) appear inline and apply to all
subsequent words until the next header.
"""

import pdfplumber
import json
import re
from collections import defaultdict

pdf_path = r"C:\Users\nishuljuneja\Downloads\The_Oxford_3000_by_CEFR_level.pdf"
output_path = r"C:\Users\nishuljuneja\english-learning-app\src\content\oxford-3000.json"

# Column boundaries (midpoints between column starts)
COL_BOUNDS = [0, 108, 238, 369, 600]  # 4 columns

LEVEL_RE = re.compile(r'^[ABC][12]$')
SKIP_RE = re.compile(
    r'Oxford|CEFR|most important|word list|© Oxford|3000™|3000 is',
    re.IGNORECASE
)

# POS tokens that can appear after a word
POS_TOKENS = {
    'n.', 'v.', 'adj.', 'adv.', 'prep.', 'conj.', 'det.', 'pron.',
    'exclam.', 'n.,', 'v.,', 'adj.,', 'adv.,', 'prep.,', 'conj.,',
    'det.,', 'pron.,', 'exclam.,', 'number', 'modal', 'auxiliary',
    'indefinite', 'definite', 'linking', 'det./pron.', 'adj./adv.',
    'adj./pron.', 'exclam./n.', 'number/det.,', 'adj.,/adv.',
}


def get_column(x0):
    """Return 0-based column index for given x0 position."""
    for i in range(len(COL_BOUNDS) - 1):
        if COL_BOUNDS[i] <= x0 < COL_BOUNDS[i + 1]:
            return i
    return len(COL_BOUNDS) - 2


def parse_entry(text):
    """Parse a column entry text like 'become v.' into (word, pos)."""
    text = text.strip()
    if not text:
        return None, None

    # Check for level header
    if LEVEL_RE.match(text):
        return text, '__LEVEL__'

    # Skip headers/footers
    if SKIP_RE.search(text):
        return None, None

    # Split into tokens
    tokens = text.split()
    if not tokens:
        return None, None

    # Find where POS starts
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

    # Validate word
    if not word or word.isdigit() or len(word) < 1:
        return None, None
    # Skip page number patterns like "1 / 12"
    if re.match(r'^\d+\s*/\s*\d+$', word):
        return None, None

    return word.lower(), pos


def main():
    words = []
    current_level = 'A1'

    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages):
            page_words = page.extract_words()

            # Group extracted words by y-coordinate (rows)
            rows = defaultdict(list)
            for w in page_words:
                y = round(w['top'], 0)
                rows[y].append(w)

            # Process each row from top to bottom
            for y in sorted(rows.keys()):
                row_words = sorted(rows[y], key=lambda w: w['x0'])

                # Group tokens by column
                col_texts = defaultdict(list)
                for w in row_words:
                    col = get_column(w['x0'])
                    col_texts[col].append(w['text'])

                # Process each column's text
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

    # Sort by level then word
    level_order = {'A1': 0, 'A2': 1, 'B1': 2, 'B2': 3, 'C1': 4, 'C2': 5}
    unique_words.sort(key=lambda w: (level_order.get(w['level'], 9), w['word']))

    # Summary
    level_counts = {}
    for w in unique_words:
        level_counts[w['level']] = level_counts.get(w['level'], 0) + 1

    print(f"Total unique words: {len(unique_words)}")
    for lvl in sorted(level_counts.keys(), key=lambda x: level_order.get(x, 9)):
        print(f"  {lvl}: {level_counts[lvl]} words")

    # Save
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(unique_words, f, ensure_ascii=False, indent=2)
    print(f"\nSaved to {output_path}")

    # Sample
    print("\nFirst 20 words:")
    for w in unique_words[:20]:
        print(f"  {w['level']:3s} | {w['word']:20s} | {w['pos']}")

    print("\nLast 20 words:")
    for w in unique_words[-20:]:
        print(f"  {w['level']:3s} | {w['word']:20s} | {w['pos']}")


if __name__ == '__main__':
    main()
