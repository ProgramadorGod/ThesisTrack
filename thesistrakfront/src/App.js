import './App.css';
import Login from './components/LoginComponents/login';
import Profile from './components/profile/profile';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Loadingrectangle from './components/loading/loading';
import Sidemenu from './components/SideMenu/Sidemenu';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Echart from './components/Stadistics/Echart';
import Myfiles from './components/myfiles/myfiles';
import Cookies from 'js-cookie';



// const PortToUse = "http://192.168.0.17:8000/";


import { AppProvider, useAppContext } from './AppContext';
import Sidemenu2 from './components/Sidemenu2/Sidemenu2';

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}





function AppContent() {

  const LocalData = (itemstosave) =>{
    localStorage.setItem("profiledata", JSON.stringify(itemstosave))
  }

  const { isloading, setisloading, isLogged, setisLogged, profile, setProfile, name, setname, userid, setUserid , isActive, setisActive, PortToUse, fetchProfile} = useAppContext();

  

  const token = localStorage.getItem("token");


  const ChangeActive = () =>{
    setisActive(prevActiveStatus =>( prevActiveStatus === "" ? "Active" : ""));
  } 

  

  useEffect(()=>{



    fetchProfile();

  },[])






  


  return (
    <div className="App">
      <Router>

        

        <div id="body">

        {isloading ? (<Loadingrectangle/> ): (isLogged ? <Sidemenu isActive={isActive} /> : "")}


        <header>

            <Navbar ChangeActive={ChangeActive} isActive={isActive}/>
            
        </header>


        <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path="/Profile" element={isloading ? (<Loadingrectangle/> ) : (isLogged ? <Profile profile={profile} name={name} /> : <Login/>)}/>
          {/* <Route path='/Files' element={isloading ? (<Loadingrectangle/>):(<DocumentUpload userid={userid}/>)}/> */}
          <Route path='/Files' element={isloading ?(<Loadingrectangle/>):(<Myfiles userid={userid}/>)} />
          <Route path='/Stadistics' element={<Echart/>} />
          <Route path='/Settings' element={isloading ?(<Loadingrectangle/>):(<Myfiles userid={userid}/>)} />
          <Route path='/IA' element={isloading ?(<Loadingrectangle/>):(<Myfiles userid={userid}/>)} />                    
          <Route path='/Help' element={isloading ?(<Loadingrectangle/>):(<Myfiles userid={userid}/>)} />                    

        {/* Añadir más rutas aquí según sea necesario */}
        </Routes>          


        </div>



      </Router>

      {/* <footer id='footer'>lol</footer> */}

      
    </div>
  );
}

export default App;
