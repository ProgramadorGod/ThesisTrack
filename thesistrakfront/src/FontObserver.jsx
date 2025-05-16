import React, { useEffect, useState } from "react";
import FontFaceObserver from "fontfaceobserver";

const FontLoader = ({ children }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // La familia debe coincidir con la que usas en CSS (Apple)
    const appleFont = new FontFaceObserver("Apple");

    appleFont.load(null, 10000).then(
      () => {
        setFontLoaded(true);
      },
      () => {
        console.error("La fuente Apple no pudo cargarse a tiempo.");
        setFontLoaded(true); // igual continuar para no bloquear
      }
    );
  }, []);

  if (!fontLoaded) {
    // Aquí puedes poner un splash o loader personalizado
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "sans-serif",
        }}
      >
        Cargando fuente...
      </div>
    );
  }

  return <>{children}</>;
};

export default FontLoader;
