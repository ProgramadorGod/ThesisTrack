// Login.js
import React, { useEffect, useState } from 'react';
import Loginform from './loginform';
import axios from 'axios';
import { useAppContext } from '../AppContext';


axios.defaults.withCredentials = true;


const Login = () => {
  const { isloading, setisloading, isLogged, setisLogged, profile, setProfile, name, setname, userid, setUserid , isActive, setisActive, PortToUse, fetchProfile} = useAppContext();
  
  const setIsLogged = setisLogged
  
  
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token , setToken] = useState()
  const Email = useState([""]);
  const [isRegister,setIsRegister] = useState([false]);

  

  const handleLoginForm = async(e) =>{
    e.preventDefault();

    try{
      const response = await axios.post("http://127.0.0.1:8000/api/login2/",{
        username,
        password,
      })

      if (response.status === 200){
        console.log("worked")
        console.log(isLogged)
        setIsLogged(true)
        fetchProfile()

      }

    }catch(error){
      if (error.response && error.response.status === 403) {
        // Refresh CSRF token
        await axios.get("http://127.0.0.1:8000/api/refresh_csrf/");
        alert("CSRF token refreshed, please try again.");
      } else {
        alert("Error");
      }
      console.log("ERROR TRYING TO LOGIN, ", error);
    }

  }


  const handleLogin = () => {
    const googleLoginUrl = 'http://127.0.0.1:8000/accounts/google/login/?next=/';
    const loginWindow = window.open(googleLoginUrl, 'Login with Google', 'width=600,height=600');





  };


  return (
    <div id='LoginContainer'>
      
      <form onSubmit={handleLoginForm}>
        <div>
            <label>Username</label>
            <input
                type='text'
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required            
            />

        </div>
        <div>
            <label>Password</label>
            <input
                type='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required            
            />

        </div>
          <button type='submit'>Login</button>
        <div>

        </div>

      </form>





      <h2>Login</h2>
      <button onClick={handleLogin}>Login with Google</button>
      
    </div>
  );
};

export default Login;

// Profile.js