import { collection, doc, getDoc, getDocs, query, where, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';
import { handleFirestoreError } from './challengeService';

// Collection references
const userCompletedChallengesCollection = collection(db, 'userCompletedChallenges');

// Interface for user completed challenge
interface UserCompletedChallenge {
  userId: string;
  challengeId: string;
  completedAt: Date;
  bestScore: number;
  bestTime: number;
}

/**
 * Mark a challenge as completed by a user
 * @param userId The user ID
 * @param challengeId The challenge ID
 * @param score The score achieved
 * @param timeSpent The time spent in seconds
 */
export const markChallengeCompleted = async (
  userId: string,
  challengeId: string,
  score: number,
  timeSpent: number
): Promise<void> => {
  try {
    if (!userId || !challengeId) {
      throw new Error('User ID and Challenge ID are required');
    }
    
    console.log(`Marking challenge ${challengeId} as completed for user ${userId}`);
    
    // Check if the user has already completed this challenge
    const existingRecord = await getUserCompletedChallenge(userId, challengeId);
    
    // Document ID format: userId_challengeId
    const docId = `${userId}_${challengeId}`;
    
    if (existingRecord) {
      console.log('User has already completed this challenge, updating best score if needed');
      
      // Only update if the new score is better or if the score is the same but time is better
      if (score > existingRecord.bestScore || 
          (score === existingRecord.bestScore && timeSpent < existingRecord.bestTime)) {
        await setDoc(doc(userCompletedChallengesCollection, docId), {
          userId,
          challengeId,
          completedAt: serverTimestamp(),
          bestScore: score,
          bestTime: timeSpent,
          lastUpdated: serverTimestamp()
        }, { merge: true });
        console.log('Updated user completed challenge record with better score/time');
      } else {
        console.log('No update needed, existing record has better or equal score/time');
      }
    } else {
      // Create a new record
      await setDoc(doc(userCompletedChallengesCollection, docId), {
        userId,
        challengeId,
        completedAt: serverTimestamp(),
        bestScore: score,
        bestTime: timeSpent,
        lastUpdated: serverTimestamp()
      });
      console.log('Created new user completed challenge record');
    }
  } catch (error) {
    console.error('Error marking challenge as completed:', error);
    throw handleFirestoreError(error);
  }
};

/**
 * Get a specific completed challenge for a user
 * @param userId The user ID
 * @param challengeId The challenge ID
 * @returns The completed challenge record or null if not found
 */
export const getUserCompletedChallenge = async (
  userId: string,
  challengeId: string
): Promise<UserCompletedChallenge | null> => {
  try {
    const docId = `${userId}_${challengeId}`;
    const docRef = doc(userCompletedChallengesCollection, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        completedAt: data.completedAt?.toDate() || new Date(),
      } as UserCompletedChallenge;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user completed challenge:', error);
    throw handleFirestoreError(error);
  }
};

/**
 * Get all completed challenges for a user
 * @param userId The user ID
 * @returns Array of completed challenge records
 */
export const getUserCompletedChallenges = async (userId: string): Promise<UserCompletedChallenge[]> => {
  try {
    const q = query(
      userCompletedChallengesCollection,
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        completedAt: data.completedAt?.toDate() || new Date(),
      } as UserCompletedChallenge;
    });
  } catch (error) {
    console.error('Error getting user completed challenges:', error);
    throw handleFirestoreError(error);
  }
};

/**
 * Check if a user has completed a challenge
 * @param userId The user ID
 * @param challengeId The challenge ID
 * @returns True if the user has completed the challenge, false otherwise
 */
export const hasUserCompletedChallenge = async (
  userId: string,
  challengeId: string
): Promise<boolean> => {
  try {
    const completedChallenge = await getUserCompletedChallenge(userId, challengeId);
    return completedChallenge !== null;
  } catch (error) {
    console.error('Error checking if user completed challenge:', error);
    throw handleFirestoreError(error);
  }
};