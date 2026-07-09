"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { accountLinks, companyLinks, legalLinks } from "@/lib/site-links"

export function LegalNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-row flex-wrap gap-1 md:sticky md:top-20 md:flex-col md:gap-1">
      <div className="mb-2 hidden border-b pb-2 md:block">
        <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Legal Documents
        </h2>
      </div>
      {legalLinks.map((link) => {
        const isActive = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
              isActive
                ? "bg-secondary font-semibold text-secondary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {link.label}
          </Link>
        )
      })}
      <div className="mt-3 flex flex-wrap gap-1 border-t pt-3 md:flex-col">
        {[...companyLinks, ...accountLinks].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
