import React from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ErrorPage = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 12 }}
        className="text-red-500 mb-4"
      >
        <FaExclamationTriangle className="text-6xl" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold text-secondary"
      >
        Oops! Something went wrong.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-accent mt-2 max-w-md"
      >
        We’re having trouble loading this page. It might be a broken link or a temporary issue.
      </motion.p>

      <Link to="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 px-6 py-3 bg-primary text-white rounded-xl shadow-lg hover:bg-primary/90 transition"
        >
          Go Back Home
        </motion.button>
      </Link>
    </div>

    <Footer></Footer>
    </>
  );
};

export default ErrorPage;
