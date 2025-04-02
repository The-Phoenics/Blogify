import { API_STATUS, IBlog, IUser } from '@/types/types'
import React, { useEffect, useState } from 'react'
import BlogHeader from '@/components/Header'
import { useNavigate } from 'react-router'
import { Spinner } from '@/components/Spinner'
import { getSmallDate } from '@/utils'

const ProfilePage = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<IUser>()
  const [publishedBlogs, setPublishedBlogs] = useState<IBlog[]>([])
  const [blogFetchApiStatus, setBlogFetchApiStatus] = useState<API_STATUS>(API_STATUS.WAITING)

  const renderBlogsList = (): React.JSX.Element => {
    return publishedBlogs.length === 0 ? (
      <p className='text-gray-500'>No published blogs available.</p>
    ) : (
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {publishedBlogs.map((blog, idx) => (
          <div
            className='flex items-center space-x-4 rounded-lg border bg-white p-4 shadow-md transition-all hover:scale-[1.02] hover:cursor-pointer hover:shadow-lg'
            key={idx}
            onClick={() => {
              navigate(`/blog/${blog._id}`)
            }}
          >
            <img src={blog.image} alt={blog.title} className='h-24 w-24 rounded-lg object-cover' />
            <div>
              <h3 className='text-lg font-semibold'>{blog.title}</h3>
              <p className='text-sm text-gray-500'>{getSmallDate(blog.date)}</p>
              <p className='line-clamp-2 text-gray-700'>{blog.content.substring(0, 100)}...</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const fetchPublishedBlogs = async () => {
    setBlogFetchApiStatus(API_STATUS.WAITING)
    const url = `${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/blog`
    const res = await fetch(url, {
      credentials: 'include',
    })
    if (!res.ok) {
      setBlogFetchApiStatus(API_STATUS.ERROR)
      return
    }
    const blogs = await res.json()
    setPublishedBlogs(blogs)
    setBlogFetchApiStatus(API_STATUS.SUCCESS)
  }

  useEffect(() => {
    setUserData({
      username: 'Dummy Name',
      email: 'dummyname',
    })

    fetchPublishedBlogs()
  }, [])

  return (
    <div className='mx-auto w-full max-w-[2100px]'>
      <BlogHeader />
      {/* User Details */}
      <div className='p-10'>
        <div className='mb-6 rounded-lg bg-white p-6 shadow-md'>
          <h1 className='text-2xl font-bold'>{userData?.username}</h1>
          <p className='text-gray-600'>{userData?.email}</p>
        </div>
      </div>

      {/* Published Blogs */}
      <div className='p-10 pt-0'>{blogFetchApiStatus === API_STATUS.SUCCESS ? renderBlogsList() : <Spinner />}</div>
    </div>
  )
}

export default ProfilePage
