import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { API_STATUS, IBlog } from '../types/types'
import { IoDocumentTextOutline } from 'react-icons/io5'
import BlogHeader from '@/components/Header'
import { getLargeDate } from '@/utils'

export const Feed = () => {
  const [feedBlogs, setFeedBlogs] = useState<IBlog[]>([])
  const [apiStatus, setApiStatus] = useState<API_STATUS>(API_STATUS.WAITING)
  const [searchNotFound, setSearchNotFound] = useState<boolean>(false)

  const navigate = useNavigate()
  const searchInputRef = useRef<HTMLInputElement | null>(null)

  const fetchFeedBlogs = async () => {
    const url = `${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/blog`
    const res = await fetch(url, {
      credentials: 'include',
    })
    if (!res.ok) {
      setApiStatus(API_STATUS.ERROR)
      navigate('/login')
      return
    }
    const blogs = await res.json()
    setFeedBlogs(blogs)
    setApiStatus(API_STATUS.SUCCESS)
  }

  const searchBlogs = async () => {
    const searchString = searchInputRef.current?.value
    if (searchString?.trim() !== '') {
      const url = `${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/blog/search?title=${searchString}`
      const res = await fetch(url, {
        credentials: 'include',
      })
      if (res.ok) {
        const result = await res.json()
        if (result.data.length === 0) {
          setSearchNotFound(true)
        }
        if (result.message === 'found matches') {
          setFeedBlogs([...result.data])
        }
      }
    }
  }

  useEffect(() => {
    fetchFeedBlogs()
  }, [])

  if (apiStatus === API_STATUS.WAITING) {
    return (
      <div className='mt-20 flex h-full w-full items-center justify-center'>
        <div className='h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
      </div>
    )
  }

  return (
    <div className='flex w-screen flex-col justify-center bg-gray-100'>
      <BlogHeader />
      <div className='flex w-full flex-col justify-center gap-6 p-6 lg:flex-row'>
        {/* Sidebar for sm-screen size */}
        <div className='space-y-6 lg:hidden'>
          <div className='rounded-lg border border-gray-300 bg-white p-4 shadow'>
            <h4 className='mb-2 font-semibold text-gray-900'>Search</h4>
            <input
              ref={searchInputRef}
              type='text'
              className='w-full rounded-md border border-gray-300 p-2'
              placeholder='Enter search term...'
            />
            <button onClick={searchBlogs} className='mt-2 w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700'>
              Go!
            </button>
          </div>
          <div className='rounded-lg border border-gray-300 bg-white p-4 shadow'>
            <h4 className='mb-4 font-semibold text-gray-900'>Categories</h4>
            <div className='flex flex-wrap items-center justify-center gap-2'>
              <span className='rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:cursor-pointer'>
                Technology
              </span>
              <span className='rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:cursor-pointer'>
                Development
              </span>
              <span className='rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:cursor-pointer'>
                React
              </span>
              <span className='rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:cursor-pointer'>
                Web Development
              </span>
            </div>
          </div>
        </div>

        {/* Blogs grid */}
        <div className='col-span-2'>
          {searchNotFound ? (
            <div className='mt-6 flex flex-col items-center justify-center py-10'>
              <IoDocumentTextOutline size={'2.5rem'} />
              <h2 className='mt-2'>Not found!</h2>
              <p className='mt-1 text-sm text-gray-500'>Try searching for something else.</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {feedBlogs?.map((blog: IBlog, idx: number) => (
                <div key={idx} className='rounded-lg border border-gray-300 bg-white p-4 pb-6 shadow'>
                  <img src={`${blog.image}`} className='aspect-square w-full rounded-md bg-transparent object-cover' />
                  <p className='mt-2 text-sm text-gray-600'>{getLargeDate(blog.date)}</p>
                  <h3 className='mt-1 text-lg font-semibold text-gray-900'>
                    {blog.title.split(' ', 4).map((word: string, idx: number) => {
                      return <span key={idx}>{word}&nbsp;</span>
                    })}
                    {blog.content.length > 4 ? <span>...</span> : ''}
                  </h3>
                  <p className='mb-4 text-sm text-gray-700'>
                    {blog.content.split(' ', 5).map((word: string, idx: number) => {
                      return <span key={idx}>{word}&nbsp;</span>
                    })}
                    {blog.content.length > 5 ? <span>...</span> : ''}
                  </p>
                  <Link
                    to={`/blog/${blog._id}`}
                    className='mt-13 rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700'
                  >
                    Read more →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar for screen size above sm */}
        <div className='hidden w-full space-y-6 lg:block'>
          <div className='rounded-lg border border-gray-300 bg-white p-4 shadow'>
            <h4 className='mb-2 font-semibold text-gray-900'>Search</h4>
            <input
              ref={searchInputRef}
              type='text'
              className='w-full rounded-md border border-gray-300 p-2'
              placeholder='Enter search term...'
            />
            <button onClick={searchBlogs} className='mt-2 w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700'>
              Go!
            </button>
          </div>
          <div className='rounded-lg border border-gray-300 bg-white p-4 shadow'>
            <h4 className='mb-4 font-semibold text-gray-900'>Categories</h4>
            <div className='flex flex-wrap items-center justify-center gap-2'>
              <span className='rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:cursor-pointer'>
                Technology
              </span>
              <span className='rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:cursor-pointer'>
                Development
              </span>
              <span className='rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:cursor-pointer'>
                React
              </span>
              <span className='rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:cursor-pointer'>
                Web Development
              </span>
            </div>
          </div>

          {/* <div className="bg-white border border-gray-300 p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-gray-900 mb-2">Side Widget</h4>
                        <p className="text-gray-700 text-sm">You can put anything you want inside of these side widgets. They are easy to use and feature the Bootstrap 5 card component!</p>
                    </div> */}
        </div>
      </div>
    </div>
  )
}
