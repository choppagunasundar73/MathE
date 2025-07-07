import { collection, doc, setDoc, getDoc, getDocs, query, where, orderBy, limit, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from './config';
import { MathChallenge, UserChallengeAttempt, LeaderboardEntry } from '../types/challenge';

// Collection references
const challengesCollection = collection(db, 'challenges');
const attemptsCollection = collection(db, 'challengeAttempts');

// Get a specific challenge by ID
export const getChallenge = async (challengeId: string): Promise<MathChallenge | null> => {
  try {
    const challengeDoc = await getDoc(doc(challengesCollection, challengeId));
    
    if (challengeDoc.exists()) {
      const data = challengeDoc.data();
      return {
        ...data,
        id: challengeDoc.id,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate(),
      } as MathChallenge;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting challenge:', error);
    throw error;
  }
};

// Get all available challenges
export const getAllChallenges = async (): Promise<MathChallenge[]> => {
  try {
    const querySnapshot = await getDocs(challengesCollection);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate(),
      } as MathChallenge;
    });
  } catch (error) {
    console.error('Error getting all challenges:', error);
    throw error;
  }
};

// Submit a challenge attempt
export const submitChallengeAttempt = async (attempt: Omit<UserChallengeAttempt, 'completedAt'>): Promise<string> => {
  try {
    const attemptData = {
      ...attempt,
      completedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(attemptsCollection, attemptData);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting challenge attempt:', error);
    throw error;
  }
};

// Get leaderboard for a specific challenge
export const getChallengeLeaderboard = async (challengeId: string, limitCount = 10): Promise<LeaderboardEntry[]> => {
  try {
    const q = query(
      attemptsCollection,
      where('challengeId', '==', challengeId),
      orderBy('score', 'desc'),
      orderBy('timeSpent', 'asc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    
    const leaderboard = querySnapshot.docs.map((doc, index) => {
      const data = doc.data();
      return {
        ...data,
        rank: index + 1,
        completedAt: data.completedAt?.toDate() || new Date(),
      } as LeaderboardEntry;
    });
    
    return leaderboard;
  } catch (error) {
    console.error('Error getting challenge leaderboard:', error);
    throw error;
  }
};

// Get user's attempt history for a specific challenge
export const getUserChallengeAttempts = async (userId: string, challengeId: string): Promise<UserChallengeAttempt[]> => {
  try {
    const q = query(
      attemptsCollection,
      where('userId', '==', userId),
      where('challengeId', '==', challengeId),
      orderBy('completedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        completedAt: data.completedAt?.toDate() || new Date(),
      } as UserChallengeAttempt;
    });
  } catch (error) {
    console.error('Error getting user challenge attempts:', error);
    throw error;
  }
};

// Get user's best attempt for a specific challenge
export const getUserBestAttempt = async (userId: string, challengeId: string): Promise<UserChallengeAttempt | null> => {
  try {
    const q = query(
      attemptsCollection,
      where('userId', '==', userId),
      where('challengeId', '==', challengeId),
      orderBy('score', 'desc'),
      orderBy('timeSpent', 'asc'),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const data = querySnapshot.docs[0].data();
    return {
      ...data,
      completedAt: data.completedAt?.toDate() || new Date(),
    } as UserChallengeAttempt;
  } catch (error) {
    console.error('Error getting user best attempt:', error);
    throw error;
  }
};