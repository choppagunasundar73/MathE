import React, { useEffect } from 'react';
import { useChallenge } from '../context/ChallengeContext';
import { useAuth } from '../context/AuthContext';
import { Trophy, Medal, Clock, User, RefreshCw } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const { currentChallenge, leaderboard, refreshLeaderboard, isLoading } = useChallenge();
  const { currentUser } = useAuth();

  useEffect(() => {
    // Refresh leaderboard when component mounts
    refreshLeaderboard();
  }, [refreshLeaderboard]);

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
            onClick={refreshLeaderboard}
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
        {leaderboard.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Entries Yet</h3>
            <p className="text-violet-300">Be the first to complete this challenge!</p>
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