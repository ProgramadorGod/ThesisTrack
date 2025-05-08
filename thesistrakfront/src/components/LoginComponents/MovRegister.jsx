import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDesktop from "./LoginDesktop";

import { motion } from "motion/react";
import axios from "axios";
import Swal from "sweetalert2";
import ButtonMov from "./ButtonMov";
import "./MovLogin.css";
import "./MovRegister.css";
import { useAppContext } from "../../AppContext";
import Bird from "../../media/Pigeon4.json";
import Bird2 from "../../media/Pigeon3.json";
import Lottie from "lottie-react";
import GoogleIcon from "../../media/google.png";
import Blocker from "./Blocker";
import Register from "./Register";
import Button from "./Button";
import Login from "./LoginDesktop";

export const MovRegister = ({

  setIsLogin,
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Estado para detectar foco
  const [password, setPassword] = useState("");
  const {
    isLogged,
    PortToUse,
    IsLogin,
    handleRegisterForm,
    handleLogin,
    Username,
    setUsername2,
    EmailReg,
    setEmailReg,
    Password1,
    setPassword1,
    Loading,
    Password2,
    setPassword2,

    WindowWidth,
    WindowHeight,
    fetchProfile,
    setisActive,
    LoadingFetch,

    handleLoginForm,
  } = useAppContext();

  const handleGoLogin = () => navigate("/");

  const ToggleIsLogin = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };



  if (WindowWidth < WindowHeight * 1.5) {
    return (
      <div id="ContainerMovRegister">
        <div id="TitleMovRegister">ThesisTrack</div>
        <div id="SubtitleMovRegister">
          Unete a la comunidad unipaz y descubre detalles profundos e
          innovaciones increibles
        </div>

        <motion.form
          className="FormMovRegister"
          onSubmit={handleRegisterForm}
          animate={{ y: isFocused ? "-30vh" : 0 }}
          transition={{ type: "tween", duration: 0.1, ease: "easeOut" }}
        >
          <input
            type="text"
            placeholder="Usuario"
            value={Username}
            onChange={(e) => setUsername2(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={EmailReg}
            onChange={(e) => setEmailReg(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={Password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={Password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
          <ButtonMov
            IsLogin={!IsLogin}
            Loading={loading}
            text1={"Registrando..."}
            text2={"Registrarse"}
            
          />
        </motion.form>
        <button className="register" onClick={handleGoLogin}>
          Inicia Sesión
        </button>
      </div>
    );
  }
  return (
    <Login/>
  );
};

export default MovRegister;
