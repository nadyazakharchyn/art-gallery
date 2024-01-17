import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
      .post(`http://localhost:5555/users/login`,
      {
        email, password
      },
      { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        console.log(data);
        if (data) {
          localStorage.setItem('user', data)
          
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          console.log('Hi. I am your error')
          }
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form_container">
      <h2 className='text-3xl my-8'>Login to your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className='my-4'>
          
          <label className='text-xl mr-4 text-gray-500' htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500' htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' type="submit">Submit</button>
        <span>
          Don't have an account? <Link to={"/users/register"}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;