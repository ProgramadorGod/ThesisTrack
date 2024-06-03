import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Profile from './components/profile';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Loadingrectangle from './components/loading/loading';
import Files from './components/files/files';
import Sidebar from './components/SideBar/Sidebar';
import Sidemenu from './components/SideMenu/Sidemenu';

function App() {
  const [isLogged, setisLogged] = useState(false);
  const [isloading, setisloading] = useState(true);
  const [isActive, setisActive] = useState("");
  const ChangeActive = () =>{
    setisActive(prevActiveStatus =>( prevActiveStatus === "" ? "Active" : ""));
  } 


  useEffect(()=>{
    const fetchProfile = async () => {
      try{
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://127.0.0.1:8000/profile/',{
          withCredentials: true,  // Importante para enviar cookies de sesión



        });
        if (response.status === 200){
          setisLogged(true);
          console.log("Logged")

        }
        else{
          console.log("not logged")
        }

      
      
      }catch(error){
        console.error('Error fetching profile:', error);
        setisLogged(false);
        console.log("Not Logged")

      }finally{
        setisloading(false)

      }
      
    };
    fetchProfile();

  },[])



  return (
    <div className="App">



      <div id="body">
        <header>
          <Sidemenu isActive={isActive} />
          <Navbar ChangeActive={ChangeActive}/>
          
        </header>


        <div id='BasicGroup'>
          {/* <Sidebar/> */}

          {/* {isloading ? (<Loadingrectangle/> ): (isLogged ? <Profile /> : <Login />)} */}
          {isloading ? (<Loadingrectangle/> ): (isLogged ? <Files /> : <Login />)}

        </div>
        
        
        
        


      </div>
      

    </div>
  );
}

export default App;
