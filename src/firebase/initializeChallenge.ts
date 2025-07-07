import { collection, getDocs, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';
import { sampleMathChallenge, algebraChallenge, geometryChallenge } from '../data/mathChallenges';

// Initialize challenges in Firestore if they don't exist
export const initializeChallenge = async (): Promise<string[]> => {
  try {
    const challengesCollection = collection(db, 'challenges');
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
    
    return challengeIds;
  } catch (error) {
    console.error('Error initializing challenges:', error);
    throw error;
  }
};

// Helper function to initialize a single challenge
const initializeSingleChallenge = async (
  challengesCollection: any,
  challengeData: any,
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