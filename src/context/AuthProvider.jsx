import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useAxiosSecure from "../customHooks/useAxiosSecure";
import useAxios from "../customHooks/useaxios";
import Loader from "../components/Loader";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios();

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  //   observer user state
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const loggedInfo = { email: currentUser.email };

          const tokenRes = await axiosInstance.post("/getToken", loggedInfo);
          localStorage.setItem("token", tokenRes.data.token);

          const res = await axiosSecure.get(`/users/${currentUser.email}`);
          setUser(res?.data);
        } catch (err) {
          console.error("Auth error:", err);
          setUser(null);
          localStorage.removeItem("token");
        } finally {
          setLoading(false);
        }
      }
      //   // jwt token
      //    const loggedInfo = { email: currentUser.email };
      //    axiosInstance.post('/getToken', loggedInfo)
      //     .then((res) => {
      //      console.log("after getting token", res.data);
      //       localStorage.setItem("token", res.data.token);
      //     });

      //  const res = await axiosSecure.get(`/users/${currentUser.email}`);
      //   setUser(res?.data);

      // }
      //  else{
      //   localStorage.removeItem('token');
      // }
      else {
        setUser(null);
        localStorage.removeItem("token");
        setLoading(false);
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    registerUser,
    signInUser,
    signInWithGoogle,
    user,
    loading,
    logOut,
    updateUserProfile,
    setUser,
  };

  return (
    <AuthContext value={authInfo}>
      {loading? <Loader></Loader> : children}
      {/* {children} */}
    </AuthContext>
  );
};

export default AuthProvider;
