import React from "react";
import { MessageCircle, Lightbulb, Code, Rocket, Users } from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Discovery & Consultation",
    description: "We start by understanding your business goals, target audience, and technical requirements through detailed consultation sessions.",
    icon: MessageCircle,
    features: ["Business Analysis", "Requirement Gathering", "Competitive Research", "Strategy Planning"]
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description: "Our design team creates wireframes, mockups, and interactive prototypes to visualize your project before development begins.",
    icon: Lightbulb,
    features: ["UI/UX Design", "Interactive Prototypes", "User Journey Mapping", "Design System"]
  },
  {
    step: "03",
    title: "Development & Testing",
    description: "We build your project using modern technologies, following best practices for performance, security, and scalability.",
    icon: Code,
    features: ["Agile Development", "Quality Assurance", "Performance Testing", "Security Audits"]
  },
  {
    step: "04",
    title: "Launch & Optimization",
    description: "We deploy your project and provide ongoing support, monitoring, and optimization to ensure continued success.",
    icon: Rocket,
    features: ["Deployment", "Performance Monitoring", "SEO Optimization", "Analytics Setup"]
  },
  {
    step: "05",
    title: "Partnership & Growth",
    description: "Our relationship doesn't end at launch. We provide ongoing support, updates, and growth strategies for long-term success.",
    icon: Users,
    features: ["Ongoing Support", "Regular Updates", "Growth Strategy", "Partnership Management"]
  }
];

export function ProcessSection() {
  return (
    <section className="py-20 px-4 bg-neutral-50/50 dark:bg-neutral-900/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
              Our Partnership Process
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            We follow a proven methodology that ensures successful project delivery and long-term partnership success.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-12">
          {processSteps.map((process, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {process.step}
                  </div>
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <process.icon size={24} className="text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                  {process.title}
                </h3>
                
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {process.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {process.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Element */}
              <div className="flex-1 relative">
                <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-8 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white dark:bg-neutral-800 rounded-full shadow-lg flex items-center justify-center">
                    <process.icon size={48} className="text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                
                {/* Step Connector */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-12 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-white dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
              Ready to Start Your Project?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-center">
              Let&apos;s discuss your project and see how we can help you achieve your goals.
            </p>
            <div className="flex gap-3">
              <a
                href="/Schedule"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Schedule Consultation
              </a>
              <a
                href="/contact"
                className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 