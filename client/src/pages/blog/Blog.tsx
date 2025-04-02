import { useParams } from 'react-router'
import React, { useContext, useEffect, useState } from 'react'
import BlogHeader, { BlogHeaderUserModel } from '@/components/Header'
import { IBlog, API_STATUS } from '@/types/types'
import Editable from './Editable'
import NonEditable from './NonEditable'
import { SiBloglovin } from 'react-icons/si'
import { Spinner } from '@/components/Spinner'
import { UserContext } from '@/context/UserContext'

// Main component
export const BlogPost = () => {
  const params = useParams()
  const userContext = useContext(UserContext)
  const user = userContext.user

  const [apiStatus, setApiStatus] = useState<API_STATUS>(API_STATUS.WAITING)
  const [blogData, setBlogData] = useState<IBlog>()
  const [editable, setEditable] = useState<boolean>(true)
  const owner: boolean = editable

  const [publishApiStatus, setPublishApiStatus] = useState<API_STATUS>(API_STATUS.IDLE)
  const [previewStatus, setpPreviewStatus] = useState<API_STATUS>(API_STATUS.IDLE)
  const [editing, setEditing] = useState<boolean>(false)
  const [editorDataChanged, setEditorDataChanged] = useState<boolean>(false)

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

  const handlePreviewing = () => {
    if (previewStatus === API_STATUS.WAITING) {
      return
    }
    setpPreviewStatus(API_STATUS.WAITING)
    // TODO: also save the blog
    setEditing(false)
    setpPreviewStatus(API_STATUS.SUCCESS)
  }

  const getHeader = (): React.JSX.Element => {
    let rightPortion: React.JSX.Element = <></>
    if (owner) {
      if (editing) {
        rightPortion = (
          <div className='flex gap-6'>
            <div className='flex gap-4'>
              <button
                className='min-h-14 min-w-[140px] rounded-lg border p-2 px-6 py-3 shadow-sm'
                onClick={handlePreviewing}
              >
                {previewStatus === API_STATUS.WAITING ? <Spinner color={'black'} /> : 'Preview'}
              </button>{' '}
              {blogData?.published ? (
                ''
              ) : (
                <button
                  className='min-h-14 min-w-[140px] rounded-lg border bg-blue-600 p-2 px-6 py-3 text-white shadow-sm'
                  onClick={handlePublishing}
                >
                  {publishApiStatus === API_STATUS.WAITING ? <Spinner /> : 'Publish'}
                </button>
              )}
            </div>
            <BlogHeaderUserModel />
          </div>
        )
      } else {
        rightPortion = (
          <div className='flex gap-6'>
            <div className='flex gap-4'>
              <button
                className='min-h-14 min-w-[100px] rounded-lg border p-2 px-6 py-3 shadow-sm'
                onClick={handleEditing}
              >
                Edit
              </button>
              {blogData?.published ? (
                ''
              ) : (
                <button
                  className='min-h-14 min-w-[140px] rounded-lg border bg-blue-600 p-2 px-6 py-3 text-white shadow-sm'
                  onClick={handlePublishing}
                >
                  {publishApiStatus === API_STATUS.WAITING ? <Spinner /> : 'Publish'}
                </button>
              )}
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

        {rightPortion}
      </div>
    )
  }

  const fetchBlog = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/blog/${params.blogId}`,
      {
        method: 'GET',
      }
    )
    const result = await response.json()
    if (result.message === 'invalid blog') {
      setApiStatus(API_STATUS.ERROR)
    } else {
      setApiStatus(API_STATUS.SUCCESS)
      setBlogData(result)
    }
  }

  useEffect(() => {
    fetchBlog()
  }, [])

  const handleBlogSave = async () => {
    console.log('saving blog')
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
    console.log('blog saved', blog)
  }

  useEffect(() => {
    if (editorDataChanged) {
      handleBlogSave()
      setEditorDataChanged(false)
    }
  }, [editorDataChanged])

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
          {getHeader()}
          {apiStatus === API_STATUS.WAITING ? (
            <div className='mt-20 flex h-full w-full items-center justify-center'>
              <div className='h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
            </div>
          ) : editing ? (
            <Editable blogData={blogData} setBlogData={setBlogData} setEditorDataChanged={setEditorDataChanged} />
          ) : (
            <NonEditable blogData={blogData} setBlogData={setBlogData} />
          )}
        </div>
      </div>
    </div>
  )
}
