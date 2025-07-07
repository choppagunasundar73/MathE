import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useChallenge } from '../context/ChallengeContext';
import MathChallenge from './MathChallenge';
import Leaderboard from './Leaderboard';
import { Brain, Trophy, ArrowRight, Sparkles, ChevronDown, RefreshCw } from 'lucide-react';

const ChallengeHub: React.FC = () => {
  const { currentUser } = useAuth();
  const { currentChallenge, availableChallenges, isLoading, loadChallenge, loadAllChallenges } = useChallenge();
  const [showChallenge, setShowChallenge] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [showChallengeSelector, setShowChallengeSelector] = useState(false);

  useEffect(() => {
    // Add entrance animation
    setTimeout(() => {
      setAnimateIn(true);
    }, 100);
    
    // Load all challenges
    loadAllChallenges();
  }, []);

  const handleStartChallenge = () => {
    setShowChallenge(true);
  };
  
  const handleSelectChallenge = (challengeId: string) => {
    loadChallenge(challengeId);
    setShowChallengeSelector(false);
    setShowChallenge(false);
  };
  
  const handleRefreshChallenges = () => {
    loadAllChallenges();
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mb-4"></div>
          <p className="text-violet-300">Loading challenge...</p>
        </div>
      </div>
    );
  }

  if (!currentChallenge) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-violet-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">No Challenge Available</h3>
          <p className="text-violet-300">Please check back later for new challenges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col space-y-8">
          {/* Challenge Hub Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Challenge Hub
              </h2>
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
            
            {/* Challenge Selector */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <button 
                  onClick={() => setShowChallengeSelector(!showChallengeSelector)}
                  className="px-4 py-2 bg-violet-800/50 hover:bg-violet-700/50 rounded-lg text-white flex items-center space-x-2 border border-violet-600/30"
                >
                  <span>Select Challenge</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showChallengeSelector ? 'rotate-180' : ''}`} />
                </button>
                
                {showChallengeSelector && (
                  <div className="absolute z-50 mt-2 w-64 bg-slate-900 border border-violet-600/30 rounded-lg shadow-xl shadow-violet-900/30 overflow-hidden">
                    <div className="p-2 border-b border-violet-600/30 flex justify-between items-center">
                      <span className="text-sm text-violet-300">Available Challenges</span>
                      <button 
                        onClick={handleRefreshChallenges}
                        className="p-1 hover:bg-violet-800/50 rounded-full"
                        title="Refresh challenges"
                      >
                        <RefreshCw className="w-4 h-4 text-violet-400" />
                      </button>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {availableChallenges.map(challenge => (
                        <button
                          key={challenge.id}
                          onClick={() => handleSelectChallenge(challenge.id)}
                          className={`w-full text-left p-3 hover:bg-violet-800/30 transition-colors ${currentChallenge?.id === challenge.id ? 'bg-violet-800/50' : ''}`}
                        >
                          <div className="font-medium text-white">{challenge.title}</div>
                          <div className="text-xs text-violet-400 mt-1 flex justify-between">
                            <span>{challenge.questions.length} questions</span>
                            <span>{challenge.totalPoints} points</span>
                          </div>
                        </button>
                      ))}
                      
                      {availableChallenges.length === 0 && (
                        <div className="p-3 text-sm text-violet-400 text-center">
                          No challenges available
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-lg text-violet-300 max-w-3xl mx-auto">
              Test your math skills with interactive challenges and compete with other learners on the leaderboard.
            </p>
          </div>

          {!showChallenge ? (
            <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-xl overflow-hidden shadow-2xl">
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-block bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full text-sm font-medium mb-4">
                      Featured Challenge
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">{currentChallenge.title}</h3>
                    <p className="text-violet-300 mb-6">{currentChallenge.description}</p>
                    
                    <div className="flex flex-wrap gap-4 mb-8">
                      <div className="bg-slate-800/50 px-4 py-2 rounded-lg">
                        <div className="text-sm text-slate-400">Questions</div>
                        <div className="text-xl font-bold text-white">{currentChallenge.questions.length}</div>
                      </div>
                      
                      <div className="bg-slate-800/50 px-4 py-2 rounded-lg">
                        <div className="text-sm text-slate-400">Total Points</div>
                        <div className="text-xl font-bold text-white">{currentChallenge.totalPoints}</div>
                      </div>
                      
                      {currentChallenge.timeLimit && (
                        <div className="bg-slate-800/50 px-4 py-2 rounded-lg">
                          <div className="text-sm text-slate-400">Time Limit</div>
                          <div className="text-xl font-bold text-white">
                            {Math.floor(currentChallenge.timeLimit / 60)}:{(currentChallenge.timeLimit % 60).toString().padStart(2, '0')}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={handleStartChallenge}
                      className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-700 rounded-full text-white font-bold flex items-center hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300 hover:scale-105 group"
                    >
                      Start Challenge
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  
                  <div className="relative">
                    <div className="aspect-square rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 backdrop-blur-sm border border-violet-400/30 p-8 flex items-center justify-center relative overflow-hidden">
                      {/* Floating Math Symbols */}
                      <div className="absolute inset-0">
                        {['∫', '∑', 'π', '√', '∞', '∂', 'θ', 'Δ', '∇', 'λ'].map((symbol, index) => (
                          <div
                            key={index}
                            className="absolute text-2xl md:text-3xl text-violet-400/40 animate-float-random"
                            style={{
                              left: `${Math.random() * 80 + 10}%`,
                              top: `${Math.random() * 80 + 10}%`,
                              animationDelay: `${Math.random() * 5}s`,
                              animationDuration: `${8 + Math.random() * 7}s`
                            }}
                          >
                            {symbol}
                          </div>
                        ))}
                      </div>
                      
                      <div className="relative z-10 text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-violet-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                          <Brain className="w-12 h-12 text-white" />
                          <div className="absolute -top-2 -right-2">
                            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-2">Test Your Knowledge</h3>
                        <p className="text-violet-300">
                          Challenge yourself with 10 math problems ranging from algebra to calculus.
                        </p>
                      </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-violet-600/20 to-purple-700/20 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-indigo-600/20 to-violet-700/20 rounded-full blur-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <MathChallenge />
              </div>
              <div>
                <Leaderboard />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeHub;