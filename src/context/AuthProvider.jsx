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
    const unSubscribe = onAuthStateChanged(auth, async(currentUser) => {
      if(currentUser){
        // jwt token
         const loggedInfo = { email: currentUser.email };
         axiosInstance.post('/getToken', loggedInfo)
          .then((res) => {
           console.log("after getting token", res.data);
            localStorage.setItem("token", res.data.token);
          });

       const res = await axiosSecure.get(`/users/${currentUser.email}`);
        setUser(res.data);
        
      }  
       else{
        localStorage.removeItem('token');
      }

      setLoading(false);
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
    setUser
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
