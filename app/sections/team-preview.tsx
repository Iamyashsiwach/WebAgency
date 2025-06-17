import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Linkedin, Github } from "lucide-react";

const teamMembers = [
  {
    name: "Yash Siwach",
    role: "Founder & Lead Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Full-stack developer with 5+ years of experience in modern web technologies and AI integration.",
    linkedin: "https://www.linkedin.com/in/yash-siwach-216902246/",
    github: "https://github.com/Yash-Siwach"
  },
  {
    name: "Sarah Johnson",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b550?w=400&h=400&fit=crop&crop=face",
    bio: "Creative designer passionate about user-centered design and creating delightful digital experiences.",
    linkedin: "#",
    github: "#"
  },
  {
    name: "Michael Chen",
    role: "Marketing Specialist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Digital marketing expert specializing in SEO, content strategy, and conversion optimization.",
    linkedin: "#",
    github: "#"
  }
];

export function TeamPreview() {
  return (
    <section className="py-20 px-4 bg-neutral-50/50 dark:bg-neutral-900/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
              Meet Our Expert Team
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            The talented individuals behind every successful project. Our team combines technical expertise with creative vision.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-neutral-800/50 p-6 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
            >
              {/* Profile Image */}
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Member Info */}
              <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                {member.name}
              </h3>
              
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                {member.role}
              </p>
              
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                {member.bio}
              </p>

              {/* Social Links */}
              <div className="flex justify-center gap-3">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center hover:bg-neutral-800 hover:text-white transition-colors"
                >
                  <Github size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Company Culture */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-6 px-8 py-8 bg-white dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700 max-w-2xl">
            <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
              Why Work With Us?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">🚀</div>
                <h4 className="font-bold text-neutral-800 dark:text-neutral-200 mb-1">Innovation First</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  We stay ahead of tech trends
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">🤝</div>
                <h4 className="font-bold text-neutral-800 dark:text-neutral-200 mb-1">Partnership Focused</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Your success is our success
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-bold text-neutral-800 dark:text-neutral-200 mb-1">Lightning Fast</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Quick turnaround times
                </p>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 group"
            >
              Learn More About Us
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 