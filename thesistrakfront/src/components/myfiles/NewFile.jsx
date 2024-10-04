import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import "./NewFile.css";
import { useAppContext } from "../../AppContext";

const NewFile = ({ setupladovisible, userid }) => {
  const [docTypes, setDocTypes] = useState([]);
  const [carrers, setCarrers] = useState([]);
  const [stages, setStages] = useState([]);
  const [title, setTitle] = useState("");
  const [carrer, setCarrer] = useState("");
  const [stage, setStage] = useState("");
  const [code, setCode] = useState("");
  const [visible, setVisible] = useState(true);
  const [file, setFile] = useState(null); // Asegúrate de que sea null
  const [description, setDescription] = useState("");
  const [docType, setDocType] = useState("");
  const [progressPercentage, setProgressPercentage] = useState(10); // Valor por defecto al 100%
  const [error, setError] = useState("");
  const [OnView, setOnView] = useState(false);

  const { PortToUse, getCookie } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Por favor, selecciona un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("code", code);
    formData.append("title", title);
    formData.append("is_visible", visible);
    formData.append("description", description);
    formData.append("year", "2024");
    formData.append("file", file); // Archivo debe estar presente
    formData.append("progress_percentage", progressPercentage);
    formData.append("document_type", docType);
    formData.append("carrer", carrer);
    formData.append("stage", stage);

    try {
      const response = await axios.post(
        PortToUse + "api/file_docs/",
        formData,
        {
          headers: {
            Accept: "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
          },
          withCredentials: true,
        }
      );
      console.log("File uploaded successfully", response.data);
      setError(""); // Limpiar mensaje de error
      setupladovisible(false);
    } catch (error) {
      console.error("Error uploading file", error);
      setError("Error al subir el archivo."); // Mensaje de error genérico
    }
  };

  const fetchDocTypes = async () => {
    try {
      const response = await axios.get(PortToUse + "api/doc-types/", {
        withCredentials: true,
      });
      setDocTypes(response.data);
    } catch (error) {
      console.error("Error fetching document types", error);
    }
  };

  const fetchCarrers = async () => {
    try {
      const response = await axios.get(PortToUse + "api/carrers/", {
        withCredentials: true,
      });
      setCarrers(response.data);
    } catch (error) {
      console.error("Error fetching carrers", error);
    }
  };

  const fetchStages = async () => {
    try {
      const response = await axios.get(PortToUse + "api/doc-stages/", {
        withCredentials: true,
      });
      setStages(response.data);
    } catch (error) {
      console.error("Error fetching document stages", error);
    }
  };

  useEffect(() => {
    fetchDocTypes();
    fetchCarrers();
    fetchStages();
  }, []); // Lista de dependencias vacía para ejecutar solo una vez

  return (
    <div
      onClick={setupladovisible}
      className="NewFileContainer"
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 450 }}
        transition={{
          type: "spring",
          opacity: { duration: 0.3 },
          height: { duration: 0.55, type: "spring" },
        }}
        onClick={(e) => e.stopPropagation()} // Evita que el clic se propague al div externo
        className="FileBlock"
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          // background: "green",
          zIndex: "9999999",
          position: "absolute",
        }}
      >
        <div style={{ width: "100%" }}>
          <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}{" "}
            <div>
              <select
                value={carrer}
                onChange={(e) => setCarrer(e.target.value)}
                // style={{width:"40%"}}
                className="CarrerField"
              >
                <option value="">Choose a carrer</option>
                {carrers.map((carrer) => (
                  <option
                    key={carrer.id}
                    value={carrer.id}
                    style={{ width: "40%", fontSize: "0.6rem" }}
                  >
                    {carrer.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                value={title}
                className="CarrerField"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
            <div>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="CarrerField"
              />
            </div>
            <div>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="CarrerField"
              >
                <option value="">Document Type</option>
                {docTypes.map((type) => (
                  <option key={type.id} value={type.id} className="CarrerField">
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={stage}
                className="CarrerField"
                onChange={(e) => setStage(e.target.value)}
              >
                <option value="">Stage</option>
                {stages.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.stage}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="progress">
                Progress (%): {progressPercentage}%
              </label>
              <input
                type="range"
                id="progress"
                min="0"
                max="100"
                value={progressPercentage}
                onChange={(e) => setProgressPercentage(e.target.value)}
              />
            </div>
            <div>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <Button variant="contained" type="submit">Subir Archivo</Button>
          </form>
        </div>
      </motion.div>
      <div
        style={{
          // background: "red",
          zIndex: "99999",
          position: "fixed",
          left: "0px",
          right: "0px",
          width: "100%",
          height: "100vh",
        }}
      />
      {/* <div
        className="FileBlock"
        onClick={(e) => e.stopPropagation()}
        style={{ background: "green", borderRadius: "10px" }}
      >

      </div> */}
    </div>
  );
};

export default NewFile;
