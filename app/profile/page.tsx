"use client"

import { useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FadeIn, SlideUp } from "@/components/animations"
import Link from "next/link"
import { Ticket, User, Settings } from "lucide-react"

export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) {
    return (
      <div className="container flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    redirect("/sign-in?redirect_url=/profile")
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Profile</h1>
        <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
          Manage your account and view your booking history
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <FadeIn>
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user?.imageUrl || ""} alt={user?.fullName || "User"} />
                <AvatarFallback className="text-2xl">{user?.firstName?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{user?.fullName}</CardTitle>
              <CardDescription>{user?.primaryEmailAddress?.emailAddress}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button variant="outline" className="w-full justify-start gap-2" onClick={() => user?.openUserProfile()}>
                <User className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" onClick={() => user?.openUserProfile()}>
                <Settings className="h-4 w-4" />
                Account Settings
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-2">
                <Link href="/my-bookings">
                  <Ticket className="h-4 w-4" />
                  My Bookings
                </Link>
              </Button>
            </CardContent>
          </Card>
        </FadeIn>

        <SlideUp>
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent bookings and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Token: A123</div>
                    <div className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
                      Completed
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    City Center Fuel Station • Regular Petrol • 10:30 AM
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">April 20, 2023</div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Token: B456</div>
                    <div className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-1 rounded-full">
                      Pending
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Highway Express Pump • Premium Petrol • 2:00 PM</div>
                  <div className="text-xs text-muted-foreground mt-1">Today</div>
                </div>

                <div className="flex justify-center mt-6">
                  <Button asChild variant="outline">
                    <Link href="/my-bookings">View All Bookings</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideUp>
      </div>
    </div>
  )
}
