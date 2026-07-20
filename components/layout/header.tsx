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
import { toast } from "sonner"

export function Header() {
  const { data: session, isPending } = authClient.useSession()
  return (
    <header className="sticky top-0 right-0 left-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between p-4">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={"/logo.png"} alt="logo" width={28} height={28} />
          <h1 className="text-xl font-semibold">Shadospace</h1>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-16 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          ) : session ? (
            <DropdownMenu>
              <Button
                variant="outline"
                nativeButton={false}
                render={
                  <Link className="hover:underline" href="/new">
                    Create
                  </Link>
                }
              />
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session.user.image || ""}
                    alt={session.user.name}
                  />
                  <AvatarFallback>
                    {session.user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="inline-start" className="w-fit">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex flex-col gap-1">
                    <span>{session.user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {session.user.email.slice(0, 16)}...
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      await authClient.signOut()
                      toast.success("Signed out successfully")
                    }}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
