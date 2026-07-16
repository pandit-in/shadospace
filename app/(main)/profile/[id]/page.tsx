import { getUserById, getPostsByUserId } from "@/server/post"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"
import { CalendarDays } from "lucide-react"

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [profileUser, posts] = await Promise.all([
    getUserById(id),
    getPostsByUserId(id),
  ])

  if (!profileUser) {
    return <h1 className="mt-10 text-center text-xl font-semibold">User not found</h1>
  }

  return (
    <div className="mx-auto mt-6 w-full max-w-2xl p-4">
      <div className="flex flex-col items-start gap-4">
        <Avatar className="size-20">
          <AvatarImage src={profileUser.image ?? undefined} />
          <AvatarFallback className="text-2xl">
            {profileUser.name?.[0] ?? ""}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {profileUser.name}
          </h1>
          <p className="text-muted-foreground">
            @{profileUser.name?.toLowerCase().replaceAll(" ", "")}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="size-4" />
          <span>Joined {profileUser.createdAt.toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">Posts</h2>
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map(({ post }) => (
              <div
                key={post.id}
                className="flex flex-col gap-2 border-b pb-4"
              >
                <Link
                  href={`/post/${post.id}`}
                  className="flex w-full items-center gap-2"
                >
                  <h3 className="text-lg font-semibold hover:underline">
                    {post.title}
                  </h3>
                </Link>
                {post.thumbnail && (
                  <Link href={`/post/${post.id}`}>
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      width={800}
                      height={400}
                      className="h-40 w-full rounded-md object-cover"
                    />
                  </Link>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{post.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
