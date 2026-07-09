import type { Metadata } from "next"
import { MarkdownLegalDocument } from "@/components/ui/legal-document"
import { getLegalMarkdown, parseLegalMarkdown } from "@/lib/legal-markdown"

export const metadata: Metadata = {
  title: "Terms of Service | Shadospace",
  description:
    "Read the Terms of Service for using Shadospace, including content ownership, licensing, and prohibited behavior.",
}

export default async function TermsPage() {
  const document = parseLegalMarkdown(await getLegalMarkdown("terms"))

  return (
    <MarkdownLegalDocument
      title={document.title}
      lastUpdated={document.lastUpdated}
    >
      {document.content}
    </MarkdownLegalDocument>
  )
}
