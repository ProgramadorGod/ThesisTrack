import "../App.css";
import { RxActivityLog, RxChevronLeft, RxChevronRight, RxListBullet, RxPerson, RxTextAlignLeft } from "react-icons/rx";
import logounipaz from "../media/logounipaz-nobg3.png"
import avatar from "../media/perfil.png"
import Sidemenu from "./SideMenu/Sidemenu";
import { useState } from "react";
import logo from "../media/logowhite.png";
import {ReactComponent as Close} from "../media/cruz-pequena.svg"

const Navbar= ({ChangeActive, isActive}) => {



  return (
    <div>


        <div id="navbar">
            {/* <button id="navbariconbutton"> */}
            <div id="menubutton">
            {isActive ? (
              <Close id="icon" onClick={ChangeActive} className={`close ${isActive ?"CloseiconActive":""}`}/>

            ):(
              <RxTextAlignLeft id="icon" onClick={ChangeActive}/>

            )}
            </div>
            {/* </button>     */}

        
            <img src={logo} id="logott" alt="thesistrack"/>

            <img src={logounipaz} id="logounipaz" alt="logounipaz"></img>

            {/* <div id="navtextcontainer">
              
              <p id="navtext">
                  Thesis
              </p>

              <p id="navtext2">
                  Track
              </p>
            </div> */}


            {/* <img src={avatar} id="profilepic"/> */}
        </div>

        
        
    </div>
  );
};

export default Navbar;
