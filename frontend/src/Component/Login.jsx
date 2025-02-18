import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();
  

  const submit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8000/login/', {
      username: username,
      password: password,
    });

    if (response.status === 200) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      alert("Login Successful!")
      navigate('/home'); 
    }
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    setError('Login failed. Please check your credentials.');
  }
};

  return (
    <div className="cont">
      <form className="form" onSubmit={submit}>
        <div className="form-content">
          <h3 className="form-title">Login</h3>
          <div className="box">
            <label>Username</label>
            <input
              className="box"
              placeholder="Enter Username"
              name="username"
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="box">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button">
            <button type="submit" className="b1">
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="text">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};
