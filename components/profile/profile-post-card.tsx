"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { formatDate } from "@/utils/date"
import { deletePost } from "@/server/post"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2Icon, PencilIcon, Trash2Icon } from "lucide-react"

interface ProfilePostCardProps {
  post: {
    id: string
    title: string
    content: string
    thumbnail: string | null
    createdAt: Date
  }
  isOwner: boolean
}

export function ProfilePostCard({ post, isOwner }: ProfilePostCardProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const excerpt = post.content
    .replace(/<[^>]+>/g, "")
    .slice(0, 240)
    .trim()

  async function handleDelete() {
    try {
      setIsDeleting(true)
      await deletePost(post.id)
      toast.success("Post deleted successfully")
      setIsDialogOpen(false)
      router.refresh()
    } catch {
      toast.error("Failed to delete post")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <article className="group relative rounded-lg border bg-card p-4 transition-all hover:border-foreground/20 hover:shadow-xs">
      <div className="grid gap-4 sm:grid-cols-[1fr_180px] sm:items-center">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">
              {formatDate(new Date(post.createdAt))}
            </span>

            {isOwner && (
              <div className="flex items-center gap-1">
                <Button
                  size="icon-xs"
                  variant="ghost"
                  nativeButton={false}
                  render={<Link href={`/post/${post.id}/edit`} />}
                  title="Edit post"
                >
                  <PencilIcon className="size-3.5" />
                  <span className="sr-only">Edit post</span>
                </Button>

                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <AlertDialogTrigger render={<Button size="icon-xs" variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive" title="Delete post" />}>
                    <Trash2Icon className="size-3.5" />
                    <span className="sr-only">Delete post</span>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete post?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete your post &quot;{post.title}&quot;.
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => {
                          e.preventDefault()
                          handleDelete()
                        }}
                        disabled={isDeleting}
                        variant="destructive"
                      >
                        {isDeleting ? (
                          <>
                            <Loader2Icon className="mr-2 size-4 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          "Delete"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>

          <Link href={`/post/${post.id}`}>
            <h2 className="text-base font-semibold tracking-tight group-hover:text-primary">
              {post.title}
            </h2>
          </Link>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {excerpt}
          </p>
        </div>

        <Link
          href={`/post/${post.id}`}
          className="relative overflow-hidden rounded-md"
        >
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={400}
              height={260}
              className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-36 items-center justify-center bg-muted/60 text-xs text-muted-foreground">
              No thumbnail
            </div>
          )}
        </Link>
      </div>
    </article>
  )
}
