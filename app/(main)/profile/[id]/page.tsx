import { Metadata } from "next"
import { notFound } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { getPostsByUserId, getUserById } from "@/server/post"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfilePostCard } from "@/components/profile/profile-post-card"

export const revalidate = 0

interface ProfilePageProps {
  params: Promise<{ id: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const targetUser = await getUserById(id)
  if (!targetUser) {
    notFound()
  }

  const postsData = await getPostsByUserId(id)
  const isOwner = session?.user.id === id

  return (
    <div className="mx-auto mt-6 flex w-full max-w-2xl flex-col gap-6 px-4 md:px-0">
      <ProfileHeader
        user={targetUser}
        postCount={postsData.length}
        isCurrentUser={isOwner}
      />

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold tracking-tight">Posts</h2>
          <span className="text-xs text-muted-foreground">
            {postsData.length} {postsData.length === 1 ? "item" : "items"}
          </span>
        </div>

        {postsData.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground">
              {isOwner
                ? "You haven't created any posts yet."
                : "This user hasn't published any posts yet."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {postsData.map(({ post }) => (
              <ProfilePostCard key={post.id} post={post} isOwner={isOwner} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { id } = await params
  const user = await getUserById(id)
  if (!user) {
    return {
      title: "Profile Not Found",
    }
  }
  return {
    title: `${user.name ?? "User"}'s Profile | Shadospace`,
    description: `View posts created by ${user.name ?? "this user"}.`,
  }
}
