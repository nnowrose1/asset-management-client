import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import { Link } from "react-router";
import useAuth from "../../../customHooks/useAuth";

const UpgradePackage = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  const handleGetPackage = async(pkg) => {
      const paymentInfo = {
        cost: pkg.price,
        packageName: pkg.name,
        packageId: pkg._id,
        currentPackageLimit: user.packageLimit,
        purchasedPackageLimit: pkg.employeeLimit,
        userId: user._id,
        userEmail: user.email

      }
      const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
      window.location.href = res.data.url;
  }
  return (
    <div className="py-6">
      <h2 className="text-3xl font-semibold text-center text-secondary mb-6">
        Choose Your Package
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`border rounded-2xl p-6 hover:-translate-y-2 shadow-md hover:shadow-xl transition-all
              ${
                pkg.name === "Premium"
                  ? "border-primary bg-blue-50"
                  : "border-gray-200 bg-white"
              }
            `}
          >
            {/* Package Name */}
            <h3 className="text-2xl font-semibold text-secondary text-center">
              {pkg.name}
            </h3>

            {/* Price */}
            <p className="text-center text-primary font-bold text-3xl my-4">
              ${pkg.price}
              <span className="text-base text-accent font-normal">/mo</span>
            </p>

            {/* Employee Limit */}
            <p className="text-center text-secondary mb-4">
              Up to <span className="font-semibold">{pkg.employeeLimit}</span>{" "}
              employees
            </p>

            {/* Features */}
            <ul className="space-y-2 mb-6">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-secondary">
                  ✅ <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <div className="text-center">
                {/* <Link to={`/dashboard/payment/${pkg._id}`}> */}
              <button
              onClick={() => handleGetPackage(pkg)}
               className="w-full bg-primary text-white py-2 rounded-xl hover:bg-blue-800 transition-all font-semibold">
                Get Package
              </button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpgradePackage;
