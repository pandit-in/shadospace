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
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react"

export function Header() {
  const { data: session, isPending } = authClient.useSession()
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-3">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={"/logo.png"} alt="logo" width={28} height={28} />
          <h1 className="text-xl font-medium">Shadospace</h1>
        </Link>
        {isPending ? (
          <Skeleton className="h-8 w-8 animate-pulse rounded-full" />
        ) : session?.user ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Avatar>
                    <AvatarImage
                      src={session.user.image ?? ""}
                      alt={session.user.name[0].toUpperCase() ?? ""}
                    />
                    <AvatarFallback>
                      {session.user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                }
              />
              <DropdownMenuContent align="end" className={"w-fit"}>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheckIcon />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCardIcon />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BellIcon />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOutIcon />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link href={"/signup"}>
            <Button>Get Started</Button>
          </Link>
        )}
      </div>
    </header>
  )
}
