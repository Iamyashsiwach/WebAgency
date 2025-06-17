"use client";
import { FC } from "react";
import Image from "next/image";
import { Users, Award, Coffee, Clock } from "lucide-react";

const teamMembers = [
  {
    name: "Yash Siwach",
    role: "Founder & Lead Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Full-stack developer with 5+ years of experience in modern web technologies.",
  },
  {
    name: "Sarah Johnson",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b550?w=400&h=400&fit=crop&crop=face",
    bio: "Creative designer passionate about user-centered design and accessibility.",
  },
  {
    name: "Michael Chen",
    role: "Marketing Specialist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Digital marketing expert specializing in SEO and content strategy.",
  },
  {
    name: "Emily Rodriguez",
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Experienced project manager ensuring seamless delivery and client satisfaction.",
  },
];

const stats = [
  { icon: Users, value: "50+", label: "Happy Clients" },
  { icon: Award, value: "100+", label: "Projects Completed" },
  { icon: Coffee, value: "1000+", label: "Cups of Coffee" },
  { icon: Clock, value: "24/7", label: "Support Available" },
];

const values = [
  {
    title: "Innovation",
    description: "We stay ahead of the curve by embracing cutting-edge technologies and methodologies.",
  },
  {
    title: "Quality",
    description: "Every project receives our full attention to detail and commitment to excellence.",
  },
  {
    title: "Collaboration",
    description: "We work closely with our clients as partners to achieve their vision.",
  },
  {
    title: "Integrity",
    description: "Honest communication and transparent processes are at the core of our business.",
  },
];

const AboutPage: FC = () => {
  return (
    <main className="container mx-auto px-4 py-16 space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold mb-6">About Web Agency</h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
          We are a passionate team of developers, designers, and digital strategists dedicated to 
          creating exceptional web experiences that drive business growth and user engagement.
        </p>
      </section>

      {/* Our Story */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Our Story</h2>
          <div className="space-y-4 text-lg text-neutral-600 dark:text-neutral-300">
            <p>
              Founded in 2020, Web Agency started as a small team with a big vision: to democratize 
              access to high-quality web development and digital marketing services.
            </p>
            <p>
              What began as a passion project has evolved into a full-service digital agency, 
              serving clients from startups to established enterprises across various industries.
            </p>
            <p>
              Today, we combine technical expertise with creative innovation to deliver solutions 
              that not only meet our clients&apos; immediate needs but also position them for future success.
            </p>
          </div>
        </div>
        <div className="relative h-96 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
            alt="Team working together"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-neutral-100 dark:bg-neutral-800/50 rounded-2xl p-12">
        <h2 className="text-4xl font-bold text-center mb-12">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <Icon className="text-white" size={24} />
                </div>
                <div className="text-3xl font-bold text-blue-500">{stat.value}</div>
                <div className="text-neutral-600 dark:text-neutral-300">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Values */}
      <section className="space-y-12">
        <h2 className="text-4xl font-bold text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-blue-500">{value.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Meet Our Team</h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            The talented individuals behind every successful project
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-blue-500 font-medium">{member.role}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-12">
        <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
        <p className="text-xl leading-relaxed max-w-4xl mx-auto">
          To empower businesses with innovative digital solutions that enhance their online presence, 
          streamline their operations, and connect them meaningfully with their audiences in an 
          ever-evolving digital landscape.
        </p>
      </section>
    </main>
  );
};

export default AboutPage; 