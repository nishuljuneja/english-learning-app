import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const d = JSON.parse(readFileSync(join(__dirname, '..', 'src', 'content', 'word-definitions.json'), 'utf8'));

let exact = 0, noMatch = 0, total = 0;
const misses = [];
for (const [w, v] of Object.entries(d)) {
  if (!v.e) continue;
  total++;
  const escaped = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('\\b' + escaped + '\\b', 'i');
  if (re.test(v.e)) {
    exact++;
  } else {
    noMatch++;
    if (misses.length < 30) misses.push(w + ' => ' + v.e.substring(0, 80));
  }
}
console.log('Total with examples:', total);
console.log('Exact word match in example:', exact);
console.log('No match:', noMatch);
console.log('\nSample misses:');
misses.forEach(m => console.log(' ', m));
