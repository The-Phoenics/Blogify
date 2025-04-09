import './App.css'
import { Login } from './pages/auth/Login'
import { Signup } from './pages/auth/Signup'
import { Feed } from './pages/Feed'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import BlogPost from './pages/blog/BlogPost'
import { BrowserRouter, Routes, Route } from 'react-router'
import ProfilePage from './pages/Profile'
import UserContextProvider from './context/UserContext'
import CreateBlog from './pages/blog/CreateBlog'

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:username' element={<ProfilePage />} />
          <Route path='/blog/create' element={<CreateBlog />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/blog/:blogId' element={<BlogPost />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
