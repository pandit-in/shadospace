import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllPosts } from "@/server/post"
import Link from "next/link"

export default async function Page() {
  const data = await getAllPosts()
  return (
    <div>
      <div className="mx-auto mt-4 flex w-full max-w-2xl flex-col gap-4">
        {data.map(({ post, user }) => (
          <div key={post.id} className="flex flex-col gap-2 border-b pb-4">
            <div className="flex w-fit items-center gap-2 px-4">
              <Link
                href={`/profile/${user.id}`}
                className="flex w-fit items-center gap-2"
              >
                <Avatar className={"size-5"}>
                  <AvatarImage src={user.image ?? undefined} />
                  <AvatarFallback>{user.name?.[0] ?? ""}</AvatarFallback>
                </Avatar>
                <p className="text-sm text-muted-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {post.createdAt.toLocaleDateString()}
                </p>
              </Link>
            </div>
            <div className="px-4">
              <Link
                href={`/post/${post.id}`}
                className="flex w-full items-center gap-2"
              >
                <h1 className="font-mono hover:underline">{post.title}</h1>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
