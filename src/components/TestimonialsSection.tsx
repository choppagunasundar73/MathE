import React, { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const [visibleTestimonials, setVisibleTestimonials] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const testimonials = entry.target.querySelectorAll('.testimonial-card');
            testimonials.forEach((testimonial, index) => {
              setTimeout(() => {
                setVisibleTestimonials(prev => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('testimonials');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "8th Grade Student",
      avatar: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "Math-E helped me go from struggling with algebra to actually enjoying it! The AI knows exactly what I need to work on.",
      rating: 5,
      improvement: "+2 Grade Levels"
    },
    {
      name: "Marcus Johnson",
      role: "Parent",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "My daughter's confidence in math has skyrocketed. The personalized approach really works - she's excited to learn now.",
      rating: 5,
      improvement: "98% Accuracy"
    },
    {
      name: "Emily Rodriguez",
      role: "Math Teacher",
      avatar: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "As an educator, I'm impressed by how Math-E adapts to each student's learning style. It's like having a personal tutor for every child.",
      rating: 5,
      improvement: "Class Average +15%"
    },
    {
      name: "Alex Thompson",
      role: "8th Grade Student",
      avatar: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "The hints system is amazing! When I'm stuck, Math-E gives me just enough help to figure it out myself. I feel so much smarter now.",
      rating: 5,
      improvement: "3x Faster Learning"
    },
    {
      name: "Dr. Jennifer Park",
      role: "School Principal",
      avatar: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "We've seen remarkable improvements across all our math classes since implementing Math-E. The data-driven insights are invaluable.",
      rating: 5,
      improvement: "School-wide Success"
    },
    {
      name: "David Kim",
      role: "Parent & Engineer",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "The progress tracking is incredible. I can see exactly where my son excels and where he needs support. It's like having X-ray vision into his learning.",
      rating: 5,
      improvement: "Real-time Insights"
    }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-br from-violet-50 to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3 mb-4 md:mb-6 shadow-lg">
            <Quote className="w-4 h-4 md:w-5 md:h-5 text-violet-600" />
            <span className="text-xs md:text-sm font-semibold text-violet-700">Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Transforming Lives Through
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> Math</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from students, parents, and educators who've experienced the Math-E difference.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 border border-white/20 group ${
                visibleTestimonials.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4 md:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-3 md:space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-white shadow-lg"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm md:text-base text-gray-900">{testimonial.name}</div>
                  <div className="text-xs md:text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>

              {/* Improvement Badge */}
              <div className="mt-3 md:mt-4 inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full mr-1.5 md:mr-2"></div>
                {testimonial.improvement}
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-violet-600 mb-1 md:mb-2">50,000+</div>
            <div className="text-sm md:text-base text-gray-600">Students Helped</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-purple-600 mb-1 md:mb-2">98%</div>
            <div className="text-sm md:text-base text-gray-600">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2">4.9/5</div>
            <div className="text-sm md:text-base text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-emerald-600 mb-1 md:mb-2">1M+</div>
            <div className="text-sm md:text-base text-gray-600">Problems Solved</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;