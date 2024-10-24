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
      <div id="FirstText">English</div>
      <form className="FormMov" onSubmit={handleLoginForm}>
        <input
          className="MailMov"
          type="text"
          placeholder="Email"
          value={username} // Vinculamos el valor de username
          onChange={(e) => setUsername(e.target.value)} // Actualizamos el estado de username
          required
        />
        <input
          className="PassMov"
          type="password"
          placeholder="Password"
          value={password} // Vinculamos el valor de password
          onChange={(e) => setPassword(e.target.value)} // Actualizamos el estado de password
          required
        />
        <ButtonMov
          IsLogin={IsLogin}
          Loading={LoadingFetch}
          text1={"Iniciar Sesión"}
          text2={"Login"}
        />
        <button onClick={handleForgotPassword} className="forgot-password">
          ¿Olvidaste tu contraseña?
        </button>
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
