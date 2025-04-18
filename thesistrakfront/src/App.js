import "./App.css";
import Login from "./components/LoginComponents/login";
import Profile from "./components/profile/profile";

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

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

function AppContent() {
  
  const {
    isloading,
    isLogged,
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

  return (
    <div className="App">
      <Router>
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
    </div>
  );
}

export default App;
