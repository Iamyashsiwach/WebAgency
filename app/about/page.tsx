"use client";
import { FC } from "react";
import Image from "next/image";
import { Users, Award, Coffee, Clock } from "lucide-react";
import { motion } from "framer-motion";

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

const AboutPage: FC = () => {
  return (
    <main className="container mx-auto px-4 py-16 pt-24 space-y-20"> {/* Add padding for navbar */}
      {/* Hero Section */}
      <motion.section 
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          About Web Agency
        </motion.h1>
        <motion.p 
          className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          We are a passionate team of developers, designers, and digital strategists dedicated to 
          creating exceptional web experiences that drive business growth and user engagement.
        </motion.p>
      </motion.section>

      {/* Our Story */}
      <motion.section 
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Our Story
          </motion.h2>
          <motion.div 
            className="space-y-4 text-lg text-neutral-600 dark:text-neutral-300"
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <motion.p variants={fadeInUp}>
              Founded in 2020, Web Agency started as a small team with a big vision: to democratize 
              access to high-quality web development and digital marketing services.
            </motion.p>
            <motion.p variants={fadeInUp}>
              What began as a passion project has evolved into a full-service digital agency, 
              serving clients from startups to established enterprises across various industries.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Today, we combine technical expertise with creative innovation to deliver solutions 
              that not only meet our clients&apos; immediate needs but also position them for future success.
            </motion.p>
          </motion.div>
        </motion.div>
        <motion.div 
          className="relative h-96 rounded-lg overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
            alt="Team working together"
            fill
            className="object-cover"
          />
        </motion.div>
      </motion.section>

      {/* Statistics */}
      <motion.section 
        className="bg-neutral-100 dark:bg-neutral-800/50 rounded-2xl p-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our Impact
        </motion.h2>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial="initial"
          whileInView="animate"
          variants={staggerContainer}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={index} 
                className="text-center space-y-4"
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mx-auto w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <Icon className="text-white" size={24} />
                </div>
                <div className="text-3xl font-bold text-blue-500">{stat.value}</div>
                <div className="text-neutral-600 dark:text-neutral-300">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* Values */}
      <motion.section 
        className="space-y-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-4xl font-bold text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our Values
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="initial"
          whileInView="animate"
          variants={staggerContainer}
          viewport={{ once: true }}
        >
          {values.map((value, index) => (
            <motion.div 
              key={index} 
              className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-md"
              variants={scaleIn}
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-500">{value.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="space-y-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Meet Our Team
          </motion.h2>
          <motion.p 
            className="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            The talented individuals behind every successful project
          </motion.p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="initial"
          whileInView="animate"
          variants={staggerContainer}
          viewport={{ once: true }}
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index} 
              className="text-center space-y-4"
              variants={scaleIn}
              whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="relative w-32 h-32 mx-auto rounded-full overflow-hidden"
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-blue-500 font-medium">{member.role}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2">
                  {member.bio}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Mission Statement */}
      <motion.section 
        className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-12"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      >
        <motion.h2 
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our Mission
        </motion.h2>
        <motion.p 
          className="text-xl leading-relaxed max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          To empower businesses with innovative digital solutions that enhance their online presence, 
          streamline their operations, and connect them meaningfully with their audiences in an 
          ever-evolving digital landscape.
        </motion.p>
      </motion.section>
    </main>
  );
};

export default AboutPage; 