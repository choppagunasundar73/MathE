import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { MathChallenge, UserChallengeAttempt, LeaderboardEntry } from '../types/challenge';
import { getChallenge, getAllChallenges, getUserBestAttempt, getChallengeLeaderboard } from '../firebase/challengeService';

interface ChallengeContextType {
  currentChallenge: MathChallenge | null;
  availableChallenges: MathChallenge[];
  isLoading: boolean;
  error: string | null;
  userBestAttempt: UserChallengeAttempt | null;
  leaderboard: LeaderboardEntry[];
  loadChallenge: (challengeId: string) => Promise<void>;
  refreshLeaderboard: () => Promise<void>;
  loadAllChallenges: () => Promise<void>;
}

const ChallengeContext = createContext<ChallengeContextType>({
  currentChallenge: null,
  availableChallenges: [],
  isLoading: false,
  error: null,
  userBestAttempt: null,
  leaderboard: [],
  loadChallenge: async () => {},
  refreshLeaderboard: async () => {},
  loadAllChallenges: async () => {}
});

export const useChallenge = () => useContext(ChallengeContext);

interface ChallengeProviderProps {
  children: ReactNode;
}

export const ChallengeProvider: React.FC<ChallengeProviderProps> = ({ children }) => {
  const [currentChallenge, setCurrentChallenge] = useState<MathChallenge | null>(null);
  const [availableChallenges, setAvailableChallenges] = useState<MathChallenge[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userBestAttempt, setUserBestAttempt] = useState<UserChallengeAttempt | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  
  const { currentUser } = useAuth();

  // Load all available challenges on mount
  useEffect(() => {
    loadAllChallenges();
  }, []);

  // Load user's best attempt when user or challenge changes
  useEffect(() => {
    const loadUserBestAttempt = async () => {
      if (currentUser && currentChallenge) {
        try {
          const bestAttempt = await getUserBestAttempt(currentUser.uid, currentChallenge.id);
          setUserBestAttempt(bestAttempt);
        } catch (err) {
          console.error('Error loading user best attempt:', err);
        }
      } else {
        setUserBestAttempt(null);
      }
    };
    
    loadUserBestAttempt();
  }, [currentUser, currentChallenge]);

  // Load challenge by ID
  const loadChallenge = async (challengeId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const challenge = await getChallenge(challengeId);
      
      if (challenge) {
        setCurrentChallenge(challenge);
        await refreshLeaderboard();
      } else {
        setError('Challenge not found');
      }
    } catch (err) {
      console.error('Error loading challenge:', err);
      setError('Failed to load challenge');
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh leaderboard
  const refreshLeaderboard = async () => {
    if (currentChallenge) {
      try {
        const leaderboardData = await getChallengeLeaderboard(currentChallenge.id);
        setLeaderboard(leaderboardData);
      } catch (err) {
        console.error('Error refreshing leaderboard:', err);
      }
    }
  };

  // Load all challenges
  const loadAllChallenges = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const challenges = await getAllChallenges();
      setAvailableChallenges(challenges);
      
      if (challenges.length > 0) {
        if (!currentChallenge) {
          await loadChallenge(challenges[0].id);
        }
      } else {
        setError('No challenges available');
      }
    } catch (err) {
      console.error('Error loading challenges:', err);
      setError('Failed to load challenges');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentChallenge,
    availableChallenges,
    isLoading,
    error,
    userBestAttempt,
    leaderboard,
    loadChallenge,
    refreshLeaderboard,
    loadAllChallenges
  };

  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
};