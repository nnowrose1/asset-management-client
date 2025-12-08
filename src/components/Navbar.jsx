import React, { useState } from "react";

import { Link, NavLink, useNavigate } from "react-router";

import Logo from "./Logo";
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import useAuth from "../customHooks/useAuth";
import useRole from "../customHooks/useRole";
import Loader from '../components/Loader';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role, isLoading } = useRole();
  // console.log(role);
  const navigate = useNavigate();

  const [hover, setHover] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        // console.log(res.user);
        navigate('/login')
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/employeeRegister">Join as Employee</NavLink>
      </li>
      <li>
        <NavLink to="/hrRegister">Join as HR Manager</NavLink>
      </li>

      {
    user && <>
    <li><NavLink to="/dashboard/profile">My Profile</NavLink></li>
     </>
  }
    </>
  );

  if(isLoading){
    return <Loader></Loader>
  }
  return (
    <nav className="navbar bg-gray-700 text-white sticky top-0 z-50  backdrop-blur-xl shadow">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/">
          {" "}
          <Logo></Logo>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex items-center">
        {user ? (
          <div tabIndex={0} className="dropdown dropdown-end relative group">
            {/* Profile Button */}
            <div
              // tabIndex={0}
              role="button"
              className="flex items-center gap-2 cursor-pointer select-none"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {/* Profile Image */}
              <img
                src={user?.companyLogo || user?.photoURL}
                alt="User"
                className="w-12 h-12 rounded-full border-2 border-primary shadow-sm"
              />

              {/* Smooth Fade-In Name on Hover */}
              <span
                className={`text-secondary font-medium text-sm transition-all duration-500 
          ${hover ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
              >
                {user?.displayName}
              </span>
            </div>

            {role === "hr" ? (
              <ul
                // tabIndex={0}
                className="
      dropdown-content menu bg-white text-secondary rounded-xl shadow-lg w-48 mt-3 py-3

      transform transition-all duration-300 origin-top 
      opacity-0 -translate-y-3 pointer-events-none

      group-focus-within:opacity-100
      group-focus-within:translate-y-0
      group-focus-within:pointer-events-auto
    "
              >
                <li>
                  <Link className="flex items-center gap-2">
                    <FiUser /> Profile
                  </Link>
                </li>

                <li>
                  <Link to="/dashboard/assetList" className="flex items-center gap-2">Asset List</Link>
                </li>

                <li>
                  <Link to="/dashboard/addAsset" className="flex items-center gap-2">Add Asset</Link>
                </li>

                <li>
                  <Link to='/dashboard/allRequests' className="flex items-center gap-2">All Requests</Link>
                </li>

                <li>
                  <Link className="flex items-center gap-2">Employee List</Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600"
                  >
                    <FiLogOut /> Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul
                // tabIndex={0}
                className="
      dropdown-content menu bg-white text-secondary rounded-xl shadow-lg w-48 mt-3 py-3

      transform transition-all duration-300 origin-top 
      opacity-0 -translate-y-3 pointer-events-none

      group-focus-within:opacity-100
      group-focus-within:translate-y-0
      group-focus-within:pointer-events-auto
    "
              >
                <li>
                  <Link className="flex items-center gap-2">
                    <FiUser /> Profile
                  </Link>
                </li>

                <li>
                  <Link className="flex items-center gap-2">My Assets</Link>
                </li>

                <li>
                  <Link className="flex items-center gap-2">My Team</Link>
                </li>

                <li>
                  <Link to="/dashboard/requestAsset" className="flex items-center gap-2">Request an Asset</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600"
                  >
                    <FiLogOut /> Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-primary text-white text-lg font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-all"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
