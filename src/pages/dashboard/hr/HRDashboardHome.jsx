import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Legend, Cell } from "recharts";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import useAuth from "../../../customHooks/useAuth";

const HRDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const COLORS = ["#1E88E5", "#F59E0B"];

  // top 5 most requested assets
  const { data: topAssets = []} = useQuery({
    queryKey: ["topAssets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests/topAssets");
      return res.data;
    },
  });

// returnable vs. non-returnable assets
const {data: returnableAssetCount = []} = useQuery({
    queryKey: ['returnable'],
    queryFn: async() => {
        const res = await axiosSecure.get('/assets/returnableDistribution');
        return res.data
    }
})  

  //total employees
  const { data: employees = [] } = useQuery({
    queryKey: ["employees", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employees?email=${user?.email}`);
      return res.data;
    },
  
  });

  //total assets
  const { data: assets = [] } = useQuery({
    queryKey: ["assets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets?email=${user.email}`);
      return res.data;
    },
    
  });

 return (
    <div className="p-6 space-y-8">
      
      <div className="flex flex-col md:flex-row md:justify-between items-center bg-white shadow rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-secondary">
          Hello, {user?.name || "HR"}!
        </h2>
        <span className="mt-2 md:mt-0 bg-blue-100 text-primary font-semibold px-4 py-2 rounded-full">
          Current Package: {user?.subscription || "Free"}
        </span>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6 flex flex-col gap-2 items-center justify-center hover:-translate-y-2 transition-transform duration-200">
          <h2 className="text-2xl text-secondary font-semibold">Total Employees</h2>
          <p className="text-3xl font-bold text-primary">{employees.length}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 flex flex-col gap-2 items-center justify-center hover:-translate-y-2 transition-transform duration-200">
          <h2 className="text-2xl text-secondary font-semibold">Total Assets</h2>
          <p className="text-3xl font-bold text-primary">{assets.length}</p>
        </div>

{/* pie chart */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col gap-2 items-center justify-center hover:-translate-y-2 transition-transform duration-200">
          <h2 className="text-2xl text-secondary font-semibold">Returnable vs Non-returnable</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={returnableAssetCount}
                dataKey="count"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                label
              >
                {returnableAssetCount.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend  verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl text-secondary text-center mb-4 font-semibold">
          Top Requested Assets
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topAssets}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="assetName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#1E88E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default HRDashboardHome;
