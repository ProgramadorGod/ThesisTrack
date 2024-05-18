// Auth.js
import axios from 'axios';

export const login = async (email, password) => {
  const response = await axios.post('http://localhost:8000/api/auth/login/', {
    email,
    password,
  });

  localStorage.setItem('authToken', response.data.access_token);
};

export const logout = () => {
  localStorage.removeItem('authToken');
};
