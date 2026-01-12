import React from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaBuilding,
  FaImage,
  FaEnvelope,
  FaLock,
  FaCalendar,
} from "react-icons/fa";
import useAuth from "../../customHooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from '../../customHooks/useAxiosSecure';

const HRRegister = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const handleHRRegistration = (data) => {
    // console.log(data);
   
    const profileImg = data.companyLogo[0];

    // register
    registerUser(data.email, data.password)
      .then(() => {
        // console.log(result.user);
        toast.success("Registration Successful!");
        reset();
        const formData = new FormData();
        formData.append("image", profileImg);
         // send the photo to store and get the url
  const imgAPIUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGEHOST }`;
        axios.post(imgAPIUrl, formData).then((res) => {
      // console.log("after img upload", res.data.data.url);
          // update user profile to firebase
 const profile = {
      displayName: data.name,
      photoURL: res.data.data.url
    }

    const hrInfo = {
      name: data.name,
      email: data.email,
      companyName: data.companyName,
      companyLogo: res.data.data.url,
      dateOfBirth: data.dateOfBirth,
      role: "hr",
      packageLimit: 5,
      currentEmployees: 0,
      subscription: "basic"
    }
    // console.log(hrInfo);
    
       
        updateUserProfile(profile)
        .then(() => {
          console.log("Profile Updated Successfully"); 
           axiosSecure.post('/users', hrInfo)
           .then(() => {
            console.log("HR info posted successfully");
            
           })
           .catch(err => {
            console.log(err.message);
            
           })
          navigate(location.state || '/');
        })
        .catch(err => {
          console.log(err.message);
        })
      })

      .catch((error) => {
        toast.error(error.message);
      });
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* HEADER */}
        <h2 className="text-4xl font-bold text-secondary text-center mb-2">
          Create Your Account
        </h2>
        <p className="text-accent text-center mb-10">
          Join AssetNexus and simplify your company’s asset lifecycle.
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(handleHRRegistration)}
          className="space-y-8 bg-white p-10 rounded-2xl shadow-lg border border-gray-200"
        >
          {/* FULL NAME */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-secondary flex items-center gap-2">
              <FaUser /> Full Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 dark:text-primary rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">Full name is required</p>
            )}
          </div>

          {/* COMPANY NAME */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-secondary flex items-center gap-2">
              <FaBuilding /> Company Name
            </label>
            <input
              {...register("companyName", { required: true })}
              type="text"
              placeholder="Company Name"
              className="border border-gray-300 dark:text-primary rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
            />
            {errors.companyName && (
              <p className="text-red-600 text-sm">Company name is required</p>
            )}
          </div>

          {/* LOGO URL */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-secondary flex items-center gap-2">Logo</label>
          <input
            type="file"
            {...register("companyLogo", { required: true })}
            className="file-input dark:text-primary"
            placeholder="Upload Company Logo"
          />
          {errors.companyLogo?.type === "required" && (
        <p className="text-red-600 text-sm">Company Logo is required</p>
          )}

          </div>

          {/* EMAIL */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-secondary flex items-center gap-2">
              <FaEnvelope /> Email Address
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="border border-gray-300 dark:text-primary rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">Email is required</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-secondary flex items-center gap-2">
              <FaLock /> Password
            </label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              placeholder="Password"
              className="border border-gray-300 dark:text-primary rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
            />
            {errors.password && (
              <p className="text-red-600 text-sm">
                Password must be at least 6 characters long
              </p>
            )}
          </div>

          {/* DOB */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-secondary flex items-center gap-2">
              <FaCalendar /> Date of Birth
            </label>
            <input
              {...register("dateOfBirth", { required: true })}
              type="date"
              className="border border-gray-300 dark:bg-gray-300 dark:text-primary rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
            />
            {errors.dateOfBirth && (
              <p className="text-red-600 text-sm">Date of birth is required</p>
            )}
          </div>

          {/* ALready have account */}
          <div className="font-medium text-secondary">
            Already have an account?{" "}
            <Link className="text-primary underline hover:text-blue-700" to="/login">
              Login
            </Link>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-primary text-white text-lg font-semibold py-3 rounded-xl hover:bg-blue-700 transition-all"
          >
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default HRRegister;
