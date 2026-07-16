"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileRedirect() {
  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && session?.user?.id) {
      router.replace(`/profile/${session.user.id}`)
    }
  }, [session, isPending, router])

  if (isPending) {
    return (
      <div className="mx-auto mt-10 w-full max-w-2xl p-4">
        <div className="flex flex-col items-start gap-4">
          <Skeleton className="size-20 rounded-full" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return (
      <h1 className="mt-10 text-center text-xl font-semibold">
        Please sign in to view your profile.
      </h1>
    )
  }

  return null
}
