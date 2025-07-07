import React, { useState, useEffect } from 'react';
import { Menu, X, Brain, Sparkles, LogOut, User } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface HeaderProps {
  currentUser: FirebaseUser | null;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-all duration-300">
                <Brain className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
              Math-E
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-violet-600 font-medium transition-all duration-300 hover:scale-105">
              Features
            </a>
            <a href="#demo" className="text-gray-700 hover:text-violet-600 font-medium transition-all duration-300 hover:scale-105">
              Demo
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-violet-600 font-medium transition-all duration-300 hover:scale-105">
              Pricing
            </a>
            <a href="#about" className="text-gray-700 hover:text-violet-600 font-medium transition-all duration-300 hover:scale-105">
              About
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full border-2 border-violet-400"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-violet-600" />
                    </div>
                  )}
                  <span className="text-gray-700 font-medium">
                    {currentUser.displayName || currentUser.email?.split('@')[0] || 'User'}
                  </span>
                </div>
                <button 
                  onClick={onSignOut}
                  className="flex items-center space-x-1 text-gray-700 hover:text-violet-600 font-medium transition-all duration-300 hover:scale-105"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                <button className="text-gray-700 hover:text-violet-600 font-medium transition-all duration-300 hover:scale-105">
                  Sign In
                </button>
                <button className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105 transition-all duration-300">
                  Start Learning
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100/80 backdrop-blur-sm transition-all duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-2xl animate-slide-down">
            <div className="px-4 py-6 space-y-4">
              <a href="#features" className="block text-gray-700 hover:text-violet-600 font-medium py-2 transition-all duration-300">
                Features
              </a>
              <a href="#demo" className="block text-gray-700 hover:text-violet-600 font-medium py-2 transition-all duration-300">
                Demo
              </a>
              <a href="#pricing" className="block text-gray-700 hover:text-violet-600 font-medium py-2 transition-all duration-300">
                Pricing
              </a>
              <a href="#about" className="block text-gray-700 hover:text-violet-600 font-medium py-2 transition-all duration-300">
                About
              </a>
              <div className="pt-4 space-y-3">
                {currentUser ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      {currentUser.photoURL ? (
                        <img 
                          src={currentUser.photoURL} 
                          alt="Profile" 
                          className="w-8 h-8 rounded-full border-2 border-violet-400"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                          <User className="w-4 h-4 text-violet-600" />
                        </div>
                      )}
                      <span className="text-gray-700 font-medium">
                        {currentUser.displayName || currentUser.email?.split('@')[0] || 'User'}
                      </span>
                    </div>
                    <button 
                      onClick={onSignOut}
                      className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-4 rounded-2xl font-semibold transition-all duration-300"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <button className="w-full text-left text-gray-700 hover:text-violet-600 font-medium py-2 transition-all duration-300">
                      Sign In
                    </button>
                    <button className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg shadow-violet-500/25">
                      Start Learning
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;