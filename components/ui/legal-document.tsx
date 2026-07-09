import React from "react"

interface LegalDocumentProps {
  title: string
  lastUpdated?: string
  children: React.ReactNode
}

export function LegalDocument({
  title,
  lastUpdated,
  children,
}: LegalDocumentProps) {
  return (
    <div className="space-y-8 font-sans">
      <header className="border-b pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-pretty text-foreground md:text-4xl">
          {title}
        </h1>
        {lastUpdated && (
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        )}
      </header>
      <div className="space-y-6 text-base leading-7 text-muted-foreground">
        {children}
      </div>
    </div>
  )
}

export function MarkdownLegalDocument({
  title,
  lastUpdated,
  children,
}: LegalDocumentProps) {
  return (
    <LegalDocument title={title} lastUpdated={lastUpdated}>
      <div className="space-y-4">{children}</div>
    </LegalDocument>
  )
}

export function LegalSection({
  title,
  id,
  children,
}: {
  title: string
  id: string
  children: React.ReactNode
}) {
  return (
    <section className="scroll-mt-20 space-y-3">
      <h2
        id={id}
        className="text-wrap-balance text-xl font-semibold tracking-tight text-foreground"
      >
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}
