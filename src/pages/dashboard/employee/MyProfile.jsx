import React from "react";
import useAuth from "../../../customHooks/useAuth";
import { useForm } from "react-hook-form";
import { FaCalendar, FaEnvelope, FaUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure= useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
//   console.log(user._id);
  

  const handleProfileUpdate = (data) => {
    // console.log(data);
    const profileImg = data.photo[0];
    const formData = new FormData();
    formData.append("image", profileImg);
    const imgAPIUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGEHOST
    }`;
    axios
      .post(imgAPIUrl, formData)
      .then((res) => {
        
        const updatedProfile = {
            name: data.name,
            photoURL: res.data.data.url,
            dateOfBirth: data.dateOfBirth,
          
        }
        axiosSecure.patch(`/users/${user._id}`, updatedProfile)
        .then(() => {
            toast.success("Profile updated successfully!")
        })
        .catch(err => {
            console.log(err);
            
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="px-6 py-6">
      {/* HEADER */}
      <h2 className="text-3xl font-semibold text-secondary mb-4 text-center">
        My Profile
      </h2>

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

        {/* PHOTO URL */}
        <div className="flex flex-col space-y-1">
          <label className="font-medium text-secondary flex items-center gap-2">
            Photo
          </label>
          <input
            type="file"
            {...register("photo", {required: true})}
            className="file-input"
            placeholder="Upload Your Photo"
          />
          {errors.photo && (
            <p className="text-red-600 text-sm">Photo is required</p>
          )}
        </div>

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
