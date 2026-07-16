import { getPostById } from "@/server/post"
import EditPostForm from "@/components/forms/edit-post"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const result = await getPostById(id)
  if (!result) {
    return <h1 className="mt-10 text-center text-xl font-semibold">Post not found</h1>
  }
  const { post } = result

  return (
    <EditPostForm
      postId={post.id}
      initialTitle={post.title}
      initialContent={post.content}
      initialThumbnail={post.thumbnail}
    />
  )
}
