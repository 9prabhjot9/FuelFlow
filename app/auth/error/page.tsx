"use client"

import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeIn } from "@/components/animations"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  let errorMessage = "An error occurred during authentication"
  if (error === "OAuthSignin") errorMessage = "Error in OAuth sign in process"
  if (error === "OAuthCallback") errorMessage = "Error in OAuth callback"
  if (error === "OAuthCreateAccount") errorMessage = "Could not create OAuth account"
  if (error === "EmailCreateAccount") errorMessage = "Could not create email account"
  if (error === "Callback") errorMessage = "Error in OAuth callback"
  if (error === "Default") errorMessage = "An authentication error occurred"
  if (error === "AccessDenied") errorMessage = "Access denied - you are not authorized"

  return (
    <div className="container flex items-center justify-center min-h-[80vh] px-4 py-12">
      <FadeIn>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
            <CardDescription>{errorMessage}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p className="text-sm text-center text-muted-foreground">
              There was a problem signing you in. Please try again or contact support if the problem persists.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/auth/signin">Try Again</Link>
            </Button>
          </CardFooter>
        </Card>
      </FadeIn>
    </div>
  )
}

export default function AuthError() {
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
      <AuthErrorContent />
    </Suspense>
  )
} 