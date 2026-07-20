import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { getAllPosts } from "@/server/post"
import { formatDate } from "@/utils/date"
import Image from "next/image"
import Link from "next/link"

export default async function Page() {
  const data = await getAllPosts()
  const postsWithVotes = await Promise.all(
    data.map(async ({ post, user }) => ({
      post,
      user,
    }))
  )

  return (
    <div>
      <div className="mx-auto mt-6 flex w-full max-w-2xl flex-col gap-4">
        {postsWithVotes.map(({ post, user }) => (
          <div key={post.id} className="flex flex-col gap-2 pb-4 md:mx-4">
            <div className="px-4 md:px-0">
              <Link
                href={`/profile/${user.id}`}
                className="flex w-fit items-center gap-2"
              >
                <Avatar className={"size-5"}>
                  <AvatarImage src={user.image ?? undefined} />
                  <AvatarFallback>{user.name?.[0] ?? ""}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-foreground/80">
                    {`@${user.name?.toLowerCase().replaceAll(" ", "")}`}
                  </p>
                  {"•"}
                  <small className="text-xs text-muted-foreground">
                    {formatDate(new Date(post.createdAt))}
                  </small>
                </div>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <div className="px-4 md:px-0">
                <Link
                  href={`/post/${post.id}`}
                  className="flex w-full items-center gap-2"
                >
                  <h1 className="text-lg font-semibold hover:underline">
                    {post.title}
                  </h1>
                </Link>
              </div>
            </div>
            <div className="flex w-fit gap-4 px-4 md:px-0">
              <Link href={`/post/${post.id}`}>
                {post.thumbnail && (
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    loading="eager"
                    quality={75}
                    width={1000}
                    height={1000}
                    className="h-auto rounded-md object-cover"
                  />
                )}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
