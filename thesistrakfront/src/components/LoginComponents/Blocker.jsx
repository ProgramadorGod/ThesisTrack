import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"



const Blocker = ({IsLogin, LoadingFetch,ToggleIsLogin}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const getLeftPosition = () => {
      if (windowWidth < 700) {
        return IsLogin ? '63vw' : '7.3vw';
      } else {
        return IsLogin ? '50vw' : '22.3vw';
      }
    };
  
    return (
            <motion.div id="Blocker"
                
                initial={{opacity:0.4}}
                animate={{opacity:1 , 
                left: getLeftPosition(),
                borderTopLeftRadius:IsLogin?0:10,
                borderBottomLeftRadius:IsLogin?0:10,
                borderTopRightRadius:IsLogin?10:0,
                borderBottomRightRadius:IsLogin?10:0,
                backgroundImage: IsLogin 
                ? "linear-gradient(to right, #010832, #17257d)" 
                : "linear-gradient(to left, #010832, #17257d)"

                }}
                transition={{
                type:"spring" ,
                duration:0.2
                }}
                style={{ left: getLeftPosition() }}
                >

                
                <div id='ContainerInactive' >
                    <div id='BlockAllText'>
                        {IsLogin?
                            (
                                <div id='BlockTexts'>
                                <h1 className='MainBlockText'>
                                    Hello, <div style={{textWrap:"nowrap"}}> &nbsp;Friend!</div>
                                </h1>
                                <h4 className='NormalBlockText'>
                                    <div>
                                        Enter your personal details and
                                    </div>
                                    <div>
                                        join to our team
                                    </div>

                                </h4>
                                </div>
                            )
                            :
                            <div  id='BlockTexts'>
                                <h1 className='MainBlockText'>
                                    Welcome <div style={{textWrap:"nowrap"}}> &nbsp;Back!</div>
                                </h1>
                                <h4 className='NormalBlockText'>
                                    <div>
                                        To keep in touch
                                    </div>
                                    <div>
                                        login with your credentials
                                    </div>

                                </h4>

                            </div>
                        
                        }
                    </div>

            
                    <motion.button 
                    id='BlockButton'
                    whileHover={{ scale: 1.07 , backgroundColor: ("#02479100" )}}
                    transition={{ type: "spring", stiffness: 200, damping: 7 }}
                    whileInView={{backgroundColor:"#02479100"}}
                    whileFocus={{scale:1.04, backgroundColor: ("#02479100" )}}
                    whileTap={{scale:1.12, transition:{duration:0.001,  type: "spring", stiffness: 200, damping: 8 }}}
                    
                    onClick={ToggleIsLogin} 
                    
                    className='SubmitFormButtom'>
                        <div id='TextBlockButton'>
                            {IsLogin ? "REGISTER":"LOGIN" }
                        </div>

                    </motion.button>
                

                </div>
                
                
            </motion.div>
    )
}

export default Blocker
