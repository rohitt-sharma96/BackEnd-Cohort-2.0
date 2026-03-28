import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)


  const { handleLogin } = useAuth()
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = { email, password }

    await handleLogin(payload)
    navigate("/")

    setEmail('')
    setPassword('')

  }


  if (!loading && user) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>
        <><p className="mt-4 text-center text-gray-300">Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a></p></>
      </div>
    </div>
  )
}

export default Login