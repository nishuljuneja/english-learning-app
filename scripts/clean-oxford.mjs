/**
 * Clean up Oxford 3000 and Oxford 5000 Extra JSON files:
 * 1. Strip parenthetical annotations: "bank (money)" → "bank"
 * 2. Strip grammar labels: "each det./pron./adv." → "each"
 * 3. Remove numeric suffixes: "last1" → "last", "second1" → "second"
 * 4. Remove junk entries: "from a1 to b2 level.", "words to learn in english", "the first) det./ street"
 * 5. Deduplicate: if same cleaned word appears multiple times, keep entry with LOWEST level
 *    (but preserve different POS entries - combine them)
 * 6. Trim and lowercase normalize
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, '..', 'src', 'content');

const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

function levelIndex(level) {
  const idx = LEVEL_ORDER.indexOf(level);
  return idx === -1 ? 99 : idx;
}

/** Clean a single word string */
function cleanWord(raw) {
  let w = raw;
  // Remove parenthetical annotations: "bank (money)" → "bank"
  w = w.replace(/\s*\(.*$/, '');
  // Remove grammar labels: "each det./pron./adv." → "each"
  w = w.replace(/\s+(det|pron|adv|adj|conj|prep|exclam|n|v)\..*/i, '');
  // Remove trailing numeric suffixes: "last1" → "last", "second1" → "second"
  w = w.replace(/\d+$/, '');
  // Trim
  w = w.trim();
  return w;
}

/** Check if an entry is junk (not a real word) */
function isJunk(raw) {
  const lower = raw.toLowerCase();
  // Known junk entries
  if (lower.includes('from a1 to b2') ||
      lower.includes('words to learn') ||
      lower.includes('the first)') ||
      lower.startsWith('the ') ||
      lower.includes('det./')) {
    return true;
  }
  // After cleaning, if it's empty or has spaces (multi-word noise), it's junk
  const cleaned = cleanWord(raw);
  if (!cleaned || cleaned.length === 0) return true;
  // Allow known multi-word entries like "all right", "according to", etc.
  // But flag anything that looks like annotation
  if (cleaned.includes('.') || cleaned.includes('/')) return true;
  return false;
}

function processFile(filename) {
  const filePath = join(CONTENT_DIR, filename);
  const raw = JSON.parse(readFileSync(filePath, 'utf-8'));
  console.log(`\n=== ${filename} ===`);
  console.log(`  Original entries: ${raw.length}`);

  // Step 1: Remove junk
  let removed = [];
  let entries = [];
  for (const entry of raw) {
    if (isJunk(entry.word)) {
      removed.push(entry.word);
    } else {
      entries.push({ ...entry, word: cleanWord(entry.word) });
    }
  }
  console.log(`  Removed junk (${removed.length}): ${removed.join(', ')}`);

  // Step 2: Deduplicate - keep entry with lowest CEFR level; combine POS
  const wordMap = new Map(); // key: lowercase word → best entry
  let dupeCount = 0;
  for (const entry of entries) {
    const key = entry.word.toLowerCase();
    if (wordMap.has(key)) {
      dupeCount++;
      const existing = wordMap.get(key);
      // Keep the lower level
      if (levelIndex(entry.level) < levelIndex(existing.level)) {
        // New entry has lower level — keep it but merge POS
        const combinedPos = mergePos(existing.pos, entry.pos);
        wordMap.set(key, { ...entry, pos: combinedPos });
      } else {
        // Existing has lower or same level — just merge POS
        existing.pos = mergePos(existing.pos, entry.pos);
      }
    } else {
      wordMap.set(key, { ...entry });
    }
  }
  console.log(`  Deduplicated: ${dupeCount} duplicate entries merged`);

  // Step 3: Build clean array, sorted alphabetically
  const cleaned = [...wordMap.values()].sort((a, b) => 
    a.word.toLowerCase().localeCompare(b.word.toLowerCase())
  );
  console.log(`  Final entries: ${cleaned.length}`);

  // Level distribution
  const dist = {};
  for (const e of cleaned) {
    dist[e.level] = (dist[e.level] || 0) + 1;
  }
  console.log(`  Level distribution:`, dist);

  // Write back
  writeFileSync(filePath, JSON.stringify(cleaned, null, 2), 'utf-8');
  console.log(`  ✓ Written to ${filename}`);

  return cleaned;
}

function mergePos(pos1, pos2) {
  if (!pos1 && !pos2) return '';
  if (!pos1) return pos2;
  if (!pos2) return pos1;
  // Combine unique POS labels
  const parts = new Set([
    ...pos1.split(/[,;]\s*/).map(p => p.trim()).filter(Boolean),
    ...pos2.split(/[,;]\s*/).map(p => p.trim()).filter(Boolean),
  ]);
  return [...parts].join(', ');
}

// Process both files
const clean3000 = processFile('oxford-3000.json');
const clean5000 = processFile('oxford-5000-extra.json');

// Cross-file dedup: remove from 5000-extra any words already in 3000
const words3000 = new Set(clean3000.map(e => e.word.toLowerCase()));
const deduped5000 = clean5000.filter(e => !words3000.has(e.word.toLowerCase()));
const crossDupes = clean5000.length - deduped5000.length;
if (crossDupes > 0) {
  console.log(`\n=== Cross-file dedup ===`);
  console.log(`  Removed ${crossDupes} words from oxford-5000-extra that already exist in oxford-3000`);
  const dist = {};
  for (const e of deduped5000) dist[e.level] = (dist[e.level] || 0) + 1;
  console.log(`  Final 5000-extra entries: ${deduped5000.length}`, dist);
  writeFileSync(
    join(CONTENT_DIR, 'oxford-5000-extra.json'),
    JSON.stringify(deduped5000, null, 2),
    'utf-8'
  );
  console.log(`  ✓ Updated oxford-5000-extra.json`);
}

console.log(`\n✅ Total unique words: ${words3000.size + deduped5000.length}`);
