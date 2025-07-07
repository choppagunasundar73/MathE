import { sampleMathChallenge, algebraChallenge, geometryChallenge } from '../data/mathChallenges';
import { addMockChallenge } from './mockChallengeService';

// Initialize challenges in mock storage
export const initializeChallenge = async (): Promise<string[]> => {
  try {
    // Add the sample challenges to mock storage
    const sampleId = addMockChallenge(sampleMathChallenge);
    const algebraId = addMockChallenge(algebraChallenge);
    const geometryId = addMockChallenge(geometryChallenge);
    
    console.log('Successfully initialized mock challenges');
    return [sampleId, algebraId, geometryId];
  } catch (error) {
    console.error('Error initializing mock challenges:', error);
    throw error;
  }
};