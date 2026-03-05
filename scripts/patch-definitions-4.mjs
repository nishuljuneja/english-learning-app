/**
 * Patch #4: Final cleanup of annotated keys
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFS_PATH = join(__dirname, '..', 'src', 'content', 'word-definitions.json');
const defs = JSON.parse(readFileSync(DEFS_PATH, 'utf8'));

// These are annotated Oxford keys. The vocabulary.ts cleanWord() strips them
// down to their base word which already has a definition, but let's fill
// these entries too for completeness.
const finalFixes = {
  "lamp)": { d: "A device for giving light.", e: "She switched on the lamp to read her book.", p: "noun" },
  "light (from the sun": { d: "The natural agent that stimulates sight.", e: "The light from the sun warmed the room.", p: "noun" },
  "like (find sb": { d: "To find agreeable or enjoyable.", e: "I like spending time with my family.", p: "verb" },
  "look": { d: "To direct one's gaze in a specified direction.", e: "Look at the beautiful rainbow in the sky.", p: "verb" },
  "match (contest": { d: "A contest or game between two sides.", e: "India won the cricket match by five wickets.", p: "noun" },
  "more det.": { d: "A greater or additional amount.", e: "She needs more time to complete the project.", p: "determiner" },
  "most det.": { d: "Greatest in amount or degree.", e: "Most students chose science as their stream.", p: "determiner" },
  "much det.": { d: "A large amount of.", e: "How much sugar do you take in your tea?", p: "determiner" },
  "out adv.": { d: "Moving away from a place.", e: "She went out to buy vegetables from the market.", p: "adverb" },
  "the first) det.": { d: "A public road in a city or town.", e: "The main street was lined with shops.", p: "noun" },
  "until conj.": { d: "Up to the point in time mentioned.", e: "Study until you understand the concept.", p: "conjunction" },
  "all right adj.": { d: "Satisfactory; acceptable.", e: "Everything is all right now.", p: "adjective" },
  "either det.": { d: "One or the other of two.", e: "You can choose either option.", p: "determiner" },
  "expert n.": { d: "A person with special knowledge or skill.", e: "She is an expert in data science.", p: "noun" },
};

let fixed = 0;
for (const [key, val] of Object.entries(finalFixes)) {
  if (defs[key]) {
    if (!defs[key].d) { defs[key].d = val.d; fixed++; }
    if (!defs[key].e) { defs[key].e = val.e; }
    if (!defs[key].p) { defs[key].p = val.p; }
  }
}

// Fix o'clock - find the exact key
for (const key of Object.keys(defs)) {
  if (key.toLowerCase().replace(/[^a-z]/g, '') === 'oclock') {
    if (!defs[key].e) {
      defs[key].e = "The shop opens at nine o'clock every morning.";
      fixed++;
    }
    if (!defs[key].d || defs[key].d === "O'clock.") {
      defs[key].d = "Used after a number from one to twelve to indicate the time.";
      defs[key].p = "adverb";
    }
    console.log(`Fixed key: "${key}"`);
  }
}

// Final validation
const noDef = Object.entries(defs).filter(([k, v]) => !v.d);
const noEx = Object.entries(defs).filter(([k, v]) => !v.e);
console.log(`Fixed ${fixed} entries`);
console.log(`Total: ${Object.keys(defs).length}`);
console.log(`Without definition: ${noDef.length}`);
console.log(`Without example: ${noEx.length}`);
if (noDef.length > 0) console.log('No def:', noDef.map(([k]) => JSON.stringify(k)).join(', '));
if (noEx.length > 0) console.log('No example:', noEx.map(([k]) => JSON.stringify(k)).join(', '));

writeFileSync(DEFS_PATH, JSON.stringify(defs), 'utf8');
console.log('Saved.');
