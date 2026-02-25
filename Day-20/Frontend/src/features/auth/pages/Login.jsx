
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import '../styles/form.scss'
import { useAuth } from '../hooks/useAuth.jsx'

const Login = () => {


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { handleLogin, loading } = useAuth()

    const navigate = useNavigate()


    async function handleSubmit(e) {
        e.preventDefault()

        await handleLogin(username, password)

        navigate('/')

    }
    if (loading) {
        return (<main>
            <h1>Loading...</h1>
        </main>
        )
    }


    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>

                    <input
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                        type="text"
                        name='username'
                        placeholder='Enter username' />

                    <input
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        type="text"
                        name='password'
                        placeholder='Enter password' />
                    <button type='submit' >Login</button>
                </form>
                <p>Don't have an account? <Link className="toggleAuthForm" to="/register">Register</Link></p>
            </div>
        </main>
    )
}

export default Login