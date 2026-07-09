import type { Metadata } from "next"
import { MarkdownLegalDocument } from "@/components/ui/legal-document"
import { getLegalMarkdown, parseLegalMarkdown } from "@/lib/legal-markdown"

export const metadata: Metadata = {
  title: "Community Guidelines | Shadospace",
  description:
    "Read the Shadospace community guidelines to ensure a respectful, safe, and collaborative platform.",
}

export default async function CommunityPage() {
  const document = parseLegalMarkdown(await getLegalMarkdown("community"))

  return (
    <MarkdownLegalDocument
      title={document.title}
      lastUpdated={document.lastUpdated}
    >
      {document.content}
    </MarkdownLegalDocument>
  )
}
