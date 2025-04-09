import React, { useCallback, useEffect, useState } from "react";
import "./files.css";
import axios from "axios";
import Loadingrectangle from "../loading/loading";
import Document from "./Document";
import { RxDoubleArrowDown, RxZoomIn } from "react-icons/rx";
import InputSpotlightBorderCSS from "./effect";
import { debounce, delay } from "lodash";
import LoadingFiles from "./LoadingFiles";
import { FaFilter, FaPlus } from "react-icons/fa";
import { motion, spring } from "framer-motion";
import { duration, Slider, Switch } from "@mui/material";

const Filters = ({
  toogleFilters2,
  showFilters,
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

  return (
    <motion.div
      id="AbsoluteCircle"
      onClick={toogleFilters2}
      initial={{ display: "none", backgroundColor: "#2b344100" }}
      animate={{
        display: showFilters ? "flex" : "none",
        backgroundColor: showFilters ? "#2b3441a2" : "#2b344100",
      }}
      transition={{
        display: { delay: showFilters ? 0 : 0.2 },
        backgroundColor: { delay: showFilters ? 0.3 : 0, duration: 0.3 },
      }}
    >
      <div id="CircleContainer">
        <motion.div
          onClick={(event) => event.stopPropagation()}
          id="Circle"
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
            borderRadius: "50%",
            width: 10,
            height: 10,
            backgroundColor: showFilters ? "#070022b9" : "#ffffff",
          }}
          animate={{
            opacity: showFilters ? 1 : 0,
            y: showFilters ? [-200, 400, 80] : [80, 400, -100],
            width: showFilters ? "100vw" : "10vw",
            height: showFilters ? "100vh" : "10vw",
            borderRadius: showFilters ? "0%" : "50%",
            backgroundColor: showFilters ? "#ffffff" : "#070022b9",
          }}
          transition={{
            y: { duration: showFilters ? 0.4 : 0.3, type: spring },
            width: {
              delay: showFilters ? 0.2 : 0,
              duration: showFilters ? 0.4 : 0.2,
            },
            height: {
              delay: showFilters ? 0.2 : 0,
              duration: showFilters ? 0.4 : 0.2,
            },
            borderRadius: { delay: showFilters ? 0.3 : 0, duration: 0.1 },
            opacity: { duration: showFilters ? 0 : 0.5 },
            backgroundColor: {
              delay: showFilters ? 0.1 : 0,
              duration: showFilters ? 0.3 : 0.1,
            },
          }}
        >
          <motion.div
            id="FiltersInsideCircleContainer"
            initial={{ opacity: showFilters ? 0 : 1 }}
            animate={{
              opacity: showFilters ? 1 : 0,
            }}
            transition={{
              opacity: { delay: showFilters ? 0.45 : 0 },
            }}
          >
            <div id="FilterTitle"> Filtros Avanzados</div>
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
              <div id="YearSubtitle">AÑO DE PUBLICACIÓN</div>
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
                <div id="Explanaition">
                  <strong>Años seleccionados:</strong> {yearRange[0]} -{" "}
                  {yearRange[1]}
                </div>
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
      </div>
    </motion.div>
  );
};

export default Filters;
