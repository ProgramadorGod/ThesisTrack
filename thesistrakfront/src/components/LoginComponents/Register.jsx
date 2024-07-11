import React, { useState } from 'react'
import {motion} from "framer-motion"
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from '../../AppContext';


const Register = ({IsLogin, handleLogin, GoogleIcon, getCsrfToken, fetchProfile}) => {
    const [Username, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [Password1, setPassword1] = useState('');
    const [Password2, setPassword2] = useState('');
    const [Loading, setLoading]  = useState(false);

    const {PortToUse} = useAppContext()

    const handleRegisterForm = async(e) =>{
        e.preventDefault();
        if (Loading) return;

        setLoading(true)
        try{
            const response = await axios.post(PortToUse+'api/auth/registration/',{
                username:Username,
                email:Email,
                password1:Password1,
                password2:Password2,
            },{
                headers:{
                  'X-CSRFToken':getCsrfToken()
                }    
        })
            if (response.status === 200){
                try{
                    const response2 = await axios.post(PortToUse+'api/accounts',{
                        Username,
                        Password1,
                    },{
                        headers:{
                            'X-CSRFToken':getCsrfToken()
                        }
                    })
                    
                    if (response2.status === 200){
                        console.log("worked")
                        fetchProfile()
                    }
    
    
                }catch(e){
    
                }
            }
        }catch(e){
            console.log("Register failed")
            
        }



        setLoading(false)


    }

    
  



    return (
        <motion.div id='RegisterContainer'

        className={`${IsLogin ? "": "InRegister"}`}
        initial = {{opacity:0}}
        animate={{opacity: IsLogin ? 0 : 1 , x:IsLogin ? -100:0, zIndex:IsLogin? -1:0}}
        transition={{duration:0.3}}
        disabled={IsLogin}
    >
        <div className='ComboTextGoogle' id='ComboRegister'>
        <h1 id="RegisterText">Register</h1>
        <button
        className='GoogleButton' 
        onClick={handleLogin}
        disabled={IsLogin}  
        aria-label='Aria Google'><img src={GoogleIcon} id='FaGoogle'/></button>
        </div>


        <form onSubmit={handleRegisterForm} id='RegisterFormContainer'>
            <div id='UserLab-Cont'>
                <input 
                id='Username-Input'
                value={Username}
                onChange={(e)=> setUsername(e.target.value)}
                />
                <input 
                id='Username-Input'
                type='email'
                className='Email-input'
                value={Email}
                onChange={(e)=> setEmail(e.target.value)}
                />
                <input 
                id='Password-Input'
                type='Password'
                value={Password1}
                onChange={(e)=> setPassword1(e.target.value)}
                />
                <input 
                id='Password-Input'
                value={Password2}
                type='Password'
                onChange={(e)=> setPassword2(e.target.value)}
                />

                
            </div>

            <div>
              <button type='submit'>Sign In</button> 
            </div>

        </form>

        

        </motion.div>
    )
}

export default Register
