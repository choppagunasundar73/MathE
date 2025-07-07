import { collection, getDocs, query, where, addDoc, serverTimestamp, limit, CollectionReference, DocumentData } from 'firebase/firestore';
import { MathChallenge } from '../types/challenge';
import { db } from './config';
import { sampleMathChallenge, algebraChallenge, geometryChallenge } from '../data/mathChallenges';

// Initialize challenges in Firestore if they don't exist
export const initializeChallenge = async (): Promise<string[]> => {
  try {
    console.log('Starting challenge initialization...');
    
    // Check if collections exist, create them if they don't
    const challengesCollection = collection(db, 'challenges');
    const attemptsCollection = collection(db, 'challengeAttempts');
    const leaderboardCollection = collection(db, 'leaderboard');
    
    // Verify collections exist by trying to get a document
    try {
      // This is just to verify the collections exist
      await getDocs(query(challengesCollection, limit(1)));
      await getDocs(query(attemptsCollection, limit(1)));
      await getDocs(query(leaderboardCollection, limit(1)));
      console.log('All required collections exist');
    } catch (collectionError) {
      console.error('Error verifying collections:', collectionError);
      // Collections will be created automatically when documents are added
    }
    
    const challengeIds: string[] = [];
    
    // Initialize sample math challenge
    const sampleChallengeId = await initializeSingleChallenge(
      challengesCollection,
      sampleMathChallenge,
      'Sample Math Challenge'
    );
    challengeIds.push(sampleChallengeId);
    
    // Initialize algebra challenge
    const algebraChallengeId = await initializeSingleChallenge(
      challengesCollection,
      algebraChallenge,
      'Algebra Challenge'
    );
    challengeIds.push(algebraChallengeId);
    
    // Initialize geometry challenge
    const geometryChallengeId = await initializeSingleChallenge(
      challengesCollection,
      geometryChallenge,
      'Geometry Challenge'
    );
    challengeIds.push(geometryChallengeId);
    
    console.log('Challenge initialization complete with IDs:', challengeIds);
    return challengeIds;
  } catch (error) {
    console.error('Error initializing challenges:', error);
    throw error;
  }
};

// Helper function to initialize a single challenge
const initializeSingleChallenge = async (
  challengesCollection: CollectionReference<DocumentData, DocumentData>,
  challengeData: MathChallenge,
  challengeName: string
): Promise<string> => {
  // Check if the challenge already exists
  const q = query(challengesCollection, where('title', '==', challengeData.title));
  const querySnapshot = await getDocs(q);
  
  // If the challenge doesn't exist, add it
  if (querySnapshot.empty) {
    console.log(`Initializing ${challengeName}...`);
    const newChallengeData = {
      ...challengeData,
      createdAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(challengesCollection, newChallengeData);
    console.log(`${challengeName} initialized with ID:`, docRef.id);
    return docRef.id;
  } else {
    // Challenge already exists
    const challengeId = querySnapshot.docs[0].id;
    console.log(`${challengeName} already exists with ID:`, challengeId);
    return challengeId;
  }
};