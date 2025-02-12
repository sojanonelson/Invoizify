import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MdEmail, MdLock } from 'react-icons/md'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import Lottie from 'react-lottie'
import animationData from '../assets/animations/delivery.json'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.png'
import { loginUser } from '../services/authService'

const Login = () => {
  console.log('Heloooooooooooo')
  const [email, setEmail] = useState('adminsojan@gmail.com')
  const [password, setPassword] = useState('sojansojan')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate()

  const validateEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return emailPattern.test(email)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setEmailError('')
    setPasswordError('')

    if (!email) {
      setEmailError('Email is required')
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email address')
    }

    if (!password) {
      setPasswordError('Password is required')
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
    }

    if (emailError || passwordError || !email || !password) {
      setLoading(false)
      return
    }

    try {
      const response = await loginUser({ email, password })
      if (response?.userdata?.role) {
        localStorage.setItem('user', JSON.stringify(response))
        navigate('/user/dashboard')
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex"
      >
        <motion.div className="w-full md:w-1/2 p-12 space-y-8 relative">
          <motion.img src={Logo} alt="Logo" className="w-1/6 mb-8" />
          <motion.h1 className="text-4xl font-bold text-gray-900">Welcome Back!</motion.h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-6">
              <motion.div>
                <div className="relative">
                  <MdEmail className="absolute top-4 left-4 text-gray-400" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="Email Address"
                  />
                </div>
                {emailError && (
                  <motion.span className="text-red-500 text-sm">{emailError}</motion.span>
                )}
              </motion.div>

              <motion.div>
                <div className="relative">
                  <MdLock className="absolute top-4 left-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                </div>
                {passwordError && (
                  <motion.span className="text-red-500 text-sm">{passwordError}</motion.span>
                )}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </motion.button>
            </div>
            {error && <motion.span className="text-red-500 text-sm">{error}</motion.span>}
          </form>

          <motion.div className="text-center text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Create Account
            </button>
          </motion.div>
        </motion.div>

        <div className="hidden md:block w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 p-12 h-full flex flex-col justify-center text-white"
          >
            <Lottie
              options={{
                animationData: animationData,
                loop: true,
                autoplay: true
              }}
              height={400}
              width="100%"
            />
            <h2 className="text-4xl font-bold mb-6">Streamline Your Workflow</h2>
            <ul className="space-y-4">
              {['Instant Invoice Generation', 'Real-time Analytics', 'Secure Cloud Storage'].map(
                (feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span>{feature}</span>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
