import React from 'react';
import { motion } from 'framer-motion';
import './LiquidBorder.css';

const waveVariants = {
  start: {
    d: "M0,100 C20,80 40,120 60,100 C80,80 100,120 120,100 C140,80 160,120 180,100 C200,80 220,120 240,100 C260,80 280,120 300,100 V150 H0 Z",
  },
  end: {
    d: "M0,100 C20,120 40,80 60,100 C80,120 100,80 120,100 C140,120 160,80 180,100 C200,120 220,80 240,100 C260,120 280,80 300,100 V150 H0 Z",
  }
};

const LiquidBorder = ({ children }) => (
  <div className="container">
    <div className="content">{children}</div>
    <motion.svg
      className="wave"
      viewBox="0 0 300 150"
      initial="start"
      animate="end"
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      variants={waveVariants}
    >
      <motion.path
        variants={waveVariants}
        initial="start"
        animate="end"
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  </div>
);

export default LiquidBorder;
