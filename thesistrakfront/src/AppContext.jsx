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

  // Estados generales
  const [isLogged, setisLogged] = useState(false);
  const [isloading, setisloading] = useState(true);
  const [isActive, setisActive] = useState(false);
  const [profile, setProfile] = useState(null);
  const [ProfilePic, setProfilePic] = useState("media/profile_pictures/einstein.jpg");
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

  const setCsrfToken = (token) => {
    document.cookie = `csrftoken=${token}; path=/`;
  };

  // Login handler
  const handleLoginForm = async (e) => {
    e.preventDefault();
    if (LoadingFetch) return;
    setLoadingFetch(true);

    try {
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
        const csrfResponse = await axios.get(`${PortToUse}/api/refresh_csrf/`);
        const newToken = csrfResponse.data.csrfToken;
        setCsrfToken(newToken);
        alert("CSRF token refreshed, please try again.");
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
      // Registro
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
  
      // Login automático
      try {
        const loginResponse = await axios.post(
          `${PortToUse}api/login2/`,
          {
            username: Username,
            password: Password1,
          },
          {
            headers: { "X-CSRFToken": getCsrfToken() },
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
      } catch (loginErr) {
        console.error("Login failed", loginErr);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please try to log in manually.",
        });
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
