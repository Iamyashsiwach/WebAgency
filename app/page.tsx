"use client";
import React, { Fragment } from "react";
import Link from "next/link";
import GridBackgroudLayout from "@/components/wrapper/GridBackgroudLayout/GridBackgroudLayout";
import MainComponent from "@/components/wrapper/MainComponent/MainComponent";
import { Cover } from "@/components/ui/cover";
import { ArrowRight, Star, CheckCircle, Code, Palette, Search, ShoppingCart, Smartphone, BarChart3, Users, Award, Target, Lightbulb, Rocket, TrendingUp } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Custom hook for intersection observer (commented out as not currently used)
// const useIntersectionObserver = (ref: React.RefObject<Element>, options: IntersectionObserverInit = {}) => {
//   const [isIntersecting, setIsIntersecting] = React.useState(false);
//   
//   React.useEffect(() => {
//     const element = ref.current;
//     if (!element) return;
//     
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsIntersecting(entry.isIntersecting);
//       },
//       { threshold: 0.1, ...options }
//     );
//     
//     observer.observe(element);
//     return () => observer.disconnect();
//   }, [ref, options]);
//   
//   return isIntersecting;
// };

// Typing animation component
const TypedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, delay + currentIndex * 1); // Much faster typing speed
    
    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);
  
  return (
    <span>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-0.5 h-6 bg-current ml-1"
        />
      )}
    </span>
  );
};

