import React from 'react'
import {BrowserRouter,Route,Routes} from'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import SetAvatar from './pages/setAvatar'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ='/register' element = {< Register />} />
        <Route path='/login' element={ < Login /> } />
        <Route path='/setavatar' element={ < SetAvatar /> } />
      </Routes>
    </BrowserRouter>
  )
}

