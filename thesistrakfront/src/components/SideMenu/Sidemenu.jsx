import { RxMixerVertical, RxPieChart } from "react-icons/rx";
import { BiFolderOpen } from "react-icons/bi";
import { } from "react-icons/fa";
import { TbHomeFilled } from "react-icons/tb";
import { PiOpenAiLogo } from "react-icons/pi";
import { IoMdPerson } from "react-icons/io";

import GlobalActivation from "../GlobalAc"
import "./Sidemenu.css"
import React, {PureComponent}  from 'react';
import { useLocation, useNavigate } from "react-router-dom";




const Sidemenu = ({isActive}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const inHome = location.pathname === "/";
    const inProfile = location.pathname === "/";
    const inFiles = location.pathname === "/";
    const inGraphics = location.pathname === "/";
    const inSettings = location.pathname === "/Settings"



    const handleProfileClick = () => {
        navigate("/profile")
    }
    const handleHomeClick = () =>{
        navigate("/")
    }
    const handleMyFilesClick = () =>{
        navigate("/Files")
    }
    const handleGraphics = () =>{
        navigate("/Stadistics")
    }

    
  
    return (
        <div id="Sidemenucontainer" className={isActive}>
            
            <div id="ItemsContainer">
                <button onClick={handleHomeClick} className={`buttondiv ${isActive ? "ButtonActive":""}`}>
                    <div className="buttomitems">
                        <TbHomeFilled className="itemlogo"/> 
                        <div className={isActive ? "buttomtext buttomtext-active" : "buttomtext"}>Home</div>
                    </div>
                    
                </button>

                <button onClick={handleProfileClick} className={`buttondiv ${isActive ? "ButtonActive":""}`}>
                    <div className="buttomitems">
                        <IoMdPerson className="itemlogo"/>
                        <div className={isActive ? "buttomtext buttomtext-active" : "buttomtext"}>Profile</div>
                    </div>

                </button>

                <button onClick={handleMyFilesClick} className={`buttondiv ${isActive ? "ButtonActive":""}`}>
                    
                    <div className="buttomitems">
                        <BiFolderOpen className="itemlogo"/>                       
                        <div className={isActive ? "buttomtext buttomtext-active" : "buttomtext"}>Files</div>
                    </div>  
                    
                    
                </button>


                <button onClick={handleGraphics} className={`buttondiv ${isActive ? "ButtonActive":""}`}>
                    <div className="buttomitems {isActive}">
                        <RxMixerVertical className="itemlogo"/>                                             
                        <div className={isActive ? "buttomtext buttomtext-active" : "buttomtext"}>Config</div>
                    </div>
                </button>

                <button onClick={handleMyFilesClick} className={`buttondiv ${isActive ? "ButtonActive":""}`}>
                    
                    <div className="buttomitems">
                        <PiOpenAiLogo className="itemlogo"/>                            
                        <div className={isActive ? "buttomtext buttomtext-active" : "buttomtext"}>Gpt</div>
                    </div>
                </button>

                <button onClick={handleGraphics} className={`buttondiv ${isActive ? "ButtonActive":""}`}>
                    <div className="buttomitems">
                        <RxPieChart className="itemlogo"/>                                                
                        <div className={isActive ? "buttomtext buttomtext-active" : "buttomtext"}>Grafics</div>
                    </div>
                </button>
                
            </div>
            
        </div>
    )
}

export default Sidemenu
