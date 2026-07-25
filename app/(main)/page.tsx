import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/server/post"
import { formatDate } from "@/utils/date"
import {
  ArrowBigDownDashIcon,
  ArrowBigUpDashIcon,
  ArrowBigUpIcon,
  Bookmark,
  BookmarkIcon,
  MessageCircle,
  MessageSquare,
  MessageSquareText,
  MessagesSquare,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default async function Page() {
  const data = await getAllPosts()

  return (
    <div>
      <div className="mx-auto mt-6 flex w-full max-w-2xl flex-col gap-5 px-4 md:px-0">
        {data.map(({ post, user }) => {
          const excerpt = post.content
            .replace(/<[^>]+>/g, "")
            .slice(0, 240)
            .trim()

          return (
            <article key={post.id}>
              <div className="grid gap-4 py-2 pb-6 sm:grid-cols-[1fr_220px] sm:items-center md:px-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link
                      href={`/profile/${user.id}`}
                      className="flex items-center gap-2 text-foreground/80 hover:text-foreground"
                    >
                      <Avatar className="size-5">
                        <AvatarImage src={user.image ?? undefined} />
                        <AvatarFallback>{user.name?.[0] ?? ""}</AvatarFallback>
                      </Avatar>
                      <span>{`@${user.name?.toLowerCase().replaceAll(" ", "")}`}</span>
                    </Link>
                    <span>•</span>
                    <span>{formatDate(new Date(post.createdAt))}</span>
                  </div>

                  <Link href={`/post/${post.id}`}>
                    <h2 className="text-base font-semibold tracking-tight hover:text-red-700 hover:underline">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="line-clamp-2 text-sm text-foreground/75">
                    {excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button size="icon-sm" variant="ghost">
                        <ArrowBigUpDashIcon />
                      </Button>
                      <Button size="icon-sm" variant="ghost">
                        <ArrowBigDownDashIcon />
                      </Button>
                      <Button size="icon-sm" variant="ghost">
                        <MessageSquareText className="size-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon-sm" variant="ghost">
                        <BookmarkIcon className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/post/${post.id}`}
                  className="relative overflow-hidden rounded-md"
                >
                  {post.thumbnail ? (
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      width={800}
                      height={600}
                      className="h-auto w-full"
                    />
                  ) : (
                    <div className="flex h-40 items-center justify-center bg-muted/60 text-sm text-muted-foreground sm:h-44">
                      No image
                    </div>
                  )}
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
