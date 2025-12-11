import React from 'react';
import useAuth from '../../../customHooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../customHooks/useAxiosSecure';

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: payments = []} = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async() => {
            const res =await axiosSecure.get(`/paymentHistory?email=${user.email}`);
            return res.data;
        }
    })
    return (
        <div className="px-6">
      <h2 className="text-3xl font-semibold text-secondary text-center py-6">
        My Payment History
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Package Name</th>
              <th>Price</th>
              <th>Employee Limit</th>
              <th>Tracking ID</th>
              <th>Transaction ID</th>
              <th>Payment Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.packageName}</td>
                <td className="font-semibold">{payment.amount} (paid)</td>
                <td>{payment.employeeLimit}</td>
              
                <td>{payment.transactionId}</td>
                <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                <td className={payment.status === "paid" ? "text-green-600" : "text-secondary"}>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default PaymentHistory;