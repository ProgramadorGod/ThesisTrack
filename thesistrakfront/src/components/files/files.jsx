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
import SwitchBase from "@mui/material/internal/SwitchBase";
import Filters from "./Filters";

const Files = ({ PortToUse }) => {
  const [AllDocuments, setAllDocuments] = useState([]);
  const [NextPage, setNextPage] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showTitles, setShowTitles] = useState(true);
  const [showCarrers, setShowCarrers] = useState(true);
  const [showAuthors, setShowAuthors] = useState(true);
  const [showYears, setShowYears] = useState(true);
  const [carrers, setCarrers] = useState([]);

  const [yearRange, setYearRange] = useState([2001, 2024]);




  const fetchCarrers = async (query = "") => {
    try {
      const response = await axios.get(PortToUse + "api/carrers/", {
        withCredentials: true,
      });
      setCarrers(response.data);
    } catch (error) {
      console.error("Error fetching carrers", error);
    }
  };

  useEffect(() => {
    fetchCarrers();
  }, []);

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
    setShowFilters(false);
  };

useEffect(() => {
  fetchDocuments(searchQuery); // Llamar a la función cuando cambian los filtros
  setisLoading(false);
}, [showTitles, showCarrers, showAuthors, showYears, yearRange]); // Dependencias de los filtros


  const fetchDocuments = async (query = "" ) => {


    try {
      console.log("Valores actuales del filtro:", {
        showTitles,
        showYears,
        showAuthors,
        showCarrers,
        yearRange,
      });
      const response = await axios.get(PortToUse + "api/documentz/", {
        params: {
          query,
          sort_by: "title",
          year: showYears ? yearRange : null,
          show_titles: showTitles,
          show_authors: showAuthors,
          show_carrers: showCarrers,
          show_years: showYears,
        },
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
    debounce((query) => {
      fetchDocuments(query);
    }, 200),
    [showAuthors, showCarrers,showTitles, showYears]
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

  const filterProps = {
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
  };

  return (
    <div>
      <div id="">
        <Filters {...filterProps}></Filters>
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
            x: {duration:0.2},
            
            
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
