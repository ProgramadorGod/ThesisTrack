import React from 'react'
import '../App.css';
import Login from '../components/LoginComponents/login';
import Loadingrectangle from '../components/loading/loading';
import Files from '../components/files/files';

import { useAppContext } from '../AppContext';

const Home = () => {
  const { isloading, isLogged, PortToUse} = useAppContext();

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
