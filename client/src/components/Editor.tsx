import { useRef, useState } from 'react'
import './Editor.css'
import { IBlog, IComment } from '@/types/types'

interface EditorProps {
  className: string
  children: string
  setBlogData: (val: IBlog) => void
  setEditorDataChanged: (val: boolean) => void
  editable: boolean
}

function Editor(props: EditorProps) {
  const stylingClasses = props.className
  const blogContent = props.children
  const setBlogData = props.setBlogData
  const setEditorDataChanged = props.setEditorDataChanged
  const editable = props.editable

  const editorRef = useRef<HTMLTextAreaElement | null>(null)

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

  useState(() => {
    if (editorRef.current) {
      editorRef.current.value = blogContent
    }
  }, [])

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
