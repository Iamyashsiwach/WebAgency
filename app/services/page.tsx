"use client";
import { FC } from "react";
// import { Showcase } from "@/app/sections/cards";

const services = [
  {
    title: "Web Development",
    description: "We build modern, responsive, and high-performing websites tailored to your business needs. From simple landing pages to complex web applications, we have you covered.",
  },
  {
    title: "UI/UX Design",
    description: "Our design team creates intuitive and engaging user interfaces that provide a seamless user experience. We focus on user-centric designs that are both beautiful and functional.",
  },
  {
    title: "SEO & Digital Marketing",
    description: "Boost your online visibility and reach your target audience with our comprehensive SEO and digital marketing strategies. We help you rank higher in search results and grow your online presence.",
  },
  {
    title: "E-commerce Solutions",
    description: "We provide end-to-end e-commerce solutions to help you sell your products online. Our platforms are secure, scalable, and optimized for conversions.",
  },
  {
    title: "Branding & Identity",
    description: "Your brand is more than just a logo. We help you craft a compelling brand identity that resonates with your audience and sets you apart from the competition.",
  },
  {
    title: "AI Integration",
    description: "Leverage the power of artificial intelligence to automate tasks, gain insights, and enhance user engagement. We integrate AI-powered features like chatbots and recommendation engines.",
  },
];

const ServicesPage: FC = () => {
  return (
    <main>
      {/* Hero Showcase Section */}
      {/* <Showcase /> */}
      
      {/* Detailed Services Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-4 text-center">What We Offer</h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-12 text-center max-w-3xl mx-auto">
          From concept to deployment, we provide comprehensive digital solutions that drive growth and deliver exceptional user experiences.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-neutral-100 dark:bg-neutral-800/50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ServicesPage; 