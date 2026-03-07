import { initializeApp, cert, getApps, getApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

/**
 * Firebase Admin SDK initialisation (server-side only, lazy).
 *
 * Required env vars (set in .env.local / hosting dashboard):
 *   FIREBASE_ADMIN_PROJECT_ID   (falls back to NEXT_PUBLIC_FIREBASE_PROJECT_ID)
 *   FIREBASE_ADMIN_CLIENT_EMAIL
 *   FIREBASE_ADMIN_PRIVATE_KEY  — paste the JSON key's private_key value
 *                                  (with literal \n, the code handles escaping)
 */

let _app: App | null = null;
let _db: Firestore | null = null;

function getAdminApp(): App {
  if (_app) return _app;
  if (getApps().length > 0) {
    _app = getApp();
    return _app;
  }

  const projectId =
    process.env.FIREBASE_ADMIN_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;

  // Handle private key from various env var formats:
  // - Vercel may store with literal \n or actual newlines
  // - .env.local wraps in quotes with literal \n
  // - Some platforms double-escape as \\n
  let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY || '';
  // Strip surrounding quotes if present
  if ((privateKey.startsWith('"') && privateKey.endsWith('"')) ||
      (privateKey.startsWith("'") && privateKey.endsWith("'"))) {
    privateKey = privateKey.slice(1, -1);
  }
  // Replace literal \n sequences with actual newlines
  privateKey = privateKey.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin credentials. Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY.'
    );
  }

  _app = initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
  return _app;
}

/** Lazy getter — only initializes when first called at runtime, not at build time. */
export function getAdminDb(): Firestore {
  if (!_db) {
    _db = getFirestore(getAdminApp());
  }
  return _db;
}
