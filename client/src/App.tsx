import './App.css'

import { Login } from './pages/auth/Login'
import { Signup } from './pages/auth/Signup'
import { BlogPost } from './pages/blog/Blog'
import { Feed } from './pages/Feed'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { BrowserRouter, Routes, Route } from 'react-router'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/blog/:blogId' element={<BlogPost />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
