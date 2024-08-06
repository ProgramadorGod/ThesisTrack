
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
            return isActive ? "10.5vh" : "0vh"
        }else{
            return isActive ? "10.5vh" : "0vh"
        }
    }

    return (
        <motion.div 
        animate={{width:GetInitialPosition()}}
        transition={{duration:0.01,
            type:"spring",
            damping:5,
            shiftness:700,
            mass:0.1,

        }}
        id='SideMenu2-Container'

        >
            
            <div id="Menu-items">
                <div className="item" onClick={handleHomeClick}>
                    <div className="item-group">
                        <div>
                        <HomeIcon id="Icon" className={`${isActive ? "IconActive":""}`}></HomeIcon>

                        </div>
                        <motion.div
                            animate={{ x: isActive ? 10 : -50, opacity: isActive ? 1:0, color: isActive ? "#000000" : "#ffffff" }}
                            className={`${isActive ? "TextActive":""} Text`}>HOME</motion.div>
                    </div>
                    
                </div>

                <div className="item" onClick={handleProfileClick}>
                    <div className="item-group">
                        <ProfIcon id="Icon" className={`${isActive ? "IconActive":""}`}></ProfIcon>
                        <motion.div 
                        
                        animate={{ x: isActive ? 10 : -50, opacity: isActive ? 1:0, color: isActive ? "#000000" : "#ffffff" }}
                        className={`${isActive ? "TextActive":""} Text`}>
                            
                            PROFILE
                            
                        </motion.div>

                    </div>

                </div>

                <div className="item" onClick={handleMyFilesClick}>
                    <div className="item-group">
                    <FileIcon id="Icon" className={`${isActive ? "IconActive":""}`}></FileIcon>
                    <motion.div 
                        
                        animate={{ x: isActive ? 10 : -50, opacity: isActive ? 1:0, color: isActive ? "#000000" : "#ffffff" }}
                        className={`${isActive ? "TextActive":""} Text`}>
                            
                            FILES
                            
                        </motion.div>
                    </div>   
                    
                    
                    
                </div>

                <div className="item" onClick={handleGpt}>
                    <div className="item-group">
                    <GptIcon id="Icon" className={`${isActive ? "IconActive":""}`}></GptIcon>
                    <motion.div 
                        
                        animate={{ x: isActive ? 10 : -50, opacity: isActive ? 1:0, color: isActive ? "#000000" : "#ffffff" }}
                        className={`${isActive ? "TextActive":""} Text`}>
                            
                            ASISTENTE
                            
                        </motion.div>
                    </div>   
                    
                    
                    
                </div>

                <div className="item" onClick={handleGraphics}>
                    <div className="item-group">
                    <StatsIcon id="Icon" className={`${isActive ? "IconActive":""}`}></StatsIcon>
                    <motion.div 
                        
                        animate={{ x: isActive ? 10 : -50, opacity: isActive ? 1:0, color: isActive ? "#000000" : "#ffffff" }}
                        className={`${isActive ? "TextActive":""} Text`}>
                            
                            GRAPHICS
                            
                        </motion.div>
                    </div>   
                    
                    
                    
                </div>

                <div className="item" onClick={handleSettings}>
                    <div className="item-group">
                    <Settings id="Icon" className={`${isActive ? "IconActive":""}`}></Settings>
                    <motion.div 
                        
                        animate={{ x: isActive ? 10 : -50, opacity: isActive ? 1:0, color: isActive ? "#000000" : "#ffffff"}}
                        className={`${isActive ? "TextActive":""} Text`}>
                            
                            SETTINGS
                            
                        </motion.div>
                    </div>   
                    
                    
                    
                </div>

                <div className="item" onClick={handleHelp}>
                    <div className="item-group">
                    <Help id="Icon" className={`${isActive ? "IconActive":""}`}></Help>
                    <motion.div 
                        
                        animate={{ x: isActive ? 10 : -50, opacity: isActive ? 1:0, color: isActive ? "#000000" : "#ffffff" }}
                        className={`${isActive ? "TextActive":""} Text`}>
                            
                            HELP
                            
                        </motion.div>
                    </div>   
                    
                    
                    
                </div>




            </div>

        </motion.div>
    )
}

export default Sidemenu2
