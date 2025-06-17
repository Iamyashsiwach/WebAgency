"use client";
import { FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Zap, ArrowRight, Star } from "lucide-react";

const categories = ["All", "Web Development", "UI/UX Design", "E-commerce", "Mobile Apps"];

const projects = [
  {
    id: 1,
    title: "TechFlow SaaS Platform",
    description: "A comprehensive project management platform with real-time collaboration features.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    category: "Web Development",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Luxe Fashion Store",
    description: "Premium e-commerce platform with advanced filtering and seamless checkout.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    category: "E-commerce",
    technologies: ["Shopify", "React", "Node.js", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "HealthTech Mobile App",
    description: "iOS and Android app for health monitoring with AI-powered insights.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    category: "Mobile Apps",
    technologies: ["React Native", "Firebase", "TensorFlow"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 4,
    title: "Creative Agency Rebrand",
    description: "Complete UI/UX redesign focusing on modern aesthetics and user experience.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    category: "UI/UX Design",
    technologies: ["Figma", "Adobe Creative Suite", "Webflow"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
];

const PortfolioPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentFeatured, setCurrentFeatured] = useState(0);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = projects.filter(project => project.featured);

  // Auto-rotate featured projects
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatured((prev) => (prev + 1) % featuredProjects.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [featuredProjects.length]);

  return (
    <div className="min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(71, 85, 105) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-slate-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-gray-600/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-slate-400/20 rounded-full blur-xl animate-pulse delay-2000" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-full text-slate-600 dark:text-slate-300 text-sm font-medium mb-6 animate-fade-in">
            <Star size={16} className="fill-current text-amber-500" />
            Partnership Excellence Since 2020
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-slate-700 via-gray-800 to-slate-900 dark:from-slate-300 dark:via-gray-200 dark:to-slate-100 bg-clip-text text-transparent">
              Our Portfolio
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Four years of collaborative excellence, delivering innovative digital solutions as 
            <span className="text-slate-700 dark:text-slate-300 font-medium"> trusted partners</span>
          </p>

          {/* Stats with Animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { value: "100+", label: "Projects", color: "text-slate-600", delay: "delay-100" },
              { value: "99%", label: "Partnership Success", color: "text-gray-600", delay: "delay-200" },
              { value: "50+", label: "Trusted Clients", color: "text-slate-700", delay: "delay-300" },
              { value: "4+", label: "Years Partnership", color: "text-gray-700", delay: "delay-500" }
            ].map((stat, index) => (
              <div key={index} className={`text-center transform hover:scale-105 transition-transform ${stat.delay}`}>
                <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="#featured"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 group"
          >
            Explore Our Work
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Auto-Rotating Featured Projects Gallery */}
      <section id="featured" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Showcasing our most impactful collaborative work that drives results and exceeds expectations
            </p>
          </div>

          {/* Gallery Container */}
          <div className="relative">
            {/* Main Display */}
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`absolute inset-0 transition-all duration-1000 ${
                    index === currentFeatured 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Project Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <div className="max-w-2xl">
                      <div className="inline-block px-3 py-1 bg-slate-700 rounded-full text-sm mb-4">
                        {project.category}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">{project.title}</h3>
                      <p className="text-neutral-200 mb-4 leading-relaxed">{project.description}</p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Link
                          href={project.liveUrl}
                          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-neutral-100 transition-colors font-medium"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </Link>
                        <Link
                          href={project.githubUrl}
                          className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors font-medium"
                        >
                          <Github size={16} />
                          View Code
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center gap-3 mt-6">
              {featuredProjects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setCurrentFeatured(index)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentFeatured 
                      ? 'ring-2 ring-slate-600 scale-110' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {featuredProjects.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentFeatured 
                      ? 'w-8 bg-slate-600' 
                      : 'w-2 bg-neutral-300 dark:bg-neutral-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-12 px-4 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">All Projects</h2>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                  selectedCategory === category
                    ? "bg-slate-600 text-white shadow-md"
                    : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-neutral-200 dark:border-neutral-700"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-slate-600 text-white text-xs rounded">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={project.liveUrl}
                      className="flex-1 text-center py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm"
                    >
                      View Project
                    </Link>
                    <Link
                      href={project.githubUrl}
                      className="p-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors"
                    >
                      <Github size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
            Let&apos;s collaborate to bring your vision to life with cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors"
            >
              <Zap className="mr-2" size={18} />
              Start Your Project
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center px-6 py-3 border-2 border-slate-600 text-slate-600 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;