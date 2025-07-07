import React, { useState, useEffect } from 'react';
import { Send, HelpCircle, CheckCircle, XCircle, Brain } from 'lucide-react';

interface FirstPuzzleProps {
  userName: string;
}

const FirstPuzzle: React.FC<FirstPuzzleProps> = ({ userName }) => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{type: 'ai' | 'user', message: string, timestamp: number}>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [showHintDial, setShowHintDial] = useState(false);
  const [problemSolved, setProblemSolved] = useState(false);

  const problem = "3x + 10 - x = 20";
  const correctAnswer = "x = 5";

  useEffect(() => {
    // Initial greeting
    setTimeout(() => {
      addAIMessage(`Ready to see how I work, ${userName}? Let's solve one together. No wrong answers, only exploration.`);
    }, 1000);

    setTimeout(() => {
      addAIMessage(`Here's our puzzle: ${problem}`);
    }, 2500);

    setTimeout(() => {
      addAIMessage("Take your time and show me your thinking. I'm here to guide you every step of the way! 🤔");
    }, 4000);
  }, [userName]);

  const addAIMessage = (message: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        type: 'ai',
        message,
        timestamp: Date.now()
      }]);
      setIsTyping(false);
    }, 1000 + message.length * 30); // Realistic typing speed
  };

  const addUserMessage = (message: string) => {
    setChatHistory(prev => [...prev, {
      type: 'user',
      message,
      timestamp: Date.now()
    }]);
  };

  const analyzeAnswer = (answer: string) => {
    const cleanAnswer = answer.toLowerCase().replace(/\s/g, '');
    
    if (cleanAnswer.includes('3x+10=20') || cleanAnswer.includes('3x=10')) {
      return {
        type: 'mistake',
        response: "Great first step to simplify! I see you focused on the 3x. But there's another 'x' term on the loose on that side of the equation. Do you see it? 👀"
      };
    } else if (cleanAnswer.includes('2x+10=20') || cleanAnswer.includes('2x=10')) {
      return {
        type: 'progress',
        response: "Excellent! You combined the x terms correctly: 3x - x = 2x. Now you have 2x + 10 = 20. What's your next move? 🎯"
      };
    } else if (cleanAnswer.includes('x=5') || cleanAnswer === '5') {
      return {
        type: 'correct',
        response: `🎉 Outstanding work, ${userName}! You solved it perfectly: x = 5. You showed great mathematical thinking by combining like terms first, then isolating x. This is exactly how I help students learn - by understanding your process, not just checking answers!`
      };
    } else {
      return {
        type: 'guidance',
        response: "I can see you're thinking about this! Let me help guide your approach. When we have terms with the same variable, we can combine them. What do you get when you combine 3x and -x? 🤝"
      };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    addUserMessage(userInput);
    const analysis = analyzeAnswer(userInput);
    
    setTimeout(() => {
      addAIMessage(analysis.response);
      if (analysis.type === 'correct') {
        setProblemSolved(true);
      }
    }, 1500);

    setUserInput('');
  };

  const getHint = () => {
    const hints = [
      "Look for all the terms with an 'x' in them. How many do you see? 🔍",
      "What is 3x minus x? Think of it like having 3 apples and giving away 1 apple. 🍎",
      "Once you combine the x terms, you'll have 2x + 10 = 20. Now subtract 10 from both sides! ➖"
    ];

    if (hintLevel < hints.length) {
      addAIMessage(`💡 Hint ${hintLevel + 1}: ${hints[hintLevel]}`);
      setHintLevel(prev => prev + 1);
    } else {
      addAIMessage("You've got this! Try working through it step by step. I believe in you! 💪");
    }
  };

  const rotateHintDial = (degrees: number) => {
    if (degrees > 45 && degrees <= 135) {
      getHint();
    } else if (degrees > 135) {
      addAIMessage("Here's the complete solution: First combine like terms (3x - x = 2x), then solve 2x + 10 = 20 by subtracting 10 from both sides to get 2x = 10, finally divide by 2 to get x = 5! 📚");
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Workshop Ambiance */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-indigo-400/30">
            <Brain className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-300">The First Puzzle</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let's Solve This
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"> Together</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            This isn't just a demo—it's your first real interaction with my AI intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Math-E</h3>
                    <p className="text-indigo-200">Your AI Math Tutor</p>
                  </div>
                  <div className="ml-auto flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-white">Online</span>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white/20 text-white border border-white/20'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.message}</p>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/20 text-white border border-white/20 px-4 py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-white/20">
                <form onSubmit={handleSubmit} className="flex space-x-4">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your answer or working..."
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    disabled={problemSolved}
                  />
                  <button
                    type="submit"
                    disabled={!userInput.trim() || problemSolved}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Hint Dial */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Hint Dial</h3>
              
              {/* Brass Dial */}
              <div className="relative w-48 h-48 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full shadow-2xl border-4 border-yellow-500/30">
                  {/* Dial Face */}
                  <div className="absolute inset-4 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full flex items-center justify-center">
                    <HelpCircle className="w-16 h-16 text-yellow-100" />
                  </div>
                  
                  {/* Dial Markers */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-6 bg-yellow-300 rounded-full"
                      style={{
                        top: '10px',
                        left: '50%',
                        transformOrigin: '50% 86px',
                        transform: `translateX(-50%) rotate(${i * 45}deg)`
                      }}
                    ></div>
                  ))}
                  
                  {/* Dial Pointer */}
                  <div 
                    className="absolute w-2 h-20 bg-red-500 rounded-full cursor-pointer transition-transform duration-300"
                    style={{
                      top: '20px',
                      left: '50%',
                      transformOrigin: '50% 76px',
                      transform: `translateX(-50%) rotate(${hintLevel * 45}deg)`
                    }}
                    onClick={() => rotateHintDial((hintLevel + 1) * 45)}
                  ></div>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-sm text-gray-300 mb-4">
                  Turn the dial for hints:
                </p>
                <div className="space-y-2 text-xs text-gray-400">
                  <div>Small turn: Gentle nudge</div>
                  <div>Big turn: Direct hint</div>
                  <div>Full turn: Complete solution</div>
                </div>
                
                <button
                  onClick={getHint}
                  className="mt-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-all duration-300"
                >
                  Get Hint ({hintLevel}/3)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Success Celebration */}
        {problemSolved && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-3 bg-green-500/20 backdrop-blur-sm rounded-full px-8 py-4 border border-green-400/30">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <span className="text-xl font-bold text-green-300">
                Congratulations, {userName}! You've experienced the Math-E difference! 🎉
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FirstPuzzle;