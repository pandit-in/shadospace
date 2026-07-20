import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function RightSidebar() {
  return (
    <Sidebar
      side="right"
      collapsible="icon"
      variant="floating"
      className="mt-18 mr-4 w-68 pb-10"
    >
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="mb-2 font-semibold">
                Popular today
              </SidebarMenuItem>
              <SidebarMenuItem className="hover:underline">
                <Link href={"/"}>thread 1 is very popular today</Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
