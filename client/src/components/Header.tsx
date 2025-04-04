import { UserContext } from '@/context/UserContext'
import React, { useContext, useState } from 'react'
import { BsBookmark, BsBoxArrowRight, BsClockHistory, BsGear, BsListCheck } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { SiBloglovin } from 'react-icons/si'
import { Link, useNavigate } from 'react-router'

const LoginSignupButtons = (): React.JSX.Element => {
  return (
    <>
      <div className='flex items-center gap-4'>
        <Link to='/login' className='rounded-md border px-4 py-2 text-sm'>
          Log in
        </Link>
        <Link to='/signup' className='rounded-md bg-blue-600 px-4 py-2 text-sm text-white'>
          Sign up
        </Link>
      </div>
    </>
  )
}

export const BlogHeaderUserModel = () => {
  const navigate = useNavigate()
  const userContext = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    if (userContext.user) {
      const res = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
      if (res.ok) {
        if (userContext) {
          userContext.setUser(null)
          userContext.setUser = null
        }
        navigate('/login')
      }
    }
  }

  const goToUserProfile = () => {
    navigate(`/${userContext.user?.username}`)
  }

  return (
    <div className='relative flex items-center justify-center'>
      <button onClick={() => setIsOpen(!isOpen)} className='focus:outline-none'>
        <FaUserCircle size={28} className='text-gray-700' />
      </button>
      {isOpen && (
        <div className='absolute right-0 top-16 mt-2 w-56 rounded-lg border border-gray-200 bg-white p-2 shadow-lg'>
          <div className='cursor-pointer border-b border-gray-200 p-3' onClick={goToUserProfile}>
            <p className='font-bold'>{userContext.user.username}</p>
            <p className='text-sm text-gray-500'>@{userContext.user.username}</p>
          </div>
          <ul className='py-1'>
            <li className='flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100'>
              <BsBookmark className='text-gray-600' /> Bookmarks
            </li>
            <li className='flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100'>
              <BsClockHistory className='text-gray-600' /> My reading history
            </li>
            <li className='flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100'>
              <BsGear className='text-gray-600' /> Account settings
            </li>
            <li className='flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100'>
              <BsListCheck className='text-gray-600' /> Changelog
            </li>
            <li
              onClick={handleLogout}
              className='flex cursor-pointer items-center gap-3 px-4 py-2 text-red-500 hover:bg-gray-100'
            >
              <BsBoxArrowRight className='text-red-500' /> Log out
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

const BlogHeader = () => {
  const userContext = useContext(UserContext)
  if (!userContext) {
    return null
  }
  console.log(userContext)

  return (
    <div className='relative mb-6 flex w-full items-center justify-between border-b bg-white px-6 py-4 shadow-sm'>
      <a href={`${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/`}>
        <div className='flex items-center gap-1 text-gray-700'>
          <SiBloglovin className='mb-1' />
          <p className='font-bold'>Logify</p>
        </div>
      </a>
      {userContext?.user ? <BlogHeaderUserModel /> : <LoginSignupButtons />}
    </div>
  )
}

export default BlogHeader
