import React from 'react';
import "./loading.css";
// import Atlas from "../../media/atlas-Splash.png";

const Loadingrectangle = ({ MoveUpper }) => {
  return (
    <div className="loading-splash" style={{ top: MoveUpper ? "0px" : "50%" }}>
      <div className="loading-container">
        <div className="loading-rectangle" id="gordo"></div>
        <div className="loading-rectangle"></div>
        <div className="loading-rectangle" id="gordo3"></div>
        {/* {Atlas ? <img src={Atlas} alt="Atlas Logo" className="atlas-logo" /> : null} */}
      </div>
    </div>
  );
};

export default Loadingrectangle;
 