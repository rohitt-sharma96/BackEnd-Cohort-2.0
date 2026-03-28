import { useDispatch } from "react-redux";
import { login, register, getMe } from "../services/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";

export function useAuth() {

    const dispatch = useDispatch()

    async function handleRegister({ email, password, username }) {
        try {
            dispatch(setUser(true))
            const data = await register({ email, password, username })
        }
        catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration failed"))
        }
        finally {
            dispatch(setLoading(false))
        }

    }

    async function handleLogin({ email, password }) {

        try {
            dispatch(setLoading(true))

            const data = await login({ email, password })
            dispatch(setUser(data.user))
        }
        catch (error) {
            setError(error.response?.data?.message || "Login failed")
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetME(){
        try{
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        }
        catch(error){
            dispatch(setError(error.response?.data?.message || "Fetching user data failed"))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    return {handleRegister, handleLogin, handleGetME}
}