import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import useAuth from "../../../customHooks/useAuth";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { MdAssignmentTurnedIn } from "react-icons/md";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const assignModalRef = useRef();
  const [product, setProduct] = useState(null);

  const { data: assets = [], refetch } = useQuery({
    queryKey: ["assetList", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets?email=${user.email}`);
      return res.data;
      // console.log(res.data);
    },
  });

  const { data: employees = [] } = useQuery({
    queryKey: ["employees", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employees?email=${user.email}`);
      return res.data;
    },
  });

  const filteredAssets = assets.filter((asset) =>
    asset.productName.toLowerCase().includes(searchText.toLowerCase())
  );

  const openAssignModal = (asset) => {
    assignModalRef.current.showModal();
    setProduct(asset);
  };

  const handleAssignRequest = (employee) => {
    assignModalRef.current.close();
    const assignedAsset = {
      assetName: product.productName,
      assetImage: product.productImage,
      assetType: product.productType,
      employeeEmail: employee.employeeEmail,
      employeeName: employee.employeeName,
      hrEmail: product.hrEmail,
      companyName: product.companyName,
      assignmentDate: new Date(),
      returnDate: null,
      status: "assigned",
    };

    if (product.availableQuantity === 0) {
      toast.error("No available quantity left!");
      return;
    }
    axiosSecure
      .post("/assignedAssets", assignedAsset)
      .then(() => {
        toast.success(
          `${product.productName} has been assigned to ${employee.employeeName}`
        );
      })
      .catch((err) => {
        console.log(err);
      });

    const updatedQuantity = {
      availableQuantity: product.availableQuantity - 1,
    };

    axiosSecure
      .patch(`/assets/${product._id}`, updatedQuantity)
      .then(() => {
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleEdit = (asset) => {

  // }

  const handleDelete = (asset) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/assets/${asset._id}`).then((res) => {
            if (res.data.deletedCount) {
              
              Swal.fire({
                title: "Deleted!",
                text: "Your asset has been deleted.",
                icon: "success",
              });
              refetch();
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="px-6">
      <h2 className="text-3xl font-semibold text-secondary text-center py-6">
        Asset List
      </h2>
      {/* search box */}
      <div className="join mb-6">
        <label className="input validator join-item">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="search asset"
            required
          />
        </label>

        <button className="btn btn-primary text-white join-item">Search</button>
      </div>

      <div className="overflow-x-auto">
        {filteredAssets.length === 0 ? (
          <h2 className="text-2xl text-secondary font-semibold text-center py-6">
            No assets found!
          </h2>
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Asset Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset, index) => (
                <tr key={asset._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={asset.productImage} alt="Asset Image" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold">{asset.productName}</td>
                  <td>{asset.productType}</td>
                  <td className="font-semibold">{asset.availableQuantity}</td>
                  <td>{new Date(asset.dateAdded).toLocaleString()}</td>
                  <th className="flex flex-col md:flex-row gap-2 md:gap-1">
                    
                    <button
                      // onClick={() => handleEdit(asset)}
                      title="Edit"
                      className="btn btn-primary hover:bg-blue-800 text-white btn-xs"
                    >
                      <MdModeEdit />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(asset)}
                      title="Delete"
                      className="btn btn-primary hover:bg-blue-800 text-white btn-xs ms-2"
                    >
                      <MdDelete />
                    </button>
                    <button
                      title="Assign"
                      onClick={() => openAssignModal(asset)}
                      className="btn btn-primary hover:bg-blue-800 text-white btn-xs ms-2"
                    >
                      <MdAssignmentTurnedIn />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* modal */}
            <dialog ref={assignModalRef} className="modal">
              <div className="modal-box">
                <h3 className="text-lg font-semibold text-secondary text-center py-6">
                  Employees Affiliated: {employees.length}{" "}
                </h3>
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      {employees.map((employee, i) => (
                        <tr key={employee._id}>
                          <th>{i + 1}</th>
                          <td>{employee.employeeName}</td>

                          <td>
                            {/* if there is a button in form, it will close the modal */}
                            <button
                              onClick={() => handleAssignRequest(employee)}
                              className="btn btn-primary text-white"
                            >
                              Assign
                            </button>
                            <button
                              onClick={() => {
                                assignModalRef.current.close();
                              }}
                              className="btn btn-primary text-white ms-2"
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </dialog>
          </table>
        )}
      </div>
    </div>
  );
};

export default AssetList;
