import React from "react";
import { useNavigate } from "react-router-dom"; // Para manejar la navegación
import "./MovLogin.css";
import Button from "./Button";

const MovLogin = () => {
  const navigate = useNavigate();

  // Función para manejar el registro
  const handleRegister = () => {
    navigate("/register"); // Redirige a la ruta de registro
  };

  // Función para manejar la redirección de "¿Olvidaste tu contraseña?"
  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Redirige a la ruta de recuperación de contraseña
  };

  return (
    <div id="MainContainerMovile">
      <div id="FirstText">English</div>
      <form className="FormMov">
        <input className="MailMov" type="email" placeholder="Email" required />
        <input className="PassMov" type="password" placeholder="Password" required />
        <Button
              IsLogin={IsLogin}
              Loading={LoadingFetch}
              text1={"LOGIN"}
              text2={"LOGIN"}
            ></Button>
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
