import React, { useCallback, useEffect, useState } from "react";
import "./files.css";
import axios from "axios";
import Loadingrectangle from "../loading/loading";
import Document from "./Document";
import { RxDoubleArrowDown, RxZoomIn } from "react-icons/rx";
import InputSpotlightBorderCSS from "./effect";
import { debounce } from 'lodash';
import LoadingFiles from "./LoadingFiles";


const Files = ({ PortToUse }) => {
  const [AllDocuments, setAllDocuments] = useState([]);
  const [NextPage, setNextPage] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
          JSON.stringify([
            ...AllDocuments,
            ...response.data.results,
          ])
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
    debounce((query) =>{
      fetchDocuments(query);

    },200),[]

  )


  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedFetchDocuments(query)
  };

  if (isLoading) {
    
    return( 
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
      
  )
  }

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
        <div id="Filters-Container">
          <div className="Carrers-Filter">Carrers</div>
          <div className="Carrers-Filter">Year</div>
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

      {/* <div id="FiltersContainer">
        <div id="FiltersText">
          FILTERS
        </div>
        <div id="Filters">
          <div id="Carrers-Section">
            <div id="Carrers-Section-Text">
              CARRERS
            </div>
            <div>
              <RxDoubleArrowDown id="Carrers-Icon"></RxDoubleArrowDown>
            </div>
          </div>
        </div>

      </div> */}

    </div>
    
  );
};

export default Files;
