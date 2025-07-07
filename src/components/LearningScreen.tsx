import React, { useState, useEffect } from 'react';
import { Clock, HelpCircle, CheckCircle, XCircle, Star } from 'lucide-react';
import { MathProblem } from '../types';

interface LearningScreenProps {
  problem: MathProblem;
  onAnswer: (answer: string, timeSpent: number, hintsUsed: number) => void;
  showExplanation: boolean;
  lastAnswerCorrect: boolean;
  isAnswered: boolean;
  onNextProblem: () => void;
  onViewProgress: () => void;
}

const LearningScreen: React.FC<LearningScreenProps> = ({
  problem,
  onAnswer,
  showExplanation,
  lastAnswerCorrect,
  isAnswered,
  onNextProblem,
  onViewProgress
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setSelectedAnswer('');
    setShowHints(false);
    setCurrentHint(0);
    setTimeSpent(0);
    setHintsUsed(0);
    setShowCelebration(false);
  }, [problem]);

  useEffect(() => {
    if (lastAnswerCorrect && showExplanation) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }
  }, [lastAnswerCorrect, showExplanation]);

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer, timeSpent, hintsUsed);
    }
  };

  const getNextHint = () => {
    if (currentHint < problem.hints.length - 1) {
      setCurrentHint(prev => prev + 1);
      setHintsUsed(prev => prev + 1);
    }
  };

  const toggleHints = () => {
    setShowHints(!showHints);
    if (!showHints && hintsUsed === 0) {
      setHintsUsed(1);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyEmoji = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🌟';
      case 'medium': return '⚡';
      case 'hard': return '🔥';
      default: return '🎯';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              Let's Learn Together! 🎓
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
              </div>
              <button
                onClick={onViewProgress}
                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg transition-colors"
              >
                View Progress
              </button>
            </div>
          </div>
        </div>

        {/* Problem Content */}
        <div className="bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          {/* Celebration Animation */}
          {showCelebration && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-white bg-opacity-90">
              <div className="text-center animate-bounce">
                <div className="text-6xl mb-4">🎉</div>
                <div className="text-2xl font-bold text-green-600">Excellent!</div>
                <div className="text-gray-600">You're getting better!</div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-block bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">
                {problem.topic}
              </div>
              <div className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                {getDifficultyEmoji(problem.difficulty)} {problem.difficulty}
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {problem.question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {problem.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(option)}
                disabled={isAnswered}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                  selectedAnswer === option
                    ? 'border-indigo-500 bg-indigo-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                } ${isAnswered ? 'opacity-60' : ''}`}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center text-sm font-semibold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </div>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-between">
            <button
              onClick={toggleHints}
              className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              Need a hint? {hintsUsed > 0 && `(${hintsUsed} used)`}
            </button>

            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer || isAnswered}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                selectedAnswer && !isAnswered
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAnswered ? 'Submitted' : 'Submit Answer'}
            </button>
          </div>

          {/* Hints Section */}
          {showHints && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Hint {currentHint + 1}:</h3>
              <p className="text-blue-700 mb-3">{problem.hints[currentHint]}</p>
              {currentHint < problem.hints.length - 1 && (
                <button
                  onClick={getNextHint}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Need another hint? →
                </button>
              )}
            </div>
          )}

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-6 p-6 rounded-xl border-2 border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2 mb-3">
                {lastAnswerCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
                <h3 className="font-semibold text-gray-800">
                  {lastAnswerCorrect ? 'Fantastic work! 🌟' : 'Close one! Let\'s learn together 📚'}
                </h3>
              </div>
              <p className="text-gray-700 mb-4">{problem.explanation}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {lastAnswerCorrect 
                    ? "You're mastering this topic! Keep up the great work."
                    : "Every mistake is a step toward understanding. You've got this!"}
                </p>
                <button
                  onClick={onNextProblem}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Next Problem →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningScreen;