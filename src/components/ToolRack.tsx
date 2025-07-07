import React, { useState, useEffect } from 'react';
import { Brain, Lightbulb, BarChart3, Users, Target, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const ToolRack: React.FC = () => {
  const [currentTool, setCurrentTool] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [demoTool, setDemoTool] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('tool-rack');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const tools = [
    {
      id: 1,
      name: "AI-Powered Assessment",
      description: "A beautiful, intricate mechanical brain made of brass and glowing gears that analyzes your learning patterns in real-time.",
      icon: Brain,
      color: "from-violet-500 to-purple-600",
      glowColor: "shadow-violet-500/30",
      demoDescription: "Watch as the gears turn to analyze your problem-solving approach...",
      features: ["Real-time pattern analysis", "Adaptive difficulty adjustment", "Learning style detection"]
    },
    {
      id: 2,
      name: "Adaptive Learning Paths",
      description: "A glowing, holographic circuit board where paths of light dynamically reroute based on your progress.",
      icon: Lightbulb,
      color: "from-blue-500 to-cyan-600",
      glowColor: "shadow-blue-500/30",
      demoDescription: "See how learning paths illuminate and adapt to your needs...",
      features: ["Dynamic path adjustment", "Skill prerequisite mapping", "Personalized curriculum"]
    },
    {
      id: 3,
      name: "Progress Analytics",
      description: "A holographic bar chart that builds itself up and animates, showing your mathematical growth.",
      icon: BarChart3,
      color: "from-emerald-500 to-teal-600",
      glowColor: "shadow-emerald-500/30",
      demoDescription: "Watch your progress visualize in real-time 3D analytics...",
      features: ["3D progress visualization", "Predictive analytics", "Skill mastery tracking"]
    },
    {
      id: 4,
      name: "Collaborative Learning",
      description: "Glowing orbs representing students connected by lines of light, forming a dynamic learning network.",
      icon: Users,
      color: "from-orange-500 to-red-600",
      glowColor: "shadow-orange-500/30",
      demoDescription: "See how students connect and learn together...",
      features: ["Peer collaboration", "Study groups", "Knowledge sharing"]
    },
    {
      id: 5,
      name: "Skill Mastery System",
      description: "A constellation map of interconnected skills that light up as you master each mathematical concept.",
      icon: Target,
      color: "from-pink-500 to-rose-600",
      glowColor: "shadow-pink-500/30",
      demoDescription: "Watch skills unlock in your personal constellation...",
      features: ["Skill constellation mapping", "Mastery indicators", "Achievement tracking"]
    },
    {
      id: 6,
      name: "Smart Scheduling",
      description: "An elegant chronometer that optimizes your study schedule based on retention patterns.",
      icon: Clock,
      color: "from-indigo-500 to-purple-600",
      glowColor: "shadow-indigo-500/30",
      demoDescription: "See how AI optimizes your perfect study schedule...",
      features: ["Optimal timing analysis", "Retention pattern tracking", "Personalized scheduling"]
    }
  ];

  const handleToolClick = (index: number) => {
    setDemoTool(index);
    setShowDemo(true);
    
    // Auto-close demo after 5 seconds
    setTimeout(() => {
      setShowDemo(false);
      setDemoTool(null);
    }, 5000);
  };

  const nextTool = () => {
    setCurrentTool((prev) => (prev + 1) % tools.length);
  };

  const prevTool = () => {
    setCurrentTool((prev) => (prev - 1 + tools.length) % tools.length);
  };

  return (
    <section id="tool-rack" className="py-24 bg-gradient-to-br from-slate-800 via-gray-900 to-slate-800 relative overflow-hidden">
      {/* Workshop Atmosphere */}
      <div className="absolute inset-0">
        {/* Workbench Lighting */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-b from-yellow-400/10 to-transparent blur-xl"></div>
        
        {/* Tool Shadows */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent"></div>
        
        {/* Ambient Particles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-blue-400/30">
            <Target className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">The Tool Rack</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Mathematical
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Toolkit</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Each tool in your workshop is designed to enhance your learning experience.
          </p>
        </div>

        {/* Horizontal Scrolling Tool Conveyor */}
        <div className="relative">
          {/* Conveyor Belt Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-700/30 via-gray-600/30 to-gray-700/30 rounded-3xl border border-gray-600/30"></div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevTool}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={nextTool}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Tools Display */}
          <div className="overflow-hidden rounded-3xl p-8">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTool * 100}%)` }}
            >
              {tools.map((tool, index) => (
                <div
                  key={tool.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Tool Visualization */}
                    <div className="relative">
                      <div 
                        className={`w-80 h-80 mx-auto bg-gradient-to-br ${tool.color} rounded-3xl flex items-center justify-center shadow-2xl ${tool.glowColor} cursor-pointer transform transition-all duration-500 hover:scale-105 hover:rotate-3`}
                        onClick={() => handleToolClick(index)}
                      >
                        <tool.icon className="w-32 h-32 text-white" />
                        
                        {/* Tool-specific animations */}
                        {tool.id === 1 && (
                          <div className="absolute inset-4 border-2 border-white/30 rounded-2xl animate-spin" style={{ animationDuration: '4s' }}></div>
                        )}
                        
                        {tool.id === 2 && (
                          <>
                            <div className="absolute top-8 left-8 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <div className="absolute top-12 right-12 w-2 h-2 bg-white rounded-full animate-pulse delay-500"></div>
                            <div className="absolute bottom-8 left-12 w-2 h-2 bg-white rounded-full animate-pulse delay-1000"></div>
                          </>
                        )}
                        
                        {tool.id === 3 && (
                          <div className="absolute bottom-8 left-8 right-8 flex space-x-2">
                            {[...Array(5)].map((_, i) => (
                              <div 
                                key={i}
                                className="flex-1 bg-white/30 rounded-t animate-pulse"
                                style={{ 
                                  height: `${20 + i * 10}px`,
                                  animationDelay: `${i * 200}ms`
                                }}
                              ></div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Click Hint */}
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                        <span className="text-sm text-white">Click to see in action</span>
                      </div>
                    </div>

                    {/* Tool Description */}
                    <div className="text-white">
                      <h3 className="text-3xl font-bold mb-4">{tool.name}</h3>
                      <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                        {tool.description}
                      </p>
                      
                      {/* Features List */}
                      <ul className="space-y-3">
                        {tool.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-3">
                            <div className={`w-2 h-2 bg-gradient-to-r ${tool.color} rounded-full`}></div>
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tool Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {tools.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTool(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTool 
                    ? 'bg-blue-400 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Full-Screen Demo Modal */}
        {showDemo && demoTool !== null && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="max-w-4xl w-full mx-4 bg-gradient-to-br from-gray-900 to-slate-900 rounded-3xl p-8 border border-white/20">
              <div className="text-center">
                <div className={`w-32 h-32 mx-auto mb-6 bg-gradient-to-br ${tools[demoTool].color} rounded-3xl flex items-center justify-center shadow-2xl ${tools[demoTool].glowColor} animate-pulse`}>
                  {React.createElement(tools[demoTool].icon, { className: "w-16 h-16 text-white" })}
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4">{tools[demoTool].name}</h3>
                <p className="text-xl text-gray-300 mb-8">{tools[demoTool].demoDescription}</p>
                
                {/* Demo Animation */}
                <div className="relative h-64 bg-black/30 rounded-2xl flex items-center justify-center border border-white/10">
                  <div className="text-6xl animate-spin">⚙️</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
                </div>
                
                <button
                  onClick={() => {setShowDemo(false); setDemoTool(null);}}
                  className="mt-6 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  Close Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ToolRack;