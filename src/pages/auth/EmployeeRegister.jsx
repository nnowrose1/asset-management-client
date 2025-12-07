import React from "react";
import { useForm } from "react-hook-form";
import { FaCalendar, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../customHooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../customHooks/useAxiosSecure";

const EmployeeRegister = () => {
    const { registerUser, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleEmployeeRegistration = (data) => {
    console.log(data);
    const profile = {
        displayName: data.name,
        photoURL: data.photo
    }

    const employeeInfo = {
      name: data.name,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
       photoURL: data.photo,
      role: "employee",
    }
     // register
    registerUser(data.email, data.password)
      .then(() => {
        // console.log(result.user);
        toast.success("Registration Successful!");
        reset();
        updateUserProfile(profile)
        .then(() => {
            console.log("updated!");
            axiosSecure.post('/users', employeeInfo)
            .then(() => {
              console.log("Employee info posted");  
            })
            .catch(err => {
              console.log(err.message);             
            })
        })
        .catch(err => {
            console.log(err.message);           
        })
        navigate(location?.state || '/');
      })
      .catch(err => {
        toast.error(err.message);
      })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* HEADER */}
        <h2 className="text-4xl font-bold text-secondary text-center mb-2">
          Create Your Account
        </h2>
        <p className="text-accent text-center mb-10">
          Register now to join your company workspace, request equipment, and
          manage all your assigned assets easily.
        </p>

        <form
          onSubmit={handleSubmit(handleEmployeeRegistration)}
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
              placeholder="Your Name"
              className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">Full name is required</p>
            )}
          </div>

           {/* Photo */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-secondary flex items-center gap-2">
              <FaUser /> Photo URL
            </label>
            <input
              {...register("photo", { required: true })}
              type="text"
              placeholder="Photo URL"
              className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
            />
            {errors.photo && (
              <p className="text-red-600 text-sm">Your Photo is required</p>
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
              className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
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
              className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
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
              className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
            />
            {errors.dateOfBirth && (
              <p className="text-red-600 text-sm">Date of birth is required</p>
            )}
          </div>

          {/* ALready have account */}
          <div className="font-medium text-secondary">
            Already have an account?{" "}
            <Link
              className="text-primary underline hover:text-blue-700"
              to="/login"
            >
              Login
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegister;
