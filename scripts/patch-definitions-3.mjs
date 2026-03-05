/**
 * Patch #3: Fix remaining entries with missing definitions + o'clock example
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFS_PATH = join(__dirname, '..', 'src', 'content', 'word-definitions.json');
const defs = JSON.parse(readFileSync(DEFS_PATH, 'utf8'));

// Fill missing definitions
const fixes = {
  "april": { d: "The fourth month of the year.", p: "noun" },
  "bank (money)": { d: "An institution for managing money and financial transactions.", p: "noun" },
  "be": { d: "To exist or live; used to describe a state or identity.", p: "verb" },
  "can1": { d: "To be able to; to have the ability or permission.", p: "verb" },
  "can2": { d: "A sealed metal container for food or drink.", p: "noun" },
  "cd": { d: "A compact disc used for storing digital data.", p: "noun" },
  "close1": { d: "To move something so it is no longer open; to shut.", p: "verb" },
  "december": { d: "The twelfth and last month of the year.", p: "noun" },
  "do1": { d: "To perform, carry out, or complete an action.", p: "verb" },
  "dvd": { d: "A digital video disc used for storing films and data.", p: "noun" },
  "each det.": { d: "Every one of two or more people or things, regarded separately.", p: "determiner" },
  "every": { d: "Used to refer to all members of a group without exception.", p: "determiner" },
  "february": { d: "The second month of the year.", p: "noun" },
  "few det.": { d: "A small number of.", p: "determiner" },
  "first det.": { d: "Coming before all others in time or order.", p: "determiner" },
  "for": { d: "Intended to belong to or be used by; in favour of.", p: "preposition" },
  "friday": { d: "The day of the week before Saturday and after Thursday.", p: "noun" },
  "from a1 to b2 level.": { d: "Ranging from beginner to upper-intermediate proficiency.", p: "phrase" },
  "have to": { d: "Must; to be required or obliged to.", p: "verb" },
  "january": { d: "The first month of the year.", p: "noun" },
  "it": { d: "Used to refer to a thing previously mentioned or easily identified.", p: "pronoun" },
  "it's": { d: "Contraction of 'it is' or 'it has'.", p: "contraction" },
  "july": { d: "The seventh month of the year.", p: "noun" },
  "june": { d: "The sixth month of the year.", p: "noun" },
  "kind1": { d: "A category of things or people with common characteristics; a type.", p: "noun" },
  "like (similar)": { d: "Having the same characteristics or qualities as; similar to.", p: "preposition" },
  "march": { d: "The third month of the year.", p: "noun" },
  "may": { d: "Expressing possibility or permission.", p: "verb" },
  "minute1": { d: "A period of time equal to sixty seconds.", p: "noun" },
  "monday": { d: "The day of the week before Tuesday and after Sunday.", p: "noun" },
  "november": { d: "The eleventh month of the year.", p: "noun" },
  "october": { d: "The tenth month of the year.", p: "noun" },
  "one": { d: "The number 1; a single unit.", p: "number" },
  "other": { d: "An additional or different person or thing.", p: "determiner" },
  "press the": { d: "To push something firmly.", p: "verb" },
  "probably": { d: "Almost certainly; as far as one knows or can tell.", p: "adverb" },
  "quite": { d: "To a certain or fairly significant extent or degree.", p: "adverb" },
  "saturday": { d: "The day of the week before Sunday and after Friday.", p: "noun" },
  "second1 (next after": { d: "Coming after the first in time or order.", p: "determiner" },
  "second1 (unit of time)": { d: "A unit of time equal to one sixtieth of a minute.", p: "noun" },
  "september": { d: "The ninth month of the year.", p: "noun" },
  "sunday": { d: "The day of the week before Monday and after Saturday.", p: "noun" },
  "their": { d: "Belonging to or associated with the people or things previously mentioned.", p: "determiner" },
  "them": { d: "Used as the object of a verb or preposition to refer to people or things previously mentioned.", p: "pronoun" },
  "thursday": { d: "The day of the week before Friday and after Wednesday.", p: "noun" },
  "tuesday": { d: "The day of the week before Wednesday and after Monday.", p: "noun" },
  "twice": { d: "Two times; on two occasions.", p: "adverb" },
  "words to learn in english": { d: "Vocabulary items for English language study.", p: "phrase" },
  "would": { d: "Past tense of 'will'; used in polite requests and conditional sentences.", p: "verb" },
  "your": { d: "Belonging to or associated with the person or people being addressed.", p: "determiner" },
  "according to": { d: "As stated or reported by.", p: "preposition" },
  "bank (river)": { d: "The land alongside or sloping down to a river.", p: "noun" },
  "bear (animal)": { d: "A large, heavy mammal with thick fur.", p: "noun" },
  "close2": { d: "A short distance away; near.", p: "adjective" },
  "kind (type)": { d: "A category of things or people with common characteristics.", p: "noun" },
  "last1 (final)": { d: "Coming after all others in time or order; final.", p: "adjective" },
  "lie1": { d: "To be in or assume a horizontal position on a surface.", p: "verb" },
  "live1": { d: "To remain alive; to have one's home in a particular place.", p: "verb" },
  "long1": { d: "Measuring a great distance from end to end.", p: "adjective" },
  "our": { d: "Belonging to or associated with us.", p: "determiner" },
};

let fixed = 0;
for (const [key, fix] of Object.entries(fixes)) {
  if (defs[key] && !defs[key].d) {
    defs[key].d = fix.d;
    defs[key].p = fix.p;
    fixed++;
  }
}

// Fix o'clock — the existing entry
for (const key of Object.keys(defs)) {
  if (key.includes('clock') && key.includes("'")) {
    if (!defs[key].d || defs[key].d === "O'clock.") {
      defs[key].d = "Used after a number to indicate the time.";
      defs[key].p = "adverb";
    }
    if (!defs[key].e) {
      defs[key].e = "The train departs at six o'clock.";
    }
    fixed++;
  }
}

// Final validation
const noDef = Object.entries(defs).filter(([k, v]) => !v.d);
const noEx = Object.entries(defs).filter(([k, v]) => !v.e);

console.log(`Fixed ${fixed} entries`);
console.log(`Total definitions: ${Object.keys(defs).length}`);
console.log(`Without definition: ${noDef.length}`);
console.log(`Without example: ${noEx.length}`);

if (noDef.length > 0) {
  console.log('Still no def:', noDef.map(([k]) => k).join(', '));
}
if (noEx.length > 0) {
  console.log('Still no example:', noEx.map(([k]) => k).join(', '));
}

writeFileSync(DEFS_PATH, JSON.stringify(defs), 'utf8');
console.log('Saved.');
