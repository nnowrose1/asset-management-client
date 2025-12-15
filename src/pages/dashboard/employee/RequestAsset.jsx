import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../customHooks/useAuth";
import toast from "react-hot-toast";

const RequestAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const reqModalRef = useRef();
  const [text, setText] = useState('');
  const [asset, setSelectedAsset] = useState(null);
  const [requestedAsset, setRequestedAsset] = useState([]);

  const { data: assetsObject = [] } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assets");
      return res.data;
    },
  });

  const assets = assetsObject?.result;
  // console.log(assets);
  
  const openSendReqModal = (asset) => {
    reqModalRef.current.showModal();
    setSelectedAsset(asset)
  }
  // console.log(user.photoURL);
  
    
    const handleSubmitRequest = () => {  
    
       const request = {
      assetId: asset._id,
      assetName: asset.productName,
      assetImage: asset.productImage,
      assetType: asset.productType,
      requesterName: user.name,
      requesterEmail: user.email,
      requesterBirthday: user.dateOfBirth,
      requesterImage: user.photoURL,
      hrEmail: asset.hrEmail,
      companyName: asset.companyName,
      requestDate: new Date(),
      approvalDate: null,
      requestStatus: "pending",
      note: text, 
    };

    axiosSecure
      .post("/requests", request)
      .then(() => {
        toast.success(`${asset.productName} has been requested.`);
        setText('');
       reqModalRef.current.close();
         setRequestedAsset((prev) => [...prev, asset._id])
      })
      .catch((err) => {
        console.log(err);
      });
   
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-semibold text-secondary  py-6 flex items-center gap-2">
        <FaBoxOpen /> Available Assets
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {assets
          ?.filter((item) => item.availableQuantity > 0)
          .map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-2xl p-4 border-primary hover:shadow-lg transition hover:-translate-y-2"
            >
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full h-40 object-fit bg-accent rounded-xl mb-3 border-primary"
              />

              <h3 className="text-lg font-semibold">{item.productName}</h3>
              <p className="text-sm text-accent mt-1">
                Type: <span className="font-medium">{item.productType}</span>
              </p>
              <p className="text-sm text-accent">
                Available:{" "}
                <span className="text-primary font-semibold">
                  {item.availableQuantity}
                </span>
              </p>

              <button
                onClick={() => openSendReqModal(item)}
                disabled={requestedAsset.includes(item._id)}
                className="mt-4 w-full bg-primary text-white py-2 rounded-xl hover:bg-blue-700 transition"
              >
               {requestedAsset.includes(item._id) ? "Already Requested" : "Request Asset"}
              </button>
              <dialog ref={reqModalRef} className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg text-primary">Note</h3>
                  <textarea
                    className="text-secondary"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    placeholder="Write your note here.."
                  ></textarea>

                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button onClick={handleSubmitRequest} className="btn btn-primary text-white">
                        Submit 
                      </button>
                      <button
                      onClick={() => {
                        setText('');
                        reqModalRef.current.close();
                        
                      }}
                       className="btn btn-primary text-white ms-2">Cancel</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RequestAsset;
