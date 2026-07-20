import { Spinner } from "@/components/ui/spinner"
import React from "react"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Spinner className="mx-auto mt-20 h-10 w-10 animate-spin text-primary" />
      <p className="mx-auto mt-4 text-center text-muted-foreground">
        Loading...
      </p>
    </div>
  )
}
