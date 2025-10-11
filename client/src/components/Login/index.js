import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [submitError, setSubmitError] = useState({ isError: false, errorMsg: '' })


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (response.ok) {
        Cookies.set('jwt_token', data.jwtToken, { expires: 1 })
        navigate('/', { replace: true })
      }
      else {
        setSubmitError({ isError: true, errorMsg: data.errorMsg })
      }
    }
    catch (error) {
      console.log('Error Submitting Form Data:', error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#d6d6d6] font-['PT_Serif',serif]">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.1)] p-5 w-full max-w-[500px]"
      >
        <h2 className="text-[30px] font-bold font-['Outfit',sans-serif] text-center mt-5">
          Login
        </h2>

        {/* Username Field */}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">
            Username
          </label>
          <div className="flex items-center w-full box-border border-b-2 border-gainsboro p-1.5">
            <FaUser />
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Your Username"
              required
              className="ml-2 w-full border-none outline-none font-['PT_Serif',serif]"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <div className="flex items-center w-full box-border border-b-2 border-gainsboro p-1.5">
            <RiLockPasswordFill />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              required
              className="ml-2 w-full border-none outline-none font-['PT_Serif',serif]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gray-500 text-white py-2 px-4 rounded cursor-pointer w-full text-[18px] hover:bg-[#80809f]"
        >
          Login
        </button>

        {/* Navigation Text */}
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 underline">
            Sign Up
          </Link>
        </p>

        {/* Error Message */}
        {submitError.isError && (
          <p className="text-center text-red-600 mt-2">{submitError.errorMsg}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
