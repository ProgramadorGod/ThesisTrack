import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDesktop from "./LoginDesktop";

import { motion } from "framer-motion";
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

export const MovRegister = ({ IsLogin, handleLoginForm, getCsrfToken,setIsLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Estado para detectar foco
  const [LoadingFetch, setLoadingFetch] = useState(false);
  const [password, setPassword] = useState("");
  const ToggleIsLogin = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };
  const {
    isLogged,
    PortToUse,
    fetchProfile,
    WindowWidth,
    WindowHeight,
    setisActive,
  } = useAppContext();

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.post(
        PortToUse + "api/auth/registration/",
        {
          username,
          email,
          password1,
          password2,
        },
        {
          headers: {
            "X-CSRFToken": getCsrfToken(),
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Ahora puedes iniciar sesión",
        timer: 2000,
        timerProgressBar: true,
      });

      try {
        const response2 = await axios.post(
          PortToUse + "api/login2/",
          {
            username,
            password: password1,
          },
          {
            headers: {
              "X-CSRFToken": getCsrfToken(),
            },
          }
        );

        if (response2.status === 200) {
          fetchProfile();
          navigate("/dashboard");
        }
      } catch (e) {
        console.error(e);
      }
    } catch (error) {
      const errorMessages = error.response
        ? Object.entries(error.response.data)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("\n")
        : "Ocurrió un error inesperado.";

      Swal.fire({
        icon: "error",
        title: "Error en el registro",
        text: errorMessages,
      });
    }
    setLoading(false);
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
          <ButtonMov
            IsLogin={IsLogin}
            Loading={loading}
            text1={"Registrando..."}
            text2={"Registrarse"}
            type="submit"
          />
        </motion.form>
      </div>
    );
  }
  return (
    <LoginDesktop
      IsLogin={IsLogin}
      LoadingFetch={LoadingFetch}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      ToggleIsLogin={ToggleIsLogin}
      fetchProfile={fetchProfile}
      setisActive={setisActive}
    />
  );
};

export default MovRegister;
