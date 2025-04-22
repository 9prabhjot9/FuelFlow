"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Search, AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { getCurrentStatus, getBookingByToken } from "@/lib/data"
import { FadeIn, SlideUp, ScaleIn } from "@/components/animations"

export default function StatusPage() {
  const [status, setStatus] = useState({
    currentToken: "",
    estimatedWaitTime: 0,
    totalPending: 0,
  })

  const [searchToken, setSearchToken] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const [searchError, setSearchError] = useState("")

  useEffect(() => {
    // Get initial status
    const initialStatus = getCurrentStatus()
    setStatus(initialStatus)

    // Update status every 30 seconds
    const interval = setInterval(() => {
      const updatedStatus = getCurrentStatus()
      setStatus(updatedStatus)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleSearch = () => {
    if (!searchToken.trim()) {
      setSearchError("Please enter a token number")
      setSearchResult(null)
      return
    }

    const booking = getBookingByToken(searchToken.trim())

    if (!booking) {
      setSearchError("Token not found. Please check and try again.")
      setSearchResult(null)
    } else {
      setSearchResult(booking)
      setSearchError("")
    }
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Live Status</h1>
        <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
          Check the current token being served and track your booking status.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <Tabs defaultValue="current">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current Status</TabsTrigger>
            <TabsTrigger value="track">Track Your Token</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <ScaleIn>
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle>Live Queue Status</CardTitle>
                  <CardDescription>Real-time information about the current queue</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Now Serving Token</p>
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900 transition-all duration-500 hover:scale-110">
                      <span className="text-2xl font-bold text-teal-700 dark:text-teal-300">{status.currentToken}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="transition-all duration-300 hover:shadow-md hover:bg-teal-50 dark:hover:bg-teal-950/30">
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">Estimated Wait Time</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-teal-500" />
                          <span className="text-2xl font-bold">{status.estimatedWaitTime}</span>
                          <span className="text-muted-foreground">minutes</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="transition-all duration-300 hover:shadow-md hover:bg-teal-50 dark:hover:bg-teal-950/30">
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">Pending Tokens</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">{status.totalPending}</span>
                          <span className="text-muted-foreground">in queue</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <SlideUp delay={0.2} className="rounded-lg bg-muted p-4">
                    <h3 className="mb-2 font-medium">Station Information</h3>
                    <p className="text-sm text-muted-foreground">
                      This status is for City Center Fuel Station. Each station has its own queue and token system.
                    </p>
                  </SlideUp>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full bg-teal-600 hover:bg-teal-700 transition-all duration-300 hover:scale-105"
                  >
                    <Link href="/booking">Book a Slot Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            </ScaleIn>
          </TabsContent>

          <TabsContent value="track">
            <ScaleIn>
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle>Track Your Token</CardTitle>
                  <CardDescription>Enter your token number to check its status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter token (e.g., A123)"
                        value={searchToken}
                        onChange={(e) => setSearchToken(e.target.value)}
                        className="transition-all duration-200 hover:border-teal-400 focus:border-teal-500"
                      />
                    </div>
                    <Button
                      onClick={handleSearch}
                      className="bg-teal-600 hover:bg-teal-700 transition-all duration-300"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </div>

                  {searchError && (
                    <FadeIn className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                      <AlertCircle className="h-5 w-5" />
                      <p className="text-sm">{searchError}</p>
                    </FadeIn>
                  )}

                  {searchResult && (
                    <FadeIn className="rounded-lg border p-4 transition-all duration-300 hover:shadow-md">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold">Token: {searchResult.tokenNumber}</h3>
                        <div
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            searchResult.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500"
                              : searchResult.status === "completed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500"
                          }`}
                        >
                          {searchResult.status.charAt(0).toUpperCase() + searchResult.status.slice(1)}
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Booking Date:</span>
                          <span>{new Date(searchResult.createdAt).toLocaleDateString()}</span>
                        </div>

                        {searchResult.status === "pending" && (
                          <div className="mt-4">
                            <p className="mb-2 text-sm font-medium">Status:</p>
                            {status.currentToken === searchResult.tokenNumber ? (
                              <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-green-600 dark:bg-green-900/20 dark:text-green-400 animate-pulse">
                                <CheckCircle2 className="h-5 w-5" />
                                <p className="text-sm">It's your turn now! Please proceed to the fuel station.</p>
                              </div>
                            ) : (
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Current token being served: <span className="font-medium">{status.currentToken}</span>
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  Your estimated wait time:{" "}
                                  <span className="font-medium">
                                    {Math.max(5, status.estimatedWaitTime * 2)} minutes
                                  </span>
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </FadeIn>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    asChild
                    className="transition-all duration-300 hover:bg-teal-50 dark:hover:bg-teal-950/30"
                  >
                    <Link href="/booking">Book New Slot</Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="transition-all duration-300 hover:bg-teal-50 dark:hover:bg-teal-950/30"
                  >
                    <Link href="/">Back to Home</Link>
                  </Button>
                </CardFooter>
              </Card>
            </ScaleIn>
          </TabsContent>
        </Tabs>
      </div>

      <SlideUp delay={0.3} className="mx-auto mt-16 max-w-3xl rounded-xl bg-muted p-8">
        <h2 className="text-2xl font-bold">Status Information</h2>
        <ul className="mt-4 space-y-2 text-muted-foreground">
          <li>• The status page refreshes automatically every 30 seconds</li>
          <li>• If your token number is being served, please proceed to the designated counter</li>
          <li>• Tokens are valid for 15 minutes after being called</li>
          <li>• If you miss your slot, you'll need to book a new one</li>
          <li>• For any assistance, please contact the station staff</li>
        </ul>
      </SlideUp>
    </div>
  )
}
