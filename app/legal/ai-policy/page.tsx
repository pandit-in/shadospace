import type { Metadata } from "next"
import { MarkdownLegalDocument } from "@/components/ui/legal-document"
import { getLegalMarkdown, parseLegalMarkdown } from "@/lib/legal-markdown"

export const metadata: Metadata = {
  title: "AI Content Policy | Shadospace",
  description:
    "Learn about Shadospace's guidelines for publishing and sharing AI-generated content.",
}

export default async function AiPolicyPage() {
  const document = parseLegalMarkdown(await getLegalMarkdown("ai-policy"))

  return (
    <MarkdownLegalDocument
      title={document.title}
      lastUpdated={document.lastUpdated}
    >
      {document.content}
    </MarkdownLegalDocument>
  )
}
