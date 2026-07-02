import { Header } from "@/components/layout/header"
import React from "react"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-5xl p-3">{children}</div>
    </div>
  )
}
