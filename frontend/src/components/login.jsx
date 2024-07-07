// Login.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../AppContext';
import "./login.css"
import { useHref } from 'react-router-dom';
import { FaGoogle, FaLock } from 'react-icons/fa';

axios.defaults.withCredentials = true;


const Login = () => {
  const { isloading, setisloading, isLogged, setisLogged, profile, setProfile, name, setname, userid, setUserid , isActive, setisActive, PortToUse, fetchProfile} = useAppContext();
  
  const setIsLogged = setisLogged
  
  
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token , setToken] = useState()
  const Email = useState([""]);
  const [isRegister,setIsRegister] = useState([false]);

  const [ShowWindow, setShowWindow] = useState(false);

  const handleLoginClick = () =>{
    setShowWindow(true)
  }

  const handleCloseWindow = () =>{
    setShowWindow(false)
  }

  const getCsrfToken = () => {
    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];
    return csrfToken;
  };
  
  const setCsrfToken = (token) => {
    document.cookie = `csrftoken=${token}; path=/`;
  };

  const handleLoginForm = async(e) =>{
    e.preventDefault();

    try{
      const response = await axios.post(PortToUse+"api/login2/",{
        username,
        password,
      },{
        headers:{
          'X-CSRFToken':getCsrfToken()
        }
      })

      if (response.status === 200){
        console.log("worked")
        console.log(isLogged)
        fetchProfile()


      }

    }catch(error){
      if (error.response && error.response.status === 403) {
        // Refresh CSRF token
        const csrfResponse = await axios.get(PortToUse+"api/refresh_csrf/");
        const NewCsrfToken = csrfResponse.data.csrfToken;


        setCsrfToken(NewCsrfToken)
        
        alert("CSRF token refreshed, please try again.");

      } else {
        alert("Try Again...");
      }
      console.log("ERROR TRYING TO LOGIN, ", error);
    }

  }

  const handleLogin = () => {

    const googleLoginUrl = 'http://127.0.0.1:8000/accounts/google/login/?next=/';
    window.location.href = googleLoginUrl

    



  };


  return (
    <div id='SessionContainer'>
      <div id='LogRegBox'>

        <div id='LoginSquare'>
          <h1>Sign In</h1>
          <form onSubmit={handleLoginForm}>
            <div id='UserLab-Cont'>
                
                <input
                    id='Username-Label'
                    placeholder='Username'    
                    type='text'
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    required            
                />

            </div>
            <div style={{position:"relative"}}>
                <label></label>
                <input
                    id='Password-Label'
                    
                    type='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required            
                />

            </div>
              <button type='submit' aria-label='Aria Login' title='LOGIN'>Login</button>
            <div>

            </div>
            <button className='GoogleButton' onClick={handleLogin} aria-label='Aria Google'><FaGoogle></FaGoogle></button>
          </form>

        </div>

        <div id='RegisterContainer'>
          <h1>Register</h1>
        </div>

      </div>





      
        
    </div>
  );
};

export default Login;

// Profile.js