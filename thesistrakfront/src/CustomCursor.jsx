import { useEffect, useState } from "react";
import { motion, animate, useMotionValue } from "motion/react";
import "./CustomCursor.css";
import { useAppContext } from "./AppContext";

let rippleId = 0;

const CustomCursor = () => {
  const opacity = useMotionValue(1);
  const { hovered, setHovered, isWriting, setIsWriting } = useAppContext();
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorScale, setCursorScale] = useState(1); // Por defecto 1x
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      setCursorScale(width <= 799 ? 1.6 : 1); // Escala 1.6 si vw <= 799
    };

    updateScale(); // Ejecuta al montar

    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice =
        typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0);
      setIsMobile(isTouchDevice);
    };
    checkMobile();
  }, []);

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

  useEffect(() => {
    const handleClick = (e) => {
      const newRipple = {
        id: rippleId++,
        x: e.clientX - 13,
        y: e.clientY - 13,
      };
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 200);

      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const moveCursor = (e) => {
      const cursor = document.getElementById("cursor");
      if (cursor) {
        cursor.style.top = `${e.clientY - 10}px`;
        cursor.style.left = `${e.clientX - 10}px`;
      }

      const elementUnderCursor = document.elementFromPoint(
        e.clientX,
        e.clientY
      );

      let isHoverable = false;
      let isWritable = false;

      if (elementUnderCursor) {
        let el = elementUnderCursor;
        while (el) {
          if (el.classList?.contains("hoverable")) isHoverable = true;
          if (el.classList?.contains("writable")) isWritable = true;
          if (isHoverable && isWritable) break;
          el = el.parentElement;
        }
      }

      setHovered(isHoverable);
      setIsWriting(isWritable);
    };

    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, [setHovered, setIsWriting]);

  const baseWidth = 1.3 * cursorScale;
  const baseHeight = 1.3 * cursorScale;
  const writingWidth = 0.25 * cursorScale;
  const writingHeight = 1.5 * cursorScale;
  const rippleSize = 1.7 * cursorScale;

  return (
    <>
      <motion.div
        id="cursor"
        className={`custom-cursor ${hovered ? "hovered" : ""} ${
          isWriting ? "writing" : ""
        }`}
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
          display: isMobile ? "none" : "block",
        }}
        initial={{
          scale: 0.5,
          width: `${baseWidth}vw`,
          height: `${baseHeight}vw`,
          borderRadius: "50%",
          display: isMobile ? "none" : "block",
        }}
        animate={{
          scale: isClicking ? 1.2 : hovered ? 1.4 : 1,
          width: isWriting ? `${writingWidth}vw` : `${baseWidth}vw`,
          height: isWriting ? `${writingHeight}vw` : `${baseHeight}vw`,
          borderRadius: isWriting ? "0.1vw" : "50%",
          x: isWriting ? "0.5vw" : "0",
          display: isMobile ? "none" : "block",
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

      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="cursor-ripple"
          initial={{
            opacity: 0.6,
            scale: 0,
            rotate: 0,
            top: ripple.y,
            left: ripple.x,
          }}
          animate={{
            scale: 4,
            opacity: 0,
            rotate: 360,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          style={{
            position: "fixed",
            width: `${rippleSize}vw`,
            height: `${rippleSize}vw`,
            borderRadius: "50%",
            pointerEvents: "none",
            border: "1px solid rgba(9, 34, 146, 0.82)",
            boxShadow: "0 -2px 3px rgba(255,255,255,0.6)",
            transform: "translate(-50%, -50%)",
            zIndex: 9999998,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
