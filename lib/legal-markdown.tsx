import { cache, Fragment } from "react"
import { readFile } from "node:fs/promises"
import path from "node:path"
import type { ReactNode } from "react"

const legalMarkdownFiles = {
  "acceptable-use": "Acceptable_Use_Policy.md",
  "ai-policy": "AI_Content_Policy.md",
  community: "Community_Guidelines.md",
  cookies: "Cookie_Policy.md",
  copyright: "Copyright_Policy.md",
  "data-deletion": "Data_Deletion_Policy.md",
  privacy: "Privacy_Policy.md",
  terms: "Terms_of_Service.md",
} as const

export type LegalDocumentSlug = keyof typeof legalMarkdownFiles

interface ParsedLegalMarkdown {
  title: string
  lastUpdated?: string
  content: ReactNode
}

const inlineTokenPattern = /(https?:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g

export const getLegalMarkdown = cache(async (slug: LegalDocumentSlug) => {
  const filePath = path.join(process.cwd(), legalMarkdownFiles[slug])

  return readFile(filePath, "utf8")
})

export function parseLegalMarkdown(markdown: string): ParsedLegalMarkdown {
  const lines = markdown.replace(/\r\n/g, "\n").trim().split("\n")
  const title = lines[0]?.replace(/^#\s+/, "").trim() || "Legal Document"
  let lastUpdated: string | undefined
  const blocks: ReactNode[] = []
  let paragraphLines: string[] = []

  const flushParagraph = () => {
    if (paragraphLines.length === 0) {
      return
    }

    const text = paragraphLines.join(" ").trim()
    paragraphLines = []

    if (!text) {
      return
    }

    if (text.toLowerCase().startsWith("last updated:")) {
      lastUpdated = text.replace(/^last updated:\s*/i, "")
      return
    }

    blocks.push(<p key={`p-${blocks.length}`}>{renderInlineText(text)}</p>)
  }

  for (const line of lines.slice(1)) {
    const trimmedLine = line.trim()

    if (!trimmedLine) {
      flushParagraph()
      continue
    }

    if (trimmedLine.startsWith("## ")) {
      flushParagraph()
      const heading = trimmedLine.replace(/^##\s+/, "").trim()
      blocks.push(
        <h2
          key={`h2-${blocks.length}`}
          className="text-wrap-balance text-xl font-semibold tracking-normal text-foreground"
        >
          {heading}
        </h2>
      )
      continue
    }

    paragraphLines.push(trimmedLine)
  }

  flushParagraph()

  return {
    title,
    lastUpdated,
    content: blocks,
  }
}

function renderInlineText(text: string) {
  const parts = text.split(inlineTokenPattern)

  return parts.map((part, index) => {
    if (!part) {
      return null
    }

    if (part.startsWith("http")) {
      const { token, trailingPunctuation } = splitTrailingPunctuation(part)

      return (
        <Fragment key={`${part}-${index}`}>
          <a
            href={token}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4 transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {token}
          </a>
          {trailingPunctuation}
        </Fragment>
      )
    }

    if (part.includes("@")) {
      return (
        <Fragment key={`${part}-${index}`}>
          <a
            href={`mailto:${part}`}
            className="text-foreground underline underline-offset-4 transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {part}
          </a>
        </Fragment>
      )
    }

    return <Fragment key={`${part}-${index}`}>{part}</Fragment>
  })
}

function splitTrailingPunctuation(token: string) {
  const trailingPunctuation = token.match(/[.,;:!?]+$/)?.[0] ?? ""

  return {
    token: trailingPunctuation
      ? token.slice(0, -trailingPunctuation.length)
      : token,
    trailingPunctuation,
  }
}
