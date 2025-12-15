import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
//import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: "https://asset-management-server-seven.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth() || {};
  // const navigate = useNavigate();

  useEffect(() => {
    // if(!user) {
    //   return;
    // }
    // intercept request
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );
    // interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const statusCode = error.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          logOut()
            .then(() => {
              // navigate("/login");
            })
            .catch((err) => {
              console.log(err);
            });
        }
        return Promise.reject(error);
      }
    );
    //  unmount
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut]);
  return axiosSecure;
};

export default useAxiosSecure;
