
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateUsername from '../UpdateUsername';
import Loadingrectangle from '../loading/loading';
import profilepic from "../../media/perfil.png";
import "./profile.css";

const Profile = ({isLogged}) => {
  const [profile, setProfile] = useState(null);
  const [name, setname] = useState(null);
  const [carrers, setCarrers] = useState([]);



  const HandleName = ()=>{
   setname(profile.username) 
  }
  
  

  useEffect(() => {

    try{
      const fetchProfile = async () => {
        // const token = localStorage.getItem('authToken');
        const response = await axios.get('http://127.0.0.1:8000/profile/', {
          withCredentials: true,  // Importante para enviar cookies de sesión
  
        });
        setProfile(response.data);
        setCarrers(response.data.careers)
        setname(response.data.username)
        
      };

      fetchProfile();
      


    }catch(error){
      console.log("Lol")
    
    }

    
  }, []);

  

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
            <div className='ProfCardItem'>
              <UpdateUsername setname={setname}/>  
            </div>
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
