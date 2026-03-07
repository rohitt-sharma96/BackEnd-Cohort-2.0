import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { register, login, getMe, logout } from "../services/auth.api";


export const useAuth = () => {
    const context = useContext(AuthContext);
    const { loading, setLoading, user, setUser } = context

    async function handleRegister({ username, email, password }) {
        setLoading(true)
        const data = await register({ username, email, password })
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogin({ email, username, password }) {
        setLoading(true)

        const data = await login({ email, username, password })
        setUser(data.user)
        setLoading(false)
    }

    async function handleGetMe() {
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogout() {
        setLoading(true)
        const data = await logout()
        setUser(null)
        setLoading(false)
    }

    useEffect(()=>{
        handleGetMe()
    },[])
    
    return (
        { user, loading, handleRegister, handleLogin, handleGetMe, handleLogout }
    )

}
