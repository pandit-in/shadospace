import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { accountLinks, companyLinks, legalLinks } from "@/lib/site-links"

export const metadata: Metadata = {
  title: "Contact Us | Shadospace",
  description:
    "Contact Shadospace for support, privacy, copyright, account deletion, and general questions.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <div className="space-y-10">
          <section className="space-y-4 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              Contact
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-pretty sm:text-5xl">
              Talk to Shadospace
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-pretty text-muted-foreground">
              For support, privacy questions, copyright reports, account
              deletion requests, and general inquiries, email us directly.
            </p>
          </section>

          <section className="mx-auto max-w-xl space-y-5 rounded-xl border bg-card p-6 text-center shadow-sm">
            <h2 className="text-xl font-bold text-foreground">
              Primary contact
            </h2>
            <a
              href="mailto:pandit.inn@gmail.com"
              className="block text-base font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              pandit.inn@gmail.com
            </a>
            <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-center">
              <Link href="/signup">
                <Button className="w-full sm:w-auto">Create account</Button>
              </Link>
              <Link href="/signin">
                <Button variant="outline" className="w-full sm:w-auto">
                  Sign in
                </Button>
              </Link>
            </div>
          </section>

          <nav
            aria-label="Contact page links"
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
