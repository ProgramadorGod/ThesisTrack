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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [IsLogin,setIsLogin] = useState(true);

  const ToggleIsLogin = () =>{
    setIsLogin(prevIsLogin => !prevIsLogin);

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
    if (LoadingFetch) return; // Evitar enviar si ya hay una petición en proceso

    setLoadingFetch(true);

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
        setLoadingFetch(false)
        fetchProfile()


      }
      setLoadingFetch(false)

    }catch(error){
      if (error.response && error.response.status === 403) {
        // Refresh CSRF token
        const csrfResponse = await axios.get(PortToUse+"api/refresh_csrf/");
        const NewCsrfToken = csrfResponse.data.csrfToken;
        setLoadingFetch(false)


        setCsrfToken(NewCsrfToken)
        
        alert("CSRF token refreshed, please try again.");

      } else {
        Swal.fire({
          icon: 'error',
          title: error.response.data.Detail,
          text: 'Try Again!',
          timer:1500,
          timerProgressBar:true,

        });
      }
      console.log("ERROR TRYING TO LOGIN, ", error);
    }
    setLoadingFetch(false)
  }

  const handleLogin = () => {

    const googleLoginUrl = 'http://127.0.0.1:8000/accounts/google/login/?next=/';
    window.location.href = googleLoginUrl

    



  };


  const [WidthPixels, setWidthPixels] = useState(0);
  const [LimitPixels, setLimitPixels] = useState(0);
  const [TransitionBlock, setTransitionBlock] = useState(0);
  const [LeftPosition , setLeftPosition] = useState(0);



  const calculateWidth = () => {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    setWidthPixels(vw * 0.14); // 20vw
    setLimitPixels(vw * 0.24)
    // setTransitionBlock(vw*0.225)
    setTransitionBlock(vw*0.276)


    if (IsLogin){
      setLeftPosition(vw*0.5)
    }
    else{
      setLeftPosition(vw*0.225)
    }
    
  };

  useEffect(() => {
    calculateWidth();
    window.addEventListener('resize', calculateWidth);


    // Optional: Use a MutationObserver to detect changes in zoom level
    const observer = new MutationObserver(calculateWidth);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

    return () => {
      window.removeEventListener('resize', calculateWidth);
      observer.disconnect();
    };
  }, []);



  return (
    <div id='SessionContainer'  className={`${LoadingFetch ? "Disabled":""}`}>
      <div id='MotionContainer' className={`${LoadingFetch ? "Disabled":""}`}>
        <motion.div 
        className='Motiondiv'
        animate={{scale:1.2, x:WidthPixels}} 
        whileDrag={{scale:1.5}}
        whileHover={{scale: 1.3, cursor:"pointer"}} 
        drag="x" 
        dragConstraints={{left:-LimitPixels , right:LimitPixels}}>
          
          <div id='LottieContainer1' style={{ width: '34px', height: '40px' }}>
            <Lottie animationData={Bird} loop autoplay />

          </div>      
        </motion.div>

        <motion.div 
        className='Motiondiv'
        animate={{scale:1.2, x:-WidthPixels}} 

        whileDrag={{scale:1.5}}
        whileHover={{scale: 1.3, cursor:"pointer"}} 
        drag="x" 
        dragConstraints={{left:-LimitPixels , right:LimitPixels}}>
          
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
          className={`${IsLogin ? "InLogin":""}`}
          >
          
          
            <div className='ComboTextGoogle'>
              <h1 id='LoginText'>Sign In</h1>
              <button className='GoogleButton' onClick={handleLogin} aria-label='Aria Google'><img src={GoogleIcon} id='FaGoogle'/></button>
            </div>
            
            <form onSubmit={handleLoginForm} id='FormularyContainer'>

              <div id='UserLab-Cont'>
                  
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
                    transition={{ duration: 0.2 }}
                  />
              </div>
              
              <div>

              
                <div id='PassLab-Cont' >

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
                      transition={{ duration: 0.2 }}
                    />

                </div>
              </div>
              <motion.button 
              whileHover={{ scale: 1.05 , backgroundColor: (LoadingFetch ? "#cccccc":"#0056b3" )}}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              whileFocus={{scale:1.04, backgroundColor: (LoadingFetch ? "#cccccc":"#0056b3" )}}
              whileTap={{scale:1.12, transition:{duration:0.001,  type: "spring", stiffness: 200, damping: 8  }}}
              
              className={`SubmitFormButtom  ${LoadingFetch ? "Disabled": ""}`}  
              type='submit' 
              aria-label='Aria Login' 
              title='LOGIN'
              
              >
    
                {LoadingFetch ? "LOGIN" : "LOGIN"}
                          
              </motion.button>
              


            </form>
          </motion.div>
      


          <motion.div id='RegisterContainer'
          className={`${IsLogin ? "": "InRegister"}`}
          initial = {{opacity:0}}
          animate={{opacity: IsLogin ? 0 : 1 }}
          transition={{duration:0.3}}
        >
          <div className='ComboTextGoogle'>
            <h1 id="RegisterText">Register</h1>
            <button className='GoogleButton' onClick={handleLogin} aria-label='Aria Google'><img src={GoogleIcon} id='FaGoogle'/></button>

          </div>
          </motion.div>

          
          

 

          <motion.div id="Blocker"
            animate={{x:(IsLogin ? 0:-TransitionBlock), borderTopLeftRadius:(IsLogin ? 0:10), borderBottomLeftRadius:(IsLogin ? 0:10), borderTopRightRadius:(IsLogin ? 10:0), borderBottomRightRadius:(IsLogin ? 10:0)}}
            transition={{
              type: "spring",
              duration:0.4,
              stiffness: 450,
              damping: 22,
            }}
            style={{left:LeftPosition}}
          >


            <div id='ContainerInactive'>
               LOL
               <button onClick={ToggleIsLogin}>LOGIN</button>
            </div>

            
          </motion.div>

    </div>
    

      


      
        
    </div>
  );
};

export default Login;

// Profile.js