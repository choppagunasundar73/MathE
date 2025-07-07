import React, { useEffect, useRef, useState } from 'react';
import { Brain, Lightbulb, BarChart3, Users, Sparkles, Target, Clock, Award } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.feature-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Assessment",
      description: "Advanced algorithms analyze your learning patterns and identify knowledge gaps in real-time.",
      color: "from-violet-500 to-purple-600",
      shadowColor: "shadow-violet-500/20"
    },
    {
      icon: Lightbulb,
      title: "Adaptive Learning Paths",
      description: "Personalized curriculum that adjusts difficulty and focus areas based on your progress.",
      color: "from-blue-500 to-cyan-600",
      shadowColor: "shadow-blue-500/20"
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Detailed insights into your learning journey with visual progress tracking and predictions.",
      color: "from-emerald-500 to-teal-600",
      shadowColor: "shadow-emerald-500/20"
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Connect with peers, share solutions, and learn together in a supportive community.",
      color: "from-orange-500 to-red-600",
      shadowColor: "shadow-orange-500/20"
    },
    {
      icon: Target,
      title: "Skill Mastery System",
      description: "Break down complex topics into manageable skills with clear mastery indicators.",
      color: "from-pink-500 to-rose-600",
      shadowColor: "shadow-pink-500/20"
    },
    {
      icon: Clock,
      title: "Smart Scheduling",
      description: "AI optimizes your study schedule based on retention patterns and availability.",
      color: "from-indigo-500 to-purple-600",
      shadowColor: "shadow-indigo-500/20"
    }
  ];

  return (
    <section id="features" ref={sectionRef} className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full px-4 py-2 md:px-6 md:py-3 mb-4 md:mb-6">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-violet-600" />
            <span className="text-xs md:text-sm font-semibold text-violet-700">Revolutionary Features</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Why Math-E is
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> Different</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of mathematics education with cutting-edge AI technology 
            that understands how you learn best.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card group relative bg-white rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 border border-gray-100 ${feature.shadowColor} ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 ${feature.shadowColor}`}>
                <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-gray-800 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                {feature.description}
              </p>

              {/* Hover Arrow */}
              <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center`}>
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <button className="bg-gradient-to-r from-violet-600 to-purple-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl font-semibold text-base md:text-lg hover:shadow-xl hover:shadow-violet-500/25 hover:scale-105 transition-all duration-300">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;