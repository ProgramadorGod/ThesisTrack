import "./App.css";
import Login from "./components/LoginComponents/login";
import Profile from "./components/profile/profile";
import Bg from "./media/bg.webp";
import Loadingrectangle from "./components/loading/loading";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Agregar Navigate para redireccionar
import Home from "./components/Home";
import Echart from "./components/Stadistics/Echart";
import Myfiles from "./components/myfiles/myfiles";

import { AppProvider, useAppContext } from "./AppContext";
import Sidemenu2 from "./components/Sidemenu2/Sidemenu2";
import IA from "./components/IA/IA";
import Help from "./components/Help/Help";

import { MovRegister } from "./components/LoginComponents/MovRegister";
import { useEffect } from "react";
import CustomCursor from "./CustomCursor";
import FontLoader from "./FontObserver"; // o donde lo guardes


const App = () => {
  return (
    <AppProvider>
      <FontLoader>
        <AppContent />
      </FontLoader>
    </AppProvider>
  );
};
function AppContent() {
  const {
    isloading,
    isLogged,
    setIsWriting,
    setHovered,
    profile,
    name,
    userid,
    isActive,
    setisActive,
    fetchProfile,
  } = useAppContext();

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    const handleWritableEnter = () => setIsWriting(true);
    const handleWritableLeave = () => setIsWriting(false);
  
    const handleHoverableEnter = () => setHovered(true);
    const handleHoverableLeave = () => setHovered(false);
  
    // Función que se ejecutará cuando se detecten cambios en el DOM
    const observeChanges = () => {
      const writables = document.querySelectorAll(".writable");
      const hoverables = document.querySelectorAll(".hoverable");
  
      writables.forEach((el) => {
        el.addEventListener("mouseenter", handleWritableEnter);
        el.addEventListener("mouseleave", handleWritableLeave);
      });
  
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverableEnter);
        el.addEventListener("mouseleave", handleHoverableLeave);
      });
    };
  
    // Crear un MutationObserver que detecte los cambios en el DOM
    const observer = new MutationObserver(observeChanges);
  
    // Empezamos a observar el DOM para cambios en los atributos (como agregar/quitar clases)
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  
    // Llamar a observeChanges de inmediato para asegurar que se procesen las clases al inicio
    observeChanges();
  
    // Limpiar el observer cuando el componente se desmonte
    return () => {
      observer.disconnect();
    };
  }, []); // Solo se ejecuta al montar el componente pero ahora monitorea dinámicamente cambios en el DOM
  
  return (
    <div className="App">
      <Router>
        <div
          style={{
            backgroundImage: `url(${Bg})`,
            pointerEvents: "none",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "130%",
            backgroundSize: "128px",
            backgroundRepeat: "repeat",
            opacity: 0.09,
            borderRadius: 0,
            zIndex: 9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
          }}
        ></div>
        <div id="body">
          {isloading ? (
            <Loadingrectangle />
          ) : isLogged ? (
            <Sidemenu2 isActive={isActive} setisActive={setisActive} />
          ) : (
            ""
          )}

          {/* <header>
            <Navbar ChangeActive={ChangeActive} isActive={isActive} />
          </header> */}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/Register"
              element={isLogged ? <Navigate to="/" /> : <MovRegister />}
            />
            <Route
              path="/Profile"
              element={
                isloading ? (
                  <Loadingrectangle />
                ) : isLogged ? (
                  <Profile profile={profile} name={name} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/Files"
              element={
                isloading ? (
                  <Loadingrectangle />
                ) : isLogged ? (
                  <Myfiles userid={userid} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/Stadistics"
              element={
                isloading ? (
                  <Loadingrectangle />
                ) : isLogged ? (
                  <Echart />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/Settings"
              element={
                isloading ? (
                  <Loadingrectangle />
                ) : isLogged ? (
                  <Myfiles userid={userid} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/IA"
              element={
                isloading ? (
                  <Loadingrectangle />
                ) : isLogged ? (
                  <IA userid={userid} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/Help"
              element={
                isloading ? (
                  <Loadingrectangle />
                ) : isLogged ? (
                  <Help userid={userid} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/login" element={<Login />} />{" "}
            {/* Añade la ruta del Login */}
          </Routes>
        </div>
      </Router>

      <CustomCursor />
    </div>
  );
}

export default App;
