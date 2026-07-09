import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAllPosts } from "@/server/post"

export default async function Page() {
  const posts = await getAllPosts()
  return (
    <div className="mx-auto max-w-2xl p-4">
      <div className="mt-10 flex w-full flex-col gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent>
              <p>{post.title}</p>
              <p>{post.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
