import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { BASE_URL } from '../constants'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../utils/UserContext';

function Signin() {

  const navigate = useNavigate()
  const { login } = useUserContext();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(BASE_URL+'signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        const userData = {
          "token" : data.token,
          "email" : data.email,
          "name" : data.name
        }
        login(userData)
        toast.success('Signed In Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate('/');

      } else {
        toast.error('SignIn Failed, Please retry', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-100">
      <div className="bg-white shadow-md p-4 rounded h-[35%] w-[35%]">
      <h2 className="text-2xl mb-4 text-center">Sign In to foodX</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              id="email"
              name="email"
              label="Email"
              type="text"
              autoComplete="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <TextField
              id="password"
              name="password"
              label="Password"
              type="text"
              autoComplete="password"
              onChange={handleChange}
              value={formData.password}
              className="w-full"
            />
          </div>
          <button className="w-full p-2 hover:bg-purple-900 text-white bg-purple-700 rounded-lg" type="submit" > Sign in</button>
        </form>
        <Link to='/signup'>
          <h3 className='text-sm mb-4 text-center'>Not registered? Sign Up</h3>
        </Link>
      </div>
      <ToastContainer position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />
    </div>
  );
}

export default Signin;
