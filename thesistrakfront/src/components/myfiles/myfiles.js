import React, { useEffect, useState } from "react";
import axios from "axios";
import "./myfiles.css";
import { FaPlus } from "react-icons/fa";
import NewFile from "./NewFile";
import { useAppContext } from "../../AppContext";
import Document from "../files/Document";
import Loadingrectangle from "../loading/loading";

const Myfiles = ({ userid }) => {
  const [UploadVisible, setUploadVisible] = useState(false);
  const [MyDocuments, setMyDocuments] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const { API_BASE_URL } = useAppContext();
  useEffect(() => {
    if (UploadVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Limpieza por si acaso
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [UploadVisible]);



  const toggleUpload = () => {
    setUploadVisible(!UploadVisible);
  };

  const fetchMyDocuments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}api/my-docs/`, {
        withCredentials: true,
      });
      setMyDocuments(response.data.results);
    } catch (error) {
      console.error("Error fetching my documents: ", error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchMyDocuments();
  }, []); // Arreglo de dependencias vacío para ejecutar solo una vez

// Arreglo de dependencias vacío para ejecutar solo una vez

  return (
    <div className={`${UploadVisible ? "Uploading" : ""}`}>
      {UploadVisible && (
        <NewFile
          setupladovisible={toggleUpload}
          userid={userid}
          onFileUpload={fetchMyDocuments} // Pasamos la función fetchMyDocuments
        />
      )}

      <div className="MainContainer">
        <div className="MyFilesContainer">
          <div className="CreateNewFile" onClick={toggleUpload}>
            <div id="CreateNewText">Crear Nuevo Documento</div>
            <div
              style={{
                _display: "flex",
                get display() {
                  return this._display;
                },
                set display(value) {
                  this._display = value;
                },
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <div className="AddButton">
                <FaPlus />
              </div>
            </div>
          </div>

          <div className="MyDocumentsList">
            {isLoading ? (
              <>
                <h2 className="Proyects"> MIS PROYECTOS  </h2>
                <Loadingrectangle></Loadingrectangle>

              </>
            ) : (
              <>
                <h2 className="Proyects"> MIS PROYECTOS </h2>
                {MyDocuments.map((document) => (
                  // <Document key={document.id} document={document} />
                  <Document key={document.id} document={document}></Document>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myfiles;
