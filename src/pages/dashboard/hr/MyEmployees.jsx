import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../customHooks/useAuth";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import Loader from "../../../components/Loader";
import Swal from "sweetalert2";

const MyEmployees = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(user.email);

  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["employee", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employees?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: allRequests = [] } = useQuery({
    queryKey: ["requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/requests?hrEmail=${user?.email}&requestStatus=approved`
      );
      console.log(
        "URL sent:",
        `/requests?hrEmail=${user?.email}&requestStatus=approved`
      );
      return res.data;
    },
  });

  const handleRemove = (employee) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove!",
    })
    .then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/employees?hrEmail=${user.email}&employeeEmail=${employee.employeeEmail}`)
        .then(() => {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: `${employee.employeeName} has been removed.`,
            icon: "success",
          });
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
          });
        });
      }
    });
  };

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="px-6">
      <h2 className="text-3xl font-semibold text-secondary text-center py-6">
        My Employees: {employees.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Join date</th>
              <th>Assets Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => {
              const empAssets = allRequests.filter(
                (req) => req.requesterEmail === employee.employeeEmail
              );
              return (
                <tr key={employee._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={employee.employeeImage}
                            alt="employee Image"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold">{employee.employeeName}</td>
                  <td>{employee.employeeEmail}</td>
                  <td>{new Date(employee.affiliationDate).toLocaleString()}</td>
                  <td className="font-semibold">{empAssets.length}</td>

                  <th>
                    <button
                      onClick={() => handleRemove(employee)}
                      className="btn  bg-red-500 hover:bg-red-800 text-white btn-xs"
                    >
                      Remove from Team
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEmployees;
