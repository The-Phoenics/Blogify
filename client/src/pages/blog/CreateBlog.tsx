import { useNavigate } from 'react-router'
import React, { Dispatch, useEffect, useState } from 'react'
import { IBlog, API_STATUS, IUser } from '@/types/types'
import NonEditable from './NonEditable'
import Editable from './Editable'
import { BlogPostHeader } from './BlogPostHeader'
import useUserAuth from '@/hooks/useUserAuth'
import { SiBloglovin } from 'react-icons/si'
import { BlogHeaderUserModel } from '@/components/Header'

const CreateBlog = () => {
  const navigate = useNavigate()
  const { isLoading, user }: { isLoading: boolean; user: IUser | null } = useUserAuth()

  const [blogData, setBlogData] = useState<IBlog>()
  const [editing, setEditing] = useState<boolean>(true)

  useEffect(() => {
    // if (!isLoading && !user) {
    //   navigate("/feed")
    // }
    if (!isLoading && !user) {
      setBlogData({
        _id: "",
        title: "",
        author: {
          _id: user?._id,
          username: user?.username,
          email: user?.email
        },
        content: "",
        comments: [],
        published: false,
        public: false,
        image: "",
        tags: [],
      })
    }
  }, [user])

  if (isLoading) {
    // loading spinner
    return <div className='mt-20 flex h-full w-full items-center justify-center'>
      <div className='h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
    </div>
  }

  return (
    <div className='flex w-screen items-center justify-center'>
      <div className='flex w-full flex-col justify-center font-[sans-serif]'>
        <div className='flex flex-col items-center justify-center rounded-2xl pb-6'>
          <CreateBlogPostHeader blogData={blogData} editing={editing} setEditing={setEditing} />
          {editing ? (
            <Editable blogData={blogData} setBlogData={setBlogData} />
          ) : (
            <NonEditable blogData={blogData} />
          )}
        </div>
      </div>
    </div>
  )
}

function CreateBlogPostHeader({ blogData, editing, setEditing }: { blogData: IBlog, editing: boolean, setEditing: Dispatch<boolean> }): React.JSX.Element {
  const navigate = useNavigate()

  const handlePreviewing = () => {
    setEditing(false)
  }

  const handleBlogCreate = async () => {
    const url = `${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/blog/create-blog`
    const res = await fetch(url, {
      method: 'POST',
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
    navigate(`/blog/${blog._id}`)
  }

  const CreateButtonHeader = () => {
    return (
      <button className='min-h-14 min-w-[140px] rounded-lg border p-2 px-6 py-3 shadow-sm' onClick={handleBlogCreate}>
        Create
      </button>
    )
  }

  return <div className='relative mb-6 flex w-full items-center justify-between border-b bg-white px-6 py-4 shadow-sm'>
    <a href={`${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/`}>
      <div className='flex items-center gap-1 text-gray-700'>
        <SiBloglovin className='mb-1' />
        <p className='font-bold'>Logify</p>
      </div>
    </a>

    {/* right section of the header for blog page */}
    <div className='flex gap-5'>
      <CreateButtonHeader />
      <button className='min-h-14 min-w-[140px] rounded-lg border p-2 px-6 py-3 shadow-sm' onClick={handlePreviewing}>
        Preview
      </button>
      <BlogHeaderUserModel />
    </div>
  </div>
}

export default CreateBlog