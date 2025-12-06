import React from 'react';
import { FaBuilding, FaChartPie, FaExchangeAlt, FaLaptopCode} from 'react-icons/fa';

const Features = () => {
     const features = [
    {
      icon: <FaLaptopCode className="text-primary text-4xl" />,
      title: "Smart Asset Tracking",
      desc: "Track all company equipments in real time with complete visibility and accuracy.",
    },
    {
      icon: <FaExchangeAlt className="text-primary text-4xl" />,
      title: "Assign & Return Management",
      desc: "Easily assign assets to employees and simplify the return workflow with full transparency.",
    },
   {
      icon: <FaBuilding className="text-primary text-4xl" />,
      title: "Multi-Company Support",
      desc: "Employees can work with multiple companies while keeping their assets organized.",
    },
    {
      icon: <FaChartPie className="text-primary text-4xl" />,
      title: "Analytics & Insights",
      desc: "Visualize asset usage, status, and allocation trends for better decision-making.",
    },
  ];

    return (
        <section className="py-16 px-6 md:px-20 bg-white">
      
        <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-4">
          Powerful Features Built for Modern Teams
        </h2>
        <p className="text-accent text-center max-w-2xl mx-auto mb-12">
          AssetNexus gives HR teams and companies the tools they need to manage assets
          effortlessly and maintain operational clarity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f, index) => (
            <div
              key={index}
              className="p-8 bg-gray-50 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-md transition border border-gray-100"
            >
              <div className="flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-primary text-center mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
    
    </section>
    );
};

export default Features;