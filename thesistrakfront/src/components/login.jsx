// Login.js
import React, { useState } from 'react';
import Loginform from './loginform';
import axios from 'axios';


axios.defaults.withCredentials = true;


const Login = (setIsLogged) => {

  
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
        window.location.href = 'http://127.0.0.1:3000';

      }

    }catch(error){
      alert("Error")
      console.log("ERROR TRYING TO LOGIN, ", error)
    }

  }


  const handleLogin = () => {
    window.location.href = 'http://127.0.0.1:8000/accounts/google/login/?next=/';
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