// Hero Section Component
const HeroSection = () => (
  <section className="hero-section-mobile relative min-h-screen flex items-start md:items-center justify-center px-4 py-4">
    {/* Background Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div 
        className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-400/10 rounded-full blur-xl"
        animate={{ x: [0, 15, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>

    <motion.div 
      className="max-w-6xl mx-auto text-center relative z-10 w-full mt-20 md:mt-0"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Trust Badge */}
      <motion.div 
        className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 rounded-full text-neutral-600 dark:text-neutral-300 text-xs md:text-sm font-medium mb-4 md:mb-8 text-center mx-auto max-w-[95vw]"
        variants={scaleIn}
      >
        <Star size={12} className="fill-current text-amber-500 flex-shrink-0 md:w-3.5 md:h-3.5" />
        <span className="whitespace-nowrap text-[10px] sm:text-xs md:text-sm">Partnership Excellence Since 2020</span>
        <span className="hidden sm:inline text-xs md:text-sm">•</span>
        <span className="hidden sm:inline whitespace-nowrap text-[10px] sm:text-xs md:text-sm">100+ Projects Delivered</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1 
        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight leading-tight"
        variants={fadeInUp}
      >
        <motion.span 
          className="bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-200 dark:via-white dark:to-neutral-300 bg-clip-text text-transparent"
          variants={fadeInLeft}
        >
        <TypedText text="We Don't Wait. We Fix." delay={200} />
        </motion.span>
        <br />
        <motion.span 
          className="text-xl sm:text-2xl md:text-4xl lg:text-5xl"
          variants={fadeInRight}
        >
          at <Cover>Lightning Speed</Cover>
        </motion.span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p 
        className="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed px-4"
        variants={fadeInUp}
      >
        Your trusted partner for comprehensive IT services including web development, mobile apps, 
        cloud solutions, cybersecurity, and digital transformation. We don&apos;t just build websites – 
        we deliver complete technology solutions that drive business growth.
      </motion.p>

            {/* Value Propositions */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-10 px-4"
        variants={staggerContainer}
      >
        {[
          "Full-Stack IT Services",
          "24/7 Tech Support",
          "Enterprise Solutions",
          "End-to-End Partnership"
        ].map((feature, index) => (
          <motion.div 
            key={index} 
            className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 bg-white/5 rounded-full text-xs md:text-sm text-neutral-600 dark:text-neutral-400"
            variants={scaleIn}
          >
            <CheckCircle size={12} className="text-green-500 flex-shrink-0" />
            <span className="whitespace-nowrap">{feature}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4">
        <Link
          href="/portfolio"
          className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 group shadow-lg text-sm md:text-base"
        >
          View Our Work
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="/Schedule"
          className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300 text-sm md:text-base"
        >
          Book Free Consultation
        </Link>
      </div>

      {/* Social Proof */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4">
        {[
          { value: "100+", label: "Projects Completed" },
          { value: "50+", label: "Happy Clients" },
          { value: "99%", label: "Success Rate" },
          { value: "4+", label: "Years Experience" }
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {stat.value}
            </div>
            <div className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </section>
);

// Services Overview Component
const ServicesOverview = () => {
  const services = [
    {
      icon: Code,
      title: "Web & Software Development",
      description: "Full-stack development including websites, web applications, enterprise software, and custom business solutions.",
      features: ["Custom Software", "Web Applications", "API Development"]
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
      features: ["Native Apps", "Cross-platform", "App Maintenance"]
    },
    {
      icon: Search,
      title: "Cloud & DevOps Solutions",
      description: "Cloud migration, infrastructure management, CI/CD pipelines, and scalable hosting solutions.",
      features: ["AWS/Azure/GCP", "DevOps Pipeline", "Cloud Migration"]
    },
    {
      icon: ShoppingCart,
      title: "E-commerce & CRM",
      description: "Complete e-commerce platforms, customer relationship management systems, and business automation tools.",
      features: ["Online Stores", "CRM Systems", "Business Automation"]
    },
    {
      icon: Palette,
      title: "UI/UX & Digital Design",
      description: "User-centered design for web, mobile, and enterprise applications with focus on usability and conversion.",
      features: ["UI/UX Design", "Brand Identity", "User Research"]
    },
    {
      icon: BarChart3,
      title: "IT Consulting & Support",
      description: "Strategic IT consulting, system integration, cybersecurity, and ongoing technical support services.",
      features: ["IT Strategy", "System Integration", "24/7 Support"]
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
              Complete IT Services That Drive Results
            </span>
          </motion.h2>
          <motion.p 
            className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            From software development to cloud infrastructure, we provide comprehensive IT solutions that help your business innovate and scale in the digital world.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12"
          initial="initial"
          whileInView="animate"
          variants={staggerContainer}
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="group p-4 md:p-6 bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
                variants={{
                  initial: { opacity: 0, y: 50, scale: 0.9 },
                  animate: { opacity: 1, y: 0, scale: 1 }
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                  <Icon size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
                
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-neutral-800 dark:text-neutral-200">
                  {service.title}
                </h3>
                
                <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-3 md:mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-neutral-500 dark:text-neutral-500 flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Explore All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

// Stats Section Component
const StatsSection = () => (
  <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
    <div className="max-w-6xl mx-auto text-center">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800 dark:text-neutral-200"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Proven Track Record
      </motion.h2>
      <motion.p 
        className="text-lg text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Numbers that speak louder than words. Here&apos;s what we&apos;ve achieved together with our partners.
      </motion.p>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        initial="initial"
        whileInView="animate"
        variants={staggerContainer}
        viewport={{ once: true }}
      >
        {[
          { icon: Users, value: "150+", label: "Happy Clients", color: "text-blue-600" },
          { icon: Rocket, value: "300+", label: "Projects Launched", color: "text-purple-600" },
          { icon: Award, value: "99%", label: "Success Rate", color: "text-green-600" },
          { icon: TrendingUp, value: "250%", label: "Avg. ROI Increase", color: "text-orange-600" },
          { icon: Target, value: "24/7", label: "Support Available", color: "text-red-600" },
          { icon: Lightbulb, value: "5+", label: "Years Experience", color: "text-indigo-600" }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={index} 
              className="text-center group"
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-neutral-800 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Icon size={28} className={stat.color} />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

// CTA Section Component  
const CTASection = () => (
  <section className="py-12 md:py-20 px-4 relative overflow-hidden">
    {/* Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800"></div>
    
    <motion.div 
      className="max-w-4xl mx-auto text-center relative z-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2 
        className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Ready to Transform Your Business with IT Solutions?
      </motion.h2>
      <motion.p 
        className="text-base md:text-xl text-blue-100 mb-6 md:mb-8 max-w-2xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        Join 150+ businesses that have accelerated their growth with our comprehensive IT services. 
        Let&apos;s build the technology foundation your business needs to thrive.
      </motion.p>
      
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8 px-4">
        <Link
          href="/Schedule"
          className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-blue-600 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm md:text-base"
        >
          Start Your Project Today
          <ArrowRight size={16} />
        </Link>
        <Link
          href="/portfolio"
          className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 text-sm md:text-base"
        >
          View Our Portfolio
        </Link>
      </div>
      
      <p className="text-blue-200 text-sm">
        Free consultation • No commitment required • 24/7 support
      </p>
    </motion.div>
  </section>
);

const Home = () => (
  <Fragment>
    <GridBackgroudLayout>
      <MainComponent>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Services Overview */}
        <ServicesOverview />
        
        {/* Stats & Achievements */}
        <StatsSection />
        
        {/* Final CTA */}
        <CTASection />
      </MainComponent>
    </GridBackgroudLayout>
    <Analytics />
    <SpeedInsights />
  </Fragment>
);

export default Home;
