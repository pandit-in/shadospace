import Reader from "@/components/reader"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getPostById, getPostVotesWithUser } from "@/server/post"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import VoteButtons from "@/components/post/vote-buttons"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const { id } = await params
  const result = await getPostById(id)
  if (!result) {
    return <h1>Post not found</h1>
  }
  const { post, user } = result
  const votes = await getPostVotesWithUser(post.id, session?.user.id)

  return (
    <div className="mx-auto mt-6 max-w-2xl p-4">
      <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
      <div className="flex items-center justify-between">
        <Link
          href={`/profile/${user.id}`}
          className="my-4 flex items-center gap-2"
        >
          <Avatar className="size-7">
            <AvatarImage src={user.image ?? undefined} />
            <AvatarFallback>{user.name?.[0] ?? ""}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm text-foreground/90">
              {user.name} {`@${user.name?.toLowerCase().replaceAll(" ", "")}`}
            </p>
            <p className="text-xs text-muted-foreground">
              {post.createdAt.toLocaleDateString()}
            </p>
          </div>
        </Link>
        {session?.user.id === user.id && (
          <Button
            variant={"secondary"}
            nativeButton={false}
            render={<Link href={`/post/${post.id}/edit`} />}
          >
            Edit
          </Button>
        )}
      </div>

      {post.thumbnail && (
        <Image
          src={post.thumbnail}
          alt={post.title}
          width={800}
          height={400}
          className="my-6 h-64 w-full rounded-lg object-cover"
        />
      )}

      <div className="mt-4">
        <Reader content={post.content} />
      </div>

      <div className="mt-6 border-t pt-4">
        <VoteButtons
          postId={post.id}
          initialUpvotes={votes.upvotes}
          initialDownvotes={votes.downvotes}
          initialUserVote={votes.userVote}
        />
      </div>
    </div>
  )
}

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const post = await getPostById(id)
  return {
    title: post.post.title,
    description: post.post.content.slice(0, 40),
    authors: [
      {
        name: post.user.name,
        url: post.user.email,
      },
    ],
  }
}
