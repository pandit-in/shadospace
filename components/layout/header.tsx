"use client"

import Link from "next/link"
import Image from "next/image"
import { authClient } from "@/lib/auth-client"
import { Skeleton } from "../ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "@/components/ui/button"

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
          <div className="flex items-center gap-2">
            <Button
              variant={"destructive"}
              onClick={() => authClient.signOut()}
            >
              Sign Out
            </Button>
            <Avatar className="size-8">
              <AvatarImage
                src={
                  session.user.image ||
                  `https://ui-avatars.com/api/?name=${session.user.name}&size=32`
                }
              />
              <AvatarFallback>
                {session.user.name?.slice(0, 2).toUpperCase() || ""}
              </AvatarFallback>
            </Avatar>
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
