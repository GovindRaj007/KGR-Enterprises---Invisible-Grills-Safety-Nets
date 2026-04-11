'use client';

import { useState, useRef } from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Rasool Basha",
      service: "Pigeon Nets",
      rating: 5,
      review: "Very good service by the team, for pigeon safety nets. They came and finished the work within 4 hours of contacting them. Thank you for the awesome service.",
      initials: "RB",
      location: "Hyderabad"
    },
    { 
      name: "Srinivas Rao Potturi",
      service: "Pigeon Nets", 
      rating: 5,
      review: "Excellent service. Within few hours of raising request, pigeon net was put on my both my balcony. They have variety of nets, you can choose accordingly to your need.",
      initials: "SRP",
      location: "Bangalore"
    },
    {
      name: "R.N Marimuthu",
      service: "Pigeon Safety Nets",
      rating: 5,
      review: "We have issue with Pigeons, we called through online his team came resolved issue with in 2hrs. We fully satisfied and Reasonable cost. I highly recommend.",
      initials: "RNM",
      location: "Chennai"
    },
    {
      name: "Shruti Rander",
      service: "Children Protection Nets",
      rating: 5,
      review: "Amazing service for child safety nets. My kids can now play safely on the balcony. Professional installation and quality materials used.",
      initials: "SR",
      location: "Hyderabad"
    },
    {
      name: "Manish Shrivastava",
      service: "Invisible Grills",
      rating: 5,
      review: "Excellent invisible grill installation. Maintains the view while providing security. Team was punctual and work quality is outstanding.",
      initials: "MS",
      location: "Bangalore"
    },
    {
      name: "Anita Reddy",
      service: "Balcony Safety Net",
      rating: 5,
      review: "Very satisfied with the balcony safety net installation. Quality materials and professional service. Highly recommended for safety needs.",
      initials: "AR",
      location: "Chennai"
    }
  ];

  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  return (
    <section id="testimonials" className="py-12 md:py-16 lg:py-12" style={{
      background: "linear-gradient(180deg, #1E2A42 0%, #121D2F 100%)"
    }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold" style={{ color: "#F0F6FF" }}>
            What Our <span style={{ color: "#FF6B42" }}>Customers Say</span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto" style={{ color: "#C8D8EE" }}>
            Real feedback from satisfied customers who trust us for their safety needs
          </p>
        </div>

        {/* Scrolling Cards */}
        <div
          className="relative overflow-x-auto scrollbar-hide"
          ref={scrollContainerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`flex gap-4 md:gap-6 min-w-max ${!isPaused ? 'animate-scroll' : ''}`}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {/* First set */}
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-72 md:w-80 rounded-lg transition-all hover:shadow-lg p-4 md:p-6 space-y-4"
                style={{
                  background: "linear-gradient(135deg, #121D2F 0%, #121D2F 100%)",
                  border: "1px solid rgba(36, 61, 99, 0.5)",
                  borderTop: "2px solid #FF6B42",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
                }}
              >
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 md:h-4 md:w-4 fill-current" style={{ color: "#FF6B42" }} />
                  ))}
                </div>
                
                {/* Review */}
                <p className="text-xs md:text-sm italic leading-relaxed" style={{ color: "#C8D8EE" }}>
                  &ldquo;{testimonial.review}&rdquo;
                </p>
                
                {/* Author */}
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold" style={{
                    background: "linear-gradient(135deg, #FF6B42, #F25024)",
                    color: "#ffffff"
                  }}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm md:text-base" style={{ color: "#F0F6FF" }}>{testimonial.name}</div>
                    <div className="text-xs" style={{ color: "#8FAAC8" }}>
                      {testimonial.service} • {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial, index) => (
              <div 
                key={`duplicate-${index}`} 
                className="flex-shrink-0 w-72 md:w-80 rounded-lg transition-all hover:shadow-lg p-4 md:p-6 space-y-4"
                style={{
                  background: "linear-gradient(135deg, #1E2A42 0%, #121D2F 100%)",
                  border: "1px solid rgba(36, 61, 99, 0.5)",
                  borderTop: "2px solid #FF6B42",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
                }}
              >
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 md:h-4 md:w-4 fill-current" style={{ color: "#FF6B42" }} />
                  ))}
                </div>
                <p className="text-xs md:text-sm italic leading-relaxed" style={{ color: "#C8D8EE" }}>
                  &ldquo;{testimonial.review}&rdquo;
                </p>
                
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold" style={{
                    background: "linear-gradient(135deg, #FF6B42, #F25024)",
                    color: "#ffffff"
                  }}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm md:text-base" style={{ color: "#F0F6FF" }}>{testimonial.name}</div>
                    <div className="text-xs" style={{ color: "#8FAAC8" }}>
                      {testimonial.service} • {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-6 md:gap-12 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-bold" style={{ color: "#FF6B42" }}>5000+</div>
            <div className="text-xs md:text-sm" style={{ color: "#C8D8EE" }}>Happy Customers</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold" style={{ color: "#FF6B42" }}>4.9/5</div>
            <div className="text-xs md:text-sm" style={{ color: "#C8D8EE" }}>Average Rating</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold" style={{ color: "#2E7FD9" }}>15+</div>
            <div className="text-xs md:text-sm" style={{ color: "#C8D8EE" }}>Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;