import React, { useState } from 'react';
import Logo from "../assets/logo.png";
import { MdEmail, MdLock } from 'react-icons/md';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { TailSpin } from 'react-loader-spinner';
import { loginUser } from '../services/authService';
import { saveLoginResponse } from '../services/localstorageService';
import Lottie from 'react-lottie';
import animationData from '../assets/animations/delivery.json'; // Replace with your Lottie JSON file path

const Login = () => {
  const [email, setEmail] = useState('adminsojan@gmail.com');
  const [password, setPassword] = useState('sojansojan');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const credentials = { email, password };
      const response = await loginUser(credentials);

      if (response.userdata.role) {
        saveLoginResponse(response);
        window.location.hash = '/user/dashboard';
      } else {
        setError("Invalid password or email")
        throw new Error('Invalid credentials.');
      }
    } catch (err) {
      
      setError("Invalid password or email");
    } finally {
      setLoading(false);
    }
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="flex flex-row h-screen bg-gray-100">
     {/* Left Section: Login */}
<div className="w-2/5 h-full flex flex-col pd-10 items-center justify-between bg-white shadow-lg">
  <div className="w-full max-w-md p-6 pt-[40%]">
    <div className="text-center mb-6">
      <img src={Logo} alt="App Logo" className="w-24 mx-auto" />
      <h1 className="text-2xl font-bold text-indigo-600 mt-4">Welcome Back!</h1>
      <p className="text-sm text-gray-600">Log in to access your account</p>
    </div>
    {error && (
      <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm mb-4">
        {error}
      </div>
    )}
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <div className="flex items-center border rounded-md mt-1 focus-within:ring-2 focus-within:ring-indigo-400">
          <MdEmail className="text-gray-400 ml-2" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="flex items-center border rounded-md mt-1 focus-within:ring-2 focus-within:ring-indigo-400 relative">
          <MdLock className="text-gray-400 ml-2" />
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 focus:outline-none"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-gray-500"
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 text-white flex items-center justify-center ${
          loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {loading ? <TailSpin height="24" width="24" color="#ffffff" /> : 'Log In'}
      </button>
    </form>
    <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => (window.location.hash = '/register')}
            className="text-indigo-600 hover:underline"
          >
            Create an Account
          </button>
        </p>
  </div>
  
  {/* Footer Section */}
  <footer className="w-full text-center py-4 bg-gray-100 border-t text-sm text-gray-500">
    &copy; {new Date().getFullYear()} Reserved by Techaso Solutions
  </footer>
</div>

      {/* Right Section */}
      <div className="w-3/5 h-full bg-gradient-to-r select-none from-indigo-700 to-indigo-900 text-white flex items-center justify-center relative">
        <div className="p-8 text-left">
          <h1 className="text-5xl font-bold mb-6">Simplify Your Invoicing</h1>
          <p className="text-lg mb-6">
            Our invoice billing software helps you generate invoices, track payments, and manage clients effortlessly.
            Discover how it can transform your business.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="h-2 w-2 bg-white rounded-full mr-2"></span> Easy Invoice Generation
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-white rounded-full mr-2"></span> Real-Time Payment Tracking
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-white rounded-full mr-2"></span> Customizable Templates
            </li>
          </ul>
        </div>
        <div className="absolute bottom-0 right-4 w-[50%]">
          <Lottie options={lottieOptions} />
        </div>
      </div>
    </div>
  );
};

export default Login;
