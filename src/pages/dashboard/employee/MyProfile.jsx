import React, { useRef } from "react";
import useAuth from "../../../customHooks/useAuth";
import { useForm } from "react-hook-form";
import { FaCalendar, FaEnvelope, FaUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import useRole from "../../../customHooks/useRole";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const updateProfileModalRef = useRef();
  //   console.log(user._id);

  const { data: companies = [] } = useQuery({
    queryKey: ["company", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/companies?email=${user?.email}`);
      return res.data;
    },
  });
  // console.log(companies);

  const openSendReqModal = () => {
     if (updateProfileModalRef.current) {
    updateProfileModalRef.current.showModal();
  }
   
  };

  const handleProfileUpdate = (data) => {
    // console.log(data);
    const updatedProfile = {
          name: data.name,
          dateOfBirth: data.dateOfBirth,
        };
    const profileImg =
      role === "employee"
        ? data.photo?.[0] || null
        : data?.companyLogo?.[0] || null;
    const formData = new FormData();
 if (!profileImg) {
     axiosSecure
          .patch(`/users/${user._id}`, updatedProfile)
          .then((res) => {
            if (res.data.modifiedCount) {
              toast.success("Profile updated successfully!");
              window.location.reload();
              updateProfileModalRef.current.close();
            }
          })

          .catch((err) => {
            console.log(err);
          });
           return;
    } 

    if (profileImg) {
      formData.append("image", profileImg);
    }

    const imgAPIUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGEHOST
    }`;
    axios
      .post(imgAPIUrl, formData)
      .then((res) => {
        const imgURL = res.data.data.url;
        

        if (role === "employee") {
          updatedProfile.photoURL = imgURL;
        } else if (role === "hr") {
          updatedProfile.companyLogo = imgURL;
        }

        axiosSecure
          .patch(`/users/${user._id}`, updatedProfile)
          .then((res) => {
            if (res.data.modifiedCount) {
              toast.success("Profile updated successfully!");
              window.location.reload();
              updateProfileModalRef.current.close();
            }
          })

          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white shadow-xl rounded-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 mb-4">
            <img
              src={user?.photoURL || user?.companyLogo}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-primary"
            />
          </div>
          <h2 className="text-3xl font-bold text-primary">{user?.name}</h2>
          <p className="text-secondary mt-1">{user?.email}</p>
        </div>

        {/* INFO SECTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-accent mb-2">Name</h3>
            <p className="text-secondary">{user?.name}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-accent mb-2">Email</h3>
            <p className="text-secondary">{user?.email}</p>
          </div>
          {role === "employee" && (
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold text-accent mb-2">
                Affiliated Companies
              </h3>
              <div className="flex flex-wrap gap-2">
                {companies.length > 0 ? (
                  companies.map((company, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-primary rounded-full text-sm"
                    >
                      {company}
                    </span>
                  ))
                ) : (
                  <span className="text-accent text-sm">
                    No affiliated companies
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* UPDATE BUTTON */}
        <div className="flex justify-center">
          <button
            onClick={openSendReqModal}
            className="bg-primary hover:bg-primary text-white font-semibold py-3 px-8 rounded-full transition-all text-lg"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* modal */}
      <dialog ref={updateProfileModalRef} className="modal">
        <div className="modal-box">
          <form
            onSubmit={handleSubmit(handleProfileUpdate)}
            className="space-y-5"
          >
            {/* FULL NAME */}
            <div className="flex flex-col space-y-1">
              <label className="font-medium text-secondary flex items-center gap-2">
                <FaUser /> Full Name
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                defaultValue={user.name}
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
              />
              {errors.name && (
                <p className="text-red-600 text-sm">Full name is required</p>
              )}
            </div>

            {/* Employee PHOTO URL */}
            {role === "employee" && (
              <div className="flex flex-col space-y-1">
                <label className="font-medium text-secondary flex items-center gap-2">
                  Photo
                </label>
                <input
                  type="file"
                  {...register("photo")}
                  className="file-input"
                  placeholder="Upload Photo"
                />
               
              </div>
            )}

            {/* HR PHOTO URL */}
            {role === "hr" && (
              <div className="flex flex-col space-y-1">
                <label className="font-medium text-secondary flex items-center gap-2">
                  Company Logo
                </label>
                <input
                  type="file"
                  {...register("companyLogo")}
                  className="file-input"
                  placeholder="Upload Logo"
                />
             
              </div>
            )}

            {/* EMAIL */}
            <div className="flex flex-col space-y-1">
              <label className="font-medium text-secondary flex items-center gap-2">
                <FaEnvelope /> Email Address
              </label>
              <input
                {...register("email", { required: true })}
                defaultValue={user.email}
                disabled
                type="email"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {/* DOB */}
            <div className="flex flex-col space-y-1">
              <label className="font-medium text-secondary flex items-center gap-2">
                <FaCalendar /> Date of Birth
              </label>
              <input
                {...register("dateOfBirth")}
                type="date"
                defaultValue={user.dateOfBirth}
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <div className="modal-action flex justify-end gap-3 pt-4">
              {/* if there is a button in form, it will close the modal */}
              <button
                type="submit"
                  className="btn btn-primary text-white"
              >
                Update
              </button>
              <button
                onClick={() => {
                  updateProfileModalRef.current.close();
                }}
                className="btn btn-primary text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* <form onSubmit={handleSubmit(handleProfileUpdate)} className="space-y-5">
     
        <div className="flex flex-col space-y-1">
          <label className="font-medium text-secondary flex items-center gap-2">
            <FaUser /> Full Name
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            defaultValue={user.name}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">Full name is required</p>
          )}
        </div>

      
        {role === "employee" && (
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-secondary flex items-center gap-2">
              Photo
            </label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input"
              placeholder="Upload Photo"
            />
            {errors.photo && (
              <p className="text-red-600 text-sm">Photo is required</p>
            )}
          </div>
        )}

      
        {role === "hr" && (
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-secondary flex items-center gap-2">
              Company Logo
            </label>
            <input
              type="file"
              {...register("companyLogo", { required: true })}
              className="file-input"
              placeholder="Upload Logo"
            />
            {errors.companyLogo && (
              <p className="text-red-600 text-sm">Company Logo is required</p>
            )}
          </div>
        )}

      
        <div className="flex flex-col space-y-1">
          <label className="font-medium text-secondary flex items-center gap-2">
            <FaEnvelope /> Email Address
          </label>
          <input
            {...register("email", { required: true })}
            defaultValue={user.email}
            disabled
            type="email"
            className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

      
        <div className="flex flex-col space-y-1">
          <label className="font-medium text-secondary flex items-center gap-2">
            <FaCalendar /> Date of Birth
          </label>
          <input
            {...register("dateOfBirth")}
            type="date"
            defaultValue={user.dateOfBirth}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white text-lg font-semibold py-3 rounded-xl hover:bg-blue-700 transition-all"
        >
          Update Profile
        </button>
      </form> */}
    </div>
  );
};

export default MyProfile;
