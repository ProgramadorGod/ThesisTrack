import React from 'react'
import '../App.css';
import Login from '../components/LoginComponents/login';
import Loadingrectangle from '../components/loading/loading';
import Files from '../components/files/files';

import { useAppContext } from '../AppContext';
import Sidemenu2 from './Sidemenu2/Sidemenu2';

const Home = () => {
  const { isloading, isLogged, PortToUse, isActive} = useAppContext();

  // console.log(Documents)



  return (
    <div>


        <div id='BasicGroup'>
            {/* <Sidebar/> */}
            <Sidemenu2 isActive={isActive}></Sidemenu2>

            {/* {isloading ? (<Loadingrectangle/> ): (isLogged ? <Profile /> : <Login />)} */}
            {isloading ? (<Loadingrectangle/> ): (isLogged ? <Files PortToUse={PortToUse}/> : <Login/>)}
        </div>

    </div>
  )
}

export default Home
