import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { getAllPosts } from "@/server/post"
import { formatDate } from "@/utils/date"
import Image from "next/image"
import Link from "next/link"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home - Platform for Developers by Developers",
  description:
    "Explore articles, code snippets, engineering insights, and tech discussions written by developers on Shadospace.",
  alternates: {
    canonical: "https://shadospace.in",
  },
}

export const revalidate = 0

export default async function Page() {
  const data = await getAllPosts()

  return (
    <div>
      <div className="mx-auto mt-6 flex w-full max-w-2xl flex-col gap-5 px-4 md:px-0">
        {data.map(({ post, user }) => {
          return (
            <article key={post.id}>
              <div className="gap-2 py-2 pb-2 md:px-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link
                      href={`/profile/${user.id}`}
                      className="flex items-center gap-2 text-foreground/80 hover:text-foreground"
                    >
                      <Avatar className="size-4">
                        <AvatarImage src={user.image ?? undefined} />
                        <AvatarFallback>{user.name?.[0] ?? ""}</AvatarFallback>
                      </Avatar>
                      <span>{`@${user.name?.toLowerCase().replaceAll(" ", "")}`}</span>
                    </Link>
                    <span>•</span>
                    <span className="text-xs">
                      {formatDate(new Date(post.createdAt))}
                    </span>
                  </div>

                  <Link href={`/post/${post.id}`}>
                    <h2 className="font-semibold tracking-tight hover:underline">
                      {post.title}
                    </h2>
                  </Link>
                </div>

                <Link
                  href={`/post/${post.id}`}
                  className="relative overflow-hidden"
                >
                  {post.thumbnail ? (
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      width={800}
                      height={600}
                      className="mt-2 h-auto w-full"
                    />
                  ) : (
                    <div className="flex h-40 items-center justify-center border bg-muted/60 text-sm text-muted-foreground sm:h-44">
                      No image
                    </div>
                  )}
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
