// Login.js
import React from 'react';

const Login = () => {
  const handleLogin = () => {
    window.location.href = 'http://127.0.0.1:8000/accounts/google/login/?next=/';
  };

  return (
    <div id='LoginContainer'>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login with Google</button>
      
    </div>
  );
};

export default Login;

// Profile.js