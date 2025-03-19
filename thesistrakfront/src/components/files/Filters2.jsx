import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Filters2.css";
import { Slider, Switch } from "@mui/material";
import { HiX } from "react-icons/hi"; // Ícono de cierre (X)

const Filters2 = ({
  toogleFilters2,
  showFilters2,
  showAuthors,
  showCarrers,
  showTitles,
  showYears,
  yearRange,
  carrers,
  formatYear,
  handleYearChange,
  setShowAuthors,
  setShowCarrers,
  setShowTitles,
  setShowYears,
}) => {
  const [animateState, setAnimateState] = useState("initial");
  const handleFilterChange = (filterName) => (event) => {
    switch (filterName) {
      case "showTitles":
        setShowTitles((prev) => !prev);
        break;
      case "showCarrers":
        setShowCarrers((prev) => !prev);
        break;
      case "showAuthors":
        setShowAuthors((prev) => !prev);
        break;
      case "showYears":
        setShowYears((prev) => !prev);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (showFilters2) {
      setAnimateState("expanded");
      setTimeout(() => setAnimateState("fullScreen"), 400);
    } else {
      setAnimateState("retract");
      setTimeout(() => setAnimateState("initial"), 400);
    }
  }, [showFilters2]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        toogleFilters2();
      }
    };

    if (showFilters2) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showFilters2, toogleFilters2]);

  return (
    <AnimatePresence>
      {(showFilters2 || animateState !== "initial") && (
        <motion.div
          id="MobileFilters"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            id="Ball"
            initial={{
              top: -30,
              borderRadius: "50%",
              width: "50px",
              height: "50px",
            }}
            animate={
              animateState === "expanded"
                ? {
                    top: "50%",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                  }
                : animateState === "fullScreen"
                ? {
                    top: "0%",
                    borderRadius: "0%",
                    width: "100%",
                    height: "100%",
                  }
                : {
                    top: "50%",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                  }
            }
            exit={{ top: -30 }}
            transition={{
              top: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.1,
              },
              borderRadius: { delay: 0.2, duration: 0.2 },
              width: { delay: 0.1, duration: 0.1 },
              height: { delay: 0.1, duration: 0.1 },
            }}
          >
            <motion.div
              id="BallInner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.2 }}
            >
              <motion.div
                id="FiltersInsideCircleContainer"
                initial={{ opacity: showFilters2 ? 0 : 1 }}
                animate={{
                  opacity: showFilters2 ? 1 : 0,
                }}
                transition={{
                  opacity: { delay: showFilters2 ? 0.45 : 0 },
                }}
              >
                <div id="FilterAndXContainer">
                  <div id="FilterTitle">
                    {" "}
                    Filtros Avanzados{" "}

                  </div>
                  <div id="HiX" onClick={toogleFilters2}>
                      {" "}
                      <HiX></HiX>{" "}
                    </div>
                </div>
                <div id="Switches">
                  <div className="FilterOption">
                    TÍTULOS
                    <Switch
                      checked={showTitles} // Estado actual
                      onClick={handleFilterChange("showTitles")} // Cambios controlados
                    />
                  </div>
                  <div className="FilterOption">
                    CARRERAS
                    <Switch
                      checked={showCarrers} // Estado actual
                      onClick={handleFilterChange("showCarrers")} // Cambios controlados
                    />
                  </div>
                  <div className="FilterOption">
                    AÑOS
                    <Switch
                      checked={showYears} // Estado actual
                      onClick={handleFilterChange("showYears")} // Cambios controlados
                    />
                  </div>
                  <div className="FilterOption">
                    AUTORES
                    <Switch
                      checked={showAuthors} // Estado actual
                      onClick={handleFilterChange("showAuthors")} // Cambios controlados
                    />
                  </div>
                </div>

                <div id="SliderContainer">
                  <div id="YearSubtitle">
                    AÑO DE PUBLICACIÓN |{" "}
                    <div id="Explanaition">
                      <strong>Años seleccionados:</strong> {yearRange[0]} -{" "}
                      {yearRange[1]} 
                    </div>
                  </div>
                  <div id="Range">
                    <Slider
                      id="RealSlider"
                      getAriaLabel={() => "Rango de años"}
                      value={yearRange}
                      onChange={handleYearChange}
                      valueLabelDisplay="auto"
                      getAriaValueText={formatYear}
                      min={2001}
                      max={2024}
                      disableSwap
                    />
                  </div>
                  <div className="Text"> CARRERAS </div>
                  <div id="CarrersGroup">
                    {carrers.map((carrer, index) => (
                      <div className="CarrerButtom" key={index}>
                        {carrer.name.length > 30
                          ? `${carrer.name.slice(0, 30)}...`
                          : carrer.name}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Filters2;
