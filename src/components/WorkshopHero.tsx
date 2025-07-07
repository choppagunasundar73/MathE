import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Target, TrendingUp, Sparkles, Brain } from 'lucide-react';

interface WorkshopHeroProps {
  userName: string;
}

const WorkshopHero: React.FC<WorkshopHeroProps> = ({ userName }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [headlineText, setHeadlineText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [draggedEquation, setDraggedEquation] = useState<number | null>(null);

  const personalizedHeadline = `Okay, ${userName}. Let's Master Math Like Never Before.`;

  useEffect(() => {
    setIsVisible(true);
    
    // Type out the personalized headline
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < personalizedHeadline.length) {
        setHeadlineText(personalizedHeadline.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setShowButton(true), 500);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [personalizedHeadline]);

  const equations = [
    { id: 1, text: 'x² + 5x = 24', color: 'text-violet-400', position: { top: '20%', left: '15%' } },
    { id: 2, text: 'π ≈ 3.14159', color: 'text-purple-400', position: { top: '30%', right: '20%' } },
    { id: 3, text: '√144 = 12', color: 'text-blue-400', position: { bottom: '25%', left: '10%' } },
    { id: 4, text: '2³ = 8', color: 'text-emerald-400', position: { top: '60%', right: '15%' } },
    { id: 5, text: 'sin(90°) = 1', color: 'text-pink-400', position: { bottom: '40%', right: '25%' } }
  ];

  const handleEquationDrag = (id: number, e: React.MouseEvent) => {
    setDraggedEquation(id);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const element = e.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    const offsetX = startX - rect.left;
    const offsetY = startY - rect.top;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newX = moveEvent.clientX - offsetX;
      const newY = moveEvent.clientY - offsetY;
      
      element.style.position = 'fixed';
      element.style.left = `${newX}px`;
      element.style.top = `${newY}px`;
      element.style.zIndex = '1000';
    };

    const handleMouseUp = () => {
      setDraggedEquation(null);
      element.style.position = 'absolute';
      element.style.zIndex = 'auto';
      
      // Add a gentle bounce back animation
      element.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      setTimeout(() => {
        element.style.transition = '';
      }, 500);
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50 to-purple-100">
      {/* Enhanced 3D Workshop Background */}
      <div className="absolute inset-0">
        {/* Layered Background Elements with Parallax */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse transform-gpu"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000 transform-gpu"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-rose-600/20 rounded-full blur-3xl animate-pulse delay-500 transform-gpu"></div>
        
        {/* Holographic Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Interactive Physics Equations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {equations.map((equation) => (
          <div
            key={equation.id}
            className={`absolute pointer-events-auto cursor-grab active:cursor-grabbing transform transition-all duration-300 hover:scale-110 ${
              draggedEquation === equation.id ? 'scale-125 rotate-3' : ''
            }`}
            style={equation.position}
            onMouseDown={(e) => handleEquationDrag(equation.id, e)}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl hover:bg-white/90 transition-all duration-300">
              <div className={`text-2xl font-bold ${equation.color} font-mono select-none`}>
                {equation.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Personalized Badge */}
          <div className={`inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg border border-white/20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Brain className="w-5 h-5 text-violet-600" />
            <span className="text-sm font-semibold text-gray-700">Welcome to Your Personal Workshop, {userName}!</span>
          </div>

          {/* Dynamic Personalized Headline */}
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              {headlineText}
            </span>
            <span className="inline-block w-1 h-16 bg-violet-600 ml-2 animate-pulse"></span>
          </h1>

          {/* Enhanced Subheadline with LLM Context */}
          <p className={`text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            I'm powered by advanced Large Language Models that understand your unique learning patterns. 
            Together, we'll create personalized pathways to mathematical mastery, {userName}.
          </p>

          {/* Personalized CTA Buttons */}
          {showButton && (
            <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 transition-all duration-1000 delay-600 ${
              showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <button className="group bg-gradient-to-r from-violet-600 to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                <span>Show Me My Workshop, Math-E</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:bg-white transition-all duration-300 flex items-center space-x-2 border border-white/20">
                <Play className="w-5 h-5" />
                <span>See How I Learn</span>
              </button>
            </div>
          )}

          {/* Enhanced Stats with Personal Context */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <Target className="w-8 h-8 text-violet-600" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">98%</div>
              <div className="text-gray-600">Students Like You Succeed</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">3x</div>
              <div className="text-gray-600">Faster Than Traditional Methods</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">∞</div>
              <div className="text-gray-600">Possibilities Await You</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
          <p className="text-sm text-gray-600">
            💡 Try dragging the math equations around, {userName}!
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkshopHero;