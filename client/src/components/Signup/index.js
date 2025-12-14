import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";

const SignUp = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [register, setRegister] = useState({ isSubmit: false, message: '', isSuccess: false })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json()
        setRegister({ isSubmit: true, message: data.message, isSuccess: data.isRegisteredSuccessful })
        if (data.isRegisteredSuccessful) {
          setTimeout(() => {
            navigate('/login', { replace: true })
          }, 2000);
        }
      } else {
        setRegister({ isSubmit: true, message: response.statusText || 'Registration failed', isSuccess: false })
      }
    } catch (error) {
      setRegister({ isSubmit: true, message: error.message || 'Registration failed', isSuccess: false })
    }


  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#d6d6d6] font-['PT_Serif',serif]">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.1)] p-5 w-full max-w-[500px]"
      >
        <h2 className="text-[30px] font-bold font-['Outfit',sans-serif] text-center mt-5">
          Sign Up
        </h2>

        {/* Username */}
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

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <div className="flex items-center w-full box-border border-b-2 border-gainsboro p-1.5">
            <IoMdMail />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              required
              className="ml-2 w-full border-none outline-none font-['PT_Serif',serif]"
            />
          </div>
        </div>

        {/* Password */}
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
          Sign Up
        </button>

        {/* Navigate Text */}
        <p className="text-center mt-3">
          Have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>

        {/* Register Message */}
        {register.isSubmit && (
          <p
            className={`text-center ${register.isSuccess ? "text-green-600" : "text-red-600"
              }`}
          >
            * {register.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default SignUp;
