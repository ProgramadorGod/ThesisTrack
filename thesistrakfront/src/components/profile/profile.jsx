
import React from 'react';
import Loadingrectangle from '../loading/loading';
import profilepic from "../../media/perfil.png";
import "./profile.css";

const Profile = ({isLogged, profile,name,carrers}) => {




  



  

  return (
    <div >
      {profile ? (
        <div id='ProfileComponent'>

          
          <div id="ProfileContainer">
            <div id='profpicdiv'  className='ProfCardItem'>
              <img src={profilepic} id='ProfileMenuPic'/>
            </div>
            
            <h5 id='ProfEmail' className='ProfCardItem'>{profile.email}</h5>
            <h5 className='ProfCardItem'>{name}</h5>
            

            <h5  className='ProfCardItem'>{carrers}</h5>
            {/* <div className='ProfCardItem'>
              <UpdateUsername setname={setname}/>  
            </div> */}
            <a id='logout' className='ProfCardItem' href='http://127.0.0.1:8000/logout/'> Logout</a>

          </div>

        </div>
      ) : (
        <div> <Loadingrectangle/> </div>
      )}





    </div>
  );
};

export default Profile;
