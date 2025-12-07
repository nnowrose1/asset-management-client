import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <motion.div
        className="relative w-20 h-20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent"></div>
      </motion.div>

      <motion.p
        className="mt-4 text-primary font-semibold text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loader;
