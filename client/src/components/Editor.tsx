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
          content: newBlogContent
        }
        return blog
      })
    }
    setEditorDataChanged(true)
  }

  return (<textarea ref={editorRef} readOnly={!editable} onChange={handleBlogContentChange} className={` ${stylingClasses} min-h-[100vh] w-full outline-none overflow-scroll p-2 bg-transparent`}>
    {blogContent}
  </textarea>)
}

export default Editor
