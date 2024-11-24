import React, { useState } from 'react';
import Logo from "../assets/logo.png";
import { FaQuestionCircle } from 'react-icons/fa';
import { MdEmail, MdLock } from 'react-icons/md';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { loginUser } from '../services/authService';
import { getRole, saveLoginResponse } from '../services/localstorageService';
// Import spinner component (if using react-loader-spinner)
import { TailSpin } from 'react-loader-spinner';

const Login = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('AdminPass123');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const credentials = { email, password };
    try {
      const response = await loginUser(credentials);
      if (response.role) {
        console.log("Login Done");
        saveLoginResponse(response);
        window.location.hash = '/admin/dashboard';
        console.log("Role", getRole());
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error('Login Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="logo" className="w-28" />
          <h1 className="text-2xl font-bold text-indigo-600">INVOIZIFY</h1>
          <h2 className="text-xl font-semibold text-center text-gray-800">
            Adminstrator login
          </h2>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="flex items-center border rounded-md mt-2 focus-within:ring-2 focus-within:ring-indigo-400">
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

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="flex items-center border rounded-md mt-2 focus-within:ring-2 focus-within:ring-indigo-400 relative">
              <MdLock className="text-gray-400 ml-2" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 focus:outline-none"
                placeholder="Enter your password"
              />
              {/* Toggle Visibility Icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-500 focus:outline-none"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition flex items-center justify-center ${
              loading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            disabled={loading}
          >
            {loading ? (
              <TailSpin
                height="24"
                width="24"
                color="#ffffff"
                ariaLabel="loading"
              />
            ) : (
              'Log In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
