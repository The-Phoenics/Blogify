import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import CodeTool from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import "./Editor.css";

function convertToEditorData(blogData: string) {
  if (!blogData || blogData === "") {
    return ""
  }
  const data = { blocks: [] }
  const paragraphArray = blogData.split("\n")
  paragraphArray.forEach(paragraph => {
    console.log(paragraph)
    data.blocks.push({
      type: 'paragraph',
      data: {
        text: paragraph
      }
    })
  });
  return data
}

function Editor(props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const stylingClasses = props.className
  const blogContent = props.children
  // console.log("props:", props)

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        editorRef.current = editor;
        /* disable red error squiggles */
        document.querySelector('[contenteditable]').setAttribute('spellcheck', 'false');
      },
      autofocus: true,
      spellcheck: false, // This doesn't work directly, use method below
      readOnly: false,
      // data: convertToEditorData(blogContent),
      data: { blocks: [
        {
          type: 'paragraph',
          data: {
            text: blogContent
          }
        }
      ]},
      onChange: async () => {
        const content = await editor.saver.save();
        console.log("content:", content);
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
      initEditor();
    }

    return () => {
      editorRef?.current?.destroy();
      editorRef.current = null;
    };
  }, []);

  return (
    <div id="editorjs" ref={editorRef} className={` ${stylingClasses} min-h-[100vh]`}>
      {/* {blogContent} */}
    </div>
  )
}

export default Editor