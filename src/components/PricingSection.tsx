import React, { useEffect, useState } from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';

const PricingSection: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.pricing-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('pricing');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const plans = [
    {
      name: "Explorer",
      price: "Free",
      period: "forever",
      description: "Perfect for getting started with Math-E",
      icon: Star,
      color: "from-blue-500 to-cyan-600",
      shadowColor: "shadow-blue-500/20",
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
      name: "Scholar",
      price: "$9.99",
      period: "per month",
      description: "Ideal for serious learners and students",
      icon: Zap,
      color: "from-violet-500 to-purple-600",
      shadowColor: "shadow-violet-500/20",
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
      name: "Genius",
      price: "$19.99",
      period: "per month",
      description: "For families and advanced learners",
      icon: Crown,
      color: "from-orange-500 to-red-600",
      shadowColor: "shadow-orange-500/20",
      features: [
        "Everything in Scholar",
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
    <section id="pricing" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-48 h-48 md:w-64 md:h-64 bg-violet-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 md:w-80 md:h-80 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full px-4 py-2 md:px-6 md:py-3 mb-4 md:mb-6">
            <Crown className="w-4 h-4 md:w-5 md:h-5 text-violet-600" />
            <span className="text-xs md:text-sm font-semibold text-violet-700">Simple Pricing</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> Learning Path</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and upgrade as you grow. All plans include our core AI tutoring features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 border-2 ${
                plan.popular ? 'border-violet-200 ring-4 ring-violet-100' : 'border-gray-100'
              } ${plan.shadowColor} ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-1 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-6 md:p-8">
                {/* Icon */}
                <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 ${plan.shadowColor}`}>
                  <plan.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>

                {/* Plan Info */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6 md:mb-8">
                  <div className="flex items-baseline">
                    <span className="text-3xl md:text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== "Free" && (
                      <span className="text-sm md:text-base text-gray-600 ml-2">/{plan.period}</span>
                    )}
                  </div>
                  {plan.price === "Free" && (
                    <span className="text-sm md:text-base text-gray-600">{plan.period}</span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 md:mr-3 flex-shrink-0" />
                      <span className="text-sm md:text-base text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 md:py-4 px-4 md:px-6 rounded-2xl font-semibold transition-all duration-300 text-sm md:text-base ${
                    plan.popular
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-xl hover:shadow-violet-500/25 hover:scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
            All plans include a money-back guarantee. Cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
              <span className="text-xs md:text-sm text-gray-600">No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
              <span className="text-xs md:text-sm text-gray-600">Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
              <span className="text-xs md:text-sm text-gray-600">24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;