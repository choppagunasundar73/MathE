import React, { useState, useEffect } from 'react';
import { Clock, HelpCircle, CheckCircle, XCircle } from 'lucide-react';
import { MathProblem } from '../types';

interface DiagnosticScreenProps {
  problem: MathProblem;
  problemIndex: number;
  totalProblems: number;
  onAnswer: (answer: string, timeSpent: number) => void;
  showExplanation: boolean;
  lastAnswerCorrect: boolean;
  isAnswered: boolean;
}

const DiagnosticScreen: React.FC<DiagnosticScreenProps> = ({
  problem,
  problemIndex,
  totalProblems,
  onAnswer,
  showExplanation,
  lastAnswerCorrect,
  isAnswered
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

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
  }, [problem]);

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer, timeSpent);
    }
  };

  const getNextHint = () => {
    if (currentHint < problem.hints.length - 1) {
      setCurrentHint(prev => prev + 1);
    }
  };

  const progressPercentage = ((problemIndex + 1) / totalProblems) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Warm-Up Challenge 🎯
            </h1>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Question {problemIndex + 1} of {totalProblems}</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Problem Content */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="mb-6">
            <div className="inline-block bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              {problem.topic}
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
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              Need a hint?
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
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
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
                  {lastAnswerCorrect ? 'Great job! 🎉' : 'Not quite, but great try! 💪'}
                </h3>
              </div>
              <p className="text-gray-700 mb-4">{problem.explanation}</p>
              <p className="text-sm text-gray-600">
                {lastAnswerCorrect 
                  ? "You're getting the hang of this! Let's keep going."
                  : "Don't worry - mistakes help us learn! Let's try the next one."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiagnosticScreen;