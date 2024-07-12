import React, { useState } from 'react'
import {motion} from "framer-motion"
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from '../../AppContext';
import Button from './Button';


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
                password2:Password1,
                },{
                headers:{
                  'X-CSRFToken':getCsrfToken()
                }    
            })

            Swal.fire({
                icon:"success",
                title:"Registration Successful",
                text:"You can log in now",
                timer:2000,
                timerProgressBar:true,
            })

                try{ 
                    const response2 = await axios.post(PortToUse+'api/login2/',{
                        username:Username,
                        password:Password1,
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
                    alert(e)
                }
            
        }catch(error){
            console.log("Register failed")
            if (error.response) {
                const errorMessages = Object.entries(error.response.data).map(
                ([field, messages]) => `${field}: ${messages.join(', ')}`
                ).join('\n');

                Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: errorMessages,
                });
            } else {
                Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: 'An unexpected error occurred. Please try again later.',
                });
            }
            
        }



        setLoading(false)


    }

    
  



    return (
        <motion.div id='RegisterContainer'

        className={`${IsLogin ? "": "InRegister"}`}
        initial = {{opacity:0}}
        animate={{
            opacity: IsLogin ? 0 : 1 , 
            x:IsLogin ? -100:0, 
            zIndex:IsLogin? -1:0}}
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
                <div id='Inputs'>
                    <input 
                    id='Username-Input'
                    disabled={IsLogin}
                    type='text'
                    placeholder='Username'
                    value={Username}
                    onChange={(e)=> setUsername(e.target.value)}
                    required
                    />
                    <input 
                    disabled={IsLogin}
                    id='Email-Input'
                    placeholder='Gmail'
                    type='email'
                    className='Email-input'
                    value={Email}
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                    />
                    <input 
                    disabled={IsLogin}
                    id='Password-Input'
                    type='Password'
                    placeholder='Password'
                    value={Password1}
                    onChange={(e)=> setPassword1(e.target.value)}
                    required
                    />
                    
                    
                    
                </div>

                <div>
                <Button IsLogin={!IsLogin}
                Loading={Loading}
                text1={"SIGN UP"}
                text2={"SIGN UP"}
                type='submit'></Button> 
                </div>

            </form>

        

        </motion.div>
    )
}

export default Register
