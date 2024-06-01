
import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // const token = localStorage.getItem('authToken');
      const response = await axios.get('http://127.0.0.1:8000/profile/', {
        withCredentials: true,  // Importante para enviar cookies de sesión

      });
      setProfile(response.data);
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {profile ? (
        <div>
          <p>Email: {profile.email}</p>
          <p>Username: {profile.username}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <a href='http://127.0.0.1:8000/logout/'> logout</a>
      <div>
        <h4>Change username:</h4>
        <form>
        
        <input></input>
        <button type='submit'>a</button>
        </form>
        

      </div>
    </div>
  );
};

export default Profile;
