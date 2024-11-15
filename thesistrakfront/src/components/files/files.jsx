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
import { duration } from "@mui/material";

const Files = ({ PortToUse }) => {
  const [AllDocuments, setAllDocuments] = useState([]);
  const [NextPage, setNextPage] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const toogleFilters = () => {
    setShowFilters((prevState) => !prevState);
  };

  const toogleFilters2 = () => {
    setShowFilters(false);
  };

  const fetchDocuments = async (query = "") => {
    try {
      const response = await axios.get(PortToUse + "api/documentz/", {
        params: { query },
        withCredentials: true,
      });
      setAllDocuments(response.data.results);
      setNextPage(response.data.next);
      localStorage.setItem("documents", JSON.stringify(response.data.results));
    } catch (error) {
      console.error("Error Trying To Fetch Documents: ", error);
    }
  };

  const AddDocuments = async () => {
    if (NextPage) {
      try {
        const response = await axios.get(NextPage, {
          withCredentials: true,
        });
        setAllDocuments((prevDocuments) => [
          ...prevDocuments,
          ...response.data.results,
        ]);
        setNextPage(response.data.next);
        localStorage.setItem(
          "documents",
          JSON.stringify([...AllDocuments, ...response.data.results])
        );
      } catch (error) {
        console.error("Error Trying To Fetch Documents: ", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchDocuments();
      setisLoading(false);
    };
    fetchData();
  }, []); // Arreglo de dependencias vacío para ejecutar solo una vez

  const debouncedFetchDocuments = useCallback(
    debounce((query) => {
      fetchDocuments(query);
    }, 200),
    []
  );

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedFetchDocuments(query);
  };

  if (isLoading) {
    return (
      <div id="totaldocumentscontainer">
        <div id="BrowserContainer">
          <div id="SearchInputContainer">
            <InputSpotlightBorderCSS
              searchQuery={searchQuery}
              handleSearch={handleSearch}
              id="PersonalBrowser"
              type="text"
            ></InputSpotlightBorderCSS>

            {/* <input
            id="PersonalBrowser"
            type="text"
            placeholder="   Buscar Documentos, Tesis, Investigaciones, Pasantias y más "
            value={searchQuery}
            onChange={handleSearch}
          /> */}

            <div id="ZoomIcon">
              <RxZoomIn></RxZoomIn>
            </div>
          </div>
          <div id="WaitingContainer">
            <LoadingFiles></LoadingFiles>
          </div>
        </div>

        {/* <div id="FiltersContainer">
        <div id="FiltersText">
          Filters
        </div>
        <div>lol</div>

      </div> */}
      </div>
    );
  }

  return (
    <div>
      <div id="">
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
                backgroundColor: showFilters ? "#0C195A" : "#ffffff",
              }}
              animate={{
                opacity: showFilters ? 1 : 0,
                y: showFilters ? [-200, 400, 80] : [80, 400, -100],
                width: showFilters ? "100vw" : "10vw",
                height: showFilters ? "100vw" : "10vw",
                borderRadius: showFilters ? "0%" : "50%",
                backgroundColor: showFilters ? "#ffffff" : "#0C195A",
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

              <motion.div id="FiltersInsideCircleContainer"
                initial={{opacity:showFilters ? 0 : 1}}
                animate={{
                  opacity: showFilters ? 1 : 0
                }}
                transition={{
                  opacity:{delay: showFilters ? 0.45 : 0}
                }}
              >
                Filtrado Avanzado
                

              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <div id="totaldocumentscontainer">
        <div id="BrowserContainer">
          <div id="SearchInputContainer">
            <InputSpotlightBorderCSS
              searchQuery={searchQuery}
              handleSearch={handleSearch}
              id="PersonalBrowser"
              type="text"
            ></InputSpotlightBorderCSS>

            {/* <input
            id="PersonalBrowser"
            type="text"
            placeholder="   Buscar Documentos, Tesis, Investigaciones, Pasantias y más "
            value={searchQuery}
            onChange={handleSearch}
          /> */}

            <div id="ZoomIcon">
              <RxZoomIn></RxZoomIn>
            </div>
          </div>

          <>
            {AllDocuments.map((document) => (
              <Document key={document.id} document={document} />
            ))}

            {NextPage && (
              <button onClick={AddDocuments} className="load-more-button">
                Cargar más
              </button>
            )}
          </>
        </div>

        <motion.div
          className="FiltersSection"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{
            x: {},
            type: "spring",
            damping: 300,
            shiftness: 300,
          }}
        >
          <div id="FiltersDisplayMenu">
            <FaFilter id="PlusIcon" onClick={toogleFilters}></FaFilter>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Files;
