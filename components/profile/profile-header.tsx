import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, FileTextIcon } from "lucide-react"

interface ProfileHeaderProps {
  user: {
    id: string
    name: string | null
    email: string
    image: string | null
    createdAt: Date
  }
  postCount: number
  isCurrentUser: boolean
}

export function ProfileHeader({
  user,
  postCount,
  isCurrentUser,
}: ProfileHeaderProps) {
  const username = user.name
    ? `@${user.name.toLowerCase().replaceAll(" ", "")}`
    : "@user"
  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="relative overflow-hidden rounded-xl border bg-card p-6 shadow-xs">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-16 border-2 border-primary/20 sm:size-20">
            <AvatarImage src={user.image ?? undefined} alt={user.name ?? "User"} />
            <AvatarFallback className="text-xl font-bold">
              {user.name?.[0]?.toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                {user.name}
              </h1>
              {isCurrentUser && (
                <Badge variant="outline" className="text-xs">
                  You
                </Badge>
              )}
            </div>
            <p className="text-sm font-medium text-muted-foreground">{username}</p>
            <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CalendarIcon className="size-3.5" />
                Joined {joinedDate}
              </span>
              <span className="flex items-center gap-1">
                <FileTextIcon className="size-3.5" />
                {postCount} {postCount === 1 ? "Post" : "Posts"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
