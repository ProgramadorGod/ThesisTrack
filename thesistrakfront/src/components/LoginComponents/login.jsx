// Login.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../AppContext";
import "./login.css";
import "./loginMov.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
