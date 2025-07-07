import React from 'react';
import { Trophy, Target, Clock, TrendingUp } from 'lucide-react';
import { StudentProgress } from '../types';

interface ProgressDashboardProps {
  progress: StudentProgress;
  onContinueLearning: () => void;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ progress, onContinueLearning }) => {
  const getSkillColor = (mastery: string) => {
    switch (mastery) {
      case 'strong': return 'bg-green-500';
      case 'developing': return 'bg-yellow-500';
      case 'weak': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSkillTextColor = (mastery: string) => {
    switch (mastery) {
      case 'strong': return 'text-green-700';
      case 'developing': return 'text-yellow-700';
      case 'weak': return 'text-red-700';
      default: return 'text-gray-700';
    }
  };

  const getMasteryEmoji = (mastery: string) => {
    switch (mastery) {
      case 'strong': return '🚀';
      case 'developing': return '📈';
      case 'weak': return '💪';
      default: return '🎯';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Your Math Journey 📊
          </h1>
          <p className="text-xl text-gray-600">
            Great work! Here's how you're doing so far.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-800">{progress.totalXP}</span>
            </div>
            <p className="text-gray-600 font-medium">Total XP</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-800">{progress.currentLevel}</span>
            </div>
            <p className="text-gray-600 font-medium">Current Level</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold text-gray-800">{Math.floor(progress.timeSpent / 60)}m</span>
            </div>
            <p className="text-gray-600 font-medium">Time Spent</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-gray-800">{progress.sessionStreak}</span>
            </div>
            <p className="text-gray-600 font-medium">Day Streak</p>
          </div>
        </div>

        {/* Skill Areas */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Skill Blueprint 🎯</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {progress.skillAreas.map((skill, index) => (
              <div key={skill.id} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${getSkillColor(skill.mastery)}`} />
                    <h3 className="font-semibold text-gray-800">{skill.name}</h3>
                    <span className="text-xl">{getMasteryEmoji(skill.mastery)}</span>
                  </div>
                  <span className={`text-sm font-medium ${getSkillTextColor(skill.mastery)}`}>
                    {skill.mastery.charAt(0).toUpperCase() + skill.mastery.slice(1)}
                  </span>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{skill.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${getSkillColor(skill.mastery)}`}
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  {skill.problemsSolved} of {skill.totalProblems} problems completed
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">What's Next? 🤔</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-red-50 rounded-xl border-2 border-red-200">
              <h3 className="font-semibold text-red-800 mb-2">Focus Areas 💪</h3>
              <ul className="space-y-2">
                {progress.skillAreas
                  .filter(skill => skill.mastery === 'weak')
                  .map(skill => (
                    <li key={skill.id} className="text-red-700 text-sm">
                      • {skill.name} ({skill.score}%)
                    </li>
                  ))}
              </ul>
              {progress.skillAreas.filter(skill => skill.mastery === 'weak').length === 0 && (
                <p className="text-red-700 text-sm">Great job! No weak areas found! 🎉</p>
              )}
            </div>
            
            <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Challenge Ready 🚀</h3>
              <ul className="space-y-2">
                {progress.skillAreas
                  .filter(skill => skill.mastery === 'strong')
                  .map(skill => (
                    <li key={skill.id} className="text-green-700 text-sm">
                      • {skill.name} ({skill.score}%)
                    </li>
                  ))}
              </ul>
              {progress.skillAreas.filter(skill => skill.mastery === 'strong').length === 0 && (
                <p className="text-green-700 text-sm">Keep practicing to unlock challenge problems! 💫</p>
              )}
            </div>
          </div>
        </div>

        {/* Continue Learning Button */}
        <div className="text-center">
          <button
            onClick={onContinueLearning}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
          >
            Continue Learning 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;