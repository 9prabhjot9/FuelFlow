"use client"

import { Button } from "@/components/ui/button"
import { useAuth, useUser, SignInButton, SignOutButton } from "@clerk/nextjs"
import { LogIn, LogOut, User } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Ticket } from "lucide-react"

export function AuthButton() {
  const { isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()

  if (!isLoaded) {
    return (
      <Button variant="ghost" size="sm" disabled className="gap-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-teal-500 border-t-transparent"></div>
        <span>Loading...</span>
      </Button>
    )
  }

  if (isSignedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 transition-all duration-300 hover:bg-teal-50 dark:hover:bg-teal-950/30"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={user?.imageUrl || ""} alt={user?.fullName || "User"} />
              <AvatarFallback>{user?.firstName?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline">{user?.firstName}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/my-bookings" className="flex items-center gap-2 cursor-pointer">
              <Ticket className="h-4 w-4" />
              <span>My Bookings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <SignOutButton>
              <div className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </div>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <SignInButton mode="modal">
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 transition-all duration-300 hover:bg-teal-50 dark:hover:bg-teal-950/30"
      >
        <LogIn className="h-4 w-4" />
        <span>Sign in</span>
      </Button>
    </SignInButton>
  )
}
