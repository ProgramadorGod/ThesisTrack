import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./MovLogin.css";
import ButtonMov from "./ButtonMov";
import Button from "./Button";

const MovLogin = ({
  IsLogin,
  LoadingFetch,
  handleLoginForm,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  const navigate = useNavigate();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  // Detectar si el teclado está visible en móviles
  useEffect(() => {
    const handleResize = () => {
      const newHeight = window.innerHeight;
      setIsKeyboardVisible(newHeight < windowHeight * 0.75); // Ajusta el umbral si es necesario
      setWindowHeight(newHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowHeight]);

  const handleRegister = () => navigate("/register");
  const handleForgotPassword = () => navigate("/forgot-password");

  return (
    <div id="MainContainerMovile">
      <div id="FirstText">ThesisTrack</div>
      <div id="SubTitleText">
        Con ThesisTrack, descubrir los proyectos de grado de la Unipaz se siente
        tan fácil y gratificante como debería ser.
      </div>

      <motion.form
        className="FormMov"
        onSubmit={handleLoginForm}
        animate={{ y: isKeyboardVisible ? "-30vh" : 0 }}
        transition={{ type: "tween", duration: 0.1, ease: "easeOut" }}
      >
        <input
          className="MailMov"
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="PassMov"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <ButtonMov
          IsLogin={IsLogin}
          Loading={LoadingFetch}
          text1={"Iniciando Sesión"}
          text2={"Iniciar Sesión"}
        />
        <div id="ForgotPasswordContainer">
          <div onClick={handleForgotPassword} className="forgot-password">
            ¿Olvidaste tu contraseña?
          </div>
        </div>
      </motion.form>

      <motion.div
        id="options"
        animate={{ y: isKeyboardVisible ? "-30vh" : 0 }}
        transition={{ type: "tween", duration: 0.1, ease: "easeOut" }}
      >
        <button onClick={handleRegister} className="register">
          Crear una cuenta
        </button>
      </motion.div>
    </div>
  );
};

export default MovLogin;
