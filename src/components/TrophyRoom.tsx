import React, { useEffect, useState } from 'react';
import { Trophy, Award, Star, Zap } from 'lucide-react';

const TrophyRoom: React.FC = () => {
  const [visibleTrophies, setVisibleTrophies] = useState<number[]>([]);
  const [hoveredTrophy, setHoveredTrophy] = useState<number | null>(null);
  const [liveCounter, setLiveCounter] = useState(50000);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const trophies = entry.target.querySelectorAll('.trophy-item');
            trophies.forEach((trophy, index) => {
              setTimeout(() => {
                setVisibleTrophies(prev => [...prev, index]);
              }, index * 300);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('trophy-room');
    if (section) {
      observer.observe(section);
    }

    // Live counter animation
    const counterInterval = setInterval(() => {
      setLiveCounter(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 2000);

    return () => {
      observer.disconnect();
      clearInterval(counterInterval);
    };
  }, []);

  const trophies = [
    {
      id: 1,
      title: "98% Accuracy",
      description: "Students achieve near-perfect results",
      icon: Trophy,
      color: "from-yellow-400 to-orange-500",
      glowColor: "shadow-yellow-500/30",
      testimonial: "Sarah M. said: 'I went from 60% to 98% in just 3 weeks!'",
      animation: "rotate-y-360"
    },
    {
      id: 2,
      title: "3x Faster Learning",
      description: "Accelerated mathematical understanding",
      icon: Zap,
      color: "from-blue-400 to-purple-500",
      glowColor: "shadow-blue-500/30",
      testimonial: "Alex T. said: 'I learned more in a week than I did in a month of class!'",
      animation: "gauge-fill"
    },
    {
      id: 3,
      title: `${liveCounter.toLocaleString()}+ Students Helped`,
      description: "Growing community of learners",
      icon: Star,
      color: "from-emerald-400 to-teal-500",
      glowColor: "shadow-emerald-500/30",
      testimonial: "Join thousands of students mastering math every day!",
      animation: "counter-tick"
    }
  ];

  return (
    <section id="trophy-room" className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Workshop Ambiance */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-800/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-800/50 to-transparent"></div>
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
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
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-yellow-400/30">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-300">The Trophy Room</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our Hall of
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Achievements</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            These aren't just numbers—they're real stories of mathematical breakthroughs.
          </p>
        </div>

        {/* Trophy Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {trophies.map((trophy, index) => (
            <div
              key={trophy.id}
              className={`trophy-item relative group cursor-pointer transition-all duration-700 ${
                visibleTrophies.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
              onMouseEnter={() => setHoveredTrophy(trophy.id)}
              onMouseLeave={() => setHoveredTrophy(null)}
            >
              {/* Trophy Base */}
              <div className="relative">
                {/* Holographic Trophy */}
                <div className={`w-32 h-40 mx-auto mb-6 bg-gradient-to-br ${trophy.color} rounded-2xl flex items-center justify-center shadow-2xl ${trophy.glowColor} transform transition-all duration-500 ${
                  hoveredTrophy === trophy.id ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
                } group-hover:shadow-3xl`}>
                  <trophy.icon className="w-16 h-16 text-white" />
                  
                  {/* Rotating Animation for First Trophy */}
                  {trophy.id === 1 && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-spin" style={{ animationDuration: '3s' }}></div>
                  )}
                  
                  {/* Gauge Animation for Second Trophy */}
                  {trophy.id === 2 && (
                    <div className="absolute bottom-2 left-2 right-2 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white animate-pulse" style={{ width: '75%' }}></div>
                    </div>
                  )}
                  
                  {/* Counter Animation for Third Trophy */}
                  {trophy.id === 3 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-ping"></div>
                  )}
                </div>

                {/* Trophy Information */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{trophy.title}</h3>
                  <p className="text-gray-300 mb-4">{trophy.description}</p>
                </div>

                {/* Testimonial Tooltip */}
                {hoveredTrophy === trophy.id && (
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-80 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/20 animate-fade-in z-20">
                    <div className="text-sm text-gray-700 italic">"{trophy.testimonial}"</div>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white/90 rotate-45"></div>
                  </div>
                )}

                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${trophy.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`}></div>
              </div>

              {/* Sound Effect Indicator */}
              {hoveredTrophy === trophy.id && (
                <div className="absolute top-0 right-0 text-yellow-400 animate-bounce">
                  <div className="text-xs">🔊</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Discovery Hint */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Hover over each trophy to discover the stories behind the numbers</span>
          </div>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default TrophyRoom;