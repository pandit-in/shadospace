import type { Metadata } from "next"
import { MarkdownLegalDocument } from "@/components/ui/legal-document"
import { getLegalMarkdown, parseLegalMarkdown } from "@/lib/legal-markdown"

export const metadata: Metadata = {
  title: "Acceptable Use Policy | Shadospace",
  description:
    "Read about our guidelines on what is prohibited on Shadospace, including malware, spam, and service disruptions.",
}

export default async function AcceptableUsePage() {
  const document = parseLegalMarkdown(await getLegalMarkdown("acceptable-use"))

  return (
    <MarkdownLegalDocument
      title={document.title}
      lastUpdated={document.lastUpdated}
    >
      {document.content}
    </MarkdownLegalDocument>
  )
}
