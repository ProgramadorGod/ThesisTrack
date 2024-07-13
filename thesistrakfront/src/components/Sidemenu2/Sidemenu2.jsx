
import "./Sidemenu2.css"
import {motion} from "framer-motion"
import { useAppContext } from '../../AppContext'

const Sidemenu2 = ({isActive}) => {
    const {WindowWidth} = useAppContext()

    const GetInitialPosition = () =>{
        if (WindowWidth > 700){
            return isActive ? "10vh" : "23vw"
        }else{
            return isActive ? "0vh" : "10vh"
        }
    }

    return (
        <motion.div 
        animate={{width:GetInitialPosition()}}
        transition={{duration:0.15}}
        id='SideMenu2-Container'

        >
        
        </motion.div>
    )
}

export default Sidemenu2
