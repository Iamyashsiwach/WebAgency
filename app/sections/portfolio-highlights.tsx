import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowRight } from "lucide-react";

const featuredProjects = [
  {
    id: 1,
    title: "TechFlow SaaS Platform",
    description: "A comprehensive project management platform with real-time collaboration features and AI-powered insights.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    category: "Web Development",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "AI Integration"],
    results: "300% increase in user productivity"
  },
  {
    id: 2,
    title: "Luxe Fashion Store",
    description: "Premium e-commerce platform with advanced filtering, AR try-on features, and seamless checkout experience.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    category: "E-commerce",
    technologies: ["Shopify Plus", "React", "Node.js", "Stripe"],
    results: "250% increase in conversion rate"
  },
  {
    id: 3,
    title: "HealthTech Mobile App",
    description: "iOS and Android app for health monitoring with AI-powered insights and real-time data synchronization.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    category: "Mobile Development",
    technologies: ["React Native", "Firebase", "TensorFlow", "HealthKit"],
    results: "1M+ active users in 6 months"
  }
];

export function PortfolioHighlights() {
  return (
    <section className="py-20 px-4 bg-neutral-50/50 dark:bg-neutral-900/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Discover how we&apos;ve helped businesses transform their digital presence and achieve remarkable results.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white dark:bg-neutral-800/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-neutral-200 dark:border-neutral-700"
            >
              {/* Project Image */}
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full font-medium">
                    {project.category}
                  </span>
                </div>

                {/* External Link */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ExternalLink size={16} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-neutral-800 dark:text-neutral-200">
                  {project.title}
                </h3>
                
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs rounded font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Results */}
                <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                  📈 {project.results}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg group"
          >
            View All Projects
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
} 