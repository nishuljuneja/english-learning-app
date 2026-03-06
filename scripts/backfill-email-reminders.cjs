const fs = require('fs');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const env = fs.readFileSync('.env.local', 'utf8');
const vars = {};
for (const line of env.split('\n')) {
  const match = line.match(/^([A-Z_]+)=(.*)/);
  if (match) {
    let val = match[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    vars[match[1]] = val;
  }
}

const app = initializeApp({
  credential: cert({
    projectId: vars.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: vars.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: vars.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const db = getFirestore(app);

async function backfill() {
  const snap = await db.collection('users').get();
  const batch = db.batch();
  let count = 0;

  snap.forEach(doc => {
    const data = doc.data();
    if (data.emailReminders === undefined) {
      batch.update(doc.ref, { emailReminders: true });
      console.log('Setting emailReminders=true for', data.displayName || doc.id);
      count++;
    }
  });

  if (count > 0) {
    await batch.commit();
    console.log(`Updated ${count} user(s).`);
  } else {
    console.log('All users already have emailReminders set.');
  }
  process.exit(0);
}

backfill().catch(e => { console.error(e.message); process.exit(1); });
