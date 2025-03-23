"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { FocusCards } from "@/components/ui/focus-cards";

export function Showcase() {
  const cards = [
    {
      title: "UI/UX Designing",
      src: "/mobile-design.jpg",
    },
    {
      title: "Web Development",
      src: "/web.jpg",
    },
    {
      title: "Social Media Marketing & SEO",
      src: "/marketing.jpg",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center bg-black text-white overflow-hidden rounded-md">
      {/* Sparkles Section */}
      <div className="h-[30rem] md:h-[35rem] w-full flex flex-col items-center justify-center relative px-4">
        <h1 className="text-3xl md:text-6xl lg:text-7xl xl:text-9xl font-bold text-center relative z-20">
          Expertise
        </h1>
        <div className="w-full max-w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-20 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-20 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core Sparkles Component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>

      {/* Focus Cards Section - Responsive Spacing & Layout */}
      <div className="w-full max-w-7xl px-4 sm:px-6 md:px-10 pb-16 md:pb-20">
        <FocusCards cards={cards} />
      </div>
    </div>
  );
}
