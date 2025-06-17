import React from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Calendar, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main CTA */}
        <div className="text-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-12 mb-12 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }} />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <Sparkles size={16} />
              Ready to Transform Your Business?
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Let&apos;s Build Something
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h2>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join 50+ businesses that have transformed their digital presence with our partnership approach. 
              Your success story starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/Schedule"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                <Calendar size={20} />
                Schedule Free Consultation
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/chatbot"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-lg font-bold hover:bg-white/10 transition-all duration-300"
              >
                <MessageCircle size={20} />
                Chat with AI Assistant
              </Link>
            </div>
          </div>
        </div>

        {/* Alternative Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-2">
              Quick Chat
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
              Get instant answers with our AI-powered chat system available 24/7.
            </p>
            <Link
              href="/chatbot"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Start Chatting →
            </Link>
          </div>

          <div className="text-center p-6 bg-white dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calendar size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-2">
              Book a Call
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
              Schedule a personalized consultation to discuss your project in detail.
            </p>
            <Link
              href="/Schedule"
              className="text-green-600 dark:text-green-400 font-medium hover:underline"
            >
              Book Now →
            </Link>
          </div>

          <div className="text-center p-6 bg-white dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ArrowRight size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-2">
              View Our Work
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
              Explore our portfolio to see what we can achieve together.
            </p>
            <Link
              href="/portfolio"
              className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
            >
              See Portfolio →
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Trusted by businesses worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold">TechFlow</div>
            <div className="text-2xl font-bold">Luxe Fashion</div>
            <div className="text-2xl font-bold">HealthTech</div>
            <div className="text-neutral-400">+ 47 more companies</div>
          </div>
        </div>
      </div>
    </section>
  );
} 