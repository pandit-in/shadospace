'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

const Reader = ({ content }: { content: string | null }) => {
    const editor = useEditor({
        extensions: [StarterKit, Image],
        editorProps: {
            attributes: {
              class: 'prose prose-base dark:prose-invert focus:outline-none',
            },
          },
        content: content,
        immediatelyRender: false,
        editable: false,
    })

    return <EditorContent editor={editor} />
}

export default Reader