import { collection, doc, setDoc, getDoc, getDocs, query, where, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { FirebaseError } from '../types/firebase-error';
import { db } from './config';
import { MathChallenge, UserChallengeAttempt, LeaderboardEntry } from '../types/challenge';

// Helper function to handle Firestore index errors
export const handleFirestoreError = (error: unknown) => {
  // Check if this is an index-related error and provide more helpful message
  if (error instanceof Error && error?.message?.includes('The query requires an index')) {
    console.warn('This appears to be a Firestore index error. The indexes may not be fully deployed yet.');
    console.warn('Please wait a few minutes for indexes to be created and become active.');
    
    // Extract the index creation URL if available
    const indexUrlMatch = error.message.match(/https:\/\/console\.firebase\.google\.com[^\s`]+/);
    if (indexUrlMatch) {
      console.info('You can create the required index at:', indexUrlMatch[0]);
    }
  }
  
  return error instanceof FirebaseError ? error : new Error('Unknown Firestore error');
};

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
  } catch (error: unknown) {
    console.error('Error getting challenge:', error instanceof Error ? error.message : 'Unknown error');
    throw handleFirestoreError(error);
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
  } catch (error: unknown) {
    console.error('Error getting all challenges:', error instanceof Error ? error.message : 'Unknown error');
    throw handleFirestoreError(error);
  }
};

// Submit a challenge attempt
export const submitChallengeAttempt = async (attempt: Omit<UserChallengeAttempt, 'completedAt'>): Promise<string> => {
  try {
    if (!attempt.userId || !attempt.challengeId) {
      throw new Error('User ID and Challenge ID are required for submitting an attempt');
    }
    
    console.log(`Submitting challenge attempt for user ${attempt.userId} on challenge ${attempt.challengeId}`);
    console.log('Attempt details:', JSON.stringify(attempt, null, 2));
    
    const attemptData = {
      ...attempt,
      completedAt: serverTimestamp(),
    };
    
    // Add to challenge attempts collection
    console.log('Adding to challengeAttempts collection...');
    const docRef = await addDoc(attemptsCollection, attemptData);
    console.log(`Successfully added to challengeAttempts with ID: ${docRef.id}`);
    
    // Also update the leaderboard collection
    console.log('Updating leaderboard collection...');
    const leaderboardCollection = collection(db, 'leaderboard');
    const leaderboardDocId = `${attempt.userId}_${attempt.challengeId}`;
    
    await setDoc(doc(leaderboardCollection, leaderboardDocId), {
      ...attemptData,
      attemptId: docRef.id,
      lastUpdated: serverTimestamp()
    });
    
    console.log(`Successfully updated leaderboard document with ID: ${leaderboardDocId}`);
    
    // Verify the leaderboard entry was created
    const leaderboardDoc = await getDoc(doc(leaderboardCollection, leaderboardDocId));
    if (leaderboardDoc.exists()) {
      console.log('Verified leaderboard entry was created successfully');
    } else {
      console.warn('Failed to verify leaderboard entry creation - document not found after writing');
    }
    
    console.log('Challenge attempt submitted successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error: unknown) {
    console.error('Error submitting challenge attempt:', error instanceof Error ? error.message : 'Unknown error');
    throw handleFirestoreError(error);
  }
};

// Get leaderboard for a specific challenge
export const getChallengeLeaderboard = async (challengeId: string, limitCount = 10): Promise<LeaderboardEntry[]> => {
  try {
    if (!challengeId) {
      console.error('Invalid challengeId provided to getChallengeLeaderboard');
      throw new Error('Challenge ID is required');
    }
    
    console.log(`Getting leaderboard for challenge: ${challengeId} (limit: ${limitCount})`);
    
    // Verify the challenge exists first
    const challengeDoc = await getDoc(doc(challengesCollection, challengeId));
    if (!challengeDoc.exists()) {
      console.warn(`Challenge with ID ${challengeId} not found when fetching leaderboard`);
      // We'll continue anyway to check for leaderboard entries
    } else {
      console.log(`Challenge ${challengeId} exists, proceeding to fetch leaderboard`);
    }
    
    // First try to get from dedicated leaderboard collection
    const leaderboardCollection = collection(db, 'leaderboard');
    const leaderboardQuery = query(
      leaderboardCollection,
      where('challengeId', '==', challengeId),
      orderBy('score', 'desc'),
      orderBy('timeSpent', 'asc'),
      limit(limitCount)
    );
    
    console.log('Executing leaderboard collection query...');
    let querySnapshot = await getDocs(leaderboardQuery);
    console.log(`Leaderboard collection query returned ${querySnapshot.size} documents`);
    
    // If no results in leaderboard collection, fall back to attempts collection
    if (querySnapshot.empty) {
      console.log('No entries in leaderboard collection, falling back to attempts collection');
      const attemptsQuery = query(
        attemptsCollection,
        where('challengeId', '==', challengeId),
        orderBy('score', 'desc'),
        orderBy('timeSpent', 'asc'),
        limit(limitCount)
      );
      
      console.log('Executing attempts collection query...');
      querySnapshot = await getDocs(attemptsQuery);
      console.log(`Attempts collection query returned ${querySnapshot.size} documents`);
    }
    
    // Process the results
    const leaderboard = querySnapshot.docs.map((doc, index) => {
      const data = doc.data();
      return {
        ...data,
        rank: index + 1,
        completedAt: data.completedAt?.toDate() || new Date(),
      } as LeaderboardEntry;
    });
    
    console.log(`Retrieved ${leaderboard.length} leaderboard entries for challenge: ${challengeId}`);
    
    // If we still have no entries, log a more detailed message
    if (leaderboard.length === 0) {
      console.warn(`No leaderboard entries found for challenge ${challengeId} in either collection`);
      console.log('This could be because no users have completed this challenge yet');
    }
    
    return leaderboard;
  } catch (error: unknown) {
    console.error(`Error getting challenge leaderboard for ${challengeId}:`, error instanceof Error ? error.message : 'Unknown error');
    throw handleFirestoreError(error);
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
  } catch (error: unknown) {
    console.error(`Error getting user challenge attempts for user ${userId} and challenge ${challengeId}:`, error instanceof Error ? error.message : 'Unknown error');
    throw handleFirestoreError(error);
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
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data();
      return {
        ...data,
        completedAt: data.completedAt?.toDate() || new Date(),
      } as UserChallengeAttempt;
    }
    return null;
  } catch (error: unknown) {
    console.error(`Error getting user best attempt for user ${userId} and challenge ${challengeId}:`, error instanceof Error ? error.message : 'Unknown error');
    throw handleFirestoreError(error);
  }
};