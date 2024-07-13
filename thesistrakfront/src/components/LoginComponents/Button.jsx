import React from 'react'
import {motion} from "framer-motion";

const Button = ({IsLogin,Loading, text1,text2}) => {
  return (
    <div id='ButtonContainer'>

    <motion.button 
        disabled={!IsLogin}
        whileHover={{ scale: 1.05 , backgroundColor: ( Loading ? "#1c2d2e":"#024791" )}}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        whileInView={{backgroundColor:(Loading ? "#1c2d2e":"#0056b3")}}
        whileFocus={{scale:1.04, backgroundColor: (Loading ? "#1c2d2e":"#024791" )}}
        whileTap={{scale:1.12, transition:{duration:0.001,  type: "spring", stiffness: 200, damping: 8 }}}
        
        className={`SubmitFormButtom  ${Loading ? "Disabled": ""}`}  
        type='submit' 
        aria-label='Aria Login' 
        title='LOGIN'
        >
        <div id='ButtonText'>
            {Loading ? text1 : text2}

        </div>
                    
    </motion.button>
    </div>
  )
}

export default Button
