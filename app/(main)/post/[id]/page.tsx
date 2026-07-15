import Editor from "@/components/editor"
import Reader from "@/components/reader"
import { getPostById } from "@/server/post"

export default async function page(
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const post = await getPostById(id)
    if (!post) {
        return <h1>Post not found</h1>
    }
    return (
        <div className="mx-auto max-w-2xl p-4 mt-10">
            <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
            <div className="mt-4">
            <Reader content={post.content} />
            </div>
        </div>
    )
}