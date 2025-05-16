// Login.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../AppContext";
import "./login.css";
import "./loginMov.css";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { motion } from "motion/react";
import Lottie from "lottie-react";
import Bird from "../../media/Pigeon4.json";
import Bird2 from "../../media/Pigeon3.json";
import Swal from "sweetalert2";
import GoogleIcon from "../../media/google.png";
import Blocker from "./Blocker";
import Register from "./Register";
import Button from "./Button";
import MovLogin from "./MovLogin";
import Writable from "../../Writable";

axios.defaults.withCredentials = true;

const Login = () => {
  const {
    isLogged,
    PortToUse,
    fetchProfile,
    WindowWidth,
    WindowHeight,
    setisActive,
    LoadingFetch,
    username,
    password,
    setUsername,
    setPassword,
    handleLoginForm,
  } = useAppContext();

  const [UsernameFocus, setUsernameFocus] = useState(false);
  const [PasswordFocus, setPasswordFocus] = useState(false);

  const [IsLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Inicializar el hook useNavigate

  const ToggleIsLogin = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const getCsrfToken = () => {
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];
    return csrfToken;
  };

  const setCsrfToken = (token) => {
    document.cookie = `csrftoken=${token}; path=/`;
  };

  const handleLogin = () => {
    const googleLoginUrl = PortToUse + "/accounts/google/login/?next=/";
    window.location.href = googleLoginUrl;
  };

  const [WidthPixels, setWidthPixels] = useState(0);
  const [LimitPixels, setLimitPixels] = useState(0);

  const [LoginShown, setLoginShown] = useState(0);

  const calculateWidth = () => {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );

    setWidthPixels(vw * 0.14); // 20vw
    setLimitPixels(vw * 0.24);
    setLoginShown(vw * 0.555);

    // setTransitionBlock(vw*0.225)
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/"); // Redirigir al usuario a la página principal si está logueado
    }
  }, [isLogged, navigate]);

  useEffect(() => {
    calculateWidth();
    window.addEventListener("resize", calculateWidth);

    // Optional: Use a MutationObserver to detect changes in zoom level
    const observer = new MutationObserver(calculateWidth);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => {
      window.removeEventListener("resize", calculateWidth);
      observer.disconnect();
    };
  }, []);

  if (WindowWidth < WindowHeight * 1.5) {
    return (
      <div>
        <MovLogin
          GoogleIcon={GoogleIcon}
          IsLogin={IsLogin}
          LoadingFetch={LoadingFetch}
          handleLoginForm={handleLoginForm}
          username={username}
          setUsername={setUsername} // Pasamos el estado de username
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        >
          {" "}
        </MovLogin>
      </div>
    );
  }

  return (
    <div id="SessionContainer" className={`${LoadingFetch ? "Disabled" : ""}`}>
      <div
        id="MotionContainer"
        className={`${LoadingFetch ? "Disabled" : ""} `}
        style={{ width: "5vh", height: "5vh" }}
      >
        <motion.div
          className="Motiondiv hoverable"
          animate={{ scale: 1.2, x: WidthPixels }}
          whileDrag={{ scale: 1.5 }}
          whileHover={{ scale: 1.3, cursor: "pointer" }}
          drag="x"
          dragConstraints={{ left: -LimitPixels, right: LimitPixels }}
          style={{ width: "5vh", height: "5vh" }}
        >
          <motion.div id="LottieContainer1" style={{ width: "5vh", height: "5vh" }} className="hoverable">
            <Lottie animationData={Bird} loop autoplay />
          </motion.div>
        </motion.div>

        <motion.div
          className="Motiondiv hoverable"
          animate={{ scale: 1.2, x: -WidthPixels }}
          whileDrag={{ scale: 1.5 }}
          whileHover={{ scale: 1.3, cursor: "pointer" }}
          drag="x"
          dragConstraints={{ left: -LimitPixels, right: LimitPixels }}
        >
          <div id="LottieContainer2" style={{ width: "5vh", height: "5vh" }} className="hoverable">
            <Lottie animationData={Bird2} loop autoplay />
          </div>
        </motion.div>
      </div>

      <div id="LogRegBox">
        <motion.div
          id="LoginSquare"
          initial={{ opacity: 0 }}
          animate={{
            opacity: IsLogin ? 1 : 0,
            x: IsLogin ? 0 : 500,
            width: IsLogin ? "" : 0,
            userSelect: IsLogin ? "all" : "none",
          }}
          transition={{ duration: 0.1 }}
          className={`${IsLogin ? "InLogin" : ""}`}
        >
          <div className="ComboTextGoogle">
            <h1 id="LoginText" >Sign In</h1>
          </div>
          <div
            className="GoogleButton hoverable"
            onClick={handleLogin}
            aria-label="Aria Google"
            tabIndex={IsLogin ? 1 : -1}
            disabled={!IsLogin}
          >
            <img
              src={GoogleIcon}
              alt="GoogleIcon"
              id="FaGoogle"
              className="hoverable"
            />
          </div>
          <form onSubmit={handleLoginForm} id="FormularyContainer">
            <div id="Inputs" className="InputsLogin">
              <div id="UserLab-Cont">
                <Writable>
                  <input
                    disabled={!IsLogin}
                    id="Username-Input"
                    placeholder={`Username`}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                    className="writable"
                    required
                  />
                </Writable>

                <motion.div
                  className="input-underline"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: UsernameFocus ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              <div id="PassLab-Cont">
                <Writable>
                  <input
                    id="Password-Input"
                    placeholder={`Password`}
                    disabled={!IsLogin}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    className="writable"
                    required
                  />
                </Writable>

                <motion.div
                  className="input-underline2"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: PasswordFocus ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>
            <Button
              IsLogin={IsLogin}
              Loading={LoadingFetch}
              //
              text1={"LOGIN"}
              text2={"LOGIN"}
            ></Button>
          </form>
        </motion.div>

        <Register
          handleLogin={handleLogin}
          IsLogin={IsLogin}
          GoogleIcon={GoogleIcon}
        />

        <Blocker
          IsLogin={IsLogin}
          LoadingFetch={LoadingFetch}
          ToggleIsLogin={ToggleIsLogin}
        ></Blocker>
      </div>
    </div>
  );
};

export default Login;
