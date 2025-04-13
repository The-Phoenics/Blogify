import { useRef, useEffect, Dispatch } from 'react'
import './Editor.css'
import { IBlog } from '@/types/types'

interface EditorProps {
  className: string
  children: string
  setBlogData: (val: IBlog) => void
  setEditorDataChanged: Dispatch<boolean>
  editable: boolean
  stylingClasses: string
  blogContent: string
}

function Editor({ stylingClasses, blogContent, setBlogData, setEditorDataChanged, editable }: EditorProps) {
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
      defaultValue={blogContent}
      spellCheck={false}
      onChange={handleBlogContentChange}
      placeholder='Start writing your blog...'
      className={` ${stylingClasses} w-full resize-none overflow-hidden bg-transparent p-2 outline-none`}
    />
  )
}

export default Editor
