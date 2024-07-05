// Login.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../AppContext';
import "./login.css"

import {color, motion} from "framer-motion";
import Lottie from "lottie-react";
import Bird from "../media/Pigeon4.json";
import Bird2 from "../media/Pigeon3.json";
import Swal from 'sweetalert2';
import GoogleIcon from "../media/google.png"

axios.defaults.withCredentials = true;


const Login = () => {
  const {  isLogged, PortToUse, fetchProfile} = useAppContext();


  const [LoadingFetch, setLoadingFetch]= useState(false)
  const [UsernameFocus, setUsernameFocus] = useState(false)
  const [PasswordFocus, setPasswordFocus] = useState(false)

  const [InLogin, setInLogin] = useState(true);
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [IsLogin,setIsLogin] = useState(true);



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
    setLoadingFetch(true)
    try{
      const response = await axios.post(PortToUse+"api/login2/",{
        username,
        password,
      },{
        headers:{
          'X-CSRFToken':getCsrfToken()
        }
      })

      
      setLoadingFetch(false)

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
        Swal.fire({
          icon: 'error',
          title: 'Invalid Credentials',
          text: 'Try Again!',
          timer:1500,
          timerProgressBar:true,

        });
      }
      console.log("ERROR TRYING TO LOGIN, ", error);
    }

  }

  const handleLogin = () => {

    const googleLoginUrl = 'http://127.0.0.1:8000/accounts/google/login/?next=/';
    window.location.href = googleLoginUrl

    



  };

  const WidthPixels = 190

  return (
    <div id='SessionContainer'>
      <div id='MotionContainer'>
        <motion.div 
        className='Motiondiv'
        animate={{scale:1.2, x:WidthPixels}} 
        whileDrag={{scale:1.5}}
        whileHover={{scale: 1.3}} 
        drag="x" 
        dragConstraints={{left:-330 , right:310}}>
          
          <div id='LottieContainer1' style={{ width: '34px', height: '40px' }}>
            <Lottie animationData={Bird} loop autoplay />

          </div>      
        </motion.div>

        <motion.div 
        className='Motiondiv'
        animate={{scale:1.2, x:-WidthPixels}} 
        whileDrag={{scale:1.5}}
        whileHover={{scale: 1.3}} 
        drag="x" 
        dragConstraints={{left:-330 , right:310}}>
          
          <div id='LottieContainer2' style={{ width: '40px', height: '40px' }}>
            <Lottie animationData={Bird2} loop autoplay />

          </div>      
        </motion.div>
        


      </div>

      

      <div id='LogRegBox' >

        <motion.div id='LoginSquare' 
        initial = {{opacity:0}}
        animate={{opacity: IsLogin ? 1 : 0 }}
        transition={{duration:0.3}}
        >
        
        
          <div className='ComboTextGoogle'>
            <h1 id='LoginText'>Sign In</h1>
            <button className='GoogleButton' onClick={handleLogin} aria-label='Aria Google'><img src={GoogleIcon} id='FaGoogle'/></button>
          </div>
          
          <form onSubmit={handleLoginForm} id='FormularyContainer'>

            <div id='UserLab-Cont' className={`${InLogin ? "InLogin" : "InRegister"}`}>
                
                <input
                    id='Username-Input'
                    placeholder={`Username`}    
                    type='text'
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}

                    required            
                />
                <motion.div
                  className='input-underline'
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: UsernameFocus ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
            </div>
            

            <div id='PassLab-Cont' className={`${InLogin ? "InLogin" : "InRegister"}`} >
                
                <input
                    id='Password-Input'
                    placeholder={`Password`}    

                    type='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    required            
                />
                <motion.div
                  className='input-underline2'
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: PasswordFocus ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

            </div>
            <motion.button 
            whileHover={{ scale: 1.05 , backgroundColor:"#0056b3"}}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            whileFocus={{scale:1.04, backgroundColor:"#0056b3"}}
            whileTap={{scale:1.12, transition:{duration:0.001,  type: "spring", stiffness: 200, damping: 8  }}}

            className='SubmitFormButtom' 
            type='submit' 
            aria-label='Aria Login' 
            title='LOGIN'
            
            >
  
              LOGIN
                        
            </motion.button>

          </form>
        </motion.div>

        <motion.div id='RegisterContainer'
          initial = {{opacity:0}}
          animate={{opacity: IsLogin ? 1 : 0 }}
          transition={{duration:0.3}}
        >
          <div className='ComboTextGoogle'>
            <h1 id="RegisterText">Register</h1>
            <button className='GoogleButton' onClick={handleLogin} aria-label='Aria Google'><img src={GoogleIcon} id='FaGoogle'/></button>

          </div>
          
        </motion.div>
 

  
    </div>

      


      
        
    </div>
  );
};

export default Login;

// Profile.js