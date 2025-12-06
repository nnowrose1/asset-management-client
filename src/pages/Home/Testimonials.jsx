import React from "react";
import Marquee from "react-fast-marquee";
import {
  FaBuilding,
  FaCheckCircle,
  FaQuoteLeft,
  FaUsers,
} from "react-icons/fa";

const Testimonials = () => {
  const stats = [
    {
      icon: <FaBuilding className="text-primary text-3xl" />,
      label: "100+ Companies",
      desc: "trust AssetNexus for daily operations",
    },
    {
      icon: <FaUsers className="text-primary text-3xl" />,
      label: "5,000+ Employees",
      desc: "managed across multiple industries",
    },
    {
      icon: <FaCheckCircle className="text-primary text-3xl" />,
      label: "15,000+ Assets",
      desc: "tracked, assigned & monitored",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Thompson",
      role: "HR Director, NexaCorp",
      comment:
        "AssetNexus solved our asset chaos instantly. The auto-affiliation system is brilliant — it reduced our manual workload by 60%.",
    },
    {
      name: "David Patel",
      role: "Operations Lead, TechNova",
      comment:
        "We track all employee equipment effortlessly now. The approval workflow is smooth, and our inventory accuracy skyrocketed.",
    },
    {
      name: "Emily Carter",
      role: "HR Manager, CloudSync Ltd.",
      comment:
        "The best part is multi-company support. Our contractors work with several teams, and AssetNexus handles it perfectly.",
    },
  ];
  return (
    <section className="py-16 px-6 md:px-20">
      {/* Stats Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
          Trusted by Companies Worldwide
        </h2>
        <p className="text-accent mb-10">
          AssetNexus is powering asset operations for organizations of all
          sizes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {stats.map((s, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-3">{s.icon}</div>
              <h3 className="text-xl font-bold text-primary">{s.label}</h3>
              <p className="text-accent text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-secondary text-center mb-6">
          What Our Clients Say
        </h3>
        <Marquee
          pauseOnHover={true}
          speed={40}
          gradient={false}
          className="py-4"
        >
          <div className="space-y-8">
            {testimonials.map((t, i) => (
              <div key={i} className="relative pl-10">
                <FaQuoteLeft className="absolute left-0 top-1 text-primary text-2xl" />

                <p className="text-secondary text-lg leading-relaxed mb-3">
                  "{t.comment}"
                </p>
                <div>
                  <h4 className="text-primary font-semibold">{t.name}</h4>
                  <p className="text-accent text-sm">{t.role}</p>
                </div>

                {/* Divider */}
                {i !== testimonials.length - 1 && (
                  <div className="w-full h-px bg-gray-200 mt-6"></div>
                )}
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default Testimonials;
