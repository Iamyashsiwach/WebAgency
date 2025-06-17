import React from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    position: "CEO, TechFlow Solutions",
    company: "TechFlow Solutions",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b550?w=150&h=150&fit=crop&crop=face",
    content: "Web Agency transformed our digital presence completely. Their attention to detail and innovative approach resulted in a 300% increase in user engagement. The team truly understands modern web development.",
    rating: 5,
    project: "SaaS Platform Development"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    position: "Founder, Luxe Fashion",
    company: "Luxe Fashion",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "Working with this team was exceptional. They delivered our e-commerce platform ahead of schedule and exceeded all expectations. Our conversion rate increased by 250% within the first month.",
    rating: 5,
    project: "E-commerce Development"
  },
  {
    id: 3,
    name: "Dr. Emily Chen",
    position: "CTO, HealthTech Innovations",
    company: "HealthTech Innovations",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "The mobile app they developed for us has been a game-changer. We reached 1 million active users in just 6 months. Their expertise in AI integration and user experience is outstanding.",
    rating: 5,
    project: "Mobile App Development"
  }
];

export function ClientTestimonials() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
              What Our Clients Say
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our partners have to say about working with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-neutral-800/50 p-6 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote size={24} className="text-blue-600 dark:text-blue-400" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star key={index} size={16} className="fill-current text-amber-500" />
                ))}
              </div>

              {/* Content */}
              <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800 dark:text-neutral-200">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {testimonial.position}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {testimonial.project}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="inline-flex items-center gap-8 px-6 py-4 bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-500 mb-1">4.9/5</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Average Rating</div>
            </div>
            <div className="w-px h-8 bg-neutral-300 dark:bg-neutral-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">99%</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Client Satisfaction</div>
            </div>
            <div className="w-px h-8 bg-neutral-300 dark:bg-neutral-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">50+</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 