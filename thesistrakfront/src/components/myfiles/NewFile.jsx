import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "motion/react";
import {
  Button,
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Slider,
  Box,
  Typography,
} from "@mui/material";
import "./NewFile.css";
import { useAppContext } from "../../AppContext";
import { HiX } from "react-icons/hi";
import Swal from "sweetalert2";
import { set } from "lodash";

const NewFile = ({ setupladovisible, userid, toogleUpload, onFileUpload }) => {
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

  const { PortToUse, getCookie, isMobile, refreshCsrfToken, getCsrfToken } =
    useAppContext();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setupladovisible(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setupladovisible]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de carrera seleccionada
    if (!carrer) {
      setError("Por favor, selecciona una carrera.");
      return; // Detenemos el envío si no se seleccionó una carrera
    }

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
    formData.append("file", file);
    formData.append("progress_percentage", progressPercentage);
    formData.append("document_type", docType);
    formData.append("carrer", carrer); // Asegúrate de pasar el ID de la carrera
    formData.append("stage", stage);

    try {
      // Primer intento con token actual
      const response = await axios.post(
        `${PortToUse}api/file_docs/`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "X-CSRFToken": getCsrfToken(),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        onFileUpload();

        Swal.fire({
          icon: "success",
          title: "Archivo subido",
          text: "¡Tu documento fue cargado exitosamente!",
          confirmButtonColor: "#1976d2",
        });

        setupladovisible(false);
      }
    } catch (error) {
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
      }

      if (error.response?.status === 403) {
        // Reintento con nuevo token
        const newToken = await refreshCsrfToken();
        try {
          const retryResponse = await axios.post(
            `${PortToUse}api/file_docs/`,
            formData,
            {
              headers: {
                Accept: "application/json",
                "X-CSRFToken": newToken,
              },
              withCredentials: true,
            }
          );

          if (retryResponse.status === 200 || retryResponse.status === 201) {
            onFileUpload();

            Swal.fire({
              icon: "success",
              title: "Archivo subido",
              text: "¡Tu documento fue cargado exitosamente!",
              confirmButtonColor: "#1976d2",
            });

            setupladovisible(false);
          }
        } catch (retryError) {
          console.error("Error al reintentar la subida:", retryError);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo subir el archivo.",
            confirmButtonColor: "#d32f2f",
          });
          setupladovisible(false);
        }
      } else {
        console.error("Error al subir el archivo:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un problema al subir el archivo.",
          confirmButtonColor: "#d32f2f",
        });
        setupladovisible(false);
      }
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

  const { Carrers } = useAppContext();

  useEffect(() => {
    setCarrers(Carrers);
  }, [Carrers]);

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
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Almacena el archivo seleccionado
  };

  useEffect(() => {
    fetchDocTypes();

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
        animate={{ opacity: 1, height: "80vh", y: isMobile ? -55 : 0 }}
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
          position: "fixed",
        }}
      >
        <div id="HiX" onClick={setupladovisible}>
          {" "}
          <HiX></HiX>{" "}
        </div>{" "}
        <div style={{ width: "100%" }}>
          <form onSubmit={handleSubmit} id="AllfieldsContainer">
            {error && <div className="error">{error}</div>}{" "}
            <div>
              <select
                value={carrer}
                onChange={(e) => setCarrer(e.target.value)}
                // style={{width:"40%"}}
                className="CarrerFieldSelect"
              >
                <option value="">Escoge Una Carrera</option>
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
                placeholder="Título"
              />
            </div>
            <div>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción"
                className="CarrerField"
              />
            </div>
            <div>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="CarrerFieldSelect"
              >
                <option value="">Tipo De Documento</option>
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
                className="CarrerFieldSelect"
                onChange={(e) => setStage(e.target.value)}
              >
                <option value="">Fase Del Proyecto</option>
                {stages.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.stage}
                  </option>
                ))}
              </select>
            </div>
            {/* <div id="Slider">
              <Typography gutterBottom>
                Progreso: {progressPercentage}%
              </Typography>
              <Slider
              
                value={progressPercentage}
                onChange={(e, newValue) => setProgressPercentage(newValue)}
                min={0}
                max={100}
              />
            </div> */}
            <div id="NewFileButton">
              <div>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  id="SelectB"
                  sx={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    "&:hover": {
                      backgroundColor: "#333333",
                    },
                  }}
                >
                  {file ? file.name : "Seleccionar Archivo"}
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
              </div>{" "}
            </div>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#115293" },
              }}
            >
              Subir Archivo
            </Button>
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
