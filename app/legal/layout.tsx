import { Header } from "@/components/layout/header"
import { LegalNav } from "@/components/layout/legal-nav"
import React from "react"

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only rounded-md border border-border bg-background px-4 py-2 font-sans text-sm text-foreground focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Skip to main content
      </a>
      <Header />
      <div className="mx-auto max-w-5xl px-4 py-8 font-sans md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          {/* Sidebar Nav */}
          <aside className="w-full shrink-0 md:w-64">
            <LegalNav />
          </aside>

          {/* Main Content */}
          <main id="main-content" className="min-w-0 flex-1">
            <article className="max-w-3xl">{children}</article>
          </main>
        </div>
      </div>
    </div>
  )
}
