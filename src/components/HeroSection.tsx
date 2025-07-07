import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Zap, Target, TrendingUp, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50 to-purple-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 md:w-[500px] md:h-[500px] bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-80 md:h-80 bg-gradient-to-br from-pink-400/20 to-rose-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Math Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 animate-float">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-lg border border-white/20 transform hover:scale-110 transition-all duration-300">
            <div className="text-lg md:text-2xl font-bold text-violet-600">x² + 5x = 24</div>
          </div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-delayed">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-lg border border-white/20 transform hover:scale-110 transition-all duration-300">
            <div className="text-lg md:text-2xl font-bold text-purple-600">π ≈ 3.14159</div>
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/6 animate-float-slow">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-lg border border-white/20 transform hover:scale-110 transition-all duration-300">
            <div className="text-lg md:text-2xl font-bold text-blue-600">√144 = 12</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className={`inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3 mb-6 md:mb-8 shadow-lg border border-white/20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Zap className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
            <span className="text-xs md:text-sm font-semibold text-gray-700">AI-Powered Adaptive Learning</span>
          </div>

          {/* Main Headline */}
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
              Master Math
            </span>
            <br />
            <span className="text-gray-800">
              Like Never Before
            </span>
          </h1>

          {/* Subheadline */}
          <p className={`text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Meet Math-E, your AI tutor that adapts to your learning style, identifies knowledge gaps, 
            and creates personalized pathways to mathematical mastery.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 md:mb-16 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <button className="group bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl font-semibold text-base md:text-lg hover:shadow-2xl hover:shadow-violet-500/25 hover:scale-105 transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto">
              <span>Start Your Journey</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-3 md:px-8 md:py-4 rounded-2xl font-semibold text-base md:text-lg hover:shadow-lg hover:bg-white transition-all duration-300 flex items-center space-x-2 border border-white/20 w-full sm:w-auto">
              <Play className="w-4 h-4 md:w-5 md:h-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <Target className="w-6 h-6 md:w-8 md:h-8 text-violet-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">98%</div>
              <div className="text-sm md:text-base text-gray-600">Accuracy Rate</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">3x</div>
              <div className="text-sm md:text-base text-gray-600">Faster Learning</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300 md:col-span-1 col-span-1">
              <div className="flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">50K+</div>
              <div className="text-sm md:text-base text-gray-600">Students Helped</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;