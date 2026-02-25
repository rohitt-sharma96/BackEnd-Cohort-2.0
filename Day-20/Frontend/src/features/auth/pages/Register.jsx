import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { loading, handleRegister } = useAuth()
  const navigate = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault()

    await handleRegister(username, email, password)

    navigate('/')
    if (loading) {
      return (<main>
        <h1>Loading...</h1>
      </main>)
    }
  }


  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
            type="text"
            name='username'
            placeholder='Enter username' />

          <input value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            type="email"
            name='email'
            placeholder='Enter email' />

          <input
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            type="password"
            name='password'
            placeholder='Enter password' />

          <button>Register</button>
        </form>

        <p>Already have an account ? <Link className='toggleAuthForm' to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register