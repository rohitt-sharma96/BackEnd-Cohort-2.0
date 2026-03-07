import {Router, RouterProvider} from 'react-router'
import {router} from './app.routes'
import "./features/shared/style/global.scss"
import { useContext } from 'react'
import { AuthProvider } from './features/auth/auth.context'

function App() {

  const context = useContext(AuthProvider)

  return (
    
    <>
  <AuthProvider>
   <RouterProvider router={router} />

  </AuthProvider>

    </>
   
  )
}

export default App
