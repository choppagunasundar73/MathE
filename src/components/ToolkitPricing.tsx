import React, { useEffect, useState } from 'react';
import { Check, Compass, Calculator, Zap, Crown, Wrench, Lightbulb } from 'lucide-react';

const ToolkitPricing: React.FC = () => {
  const [visibleToolkits, setVisibleToolkits] = useState<number[]>([]);
  const [hoveredToolkit, setHoveredToolkit] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const toolkits = entry.target.querySelectorAll('.toolkit-card');
            toolkits.forEach((toolkit, index) => {
              setTimeout(() => {
                setVisibleToolkits(prev => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('toolkit-pricing');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const toolkits = [
    {
      name: "Basic Toolkit",
      price: "Free",
      period: "forever",
      description: "Essential tools to start your mathematical journey",
      icon: Compass,
      color: "from-blue-500 to-cyan-600",
      shadowColor: "shadow-blue-500/20",
      tools: [
        { name: "Compass", icon: "🧭", description: "Navigate basic concepts" },
        { name: "Ruler", icon: "📏", description: "Measure your progress" },
        { name: "Pencil", icon: "✏️", description: "Practice fundamentals" }
      ],
      features: [
        "5 problems per day",
        "Basic progress tracking",
        "Community support",
        "Mobile app access"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Advanced Toolkit",
      price: "$9.99",
      period: "per month",
      description: "Professional-grade tools for serious learners",
      icon: Calculator,
      color: "from-violet-500 to-purple-600",
      shadowColor: "shadow-violet-500/20",
      tools: [
        { name: "Slide Rule", icon: "📐", description: "Advanced calculations" },
        { name: "Drafting Tools", icon: "📊", description: "Precise problem solving" },
        { name: "Glowing Calculator", icon: "🔢", description: "Smart computation" }
      ],
      features: [
        "Unlimited problems",
        "Advanced AI tutoring",
        "Detailed analytics",
        "Priority support",
        "Offline mode",
        "Parent dashboard"
      ],
      cta: "Start 7-Day Trial",
      popular: true
    },
    {
      name: "Master's Workshop",
      price: "$19.99",
      period: "per month",
      description: "Complete workshop with premium tools and support",
      icon: Crown,
      color: "from-orange-500 to-red-600",
      shadowColor: "shadow-orange-500/20",
      tools: [
        { name: "Holographic Projector", icon: "🔮", description: "1-on-1 sessions" },
        { name: "Direct Line", icon: "📞", description: "Priority support" },
        { name: "Master's Toolkit", icon: "🛠️", description: "All premium tools" }
      ],
      features: [
        "Everything in Advanced",
        "Up to 4 student accounts",
        "Advanced skill assessments",
        "Custom learning paths",
        "1-on-1 tutor sessions",
        "Homework help"
      ],
      cta: "Start 14-Day Trial",
      popular: false
    }
  ];

  return (
    <section id="toolkit-pricing" className="py-24 bg-gradient-to-br from-slate-800 via-gray-900 to-slate-800 relative overflow-hidden">
      {/* Workshop Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-violet-100/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-100/10 rounded-full blur-3xl opacity-50"></div>
        
        {/* Tool Shadows */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-orange-400/30">
            <Wrench className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-semibold text-orange-300">Choose Your Toolkit</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Equip Your
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"> Workshop</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Each toolkit contains carefully crafted tools designed to enhance your mathematical journey.
          </p>
        </div>

        {/* Toolkit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {toolkits.map((toolkit, index) => (
            <div
              key={index}
              className={`toolkit-card relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 border-2 ${
                toolkit.popular ? 'border-violet-400/50 ring-4 ring-violet-400/20' : 'border-gray-600/30'
              } ${toolkit.shadowColor} ${
                visibleToolkits.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredToolkit(index)}
              onMouseLeave={() => setHoveredToolkit(null)}
            >
              {/* Popular Badge */}
              {toolkit.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg border border-violet-400/30">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Toolkit Icon */}
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${toolkit.color} rounded-3xl flex items-center justify-center shadow-2xl ${toolkit.shadowColor} transform transition-all duration-500 ${
                  hoveredToolkit === index ? 'scale-110 rotate-6' : 'scale-100 rotate-0'
                }`}>
                  <toolkit.icon className="w-10 h-10 text-white" />
                </div>

                {/* Toolkit Info */}
                <h3 className="text-2xl font-bold text-white mb-2 text-center">{toolkit.name}</h3>
                <p className="text-gray-300 mb-6 text-center">{toolkit.description}</p>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">{toolkit.price}</span>
                    {toolkit.price !== "Free" && (
                      <span className="text-gray-400 ml-2">/{toolkit.period}</span>
                    )}
                  </div>
                  {toolkit.price === "Free" && (
                    <span className="text-gray-400">{toolkit.period}</span>
                  )}
                </div>

                {/* Tools Illustration */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4 text-center">Your Tools:</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {toolkit.tools.map((tool, toolIndex) => (
                      <div
                        key={toolIndex}
                        className="text-center group cursor-pointer"
                        title={tool.description}
                      >
                        <div className="text-3xl mb-2 transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                          {tool.icon}
                        </div>
                        <div className="text-xs text-gray-400 group-hover:text-white transition-colors">
                          {tool.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {toolkit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                    toolkit.popular
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-xl hover:shadow-violet-500/25 hover:scale-105'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/30'
                  }`}
                >
                  {toolkit.cta}
                </button>

                {/* Tool Highlight Effect */}
                {hoveredToolkit === index && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Workshop Guarantee */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            <div className="text-left">
              <div className="text-white font-semibold">Workshop Guarantee</div>
              <div className="text-sm text-gray-300">All toolkits include a 30-day money-back guarantee</div>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-green-500/20 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-white font-semibold mb-1">No Setup Fees</div>
            <div className="text-sm text-gray-400">Start using your toolkit immediately</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-white font-semibold mb-1">Cancel Anytime</div>
            <div className="text-sm text-gray-400">No long-term commitments required</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-white font-semibold mb-1">24/7 Support</div>
            <div className="text-sm text-gray-400">Expert help whenever you need it</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolkitPricing;