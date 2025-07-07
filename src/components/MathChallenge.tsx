import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useChallenge } from '../context/ChallengeContext';
import { MathQuestion, UserChallengeAttempt } from '../types/challenge';
import { submitChallengeAttempt } from '../firebase/challengeService';
import { Brain, Clock, CheckCircle, XCircle, Award, ArrowRight, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

const MathChallenge: React.FC = () => {
  const { currentUser } = useAuth();
  const { currentChallenge, userBestAttempt, refreshLeaderboard, markCurrentChallengeCompleted } = useChallenge();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    timeSpent: number;
  } | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionContainerRef = useRef<HTMLDivElement>(null);

  // Initialize the challenge
  useEffect(() => {
    console.log('MathChallenge mounted. currentChallenge:', currentChallenge);
    if (currentChallenge) {
      console.log('Initializing challenge with ID:', currentChallenge.id);
      // Reset state when challenge changes
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setShowResults(false);
      setShowExplanation(false);
      setResults(null);
      setStartTime(new Date());
      setEndTime(null);
      
      // Set timer if challenge has a time limit
      if (currentChallenge.timeLimit) {
        setTimeRemaining(currentChallenge.timeLimit);
        startTimer();
      }
      
      // Verify that questions are loaded
      if (!currentChallenge.questions || currentChallenge.questions.length === 0) {
        console.error('Challenge has no questions:', currentChallenge);
      } else {
        console.log(`Challenge has ${currentChallenge.questions.length} questions`);
      }
    } else {
      console.warn('MathChallenge mounted but no currentChallenge is available');
    }
    
    return () => {
      // Clean up timer on unmount
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentChallenge]);

  // Start the timer
  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Time's up, submit automatically
          clearInterval(timerRef.current!);
          handleSubmitChallenge();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleSelectAnswer = (questionId: string, answer: string) => {
    if (showResults) return; // Prevent changing answers after submission
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    // Add animation to the question container
    if (questionContainerRef.current) {
      questionContainerRef.current.classList.add('answer-selected');
      setTimeout(() => {
        questionContainerRef.current?.classList.remove('answer-selected');
      }, 500);
    }
  };

  // Navigate to the next question
  const handleNextQuestion = () => {
    if (currentChallenge && currentQuestionIndex < currentChallenge.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
      
      // Add slide animation
      if (questionContainerRef.current) {
        questionContainerRef.current.classList.add('slide-left');
        setTimeout(() => {
          questionContainerRef.current?.classList.remove('slide-left');
        }, 500);
      }
    }
  };

  // Navigate to the previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(false);
      
      // Add slide animation
      if (questionContainerRef.current) {
        questionContainerRef.current.classList.add('slide-right');
        setTimeout(() => {
          questionContainerRef.current?.classList.remove('slide-right');
        }, 500);
      }
    }
  };

  // Submit the challenge results
  const handleSubmitChallenge = async () => {
    if (!currentChallenge || !currentUser) {
      console.error('Cannot submit: Missing challenge or user');
      return;
    }
    
    try {
      console.log(`Submitting results for challenge: ${currentChallenge.id}`);
      
      // Stop the timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      setIsSubmitting(true);
      setEndTime(new Date());
      
      // Calculate results
      let correctCount = 0;
      let totalScore = 0;
      
      currentChallenge.questions.forEach(question => {
        const userAnswer = selectedAnswers[question.id];
        if (userAnswer === question.correctAnswer) {
          correctCount++;
          totalScore += question.points;
        }
      });
      
      // Calculate time spent
      const timeSpent = startTime && endTime 
        ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000)
        : 0;
      
      console.log(`Score: ${totalScore}, Correct answers: ${correctCount}/${currentChallenge.questions.length}`);
      
      // Save results
      const results = {
        score: totalScore,
        correctAnswers: correctCount,
        totalQuestions: currentChallenge.questions.length,
        timeSpent
      };
      
      setResults(results);
      
      // Submit to Firestore
      const attemptData: Omit<UserChallengeAttempt, 'completedAt'> = {
        userId: currentUser.uid,
        userName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Anonymous',
        userPhotoURL: currentUser.photoURL || undefined,
        challengeId: currentChallenge.id,
        ...results
      };
      
      console.log('Preparing to submit user attempt:', attemptData);
      
      try {
        const attemptId = await submitChallengeAttempt(attemptData);
        console.log('Successfully submitted attempt with ID:', attemptId);
        
        // Mark the challenge as completed
        await markCurrentChallengeCompleted(results.score, results.timeSpent);
        
        // No need to manually refresh the leaderboard here
        // The Leaderboard component has its own refresh mechanism
        // and markCurrentChallengeCompleted already triggers refreshCompletedChallenges
        console.log('Challenge completed, leaderboard will refresh automatically');
      } catch (submitError) {
        console.error('Failed to submit challenge attempt:', submitError);
        alert('There was an error saving your results. Please try again.');
      }
      
      // Show results
      setShowResults(true);
    } catch (error) {
      console.error('Error submitting challenge:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Restart the challenge
  const handleRestartChallenge = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setShowExplanation(false);
    setResults(null);
    setStartTime(new Date());
    setEndTime(null);
    
    // Reset timer if challenge has a time limit
    if (currentChallenge?.timeLimit) {
      setTimeRemaining(currentChallenge.timeLimit);
      startTimer();
    }
  };

  // Toggle explanation visibility
  const toggleExplanation = () => {
    setShowExplanation(prev => !prev);
  };

  // Calculate progress percentage
  const calculateProgress = (): number => {
    if (!currentChallenge) return 0;
    return (Object.keys(selectedAnswers).length / currentChallenge.questions.length) * 100;
  };

  if (!currentChallenge) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-slate-900 rounded-xl p-8">
        <div className="text-center">
          <Brain className="w-16 h-16 text-violet-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">No Challenge Available</h3>
          <p className="text-violet-300">Please check back later for new challenges.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = currentChallenge.questions[currentQuestionIndex];
  const userAnswer = selectedAnswers[currentQuestion.id];
  const isCorrect = showResults && userAnswer === currentQuestion.correctAnswer;
  const isAnswered = userAnswer !== undefined;
  const allQuestionsAnswered = currentChallenge.questions.every(q => selectedAnswers[q.id] !== undefined);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-xl overflow-hidden shadow-2xl">
      {/* Challenge Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm p-6 border-b border-violet-500/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentChallenge.title}</h2>
            <p className="text-violet-300">{currentChallenge.description}</p>
          </div>
          
          {currentChallenge.timeLimit && !showResults && (
            <div className="flex items-center bg-slate-700/50 px-4 py-2 rounded-full">
              <Clock className="w-5 h-5 text-violet-400 mr-2" />
              <span className={`text-lg font-mono ${timeRemaining < 30 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-800/30 h-2">
        <div 
          className="h-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-500"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>

      {/* Results View */}
      {showResults && results && (
        <div className="p-8 animate-fadeIn">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-violet-500/30 mb-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-violet-600 to-purple-700 rounded-full flex items-center justify-center mb-6">
                <Award className="w-12 h-12 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-2">
                {results.score === currentChallenge.totalPoints ? 'Perfect Score!' : 'Challenge Complete!'}
              </h3>
              
              <p className="text-violet-300 mb-8">
                You answered {results.correctAnswers} out of {results.totalQuestions} questions correctly.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white mb-1">{results.score}</div>
                  <div className="text-violet-300 text-sm">Points Earned</div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white mb-1">
                    {Math.round((results.correctAnswers / results.totalQuestions) * 100)}%
                  </div>
                  <div className="text-violet-300 text-sm">Accuracy</div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white mb-1">{formatTime(results.timeSpent)}</div>
                  <div className="text-violet-300 text-sm">Time Spent</div>
                </div>
              </div>
              
              {userBestAttempt && userBestAttempt.score > results.score && (
                <div className="mt-6 text-yellow-400">
                  Your best score is still {userBestAttempt.score} points!
                </div>
              )}
              
              {userBestAttempt && userBestAttempt.score < results.score && (
                <div className="mt-6 text-green-400 animate-pulse">
                  New personal best! You improved by {results.score - userBestAttempt.score} points!
                </div>
              )}
              
              <button
                onClick={handleRestartChallenge}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-700 rounded-full text-white font-bold flex items-center hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300 hover:scale-105"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </button>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-4">Review Your Answers</h3>
          
          <div className="space-y-6">
            {currentChallenge.questions.map((question, index) => {
              const userAns = selectedAnswers[question.id];
              const isCorrect = userAns === question.correctAnswer;
              
              return (
                <div key={question.id} className={`bg-slate-800/30 rounded-xl p-6 border ${isCorrect ? 'border-green-500/50' : 'border-red-500/50'}`}>
                  <div className="flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-lg font-medium text-white mb-3">
                          {index + 1}. {question.question}
                        </h4>
                        <div className="text-sm font-medium px-2 py-1 rounded bg-slate-700/50 text-violet-300">
                          {question.difficulty} · {question.points} pts
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {question.options.map(option => (
                          <div 
                            key={option}
                            className={`p-3 rounded-lg border ${option === question.correctAnswer ? 'bg-green-500/10 border-green-500/50 text-green-400' : option === userAns ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'border-slate-700/50 text-slate-400'}`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                      
                      {question.explanation && (
                        <div className="mt-3 text-violet-300 bg-slate-700/30 p-3 rounded-lg">
                          <strong>Explanation:</strong> {question.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Question View */}
      {!showResults && (
        <div className="p-8">
          <div 
            ref={questionContainerRef}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-violet-500/30 transition-all duration-500"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full text-sm font-medium">
                Question {currentQuestionIndex + 1} of {currentChallenge.questions.length}
              </div>
              
              <div className="text-sm font-medium px-3 py-1 rounded-full bg-slate-700/50 text-violet-300">
                {currentQuestion.difficulty} · {currentQuestion.points} pts
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-6">{currentQuestion.question}</h3>
            
            <div className="space-y-4 mb-8">
              {currentQuestion.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleSelectAnswer(currentQuestion.id, option)}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-300 hover:shadow-lg ${option === userAnswer ? 'bg-violet-500/20 border-violet-500 text-white' : 'bg-slate-700/30 border-slate-700/50 text-slate-300 hover:border-violet-400/50'}`}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {showExplanation && currentQuestion.explanation && (
              <div className="mb-8 p-4 bg-slate-700/30 border border-violet-500/30 rounded-xl text-violet-300 animate-fadeIn">
                <strong>Explanation:</strong> {currentQuestion.explanation}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex space-x-3">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`px-4 py-2 rounded-lg flex items-center ${currentQuestionIndex === 0 ? 'bg-slate-700/30 text-slate-500 cursor-not-allowed' : 'bg-slate-700/50 text-white hover:bg-slate-700'}`}
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Previous
                </button>
                
                <button
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === currentChallenge.questions.length - 1}
                  className={`px-4 py-2 rounded-lg flex items-center ${currentQuestionIndex === currentChallenge.questions.length - 1 ? 'bg-slate-700/30 text-slate-500 cursor-not-allowed' : 'bg-slate-700/50 text-white hover:bg-slate-700'}`}
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button>
                
                {currentQuestion.explanation && (
                  <button
                    onClick={toggleExplanation}
                    className="px-4 py-2 bg-slate-700/50 text-white rounded-lg hover:bg-slate-700"
                  >
                    {showExplanation ? 'Hide Hint' : 'Show Hint'}
                  </button>
                )}
              </div>
              
              <button
                onClick={handleSubmitChallenge}
                disabled={!allQuestionsAnswered || isSubmitting}
                className={`px-6 py-3 rounded-full font-bold flex items-center ${allQuestionsAnswered ? 'bg-gradient-to-r from-violet-600 to-purple-700 text-white hover:shadow-lg hover:shadow-violet-500/30 hover:scale-105' : 'bg-slate-700/50 text-slate-400 cursor-not-allowed'} transition-all duration-300`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Challenge
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathChallenge;