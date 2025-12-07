import React from "react";
import useAuth from "../customHooks/useAuth";
import useRole from "../customHooks/useRole";
import Loader from "../components/Loader";

const HRRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole();
  //   console.log(role, isLoading);

  if (loading || isLoading) {
    return <Loader></Loader>;
  }
  if (role !== "hr") {
    return (
      <h3 className="text-xl text-red-500 text-center mt-40">
        Access is Forbidden!
      </h3>
    );
  }
  return children;
};

export default HRRoute;
