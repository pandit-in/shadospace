import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import { MenuBar } from "./menu-bar"

const extensions = [StarterKit, Image]

export default function Editor({
  content,
  onChange,
}: {
  content: string | null
  onChange?: (value: string) => void
}) {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] p-4 prose dark:prose-invert outline-none focus:outline-none",
      },
    },
    extensions,
    immediatelyRender: false,
    content: content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <>
      <MenuBar editor={editor} />
      <div className="border border-input bg-card">
        <EditorContent editor={editor} />
      </div>
    </>
  )
}
