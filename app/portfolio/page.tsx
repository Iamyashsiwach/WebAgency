"use client";
import { FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

const categories = ["All", "Web Development", "UI/UX Design", "E-commerce", "CMS"];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const projects = [
  {
    id: 1,
    title: "System Integrator Website with Custom CMS",
    description: "A robust website for a system integration company featuring a tailored content management system to streamline service updates and internal processes.",
    image: "/1.png",
    category: "CMS",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    liveUrl: "https://www.reveeinfotech.com/",
    featured: true,
  },
  {
    id: 11,
    title: "E-commerce Website",
    description: "A modern and responsive e-commerce platform featuring product grids, filters, dynamic routing, and a sleek UI using the latest frontend technologies.",
    image: "/11.png",
    category: "E-commerce",
    technologies: ["next.js", "tailwindcss", "typescript", "shadcn/ui"],
    liveUrl: "#",
  },
  {
    id: 2,
    title: "NGO Website with Payment Gateway",
    description: "A responsive NGO platform with donation support, event management, and Razorpay integration for secure online payments.",
    image: "/3.png",
    category: "Web Development",
    technologies: ["Next.js", "React", "Node.js", "Razorpay", "Firebase"],
    liveUrl: "https://smilefoudationsociety.vercel.app",
    featured: true,
  },
  {
    id: 3,
    title: "Salon Website with Booking System",
    description: "A modern salon website equipped with an online booking system, showcasing services, stylists, and appointment slots.",
    image: "/4.png",
    category: "Web Development",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    liveUrl: "https://beauty-parlour-website.vercel.app/",
    featured: true,
  },
  {
    id: 4,
    title: "Website for Information Technology (IT) Services & Consulting",
    description: "A sleek corporate website designed for an IT consulting firm, including service listings, client showcases, and contact capabilities.",
    image: "/5.png",
    category: "Web Development",
    technologies: ["wordpress", "php", "mysql"],
    liveUrl: "http://virasatsolutions.com",
    featured: true,
  },
  {
    id: 5,
    title: "Travel Agency Website",
    description: "An engaging travel website offering tour packages, destination galleries, and inquiry forms to attract potential travelers.",
    image: "/2.png",
    category: "Web Development",
    technologies: ["html", "css", "javascript", "bootstrap"],
    liveUrl: "https://www.ruhanitrips.com/",
    featured: true,
  },
  {
    id: 6,
    title: "Art Gallery Website",
    description: "A visually rich online art gallery showcasing artwork collections, artist bios, and exhibition details.",
    image: "/6.png",
    category: "Web Development",
    technologies: ["html", "css", "javascript", "bootstrap"],
    liveUrl: "https://neha-kandari.github.io/photoframe/#home",
    featured: true,
  },
  {
    id: 7,
    title: "Gym Website",
    description: "A Figma-based design for a fitness-focused website featuring workout plans, trainer profiles, and membership options.",
    image: "/7.png",
    category: "UI/UX Design",
    technologies: ["figma"],
    liveUrl: "https://www.figma.com/proto/b1wR3W4cUSryI4rBCJZpKR/Fitness---Gym-Website-Design--Fitmaker---Community-?page-id=0%3A1&node-id=2-47&viewport=358%2C196%2C0.09&t=mwZMGDfZmv7MZiUO-1&scaling=min-zoom&content-scaling=fixed",
  },
  {
    id: 8,
    title: "E-commerce Website",
    description: "A full-featured e-commerce platform with product listings, modern UI components, and a responsive layout built using the latest stack.",
    image: "/9.png",
    category: "Web Development",
    technologies: ["next.js", "tailwindcss", "typescript", "shadcn/ui"],
    liveUrl: "https://pmakemobilelcd.com/",
  },
  {
    id: 9,
    title: "Interior Design Website",
    description: "A creative Figma prototype for an interior design firm, highlighting project galleries, service sections, and design concepts.",
    image: "/8.png",
    category: "UI/UX Design",
    technologies: ["figma"],
    liveUrl: "https://www.figma.com/proto/Idofiu2yi7cPfZXd53ySWR/Panto---Furniture-Landing-Page-Design--Community-?page-id=0%3A1&node-id=1-2&p=f&viewport=489%2C487%2C0.13&t=VHCoQAXjUXJufzTR-1&scaling=min-zoom&content-scaling=fixed",
  },
  {
    id: 10,
    title: "Furniture E-commerce Website",
    description: "A clean and elegant e-commerce UI/UX concept for a furniture brand, featuring product views, categories, and smooth interactions.",
    image: "/10.png",
    category: "UI/UX Design",
    technologies: ["figma"],
    liveUrl: "https://www.figma.com/proto/lpHV3fKVx2mYmgBysqr0fg/eCommerce-Website-%7C-Web-Page-Design?page-id=0%3A1&node-id=117-336&p=f&viewport=200%2C264%2C0.07&t=Ly4kCpErwUh0JVJl-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=117%3A1143",
  },
  {
    id: 12,
    title: "Real Estate Website",
    description: "A comprehensive real estate platform with property listings, advanced search filters, virtual tours, and agent contact features.",
    image: "/12.png",
    category: "Web Development",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    liveUrl: "#",
  }
];

const PortfolioPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Show only 6 projects initially, all when expanded
  const displayedProjects = showAllProjects 
    ? filteredProjects 
    : filteredProjects.slice(0, 4);

  // Reset to show less when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setShowAllProjects(false);
  };

  const featuredProjects = projects.filter(project => project.featured);

  // Auto-rotate featured projects
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatured((prev) => (prev + 1) % featuredProjects.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [featuredProjects.length]);

  return (
    <div className="min-h-screen pt-20"> {/* Add padding for navbar */}
      {/* Modern Hero Section */}
      <motion.section 
        className="relative py-20 px-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
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

        <motion.div 
          className="max-w-6xl mx-auto text-center relative z-10"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-full text-slate-600 dark:text-slate-300 text-sm font-medium mb-6"
            variants={scaleIn}
          >
            <Star size={16} className="fill-current text-amber-500" />
            Partnership Excellence Since 2020
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            variants={fadeInUp}
          >
            <span className="bg-gradient-to-r from-slate-700 via-gray-800 to-slate-900 dark:from-slate-300 dark:via-gray-200 dark:to-slate-100 bg-clip-text text-transparent">
              Our Portfolio
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={fadeInUp}
          >
            Four years of collaborative excellence, delivering innovative digital solutions as 
            <span className="text-slate-700 dark:text-slate-300 font-medium"> trusted partners</span>
          </motion.p>

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
        </motion.div>
      </motion.section>

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
      <section className="py-8 px-4 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">All Projects</h2>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-300 text-xs md:text-sm ${
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-neutral-200 dark:border-neutral-700 flex flex-col h-full"
              >
                {/* Responsive image container */}
                <div className="relative h-32 md:h-40 lg:h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-1.5 py-0.5 bg-slate-600 text-white text-[10px] md:text-xs rounded">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                {/* Content area with flex-grow */}
                <div className="p-2 md:p-3 lg:p-4 flex flex-col flex-grow">
                  <h3 className="text-sm md:text-base lg:text-lg font-bold mb-1 md:mb-2 line-clamp-2">{project.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2 md:line-clamp-3 flex-grow">
                    {project.description}
                  </p>
                  
                  {/* Technologies - responsive */}
                  <div className="hidden md:flex flex-wrap gap-1.5 mb-3 min-h-[24px]">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Button at bottom */}
                  <div className="mt-auto">
                    <Link
                      href={project.liveUrl}
                      className="block w-full text-center py-1.5 md:py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-xs md:text-sm"
                    >
                      View Project
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {filteredProjects.length > 4 && (
            <div className="text-center">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="inline-flex items-center gap-2 px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg group text-sm md:text-base"
              >
                {showAllProjects ? (
                  <>
                    Show Less Projects
                    <ArrowRight size={16} className="rotate-90 group-hover:translate-y-1 transition-transform" />
                  </>
                ) : (
                  <>
                    Show More Projects ({filteredProjects.length - 4} more)
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* See More Projects Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">
            Want to See More?
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
            We have worked on many more exciting projects across different industries. 
            Get in touch to discuss your project and see more examples of our work.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/Schedule"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg group"
            >
              <ExternalLink size={18} />
              Contact Us for More Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/Schedule"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg font-medium transition-all duration-300"
            >
              Schedule a Consultation
            </Link>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "50+", label: "Total Projects" },
              { value: "25+", label: "Happy Clients" },
              { value: "5+", label: "Industries Served" },
              { value: "100%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;