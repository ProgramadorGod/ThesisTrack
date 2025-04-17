import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./profile.css";
import { useAppContext } from "../../AppContext";
import axios from "axios";
import ProfData from "./ProfData";
import EditProfile from "./EditProfile";

const Profile = () => {
  const {
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
  } = useAppContext();

  const [isEditing, setIsEditing] = useState(false);

  const capitalize = (text) => {
    if (typeof text !== "string") return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const HandleLogout = async (e) => {
    setisLogged(false);
    try {
      await axios.get(PortToUse + "api/logout/");
    } catch {
      console.log("Meh");
    }
  };

  return (
    <div className="ProfileWrapper">
      <AnimatePresence initial={false}>
        {/* ProfData Component */}
        {!isEditing && (
          <motion.div
            key="profData"
            initial={{ x: -500, y: 100, opacity: 0 }} // Aparece subiendo y desde la izquierda
            animate={{ x: 0, y: 0, opacity: 1 }}    // Se queda en su posición normal
            exit={{ x: -500, y: 100, opacity: 0 }}   // Desaparece hacia la izquierda y hacia abajo
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="MotionWrapper"
            style={{ position: "absolute", width: "100%", height: "100%" }}
          >
            <ProfData onEdit={() => setIsEditing(true)} />
          </motion.div>
        )}

        {/* EditProfile Component */}
        {isEditing && (
          <motion.div
            key="editProfile"
            initial={{ x: 300, y: 300, opacity: 0 }} // Aparece subiendo y desde la derecha
            animate={{ x: 0, y: 0, opacity: 1 }}    // Se queda en su posición normal
            exit={{ x: 300, y: 300, opacity: 0 }}    // Desaparece hacia la derecha y hacia abajo
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="MotionWrapper"
            style={{ position: "absolute", width: "100%", height: "100%" }}
          >
            <EditProfile onCancel={() => setIsEditing(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
