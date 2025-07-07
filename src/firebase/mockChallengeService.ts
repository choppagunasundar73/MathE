import { MathChallenge, UserChallengeAttempt, LeaderboardEntry } from '../types/challenge';
import { sampleMathChallenge, algebraChallenge, geometryChallenge } from '../data/mathChallenges';

// Mock data storage
let challenges: MathChallenge[] = [];
let attempts: (UserChallengeAttempt & { id: string })[] = [];
let nextAttemptId = 1;

// Initialize mock challenges
const initializeMockChallenges = () => {
  if (challenges.length === 0) {
    // Add sample challenges with IDs
    challenges = [
      { ...sampleMathChallenge, id: 'challenge-1', createdAt: new Date(), updatedAt: new Date() },
      { ...algebraChallenge, id: 'challenge-2', createdAt: new Date(), updatedAt: new Date() },
      { ...geometryChallenge, id: 'challenge-3', createdAt: new Date(), updatedAt: new Date() }
    ];
  }
};

// Initialize mock data
initializeMockChallenges();

// Get a specific challenge by ID
export const getChallenge = async (challengeId: string): Promise<MathChallenge | null> => {
  try {
    const challenge = challenges.find(c => c.id === challengeId);
    return challenge || null;
  } catch (error) {
    console.error('Error getting challenge:', error);
    throw error;
  }
};

// Get all available challenges
export const getAllChallenges = async (): Promise<MathChallenge[]> => {
  try {
    return [...challenges];
  } catch (error) {
    console.error('Error getting all challenges:', error);
    throw error;
  }
};

// Submit a challenge attempt
export const submitChallengeAttempt = async (attempt: Omit<UserChallengeAttempt, 'completedAt'>): Promise<string> => {
  try {
    const attemptId = `attempt-${nextAttemptId++}`;
    const newAttempt = {
      ...attempt,
      id: attemptId,
      completedAt: new Date(),
    };
    
    attempts.push(newAttempt);
    return attemptId;
  } catch (error) {
    console.error('Error submitting challenge attempt:', error);
    throw error;
  }
};

// Get leaderboard for a specific challenge
export const getChallengeLeaderboard = async (challengeId: string, limitCount = 10): Promise<LeaderboardEntry[]> => {
  try {
    const challengeAttempts = attempts.filter(a => a.challengeId === challengeId);
    
    // Sort by score (desc) and timeSpent (asc)
    const sortedAttempts = challengeAttempts.sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score; // Higher score first
      }
      return a.timeSpent - b.timeSpent; // Lower time first
    });
    
    // Get top attempts and convert to leaderboard entries
    return sortedAttempts.slice(0, limitCount).map((attempt, index) => ({
      ...attempt,
      rank: index + 1,
    })) as LeaderboardEntry[];
  } catch (error) {
    console.error('Error getting challenge leaderboard:', error);
    throw error;
  }
};

// Get user's attempt history for a specific challenge
export const getUserChallengeAttempts = async (userId: string, challengeId: string): Promise<UserChallengeAttempt[]> => {
  try {
    const userAttempts = attempts.filter(
      a => a.userId === userId && a.challengeId === challengeId
    );
    
    // Sort by completedAt (desc)
    return userAttempts.sort((a, b) => {
      return b.completedAt.getTime() - a.completedAt.getTime();
    });
  } catch (error) {
    console.error('Error getting user challenge attempts:', error);
    throw error;
  }
};

// Get user's best attempt for a specific challenge
export const getUserBestAttempt = async (userId: string, challengeId: string): Promise<UserChallengeAttempt | null> => {
  try {
    const userAttempts = attempts.filter(
      a => a.userId === userId && a.challengeId === challengeId
    );
    
    if (userAttempts.length === 0) {
      return null;
    }
    
    // Sort by score (desc) and timeSpent (asc)
    const sortedAttempts = userAttempts.sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score; // Higher score first
      }
      return a.timeSpent - b.timeSpent; // Lower time first
    });
    
    return sortedAttempts[0];
  } catch (error) {
    console.error('Error getting user best attempt:', error);
    throw error;
  }
};

// Add a mock challenge (for testing)
export const addMockChallenge = (challenge: Omit<MathChallenge, 'id' | 'createdAt' | 'updatedAt'>): string => {
  const id = `challenge-${challenges.length + 1}`;
  const newChallenge = {
    ...challenge,
    id,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  challenges.push(newChallenge);
  return id;
};

// Add a mock attempt (for testing)
export const addMockAttempt = (attempt: Omit<UserChallengeAttempt, 'completedAt'>): string => {
  const id = `attempt-${nextAttemptId++}`;
  const newAttempt = {
    ...attempt,
    id,
    completedAt: new Date(),
  };
  
  attempts.push(newAttempt);
  return id;
};