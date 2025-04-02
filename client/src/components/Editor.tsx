import { useRef, useState, useEffect } from 'react'
import './Editor.css'
import { IBlog } from '@/types/types'

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

  const adjustHeight = () => {
    if (editorRef.current) {
      editorRef.current.style.height = 'auto'
      editorRef.current.style.height = editorRef.current.scrollHeight + 'px'
    }
  }

  const handleBlogContentChange = () => {
    if (editorRef.current) {
      const newBlogContent = editorRef.current.value
      setBlogData((prev: IBlog) => ({ ...prev, content: newBlogContent }))
      setEditorDataChanged(true)
      adjustHeight()
    }
  }

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.value = blogContent
      adjustHeight()
    }
  }, [blogContent])

  return (
    <textarea
      ref={editorRef}
      readOnly={!editable}
      onChange={handleBlogContentChange}
      placeholder='Start writing your blog...'
      className={` ${stylingClasses} w-full overflow-hidden bg-transparent p-2 outline-none resize-none`}
    />
  )
}

export default Editor
