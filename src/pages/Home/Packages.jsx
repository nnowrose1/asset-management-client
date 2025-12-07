import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../customHooks/useaxios";
import { FaCheckCircle } from "react-icons/fa";

const Packages = () => {
  const axiosInstance = useAxios();

  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosInstance.get("/packages");
      return res.data;
    },
  });

  return (
    <div className="py-16">
      <div className="px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
          Choose Your Plan
        </h2>
        <p className="text-accent mb-12">
          Flexible pricing for businesses of all sizes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-8 border hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-secondary">
                {pkg.name}
              </h3>

              <p className="text-accent mt-2">
                Up to{" "}
                <span className="font-bold text-gray-700">
                  {pkg.employeeLimit}
                </span>{" "}
                employees
              </p>

              {/* Price */}
              <div className="mt-6 mb-6">
                <span className="text-4xl font-bold text-primary">
                  ${pkg.price}
                </span>
                <span className="text-accent"> / month</span>
              </div>

              {/* Features */}
              <ul className="text-left space-y-3">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <FaCheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className="mt-8 w-full bg-primary text-white py-2.5 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
