import { Spinner } from '@/components/Spinner'
import { API_STATUS, IComment } from '@/types/types'
import { useRef, useState } from 'react'

const CommentSection = (props) => {
  const { blogData, setEditorDataChanged } = props
  const commentInputRef = useRef<HTMLTextAreaElement>(null)
  const [apiStatus, setApiStatus] = useState<API_STATUS>(API_STATUS.IDLE)

  const handlePostComment = async () => {
    if (apiStatus === API_STATUS.WAITING) return
    setApiStatus(API_STATUS.WAITING)

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/blog/comment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // TODO: send comment data and create comment
        }),
      }
    )

    if (!response.ok) {
      setApiStatus(API_STATUS.ERROR)
      return
    }
    const result = await response.json()
    console.log(result)
    setApiStatus(API_STATUS.SUCCESS)
  }

  return (
    <div className='mb-6 mt-8 flex flex-col items-center justify-center'>
      <h2 className='text-xl font-semibold text-gray-900'>Comments</h2>
      {blogData?.comments?.map((comment: IComment, idx: number) => {
        return (
          <div key={idx} className='flex w-full flex-col gap-2 rounded-lg p-4 text-left text-lg text-gray-800'>
            <p className=''>{comment.content}</p>
            <span className='flex w-full justify-end'>
              <span className='mr-10 font-semibold text-gray-700 hover:cursor-pointer'>@{'UserA232E!'}</span>
            </span>
          </div>
        )
      })}
      <textarea
        ref={commentInputRef}
        rows={6}
        className='mx-2 mt-8 w-full rounded-md border border-gray-300 p-2 px-4 text-gray-800'
        placeholder='Add a comment...'
      ></textarea>
      <button
        className='mt-4 min-h-9 min-w-[200px] rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold tracking-wider text-white hover:bg-blue-700 focus:outline-none'
        onClick={handlePostComment}
      >
        {apiStatus === API_STATUS.WAITING ? <Spinner /> : 'Post Comment'}
      </button>
    </div>
  )
}

export default CommentSection
