import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getAllPostsWithVotes } from "@/server/post"
import { Bookmark, Repeat2, Share } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import VoteButtons from "@/components/post/vote-buttons"

export default async function Page() {
  const data = await getAllPostsWithVotes()
  return (
    <div>
      <div className="mx-auto mt-6 flex w-full max-w-2xl flex-col gap-4">
        {data.map(({ post, user, upvotes, downvotes }) => (
          <div
            key={post.id}
            className="flex flex-col gap-2 border-b pb-4 md:mx-4"
          >
            <div className="px-4 md:px-0">
              <Link
                href={`/profile/${user.id}`}
                className="flex w-fit items-center gap-3"
              >
                <Avatar className={"size-7"}>
                  <AvatarImage src={user.image ?? undefined} />
                  <AvatarFallback>{user.name?.[0] ?? ""}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm text-foreground/90">
                    {user.name}{" "}
                    {`@${user.name?.toLowerCase().replaceAll(" ", "")}`}
                  </p>
                  <small className="text-xs text-muted-foreground">
                    {post.createdAt.toLocaleDateString()}
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
                    width={1000}
                    height={1000}
                    className="h-40 rounded-md object-cover md:h-60"
                  />
                )}
              </Link>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2 px-4 md:px-0">
              <div className="flex items-center gap-2">
                <VoteButtons
                  postId={post.id}
                  initialUpvotes={upvotes}
                  initialDownvotes={downvotes}
                />
                <Button variant={"outline"} size={"icon-sm"}>
                  <Repeat2 />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant={"outline"} size={"icon-sm"}>
                  <Bookmark />
                </Button>
                <Button variant={"outline"} size={"icon-sm"}>
                  <Share />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
