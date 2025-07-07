import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { useAuth } from './AuthContext';
import { MathChallenge, UserChallengeAttempt, LeaderboardEntry } from '../types/challenge';
import { getChallenge, getAllChallenges, getUserBestAttempt, getChallengeLeaderboard } from '../firebase/challengeService';
import { getUserCompletedChallenges, markChallengeCompleted } from '../firebase/userService';
import { FirebaseError } from '../types/firebase-error';

interface ChallengeContextType {
  currentChallenge: MathChallenge | null;
  availableChallenges: MathChallenge[];
  completedChallenges: string[];
  isLoading: boolean;
  error: string | null;
  userBestAttempt: UserChallengeAttempt | null;
  leaderboard: LeaderboardEntry[];
  loadChallenge: (challengeId: string) => Promise<MathChallenge>;
  refreshLeaderboard: (challengeId?: string) => Promise<void>;
  loadAllChallenges: () => Promise<MathChallenge[]>;
  setIsLoading: (isLoading: boolean) => void;
  markCurrentChallengeCompleted: (score: number, timeSpent: number) => Promise<void>;
  refreshCompletedChallenges: () => Promise<void>;
  hideCompletedChallenges: boolean;
  setHideCompletedChallenges: (hide: boolean) => void;
}

const ChallengeContext = createContext<ChallengeContextType>({
  currentChallenge: null,
  availableChallenges: [],
  completedChallenges: [],
  isLoading: false,
  error: null,
  userBestAttempt: null,
  leaderboard: [],
  loadChallenge: async () => { throw new Error('Not implemented'); },
  refreshLeaderboard: async (challengeIdToRefresh?: string) => {},
   loadAllChallenges: async () => { return []; },
  setIsLoading: () => {},
  markCurrentChallengeCompleted: async () => {},
  refreshCompletedChallenges: async () => {},
  hideCompletedChallenges: false,
  setHideCompletedChallenges: () => {}
});

export const useChallenge = () => useContext(ChallengeContext);

interface ChallengeProviderProps {
  children: ReactNode;
}

