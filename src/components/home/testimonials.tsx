"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const testimonials = [
  {
    id: 1,
    content:
      "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.",
    author: "Samanta Williams",
    role: "Home Cleaning",
    avatar: "/images/avatar-1.jpg",
  },
  {
    id: 2,
    content:
      "Exceptional service and quality products! The delivery was fast and the customer support team was incredibly helpful. I've been a loyal customer for over 2 years now and couldn't be happier with their service.",
    author: "Michael Johnson",
    role: "Healthcare Professional",
    avatar: "/images/avatar-2.jpg",
  },
  {
    id: 3,
    content:
      "The best online pharmacy I've ever used. Great prices, authentic products, and excellent customer service. Highly recommend to anyone looking for reliable medical supplies.",
    author: "Emily Davis",
    role: "Nurse Practitioner",
    avatar: "/images/avatar-3.jpg",
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
              {/* Avatar */}
              <div className="shrink-0">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary">
                  <Image
                    src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[activeIndex].author}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Good Customer Service
                </h3>
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
