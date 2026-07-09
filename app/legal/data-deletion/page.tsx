import type { Metadata } from "next"
import { MarkdownLegalDocument } from "@/components/ui/legal-document"
import { getLegalMarkdown, parseLegalMarkdown } from "@/lib/legal-markdown"

export const metadata: Metadata = {
  title: "Data Deletion Policy | Shadospace",
  description:
    "Learn how to request deletion of your account and associated data on Shadospace.",
}

export default async function DataDeletionPage() {
  const document = parseLegalMarkdown(await getLegalMarkdown("data-deletion"))

  return (
    <MarkdownLegalDocument
      title={document.title}
      lastUpdated={document.lastUpdated}
    >
      {document.content}
    </MarkdownLegalDocument>
  )
}
