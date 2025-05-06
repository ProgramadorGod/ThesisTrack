import React, { useCallback, useEffect, useState } from "react";
import "./files.css";
import axios from "axios";
import Document from "./Document";
import { RxZoomIn } from "react-icons/rx";
import InputSpotlightBorderCSS from "./effect";
import LoadingFiles from "./LoadingFiles";
import debounce from "lodash/debounce";


const Files = ({ PortToUse }) => {
  const [AllDocuments, setAllDocuments] = useState([]);
  const [NextPage, setNextPage] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDocuments(); // Carga inicial sin filtros
    setisLoading(false);
  }, []);

  const fetchDocuments = async (title = "") => {
    try {
      const response = await axios.get(PortToUse + "api/documentz/", {
        params: { title },
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

  const handleSearch = (e) => {
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
            />
            <div id="ZoomIcon">
              <RxZoomIn />
            </div>
          </div>
          <div id="WaitingContainer">
            <LoadingFiles />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div id="totaldocumentscontainer">
        <div id="BrowserContainer">
          <div id="SearchInputContainer">
            <InputSpotlightBorderCSS
              searchQuery={searchQuery}
              handleSearch={handleSearch}
              id="PersonalBrowser"
              type="text"
            />
            <div id="ZoomIcon">
              <RxZoomIn />
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
      </div>
    </div>
  );
};

export default Files;
