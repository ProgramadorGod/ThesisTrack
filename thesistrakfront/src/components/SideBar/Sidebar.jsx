import React, { useState } from 'react'
import "./Sidebar.css"
import { RxAlignBaseline, RxAlignRight, RxArrowRight, RxCardStackPlus, RxChevronRight, RxColumns, RxHamburgerMenu, RxInput, RxPinRight, RxViewVertical } from 'react-icons/rx'
import { SlArrowRight, SlControlEnd, SlMenu } from "react-icons/sl";

const Sidebar = () => {

    const [width, setWidth]  = useState("100px");

    const changeWidth = () =>{
        setWidth(prevWidth =>( prevWidth === '25%' ? '5%':'25%'));

    }


    return (
        <div id='SideBar' style={{width}}>
            <div>
                <button id='Changer' onClick={changeWidth}>
                    <SlMenu id="sideicon" />
                
                    

                </button>    
            
                
                
            </div>
        </div>
    )
}

export default Sidebar
