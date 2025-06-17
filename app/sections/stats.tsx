import React from "react";
import { TrendingUp, Users, Award, Clock, Globe, Zap } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50+",
    label: "Happy Clients",
    description: "Businesses we've helped grow"
  },
  {
    icon: Award,
    value: "100+",
    label: "Projects Completed",
    description: "Successful deliveries since 2020"
  },
  {
    icon: TrendingUp,
    value: "99%",
    label: "Client Satisfaction",
    description: "Based on client feedback"
  },
  {
    icon: Clock,
    value: "24/7",
    label: "AI Support",
    description: "Round-the-clock assistance"
  },
  {
    icon: Globe,
    value: "15+",
    label: "Countries Served",
    description: "Global partnership reach"
  },
  {
    icon: Zap,
    value: "48h",
    label: "Average Response",
    description: "Lightning-fast turnaround"
  }
];

export function StatsSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
              Partnership by Numbers
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Our track record speaks for itself. Here are the numbers that showcase our commitment to excellence.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-8 bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/30 transition-colors">
                  <Icon size={32} className="text-blue-600 dark:text-blue-400" />
                </div>
                
                <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Achievement Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-600/20">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              Industry Recognition
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Featured in top web development showcases and industry publications.
            </p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-green-600/10 to-blue-600/10 rounded-xl border border-green-600/20">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
              Partnership Excellence
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Long-term partnerships with 90% of our clients returning for additional projects.
            </p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-xl border border-purple-600/20">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              Innovation Leaders
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Early adopters of AI integration and cutting-edge web technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 