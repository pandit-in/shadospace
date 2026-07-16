"use client"

import { useState } from "react"
import { ArrowBigUp, ArrowBigDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toggleVote } from "@/server/post"
import { authClient } from "@/lib/auth-client"

interface VoteButtonsProps {
  postId: string
  initialUpvotes: number
  initialDownvotes: number
  initialUserVote?: "upvote" | "downvote" | null
}

export default function VoteButtons({
  postId,
  initialUpvotes,
  initialDownvotes,
  initialUserVote = null,
}: VoteButtonsProps) {
  const { data: session } = authClient.useSession()
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [downvotes, setDownvotes] = useState(initialDownvotes)
  const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(
    initialUserVote
  )
  const [isPending, setIsPending] = useState(false)

  const score = upvotes - downvotes

  async function handleVote(type: "upvote" | "downvote") {
    if (!session?.user?.id || isPending) return

    setIsPending(true)
    const prevUserVote = userVote
    const prevUpvotes = upvotes
    const prevDownvotes = downvotes

    if (userVote === type) {
      setUserVote(null)
      if (type === "upvote") setUpvotes((v) => v - 1)
      else setDownvotes((v) => v - 1)
    } else {
      setUserVote(type)
      if (type === "upvote") {
        setUpvotes((v) => v + 1)
        if (prevUserVote === "downvote") setDownvotes((v) => v - 1)
      } else {
        setDownvotes((v) => v + 1)
        if (prevUserVote === "upvote") setUpvotes((v) => v - 1)
      }
    }

    try {
      await toggleVote(postId, session.user.id, type)
    } catch {
      setUserVote(prevUserVote)
      setUpvotes(prevUpvotes)
      setDownvotes(prevDownvotes)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant={userVote === "upvote" ? "default" : "outline"}
        size="icon-sm"
        onClick={() => handleVote("upvote")}
        disabled={!session?.user?.id || isPending}
      >
        <ArrowBigUp className={userVote === "upvote" ? "fill-current" : ""} />
      </Button>
      <span className="min-w-[2ch] text-center text-sm font-medium">
        {score}
      </span>
      <Button
        variant={userVote === "downvote" ? "default" : "outline"}
        size="icon-sm"
        onClick={() => handleVote("downvote")}
        disabled={!session?.user?.id || isPending}
      >
        <ArrowBigDown
          className={userVote === "downvote" ? "fill-current" : ""}
        />
      </Button>
    </div>
  )
}
