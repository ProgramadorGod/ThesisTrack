import { useEffect, useState } from "react";
import { motion, animate, useMotionValue } from "motion/react";
import "./CustomCursor.css";
import { useAppContext } from "./AppContext"; // 👈 importa el contexto

 // 👈 usa las del contexto


const CustomCursor = () => {
  
  const opacity = useMotionValue(1); // Titileo
  const { hovered, setHovered, isWriting, setIsWriting } = useAppContext();
  // Detectar clases en el elemento bajo el cursor


  // Titileo cuando se escribe
  useEffect(() => {
    let animationStopper = null;

    if (isWriting) {
      animationStopper = animate(opacity, [1, 0.3, 1], {
        duration: 1,
        repeat: Infinity,
        easing: "ease-in-out",
      });
    } else {
      opacity.set(1);
    }

    return () => {
      if (animationStopper) animationStopper.cancel();
    };
  }, [isWriting]);

  // Movimiento del cursor
  useEffect(() => {
    const moveCursor = (e) => {
      const cursor = document.getElementById("cursor");
      if (cursor) {
        cursor.style.top = `${e.clientY - 10}px`;
        cursor.style.left = `${e.clientX - 10}px`;
      }
    };

    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <motion.div
      id="cursor"
      className={`custom-cursor ${hovered ? "hovered" : ""} ${isWriting ? "writing" : ""}`}
      style={{
        backgroundColor: hovered
          ? "rgba(3, 131, 136, 0.56)"
          : isWriting
          ? "rgb(0, 0, 0)"
          : "rgba(0, 0, 2, 0.6)",
        position: "fixed",
        top: 0,
        left: "50%",
        zIndex: 9999999,
        pointerEvents: "none",
        transform: "translateX(-50%)",
        opacity,
      }}
      initial={{ scale: 0.5, width: "1.3vw", height: "1.3vw", borderRadius: "50%" }}
      animate={{
        scale: hovered ? 1.4 : 1,
        width: isWriting ? "0.25vw" : "1.3vw",
        height: isWriting ? "1.5vw" : "1.3vw",
        borderRadius: isWriting ? "0.1vw" : "50%",
        x: isWriting ? "0.5vw" : "0",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        width: { duration: 0.1 },
        height: { duration: 0.1 },
        borderRadius: { duration: 0.5 },
        x: { duration: 0.1 },
      }}
    />
  );
};

export default CustomCursor;
