import { Globe } from "@/components/magicui/globe";
import StyledLink from "@/components/ui/StyledLink/StyledLink";
import { Github, Linkedin, Twitter } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Schedule", href: "/Schedule" },
];

const serviceLinks = [
  { name: "Web Development", href: "/services" },
  { name: "UI/UX Design", href: "/services" },
  { name: "SEO & Marketing", href: "/services" },
  { name: "E-commerce", href: "/services" },
];

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/iamyashsiwach", icon: Twitter },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/yash-siwach", icon: Linkedin },
  { name: "GitHub", href: "https://github.com/iamyashsiwach", icon: Github },
];

export function Footer() {
  return (
    <footer className="relative bg-neutral-900 text-white overflow-hidden">
      {/* Globe Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        {/* Mobile Globe */}
        <div className="block sm:hidden absolute -left-1/2 top-1/2 -translate-y-1/2 w-full h-full">
          <Globe className="w-full h-full scale-75" />
        </div>
        {/* Desktop Globe */}
        <div className="hidden sm:block absolute -left-1/4 top-0 w-3/5 h-full">
          <Globe className="w-full h-full" />
        </div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-16">
        {/* Mobile Layout - 80% Screen Height */}
        <div className="block sm:hidden h-[80vh] flex flex-col justify-between py-4">
          {/* Company Info & Portfolio CTA - Mobile */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2">Web Agency</h3>
            <p className="text-neutral-300 text-sm mb-4">
              Partnership Excellence Since 2020
            </p>
            {/* Portfolio as Important Link */}
            <StyledLink 
              href="/portfolio"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 text-base mb-4 shadow-lg"
            >
              🎯 View Our Portfolio
            </StyledLink>
          </div>

          {/* Navigation Links Grid - Mobile */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-blue-400">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <StyledLink 
                      href={link.href}
                      className="text-neutral-300 hover:text-white transition-colors text-sm block py-1"
                    >
                      {link.name}
                    </StyledLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-purple-400">Our Services</h4>
              <ul className="space-y-2">
                {serviceLinks.map((link) => (
                  <li key={link.name}>
                    <StyledLink 
                      href={link.href}
                      className="text-neutral-300 hover:text-white transition-colors text-sm block py-1"
                    >
                      {link.name}
                    </StyledLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Additional Links Section */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Company Info */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-green-400">Company</h4>
              <ul className="space-y-2">
                <li>
                  <StyledLink 
                    href="/about"
                    className="text-neutral-300 hover:text-white transition-colors text-sm block py-1"
                  >
                    Our Story
                  </StyledLink>
                </li>
                <li>
                  <StyledLink 
                    href="/about#team"
                    className="text-neutral-300 hover:text-white transition-colors text-sm block py-1"
                  >
                    Our Team
                  </StyledLink>
                </li>
                <li>
                  <StyledLink 
                    href="/about#values"
                    className="text-neutral-300 hover:text-white transition-colors text-sm block py-1"
                  >
                    Our Values
                  </StyledLink>
                </li>
                <li>
                  <StyledLink 
                    href="/Schedule"
                    className="text-neutral-300 hover:text-white transition-colors text-sm block py-1"
                  >
                    Careers
                  </StyledLink>
                </li>
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-orange-400">Support</h4>
              <ul className="space-y-2">
                <li>
                  <StyledLink 
                    href="/Schedule"
                    className="text-neutral-300 hover:text-white transition-colors text-sm block py-1"
                  >
                    Get Support
                  </StyledLink>
                </li>
                <li>
                  <StyledLink 
                    href="/Schedule"
                    className="text-neutral-300 hover:text-white transition-colors text-sm block py-1"
                  >
                    Request Quote
                  </StyledLink>
                </li>
                <li>
                  <StyledLink 
                    href="/privacy"
                    className="text-neutral-300 hover:text-white transition-colors text-sm block py-1"
                  >
                    Privacy Policy
                  </StyledLink>
                </li>
                <li>
                  <StyledLink 
                    href="/terms"
                    className="text-neutral-300 hover:text-white transition-colors text-sm block py-1"
                  >
                    Terms of Service
                  </StyledLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact & Social Section */}
          <div className="text-center mb-6">
            <h4 className="text-sm font-semibold mb-3 text-cyan-400">Connect With Us</h4>
            <div className="flex justify-center gap-4 mb-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-all duration-300 hover:-translate-y-1"
                    aria-label={link.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
            <StyledLink 
              href="/Schedule"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              Start Your Project
            </StyledLink>
          </div>

          {/* Copyright - Mobile */}
          <div className="text-center pt-4 border-t border-neutral-700">
            <p className="text-neutral-400 text-sm">
              © 2025 Web Agency Partnership. All rights reserved.
            </p>
            <p className="text-neutral-500 text-xs mt-1">
              Built with Next.js & ❤️
            </p>
          </div>
        </div>

        {/* Tablet and Desktop Layout */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info */}
            <div className="col-span-2 lg:col-span-1 space-y-4">
              <h3 className="text-xl lg:text-2xl font-bold">Web Agency</h3>
              <p className="text-neutral-300 leading-relaxed text-sm lg:text-base">
                A trusted partnership since 2020, delivering innovative web development, UI/UX design, 
                SEO, and digital marketing solutions that drive exceptional results.
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 lg:p-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-all duration-300 hover:-translate-y-1"
                      aria-label={link.name}
                    >
                      <Icon size={18} className="lg:w-5 lg:h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links Section - Quick Links and Services side by side on tablet */}
            <div className="col-span-2 lg:col-span-2">
              <div className="grid grid-cols-2 gap-6 sm:gap-8">
                {/* Navigation */}
                <div className="space-y-4">
                  <h4 className="text-base lg:text-lg font-semibold">Quick Links</h4>
                  <ul className="space-y-2 lg:space-y-3">
                    {navLinks.map((link) => (
                      <li key={link.name}>
                        <StyledLink 
                          href={link.href}
                          className="text-neutral-300 hover:text-white transition-colors duration-300 text-sm lg:text-base"
                        >
                          {link.name}
                        </StyledLink>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div className="space-y-4">
                  <h4 className="text-base lg:text-lg font-semibold">Our Services</h4>
                  <ul className="space-y-2 lg:space-y-3">
                    {serviceLinks.map((link) => (
                      <li key={link.name}>
                        <StyledLink 
                          href={link.href}
                          className="text-neutral-300 hover:text-white transition-colors duration-300 text-sm lg:text-base"
                        >
                          {link.name}
                        </StyledLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-span-1 space-y-4">
              <h4 className="text-base lg:text-lg font-semibold">Partner With Us</h4>
              <div className="space-y-3 lg:space-y-4">
                <p className="text-neutral-300 text-sm lg:text-base">
                  Ready to transform your digital presence through our collaborative partnership?
                </p>
                <StyledLink 
                  href="/Schedule"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 text-sm lg:text-base"
                >
                  Start Partnership
                </StyledLink>
                <div className="text-xs lg:text-sm text-neutral-400 pt-2">
                  <p>Partnership Excellence Since 2020</p>
                  <p className="mt-1">Building digital futures together</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-t border-neutral-700 pt-6 lg:pt-8 mt-8 lg:mt-12">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-neutral-400 text-xs lg:text-sm text-center sm:text-left">
                © 2025 Web Agency Partnership. All rights reserved. Built with Next.js & ❤️
              </p>
              <div className="flex flex-wrap justify-center sm:justify-end gap-4 lg:gap-6 text-xs lg:text-sm">
                <StyledLink href="/privacy" className="text-neutral-400 hover:text-white transition-colors">
                  Privacy Policy
                </StyledLink>
                <StyledLink href="/terms" className="text-neutral-400 hover:text-white transition-colors">
                  Terms of Service
                </StyledLink>
                <StyledLink href="/cookies" className="text-neutral-400 hover:text-white transition-colors">
                  Cookie Policy
                </StyledLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}