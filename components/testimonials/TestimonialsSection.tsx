'use client';

import { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Peeter",
      service: "Pigeon Nets",
      rating: 5,
      review: "Very good service by the team, for pigeon safety nets. They came and finished the work within 4 hours of contacting them. Thank you for the awesome service.",
      initials: "P",
      location: "Hyderabad"
    },
    {
      name: "David",
      service: "Pigeon Nets", 
      rating: 5,
      review: "Excellent service. Within few hours of raising request, pigeon net was put on my both my balcony. They have variety of nets, you can choose accordingly to your need.",
      initials: "D",
      location: "Bangalore"
    },
    {
      name: "Sai Ram",
      service: "Pigeon Safety Nets",
      rating: 5,
      review: "We have issue with Pigeons, we called through online his team came resolved issue with in 2hrs. We fully satisfied and Reasonable cost. I highly recommend.",
      initials: "SR",
      location: "Chennai"
    },
    {
      name: "Priya Sharma",
      service: "Children Protection Nets",
      rating: 5,
      review: "Amazing service for child safety nets. My kids can now play safely on the balcony. Professional installation and quality materials used.",
      initials: "PS",
      location: "Hyderabad"
    },
    {
      name: "Rajesh Kumar",
      service: "Invisible Grills",
      rating: 5,
      review: "Excellent invisible grill installation. Maintains the view while providing security. Team was punctual and work quality is outstanding.",
      initials: "RK",
      location: "Bangalore"
    },
    {
      name: "Anita Reddy",
      service: "Balcony Safety Nets",
      rating: 5,
      review: "Very satisfied with the balcony safety net installation. Quality materials and professional service. Highly recommended for safety needs.",
      initials: "AR",
      location: "Chennai"
    }
  ];

  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  return (
    <section id="testimonials" className="py-12 md:py-16 lg:py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold">
            What Our <span className="text-gradient">Customers Say</span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
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
              <Card key={index} className="flex-shrink-0 w-72 md:w-80 bg-background hover:shadow-strong transition-all">
                <CardContent className="p-4 md:p-6 space-y-4">
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Review */}
                  <p className="text-xs md:text-sm text-muted-foreground italic leading-relaxed">
                    &ldquo;{testimonial.review}&rdquo;
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8 md:h-10 md:w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs md:text-sm">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm md:text-base">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.service} • {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial, index) => (
              <Card key={`duplicate-${index}`} className="flex-shrink-0 w-72 md:w-80 bg-background hover:shadow-strong transition-all">
                <CardContent className="p-4 md:p-6 space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-xs md:text-sm text-muted-foreground italic leading-relaxed">
                    &ldquo;{testimonial.review}&rdquo;
                  </p>
                  
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8 md:h-10 md:w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs md:text-sm">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm md:text-base">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.service} • {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-6 md:gap-12 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">5000+</div>
            <div className="text-xs md:text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-safety">4.9/5</div>
            <div className="text-xs md:text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-accent">15+</div>
            <div className="text-xs md:text-sm text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;