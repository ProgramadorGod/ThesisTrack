import React from "react";
import { useState } from "react";

const GlobalActivation = () =>{

    const [isActive, setisActive] = useState("Active");
    const ChangeActive = () =>{
      setisActive(prevActiveStatus =>( prevActiveStatus === "Active" ? "" : "Active"));
    }


}
export default GlobalActivation
