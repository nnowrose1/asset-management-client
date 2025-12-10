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

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

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
        const res = await axiosSecure.get(`/users/${currentUser.email}`);
        setUser(res.data);
        // return res.data;
        
      }  
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, [axiosSecure]);

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
