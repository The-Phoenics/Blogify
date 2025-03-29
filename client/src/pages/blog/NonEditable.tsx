import Editor from '@/components/Editor'
import CommentSection from './CommentSection'
import { ITag } from '@/types/types'
import { getSmallDate } from '@/utils'

function NonEditable(props) {
  const { blogData, setBlogData, setEditorDataChanged } = props

  return (
    <div className='w-full max-w-[2100px] px-16'>
      <article>
        <h1 className='mb-4 border-none text-2xl font-bold text-gray-900'>{blogData?.title}</h1>
        <div className='mb-4 flex items-center justify-center gap-2 text-sm text-gray-700'>
          <div className='hover:cursor-pointer'>
            <p className=''>
              By <span className='font-semibold'>{blogData?.author?.username}</span>
            </p>
          </div>
          <span>•</span>
          <div>{getSmallDate(blogData.date)}</div>
        </div>

        {/* image banner for blog */}
        {blogData?.image ? (
          <div className='h-90 mb-6 flex w-full items-center justify-center'>
            <img
              src={`${blogData?.image}`}
              className='w-full max-w-[500px] rounded-md object-cover shadow-lg md:w-[80%]'
            />
          </div>
        ) : (
          ''
        )}

        {/* editor for writing blogs content */}
        <Editor
          editable={false}
          setEditorDataChanged={setEditorDataChanged}
          className='mb-6 text-left text-lg leading-relaxed text-gray-800'
        >
          {blogData?.content}
        </Editor>
      </article>
      <hr />

      {/* render comments */}
      <CommentSection blogId={blogData._id} setBlogData={setBlogData} />

      <div className='mt-8 flex items-center justify-center'>
        <div className='flex flex-wrap gap-2'>
          {blogData?.tags?.map((tag: ITag, idx: number) => {
            return (
              <span key={idx} className='rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:cursor-pointer'>
                {tag.tag}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default NonEditable
