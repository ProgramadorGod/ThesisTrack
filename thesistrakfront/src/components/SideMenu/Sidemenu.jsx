import { RxAccessibility, RxHome, RxPerson } from "react-icons/rx";
import GlobalActivation from "../GlobalAc"
import "./Sidemenu.css"
import React from 'react';


const Sidemenu = ({isActive}) => {
        
    
  
    return (
        <div id="Sidemenucontainer" className={isActive}>
            
            <div id="ItemsContainer">
                <RxHome className="itemlogo"/>
                <button>
                    <RxAccessibility className="itemlogo"/>
                </button>
                
            </div>
            
        </div>
    )
}

export default Sidemenu
