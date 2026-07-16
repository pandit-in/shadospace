import Reader from "@/components/reader"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getPostById } from "@/server/post"
import { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import Link from "next/link"

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const result = await getPostById(id)
  if (!result) {
    return <h1>Post not found</h1>
  }
  const { post, user } = result
  return (
    <div className="mx-auto mt-10 max-w-2xl p-4">
      <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
      <Image
        src={post.thumbnail || ""}
        alt={post.title}
        width={800}
        height={400}
        className="my-6 h-64 w-full rounded-lg object-cover"
      />
      <Link
        href={`/profile/${user.id}`}
        className="my-4 flex items-center gap-2"
      >
        <Avatar className="size-6">
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback>{user.name?.[0] ?? ""}</AvatarFallback>
        </Avatar>
        <p className="text-sm text-muted-foreground">{user.name}</p>
        <p className="text-xs text-muted-foreground">
          {post.createdAt.toLocaleDateString()}
        </p>
      </Link>
      <div className="mt-4">
        <Reader content={post.content} />
      </div>
    </div>
  )
}

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
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
