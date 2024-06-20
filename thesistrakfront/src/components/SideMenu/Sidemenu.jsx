import { RxMixerVertical, RxPieChart } from "react-icons/rx";
import { BiFolderOpen, BiHome, BiHomeAlt, BiHomeAlt2, BiSolidHome } from "react-icons/bi";
import { } from "react-icons/fa";
import { TbHomeBolt, TbHomeFilled, TbHomeShield, TbHomeX } from "react-icons/tb";
import { PiOpenAiLogo } from "react-icons/pi";
import { IoMdPerson } from "react-icons/io";

import GlobalActivation from "../GlobalAc"
import "./Sidemenu.css"
import React, {PureComponent, useEffect, useState}  from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as HomeIcon} from "../../media/hogar.svg";
import { ReactComponent as ProfIcon} from "../../media/usuario.svg";
import { ReactComponent as FileIcon} from "../../media/carga-de-carpeta.svg";
import { ReactComponent as GptIcon} from "../../media/microchip.svg";
import { ReactComponent as StatsIcon} from "../../media/grafico-pastel-alt.svg";
import { ReactComponent as Help} from "../../media/interrogatorio.svg";
import { ReactComponent as Settings} from "../../media/es-computadora.svg";

const Sidemenu = ({isActive}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const inHome = location.pathname === "/";
    const inProfile = location.pathname === "/profile";
    const inFiles = location.pathname === "/Files";
    const inGraphics = location.pathname === "/Stadistics";
    const inSettings = location.pathname === "/Settings"
    const inGpt = location.pathname === "/IA"
    const inHelp  = location.pathname === "/Help"

    const [HideText, setHideText] = useState(false)

    useEffect(()=>{
        if (!isActive){
            const timer = setTimeout(() => {
                setHideText(true)
            }, 500);
            return()=>clearTimeout(timer)

        }else{
            setHideText(false)
        }

    })




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

    const handleSettings = () =>{
        navigate("/Settings")
    }

    const handleGpt = () =>{
        navigate("/IA")
    }

    const handleHelp = () =>{
        navigate("/Help")
    }

    
  
    return (
        <div id="Sidemenucontainer" className={isActive}>
            
            <div id="ItemsContainer">
                <button onClick={handleHomeClick} className={`buttondiv ${isActive ? "ButtonActive":""} ${inHome ? "Hovered":""} `}>
                    <div className="buttomitems">
                        <HomeIcon className="itemlogo"/> 
                        <div className={`${isActive ? "buttomtext buttomtext-active" : "buttomtext"} ${HideText? "HideText":""} `}>Home</div>
                    </div>
                    
                </button>


                <button onClick={handleMyFilesClick} className={`buttondiv ${isActive ? "ButtonActive":""} ${inFiles ? "Hovered":""}`}>
                    
                    <div className="buttomitems">
                        <FileIcon className="itemlogo"/>                       
                        <div className={`${isActive ? "buttomtext buttomtext-active" : "buttomtext"} ${HideText? "HideText":""}`}>Files</div>
                    </div>  
                    
                    
                </button>


                <button onClick={handleProfileClick} className={`buttondiv ${isActive ? "ButtonActive":""} ${inProfile ? "Hovered":""} `}>
                    <div className="buttomitems">
                        <ProfIcon className="itemlogo"/>
                        <div className={`${isActive ? "buttomtext buttomtext-active" : "buttomtext"} ${HideText? "HideText":""} `}>Profile</div>
                    </div>

                </button>



                <button onClick={handleSettings} className={`buttondiv ${isActive ? "ButtonActive":""}  ${inSettings? "Hovered":""}`}>
                    <div className="buttomitems {isActive}">
                        <Settings className="itemlogo"/>                                             
                        <div className={`${isActive ? "buttomtext buttomtext-active" : "buttomtext"} ${HideText? "HideText":""}`}>Config</div>
                    </div>
                </button>

                <button onClick={handleGpt} className={`buttondiv ${isActive ? "ButtonActive":""} ${inGpt ? "Hovered":""}`}>
                    
                    <div className="buttomitems">
                        <GptIcon className="itemlogo"/>                            
                        <div className={`${isActive ? "buttomtext buttomtext-active" : "buttomtext"}  ${HideText? "HideText":""}`}>Gpt</div>
                    </div>
                </button>

                <button onClick={handleGraphics} className={`buttondiv ${isActive ? "ButtonActive":""}  ${inGraphics ? "Hovered":""}`}>
                    <div className="buttomitems">
                        <StatsIcon className="itemlogo"/>                                                
                        <div className={`${isActive ? "buttomtext buttomtext-active" : "buttomtext"}  ${HideText? "HideText":""}`}>Stats</div>
                    </div>
                </button>

                <button onClick={handleHelp} className={`buttondiv ${isActive ? "ButtonActive":""}  ${inHelp ? "Hovered":""}`}>
                    <div className="buttomitems">
                        <Help className="itemlogo"/>                                                
                        <div className={`${isActive ? "buttomtext buttomtext-active" : "buttomtext"}  ${HideText? "HideText":""}`}>Stats</div>
                    </div>
                </button>

            </div>
            
        </div>
    )
}

export default Sidemenu
