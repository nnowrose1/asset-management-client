import React from "react";
import { FaClock, FaShieldAlt, FaChartLine } from "react-icons/fa";

const Benefits = () => {
  const benefits = [
    {
      icon: <FaClock className="text-primary text-3xl" />,
      title: "Save Time",
      desc: "Automate asset tracking, approvals, and reporting — no more spreadsheets or manual follow-ups.",
    },
    {
      icon: <FaShieldAlt className="text-primary text-3xl" />,
      title: "Reduce Risk",
      desc: "Prevent asset loss with accountability, request history, and return tracking.",
    },
    {
      icon: <FaChartLine className="text-primary text-3xl" />,
      title: "Make Better Decisions",
      desc: "Get insights into asset usage, demand trends, and package limits to optimize spending.",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-20 rounded-md">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-4">
        Why Choose AssetNexus?
      </h2>

      <p className="text-accent text-center max-w-2xl mx-auto mb-16">
  We combine innovation, reliability, and customer focus to deliver solutions that truly make a difference. Our dedicated team works tirelessly to ensure you get the best experience, seamless performance, and measurable results—because your success is our priority.
</p>


      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
          >
            <div className="mb-4 flex justify-center">{item.icon}</div>
            <h3 className="text-xl font-semibold text-primary mb-2">
              {item.title}
            </h3>
            <p className="text-accent">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
