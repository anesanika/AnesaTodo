import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface CursorProps {
  text?: string;
  color?: string;
  containerRef?: React.RefObject<HTMLElement>;
}

const Cursor: React.FC<CursorProps> = ({
  text = "",
  color = "red",
  containerRef,
}) => {
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothMouse = {
    x: useSpring(mouse.x, { damping: 20, stiffness: 300, mass: 0.5 }),
    y: useSpring(mouse.y, { damping: 20, stiffness: 300, mass: 0.5 }),
  };

  useEffect(() => {
    const container = containerRef?.current;

    if (container) {
      const mouseMove = (e: MouseEvent) => {
        mouse.x.set(e.clientX);
        mouse.y.set(e.clientY);
      };

      container.addEventListener("mousemove", mouseMove);

      return () => {
        container.removeEventListener("mousemove", mouseMove);
      };
    }
  }, [containerRef, mouse.x, mouse.y]);

  return (
    <motion.div
      style={{
        backgroundColor: color,
        x: smoothMouse.x,
        y: smoothMouse.y,
      }}
      className="p-2 rounded-full fixed pointer-events-none"
    >
      <p className="text-white">{text}</p>
    </motion.div>
  );
};

export default Cursor;
