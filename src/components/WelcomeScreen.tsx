import React from 'react';
import { BookOpen, Target, Zap, Users } from 'lucide-react';

interface WelcomeScreenProps {
  onStartDiagnostic: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartDiagnostic }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-full mb-6 shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Hey there! I'm <span className="text-indigo-600">Math-E</span> 👋
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your personal math tutor ready to help you master 8th-grade math! 
            I'll adapt to your learning style and make math fun and engaging.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Personalized Learning</h3>
            <p className="text-gray-600 text-sm">I adapt to your skill level and learning pace</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Real-time Feedback</h3>
            <p className="text-gray-600 text-sm">Get instant help and explanations</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Progress Tracking</h3>
            <p className="text-gray-600 text-sm">Watch your skills grow over time</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Fun & Engaging</h3>
            <p className="text-gray-600 text-sm">Math doesn't have to be boring!</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Ready to start your math journey? 🚀
          </h2>
          <p className="text-gray-600 text-center mb-6">
            I'll start with a quick warm-up to understand your current skills. 
            Don't worry - this isn't a test, it's just so I can help you better!
          </p>
          <div className="text-center">
            <button
              onClick={onStartDiagnostic}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
            >
              Let's Get Started! 🎯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;