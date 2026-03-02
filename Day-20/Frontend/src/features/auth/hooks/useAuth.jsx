import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe } from '../services/auth.api.js'


export function useAuth() {
    
    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context

    //Yaha pe user ka data aa rha hai LoginPage se
    //handleLogin ko call krke arugment paas kr rhe hai
    const handleLogin = async (username,password) => {

        setLoading(true)

        const response = await login(username, password)

        setUser(response.user)

        setLoading(false)

    }
    //Yaha pe user ka data aa rha hai Register page se
    // handleRegister k call krke data argument paas kr rhe h
    const handleRegister = async (username, email, password) => {

        setLoading(true)

        const response = await register(username, email, password)

        setUser(response.user)

        setLoading(false)
    }



    return { user, loading, handleLogin, handleRegister }

}