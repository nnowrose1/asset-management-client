import React from "react";
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
  //   console.log(user._id);

  const { data: companies = [] } = useQuery({
    queryKey: ["company", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/companies?email=${user?.email}`);
      return res.data;
    },
  });

  const handleProfileUpdate = (data) => {
    // console.log(data);
    const profileImg =
      role === "employee" ? data.photo[0] : data.companyLogo[0];
    const formData = new FormData();

    formData.append("image", profileImg);
    const imgAPIUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGEHOST
    }`;
    axios
      .post(imgAPIUrl, formData)
      .then((res) => {
        const imgURL = res.data.data.url;
        const updatedProfile = {
          name: data.name,
          dateOfBirth: data.dateOfBirth,
        };

        if (role === "employee") {
          updatedProfile.photoURL = imgURL;
        } else if (role === "hr") {
          updatedProfile.companyLogo = imgURL;
        }
        axiosSecure
          .patch(`/users/${user._id}`, updatedProfile)
          .then(() => {
            toast.success("Profile updated successfully!");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(companies);
  
  return (
    <div className="px-6 py-6">
      {/* HEADER */}
      <h2 className="text-3xl font-semibold text-secondary mb-6 text-center">
        My Profile
      </h2>
          {role === "employee" &&
           <div>
            <h2 className="font-medium text-secondary my-2">My Affiliated Companies:</h2>
          {
            companies.map((company, index) => (
               <button
    key={index}
    className="px-3 py-1 mb-4 bg-blue-100 text-primary rounded-md mr-2"
  >
    {company}
  </button>
            ))}
              </div>
            }
        

      <form onSubmit={handleSubmit(handleProfileUpdate)} className="space-y-5">
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
              {...register("photo", { required: true })}
              className="file-input"
              placeholder="Upload Photo"
            />
            {errors.photo && (
              <p className="text-red-600 text-sm">Photo is required</p>
            )}
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
              {...register("companyLogo", { required: true })}
              className="file-input"
              placeholder="Upload Logo"
            />
            {errors.companyLogo && (
              <p className="text-red-600 text-sm">Company Logo is required</p>
            )}
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
   

        <button
          type="submit"
          className="w-full bg-primary text-white text-lg font-semibold py-3 rounded-xl hover:bg-blue-700 transition-all"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
