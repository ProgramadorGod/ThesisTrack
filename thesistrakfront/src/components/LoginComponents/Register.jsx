import React, { useState } from 'react'
import {motion} from "framer-motion"
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from '../../AppContext';


const Register = ({IsLogin, handleLogin, GoogleIcon}) => {
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

        const response = await axios.post(PortToUse+'api/auth/registration')


    }




    return (
        <motion.div id='RegisterContainer'

        className={`${IsLogin ? "": "InRegister"}`}
        initial = {{opacity:0}}
        animate={{opacity: IsLogin ? 0 : 1 , x:IsLogin ? -100:0, zIndex:IsLogin? -1:0}}
        transition={{duration:0.3}}
        disabled={IsLogin}
    >
        <div className='ComboTextGoogle' style={{userSelect: IsLogin ? "none" : "all"}}>
        <h1 id="RegisterText">Register</h1>
        <button 
        className='GoogleButton' 
        onClick={handleLogin} 
        disabled={IsLogin}
        aria-label='Aria Google'><img src={GoogleIcon} id='FaGoogle'/></button>
        </div>

        

        </motion.div>
    )
}

export default Register
