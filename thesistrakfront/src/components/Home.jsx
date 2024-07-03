import React from 'react'
import '../App.css';
import Login from '../components/login';
import Profile from './profile/profile';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Loadingrectangle from '../components/loading/loading';
import Files from '../components/files/files';
import Sidebar from '../components/SideBar/Sidebar';
import Sidemenu from '../components/SideMenu/Sidemenu';
import Echart from './Stadistics/Echart';
import { useAppContext } from '../AppContext';

const Home = () => {
  const { isloading, setisloading, isLogged, setisLogged, profile, setProfile, name, setname, userid, setUserid , isActive, setisActive, PortToUse} = useAppContext();

  // console.log(Documents)



  return (
    <div>


        <div id='BasicGroup'>
            {/* <Sidebar/> */}

            {/* {isloading ? (<Loadingrectangle/> ): (isLogged ? <Profile /> : <Login />)} */}
            {isloading ? (<Loadingrectangle/> ): (isLogged ? <Files PortToUse={PortToUse}/> : <Login/>)}
        </div>

    </div>
  )
}

export default Home
