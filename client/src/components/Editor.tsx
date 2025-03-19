import { useEffect, useRef } from 'react'
import EditorJS from '@editorjs/editorjs'
import CodeTool from '@editorjs/code'
import InlineCode from '@editorjs/inline-code'
import './Editor.css'

function getEditorData(editorData): string {
  let data = ''
  if (editorData) {
    editorData.blocks.forEach(block => {
      data += block.data.text
      data += '\n'
    })
  }
  return data
}

function convertToEditorData(blogData: string) {
  if (!blogData || blogData === '') {
    return ''
  }
  const data = { blocks: [] }
  const paragraphArray = blogData.split('\n')
  paragraphArray.forEach(paragraph => {
    data.blocks.push({
      type: 'paragraph',
      data: {
        text: paragraph,
      },
    })
  })
  return data
}

function Editor(props) {
  const editorRef = useRef<HTMLDivElement>(null)
  const stylingClasses = props.className
  const blogContent = props.children
  const setBlogData = props.setBlogData

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        editorRef.current = editor
      },
      autofocus: true,
      spellcheck: false,
      readOnly: !props.editable,
      data: convertToEditorData(blogContent), // set initial data
      onChange: async () => {
        const content = await editor.saver.save()
        if (setBlogData) {
          // setBlogData(content)
        }
      },
      tools: {
        code: CodeTool,
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M',
        },
      },
    })
  }

  useEffect(() => {
    if (editorRef.current !== null) {
      initEditor()
    }

    return () => {
      editorRef?.current?.destroy()
      editorRef.current = null
    }
  }, [])

  return <div id='editorjs' ref={editorRef} className={` ${stylingClasses} min-h-[100vh]`}></div>
}

export default Editor
