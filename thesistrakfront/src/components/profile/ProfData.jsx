import React from "react";
import "./ProfData.css";
import { FaUserCircle } from "react-icons/fa";
import { useAppContext } from "../../AppContext";

const ProfData = () => {
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
    ProfilePic,
  } = useAppContext();
  return (
    <div id="ProfDataContainer">
      <div id="UserProfilePictureContainer">
        <img src={ProfilePic} id="UserProfilePicture"></img>
      </div>
    </div>
  );
};

export default ProfData;
