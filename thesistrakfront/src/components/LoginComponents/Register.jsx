import React, { useState } from "react";
import { motion } from "motion/react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";
import Button from "./Button";

const Register = ({ GoogleIcon, IsLogin }) => {
  const [usernameFocus, setusernameFocus] = useState(false);
  const [emailFocus, setemailFocus] = useState(false);
  const [password1Focus, setpassword1Focus] = useState(false);
  const {
    isLogged,
    PortToUse,
    handleRegisterForm,
    setIsWriting,
    hovered,
    setHovered,
    text,
    setText,
    handleLogin,
    Username,
    setUsername2,
    EmailReg,
    setEmailReg,
    Password1,
    setPassword1,
    Loading,

    WindowWidth,
    WindowHeight,
    setisActive,
    LoadingFetch,

    handleLoginForm,
  } = useAppContext();


  const isTabbable = !IsLogin ? 0 : -1;

  const handleRegisterAppear = () => {
    if (WindowWidth > 700) {
      return IsLogin ? -100 : 0;
    } else {
      return IsLogin ? -500 : 0;
    }
  };

  return (
    <motion.div
      id="RegisterContainer"
      className={`${IsLogin ? "OutRegister" : "InRegister"}`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: IsLogin ? 0 : 1,
        x: handleRegisterAppear(),
        zIndex: IsLogin ? -1 : 0,
      }}
      transition={{
        type: "spring",
        duration: 0.3,
      }}
      disabled={IsLogin}
    >
      <div className="ComboTextGoogle" id="ComboRegister">
        <h1 id="RegisterText">Register</h1>
      </div>
      <div
        className="GoogleButton hoverable"
        onClick={handleLogin}
        disabled={IsLogin}
        tabIndex={isTabbable}
        aria-label="Aria Google"
      >
        <img src={GoogleIcon} id="FaGoogle" />
      </div>

      <form onSubmit={handleRegisterForm} id="RegisterFormContainer">
        <div id="Inputs">
          <div id="RegisterUserLab">
            <input
              tabIndex={isTabbable}
              id="Username-Input"
              disabled={IsLogin}
              type="text"
              placeholder="Username"
              value={Username}
              onChange={(e) => setUsername2(e.target.value)}
              onFocus={() => setusernameFocus(true)}
              onBlur={() => setusernameFocus(false)}
              onMouseEnter={() => setIsWriting(true)} // Al pasar el mouse
              onMouseLeave={() => setIsWriting(false)} //
              required
            />
            <motion.div
              className="input-underline"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: usernameFocus ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <div id="RegisterEmailLab">
            <input
              disabled={IsLogin}
              id="Email-Input"
              tabIndex={isTabbable}
              placeholder="Gmail"
              type="email"
              className="Email-input"
              value={EmailReg}
              onChange={(e) => setEmailReg(e.target.value)}
              onFocus={() => setemailFocus(true)}
              onBlur={() => setemailFocus(false)}
              onMouseEnter={() => setIsWriting(true)} // Al pasar el mouse
              onMouseLeave={() => setIsWriting(false)} //
              required
            />
            <motion.div
              className="input-underline"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: emailFocus ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <div id="RegisterPass1Lab">
            <input
              disabled={IsLogin}
              tabIndex={isTabbable}
              id="Password-Input"
              type="Password"
              placeholder="Password"
              value={Password1}
              onChange={(e) => setPassword1(e.target.value)}
              onFocus={() => setpassword1Focus(true)}
              onBlur={() => setpassword1Focus(false)}
              onMouseEnter={() => setIsWriting(true)} // Al pasar el mouse
              onMouseLeave={() => setIsWriting(false)} //
              required
            />
            <motion.div
              className="input-underline"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: password1Focus ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>

        <div>
          <Button
            tabIndex={isTabbable}
            IsLogin={!IsLogin}
            Loading={Loading}
            text1={"SIGN UP"}
            text2={"SIGN UP"}
            onMouseEnter={() => setHovered(true)} // Al pasar el mouse
            onMouseLeave={() => setHovered(false)} //
            
          ></Button>
        </div>
      </form>
    </motion.div>
  );
};

export default Register;
