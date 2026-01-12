import React from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../customHooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { signInUser } = useAuth();

  const handleLogin = (data) => {
    // console.log(data);
    signInUser(data.email, data.password)
      .then(() => {
        // console.log(res.user);
        reset();
        navigate(location?.state || "/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  // --- Demo Login Handler ---
  const handleDemoLogin = () => {
    const demoCredentials = {
      email: "demo@assetnexus.com",
      password: "demo1234",
    };

    // Auto-fill the form
    setValue("email", demoCredentials.email);
    setValue("password", demoCredentials.password);

    // Automatically submit the form
    handleSubmit(handleLogin)();
  };
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        {/* TITLE */}
        <h2 className="text-3xl font-bold text-secondary text-center mb-6">
          Login to AssetNexus
        </h2>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          {/* EMAIL */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-secondary flex items-center gap-2">
              <FaEnvelope /> Your Email
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
              placeholder="******"
              className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
            />
            {errors.password && (
              <p className="text-red-600 text-sm">
                Password must be at least 6 characters long
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-start">
            <Link className="text-primary text-sm hover:underline">
              Forgot your password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

         {/* DEMO LOGIN BUTTON */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition"
          >
            Demo Login
          </button>
        

        {/* Sign Up */}
        <p className="text-center text-accent text-sm mt-4">
          New to our website?{" "}
          <Link
            to="/employeeRegister"
            className="text-primary underline font-medium"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
