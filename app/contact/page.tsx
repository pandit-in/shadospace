import { Metadata } from "next"
import Link from "next/link"
import { Mail, MessageCircle } from "lucide-react"
import { FaGithub, FaTwitter } from "react-icons/fa"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Shadospace team. Share your feedback, report bugs, inquire about collaborations, or connect with us.",
  alternates: {
    canonical: "https://shadospace.in/contact",
  },
  openGraph: {
    title: "Contact Shadospace",
    description:
      "Get in touch with the Shadospace team for feedback, bug reports, and collaborations.",
    url: "https://shadospace.in/contact",
  },
}

export default function ContactPage() {
  return (
    <main className="container mx-auto max-w-3xl px-6 py-20">
      <div className="space-y-16">
        {/* Hero */}
        <section className="space-y-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            We&apos;d Love to Hear From You
          </h1>

          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Have a question, found a bug, want to collaborate, or just want to
            say hello? Feel free to reach out. Every message is appreciated.
          </p>
        </section>

        {/* Contact Card */}
        <section className="rounded-2xl border bg-card p-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-8 w-8 text-primary" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Email</h2>

              <p className="mt-2 text-muted-foreground">
                The fastest way to reach us is by email. Whether it&apos;s
                feedback, support, partnerships, or general inquiries,
                we&apos;ll do our best to get back to you as soon as possible.
              </p>
            </div>

            <Link
              href="mailto:pandit.inn@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              pandit.inn@gmail.com
            </Link>
          </div>
        </section>

        {/* Reasons */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border p-6">
            <h3 className="mb-2 text-lg font-semibold">💡 Feedback</h3>

            <p className="text-sm text-muted-foreground">
              Share your ideas, feature requests, or suggestions to help improve
              Shadospace.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="mb-2 text-lg font-semibold">🐞 Bug Reports</h3>

            <p className="text-sm text-muted-foreground">
              Found something broken? Let us know so we can fix it as quickly as
              possible.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="mb-2 text-lg font-semibold">🤝 Collaborations</h3>

            <p className="text-sm text-muted-foreground">
              Interested in working together or partnering with Shadospace?
              We&apos;d love to hear from you.
            </p>
          </div>
        </section>

        {/* Socials */}
        <section className="rounded-2xl border p-8">
          <h2 className="text-center text-2xl font-semibold">
            Connect With Shadospace
          </h2>

          <p className="mt-3 text-center text-muted-foreground">
            More ways to connect will be available soon.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button
              disabled
              className="flex h-12 w-12 items-center justify-center rounded-lg border opacity-50"
            >
              <FaGithub className="h-5 w-5" />
            </button>

            <button
              disabled
              className="flex h-12 w-12 items-center justify-center rounded-lg border opacity-50"
            >
              <FaTwitter className="h-5 w-5" />
            </button>

            <button
              disabled
              className="flex h-12 w-12 items-center justify-center rounded-lg border opacity-50"
            >
              <MessageCircle className="h-5 w-5" />
            </button>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="rounded-2xl border bg-muted/30 p-10 text-center">
          <h2 className="text-3xl font-bold">
            Let&apos;s Build Something Amazing
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Shadospace is built with the community in mind. Your feedback,
            questions, and ideas help shape the future of the platform.
          </p>

          <Link
            href="mailto:pandit.inn@gmail.com"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Mail className="h-4 w-4" />
            Send an Email
          </Link>
        </section>
      </div>
    </main>
  )
}
