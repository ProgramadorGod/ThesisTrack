import "../App.css";
import { RxActivityLog, RxListBullet, RxPerson, RxTextAlignLeft } from "react-icons/rx";
import logounipaz from "../media/logounipaz-nobg3.png"
import avatar from "../media/perfil.png"

const Navbar= () => {


  return (
    <div>
        <div id="navbar">
            {/* <button id="navbariconbutton"> */}
            <div>
              <RxTextAlignLeft id="icon"/>            
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
