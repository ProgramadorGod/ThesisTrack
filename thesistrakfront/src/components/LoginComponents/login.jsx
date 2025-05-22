// Login.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../AppContext";
import "./login.css";
import "./loginMov.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GoogleIcon from "../../media/google.png";

import MovLogin from "./MovLogin";
import LoginDesktop from "./LoginDesktop";

axios.defaults.withCredentials = true;

const Login = () => {
  const {
    isLogged,
    PortToUse,
    fetchProfile,
    WindowWidth,
    WindowHeight,
    setisActive,
  } = useAppContext();

  const [LoadingFetch, setLoadingFetch] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [IsLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();


  const handleLogin = () => {
    const googleLoginUrl = PortToUse + "/accounts/google/login/?next=/";
    window.location.href = googleLoginUrl;
  };

  


  const ToggleIsLogin = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  if (WindowWidth < WindowHeight * 1.5) {
    return (
      <MovLogin
        IsLogin={IsLogin}
        LoadingFetch={LoadingFetch}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        GoogleIcon={GoogleIcon}
      />
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

export default Login;
