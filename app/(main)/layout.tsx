import { Header } from "@/components/layout/header"
import { SidebarProvider } from "@/components/ui/sidebar"
import React from "react"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      <SidebarProvider>
        {/* <AppSidebar /> */}
        <div className="w-full">{children}</div>
        {/* <RightSidebar /> */}
      </SidebarProvider>
    </div>
  )
}
