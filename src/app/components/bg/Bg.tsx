import React from "react";
import { motion } from "framer-motion";

const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, 20, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

const Bg = () => {
  return (
    <div className="w-full h-full bg-neutral-50 shadow-lg rounded-lg absolute top-0 left-0 -z-50 overflow-hidden font-title">
      {/* Top Left Solid Color Shape */}
      <motion.div
        className="absolute w-[300px] h-[300px] bg-[#6A64F1] rounded-full top-[-60px] left-[-60px]"
        variants={floatAnimation}
        initial="initial"
        animate="animate"
      ></motion.div>

      {/* Bottom Right Outline Shape */}
      <motion.div
        className="absolute w-[350px] h-[350px] border-2 border-[#6A64F1] rounded-md bottom-[-70px] right-[-70px]"
        variants={floatAnimation}
        initial="initial"
        animate="animate"
      ></motion.div>
    </div>
  );
};

export default Bg;
