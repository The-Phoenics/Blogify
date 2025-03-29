import { useRef } from 'react'
import './Editor.css'
import { IBlog } from '@/types/types'

function Editor(props) {
  const stylingClasses = props.className
  const blogContent = props.children
  const setBlogData = props.setBlogData
  const setEditorDataChanged = props.setEditorDataChanged
  const editable = props.editable

  const editorRef = useRef<HTMLTextAreaElement>(null)

  const handleBlogContentChange = () => {
    const newBlogContent = editorRef.current?.value
    if (newBlogContent) {
      setBlogData((prev: IBlog) => {
        const blog: IBlog = {
          ...prev,
          content: newBlogContent,
        }
        return blog
      })
    }
    setEditorDataChanged(true)
  }

  return (
    <textarea
      ref={editorRef}
      readOnly={!editable}
      onChange={handleBlogContentChange}
      placeholder='Start writing your blog...'
      className={` ${stylingClasses} min-h-[100vh] w-full overflow-scroll bg-transparent p-2 outline-none`}
    >
      {blogContent}
    </textarea>
  )
}

export default Editor
