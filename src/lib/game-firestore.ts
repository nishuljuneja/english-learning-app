import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from './firebase';

export interface GameScore {
  uid: string;
  displayName: string;
  targetWord: string;
  timeSeconds: number;
  adjustedTime: number; // time + hint penalties
  hintsUsed: number;
  wordsFound: number;
  date: string; // YYYY-MM-DD
}

export async function saveGameScore(data: GameScore): Promise<void> {
  await addDoc(collection(db, 'gameScores'), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function getGameLeaderboard(
  targetWord: string,
  maxResults: number = 20
): Promise<GameScore[]> {
  const q = query(
    collection(db, 'gameScores'),
    where('targetWord', '==', targetWord),
    orderBy('adjustedTime', 'asc'),
    limit(maxResults)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => d.data() as GameScore);
}
