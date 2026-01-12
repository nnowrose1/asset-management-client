import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import useAuth from "../../../customHooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";


const MyAssets = () => {
  const printRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data: assignedAssets = [] } = useQuery({
    queryKey: ["assignedAssets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignedAssets?email=${user.email}`);
      return res.data;
    },
  });

  const { data: approvedAssets = [] } = useQuery({
    queryKey: ["approvedRequests", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/requests?requesterEmail=${user?.email}&requestStatus=approved`
      );
      return res.data;
    },
  });

  const allAssets = [...assignedAssets, ...approvedAssets];
   const totalAssets = allAssets?.length || 0;
  const totalPages = Math.ceil(totalAssets / limit);

  //filter based on search and filter
  const filteredAssets = allAssets
    .filter((asset) =>
      asset.assetName.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((asset) =>
      selectedType === "all" ? true : asset.assetType === selectedType
    );

  //   printing
  const handlePrint = useReactToPrint({
    documentTitle: "Title",
    contentRef: printRef,
  });

  return (
    <div ref={printRef} className="px-6">
      <h2 className="text-3xl font-semibold text-secondary text-center py-6">
        My Assets
      </h2>

      <div className="flex flex-col gap-4 md:flex-row justify-between">
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

          <button className="btn btn-primary text-white join-item">
            Search
          </button>
        </div>

        {/* filtering*/}
        <select
          className="select select-bordered ml-3"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">Filter by Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>

        {/* print button */}
        <button
          onClick={handlePrint}
          className="btn btn-primary hover:bg-blue-800 text-white"
        >
          Print
        </button>
      </div>

      <div className="overflow-x-auto">
        {filteredAssets.length === 0 ? (
          <h2 className="text-2xl text-secondary font-semibold text-center py-6">
            No assets found!
          </h2>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Asset Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Company Name</th>
                <th>Request Date</th>
                <th>Assigned/Approval Date</th>
                <th>Status</th>
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
                          <img src={asset.assetImage} alt="Asset Image" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold">{asset.assetName}</td>
                  <td>{asset.assetType}</td>
                  <td className="font-semibold">{asset.companyName}</td>
                  <td>
                    {asset.requestDate
                      ? new Date(asset.requestDate).toLocaleString()
                      : "null"}
                  </td>
                  <td>
                    {asset.approvalDate
                      ? new Date(asset.approvalDate).toLocaleString()
                      : new Date(asset.assignmentDate).toLocaleString()}
                  </td>
                  <td className="font-semibold">
                    {asset.requestStatus || asset.status}
                  </td>
                  <th>
                    {(asset.requestStatus === "approved" ||
                      asset.status === "assigned") &&
                      asset.assetType === "Returnable" && (
                        <button className="btn btn-primary hover:bg-blue-800 text-white btn-xs">
                          Return
                        </button>
                      )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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

export default MyAssets;
