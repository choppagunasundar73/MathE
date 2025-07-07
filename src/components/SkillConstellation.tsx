import React, { useState, useEffect } from 'react';
import { Star, Users, Award, BookOpen } from 'lucide-react';

const SkillConstellation: React.FC = () => {
  const [selectedStar, setSelectedStar] = useState<number | null>(null);
  const [visibleStars, setVisibleStars] = useState<number[]>([]);

  useEffect(() => {
    // Animate stars appearing one by one
    const timer = setInterval(() => {
      setVisibleStars(prev => {
        if (prev.length < skills.length) {
          return [...prev, prev.length];
        }
        clearInterval(timer);
        return prev;
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  const skills = [
    {
      id: 1,
      name: "Pythagorean Theorem",
      mastery: "strong",
      position: { x: 20, y: 30 },
      testimonial: {
        name: "Sarah C.",
        story: "I finally understood why a² + b² = c²! Math-E showed me how it connects to real-world problems like finding distances.",
        achievement: "Unlocked Advanced Geometry"
      }
    },
    {
      id: 2,
      name: "Linear Equations",
      mastery: "developing",
      position: { x: 45, y: 20 },
      testimonial: {
        name: "Marcus T.",
        story: "Linear equations used to confuse me, but now I can solve them step by step with confidence!",
        achievement: "Mastered Algebraic Thinking"
      }
    },
    {
      id: 3,
      name: "Quadratic Functions",
      mastery: "strong",
      position: { x: 70, y: 40 },
      testimonial: {
        name: "Emma L.",
        story: "The parabola finally makes sense! I can now graph quadratic functions and find their vertex easily.",
        achievement: "Advanced Function Analysis"
      }
    },
    {
      id: 4,
      name: "Probability",
      mastery: "developing",
      position: { x: 30, y: 60 },
      testimonial: {
        name: "Alex R.",
        story: "Probability was just guessing before. Now I can calculate actual chances and understand statistics!",
        achievement: "Data Analysis Expert"
      }
    },
    {
      id: 5,
      name: "Trigonometry",
      mastery: "strong",
      position: { x: 60, y: 70 },
      testimonial: {
        name: "Jordan M.",
        story: "Sin, cos, and tan aren't scary anymore! I can solve triangle problems and understand wave patterns.",
        achievement: "Trigonometric Mastery"
      }
    },
    {
      id: 6,
      name: "Systems of Equations",
      mastery: "developing",
      position: { x: 80, y: 25 },
      testimonial: {
        name: "Taylor K.",
        story: "Solving multiple equations at once seemed impossible. Now I use substitution and elimination like a pro!",
        achievement: "Multi-Variable Problem Solver"
      }
    }
  ];

  const getStarColor = (mastery: string) => {
    switch (mastery) {
      case 'strong': return 'text-yellow-400';
      case 'developing': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStarSize = (mastery: string) => {
    switch (mastery) {
      case 'strong': return 'w-8 h-8';
      case 'developing': return 'w-6 h-6';
      default: return 'w-4 h-4';
    }
  };

  const connections = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 1, to: 4 },
    { from: 4, to: 5 },
    { from: 3, to: 6 },
    { from: 2, to: 6 }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-indigo-400/30">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-semibold text-indigo-300">Hall of Heroes</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            The Skill
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Constellation</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the vast universe of mathematical mastery. Each bright star represents a student's achievement.
          </p>
        </div>

        {/* Interactive Constellation Map */}
        <div className="relative">
          <div className="bg-black/30 backdrop-blur-sm rounded-3xl border border-white/20 p-8 min-h-[600px] relative overflow-hidden">
            {/* Constellation SVG */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              {/* Connection Lines */}
              {connections.map((connection, index) => {
                const fromSkill = skills.find(s => s.id === connection.from);
                const toSkill = skills.find(s => s.id === connection.to);
                if (!fromSkill || !toSkill) return null;

                return (
                  <line
                    key={index}
                    x1={`${fromSkill.position.x}%`}
                    y1={`${fromSkill.position.y}%`}
                    x2={`${toSkill.position.x}%`}
                    y2={`${toSkill.position.y}%`}
                    stroke="rgba(139, 92, 246, 0.3)"
                    strokeWidth="2"
                    className="animate-pulse"
                    style={{ animationDelay: `${index * 500}ms` }}
                  />
                );
              })}
            </svg>

            {/* Skill Stars */}
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 ${
                  visibleStars.includes(index) 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-0'
                } ${selectedStar === skill.id ? 'scale-150 z-20' : 'z-10'}`}
                style={{
                  left: `${skill.position.x}%`,
                  top: `${skill.position.y}%`,
                  transitionDelay: `${index * 300}ms`
                }}
                onClick={() => setSelectedStar(selectedStar === skill.id ? null : skill.id)}
              >
                {/* Star Glow */}
                <div className={`absolute inset-0 ${getStarColor(skill.mastery)} opacity-50 blur-lg ${getStarSize(skill.mastery)} animate-pulse`}></div>
                
                {/* Star Icon */}
                <Star className={`${getStarColor(skill.mastery)} ${getStarSize(skill.mastery)} fill-current relative z-10`} />
                
                {/* Skill Label */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs text-white text-center whitespace-nowrap">
                  {skill.name}
                </div>

                {/* Pulsing Ring for Strong Skills */}
                {skill.mastery === 'strong' && (
                  <div className="absolute inset-0 border-2 border-yellow-400 rounded-full animate-ping opacity-30"></div>
                )}
              </div>
            ))}

            {/* Skill Details Modal */}
            {selectedStar && (
              <div className="absolute inset-0 flex items-center justify-center z-30">
                <div className="bg-black/80 backdrop-blur-xl rounded-3xl border border-white/20 p-8 max-w-md mx-4 transform animate-fade-in">
                  <div className="text-center">
                    {/* Achievement Badge */}
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/30">
                      <Award className="w-10 h-10 text-white" />
                    </div>

                    {/* Skill Info */}
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {skills.find(s => s.id === selectedStar)?.name}
                    </h3>
                    
                    <div className="bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-green-400/30">
                      <span className="text-green-300 font-semibold">
                        {skills.find(s => s.id === selectedStar)?.testimonial.achievement}
                      </span>
                    </div>

                    {/* Student Testimonial */}
                    <div className="text-left mb-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">
                            {skills.find(s => s.id === selectedStar)?.testimonial.name}
                          </div>
                          <div className="text-sm text-gray-400">Student Hero</div>
                        </div>
                      </div>
                      <blockquote className="text-gray-300 italic leading-relaxed">
                        "{skills.find(s => s.id === selectedStar)?.testimonial.story}"
                      </blockquote>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedStar(null)}
                      className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
                    >
                      Explore More Stars
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Hint */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Click on any bright star to discover a student's achievement story</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default SkillConstellation;