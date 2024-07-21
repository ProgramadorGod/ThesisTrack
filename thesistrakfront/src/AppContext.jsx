import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const AppContext =  createContext();


export const AppProvider = ({children}) => {

    const LocalData = (itemstosave) =>{
        localStorage.setItem("profiledata", JSON.stringify(itemstosave))
      }



    const [isLogged, setisLogged] = useState(false);
    const [isloading, setisloading] = useState(true);
    const [isActive, setisActive] = useState("");
    const [profile, setProfile] = useState(null);
    const [name, setname] = useState("");
    const [userid, setUserid] = useState([]);
    const PortToUse = "http://192.168.0.17:8000/";








    const fetchProfile = async () => {
        try{
            // const token = localStorage.getItem('authToken');
            const response = await axios.get(PortToUse + 'api/accounts/',{
                withCredentials: true,  // Importante para enviar cookies de sesión
                
        
                // headers:{
                // Authorization:`Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE5NjQxMTg3LCJpYXQiOjE3MTk2NDA4ODcsImp0aSI6IjFjMDE0YTIxZjNiMTRmMjZhYmFkZWQzZjhmYWZiOGU2IiwidXNlcl9pZCI6MX0.y5hUZPjyxVmy1bDG_NkABBqSgZEEEfKGbA8SN3-AzfI`
                // },
                
        
        
            });

            
        
            if (response.status === 200){
                console.log("Logged")
                LocalData(response.data)
                setisloading(false)
                
            }
            else{
                console.log("not logged")
            }
        
            setUserid(response.data.ID)
            setProfile(response.data);
            // setCarrers(response.data.careers)
            setname(response.data.Username)
            setisLogged(true);

            // handleCloseWindow()
            
            }catch(error){
            console.error('Error fetching profile:', error);
            setisLogged(false);
            console.log("Not Logged")
        
            }finally{
                
                setisloading(false)
            }
            
        };
    

        const [WindowWidth, setWindowWidth] = useState(window.innerWidth)
        const [WindowHeight, setWindowHeight] = useState(window.innerHeight);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        }
        
    
        useEffect(()=>{
            window.addEventListener("resize", handleResize);
            return ()=>window.removeEventListener("resize", handleResize)
        }, []);


    return (
        <AppContext.Provider value={{
            isloading, setisloading, isLogged, setisLogged, profile, setProfile, name, setname, userid, setUserid,
            isActive,setisActive,
            PortToUse,
            fetchProfile, WindowWidth, WindowHeight
            


        }}>
            {children}

        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)
