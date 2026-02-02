"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const testimonials = [
  {
    id: 1,
    content:
      "I ordered my diabetes medicine and it arrived within 2 days. All products are genuine and prices are very reasonable. Great service!",
    author: "Karim Ahmed",
    role: "Customer from Dhaka",
    rating: 5,
  },
  {
    id: 2,
    content:
      "Best online medicine store in Bangladesh. I regularly buy my father's heart medicines here. Fast delivery and authentic products every time.",
    author: "Fatima Rahman",
    role: "Regular Customer",
    rating: 5,
  },
  {
    id: 3,
    content:
      "Excellent customer service and quality medical supplies. I bought a blood pressure monitor and it works perfectly. Highly recommended!",
    author: "Rahim Islam",
    role: "Customer from Chittagong",
    rating: 5,
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-muted rounded-2xl p-8 md:p-12">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-primary/20">
              <Quote className="h-16 w-16" />
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Text */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Good Customer Service
                </h3>
                {/* Rating Stars */}
                <div className="flex gap-1 justify-center md:justify-start mb-3">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {testimonials[activeIndex].content}
                </p>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonials[activeIndex].author}
                  </p>
                  <p className="text-sm text-primary">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center md:justify-end gap-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeIndex ? "bg-primary" : "bg-primary/30"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full bg-transparent"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
