import type { Metadata } from "next"
import { MarkdownLegalDocument } from "@/components/ui/legal-document"
import { getLegalMarkdown, parseLegalMarkdown } from "@/lib/legal-markdown"

export const metadata: Metadata = {
  title: "Cookie Policy | Shadospace",
  description:
    "Learn how Shadospace uses cookies to manage authentication, preferences, analytics, and advertising.",
}

export default async function CookiePage() {
  const document = parseLegalMarkdown(await getLegalMarkdown("cookies"))

  return (
    <MarkdownLegalDocument
      title={document.title}
      lastUpdated={document.lastUpdated}
    >
      {document.content}
    </MarkdownLegalDocument>
  )
}
