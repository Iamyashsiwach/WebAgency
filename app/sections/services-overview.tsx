import React from "react";
import Link from "next/link";
import { Code, Palette, Search, ShoppingCart, Smartphone, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies like Next.js, React, and TypeScript.",
    features: ["Responsive Design", "Performance Optimized", "SEO Ready"]
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design that combines aesthetics with functionality to create engaging digital experiences.",
    features: ["User Research", "Wireframing", "Prototyping"]
  },
  {
    icon: Search,
    title: "SEO & Marketing",
    description: "Data-driven digital marketing strategies to increase your online visibility and drive qualified traffic.",
    features: ["Keyword Research", "Content Strategy", "Analytics"]
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    description: "Complete online store development with payment integration, inventory management, and conversion optimization.",
    features: ["Payment Integration", "Inventory System", "Mobile Commerce"]
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.",
    features: ["iOS & Android", "Cross-platform", "App Store Optimization"]
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Comprehensive tracking and reporting to measure performance and optimize your digital presence.",
    features: ["Performance Tracking", "User Behavior", "ROI Analysis"]
  }
];

export function ServicesOverview() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
              Services That Drive Results
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            From concept to launch, we provide end-to-end digital solutions that help your business thrive in the digital landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group p-6 bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                  <Icon size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-neutral-800 dark:text-neutral-200">
                  {service.title}
                </h3>
                
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
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
              </div>
            );
          })}
        </div>

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
} 