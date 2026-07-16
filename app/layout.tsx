import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Shadospace",
  description: "A platform for developers by developerss",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
              "antialiased",
              fontMono.variable
            , "font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <TooltipProvider>
            <main>{children}</main>
            <Toaster richColors />
            <Analytics />
            <SpeedInsights />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