export const ChallengeProvider: React.FC<ChallengeProviderProps> = ({ children }) => {
  const [currentChallenge, setCurrentChallenge] = useState<MathChallenge | null>(null);
  const [availableChallenges, setAvailableChallenges] = useState<MathChallenge[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userBestAttempt, setUserBestAttempt] = useState<UserChallengeAttempt | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [hideCompletedChallenges, setHideCompletedChallenges] = useState<boolean>(false);
  
  const { currentUser } = useAuth();

  // Load all available challenges on mount
  // Using a ref to ensure it only runs once
  const initialLoadRef = useRef(false);
  useEffect(() => {
    if (!initialLoadRef.current) {
      console.log('Initial load of all challenges');
      loadAllChallenges();
      initialLoadRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Load user's completed challenges when user changes
  // Using a ref to track the previous user ID
  const prevUserRef = useRef<string | null>(null);
  useEffect(() => {
    const currentUserId = currentUser?.uid || null;
    
    // Only refresh if the user has changed
    if (currentUserId !== prevUserRef.current) {
      if (currentUser) {
        console.log(`User changed to ${currentUser.uid}, loading completed challenges`);
        refreshCompletedChallenges();
      } else {
        console.log('No user, clearing completed challenges');
        setCompletedChallenges([]);
      }
      
      // Update the previous user ref
      prevUserRef.current = currentUserId;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // Load user's best attempt when user or challenge changes
  // Using refs to track previous values
  const prevUserForBestAttemptRef = useRef<string | null>(null);
  const prevChallengeForBestAttemptRef = useRef<string | null>(null);
  
  useEffect(() => {
    const currentUserId = currentUser?.uid || null;
    const currentChallengeId = currentChallenge?.id || null;
    const prevUserId = prevUserForBestAttemptRef.current;
    const prevChallengeId = prevChallengeForBestAttemptRef.current;
    
    // Only load if user or challenge has changed
    if (currentUserId !== prevUserId || currentChallengeId !== prevChallengeId) {
      const loadUserBestAttempt = async () => {
        if (currentUser && currentChallenge) {
          try {
            console.log(`Loading best attempt for user ${currentUser.uid} and challenge ${currentChallenge.id}`);
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
      
      // Update refs
      prevUserForBestAttemptRef.current = currentUserId;
      prevChallengeForBestAttemptRef.current = currentChallengeId;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, currentChallenge]);

  // Load a specific challenge
  const loadChallenge = async (challengeId: string) => {
    try {
      console.log(`Loading challenge with ID: ${challengeId}`);
      setIsLoading(true);
      setError(null);
      
      const challenge = await getChallenge(challengeId);
      
      if (!challenge) {
        throw new Error(`Challenge with ID ${challengeId} not found`);
      }
      
      console.log('Challenge loaded successfully:', challenge);
      setCurrentChallenge(challenge);
      
      // Load user's best attempt for this challenge
      if (currentUser) {
        console.log(`Loading best attempt for user ${currentUser.uid}`);
      } else {
        console.warn('No current user, skipping best attempt loading');
      }
      
      // Refresh leaderboard with the newly loaded challenge's ID
      await refreshLeaderboard(challenge.id);
      
      return challenge; // Return the challenge for the caller
    } catch (err: unknown) {
      const error = err as Error | FirebaseError;
      console.error('Error loading challenge:', err);
      
      // Provide user-friendly error messages based on error type
      if (error?.message?.includes('The query requires an index')) {
        setError('Challenge data is not available yet. The required database indexes are being created. Please try again in a few minutes.');
      } else if (error?.message?.includes('Missing or insufficient permissions')) {
        setError('You do not have permission to view this challenge. Please sign in or contact support.');
      } else if (error?.message?.includes('network error')) {
        setError('Network error. Please check your internet connection and try again.');
      } else if ((error as FirebaseError)?.code === 'unavailable') {
        setError('Firebase service is currently unavailable. Please try again later.');
      } else {
        setError(`Failed to load challenge: ${error.message || 'Unknown error'}`);
      }
      throw err; // Re-throw to allow caller to handle
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh leaderboard with retry mechanism and safeguards against excessive recursion
  const refreshLeaderboard = async (challengeIdToRefresh?: string, retryCount = 0, maxRetries = 2) => {
    const targetChallengeId = challengeIdToRefresh || currentChallenge?.id;

    // Generate a unique key for this refresh operation
    const refreshKey = `refresh_${targetChallengeId}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Track if this is already running to prevent concurrent refreshes
    if (window.refreshingLeaderboard) {
      console.log(`Skipping duplicate leaderboard refresh for ${targetChallengeId}`);
      return;
    }
    
    // Set running flag
    window.refreshingLeaderboard = refreshKey;
    console.log(`Starting leaderboard refresh with key: ${refreshKey}`);
    
    if (targetChallengeId) {
      try {
        console.log(`Refreshing leaderboard for challenge: ${targetChallengeId} (attempt ${retryCount + 1})`);
        setIsLoading(true);
        setError(null);
        
        // Add a small delay to ensure Firestore has time to update
        // Increase delay with each retry
        const delayTime = 500 + (retryCount * 500);
        await new Promise(resolve => setTimeout(resolve, delayTime));
        
        const leaderboardData = await getChallengeLeaderboard(targetChallengeId);
        console.log('Leaderboard data received:', leaderboardData);
        
        // Check if this refresh operation is still valid (hasn't been superseded)
        if (window.refreshingLeaderboard !== refreshKey) {
          console.log(`Refresh operation ${refreshKey} was superseded, discarding results`);
          return;
        }
        
        // If we got an empty array and we haven't exceeded max retries, try again
        // But limit the recursion depth to avoid infinite loops
        if (leaderboardData.length === 0 && retryCount < maxRetries) {
          console.log(`No leaderboard entries found, retrying (${retryCount + 1}/${maxRetries})...`);
          setIsLoading(false);
          
          // Clear the running flag before scheduling the retry
          if (window.refreshingLeaderboard === refreshKey) {
            window.refreshingLeaderboard = false;
          }
          
          // Use setTimeout to avoid stack overflow with recursive calls
          setTimeout(() => {
            refreshLeaderboard(targetChallengeId, retryCount + 1, maxRetries);
          }, 1000);
          return;
        }
        
        // Only update state if the leaderboard has actually changed
        const currentData = leaderboard || [];
        const hasChanged = leaderboardData.length !== currentData.length || 
                          JSON.stringify(leaderboardData) !== JSON.stringify(currentData);
        
        if (hasChanged) {
          console.log(`Updating leaderboard with ${leaderboardData.length} entries`);
          setLeaderboard(leaderboardData);
        } else {
          console.log('Leaderboard unchanged, skipping update');
        }
      } catch (err: unknown) {
      const error = err as Error | FirebaseError;
        console.error('Error refreshing leaderboard:', err);
        
        // If we haven't exceeded max retries, try again for certain errors
        // But limit the recursion depth to avoid infinite loops
        if (retryCount < maxRetries && 
            ((error as FirebaseError)?.code === 'unavailable' || 
             error?.message?.includes('network error') ||
             error?.message?.includes('The query requires an index'))) {
          console.log(`Error occurred, retrying (${retryCount + 1}/${maxRetries})...`);
          setIsLoading(false);
          
          // Clear the running flag before scheduling the retry
          if (window.refreshingLeaderboard === refreshKey) {
            window.refreshingLeaderboard = false;
          }
          
          // Use setTimeout to avoid stack overflow with recursive calls
          setTimeout(() => {
            refreshLeaderboard(targetChallengeId, retryCount + 1, maxRetries);
          }, 1500);
          return;
        }
        
        // Provide user-friendly error messages based on error type
        if (error?.message?.includes('The query requires an index')) {
          setError('Leaderboard data is not available yet. The required database indexes are being created. Please try again in a few minutes.');
        } else if (error?.message?.includes('Missing or insufficient permissions')) {
          setError('You do not have permission to view this leaderboard. Please sign in or contact support.');
        } else if (error?.message?.includes('network error')) {
          setError('Network error. Please check your internet connection and try again.');
        } else if ((error as FirebaseError)?.code === 'unavailable') {
          setError('Firebase service is currently unavailable. Please try again later.');
        } else {
          setError('Failed to load leaderboard data. Please try again later.');
        }
      } finally {
        setIsLoading(false);
        
        // Only clear the flag if it still matches our operation
        if (window.refreshingLeaderboard === refreshKey) {
          console.log(`Clearing leaderboard refresh flag for operation: ${refreshKey}`);
          window.refreshingLeaderboard = false;
        }
      }
    } else {
      console.warn('Cannot refresh leaderboard: No challenge ID provided and no current challenge selected');
      
      // Only clear the flag if it still matches our operation
      if (window.refreshingLeaderboard === refreshKey) {
        window.refreshingLeaderboard = false;
      }
    }
  };

  // Load all challenges with safeguards against excessive data retrieval
  const loadAllChallenges = async () => {
    // Track if this is already running to prevent concurrent loads
    if (window.loadingAllChallenges) {
      console.log('Already loading challenges, skipping duplicate request');
      return [];
    }
    
    // Set running flag
    window.loadingAllChallenges = true;
    
    try {
      console.log('Loading all available challenges...');
      setIsLoading(true);
      setError(null);
      
      const challenges = await getAllChallenges();
      console.log(`Loaded ${challenges.length} challenges:`, challenges);
      
      if (challenges.length === 0) {
        console.warn('No challenges found in the database');
        setError('No challenges found. Please initialize challenges first.');
      } else {
        setAvailableChallenges(challenges);
        
        // Only load the first challenge if we don't have a current challenge
        // This prevents unnecessary data retrieval
        if (!currentChallenge && challenges.length > 0) {
          await loadChallenge(challenges[0].id);
        }
      }
      
      return challenges;
    } catch (err: unknown) {
      const error = err as Error | FirebaseError;
      console.error('Error loading challenges:', err);
      
      // Provide user-friendly error messages based on error type
      if ((error as FirebaseError)?.code === 'unavailable') {
        setError('Firebase service is currently unavailable. Please try again later.');
      } else if (error?.message?.includes('network error')) {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setError(`Failed to load challenges: ${error.message || 'Unknown error'}`);
      }
      
      return [];
    } finally {
      setIsLoading(false);
      window.loadingAllChallenges = false; // Clear running flag
    }
  };

  // Mark current challenge as completed
  const markCurrentChallengeCompleted = async (score: number, timeSpent: number) => {
    if (!currentUser || !currentChallenge) {
      console.warn('Cannot mark challenge as completed: No user or challenge');
      return;
    }
    
    try {
      await markChallengeCompleted(
        currentUser.uid,
        currentChallenge.id,
        score,
        timeSpent
      );
      
      // Refresh the completed challenges list
      await refreshCompletedChallenges();
    } catch (err) {
      console.error('Error marking challenge as completed:', err);
    }
  };
  
  // Refresh the list of completed challenges with safeguards against excessive data retrieval
  const refreshCompletedChallenges = async () => {
    // Track if this is already running to prevent concurrent refreshes
    if (window.refreshingCompletedChallenges) {
      console.log('Already refreshing completed challenges, skipping duplicate request');
      return;
    }
    
    if (!currentUser) {
      console.warn('Cannot refresh completed challenges: No user');
      return;
    }
    
    // Set running flag
    window.refreshingCompletedChallenges = true;
    
    try {
      console.log(`Refreshing completed challenges for user ${currentUser.uid}`);
      const completedChallengesData = await getUserCompletedChallenges(currentUser.uid);
      const completedIds = completedChallengesData.map(challenge => challenge.challengeId);
      
      // Only update state if the completed challenges have actually changed
      // This prevents unnecessary re-renders
      const currentIds = completedChallenges || [];
      const hasChanged = currentIds.length !== completedIds.length || 
                         completedIds.some(id => !currentIds.includes(id));
      
      if (hasChanged) {
        console.log(`Updating completed challenges: ${completedIds.length} challenges`);
        setCompletedChallenges(completedIds);
      } else {
        console.log('Completed challenges unchanged, skipping update');
      }
      
      console.log(`Loaded ${completedIds.length} completed challenges for user ${currentUser.uid}`);
    } catch (err) {
      console.error('Error refreshing completed challenges:', err);
    } finally {
      window.refreshingCompletedChallenges = false; // Clear running flag
    }
  };

  const value = {
    currentChallenge,
    availableChallenges,
    completedChallenges,
    isLoading,
    error,
    userBestAttempt,
    leaderboard,
    loadChallenge,
    refreshLeaderboard,
    loadAllChallenges,
    setIsLoading,
    markCurrentChallengeCompleted,
    refreshCompletedChallenges,
    hideCompletedChallenges,
    setHideCompletedChallenges
  };

  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
};