import "./Sidemenu2.css";
import { motion } from "framer-motion";
import { useAppContext } from "../../AppContext";
import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../../media/hogar.svg";
import { ReactComponent as ProfIcon } from "../../media/usuario.svg";
import { ReactComponent as FileIcon } from "../../media/carga-de-carpeta.svg";
import { ReactComponent as GptIcon } from "../../media/microchip.svg";
import { ReactComponent as StatsIcon } from "../../media/grafico-pastel-alt.svg";
import { ReactComponent as Help } from "../../media/interrogatorio.svg";

const Sidemenu2 = ({ isActive }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { WindowWidth } = useAppContext();

  const routes = useMemo(() => [
    { path: "/", Icon: HomeIcon },
    { path: "/profile", Icon: ProfIcon },
    { path: "/Files", Icon: FileIcon },
    { path: "/IA", Icon: GptIcon },
    { path: "/Stadistics", Icon: StatsIcon },
    { path: "/Help", Icon: Help }
  ], []);

  const [activeRoute, setActiveRoute] = useState(location.pathname);

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  const getItemSize = () => (WindowWidth > 799 ? "4vh" : "20px");
  const initialWidth = WindowWidth > 799 ? "10.5vh" : "100vw";

  return (
    <div
      style={{ width: initialWidth }}
      id="SideMenu2-Container"
      className={isActive ? "" : "unactive"}
    >
      <div id="Menu-items">
        {routes.map(({ path, Icon }) => {
          const isActive = activeRoute === path;

          return (
            <button
              key={path}
              className="item"
              onClick={() => navigate(path)}
              tabIndex={2}
            >
              <motion.div
                className={`item-group ${isActive ? "active" : ""}`}
                initial={{ scale: 0.8 }}
                animate={{ scale: isActive ? 1 : 0.8 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Icon
                  className="IconActive"
                  style={{
                    width: getItemSize(),
                    height: getItemSize(),
                    fill: isActive ? "#FFFFFF" : "#7c776c",
                    transition: "fill 0.3s ease"
                  }}
                />
              </motion.div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidemenu2;
