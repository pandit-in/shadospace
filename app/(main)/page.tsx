import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAllPosts } from "@/server/post"
import Link from "next/link"

export default async function Page() {
  const data = await getAllPosts()
  return (
    <div>
      <div className="pt-10 max-w-3xl mx-auto flex w-full flex-col gap-4">
        <div className="flex items-center gap-2">
          <Button variant={"outline"}>Discover</Button>
          <Button variant={"outline"}>Following</Button>
          <Button variant={"outline"}>Latest</Button>
        </div>
        {data.map(({post, user}) => (
          <Card key={post.id}>
            <CardHeader className="flex items-center gap-2 w-full">
              <Link href={`/profile/${user.id}`} className="flex items-center gap-2 w-full">
                <Avatar className={"size-6"}>
                  <AvatarImage src={user.image ?? undefined} />
                  <AvatarFallback>{user.name?.[0] ?? ""}</AvatarFallback>
                </Avatar>
                <p className="text-sm">{user.name}</p>
                <p className="text-xs text-muted-foregroun">{post.createdAt.toLocaleDateString()}</p>
              </Link>
            </CardHeader>
            <CardContent>
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
