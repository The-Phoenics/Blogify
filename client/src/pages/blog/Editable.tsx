import Editor from '@/components/Editor'
import { IBlog, ITag } from '@/types/types'
import { useRef } from 'react'

interface EditableProps {
  blogData: IBlog | undefined
  setBlogData: (val: IBlog) => void
  setEditorDataChanged?: (val: boolean) => boolean
}

function Editable({ blogData, setBlogData, setEditorDataChanged }: EditableProps) {
  const titleRef = useRef<HTMLHeadingElement | null>(null)

  const handleTitleChange = () => {
    console.log('handle title change')
    const newBlogTitle = titleRef.current?.innerText
    if (newBlogTitle) {
      setBlogData((prev: IBlog) => {
        const blog: IBlog = {
          ...prev,
          title: newBlogTitle,
        }
        return blog
      })
    }
  }

  return (
    <div className='w-full max-w-[2100px] px-16'>
      <article>
        <h1
          ref={titleRef}
          onInput={handleTitleChange}
          className='border-none text-2xl font-bold text-gray-900 outline-none focus:underline'
          contentEditable={true}
        >
          {blogData?.title ?? 'Enter title...'}
        </h1>

        <div className='mb-8 mt-8 flex items-center justify-center'>
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
          className='mb-14 text-left text-lg leading-relaxed text-gray-800'
        >
          {blogData?.content ?? 'Start writing here...'}
        </Editor>
      </article>
    </div>
  )
}

export default Editable
