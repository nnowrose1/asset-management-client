import React from "react";
import { Link } from "react-router";


const PaymentCancelled = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-30">
      <h2 className="text-red-400 text-3xl font-semibold my-6 text-center">Payment cancelled</h2>
      <Link to="/dashboard/upgradePackage">
        <button className="btn btn-primary text-white "> Try again!</button>
      </Link>
    </div>
  );
}
export default PaymentCancelled;