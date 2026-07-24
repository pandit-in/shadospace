import { Header } from "@/components/layout/header"
// import Footer from "@/components/layout/footer"
import { SidebarProvider } from "@/components/ui/sidebar"
import React from "react"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <SidebarProvider>
        {/* <AppSidebar /> */}
        <div className="w-full flex-1">{children}</div>
        {/* <RightSidebar /> */}
      </SidebarProvider>
      {/* <Footer /> */}
    </div>
  )
}
