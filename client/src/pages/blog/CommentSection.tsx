import { Spinner } from '@/components/Spinner'
import { UserContext } from '@/context/UserContextProvider'
import useUserAuth from '@/hooks/useUserAuth'
import { API_STATUS, IComment, IUser } from '@/types/types'
import { useContext, useEffect, useRef, useState } from 'react'

const CommentSection = (props: { blogId: string }) => {
  const { blogId } = props
  const [comments, setComments] = useState<IComment[]>([])

  return (
    <div className='mb-10 mt-2 flex flex-col items-center justify-center'>
      {/* <h2 className='text-xl font-semibold text-gray-900'>Comments</h2> */}
      <CommentPostSection blogId={blogId} setComments={setComments} />
      <CommentViewSection blogId={blogId} comments={comments} setComments={setComments} />
    </div>
  )
}

function CommentViewSection(props: {
  blogId: string
  comments: IComment[]
  setComments: (comments: IComment[]) => void
}) {
  const { blogId, comments, setComments } = props
  const [apiStatus, setApiStatus] = useState<API_STATUS>(API_STATUS.IDLE)

  const fetchCommentsOfBlog = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/comment/${blogId}`
    )
    if (response.ok) {
      const result = await response.json()
      setComments(result)
      setApiStatus(API_STATUS.SUCCESS)
    }
    setApiStatus(API_STATUS.ERROR)
  }

  useEffect(() => {
    fetchCommentsOfBlog()
  }, [])

  if (apiStatus === API_STATUS.WAITING) {
    return (
      <>
        <Spinner />
      </>
    )
  }

  return (
    <>
      {comments?.map((comment: IComment, idx: number) => {
        return (
          <div key={idx} className='flex w-full flex-col gap-2 rounded-lg border p-4 text-left text-lg text-gray-800'>
            <p className=''>{comment.content}</p>
            <span className='flex w-full justify-end'>
              <span className='mr-10 font-semibold text-gray-700 hover:cursor-pointer'>@{comment.username}</span>
            </span>
          </div>
        )
      })}
    </>
  )
}

function CommentPostSection(props: { blogId: string; setComments: (comments: IComment[]) => void }) {
  const { isLoading, user }: { isLoading: boolean; user: IUser | null } = useUserAuth()
  const { blogId, setComments } = props
  const commentInputRef = useRef<HTMLTextAreaElement | null>(null)
  const [apiStatus, setApiStatus] = useState<API_STATUS>(API_STATUS.IDLE)

  const addComment = (comment: IComment) => {
    setComments(prev => [...prev, comment])
  }

  const clearTextInput = () => {
    if (commentInputRef.current) {
      commentInputRef.current.value = ''
    }
  }

  const handlePostComment = async () => {
    if (!isLoading && !user) {
      const commentValue: string | undefined = commentInputRef.current?.value.trim()
      if (blogId && commentValue && commentValue !== '') {
        if (apiStatus === API_STATUS.WAITING) {
          return
        }
        setApiStatus(API_STATUS.WAITING)
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/comment/${blogId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: user?.username,
              blogId: blogId,
              content: commentValue,
            }),
          }
        )

        if (!response.ok) {
          setApiStatus(API_STATUS.ERROR)
          return
        }
        const result = await response.json()
        if (blogId === result.blogId) {
          setApiStatus(API_STATUS.SUCCESS)
          addComment(result)
          clearTextInput()
        }
      }
    }
  }

  return (
    <>
      <textarea
        ref={commentInputRef}
        rows={6}
        className='mx-2 mt-8 w-full rounded-md border border-gray-300 p-2 px-4 text-gray-800'
        placeholder='Add a comment...'
      ></textarea>
      <button
        className='mb-8 mt-4 min-h-9 min-w-[200px] rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold tracking-wider text-white hover:bg-blue-700 focus:outline-none'
        onClick={handlePostComment}
      >
        {apiStatus === API_STATUS.WAITING ? <Spinner /> : 'Post Comment'}
      </button>
    </>
  )
}

export default CommentSection
