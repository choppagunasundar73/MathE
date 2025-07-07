import React, { useState, useEffect, useRef } from 'react';
import { Brain, Sparkles, ArrowRight, LogIn } from 'lucide-react';
import { signInWithGoogle } from '../firebase/auth';

interface WorkshopEntranceProps {
  onEnterWorkshop: (userName: string) => void;
}

const WorkshopEntrance: React.FC<WorkshopEntranceProps> = ({ onEnterWorkshop }) => {
  const [userName, setUserName] = useState('');
  const [isBlurred, setIsBlurred] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
  const [showWorkshop, setShowWorkshop] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const fullGreeting = "Hey there! I'm Math-E. Before we start exploring, what should I call you?";

  useEffect(() => {
    // Initial page load sequence
    setTimeout(() => {
      setShowInput(true);
      typeGreeting();
    }, 1000);

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  const typeGreeting = () => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullGreeting.length) {
        setTypingText(fullGreeting.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 500);
      }
    }, 50);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsTransforming(true);
      
      // Start the magical transformation
      setTimeout(() => {
        setIsBlurred(false);
        setShowWorkshop(true);
      }, 800);

      setTimeout(() => {
        onEnterWorkshop(userName.trim());
      }, 2000);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setIsTransforming(true);
    
    try {
      const { user, error } = await signInWithGoogle();
      
      if (user) {
        // Start the magical transformation
        setTimeout(() => {
          setIsBlurred(false);
          setShowWorkshop(true);
        }, 800);

        setTimeout(() => {
          // Use display name from Google or fallback to email
          const displayName = user.displayName || user.email?.split('@')[0] || 'User';
          onEnterWorkshop(displayName);
        }, 2000);
      } else {
        console.error('Google sign-in error:', error);
        setIsTransforming(false);
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setIsTransforming(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Workshop Background - Initially Blurred */}
      <div className={`absolute inset-0 transition-all duration-2000 ${isBlurred ? 'blur-xl scale-110' : 'blur-0 scale-100'}`}>
        {/* Holographic Workshop Elements */}
        <div className="absolute inset-0">
          {/* Floating Geometric Shapes */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-violet-400/30 to-purple-600/30 rounded-full blur-sm animate-float"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-blue-400/30 to-cyan-600/30 rotate-45 blur-sm animate-float-delayed"></div>
          <div className="absolute bottom-32 left-40 w-28 h-28 bg-gradient-to-br from-pink-400/30 to-rose-600/30 rounded-full blur-sm animate-float-slow"></div>
          
          {/* Holographic Math Equations */}
          <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-violet-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-4 border border-violet-400/30 shadow-lg shadow-violet-500/20">
              <div className="text-2xl font-bold text-violet-300 font-mono">∫ f(x)dx = F(x) + C</div>
            </div>
          </div>
          
          <div className="absolute top-1/2 right-1/4 transform translate-x-1/2">
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-4 border border-blue-400/30 shadow-lg shadow-blue-500/20">
              <div className="text-2xl font-bold text-blue-300 font-mono">e^(iπ) + 1 = 0</div>
            </div>
          </div>
          
          <div className="absolute bottom-1/3 left-1/4">
            <div className="bg-gradient-to-r from-emerald-500/20 to-teal-600/20 backdrop-blur-sm rounded-2xl p-4 border border-emerald-400/30 shadow-lg shadow-emerald-500/20">
              <div className="text-2xl font-bold text-emerald-300 font-mono">lim(x→∞) = ∞</div>
            </div>
          </div>

          {/* Glowing Orbs */}
          <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"></div>
          <div className="absolute bottom-1/2 right-1/3 w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-500 shadow-lg shadow-pink-400/50"></div>
          <div className="absolute top-2/3 left-1/4 w-5 h-5 bg-cyan-400 rounded-full animate-pulse delay-1000 shadow-lg shadow-cyan-400/50"></div>
        </div>

        {/* Workshop Tools Silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-800/50 to-transparent">
          <div className="absolute bottom-10 left-20 w-16 h-20 bg-gradient-to-t from-gray-600/30 to-gray-400/30 rounded-t-lg"></div>
          <div className="absolute bottom-10 left-40 w-12 h-16 bg-gradient-to-t from-gray-600/30 to-gray-400/30 rounded-t-lg"></div>
          <div className="absolute bottom-10 right-32 w-20 h-24 bg-gradient-to-t from-gray-600/30 to-gray-400/30 rounded-t-lg"></div>
        </div>
      </div>

      {/* Overlay for blur effect */}
      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-2000 ${isBlurred ? 'opacity-100' : 'opacity-0'}`}></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          {/* Math-E Logo */}
          <div className={`mb-12 transition-all duration-1000 ${showInput ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-violet-500/30">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-3xl animate-pulse opacity-30"></div>
              </div>
              <div className="text-6xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Math-E
              </div>
            </div>
            <div className="text-lg text-violet-300 font-medium">
              Powered by Advanced LLM Technology
            </div>
          </div>

          {/* Greeting Text with Typing Animation */}
          <div className={`mb-12 transition-all duration-1000 ${showInput ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-2xl md:text-3xl text-white font-medium leading-relaxed">
              {typingText}
              <span className={`inline-block w-0.5 h-8 bg-violet-400 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}></span>
            </div>
          </div>

          {/* Input Form */}
          {showInput && (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className={`transition-all duration-1000 delay-500 ${showInput ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <input
                  ref={inputRef}
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full max-w-md mx-auto px-8 py-6 text-2xl text-center bg-white/10 backdrop-blur-xl border-2 border-violet-400/30 rounded-2xl text-white placeholder-violet-300/70 focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-400/20 transition-all duration-300 shadow-2xl shadow-violet-500/20"
                  disabled={isTransforming}
                />
              </div>

              <div className="flex flex-col space-y-4">
                <div className={`transition-all duration-1000 delay-700 ${showInput ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <button
                    type="submit"
                    disabled={!userName.trim() || isTransforming}
                    className={`group px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 w-full ${
                      userName.trim() && !isTransforming
                        ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 text-white hover:shadow-2xl hover:shadow-violet-500/30 hover:scale-105 cursor-pointer'
                        : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isTransforming ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Opening Workshop...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3">
                        <span>Enter My Workshop</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </button>
                </div>
                
                <div className="text-center text-violet-300 my-2">- OR -</div>
                
                <div className={`transition-all duration-1000 delay-800 ${showInput ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isTransforming}
                    className="group px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 w-full bg-white text-gray-800 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 cursor-pointer flex items-center justify-center space-x-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                    </svg>
                    <span>Sign in with Google</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Transformation Message */}
          {isTransforming && (
            <div className="mt-8 text-violet-300 text-lg animate-pulse">
              Welcome, {userName}! Preparing your personalized learning environment...
            </div>
          )}
        </div>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-violet-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default WorkshopEntrance;