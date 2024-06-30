
import React from 'react';
import Loadingrectangle from '../loading/loading';
import profilepic from "../../media/perfil.png";
import "./profile.css";
import { useAppContext } from '../../AppContext';

const Profile = () => {

  const { isloading, setisloading, isLogged, setisLogged, profile, setProfile, name, setname, userid, setUserid , isActive, setisActive, PortToUse} = useAppContext();
  

  const capitalize = (text) => {
    if (typeof text !== 'string') return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  const toUpperCase = (text) =>{
    if (typeof text !== "string") return "";
    return text.toUpperCase()
  }

  return (
    <div >
    
      <div id='ProfileComponent'>

        
        <div id="ProfileContainer">
          <div id='profpicdiv'  className='ProfCardItem'>
            <img src={profilepic} id='ProfileMenuPic'/>
          </div>
          
          <h5 id='ProfEmail' className='ProfCardItem'>{capitalize(profile.UserType)}</h5>
          <h5 className='ProfCardItem'>{capitalize(name)}</h5>
          
          <h5 className='ProfCardItem'>{capitalize(profile.UserMail)}</h5>
          

          <h5  className='ProfCardItem'>carrers</h5>
          {/* <div className='ProfCardItem'>
            <UpdateUsername setname={setname}/>  
          </div> */}
          <a id='logout' className='ProfCardItem' href='http://127.0.0.1:8000/api/logout'> { capitalize("Logout")}</a>

        </div>

      </div>
  





    </div>
  );
};

export default Profile;
