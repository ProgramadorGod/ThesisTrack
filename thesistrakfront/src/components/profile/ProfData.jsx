import React from "react";
import "./ProfData.css";
import { FaUserCircle } from "react-icons/fa";
import { useAppContext } from "../../AppContext";
import ReactRoundedImage from "react-rounded-image";
import axios from "axios";

const ProfData = ({onEdit}) => {
  const {
    isloading,
    setisloading,
    isLogged,
    setisLogged,
    profile,
    setProfile,
    name,
    userType,
    setname,
    role,
    userid,
    setUserid,
    isActive,
    setisActive,
    PortToUse,
    ProfilePic,
    email,
  } = useAppContext();

  const HandleLogout = async (e) => {
    setisLogged(false);
    try {
      await axios.get(PortToUse + "api/logout/");
    } catch {
      console.log("Meh");
    }
  };

  const capitalize = (text) => {
    if (typeof text !== "string") return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <div id="ProfDataContainer">
      <div id="UserProfilePictureContainer">
        <div></div>
        <ReactRoundedImage
          
          image={ProfilePic}
          roundedColor="#02034c"
          roundedSize="2"
          imageWidth="100"
          imageHeight="100"
          
        />
        <div id="Name">{typeof name === "string" ? name.charAt(0).toUpperCase() + name.slice(1) : ""}</div>

        <div id="UserType"> {userType} </div>
        <div id="Buttons">
          <button id="wtf" onClick={HandleLogout}>Logout</button> 
          <button id="Edit" >Edit </button>
        </div>
        {/* <a id='logout' className='ProfCardItem' onClick={HandleLogout}> { capitalize("Logout")}</a> */}
        <div id="Linea"></div>
        <div id="EmailContainer">
          <div id="EmailLabel"> Email </div>
          <div id="Email"> {email}</div>
        </div>
        <div id="Linea"></div>
        <div id="EmailContainer">
          <div id="EmailLabel"> Carrer </div>
          <div id="Email"> Software Engenieer</div>
        </div>
        <div id="Linea"></div>
        <div id="EmailContainer">
          <div id="EmailLabel"> Tipo De Usuario </div>
          <div id="Email"> {role} </div>
        </div>
        <div id="Linea"></div>
      </div>
    </div>
  );
};

export default ProfData;
