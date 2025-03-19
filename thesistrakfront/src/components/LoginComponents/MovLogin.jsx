// MovLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MovLogin.css";
import {motion} from "framer-motion";
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

  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-80 p-6 rounded-2xl shadow-lg bg-white overflow-hidden"
      >
        {/* Fondo decorativo */}
        <div className="absolute inset-0 z-0">
          <div className="absolute w-full h-full bg-gradient-to-br from-blue-400 to-gray-900 clip-wave"></div>
        </div>

        {/* Contenido */}
        <div className="relative z-10">
          <h2 className="text-white text-2xl font-semibold text-center">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>

          <form className="mt-6">
            {isSignUp && (
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 mb-3 bg-gray-100 rounded-lg outline-none"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-3 bg-gray-100 rounded-lg outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-3 bg-gray-100 rounded-lg outline-none"
            />

            <button className="w-full p-3 bg-gray-800 text-white rounded-lg">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          {/* Alternar entre Login y Registro */}
          <p
            className="text-sm text-center text-white mt-4 cursor-pointer"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Already have an account? Sign In" : "Sign up"}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
export default MovLogin;
