import React from "react";
import { FaChartLine, FaCogs, FaShieldAlt, FaUsersCog } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaCogs className="text-primary text-3xl" />,
      title: "Centralized Asset Control",
      desc: "Manage all company assets from a unified dashboard—no more spreadsheets or lost equipment.",
    },
    {
      icon: <FaUsersCog className="text-primary text-3xl" />,
      title: "Employee-Asset Tracking",
      desc: "Track which employee holds which asset across multiple teams or companies.",
    },
    {
      icon: <FaShieldAlt className="text-primary text-3xl" />,
      title: "Secure & Role-Based",
      desc: "HR managers, admins, and employees get the right level of access for secure and efficient workflows.",
    },
    {
      icon: <FaChartLine className="text-primary text-3xl" />,
      title: "Data Insights & Transparency",
      desc: "Monitor usage trends, asset allocation history, and availability data in real time.",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-20">
      <div
        className="relative bg-cover bg-center py-16 px-4 min-h-[50vh]"
        style={{
          backgroundImage: "url('/slide1.jpg')",
        }}
      >
        {/* <div className="absolute inset-0 bg-black/60"></div> */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              About AssetNexus
            </h2>
            <p className="text-accent text-center max-w-2xl mx-auto mb-12">
              AssetNexus is a modern B2B platform designed to help companies
              simplify their HR and asset management workflows. From onboarding
              to asset allocation—everything stays organized, secure, and
              transparent.
            </p>
          </div>
        
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-md transition"
          >
            <div className="flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold text-secondary text-center mb-2">
              {item.title}
            </h3>
            <p className="text-accent text-center text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
