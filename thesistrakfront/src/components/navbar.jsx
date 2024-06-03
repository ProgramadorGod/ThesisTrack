import "../App.css";
import { RxActivityLog, RxChevronLeft, RxChevronRight, RxListBullet, RxPerson, RxTextAlignLeft } from "react-icons/rx";
import logounipaz from "../media/logounipaz-nobg3.png"
import avatar from "../media/perfil.png"
import Sidemenu from "./SideMenu/Sidemenu";
import { useState } from "react";
import logo from "../media/logowhite.png";

const Navbar= ({ChangeActive}) => {



  return (
    <div>


        <div id="navbar">
            {/* <button id="navbariconbutton"> */}
            <div>
              <RxTextAlignLeft id="icon" onClick={ChangeActive}/>
            </div>
            {/* </button>     */}

        
            <img src={logo} id="logott"/>

            <img src={logounipaz} id="logounipaz"></img>

            {/* <div id="navtextcontainer">
              
              <p id="navtext">
                  Thesis
              </p>

              <p id="navtext2">
                  Track
              </p>
            </div> */}


            <img src={avatar} id="profilepic"/>
        </div>

        
        
    </div>
  );
};

export default Navbar;
