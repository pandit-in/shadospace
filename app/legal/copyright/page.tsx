import type { Metadata } from "next"
import { MarkdownLegalDocument } from "@/components/ui/legal-document"
import { getLegalMarkdown, parseLegalMarkdown } from "@/lib/legal-markdown"

export const metadata: Metadata = {
  title: "Copyright Policy | Shadospace",
  description:
    "Learn how to report intellectual property and copyright infringement on Shadospace.",
}

export default async function CopyrightPage() {
  const document = parseLegalMarkdown(await getLegalMarkdown("copyright"))

  return (
    <MarkdownLegalDocument
      title={document.title}
      lastUpdated={document.lastUpdated}
    >
      {document.content}
    </MarkdownLegalDocument>
  )
}
