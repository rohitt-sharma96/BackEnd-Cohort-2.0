import "../style/login.scss"
import FormGroup from "../components/FormGroup"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../hook/useAuth"
import { useState } from "react"


const Login = () => {
    const { loading, handleLogin } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

   const navigate = useNavigate() 
    

    async function handleSubmit(e) {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate("/")
    }

    return (
        <main className="login-page">
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <FormGroup
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        label="Email"
                        placeholder="Enter email" />

                    <FormGroup
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        label="Password"
                        placeholder="Enter password" />
                    <button className='button' type='submit'>Login</button>
                </form>
                <p>Don't have an account ? <Link to="/register" >Register Here</Link></p>
            </div>
        </main>
    )
}

export default Login