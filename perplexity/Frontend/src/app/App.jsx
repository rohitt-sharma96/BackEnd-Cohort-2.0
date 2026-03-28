import { RouterProvider } from "react-router"
import { router } from "./app.routes"
import { useAuth } from "../features/auth/hooks/useAuth"
import { useEffect } from "react"

function App() {
    const auth = useAuth()

    useEffect(()=>{
      auth.handleGetME()
    },[])
  return (
    <>
    <RouterProvider router={router}>

    </RouterProvider>
    </>
  )
  
}

export default App
