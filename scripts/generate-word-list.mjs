#!/usr/bin/env node
/**
 * Generate a comprehensive 3–7 letter English word list for the Unjumble game.
 * Source: "an-array-of-english-words" (~275K words from Project Gutenberg / Moby)
 * Output: src/content/game-dictionary.json (sorted, lowercase, alpha-only, 3–7 chars)
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..');

// Load the word list from the package
const pkgPath = join(root, 'node_modules', 'an-array-of-english-words', 'index.json');
const allWords = JSON.parse(readFileSync(pkgPath, 'utf-8'));

console.log(`Total words in source: ${allWords.length}`);

// Filter: only 3–7 letter, purely alphabetic, lowercase words
const ALPHA = /^[a-z]+$/;
const filtered = allWords
  .map(w => w.toLowerCase().trim())
  .filter(w => w.length >= 3 && w.length <= 7 && ALPHA.test(w));

// Deduplicate
const unique = [...new Set(filtered)].sort();

console.log(`Filtered to ${unique.length} words (3–7 letters, alpha only)`);

// Show breakdown by length
for (let len = 3; len <= 7; len++) {
  const count = unique.filter(w => w.length === len).length;
  console.log(`  ${len}-letter: ${count}`);
}

// Verify some words the user reported as missing
const checkWords = ['con', 'lice', 'corn', 'ice', 'lion', 'rice', 'ore', 'core', 'nice', 'once', 'coin'];
for (const w of checkWords) {
  const found = unique.includes(w);
  console.log(`  "${w}": ${found ? '✓ found' : '✗ MISSING'}`);
}

// Save as JSON array (compact but with newlines for readability in diffs)
const outPath = join(root, 'src', 'content', 'game-dictionary.json');
writeFileSync(outPath, JSON.stringify(unique));

const sizeKB = (Buffer.byteLength(JSON.stringify(unique)) / 1024).toFixed(1);
console.log(`\nSaved to src/content/game-dictionary.json (${sizeKB} KB)`);
