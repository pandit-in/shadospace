import type { Metadata } from "next"
import { MarkdownLegalDocument } from "@/components/ui/legal-document"
import { getLegalMarkdown, parseLegalMarkdown } from "@/lib/legal-markdown"

export const metadata: Metadata = {
  title: "Privacy Policy | Shadospace",
  description:
    "Learn how Shadospace collects, uses, and protects your account, content, and analytics data.",
}

export default async function PrivacyPage() {
  const document = parseLegalMarkdown(await getLegalMarkdown("privacy"))

  return (
    <MarkdownLegalDocument
      title={document.title}
      lastUpdated={document.lastUpdated}
    >
      {document.content}
    </MarkdownLegalDocument>
  )
}
