import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { IoIosAddCircle } from "react-icons/io";
import logo from "../assets/logo1.jpg";
import { FaList } from "react-icons/fa";
import { MdRequestPage } from "react-icons/md";
import useRole from "../customHooks/useRole";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { FaPerson } from "react-icons/fa6";

const DashboardLayout = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="text-lg md:text-xl font-bold text-secondary px-4">
            Asset Management Dashboard
          </div>
        </nav>

        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            {/* Homepage */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {" "}
                <img
                  className="w-16 h-16 is-drawer-close:w-6 is-drawer-close:h-6 rounded-full"
                  src={logo}
                  alt=""
                />
              </Link>
            </li>

            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </button>
            </li>
            {/* HR only lists */}

            {role === "hr" && (
              <>
                {/* List item: Add an Asset*/}
                <li>
                  <NavLink
                    to="/dashboard/addAsset"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add an Asset"
                  >
                    <IoIosAddCircle />
                    <span className="is-drawer-close:hidden">Add an Asset</span>
                  </NavLink>
                </li>

                {/* List item: Asset List*/}
                <li>
                  <NavLink
                    to="/dashboard/assetList"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Asset List"
                  >
                    <FaList />
                    <span className="is-drawer-close:hidden">Asset List</span>
                  </NavLink>
                </li>

                {/* List item: All Requests*/}
                <li>
                  <NavLink
                    to="/dashboard/allRequests"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Requests"
                  >
                    <VscGitPullRequestGoToChanges />
                    <span className="is-drawer-close:hidden">All Requests</span>
                  </NavLink>
                </li>

                 {/* List item: My Employees*/}
                <li>
                  <NavLink
                    to="/dashboard/myEmployees"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Employees"
                  >
                    <FaPerson />
                    <span className="is-drawer-close:hidden">My Employees</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* employee only lists */}

            {role === "employee" && (
              <>
                {/* List item: Request for an asset*/}
                <li>
                  <NavLink
                    to="/dashboard/requestAsset"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Request for an Asset"
                  >
                    <MdRequestPage />
                    <span className="is-drawer-close:hidden">
                      Request Asset
                    </span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
