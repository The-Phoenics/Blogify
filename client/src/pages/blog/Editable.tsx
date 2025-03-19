import Editor from '@/components/Editor'
import { ITag } from '@/types/types'

function Editable(props) {
  const { blogData, setBlogData } = props

  return (
    <div className='max-w-[2100px] px-16'>
      <article>
        <h1 className='border-none text-2xl font-bold text-gray-900' contentEditable={true}>
          {blogData?.title}
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
          editable={true}
          setBlogData={setBlogData}
          className='mb-14 text-left text-lg leading-relaxed text-gray-800'
        >
          {blogData?.content}
        </Editor>
      </article>
    </div>
  )
}

export default Editable
