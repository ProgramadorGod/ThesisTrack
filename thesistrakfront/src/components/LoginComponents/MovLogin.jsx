// MovLogin.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./MovLogin.css";
import ButtonMov from "./ButtonMov";

const MovLogin = ({
  IsLogin,
  LoadingFetch,
  handleLoginForm,
  username,
  setUsername, // Recibimos la función para actualizar el username
  password,
  setPassword, // Recibimos la función para actualizar el password
}) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div id="MainContainerMovile">

      <div id="FirstText">ThesisTrack</div>
      <div id="SubTitleText">Con ThesisTrack, descubrir los proyectos de grado de la Unipaz se siente tan fácil y gratificante como debería ser.</div>
      <form className="FormMov" onSubmit={handleLoginForm}>
        <input
          className="MailMov"
          type="text"
          placeholder="Correo"
          value={username} // Vinculamos el valor de username
          onChange={(e) => setUsername(e.target.value)} // Actualizamos el estado de username
          required
        />
        <input
          className="PassMov"
          type="password"
          placeholder="Contraseña"
          value={password} // Vinculamos el valor de password
          onChange={(e) => setPassword(e.target.value)} // Actualizamos el estado de password
          required
        />
        <ButtonMov
          IsLogin={IsLogin}
          Loading={LoadingFetch}
          text1={"Iniciando Sesión"}
          text2={"Iniciar Sesión"}
        />
        <div id="ForgotPasswordContainer">
          <button onClick={handleForgotPassword} className="forgot-password">
            ¿Olvidaste tu contraseña?
          </button>
        </div>

      </form>
      <div id="options">
        <button onClick={handleRegister} className="register">
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default MovLogin;
