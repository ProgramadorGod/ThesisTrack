import React from "react";
import "./ProfData.css";
import { FaUserCircle } from "react-icons/fa";
import { useAppContext } from "../../AppContext";
import ReactRoundedImage from "react-rounded-image";
import axios from "axios";

const ProfData = () => {
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
    userid,
    setUserid,
    isActive,
    setisActive,
    PortToUse,
    ProfilePic,
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
        <ReactRoundedImage
          id="UserProfilePicture"
          image={ProfilePic}
          roundedColor="#000000"
          roundedSize="2"
          imageWidth="100"
          imageHeight="100"
        />
        <div id="Name">{name.charAt(0).toUpperCase() + name.slice(1)}</div>

        <div id="UserType"> {userType} </div>
        {/* <a id='logout' className='ProfCardItem' onClick={HandleLogout}> { capitalize("Logout")}</a> */}
        <div id="Linea"></div>
        <div id="EmailContainer">
          <div id="EmailLabel"> Email : </div>
          <div id="Email"> Useremail@gmail.com</div>
        </div>

      </div>
      

    </div>
  );
};

export default ProfData;
