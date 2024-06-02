import "../App.css";
import { RxActivityLog, RxChevronLeft, RxChevronRight, RxListBullet, RxPerson, RxTextAlignLeft } from "react-icons/rx";
import logounipaz from "../media/logounipaz-nobg3.png"
import avatar from "../media/perfil.png"
import Sidemenu from "./SideMenu/Sidemenu";
import { useState } from "react";


const Navbar= () => {
  const [isActive, setisActive] = useState("");
  const ChangeActive = () =>{
    setisActive(prevActiveStatus =>( prevActiveStatus === "" ? "Active" : ""));
  }


  return (
    <div>
        <div id="Sidemenucontainer" className={isActive}>

        </div>


        <div id="navbar">
            {/* <button id="navbariconbutton"> */}
            <div>
              <RxTextAlignLeft id="icon" onClick={ChangeActive}/>
            </div>
            {/* </button>     */}

        

            <img src={logounipaz} id="logounipaz"></img>


            <div id="navtextcontainer">
              <p id="navtext">
                  Thesis
              </p>

              <p id="navtext2">
                  Track
              </p>
            </div>


            <img src={avatar} id="profilepic"/>
        </div>

        
        
    </div>
  );
};

export default Navbar;
