import React, { useEffect, useRef } from 'react';
import { useChallenge } from '../context/ChallengeContext';
import { useAuth } from '../context/AuthContext';
import { Trophy, Medal, Clock, User, RefreshCw } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const { currentChallenge, leaderboard, refreshLeaderboard, isLoading, error } = useChallenge();
  const { currentUser } = useAuth();

  // Refresh leaderboard when current challenge changes and set up periodic refresh
  // Using a ref to track the previous challenge ID
  const prevChallengeIdRef = useRef<string | null>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const currentChallengeId = currentChallenge?.id || null;
    const prevChallengeId = prevChallengeIdRef.current;
    
    // Only refresh if the challenge has changed
    if (currentChallengeId !== prevChallengeId) {
      console.log(`Leaderboard: Challenge changed from ${prevChallengeId} to ${currentChallengeId}`);
      
      // Clear existing interval if any
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        console.log('Cleared previous leaderboard refresh interval');
        refreshIntervalRef.current = null;
      }
      
      // Initial refresh for the new challenge
      if (currentChallenge) {
        console.log(`Initial leaderboard refresh for challenge ${currentChallengeId}`);
        refreshLeaderboard(currentChallenge.id);
        
        // Set up periodic refresh every 60 seconds (reduced frequency)
        refreshIntervalRef.current = setInterval(() => {
          if (document.visibilityState === 'visible') {
            console.log('Periodic leaderboard refresh (60s interval)');
            refreshLeaderboard(currentChallenge.id);
          } else {
            console.log('Skipping leaderboard refresh - page not visible');
          }
        }, 60000); // 60 seconds
        
        console.log('Set up new leaderboard refresh interval (60s)');
      }
      
      // Update the previous challenge ref
      prevChallengeIdRef.current = currentChallengeId;
    }
    
    // Clean up interval on unmount
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        console.log('Cleaned up leaderboard refresh interval on unmount');
        refreshIntervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChallenge]); // Don't add refreshLeaderboard to dependency array

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentChallenge) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-xl overflow-hidden shadow-2xl">
      {/* Leaderboard Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm p-6 border-b border-violet-500/30">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Trophy className="w-6 h-6 text-yellow-400 mr-3" />
            <h2 className="text-2xl font-bold text-white">Challenge Leaderboard</h2>
          </div>
          
          <button 
            onClick={() => refreshLeaderboard(currentChallenge?.id)}
            disabled={isLoading}
            className="p-2 rounded-full bg-slate-700/50 text-violet-300 hover:bg-slate-700 hover:text-white transition-colors"
            title="Refresh Leaderboard"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Leaderboard Content */}
      <div className="p-6">
        {isLoading && !error ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-violet-400 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Loading Leaderboard</h3>
            <p className="text-violet-300">Retrieving the latest rankings...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Leaderboard Error</h3>
            <p className="text-violet-300 mb-4">{error}</p>
            <button 
              onClick={() => refreshLeaderboard(currentChallenge?.id)}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Entries Yet</h3>
            <p className="text-violet-300 mb-4">Be the first to complete this challenge!</p>
            
            {currentUser && (
              <div className="mt-4">
                <button 
                  onClick={() => {
                    // Create a test submission for debugging purposes
                    if (currentChallenge && currentUser) {
                      import('../firebase/challengeService').then(({ submitChallengeAttempt }) => {
                        submitChallengeAttempt({
                          userId: currentUser.uid,
                          userName: currentUser.displayName || 'Anonymous User',
                          userPhotoURL: currentUser.photoURL || '',
                          challengeId: currentChallenge.id,
                          score: Math.floor(Math.random() * currentChallenge.totalPoints) + 1,
                          timeSpent: Math.floor(Math.random() * 300) + 60, // 1-6 minutes
                          correctAnswers: Math.floor(Math.random() * currentChallenge.questions.length) + 1,
                          totalQuestions: currentChallenge.questions.length,
                          answers: {}
                        }).then(() => {
                          console.log('Test submission created successfully');
                          refreshLeaderboard(currentChallenge.id);
                        }).catch(err => {
                          console.error('Error creating test submission:', err);
                        });
                      });
                    }
                  }}
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md transition-colors"
                >
                  Create Test Entry
                </button>
                <p className="text-xs text-slate-500 mt-2">This button is for testing only</p>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Rank</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">User</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Score</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Accuracy</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {leaderboard.map((entry) => {
                  const isCurrentUser = currentUser && entry.userId === currentUser.uid;
                  
                  return (
                    <tr 
                      key={`${entry.userId}-${entry.completedAt.getTime()}`}
                      className={`${isCurrentUser ? 'bg-violet-500/10' : 'hover:bg-slate-800/30'} transition-colors`}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          {entry.rank === 1 && (
                            <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center mr-2">
                              <Medal className="w-4 h-4 text-yellow-400" />
                            </div>
                          )}
                          {entry.rank === 2 && (
                            <div className="w-8 h-8 rounded-full bg-slate-400/20 flex items-center justify-center mr-2">
                              <Medal className="w-4 h-4 text-slate-400" />
                            </div>
                          )}
                          {entry.rank === 3 && (
                            <div className="w-8 h-8 rounded-full bg-amber-700/20 flex items-center justify-center mr-2">
                              <Medal className="w-4 h-4 text-amber-700" />
                            </div>
                          )}
                          {entry.rank && entry.rank > 3 && (
                            <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center mr-2">
                              <span className="text-sm font-medium text-slate-300">{entry.rank}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          {entry.userPhotoURL ? (
                            <img 
                              src={entry.userPhotoURL} 
                              alt={entry.userName} 
                              className="w-8 h-8 rounded-full mr-3"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center mr-3">
                              <User className="w-4 h-4 text-violet-400" />
                            </div>
                          )}
                          <div>
                            <div className={`font-medium ${isCurrentUser ? 'text-white' : 'text-slate-300'}`}>
                              {entry.userName}
                              {isCurrentUser && <span className="ml-2 text-xs bg-violet-500/30 text-violet-300 px-2 py-0.5 rounded-full">You</span>}
                            </div>
                            <div className="text-xs text-slate-500">
                              {new Date(entry.completedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className={`font-bold ${isCurrentUser ? 'text-white' : 'text-slate-300'}`}>
                          {entry.score}
                        </div>
                        <div className="text-xs text-slate-500">
                          out of {currentChallenge.totalPoints}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className={`font-medium ${isCurrentUser ? 'text-white' : 'text-slate-300'}`}>
                          {Math.round((entry.correctAnswers / entry.totalQuestions) * 100)}%
                        </div>
                        <div className="text-xs text-slate-500">
                          {entry.correctAnswers}/{entry.totalQuestions} correct
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-slate-500 mr-2" />
                          <span className={`font-medium ${isCurrentUser ? 'text-white' : 'text-slate-300'}`}>
                            {formatTime(entry.timeSpent)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;