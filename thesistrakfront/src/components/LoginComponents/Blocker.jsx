import React from 'react'
import {motion} from "framer-motion"

const Blocker = ({IsLogin, LoadingFetch,ToggleIsLogin}) => {
  return (
          <motion.div id="Blocker"
            
            initial={{opacity:0.4}}
            animate={{opacity:1 , 
              left:IsLogin?"50vw": "22.3vw",
              borderTopLeftRadius:IsLogin?0:10,
              borderBottomLeftRadius:IsLogin?0:10,
              borderTopRightRadius:IsLogin?10:0,
              borderBottomRightRadius:IsLogin?10:0,
              backgroundImage: IsLogin 
              ? "linear-gradient(to right, #010832, #031264)" 
              : "linear-gradient(to left, #010832, #031264)"

            }}
            transition={{
              type:"spring" ,
              duration:0.2
            }}
            style={{left:IsLogin ? "50vw" : "22.3vw" }}
          >

            
            <div id='ContainerInactive' >
            

               LOL
              <motion.button 
              whileHover={{ scale: 1.05 , backgroundColor: (LoadingFetch ? "#cccccc":"#024791" )}}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              whileInView={{backgroundColor:"#0056b3"}}
              whileFocus={{scale:1.04, backgroundColor: (LoadingFetch ? "#cccccc":"#024791" )}}
              whileTap={{scale:1.12, transition:{duration:0.001,  type: "spring", stiffness: 200, damping: 8 }}}
              
              onClick={ToggleIsLogin} 
              className='SubmitFormButtom' >
                {IsLogin ? "Register":"Login" }

              </motion.button>
              

            </div>
            
            
          </motion.div>
  )
}

export default Blocker
