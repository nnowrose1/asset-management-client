import React from "react";
import { FaUserPlus, FaUsersCog, FaBoxOpen } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-primary text-3xl" />,
      title: "Register & Set Up",
      desc: "HR creates a company account and instantly gets a default asset package. Employees can register separately and access their dashboards.",
    },
    {
      icon: <FaUsersCog className="text-primary text-3xl" />,
      title: "Manage Employees",
      desc: "Employees become affiliated automatically when HR approves their first asset request. Supports multi-company associations and package limits.",
    },
    {
      icon: <FaBoxOpen className="text-primary text-3xl" />,
      title: "Track & Assign Assets",
      desc: "HR adds assets, assigns items, approves requests, and manages returns — all with complete visibility and tracking.",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-20 bg-white">
      
        <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-4">
          How AssetNexus Works
        </h2>
        <p className="text-accent text-center max-w-2xl mx-auto mb-16">
          A streamlined workflow designed for HR teams and employees to manage assets effortlessly.
        </p>

        {/* Timeline */}
        <div className="relative border-l-4 border-primary ml-4">
          {steps.map((step, index) => (
            <div key={index} className="mb-8 ml-8">
              {/* Icon circle */}
              <div className="absolute -left-6 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                {step.icon}
              </div>

              <h3 className="text-2xl font-semibold text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-accent max-w-xl leading-relaxed">
                {step.desc}
              </p>

              {/* Connector line spacing */}
              {index !== steps.length - 1 && (
                <div className="h-10 border-l-4 border-blue-300 ml-2"></div>
              )}
            </div>
          ))}
        </div>
   
    </section>
  );
};

export default HowItWorks;
