import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"

import "./globals.css"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { cn } from "@/lib/utils"
import { Metadata, Viewport } from "next"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const siteUrl = "https://shadospace.in"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shadospace - Platform for Developers by Developers",
    template: "%s | Shadospace",
  },
  description:
    "Shadospace is a modern platform for developers by developers to share articles, code snippets, engineering insights, and tech discussions.",
  keywords: [
    "developers",
    "shadospace",
    "tech blog",
    "programming",
    "software engineering",
    "coding",
    "web development",
    "react",
    "nextjs",
    "developer community",
  ],
  authors: [{ name: "Shadospace", url: siteUrl }],
  creator: "Pandit Pawar",
  publisher: "Pandit Pawar",
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Shadospace - Platform for Developers by Developers",
    description:
      "A modern platform for developers by developers to share articles, code snippets, engineering insights, and tech discussions.",
    siteName: "Shadospace",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Shadospace Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadospace - Platform for Developers by Developers",
    description:
      "A modern platform for developers by developers to share articles, code snippets, engineering insights, and tech discussions.",
    images: ["/logo.png"],
    creator: "@pandit_inn",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
}

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shadospace",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [],
    description:
      "A modern platform for developers by developers to share articles, code snippets, engineering insights, and tech discussions.",
  }

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shadospace",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <head>
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NCZ7VPW8');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NCZ7VPW8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
