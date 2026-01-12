import React from "react";
import { Link } from "react-router";


const CallToAction = () => {
  return (
    <section className="py-20 px-6 md:px-20 bg-primary text-white text-center rounded-t-3xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Simplify Asset Management?
      </h2>
      <p className="max-w-2xl mx-auto mb-8 text-white/90">
        Join companies who trust AssetNexus to manage, track, and optimize their assets effortlessly.
      </p>

      <Link
        to="/employeeRegister"
        className="inline-block bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
      >
        Get Started for Free
      </Link>
    </section>
  );
};

export default CallToAction;
