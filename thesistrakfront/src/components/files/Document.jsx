import React from "react";
import { RxEyeOpen, RxFile, RxTokens } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useAppContext } from "../../AppContext";

const Document = ({ document, onUpdateVisualizations }) => {
  const { API_BASE_URL } = useAppContext();
  const NEWAPIBASE = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;

  const [visualizations, setVisualizations] = useState(document.visualizations);
  const [isCooldown, setIsCooldown] = useState(false);

  const handleIncreaseViews = useEffect(() => {
    setVisualizations(visualizations + 1);
  }, []);

  if (!document) {
    return <div>Error: Document data is missing.</div>;
  }

  const fileUrl = document.file
    ? `${NEWAPIBASE}${document.file}`
    : document.url;
    const handleDownloadClick = async () => {
      if (isCooldown) return;
      
      // 1. Visual update
      window.open(fileUrl, "_blank");
      const newCount = visualizations + 1;
      setVisualizations(newCount);
      onUpdateVisualizations(document.id, newCount); // 🔥 también actualiza el padre
  
      setIsCooldown(true);
  
      try {
        await new Promise((res) => setTimeout(res, 3000)); // espera 2 segundos
  
        const response = await fetch(
          `${API_BASE_URL}api/upgradeview/${document.id}/`,
          { method: "GET" }
        );
  
        if (response.ok) {
          const data = await response.json();
          setVisualizations(data.visualizations);
          onUpdateVisualizations(document.id, data.visualizations); // 🔄 sincroniza
        }
      } catch (error) {
        console.error("Error al incrementar visualizaciones:", error);
      } finally {
        setIsCooldown(false);
      }
    };
  // console.log("File URL:", fileUrl);

  return (
    <div id="FileComponent" key={document.id}>
      <div className="ThesisContainer">
        <div id="kind">
          <RxTokens id="logo" />
          {document.carrer} {"\u00A0"} / {"\u00A0"} {document.carrer_name}
          <div className="Views" onClick={handleIncreaseViews}>
            <RxEyeOpen id="Eye" />
            {visualizations} views
          </div>
        </div>
        <div className="Title">{document.title}</div>
        <div className="Description">{document.description}</div>
        <div className="Year">
          Etapa De Creación:{"\u00A0"} {document.year}
        </div>
        <div className="Year">Autores:</div>
        <div className="Author">
          <div> {"\u00A0"}</div>
          {document.authors.map((author, index) => (
            <span key={index}>
              {author}
              {index < document.authors.length - 1 && " \u00A0 \u00A0 "}
            </span>
          ))}
        </div>
        <div className="DownloadButton">
          <a
            id="DownloadText"
            className="hoverable"
            href={fileUrl}
            onClick={(e) => {
              e.preventDefault(); // evita el comportamiento por defecto del <a>
              handleDownloadClick(); // solo abre una vez desde la función
            }}
          >
            <RxFile className="icondoc" />{" "}
            {document.file
              ? "Accede Ahora (Documento Digital)"
              : "Accede Ahora (Libro Electrónico)"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Document;
