import './App.css'

import { Login } from './pages/auth/Login'
import { Signup } from './pages/auth/Signup'
import { VerifyEmail } from './pages/auth/VerifyEmail'
import { BlogPost } from './pages/BlogPost'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

import { BrowserRouter, Routes, Route } from "react-router"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
