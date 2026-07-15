"use client"

import Link from "next/link"
import Image from "next/image"
import { authClient } from "@/lib/auth-client"
import { Skeleton } from "../ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { toast } from "sonner"
import { PlusIcon, SearchIcon, UserIcon } from "lucide-react"

export function Header() {
  const { data: session, isPending } = authClient.useSession()
  return (
    <header className="sticky top-0 right-0 left-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between py-3 max-w-3xl mx-auto">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={"/logo.png"} alt="logo" width={28} height={28} />
          <h1 className="text-xl font-medium">Shadospace</h1>
        </Link>
    {/* <div className="max-w-md mx-auto">
        <InputGroup>
            <InputGroupInput id="inline-start-input" placeholder="Search..." />
            <InputGroupAddon align="inline-start">
              <SearchIcon className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
          </div> */}
        <div className="flex items-center gap-2">
          
          {
            session?.user ? (
              <div className="flex items-center gap-2">
                <Button render={<Link href={"/new"}  className={"hover:underline"} />}>Create</Button>
              <DropdownMenu>
              <DropdownMenuTrigger>
                {isPending ? (
                  <Skeleton className="h-8 w-8 animate-pulse rounded-full" />
                ) : session?.user && (
                  <div className="flex items-center gap-2">
                    <Avatar className="size-8">
                      <AvatarImage
                        src={
                          session.user.image ||
                          `https://ui-avatars.com/api/?name=${session.user.name}&size=32`
                        }
                      />
                      <AvatarFallback>
                        {session.user.name?.[0].toUpperCase() || ""}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ) }
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44" side="left">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <div>
                    <p className="text-sm font-medium">{session?.user?.name}</p>
                    <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem
                    render={<Link className="hover:underline" href={"/new"} />}
                  >
                    Create
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    render={
                      <Link className="hover:underline" href={"/dashboard"} />
                    }
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    render={
                      <Link className="hover:underline" href={"/profile"} />
                    }
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    render={
                      <Link className="hover:underline" href={"/settings"} />
                    }
                  >
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={async () => {
                      await authClient.signOut()
                      toast.success("Sign out successful")
                    }}
                    variant="destructive"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
            ) : (
              <Button nativeButton={false} render={<Link className="hover:underline" href={"/signup"} />}>Get started</Button>
            )
          }
         
        </div>
      </div>
    </header>
  )
}
