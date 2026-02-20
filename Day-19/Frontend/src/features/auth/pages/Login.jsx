
import React, { useState } from 'react'
import { Link } from 'react-router'
import '../styles/form.scss'
import axios from 'axios'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        axios.post('http://localhost:3000/api/auth/login', {
            username,
            password
        }, {
            withCredentials: true //set Cookies
        })
            .then((res) => {
                console.log(res.data)
            })
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