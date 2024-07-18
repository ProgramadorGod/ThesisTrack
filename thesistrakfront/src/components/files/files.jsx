import React, { useEffect, useState } from "react";
import "./files.css";
import axios from "axios";
import Loadingrectangle from "../loading/loading";
import Document from "./Document";

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

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    await fetchDocuments(query);
  };

  if (isLoading) {
    return <Loadingrectangle />;
  }

  return (
    <div id="totaldocumentscontainer">
      <div>
        <input
          id="PersonalBrowser"
          type="text"
          placeholder="Buscar documentos..."
          value={searchQuery}
          onChange={handleSearch}
        />
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
  );
};

export default Files;
