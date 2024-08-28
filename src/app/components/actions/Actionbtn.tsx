import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

const Actionbtn = ({ text, bg = "#00CA4E", action }: any) => {
  const [mytext, setText] = useState("");
  const control = useAnimation();
  const textControl = useAnimation();

  const handleMouseEnter = () => {
    control.start("hovered");
    setText(text);
    textControl.start("visible");
  };

  const handleMouseLeave = () => {
    control.start("unhovered");
    textControl.start("hidden");
    setText("");
  };

  return (
    <motion.button
      onClick={action}
      className="p-2 rounded-full transition-all duration-300 overflow-hidden"
      style={{ backgroundColor: bg }}
      variants={{
        hovered: { width: 60, scale: 1.2 },
        unhovered: { width: 0, scale: 1 },
      }}
      initial="unhovered"
      animate={control}
      transition={{ duration: 0.2, mass: 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.p
        className="text-white font-[Sf] text-[12px] absolute"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        variants={{
          visible: {
            opacity: 1,
            transition: { delay: 0.5, duration: 0.2, mass: 0 },
          },
          hidden: { opacity: 0 },
        }}
        initial="hidden"
        animate={textControl}
      >
        {mytext}
      </motion.p>
    </motion.button>
  );
};

export default Actionbtn;
