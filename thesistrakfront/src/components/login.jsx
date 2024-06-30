// Login.js
import React, { useEffect, useState } from 'react';
import Loginform from './loginform';
import axios from 'axios';


axios.defaults.withCredentials = true;


const Login = ({setIsLogged, isLogged, fetchProfile, isloading, setisloading} ) => {

  
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
        setIsLogged(true)
        console.log(isLogged)
        console.log(isloading)

      }

    }catch(error){
      alert("Error")
      console.log("ERROR TRYING TO LOGIN, ", error)
    }

  }


  const handleLogin = () => {
    const googleLoginUrl = 'http://127.0.0.1:8000/accounts/google/login/?next=/';
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const googleWindow = window.open(
      googleLoginUrl,
      'googleLogin',
      `width=${width},height=${height},top=${top},left=${left}`
    );


    const checkLoginStatus = async () => {
      try {
        fetchProfile()
        const response = await axios.get("http://127.0.0.1:8000/api/accounts/");
        if (response.status === 200) {
          setIsLogged(true);
          console.log(isLogged)
          googleWindow.close();
          // Cierra la ventana actual si no es la ventana principal

        }
      } catch (error) {
        console.log("User not logged in", error);
        googleWindow.close();

      }
    };



    const checkWindowClosed = setInterval(() => {
      if (googleWindow.closed) {
        clearInterval(checkWindowClosed);
        
        checkLoginStatus();
      }
    }, 500);


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