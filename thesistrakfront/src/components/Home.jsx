import React from 'react'
import '../App.css';
import Login from '../components/login';
import Profile from '../components/profile';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Loadingrectangle from '../components/loading/loading';
import Files from '../components/files/files';
import Sidebar from '../components/SideBar/Sidebar';
import Sidemenu from '../components/SideMenu/Sidemenu';

const Home = ({isloading,isLogged}) => {
    
  return (
    <div>


        <div id='BasicGroup'>
            {/* <Sidebar/> */}

            {/* {isloading ? (<Loadingrectangle/> ): (isLogged ? <Profile /> : <Login />)} */}
            {isloading ? (<Loadingrectangle/> ): (isLogged ? <Files /> : <Login />)}

        </div>

    </div>
  )
}

export default Home
