import { useParams } from 'react-router'
import { useContext, useEffect, useState } from 'react'
import BlogHeader from '@/components/Header'
import { IBlog, API_STATUS } from '@/types/types'
import { UserContext } from '@/context/UserContext'
import NonEditable from './NonEditable'
import Editable from './Editable'
import { BlogPageHeader } from './BlogPageHeader'

export const BlogPost = () => {
  const params = useParams()
  const userContext = useContext(UserContext)

  const [apiStatus, setApiStatus] = useState<API_STATUS>(API_STATUS.WAITING)
  const [blogData, setBlogData] = useState<IBlog>()
  const [editable, setEditable] = useState<boolean>(false)

  const [publishApiStatus, setPublishApiStatus] = useState<API_STATUS>(API_STATUS.IDLE)
  const [editing, setEditing] = useState<boolean>(false)

  useEffect(() => {
    // @The-Phoenics: if this is not called here blog data is getting fetched before user context data and gets rendered with null user context
    fetchBlog()
  }, [userContext])

  const handleEditing = () => {
    setEditing(true)
  }

  const handlePublishing = async () => {
    if (publishApiStatus === API_STATUS.WAITING) {
      return
    }
    setPublishApiStatus(API_STATUS.WAITING)

    const url = `${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/blog/${params.blogId}`
    const res = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        published: true,
      }),
    })
    if (!res.ok) {
      setPublishApiStatus(API_STATUS.ERROR)
      return
    }
    const blog = await res.json()
    setBlogData(blog)
    setPublishApiStatus(API_STATUS.SUCCESS)
  }

  const fetchBlog = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/blog/${params.blogId}`
    )
    const result = await response.json()
    if (result.message === 'invalid blog') {
      setApiStatus(API_STATUS.ERROR)
    } else {
      setApiStatus(API_STATUS.SUCCESS)
      setBlogData(result)
      if (userContext.user && userContext.user.username === result.author.username) {
        setEditable(true)
      }
    }
  }

  const handleBlogSave = async () => {
    const url = `${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/blog/${params.blogId}`
    const res = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    })
    if (!res.ok) {
      return
    }
    const blog = await res.json()
    setBlogData(blog)
  }

  if (apiStatus === API_STATUS.ERROR) {
    return (
      <div className='flex w-screen items-center justify-center'>
        <div className='flex flex-col justify-center font-[sans-serif]'>
          <div className='rounded-2xl'>
            <BlogHeader />
            <div>Couldn't find this blog</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex w-screen items-center justify-center'>
      <div className='flex w-full flex-col justify-center font-[sans-serif]'>
        <div className='flex flex-col items-center justify-center rounded-2xl pb-6'>
          <BlogPageHeader
            blogData={blogData}
            editing={editing}
            editable={editable}
            handlePublishing={handlePublishing}
            publishApiStatus={publishApiStatus}
            handleEditing={handleEditing}
            handleBlogSave={handleBlogSave}
          />
          {apiStatus === API_STATUS.WAITING ? (
            <div className='mt-20 flex h-full w-full items-center justify-center'>
              <div className='h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
            </div>
          ) : editing ? (
            <Editable blogData={blogData} setBlogData={setBlogData} />
          ) : (
            <NonEditable blogData={blogData} setBlogData={setBlogData} />
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogPost
