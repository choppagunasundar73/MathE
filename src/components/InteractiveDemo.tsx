import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, XCircle, Lightbulb, ArrowRight } from 'lucide-react';

const InteractiveDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('demo');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const demoSteps = [
    {
      title: "AI Assessment in Action",
      problem: "Solve: 2x + 5 = 13",
      options: ["x = 4", "x = 6", "x = 8", "x = 9"],
      correct: "x = 4",
      explanation: "Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4"
    },
    {
      title: "Adaptive Difficulty",
      problem: "If f(x) = 3x² - 2x + 1, what is f(2)?",
      options: ["9", "11", "13", "15"],
      correct: "9",
      explanation: "f(2) = 3(2)² - 2(2) + 1 = 3(4) - 4 + 1 = 12 - 4 + 1 = 9"
    }
  ];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const currentDemo = demoSteps[currentStep];
  const isCorrect = selectedAnswer === currentDemo.correct;

  return (
    <section id="demo" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-24 h-24 md:w-32 md:h-32 bg-violet-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 md:w-40 md:h-40 bg-purple-200/30 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Side - Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 md:px-6 md:py-3 mb-4 md:mb-6 shadow-lg">
              <Play className="w-4 h-4 md:w-5 md:h-5 text-violet-600" />
              <span className="text-xs md:text-sm font-semibold text-gray-700">Interactive Demo</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              See Math-E
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> In Action</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
              Experience how our AI adapts to your responses, provides instant feedback, 
              and guides you through personalized learning paths.
            </p>

            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
                </div>
                <span className="text-sm md:text-base text-gray-700">Real-time difficulty adjustment</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
                </div>
                <span className="text-sm md:text-base text-gray-700">Instant explanations and hints</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
                </div>
                <span className="text-sm md:text-base text-gray-700">Progress tracking and analytics</span>
              </div>
            </div>

            <button className="bg-gradient-to-r from-violet-600 to-purple-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl font-semibold hover:shadow-xl hover:shadow-violet-500/25 hover:scale-105 transition-all duration-300 text-sm md:text-base">
              Try Full Demo
            </button>
          </div>

          {/* Right Side - Interactive Demo */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-200">
              {/* Demo Header */}
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-semibold text-gray-800">{currentDemo.title}</h3>
                <div className="flex space-x-2">
                  {demoSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                        index === currentStep ? 'bg-violet-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Problem */}
              <div className="bg-gray-50 rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
                <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">{currentDemo.problem}</h4>
                
                {/* Answer Options */}
                <div className="space-y-2 md:space-y-3">
                  {currentDemo.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      disabled={showExplanation}
                      className={`w-full p-3 md:p-4 text-left rounded-xl border-2 transition-all duration-200 text-sm md:text-base ${
                        selectedAnswer === option
                          ? isCorrect
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50'
                      } ${showExplanation ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-center">
                        <span className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 mr-2 md:mr-3 flex items-center justify-center text-xs md:text-sm font-semibold">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                        {selectedAnswer === option && showExplanation && (
                          <div className="ml-auto">
                            {isCorrect ? (
                              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                            ) : (
                              <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div className={`p-4 md:p-6 rounded-2xl border-2 ${
                  isCorrect ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2 md:mb-3">
                    <Lightbulb className={`w-4 h-4 md:w-5 md:h-5 ${isCorrect ? 'text-green-600' : 'text-orange-600'}`} />
                    <h4 className={`font-semibold text-sm md:text-base ${isCorrect ? 'text-green-800' : 'text-orange-800'}`}>
                      {isCorrect ? 'Excellent!' : 'Let me explain'}
                    </h4>
                  </div>
                  <p className={`text-sm md:text-base mb-3 md:mb-4 ${isCorrect ? 'text-green-700' : 'text-orange-700'}`}>
                    {currentDemo.explanation}
                  </p>
                  
                  {currentStep < demoSteps.length - 1 ? (
                    <button
                      onClick={nextStep}
                      className="flex items-center space-x-2 bg-violet-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium hover:bg-violet-700 transition-colors text-sm md:text-base"
                    >
                      <span>Next Problem</span>
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={resetDemo}
                      className="bg-violet-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium hover:bg-violet-700 transition-colors text-sm md:text-base"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-6 h-6 md:w-8 md:h-8 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-4 h-4 md:w-6 md:h-6 bg-pink-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;