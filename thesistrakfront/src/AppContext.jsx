import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { fetchProfileData } from "./fetchProfileData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Configuración general
  const PortToUse = process.env.REACT_APP_API_URL;
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  // Función para guardar datos localmente
  const LocalData = (itemstosave) => {
    localStorage.setItem("profiledata", JSON.stringify(itemstosave));
  };

  const [hovered, setHovered] = useState(false); // Estado para detectar hover
  const [isWriting, setIsWriting] = useState(false); // Estado para escritura

  // Funciones para manejar el estado de hover
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  // Estados generales
  const [isLogged, setisLogged] = useState(false);
  const [isloading, setisloading] = useState(true);
  const [isActive, setisActive] = useState(false);
  const [profile, setProfile] = useState(null);
  const [ProfilePic, setProfilePic] = useState(
    "media/profile_pictures/einstein.jpg"
  );
  const [role, setRole] = useState("");
  const [name, setname] = useState("");
  const [userid, setUserid] = useState([]);
  const [userType, setUserType] = useState("Guest");
  const [email, setEmail] = useState("There's no Email Address");
  const [Carrers, setCarrers] = useState([]);

  // Estado para tamaño de ventana
  const [WindowWidth, setWindowWidth] = useState(window.innerWidth);
  const [WindowHeight, setWindowHeight] = useState(window.innerHeight);
  const isMobile = WindowWidth <= 799;

  // Registro
  const [Username, setUsername2] = useState("");
  const [EmailReg, setEmailReg] = useState("");
  const [Password1, setPassword1] = useState("");
  const [Password2, setPassword2] = useState("");
  const [Loading, setLoading] = useState(false);

  // Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [LoadingFetch, setLoadingFetch] = useState(false);

  // CSRF
  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const getCsrfToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];
  };

  // Login handler
  const refreshCsrfToken = async () => {
    try {
      const csrfResponse = await axios.get(`${PortToUse}/api/refresh_csrf/`);
      const newToken = csrfResponse.data.csrfToken;
      return newToken;
    } catch (error) {
      console.error("Error refreshing CSRF token:", error);
      throw error;
    }
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    if (LoadingFetch) return;
    setLoadingFetch(true);

    try {
      // Primero intentamos realizar el login
      const response = await axios.post(
        `${PortToUse}api/login2/`,
        { username, password },
        { headers: { "X-CSRFToken": getCsrfToken() } }
      );

      if (response.status === 200) {
        setisActive(true);
        fetchProfile();
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        // Si obtenemos un 403, refrescamos el CSRF y reintentamos el login
        const newToken = await refreshCsrfToken();
        const retryResponse = await axios.post(
          `${PortToUse}api/login2/`,
          { username, password },
          { headers: { "X-CSRFToken": newToken } }
        );

        if (retryResponse.status === 200) {
          setisActive(true);
          fetchProfile();
          setUsername("");
          setPassword("");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: error.response?.data?.Detail || "Login failed",
          text: "Try Again!",
          timer: 1500,
          timerProgressBar: true,
        });
      }
      console.error("Error logging in:", error);
    } finally {
      setLoadingFetch(false);
    }
  };

  // Registro handler
  const handleRegisterForm = async (e) => {
    e.preventDefault();
    if (Loading) return;
    setLoading(true);

    try {
      // Primero, intentamos registrar al usuario
      await axios.post(
        `${PortToUse}api/auth/registration/`,
        {
          username: Username,
          email: EmailReg,
          password1: Password1,
          password2: Password1,
        },
        {
          headers: { "X-CSRFToken": getCsrfToken() },
          withCredentials: true, // ← NECESARIO
        }
      );

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You can log in now",
        timer: 2000,
        timerProgressBar: true,
      });

      // Refrescamos el token CSRF
      const newToken = await refreshCsrfToken();

      // Intentamos el login automáticamente después de un registro exitoso
      const loginResponse = await axios.post(
        `${PortToUse}api/login2/`,
        {
          username: Username,
          password: Password1,
        },
        {
          headers: { "X-CSRFToken": newToken },
          withCredentials: true, // ← NECESARIO AQUÍ TAMBIÉN
        }
      );

      if (loginResponse.status === 200) {
        setUsername2("");
        setPassword1("");
        setEmailReg("");
        setisActive(true);
        fetchProfile();
      }
    } catch (error) {
      console.error("Registration failed", error);
      const errorMessages = error.response
        ? Object.entries(error.response.data)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("\n")
        : "An unexpected error occurred. Please try again later.";

      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: errorMessages,
      });
    }

    setLoading(false);
  };

  // Perfil
  const fetchProfile = () => {
    fetchProfileData({
      API_BASE_URL,
      LocalData,
      setisloading,
      setisActive,
      setUserid,
      setProfile,
      setname,
      setRole,
      setisLogged,
      setUserType,
      setEmail,
      setProfilePic,
      fetchCarrers,
    });
  };

  // Carreras
  const fetchCarrers = async () => {
    try {
      const response = await axios.get(`${PortToUse}api/carrers/`, {
        withCredentials: true,
      });
      setCarrers(response.data);
    } catch (error) {
      console.error("Error fetching carrers", error);
    }
  };

  useEffect(() => {
    fetchCarrers();
  }, []);

  // Resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // App.js o en tu `AppContextProvider`
useEffect(() => {
  const handleEnter = () => setIsWriting(true);
  const handleLeave = () => setIsWriting(false);

  const elements = document.querySelectorAll(".writable");

  elements.forEach((el) => {
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
  });

  return () => {
    elements.forEach((el) => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    });
  };
}, []);




  return (
    <AppContext.Provider
      value={{
        isloading,
        setisloading,
        isLogged,
        setisLogged,
        profile,
        setProfile,
        name,
        setname,
        userid,
        setUserid,
        isActive,
        setisActive,
        PortToUse,
        fetchProfile,
        WindowWidth,
        WindowHeight,
        getCookie,
        ProfilePic,
        userType,
        email,
        isMobile,
        API_BASE_URL,
        refreshCsrfToken,
        getCsrfToken,
        role,
        handleLoginForm,
        handleRegisterForm,
        setLoadingFetch,
        LoadingFetch,
        username,
        setUsername,
        password,
        setPassword,
        Username,
        setUsername2,
        EmailReg,
        setEmailReg,
        Password1,
        setPassword1,
        Password2,
        setPassword2,
        Carrers,
        hovered,
        setHovered,
        isWriting,
        setIsWriting,
        handleMouseEnter,
        handleMouseLeave,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
