import { RxAccessibility, RxAspectRatio, RxBorderDashed, RxHome, RxMixerVertical, RxPerson, RxPieChart } from "react-icons/rx";
import { BiAward, BiDesktop, BiFolderOpen } from "react-icons/bi";
import { FaAddressBook, FaAddressCard } from "react-icons/fa";
import { TbHexagonalPyramidPlus, TbHomeFilled } from "react-icons/tb";
import { PiAirTrafficControl, PiBarbell, PiBarcode, PiCakeDuotone, PiGraphicsCard, PiGraphicsCardThin, PiIdentificationBadgeFill, PiPersonArmsSpreadBold } from "react-icons/pi";
import { IoMdPerson } from "react-icons/io";

import GlobalActivation from "../GlobalAc"
import "./Sidemenu.css"
import React from 'react';
import { useNavigate } from "react-router-dom";

const Sidemenu = ({isActive}) => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/profile")
    }
    const handleHomeClick = () =>{
        navigate("/")
    }
    const handleMyFilesClick = () =>{
        navigate("/Files")
    }
  
    return (
        <div id="Sidemenucontainer" className={isActive}>
            
            <div id="ItemsContainer">
                <button onClick={handleHomeClick} className="buttondiv">
                    <TbHomeFilled className="itemlogo"/>
                </button>

                <button onClick={handleProfileClick} className="buttondiv" >
                    <IoMdPerson className="itemlogo"/>
                </button>

                <button onClick={handleMyFilesClick} className="buttondiv" >
                    <BiFolderOpen className="itemlogo"/>
                </button>


                <button onClick={handleMyFilesClick} className="buttondiv" >
                    <RxMixerVertical className="itemlogo"/>
                </button>

                <button onClick={handleMyFilesClick} className="buttondiv" >
                    <TbHexagonalPyramidPlus className="itemlogo"/>
                </button>

                <button onClick={handleMyFilesClick} className="buttondiv" >
                    <RxPieChart className="itemlogo"/>
                </button>
                
            </div>
            
        </div>
    )
}

export default Sidemenu
