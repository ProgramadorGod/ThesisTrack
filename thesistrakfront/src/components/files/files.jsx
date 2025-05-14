import React, { useCallback, useEffect, useState, useRef } from "react";
import "./files.css";
import axios from "axios";
import Document from "./Document";
import { RxZoomIn } from "react-icons/rx";
import { FaFilter } from "react-icons/fa";

import InputSpotlightBorderCSS from "./effect";
import LoadingFiles from "./LoadingFiles";
import Filters2 from "./Filters2";
import { useAppContext } from "../../AppContext";
import { motion } from "motion/react";

const Files = ({ PortToUse }) => {
  const [AllDocuments, setAllDocuments] = useState([]);
  const [NextPage, setNextPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQueryInput, setSearchQueryInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [authorText, setAuthorText] = useState("");
  const [yearRange, setYearRange] = useState([2001, 2024]);

  const fetchRequestIdRef = useRef(0);

  const [showFilters2, setShowFilters2] = useState(false);
  const [showTitles, setShowTitles] = useState(true);
  const [showCarrers, setShowCarrers] = useState(true);
  const [showAuthors, setShowAuthors] = useState(true);
  const [showYears, setShowYears] = useState(true);

  const { Carrers } = useAppContext();
  const [carrers, setCarrers] = useState([]);
 
  // ✅ Sincronizar carreras desde contexto
  useEffect(() => {
    setCarrers(Carrers);
  }, [Carrers]);


  useEffect(() => {
  if (showFilters2) {
    document.body.style.overflow = "hidden"; // Bloquea el scroll
  } else {
    document.body.style.overflow = ""; // Restaura el scroll
  }

  // Limpieza por si desmonta el componente con el filtro abierto
  return () => {
    document.body.style.overflow = "";
  };
}, [showFilters2]);
  // ✅ Fetch documents
  const fetchDocuments = useCallback(async (title, author, yearRange, currentId) => {
    try {
      console.log("Fetching with filters:", { title, author, yearRange });

      const params = { title };
      if (author.trim() !== "") params.author = author.trim();
      if (yearRange.length === 2) {
        params.year_from = yearRange[0];
        params.year_to = yearRange[1];
      }

      const response = await axios.get(PortToUse + "api/documentz/", {
        params,
        withCredentials: true,
      });

      if (currentId === fetchRequestIdRef.current) {
        setAllDocuments(response.data.results);
        setNextPage(response.data.next);
        localStorage.setItem("documents", JSON.stringify(response.data.results));
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error Trying To Fetch Documents: ", error);
      setIsLoading(false);
    }
  }, [PortToUse]);

  // ✅ Debounce input de búsqueda
  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchQueryInput), 500);
    return () => clearTimeout(timer);
  }, [searchQueryInput]);

  // ✅ Debounce input de autor
  useEffect(() => {
    const timer = setTimeout(() => setAuthorText(authorInput), 500);
    return () => clearTimeout(timer);
  }, [authorInput]);

  // ✅ Cuando cambian filtros, nueva búsqueda
  useEffect(() => {
    fetchRequestIdRef.current += 1;
    fetchDocuments(searchQuery, authorText, yearRange, fetchRequestIdRef.current);
  }, [searchQuery, authorText, yearRange, fetchDocuments]);

  // ✅ Carga inicial
  useEffect(() => {
    fetchRequestIdRef.current += 1;
    fetchDocuments("", "", yearRange, fetchRequestIdRef.current);
  }, [fetchDocuments, yearRange]);

  // ✅ Paginación (load more)
  const AddDocuments = async () => {
    if (NextPage) {
      try {
        const response = await axios.get(NextPage, { withCredentials: true });
        setAllDocuments((prev) => [...prev, ...response.data.results]);
        setNextPage(response.data.next);
        localStorage.setItem("documents", JSON.stringify([...AllDocuments, ...response.data.results]));
      } catch (error) {
        console.error("Error Trying To Fetch Documents: ", error);
      }
    }
  };

  // ✅ Handlers
  const handleSearch = (e) => setSearchQueryInput(e.target.value);
  const handleAuthorSearch = (e) => setAuthorInput(e.target.value);
  const handleYearChange = (event, newValue) => setYearRange(newValue);

  const toggleFilters2 = () => setShowFilters2((prev) => !prev);

  const updateDocumentVisualizations = (id, newCount) => {
    setAllDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, visualizations: newCount } : doc))
    );
  };

  const filterProps = {
    toggleFilters2,
    showFilters2,
    showAuthors,
    showCarrers,
    handleAuthorSearch,
    showTitles,
    showYears,
    yearRange,
    carrers,
    formatYear: (value) => `${value}`,
    handleYearChange,
    authorText: authorInput,
    setAuthorText: handleAuthorSearch,
    setShowAuthors,
    setShowCarrers,
    setShowTitles,
    setShowYears,
  };

  if (isLoading) {
    return (
      <div id="totaldocumentscontainer">
        <div id="BrowserContainer">
          <div id="SearchInputContainer">
            <InputSpotlightBorderCSS
              searchQuery={searchQueryInput}
              handleSearch={handleSearch}
              id="PersonalBrowser"
              type="text"
            />
            <div id="ZoomIcon"><RxZoomIn /></div>
            <div id="FilterButtom" className="hoverable"><FaFilter /></div>
          </div>
          <div id="WaitingContainer"><LoadingFiles /></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {showFilters2 && <Filters2 {...filterProps} />}

      <div id="totaldocumentscontainer">
        <div id="BrowserContainer">
          <div id="SearchInputContainer">
            <InputSpotlightBorderCSS
              searchQuery={searchQueryInput}
              handleSearch={handleSearch}
              id="PersonalBrowser"
              type="text"
            />
            <div id="ZoomIcon"><RxZoomIn /></div>
            <div id="FilterButtom" className="hoverable" onClick={toggleFilters2}>
              <FaFilter />
            </div>
          </div>

          {AllDocuments.map((document) => (
            <Document
              key={document.id}
              document={document}
              onUpdateVisualizations={updateDocumentVisualizations}
            />
          ))}

          {NextPage && (
            <button onClick={AddDocuments} className="load-more-button">
              Cargar más
            </button>
          )}
        </div>

        <motion.div
          className="FiltersSection"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        />
      </div>
    </div>
  );
};

export default Files;
