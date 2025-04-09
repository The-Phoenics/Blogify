import BlogHeader from '@/components/Header'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Editable from './Editable'
import NonEditable from './NonEditable'
import { IBlog, IUser } from '@/types/types'
import { Spinner } from '@/components/Spinner'
import useUserAuth from '@/hooks/useUserAuth'

function CreateBlog() {
  const navigate = useNavigate()
  const { isLoading, user }: { isLoading: boolean; user: IUser | null } = useUserAuth()
  const [editing, setEditing] = useState<boolean>(true)
  const [blogData, setBlogData] = useState<IBlog>()

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/login')
    } else {
      setBlogData(() => {
        // TODO
        const blog: IBlog = {
          _id: user._id,
          title: '',
          author: {
            username: user.username,
            email: user.email,
          },
          comments: [],
          published: false,
          public: false,
          content: '',
          image: '',
          tags: [],
          date: new Date(),
          lastUpdated: new Date(),
        }
        return blog
      })
    }
  }, [user])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='flex w-screen items-center justify-center'>
      <div className='flex w-full flex-col justify-center font-[sans-serif]'>
        <div className='flex flex-col items-center justify-center rounded-2xl pb-6'>
          <BlogHeader />
          {editing ? <Editable blogData={blogData} setBlogData={setBlogData} /> : <NonEditable blogData={blogData} />}
        </div>
      </div>
    </div>
  )
}

export default CreateBlog
