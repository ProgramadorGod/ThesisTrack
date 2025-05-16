import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import {
  Slider,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useDebounce } from "./UseDebounce"; // Make sure the path is correct
import "./Filters2.css"; // Make sure this CSS file exists and is correctly located

const Filters2 = ({
  toggleFilters2,
  showFilters2,
  yearRange,
  carrers,
  formatYear,
  handleYearChange,
  handleAuthorSearch,
  authorText,
  selectedCarrers,
  setSelectedCarrers,
}) => {
  const [animateState, setAnimateState] = useState("initial");
  const [isOverflowEnabled, setIsOverflowEnabled] = useState(false);
  const [isDisplayEnabled, setIsDisplayEnabled] = useState(false);
  const debouncedAuthorText = useDebounce(authorText, 300);

  if (process.env.NODE_ENV === 'development') {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (/Encountered two children with the same key/.test(args[0])) {
      return; // Ignora los errores relacionados con claves duplicadas
    }
    originalConsoleError(...args);
  };
}

  // Use useCallback to memoize the toggleFilters2 function if it's coming from a parent component.  This can help with performance.  If it's defined within this component, you don't need useCallback.
  // const toggleFilters2 = useCallback(() => {
  //   // Your toggle logic here
  // }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsDisplayEnabled(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOverflowEnabled(true);
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (debouncedAuthorText.trim() !== "") {
      console.log("Petición con autor:", debouncedAuthorText);
    }
  }, [debouncedAuthorText]);

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
      if (event.key === "Escape") toggleFilters2();
    };
    if (showFilters2) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showFilters2, toggleFilters2]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (showFilters2) {
        event.preventDefault();
        toggleFilters2();
        window.history.pushState(null, "", window.location.href);
      }
    };

    if (showFilters2) {
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [showFilters2, toggleFilters2]);

  // useEffect(() => {
  //   console.log("Carreras totales:", carrers);
  //   carrers.forEach((career, index) => {
  //     console.log(`Carrera ${index + 1}:`, career); // Muestra la carrera completa
  //     console.log("ID de la carrera:", career.id); // Muestra el ID
  //     console.log("Nombre de la carrera:", career.name); // Muestra el nombre
  //   });
  // }, [carrers]);

  // ✅ Modificado: ahora guarda nombres en vez de IDs
  const handleToggleCareer = (id) => {
    const selectedCareerName = carrers.find((c) => c.id === id)?.name;

    if (!selectedCareerName) return;

    setSelectedCarrers((prev) =>
      prev.includes(selectedCareerName)
        ? prev.filter((item) => item !== selectedCareerName)
        : [...prev, selectedCareerName]
    );
  };

  // ✅ Console log para depuración
  useEffect(() => {
    console.log("selectedCarrers actual:", selectedCarrers);
  }, [selectedCarrers]);

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
          transformOrigin: "center center",
          filter: "drop-shadow(2px 3px 2px rgb(8, 0, 44))",
        }}
        initial={{ opacity: 0, marginTop: "6vh" }}
        animate={{ opacity: 1, marginTop: "3vh" }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { duration: 0.4, delay: 1, ease: "easeOut" },
          marginTop: { duration: 0.4, delay: 1, ease: "easeOut" },
        }}
      >
        <HiArrowNarrowLeft />
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
              <motion.div
                id="FiltersInsideCircleContainer"
                initial={{ overflowY: "hidden", opacity: 0, display: "none" }}
                animate={{
                  overflowY: isOverflowEnabled ? "auto" : "hidden",
                  display: isDisplayEnabled ? "block" : "none",
                  opacity: 1,
                }}
                exit={{ overflowY: "hidden", opacity: 0 }}
                transition={{ duration: 2, delay: 0.4 }}
              >
                {/* Autor Section */}
                <motion.div id="AuthorInputContainer">
                  <div id="authorfield">BUSCA UN AUTOR</div>
                  <TextField
                    fullWidth
                    className="writable"
                    sx={{
                      width: "80vw",
                      "& .MuiTypography-root": {
                        fontFamily: "Apple",
                        fontWeight: "normal",
                      },
                      "& .MuiInputBase-input": {
                        textAlign: "center",
                      },
                      boxShadow: "6px 6px 10px 0px rgba(0, 0, 0, 0.57)",
                      borderRadius: "7px",
                      backgroundColor: "#f0f0f0",
                    }}
                    variant="outlined"
                    placeholder="Nombre del autor"
                    value={authorText}
                    onChange={handleAuthorSearch}
                    size="medium"
                  />
                </motion.div>

                <Divider
                  sx={{
                    my: 3,
                    width: "90%",
                    margin: "0 auto",
                    borderColor: "rgba(0, 0, 0, 0.7)",
                  }}
                />

                {/* Years Section */}
                <div id="YearsSections">
                  <div id="YearsTitle">RANGO DE AÑOS</div>
                  <motion.div
                    id="SliderContainer"
                    initial={{ opacity: 0, display: "none" }}
                    animate={{ opacity: 1, display: "block" }}
                    exit={{ opacity: 0, display: "none" }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <div id="YearSubtitle">
                      <strong>Selección:</strong> &nbsp;
                      {yearRange[0]} - {yearRange[1]}
                    </div>
                    <div id="Range">
                      <Slider
                        className="hoverable"
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
                  </motion.div>
                </div>

                <Divider
                  sx={{
                    my: 3,
                    width: "90%",
                    margin: "0 auto",
                    borderColor: "rgba(0, 0, 0, 0.7)",
                  }}
                />

                {/* Carreras Section */}
                <div id="CarrersContainer">
                  <div id="YearsTitle">SELECCIONA CARRERAS</div>
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                      borderRadius: 2,
                      boxShadow: 2,
                      marginTop: 2,
                    }}
                  >
                    {carrers.map((career) => {
                      const isSelected = selectedCarrers.includes(career.name);

                      return (
                        <ListItem
                          key={career.id} // Use a unique string key
                          disablePadding
                          divider
                          className="hoverable"
                        >
                          <ListItemButton
                            sx={{
                              paddingLeft: "2vw",
                              paddingRight: "2vw",
                              height: "20vh",
                            }}
                            role={undefined}
                            onClick={() => handleToggleCareer(career.id)}
                            dense
                          >
                            <Checkbox
                              edge="start"
                              checked={isSelected}
                              onChange={() => handleToggleCareer(career.id)}
                              tabIndex={-1}
                              disableRipple
                              sx={{ marginRight: "2vw" }}
                            />
                            <ListItemText
                              primary={career.name}
                              primaryTypographyProps={{
                                fontFamily: "Apple",
                                fontSize: {
                                  xs: "0.8rem",
                                  sm: "1rem",
                                  md: "1.1rem",
                                },
                                
                                fontWeight: "bold",
                                color: isSelected
                                  ? "primary.main"
                                  : "text.primary",
                                textAlign: "center",
                              }}
                              sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
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

