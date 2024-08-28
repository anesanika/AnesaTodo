"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const animationVariantsLeft = {
  hidden: { opacity: 0, x: -500 }, // Starts off-screen to the left
  visible: { opacity: 1, x: 0 }, // Moves to the center
};

const animationVariantsRight = {
  hidden: { opacity: 0, x: 500 }, // Starts off-screen to the right
  visible: { opacity: 1, x: 0 }, // Moves to the center
};

const Opening = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push(`/login`);
    }, 1800);
  }, []);

  return (
    <div>
      <div className="w-full bg-neutral-50 shadow-lg rounded-lg flex flex-col justify-center items-center h-screen">
        <div className="flex">
          <motion.h1
            className="font-title text-6xl font-bold text-neutral-300"
            initial="hidden"
            animate="visible"
            variants={animationVariantsLeft}
            transition={{
              type: "spring",
              stiffness: 100, // Higher stiffness for a quicker effect
              damping: 10, // Lower damping for a bouncier effect
              duration: 0.6, // Shorter duration for a faster animation
            }}
          >
            TODO
          </motion.h1>
          <motion.h1
            className="font-title text-6xl font-bold"
            style={{ color: "#6A64F1" }}
            initial="hidden"
            animate="visible"
            variants={animationVariantsRight}
            transition={{
              type: "spring",
              stiffness: 100, // Higher stiffness for a quicker effect
              damping: 10, // Lower damping for a bouncier effect
              duration: 0.6, // Shorter duration for a faster animation
            }}
          >
            LIST
          </motion.h1>
        </div>
      </div>
    </div>
  );
};
export default Opening;
