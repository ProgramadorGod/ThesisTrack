import "./Sidemenu2.css"
import { motion } from "framer-motion"
import { useAppContext } from '../../AppContext'

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as HomeIcon } from "../../media/hogar.svg";
import { ReactComponent as ProfIcon } from "../../media/usuario.svg";
import { ReactComponent as FileIcon } from "../../media/carga-de-carpeta.svg";
import { ReactComponent as GptIcon } from "../../media/microchip.svg";
import { ReactComponent as StatsIcon } from "../../media/grafico-pastel-alt.svg";
import { ReactComponent as Help } from "../../media/interrogatorio.svg";
import { ReactComponent as Settings } from "../../media/es-computadora.svg";

const SideMenuIcon = ({ icon, isActive }) => {
    return (
        <motion.div
            className="icon-wrapper"
            whileHover={{
                scale: 1.1,
                rotate: [0, 10, -10, 0], // Efecto ondulante en hover
            }}
            animate={{
                borderRadius: isActive ? "50%" : "0%",
                transition: { duration: 0.5 },
            }}
        >
            {icon}
        </motion.div>
    );
};

const Sidemenu2 = ({ isActive }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const inHome = location.pathname === "/";
    const inProfile = location.pathname === "/profile";
    const inFiles = location.pathname === "/Files";
    const inGraphics = location.pathname === "/Stadistics";
    const inSettings = location.pathname === "/Settings";
    const inGpt = location.pathname === "/IA";
    const inHelp = location.pathname === "/Help";

    const [HideText, setHideText] = useState(false);

    useEffect(() => {
        if (!isActive) {
            const timer = setTimeout(() => {
                setHideText(true);
            }, 500);
            return () => clearTimeout(timer);
        } else {
            setHideText(false);
        }
    }, [isActive]);

    const handleProfileClick = () => {
        navigate("/profile");
    };
    const handleHomeClick = () => {
        navigate("/");
    };
    const handleMyFilesClick = () => {
        navigate("/Files");
    };
    const handleGraphics = () => {
        navigate("/Stadistics");
    };
    const handleSettings = () => {
        navigate("/Settings");
    };
    const handleGpt = () => {
        navigate("/IA");
    };
    const handleHelp = () => {
        navigate("/Help");
    };

    const { WindowWidth } = useAppContext();

    const GetInitialPosition = () => {
        if (WindowWidth > 700) {
            return isActive ? "10.5vh" : "0vh";
        } else {
            return isActive ? "10.5vh" : "0vh";
        }
    };

    return (
        <motion.div
            animate={{ width: GetInitialPosition() }}
            transition={{
                duration: 0.01,
                type: "spring",
                damping: 5,
                shiftness: 700,
                mass: 0.1,
            }}
            id='SideMenu2-Container'
        >
            <div id="Menu-items">
                <button className={`${isActive ? "item" : "unactive"}`} onClick={handleHomeClick} tabIndex={2}>
                    <div className="item-group">
                        <motion.div animate={{ x: isActive ? 0 : -30, opacity: isActive ? 1 : 0, color: isActive ? "#000000" : "#ffffff" }}>
                            <HomeIcon id="Icon" className={`${isActive ? "IconActive" : ""}`}></HomeIcon>
                        </motion.div>
                    </div>
                </button>

                <button className={`${isActive ? "item" : "unactive"}`} onClick={handleProfileClick} tabIndex={2}>
                    <motion.div className="item-group"
                        animate={{ x: isActive ? 0 : -30, opacity: isActive ? 1 : 0, color: isActive ? "#000000" : "#ffffff" }}>
                        <ProfIcon id="Icon" className={`${isActive ? "IconActive" : ""}`}></ProfIcon>
                    </motion.div>
                </button>

                <button className={`${isActive ? "item" : "unactive"}`} onClick={handleMyFilesClick} tabIndex={2}>
                    <motion.div className="item-group"
                        animate={{ x: isActive ? 0 : -30, opacity: isActive ? 1 : 0, color: isActive ? "#000000" : "#ffffff" }}>
                        <FileIcon id="Icon" className={`${isActive ? "IconActive" : ""}`}></FileIcon>
                    </motion.div>
                </button>

                <button className={`${isActive ? "item" : "unactive"}`} onClick={handleGpt} tabIndex={2}>
                    <motion.div className="item-group"
                        animate={{ x: isActive ? 0 : -30, opacity: isActive ? 1 : 0, color: isActive ? "#000000" : "#ffffff" }}>
                        <GptIcon id="Icon" className={`${isActive ? "IconActive" : ""}`}></GptIcon>
                    </motion.div>
                </button>

                <button className={`${isActive ? "item" : "unactive"}`} onClick={handleGraphics} tabIndex={2}>
                    <motion.div className="item-group" animate={{ x: isActive ? 0 : -30, opacity: isActive ? 1 : 0, color: isActive ? "#000000" : "#ffffff" }}>
                        <StatsIcon id="Icon" className={`${isActive ? "IconActive" : ""}`}></StatsIcon>
                    </motion.div>
                </button>

                <button className={`${isActive ? "item" : "unactive"}`} onClick={handleSettings} tabIndex={2}>
                    <motion.div className="item-group" animate={{ x: isActive ? 0 : -30, opacity: isActive ? 1 : 0, color: isActive ? "#000000" : "#ffffff" }}>
                        <Settings id="Icon" className={`${isActive ? "IconActive" : ""}`}></Settings>
                    </motion.div>
                </button>

                <button className={`${isActive ? "item" : "unactive"}`} onClick={handleHelp} tabIndex={2}>
                    <motion.div className="item-group" animate={{ x: isActive ? 0 : -30, opacity: isActive ? 1 : 0, color: isActive ? "#000000" : "#ffffff" }}>
                        <Help id="Icon" className={`${isActive ? "IconActive" : ""}`}></Help>
                    </motion.div>
                </button>
            </div>
        </motion.div>
    );
}

export default Sidemenu2;
