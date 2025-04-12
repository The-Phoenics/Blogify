import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BlogHeader from '@/components/Header'
import { IBlog, API_STATUS, IUser } from '@/types/types'
import NonEditable from './NonEditable'
import Editable from './Editable'
import { BlogPostHeader } from './BlogPostHeader'
import useUserAuth from '@/hooks/useUserAuth'

export const BlogPost = () => {
  const params = useParams()
  const { isLoading, user }: { isLoading: boolean; user: IUser | null } = useUserAuth()

  const [apiStatus, setApiStatus] = useState<API_STATUS>(API_STATUS.IDLE)
  const [blogData, setBlogData] = useState<IBlog>()
  const [editable, setEditable] = useState<boolean>(true)

  const [publishApiStatus, setPublishApiStatus] = useState<API_STATUS>(API_STATUS.IDLE)
  const [editing, setEditing] = useState<boolean>(false)

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

  return (
    <div className='flex w-screen items-center justify-center'>
      <div className='flex w-full flex-col justify-center font-[sans-serif]'>
        <div className='flex flex-col items-center justify-center rounded-2xl pb-6'>
          <BlogPostHeader
            blogData={blogData}
            editing={editing}
            editable={editable}
            handlePublishing={handlePublishing}
            publishApiStatus={publishApiStatus}
            handleEditing={handleEditing}
            handleBlogSave={handleBlogSave}
          />
          {/* <div className='mt-20 flex h-full w-full items-center justify-center'>
            <div className='h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
          </div> */}
          <Editable blogData={blogData} setBlogData={setBlogData} />
        </div>
      </div>
    </div>
  )
}

export default BlogPost
