import Reader from "@/components/reader"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { getPostById } from "@/server/post"

import { PostActions } from "@/components/post/post-actions"

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

  const excerpt = post.content.replace(/<[^>]+>/g, "").slice(0, 160).trim()
  const articleUrl = `https://shadospace.in/post/${post.id}`

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: excerpt,
    image: post.thumbnail ? [post.thumbnail] : ["https://shadospace.in/logo.png"],
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt ? post.updatedAt.toISOString() : post.createdAt.toISOString(),
    author: [
      {
        "@type": "Person",
        name: user.name,
        url: `https://shadospace.in/profile/${user.id}`,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Shadospace",
      logo: {
        "@type": "ImageObject",
        url: "https://shadospace.in/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  }

  return (
    <div className="mx-auto mt-6 max-w-2xl p-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
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
          <PostActions postId={post.id} postTitle={post.title} />
        )}
      </div>

      {post.thumbnail && (
        <Image
          src={post.thumbnail}
          alt={post.title}
          width={1000}
          quality={75}
          loading="eager"
          height={1000}
          className="my-6 h-auto w-full rounded-lg object-cover"
        />
      )}

      <div className="mt-4">
        <Reader content={post.content} />
      </div>
    </div>
  )
}

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const result = await getPostById(id)
  if (!result) {
    return {
      title: "Post Not Found",
    }
  }

  const { post, user } = result
  const excerpt = post.content.replace(/<[^>]+>/g, "").slice(0, 160).trim()
  const articleUrl = `https://shadospace.in/post/${post.id}`
  const images = post.thumbnail ? [post.thumbnail] : ["/logo.png"]

  return {
    title: post.title,
    description: excerpt,
    authors: [
      {
        name: user.name ?? "Author",
      },
    ],
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: excerpt,
      url: articleUrl,
      siteName: "Shadospace",
      publishedTime: post.createdAt.toISOString(),
      authors: [user.name ?? "Author"],
      images: images.map((img) => ({
        url: img,
        alt: post.title,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: excerpt,
      images,
    },
  }
}
