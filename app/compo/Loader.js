"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0E1628]">
      <motion.div
        className="relative w-24 h-24"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Gradient Circle */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-[#E5970F] to-[#E69A10] shadow-2xl"
          animate={{
            scale: [1, 1.2, 1],
            rotateY: [0, 180, 360],
            rotateX: [0, 90, 180],
            rotateZ: [0, 45, 90],
            opacity: [0.5, 1, 0.5], // Adding opacity fluctuation for a dynamic effect
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>

        {/* Glowing backdrop effect */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-full bg-opacity-30 backdrop-blur-md"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3], // Fade in and out for a glowing effect
            rotateZ: [0, 45, 90],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>

        {/* Outer ring with rotation and glow */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-full border-4 border-[#E69A10] animate-spin"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear",
          }}
        ></motion.div>
      </motion.div>
    </div>
  );
}
