import React from "react";
import { FaSlack, FaGoogle, FaMicrosoft } from "react-icons/fa";

const Integrations = () => {
  const tools = [
    { icon: <FaSlack className="text-4xl text-primary" />, name: "Slack" },
    { icon: <FaGoogle className="text-4xl text-primary" />, name: "Google Workspace" },
    { icon: <FaMicrosoft className="text-4xl text-primary" />, name: "Microsoft 365" },
  ];

  return (
    <section className="py-16 px-6 md:px-20 bg-white rounded-md text-center max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
        Seamless Integrations
      </h2>
      <p className="text-accent mb-16">
        AssetNexus fits into your existing workflow with ease.
      </p>

      <div className="flex justify-center gap-12 flex-wrap">
        {tools.map((tool, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            {tool.icon}
            <span className="text-secondary font-medium">{tool.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Integrations;
