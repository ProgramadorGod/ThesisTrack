
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateUsername from './UpdateUsername';
import Loadingrectangle from './loading/loading';

const Profile = ({isLogged}) => {
  const [profile, setProfile] = useState(null);
  const [name, setname] = useState(null);

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
        <div>
          <div>lol</div>
          <div id="ProfileContainer">
            
            <p>Email: {profile.email}</p>
            <p>Username: {name}</p>
            <div>
              <UpdateUsername setname={setname}/>  
            </div>
            <a href='http://127.0.0.1:8000/logout/'> logout</a>

          </div>

        </div>
      ) : (
        <div> <Loadingrectangle/> </div>
      )}





    </div>
  );
};

export default Profile;
