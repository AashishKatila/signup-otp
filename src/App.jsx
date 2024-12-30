import { useContext } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Verify from './pages/Verify'
import Dashboard from './pages/Dashboard'
import { OtpContext } from './context/otpContext'

function App() {

  const { otpAvailability } = useContext(OtpContext)

  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      {otpAvailability ? <Route path='/verify-otp' element={<Verify />} /> : <Route path='/signup' element={<Signup />} />}
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/*' element={<Signup />} />
    </Routes>
  )
}

export default App
