import useAuth from "../../../customHooks/useAuth";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["requests", user?.email, currentPage, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/requests/${user?.email}?limit=${limit}&page=${currentPage}`
      );
      return res.data;
    },
  });

  const allRequests = requests?.result || [];
  const totalRequests = requests?.totalCount || 0;
  const totalPages = Math.ceil(totalRequests / limit);
  //  console.log({ requests, allRequests, totalRequests, totalPages });

  const handleAccept = async (request) => {
    if (
      request.requestStatus === "approved" ||
      request.requestStatus === "rejected"
    ) {
      return;
    }

    // check the employee limit
    if (user?.currentEmployees >= user.packageLimit) {
      toast.error("Package limit exceeded. Please Upgrade your Package!");
      return;
    }

    const requestedAsset = await axiosSecure.get(`/assets/${request.assetId}`);
    //  console.log(requestedAsset);

    if (requestedAsset.data.availableQuantity === 0) {
      toast.error("Not available");
      return;
    }

    const updated = {
      status: "approved",
      date: new Date(),
      processedBy: user.email,
      assetId: request.assetId,
      userId: user._id,
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
        All Requests: {totalRequests}
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Employee</th>
              <th>Asset</th>
              <th>Date Requested</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allRequests.map((request, index) => (
              <tr key={index}>
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

                <th className="flex flex-col md:flex-row gap-2">
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

      {/* Pagination */}
      <div className="flex justify-center flex-wrap gap-2 py-8">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn"
          >
            Prev
          </button>
        )}
{/* i 0 theke start hoy. page number jaate 1 theke start hoy ejonno i +1 */}
        {[...Array(totalPages).keys()].map((i) => (
          <button
            onClick={() => setCurrentPage(i +1)}
            className={`btn ${i+1 === currentPage && "btn-primary"}`}
          >
            {i + 1}
          </button>
        ))}
        {currentPage < totalPages  && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn"
          >
            Next
          </button>
        )}
      </div>


    </div>
  );
};

export default AllRequests;
