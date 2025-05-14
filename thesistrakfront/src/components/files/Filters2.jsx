import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./Filters2.css";
import { HiArrowRight, HiX, HiXCircle } from "react-icons/hi";
import { Slider, TextField } from "@mui/material";
import { useDebounce } from "./UseDebounce"; // importa el hook aquí
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StickSlider from "react-slick";

const Filters2 = ({
  toggleFilters2,
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
  handleAuthorSearch,
  setShowYears,
  authorText,
  setAuthorText,
}) => {
  const [animateState, setAnimateState] = useState("initial");
  const [selectedCarrers, setSelectedCarrers] = useState([]);
  const [allowSwipe, setAllowSwipe] = useState(false);

  const enableSwipe = () => setAllowSwipe(true);
  const disableSwipe = () => setAllowSwipe(false);

  const toggleCareerSelection = (careerId) => {
    setSelectedCarrers((prev) =>
      prev.includes(careerId)
        ? prev.filter((id) => id !== careerId)
        : [...prev, careerId]
    );
  };

  const sliderSettings = {
    dots: true,
    infinite:false, // Mejora rendimiento, evita loop innecesario
    speed: 400, // Más rápido (de 800 a 400ms)
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Quita flechas si no las usas (menos repaints)
    swipe: allowSwipe, // controlas con hover/touch
    touchThreshold: 10, // más sensible (por defecto es 5)
    cssEase: "ease-out", // suaviza la animación
    waitForAnimate: false, // no bloquea rápido swipe

    swipeToSlide: true, // permite swipe parcial con inercia
  };

  // Debounced authorText (espera a que termine de escribir)
  const debouncedAuthorText = useDebounce(authorText, 300);

  // Hacer la petición solo cuando deja de escribir
  useEffect(() => {
    if (debouncedAuthorText.trim() !== "") {
      console.log("Petición con autor:", debouncedAuthorText);
      // Aquí va tu fetch o axios API call
    }
  }, [debouncedAuthorText]);

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
        toggleFilters2();
      }
    };
    if (showFilters2) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showFilters2, toggleFilters2]);

  return (
    <AnimatePresence>
      <motion.div
        id="HiX"
        onClick={toggleFilters2}
        className="hoverable"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transformOrigin: "center center", // Asegura el punto de rotación en el centro
        }}
        initial={{
          opacity: 0,
          top: 20,
          marginRight: "2.2vw",
          rotate: 360, // Varias vueltas
        }}
        animate={{
          opacity: 1,
          top: -7,
          marginRight: "2vw",
          rotate: 0, // Termina normal
        }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.8,
          ease: "easeOut",
        }}
      >
        <HiXCircle />
      </motion.div>

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
              <StickSlider {...sliderSettings}>
                <div>
                  <motion.div
                    id="FiltersInsideCircleContainer"
                    onMouseEnter={enableSwipe}
                    onMouseLeave={enableSwipe}
                    onTouchStart={enableSwipe}
                    onTouchEnd={enableSwipe}
                    initial={{ opacity: showFilters2 ? 0 : 1 }}
                    animate={{ opacity: showFilters2 ? 1 : 0 }}
                    transition={{ opacity: { delay: showFilters2 ? 0.45 : 0 } }}
                  >
                    <div id="FilterAndXContainer">
                      <div id="FilterTitle"> FILTROS </div>
                    </div>

                    <div id="AuthorInputContainer">
                      <div id="authorfield"> Busca un autor </div>
                      <TextField
                        fullWidth
                        className="writable"
                        onMouseEnter={disableSwipe}
                        onMouseLeave={disableSwipe}
                        onTouchStart={disableSwipe}
                        onTouchEnd={disableSwipe}
                        sx={{
                          width: "60vw",
                          fontFamily: "Apple",
                          boxShadow: "6px 6px 10px 0px rgba(0, 0, 0, 0.57)",
                          borderRadius: "7px",
                          backgroundColor: "#f0f0f0",
                          border: "0px !important",
                          outline: "0px",
                        }}
                        variant="outlined"
                        placeholder="Nombre del autor"
                        value={authorText}
                        onChange={(e) => handleAuthorSearch(e)}
                        size="small"
                      />
                    </div>

                    <div id="SliderContainer">
                      <div id="YearSubtitle">
                        AÑO DE PUBLICACIÓN |{" "}
                        <div id="Explanaition">
                          {" "}
                          <strong>Selección:</strong> {yearRange[0]} -{" "}
                          {yearRange[1]}{" "}
                        </div>
                      </div>
                      <div id="Range">
                        <Slider
                          onMouseEnter={disableSwipe}
                          onMouseLeave={enableSwipe}
                          onTouchStart={disableSwipe}
                          onTouchEnd={enableSwipe}
                          id="RealSlider"
                          className="hoverable"
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

                      {/* Carreras */}
                      
                    </div>
                    <div
                        id="CarrersCarouselContainer"
                        onMouseEnter={enableSwipe}
                        onMouseLeave={disableSwipe}
                        onTouchStart={enableSwipe}
                        onTouchEnd={disableSwipe}
                      >
                        <h2 className="CareerOption">Carreras <HiArrowRight></HiArrowRight></h2>
                      </div>
                  </motion.div>
                </div>
                <div
                  id="FiltersInsideCircleContainer"
                  onMouseEnter={enableSwipe}
                  onMouseLeave={disableSwipe}
                  onTouchStart={enableSwipe}
                  onTouchEnd={disableSwipe}
                >
                  <div
                    id="CarrersCarouselContainer"
                    onMouseEnter={enableSwipe}
                    onMouseLeave={disableSwipe}
                    onTouchStart={enableSwipe}
                    onTouchEnd={disableSwipe}
                  >
                    <h2 className="CareerOption">Carreras</h2>
                  </div>
                </div>
              </StickSlider>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Filters2;
