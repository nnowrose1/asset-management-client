import React from "react";
import useAuth from "../../../customHooks/useAuth";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests/${user?.email}`);
      return res.data;
    },
  });

  const handleAccept = (request) => {
    if (
      request.requestStatus === "approved" ||
      request.requestStatus === "rejected"
    ) {
      return;
    }

    // console.log(request.requesterImage);

    const updated = {
      status: "approved",
      date: new Date(),
      processedBy: user.email,
      assetId: request.assetId,
      companyAffiliation: {
        employeeEmail: request.requesterEmail,
        employeeName: request.requesterName,
        employeeImage: request.requesterImage,
        hrEmail: request.hrEmail,
        companyName: request.companyName,

        affiliationDate: new Date(),
        status: "active",
      },
    };

    
    

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/requests/${request._id}`, updated)
          .then(() => {
            refetch();
            Swal.fire({
              title: "Approved",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
       
      }
    });
  };

  const handleReject = (request) => {
    if (
      request.requestStatus === "approved" ||
      request.requestStatus === "rejected"
    ) {
      return;
    }

    toast.error(`${request.assetName} request is rejected!`);
    const updated = {
      status: "rejected",
    };

    axiosSecure
      .patch(`/requests/${request._id}`, updated)
      .then(() => {
        refetch();
        console.log("rejected");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="px-6">
      <h2 className="text-3xl font-semibold text-secondary text-center py-6">
        All Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Employee</th>
              <th>Asset</th>
              <th>Date Requested</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request._id}>
                <th>{index + 1}</th>
                <td>{request.requesterName}</td>
                <td className="font-semibold">{request.assetName}</td>
                <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                <td
                  className={
                    request.requestStatus === "pending"
                      ? "text-primary"
                      : request.requestStatus === "approved"
                      ? "text-green-600"
                      : request.requestStatus === "rejected"
                      ? "text-red-500"
                      : "text-secondary"
                  }
                >
                  {request.requestStatus}
                </td>

                <th>
                  <button
                    onClick={() => handleAccept(request)}
                    className="btn btn-primary hover:bg-blue-800 text-white btn-xs"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(request)}
                    className="btn bg-red-500 hover:bg-red-800 text-white btn-xs ms-2"
                  >
                    Reject
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequests;
