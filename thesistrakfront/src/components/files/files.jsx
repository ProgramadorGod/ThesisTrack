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
import { motion, spring } from "motion/react";
import { duration, Slider, Switch } from "@mui/material";
import Filters from "./Filters";
import Filters2 from "./Filters2";
import { useAppContext } from "../../AppContext";

const Files = ({ PortToUse }) => {
  const [AllDocuments, setAllDocuments] = useState([]);
  const [NextPage, setNextPage] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showFilters2, setShowFilters2] = useState(false);
  const [authorText, setAuthorText] = useState("");

  const [showTitles, setShowTitles] = useState(true);
  const [showCarrers, setShowCarrers] = useState(true);
  const [showAuthors, setShowAuthors] = useState(true);
  const [showYears, setShowYears] = useState(true);
  const [carrers, setCarrers] = useState([]);

  const [yearRange, setYearRange] = useState([2001, 2024]);
  const {Carrers} = useAppContext();

  useEffect(() => {
    setCarrers(Carrers);
  }, [Carrers]);

  const handleYearChange = (event, newValue) => {
    setYearRange(newValue);
  };

  const formatYear = (value) => {
    return `${value}`;
  };

  const toogleFilters = () => {
    setShowFilters((prevState) => !prevState);
  };

  const toogleFilters2 = () => {
    setShowFilters2((prevState) => !prevState);
  };

  useEffect(() => {
    fetchDocuments(searchQuery); // Llamar a la función cuando cambian los filtros
    setisLoading(false);
  }, [authorText]); // Dependencias de los filtros

  const fetchDocuments = async (title = "") => {
    try {
      console.log("Valores actuales del filtro:", {
        showTitles,
        showYears,
        showAuthors,
        showCarrers,
        yearRange,
      });
      
      const params = { title };
      try {
        if (authorText.trim() !== "") {
          params.author = authorText.trim();
        }
      } catch (error) {
        console.error("Error al crear los parámetros de búsqueda:", error);
      }
  
      const response = await axios.get(PortToUse + "api/documentz/", {
        params,
        
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

  const debouncedFetchDocuments = useCallback(
    debounce((title) => {
      fetchDocuments(title);
    }, 200),
    []
  );

  const handleSearch = async (e) => {
    const title = e.target.value;
    setSearchQuery(title);
    debouncedFetchDocuments(title);
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

            <div id="FilterButtom">
              <FaFilter />
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

  const filterProps = {
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
    authorText, 
    setAuthorText,
    setShowAuthors,
    setShowCarrers,
    setShowTitles,
    setShowYears,
  };

  return (
    <div>
      <div id="">{showFilters2 && <Filters2 {...filterProps} />}</div>
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
            <div id="FilterButtom" onClick={toogleFilters2}>
              <FaFilter />
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
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{}}
        ></motion.div>
      </div>
    </div>
  );
};

export default Files;
