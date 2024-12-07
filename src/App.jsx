import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* Header */}
    <Outlet/>
    {/* Footer */}
    <ToastContainer/>
    </>
  )
}

export default App
