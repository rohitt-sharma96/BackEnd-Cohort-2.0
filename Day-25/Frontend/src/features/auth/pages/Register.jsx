import FormGroup from "../components/FormGroup"
import "../style/register.scss"
import { useState } from "react"
import { useAuth } from "../hook/useAuth"
import { useNavigate } from "react-router"

import { Link } from "react-router"

const Register = () => {
  const navigate = useNavigate()
  
  const {handleRegister,loading} = useAuth()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  async function handleSubmit(e){
    e.preventDefault()

    await handleRegister({username,email,password})
    navigate("/")
  }
  
  
  return (
    <main className="register-page">
        <div className="form-container">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
          <FormGroup 
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
            label="Username"
            placeholder="Enter Username" />
          <FormGroup
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            label="Email"
            placeholder="Enter Email" />
          <FormGroup
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            label="Password"
            placeholder="Enter Password" />
          <button className="button" type="submit" >Register</button>
          </form>
          <p>Already have an account ? <Link to="/login">Login Here</Link></p>
        </div>
    </main>
  )
}

export default Register