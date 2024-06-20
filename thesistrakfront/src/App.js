import './App.css';
import Login from './components/login';
import Profile from './components/profile/profile';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Loadingrectangle from './components/loading/loading';
import Sidemenu from './components/SideMenu/Sidemenu';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Echart from './components/Stadistics/Echart';
import Myfiles from './components/myfiles/myfiles';


// const PortToUse = "http://127.0.0.1:8000/";
const PortToUse = "http://192.168.0.17:8000/";



function App() {

  const LocalData = (itemstosave) =>{
    localStorage.setItem("profiledata", JSON.stringify(itemstosave))
  }



  const [isLogged, setisLogged] = useState(false);
  const [isloading, setisloading] = useState(true);
  const [isActive, setisActive] = useState("");
  const [profile, setProfile] = useState(null);
  const [name, setname] = useState(null);
  const [carrers, setCarrers] = useState([]);
  const [userid, setUserid] = useState([]);

  const ChangeActive = () =>{
    setisActive(prevActiveStatus =>( prevActiveStatus === "" ? "Active" : ""));
  } 


  useEffect(()=>{
    const fetchProfile = async () => {
      try{
        const token = localStorage.getItem('authToken');
        const response = await axios.get(PortToUse + 'profile/',{
          withCredentials: true,  // Importante para enviar cookies de sesión
        });


        if (response.status === 200){
          setisLogged(true);
          console.log("Logged")
          LocalData(response.data)
        }
        else{
          console.log("not logged")
        }

        setUserid(response.data.id)
        setProfile(response.data);
        setCarrers(response.data.careers)
        setname(response.data.username)
      
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
      <Router>

        

        <div id="body">

        {isloading ? (<Loadingrectangle/> ): (isLogged ? <Sidemenu isActive={isActive} /> : "")}


        <header>

            <Navbar ChangeActive={ChangeActive}/>
            
        </header>


        <Routes>
          <Route path='/' element={<Home isLogged={isLogged} isloading={isloading} PortToUse={PortToUse}/>}/> 
          <Route path="/Profile" element={isloading ? (<Loadingrectangle/> ): (isLogged ? <Profile profile={profile} name={name} carrers={carrers} /> : <Login />)}/>
          {/* <Route path='/Files' element={isloading ? (<Loadingrectangle/>):(<DocumentUpload userid={userid}/>)}/> */}
          <Route path='/Files' element={isloading ?(<Loadingrectangle/>):(<Myfiles userid={userid}/>)} />
          <Route path='/Stadistics' element={<Echart/>} />
          <Route path='/Settings' element={isloading ?(<Loadingrectangle/>):(<Myfiles userid={userid}/>)} />
          <Route path='/IA' element={isloading ?(<Loadingrectangle/>):(<Myfiles userid={userid}/>)} />                    
        {/* Añadir más rutas aquí según sea necesario */}
        </Routes>          


        </div>



      </Router>

      {/* <footer id='footer'>lol</footer> */}
    </div>
  );
}

export default App;
