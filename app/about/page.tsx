import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { accountLinks, companyLinks, legalLinks } from "@/lib/site-links"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us | Shadospace",
  description:
    "Learn about Shadospace, a platform for developers, creators, and learners to publish articles, showcase projects, and collaborate.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              Our Mission
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-pretty sm:text-5xl md:text-6xl">
              Building the space for developers
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-pretty text-muted-foreground">
              Shadospace is a platform for developers, creators, and learners to
              publish articles, showcase projects, and collaborate.
            </p>
          </div>

          {/* Pillars grid */}
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <h2 className="mb-2 text-lg font-bold text-foreground">
                Publish Articles
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Share your insights, tutorials, and experiences with a community
                of developer peers.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <h2 className="mb-2 text-lg font-bold text-foreground">
                Showcase Projects
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Present your builds, open-source work, and side projects to gain
                feedback and traction.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <h2 className="mb-2 text-lg font-bold text-foreground">
                Collaborate
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Connect with like-minded individuals, find co-founders, and
                build the future together.
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="mx-auto max-w-lg space-y-4 rounded-2xl border bg-muted/50 p-8 text-center">
            <h3 className="text-xl font-bold">Ready to join Shadospace?</h3>
            <p className="text-sm text-muted-foreground">
              Create an account today and start sharing your journey with
              developers worldwide.
            </p>
            <div className="pt-2">
              <Link href="/signup">
                <Button className="w-full px-6 sm:w-auto">Get Started</Button>
              </Link>
            </div>
          </div>

          <nav
            aria-label="About page links"
            className="flex flex-wrap justify-center gap-x-4 gap-y-2 border-t pt-8 text-sm text-muted-foreground"
          >
            {[...accountLinks, ...companyLinks, ...legalLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </main>
    </div>
  )
}
