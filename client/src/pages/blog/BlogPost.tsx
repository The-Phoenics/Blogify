import { useParams } from 'react-router'
import React, { useContext, useEffect, useState } from 'react'
import BlogHeader, { BlogHeaderUserModel } from '@/components/Header'
import { IBlog, API_STATUS } from '@/types/types'
import { SiBloglovin } from 'react-icons/si'
import { Spinner } from '@/components/Spinner'
import { UserContext } from '@/context/UserContext'
import NonEditable from './NonEditable'
import Editable from './Editable'

interface BlogPageHeaderProps {
  blogData: IBlog
  editing: boolean
  editable: boolean
  publishApiStatus: API_STATUS
  handlePreviewing: () => void
  handlePublishing: () => void
  handleEditing: () => void
  handleBlogSave: () => void
}

export const BlogPageHeader = ({
  blogData,
  editing,
  editable,
  handlePreviewing,
  handlePublishing,
  publishApiStatus,
  handleEditing,
  handleBlogSave,
}: BlogPageHeaderProps): React.JSX.Element => {
  const SaveButtonHeader = () => {
    return (
      <button className='min-h-14 min-w-[140px] rounded-lg border p-2 px-6 py-3 shadow-sm' onClick={handleBlogSave}>
        Save
      </button>
    )
  }

  const PublishButtonHeader = () => {
    return (
      <button
        className='min-h-14 min-w-[140px] rounded-lg border bg-blue-600 p-2 px-6 py-3 text-white shadow-sm'
        onClick={handlePublishing}
      >
        {publishApiStatus === API_STATUS.WAITING ? <Spinner /> : 'Publish'}
      </button>
    )
  }

  const EditButtonHeader = () => {
    return (
      <button className='min-h-14 min-w-[100px] rounded-lg border p-2 px-6 py-3 shadow-sm' onClick={handleEditing}>
        Edit
      </button>
    )
  }

  const PreviewButtonHeader = () => {
    return (
      <button className='min-h-14 min-w-[140px] rounded-lg border p-2 px-6 py-3 shadow-sm' onClick={handlePreviewing}>
        Preview
      </button>
    )
  }

  let rightPortion: React.JSX.Element = <></>
  if (editable) {
    if (editing) {
      rightPortion = (
        <div className='flex gap-6'>
          <div className='flex gap-4'>
            <SaveButtonHeader />
            <PreviewButtonHeader />
            {blogData?.published ?? <PublishButtonHeader />}
          </div>
          <BlogHeaderUserModel />
        </div>
      )
    } else {
      rightPortion = (
        <div className='flex gap-6'>
          <div className='flex gap-4'>
            <SaveButtonHeader />
            <EditButtonHeader />
            {blogData?.published ?? <PublishButtonHeader />}
          </div>
          <BlogHeaderUserModel />
        </div>
      )
    }
  } else {
    rightPortion = <BlogHeaderUserModel />
  }

  return (
    <div className='relative mb-6 flex w-full items-center justify-between border-b bg-white px-6 py-4 shadow-sm'>
      <a href={`${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/`}>
        <div className='flex items-center gap-1 text-gray-700'>
          <SiBloglovin className='mb-1' />
          <p className='font-bold'>Logify</p>
        </div>
      </a>

      {/* right section of the header for blog page */}
      {rightPortion}
    </div>
  )
}

export const BlogPost = () => {
  const params = useParams()
  const userContext = useContext(UserContext)

  const [apiStatus, setApiStatus] = useState<API_STATUS>(API_STATUS.WAITING)
  const [blogData, setBlogData] = useState<IBlog>()
  const [editable, setEditable] = useState<boolean>(false)

  const [publishApiStatus, setPublishApiStatus] = useState<API_STATUS>(API_STATUS.IDLE)
  const [editing, setEditing] = useState<boolean>(false)

  const handleEditing = () => {
    setEditing(true)
  }

  const handlePublishing = () => {
    if (publishApiStatus === API_STATUS.WAITING) {
      return
    }
    setPublishApiStatus(API_STATUS.WAITING)

    // TODO: send blog publish request
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
      if (userContext.isLoggedIn && userContext.user.username === result.author.username) {
        setEditable(true)
      }
    }
  }

  useEffect(() => {
    fetchBlog()
  }, [])

  useEffect(() => {
    fetchBlog() // Note: if this is not called here blog data is getting fetched before user context data and gets rendered with null user context
  }, [userContext])

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
