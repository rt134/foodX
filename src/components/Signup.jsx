import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { BASE_URL } from '../constants'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(BASE_URL+'signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        toast.success('Signed Up Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate('/signin');

      } else {
        toast.error('Signup Failed, Please retry', {
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
    <>
      <div className="flex justify-center items-center h-screen bg-pink-100">
        <div className="bg-white shadow-md p-4 rounded h-[65%] w-[35%]">
          <h2 className="text-2xl mb-4 text-center">Sign Up to foodX</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  type="text"
                  autoComplete="name"
                  onChange={handleChange}
                  value={formData.name}
                  className="w-full"
                />
              </div>
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
                  id="contact"
                  name="contact"
                  label="Contact"
                  type="text"
                  autoComplete="contact"
                  onChange={handleChange}
                  value={formData.contact}
                  className="w-full"
                />
              </div>
              <div className="mb-4">
              <TextField
                id="address"
                name="address"
                label="Address"
                type="text"
                autoComplete="address"
                onChange={handleChange}
                value={formData.address}
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
            <Link to='/signin'>
              <h3 className='text-sm mb-4 text-center'>Already registered? Sign In</h3>
            </Link>
          </div>
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
    </>
  );
}

export default Signup;
