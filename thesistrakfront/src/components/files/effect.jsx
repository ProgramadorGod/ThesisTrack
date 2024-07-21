import React, { useRef, useState } from "react";
import "./spotlightBorder.css";

const InputSpotlightBorderCSS = ({searchQuery, handleSearch}) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div className="input-wrapper relative">
      <input
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        autoComplete="off"
        placeholder="Search Documents, Thesis, Investigations, Internships and more.."
        type="email"
        name="email"
        className="base-input"
        value={searchQuery}
        onChange={handleSearch}
      />
      <input
        ref={divRef}
        disabled
        style={{
          border: "0.24vw outset #01274f",
          opacity,
          WebkitMaskImage: `radial-gradient(30% 50px at ${position.x}px ${position.y}px, rgb(153, 243, 255) 45%, transparent)`,
        }}
        aria-hidden="true"
        className="overlay-input"
      />
    </div>
  );
};

export default InputSpotlightBorderCSS;
