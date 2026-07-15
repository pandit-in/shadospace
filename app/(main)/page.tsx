import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAllPosts } from "@/server/post"
import Link from "next/link"

export default async function Page() {
  const data = await getAllPosts()
  return (
    <div>
      <div className="mt-6 max-w-2xl mx-auto flex w-full flex-col p-4 sm:p-2 gap-4">
        <div className="flex items-center gap-2">
          <Button variant={"outline"}>Discover</Button>
          <Button variant={"outline"}>Following</Button>
          <Button variant={"outline"}>Latest</Button>
        </div>
        {data.map(({post, user}) => (
          <Card key={post.id}>
            <CardHeader className="flex items-center gap-2 w-full">
              <Link href={`/profile/${user.id}`} className="flex items-center gap-2 w-full">
                <Avatar className={"size-5"}>
                  <AvatarImage src={user.image ?? undefined} />
                  <AvatarFallback>{user.name?.[0] ?? ""}</AvatarFallback>
                </Avatar>
                <p className="text-sm text-muted-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{post.createdAt.toLocaleDateString()}</p>
              </Link>
            </CardHeader>
            <CardContent className="-mt-1">
            <Link href={`/post/${post.id}`} className="flex items-center gap-2 w-full">
            <CardTitle className="hover:underline font-mono">
            {post.title}
            </CardTitle>
            </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
