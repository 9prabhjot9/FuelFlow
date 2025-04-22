"use client"

import { useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations"
import Link from "next/link"
import { Calendar, Clock, MapPin, Fuel } from "lucide-react"

export default function MyBookingsPage() {
  const { isLoaded, isSignedIn } = useUser()

  if (!isLoaded) {
    return (
      <div className="container flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
          <p>Loading your bookings...</p>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    redirect("/sign-in?redirect_url=/my-bookings")
  }

  // Mock booking data
  const bookings = [
    {
      id: "1",
      tokenNumber: "A123",
      stationName: "City Center Fuel Station",
      fuelType: "Regular Petrol",
      time: "10:30 AM",
      date: "April 20, 2023",
      status: "completed",
    },
    {
      id: "2",
      tokenNumber: "B456",
      stationName: "Highway Express Pump",
      fuelType: "Premium Petrol",
      time: "2:00 PM",
      date: "Today",
      status: "pending",
    },
    {
      id: "3",
      tokenNumber: "C789",
      stationName: "Suburban Fuel Stop",
      fuelType: "Diesel",
      time: "11:15 AM",
      date: "Tomorrow",
      status: "pending",
    },
  ]

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Bookings</h1>
        <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
          View and manage all your fuel slot bookings
        </p>
      </div>

      <FadeIn>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <StaggerChildren className="grid gap-4">
              {bookings.map((booking) => (
                <StaggerItem key={booking.id}>
                  <Card className="transition-all duration-300 hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="font-medium text-lg">Token: {booking.tokenNumber}</div>
                        <div
                          className={`text-xs px-2 py-1 rounded-full ${
                            booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          }`}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </div>
                      </div>

                      <div className="grid gap-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-teal-500" />
                          <div className="text-sm">{booking.stationName}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Fuel className="h-4 w-4 text-teal-500" />
                          <div className="text-sm">{booking.fuelType}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-teal-500" />
                          <div className="text-sm">{booking.time}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-teal-500" />
                          <div className="text-sm">{booking.date}</div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {booking.status === "pending" && (
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                            Cancel
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </TabsContent>

          <TabsContent value="pending">
            <StaggerChildren className="grid gap-4">
              {bookings
                .filter((b) => b.status === "pending")
                .map((booking) => (
                  <StaggerItem key={booking.id}>
                    <Card className="transition-all duration-300 hover:shadow-md">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <div className="font-medium text-lg">Token: {booking.tokenNumber}</div>
                          <div className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-1 rounded-full">
                            Pending
                          </div>
                        </div>

                        <div className="grid gap-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-teal-500" />
                            <div className="text-sm">{booking.stationName}</div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Fuel className="h-4 w-4 text-teal-500" />
                            <div className="text-sm">{booking.fuelType}</div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-teal-500" />
                            <div className="text-sm">{booking.time}</div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-teal-500" />
                            <div className="text-sm">{booking.date}</div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                ))}
            </StaggerChildren>
          </TabsContent>

          <TabsContent value="completed">
            <StaggerChildren className="grid gap-4">
              {bookings
                .filter((b) => b.status === "completed")
                .map((booking) => (
                  <StaggerItem key={booking.id}>
                    <Card className="transition-all duration-300 hover:shadow-md">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <div className="font-medium text-lg">Token: {booking.tokenNumber}</div>
                          <div className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
                            Completed
                          </div>
                        </div>

                        <div className="grid gap-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-teal-500" />
                            <div className="text-sm">{booking.stationName}</div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Fuel className="h-4 w-4 text-teal-500" />
                            <div className="text-sm">{booking.fuelType}</div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-teal-500" />
                            <div className="text-sm">{booking.time}</div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-teal-500" />
                            <div className="text-sm">{booking.date}</div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                ))}
            </StaggerChildren>
          </TabsContent>
        </Tabs>
      </FadeIn>

      <div className="flex justify-center mt-12">
        <Button asChild className="bg-teal-600 hover:bg-teal-700 transition-all duration-300 hover:scale-105">
          <Link href="/booking">Book a New Slot</Link>
        </Button>
      </div>
    </div>
  )
}
