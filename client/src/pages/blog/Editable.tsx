import Editor from '@/components/Editor'
import { IBlog, ITag } from '@/types/types'
import { Dispatch, useEffect, useRef } from 'react'

interface EditableProps {
  blogData: IBlog | undefined
  setBlogData: (val: IBlog) => void
  setEditorDataChanged?: Dispatch<boolean>
}

function Editable({ blogData, setBlogData, setEditorDataChanged }: EditableProps) {
  const titleRef = useRef<HTMLTextAreaElement | null>(null)

  const handleTitleChange = () => {
    const newBlogTitle = titleRef.current?.value
    if (newBlogTitle) {
      setBlogData((prev: IBlog) => {
        const blog: IBlog = {
          ...prev,
          title: newBlogTitle,
        }
        return blog
      })
      if (titleRef.current)
        titleRef.current.value = newBlogTitle
    }
  }

  useEffect(() => {
    titleRef.current?.addEventListener("keypress", (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (titleRef.current) {
          titleRef.current.rows += 1
        }
      }
    })
  }, [])

  return (
    <div className='w-full max-w-[2100px] px-16'>
      <article>
        <textarea
          maxLength={180}
          ref={titleRef}
          defaultValue={blogData?.title}
          placeholder='Enter title here...'
          onChange={handleTitleChange}
          rows={1}
          spellCheck={false}
          className='text-2xl resize-none font-bold text-gray-900 md:w-3/5 w-full outline-none focus:underline text-center py-1 bg-transparent mt-4'
        />

        <div className='mb-8 mt-4 flex items-center justify-center'>
          <div className='flex flex-wrap gap-2'>
            {blogData?.tags?.map((tag: ITag, idx: number) => {
              return (
                <span
                  key={idx}
                  className='rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:cursor-pointer'
                >
                  {tag.tag}
                </span>
              )
            })}
          </div>
        </div>

        {/* image banner for blog */}
        <div className='h-90 mb-6 flex w-full items-center justify-center'>
          <img
            width='500'
            height='500'
            src={`${blogData?.image ?? '/dummyimg.jpg'}`}
            className='max-h-[500px] w-full max-w-[500px] rounded-md object-cover shadow-lg md:w-[80%]'
          />
        </div>

        {/* editor for writing blogs content */}
        <Editor
          editable={true}
          setEditorDataChanged={setEditorDataChanged}
          setBlogData={setBlogData}
          blogContent={blogData?.content}
          className='mb-14 text-left text-lg leading-relaxed text-gray-800'
        >
          {blogData?.content ?? 'Start writing here...'}
        </Editor>
      </article>
    </div>
  )
}

export default Editable
