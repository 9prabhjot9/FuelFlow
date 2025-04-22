"use client"

import { useState, Suspense } from "react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeIn } from "@/components/animations"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

function SignOutContent() {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const handleSignOut = async () => {
    setIsLoading(true)
    await signOut({ callbackUrl })
  }

  return (
    <div className="container flex items-center justify-center min-h-[80vh] px-4 py-12">
      <FadeIn>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <LogOut className="h-12 w-12 text-teal-500" />
            </div>
            <CardTitle className="text-2xl font-bold">Sign Out</CardTitle>
            <CardDescription>Are you sure you want to sign out?</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p className="text-sm text-center text-muted-foreground">
              You'll need to sign in again to access your account and bookings.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/">Cancel</Link>
            </Button>
            <Button 
              onClick={handleSignOut}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing out...
                </div>
              ) : "Sign out"}
            </Button>
          </CardFooter>
        </Card>
      </FadeIn>
    </div>
  )
}

export default function SignOut() {
  return (
    <Suspense fallback={
      <div className="container flex items-center justify-center min-h-[80vh] px-4 py-12">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Loading...</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p className="text-sm text-center text-muted-foreground">
              Please wait while we process your request...
            </p>
          </CardContent>
        </Card>
      </div>
    }>
      <SignOutContent />
    </Suspense>
  )
} 