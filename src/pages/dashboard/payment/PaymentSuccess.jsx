import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/verifyPaymentSuccess?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [sessionId, axiosSecure]);
  
  return (
    <div>
      <h2 className="text-3xl font-semibold text-primary my-6 text-center">
        Payment Successful!
      </h2>
    </div>
  );
};
export default PaymentSuccess;
