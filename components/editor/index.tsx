import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { MenuBar } from './menu-bar'

const extensions = [StarterKit]

export default ({ content, onChange }: { content: string | null; onChange?: (value: string) => void }) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'min-h-[150px] p-4 prose dark:invert outline-none focus:outline-none',
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
      <div className="border rounded-lg border-input bg-card rounded-t-none">
        <EditorContent editor={editor} />
      </div>
    </>
  )
}