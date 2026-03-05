import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FaceExpression from './features/expression/components/FaceExpression'
import './App.css'



function App() {
  const [count, setCount] = useState(0)

  return (
    
    <>
      <FaceExpression />
    </>
   
  )
}

export default App
