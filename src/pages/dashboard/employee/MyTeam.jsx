import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import useAuth from "../../../customHooks/useAuth";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedCompany, setSelectedCompany] = useState("");

  const { data: companies = [] } = useQuery({
    queryKey: ["company", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/companies?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: employees = [] } = useQuery({
    queryKey: ["employees", selectedCompany],
    enabled: !!selectedCompany,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/employees?companyName=${selectedCompany}`
      );

      return res.data;
    },
  });
  //  console.log(employees);

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data; // each user has dateOfBirth
    },
  });

  const employeesWithDOB = employees.map((emp) => {
    const user = users.find((u) => u.email === emp.employeeEmail);
    return {
      ...emp,
      dateOfBirth: user?.dateOfBirth || null,
    };
  });

  console.log(employeesWithDOB);

  const getCurrentMonthBirthdays = (employees) => {
    const currentMonth = new Date().getMonth();
    const today = new Date().getDate();

    return employees
      .filter((emp) => emp.dateOfBirth)
      .map((emp) => {
        const dob = new Date(emp.dateOfBirth);
        return {
          ...emp,
          birthDay: dob.getDate(),
          birthMonth: dob.getMonth(),
        };
      })
      .filter((emp) => emp.birthMonth === currentMonth)
      .sort((a, b) => a.birthDay - b.birthDay);
  };

  const upcomingBirthdays = getCurrentMonthBirthdays(employeesWithDOB);

  return (
    <div className="px-6 py-6">
      <h2 className="text-3xl font-semibold text-secondary mb-4 text-center">
        My Team
      </h2>

      {/* Company Selector Tabs */}
      <div className="flex justify-center mb-6 space-x-4">
        {companies.length === 0 ? (
          <h2 className="text-3xl font-semibold text-primary my-6 text-center">
            No Company Affiliation
          </h2>
        ) : (
          companies.map((company) => (
            <button
              key={company}
              className={`px-4 py-2 rounded-lg font-semibold ${
                selectedCompany === company
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-200 text-secondary hover:bg-gray-300"
              }`}
              onClick={() => setSelectedCompany(company)}
            >
              {company}
            </button>
          ))
        )}
      </div>

      {/* Upcoming Birthdays
      {upcomingBirthdays.length > 0 && (
        <div className="mb-6 bg-yellow-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Upcoming Birthdays 🎉</h3>
          <ul className="list-disc list-inside">
            {upcomingBirthdays.map((emp) => (
              <li key={emp.email}>
                {emp.name} - {new Date(emp.birthday).toLocaleDateString("en-US", { month: 'long', day: 'numeric' })}
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {/* Employee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {employees.map((emp) => (
          <div
            key={emp.employeeEmail}
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-24 h-24 mb-4">
              <img
                src={emp.employeeImage}
                alt={emp.employeeName}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <h4 className="font-semibold text-lg">{emp.employeeName}</h4>

            <p className="text-accent text-sm truncate">
              Email: {emp.employeeEmail}
            </p>
          </div>
        ))}
      </div>

      {/* upcoming Birthdays */}
      {
        selectedCompany && 
        <div className="mt-10 bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">
          🎂 Upcoming Birthdays (This Month)
        </h3>

        {upcomingBirthdays.length === 0 ? (
          <p className="text-accent">No birthdays this month</p>
        ) : (
          <ul className="space-y-3">
            {upcomingBirthdays.map((emp) => (
              <li
                key={emp._id}
                className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg"
              >
                <img
                  src={emp.employeeImage}
                  alt={emp.employeeName}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium">{emp.employeeName}</p>
                  {/* <p className="text-sm text-accent">{emp.position}</p> */}
                </div>

                <span className="text-sm font-semibold text-primary">
                  {emp.birthDay}
                  {new Date().toLocaleString("en-US", { month: "short" })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      }
      
    </div>
  );
};

export default MyTeam;
