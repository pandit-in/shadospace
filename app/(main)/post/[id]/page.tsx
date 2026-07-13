import { getPostById } from "@/server/post"

export default async function page(
    { params }: { params: { id: string } }
) {
    const post = await getPostById(params.id)
    if (!post) {
        return <h1>Post not found</h1>
    }
    return (
        <div className="mx-auto max-w-2xl p-4">
            <h1 className="text-2xl font-bold">{post[0].title}</h1>
            <div className="text-muted-foreground text-sm space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg [&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:font-mono [&_pre]:text-xs [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono" dangerouslySetInnerHTML={{ __html: post[0].content }} />
        </div>
    )
}