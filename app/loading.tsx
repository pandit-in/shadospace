import { Spinner } from "@/components/ui/spinner"
import React from "react"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Spinner className="mx-auto mt-20 h-8 w-8 animate-spin text-primary" />
    </div>
  )
}
