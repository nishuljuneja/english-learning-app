const fs = require('fs');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Parse .env.local manually
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

async function test() {
  try {
    const snap = await db.collection('users').limit(3).get();
    console.log('Firestore connected! Users found:', snap.size);
    snap.forEach(doc => {
      const d = doc.data();
      console.log(`  - ${d.displayName || d.email || doc.id}: streak=${d.streak}, emailReminders=${d.emailReminders || 'not set'}`);
    });

    // Test the compound query the cron job uses
    console.log('\nTesting cron query (emailReminders=true, streak>=1)...');
    const cronSnap = await db.collection('users')
      .where('emailReminders', '==', true)
      .where('streak', '>=', 1)
      .get();
    console.log('Users matching cron query:', cronSnap.size);
  } catch (err) {
    console.error('ERROR:', err.message);
    if (err.message.includes('index')) {
      console.log('\n=> You need to create a composite Firestore index.');
      console.log('   Go to the URL in the error message above to create it.');
    }
  }
  process.exit(0);
}

test();
