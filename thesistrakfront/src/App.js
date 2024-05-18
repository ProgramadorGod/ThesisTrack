import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Profile from './components/profile';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [isLogged, setisLogged] = useState(false);

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
      }
      
    };
    fetchProfile();

  },[])



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React

        </a>
      </header>
      {isLogged ? <Profile /> : <Login />}
      

    </div>
  );
}

export default App;
