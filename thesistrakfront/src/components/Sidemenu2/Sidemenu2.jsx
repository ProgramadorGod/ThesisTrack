
import "./Sidemenu2.css"
import {motion} from "framer-motion"
import { useAppContext } from '../../AppContext'


import React, {PureComponent, useEffect, useState}  from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as HomeIcon} from "../../media/hogar.svg";
import { ReactComponent as ProfIcon} from "../../media/usuario.svg";
import { ReactComponent as FileIcon} from "../../media/carga-de-carpeta.svg";
import { ReactComponent as GptIcon} from "../../media/microchip.svg";
import { ReactComponent as StatsIcon} from "../../media/grafico-pastel-alt.svg";
import { ReactComponent as Help} from "../../media/interrogatorio.svg";
import { ReactComponent as Settings} from "../../media/es-computadora.svg";

const Sidemenu2 = ({isActive}) => {
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














    const {WindowWidth} = useAppContext()

    const GetInitialPosition = () =>{
        if (WindowWidth > 700){
            return isActive ? "21vw" : "11vh"
        }else{
            return isActive ? "12vh" : "0vh"
        }
    }

    return (
        <motion.div 
        animate={{width:GetInitialPosition()}}
        transition={{duration:0.12,
            type:"spring"
        }}
        id='SideMenu2-Container'

        >
            
            <div id="Menu-items">
                <div className="item" onClick={handleHomeClick}>
                    <div className="item-group">
                        <HomeIcon id="Icon" className={`${isActive ? "IconActive":""}`}></HomeIcon>
                        <div className={`${isActive ? "TextActive":""} Text`}>HOME</div>
                    </div>
                    
                </div>

                <div className="item" onClick={handleProfileClick}>
                    <div className="item-group">
                        <ProfIcon id="Icon" className={`${isActive ? "IconActive":""}`}></ProfIcon>
                        <div className={`${isActive ? "TextActive":""} Text`}>PROFILE</div>

                    </div>

                </div>

                <div className="item" onClick={handleMyFilesClick}>
                    
                    <FileIcon id="Icon" className={`${isActive ? "IconActive":""}`}></FileIcon>
                    
                    
                </div>

                <div className="item" onClick={handleGpt}>
                    
                    
                    <GptIcon id="Icon" className={`${isActive ? "IconActive":""}`}></GptIcon>
                    
                    
                </div>

                <div className="item" onClick={handleGraphics}>
                    
                    <StatsIcon id="Icon" className={`${isActive ? "IconActive":""}`}></StatsIcon>
                    
                    
                </div>

                <div className="item" onClick={handleSettings}>
                    
                    
                    <Settings id="Icon" className={`${isActive ? "IconActive":""}`}></Settings>
                                        
                </div>

                <div className="item" onClick={handleHelp}>
                    
                    
                    <Help id="Icon" className={`${isActive ? "IconActive":""}`}></Help>
                    
                    
                </div>




            </div>

        </motion.div>
    )
}

export default Sidemenu2
