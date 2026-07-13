import type { Editor } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import { menuBarStateSelector } from './menubar-state'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '../ui/dropdown-menu'
import {
    Bold,
    ChevronDown,
    Italic,
    Strikethrough,
    Code,
    RemoveFormatting,
    Eraser,
    Pilcrow,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    List,
    ListOrdered,
    Terminal,
    Quote,
    SeparatorHorizontal,
    CornerDownLeft,
    Undo,
    Redo,
} from 'lucide-react'

interface ToolbarButtonProps {
    onClick: () => void
    disabled?: boolean
    active?: boolean
    tooltip: string
    children: React.ReactNode
}

const ToolbarButton = ({ onClick, disabled, active, tooltip, children }: ToolbarButtonProps) => {
    return (
        <Tooltip>
            <TooltipTrigger
                render={
                    <Button
                        onClick={onClick}
                        disabled={disabled}
                        variant={active ? 'secondary' : 'ghost'}
                        size="icon-sm"
                        type="button"
                    >
                        {children}
                    </Button>
                }
            />
            <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
    )
}

export const MenuBar = ({ editor }: { editor: Editor }) => {
    const editorState = useEditorState({
        editor,
        selector: menuBarStateSelector,
    })

    const getActiveHeadingLabel = () => {
        if (editorState.isHeading1) return 'Heading 1'
        if (editorState.isHeading2) return 'Heading 2'
        if (editorState.isHeading3) return 'Heading 3'
        if (editorState.isHeading4) return 'Heading 4'
        if (editorState.isHeading5) return 'Heading 5'
        if (editorState.isHeading6) return 'Heading 6'
        return 'Normal Text'
    }

    return (
        <div className="control-group sticky top-0 z-10">
            <div className="button-group border border-b-0 bg-background/95 backdrop-blur-sm border-input rounded-lg rounded-b-none flex flex-wrap items-center gap-1 px-2 py-1">
                {/* History */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editorState.canUndo}
                    tooltip="Undo"
                >
                    <Undo className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editorState.canRedo}
                    tooltip="Redo"
                >
                    <Redo className="size-4" />
                </ToolbarButton>

                <Separator orientation="vertical" className="mx-0.5 h-6" />

                {/* Inline formatting */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editorState.canBold}
                    active={editorState.isBold}
                    tooltip="Bold"
                >
                    <Bold className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editorState.canItalic}
                    active={editorState.isItalic}
                    tooltip="Italic"
                >
                    <Italic className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editorState.canStrike}
                    active={editorState.isStrike}
                    tooltip="Strike"
                >
                    <Strikethrough className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editorState.canCode}
                    active={editorState.isCode}
                    tooltip="Inline Code"
                >
                    <Code className="size-4" />
                </ToolbarButton>

                <Separator orientation="vertical" className="mx-0.5 h-6" />

                {/* Clear options */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                    tooltip="Clear Marks"
                >
                    <RemoveFormatting className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().clearNodes().run()}
                    tooltip="Clear Blocks"
                >
                    <Eraser className="size-4" />
                </ToolbarButton>

                <Separator orientation="vertical" className="mx-0.5 h-6" />

                {/* Heading Dropdown Selection */}
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button variant="ghost" size="sm" className="h-8 gap-1.5 px-2.5 font-normal text-xs" type="button">
                                <span>{getActiveHeadingLabel()}</span>
                                <ChevronDown className="size-3.5 opacity-60" />
                            </Button>
                        }
                    />
                    <DropdownMenuContent align="start" className="w-40">
                        <DropdownMenuItem onClick={() => editor.chain().focus().setParagraph().run()} className="gap-2">
                            <Pilcrow className="size-3.5 opacity-60" />
                            <span>Normal Text</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="gap-2 font-bold">
                            <Heading1 className="size-3.5 opacity-60" />
                            <span>Heading 1</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="gap-2 font-semibold">
                            <Heading2 className="size-3.5 opacity-60" />
                            <span>Heading 2</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className="gap-2 font-medium">
                            <Heading3 className="size-3.5 opacity-60" />
                            <span>Heading 3</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className="gap-2">
                            <Heading4 className="size-3.5 opacity-60" />
                            <span>Heading 4</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} className="gap-2 text-xs">
                            <Heading5 className="size-3.5 opacity-60" />
                            <span>Heading 5</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()} className="gap-2 text-xs">
                            <Heading6 className="size-3.5 opacity-60" />
                            <span>Heading 6</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Separator orientation="vertical" className="mx-0.5 h-6" />

                {/* Lists & Complex Blocks */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editorState.isBulletList}
                    tooltip="Bullet List"
                >
                    <List className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editorState.isOrderedList}
                    tooltip="Ordered List"
                >
                    <ListOrdered className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    active={editorState.isCodeBlock}
                    tooltip="Code Block"
                >
                    <Terminal className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    active={editorState.isBlockquote}
                    tooltip="Quote"
                >
                    <Quote className="size-4" />
                </ToolbarButton>

                <Separator orientation="vertical" className="mx-0.5 h-6" />

                {/* Structure / Breaks */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    tooltip="Horizontal Line"
                >
                    <SeparatorHorizontal className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setHardBreak().run()}
                    tooltip="Line Break"
                >
                    <CornerDownLeft className="size-4" />
                </ToolbarButton>
            </div>
        </div>
    )
}