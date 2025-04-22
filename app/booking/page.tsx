"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Ticket, Calendar, Clock, MapPin, Fuel } from "lucide-react"
import { stations, fuelTypes, getAvailableTimeSlots, createBooking } from "@/lib/data"
import { useRouter } from "next/navigation"
import { SlideUp, ScaleIn } from "@/components/animations"

export default function BookingPage() {
  const router = useRouter()
  const [selectedStation, setSelectedStation] = useState("")
  const [selectedFuelType, setSelectedFuelType] = useState("")
  const [selectedSlot, setSelectedSlot] = useState("")
  const [booking, setBooking] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const timeSlots = getAvailableTimeSlots()

  const handleBooking = () => {
    if (!selectedStation || !selectedFuelType || !selectedSlot) {
      alert("Please select all required fields")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const newBooking = createBooking(
        "user123", // In a real app, this would be the logged-in user's ID
        selectedStation,
        selectedFuelType,
        selectedSlot,
      )

      setBooking(newBooking)
      setIsLoading(false)
    }, 1500)
  }

  const handleNewBooking = () => {
    setBooking(null)
    setSelectedStation("")
    setSelectedFuelType("")
    setSelectedSlot("")
  }

  const getStationName = (id: string) => {
    return stations.find((station) => station.id === id)?.name || ""
  }

  const getFuelTypeName = (id: string) => {
    return fuelTypes.find((fuel) => fuel.id === id)?.name || ""
  }

  const getSlotTime = (id: string) => {
    return timeSlots.find((slot) => slot.id === id)?.time || ""
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Book Your Fuel Slot</h1>
        <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
          Select your preferred station, fuel type, and time slot to get your token.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-md">
        {!booking ? (
          <ScaleIn>
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
                <CardDescription>Fill in the details to book your slot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="station">Select Station</Label>
                  <Select value={selectedStation} onValueChange={setSelectedStation}>
                    <SelectTrigger id="station" className="transition-all duration-200 hover:border-teal-400">
                      <SelectValue placeholder="Select a station" />
                    </SelectTrigger>
                    <SelectContent>
                      {stations.map((station) => (
                        <SelectItem key={station.id} value={station.id}>
                          {station.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fuel-type">Select Fuel Type</Label>
                  <Select value={selectedFuelType} onValueChange={setSelectedFuelType}>
                    <SelectTrigger id="fuel-type" className="transition-all duration-200 hover:border-teal-400">
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      {fuelTypes.map((fuelType) => (
                        <SelectItem key={fuelType.id} value={fuelType.id}>
                          {fuelType.name} - ₹{fuelType.price}/liter
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time-slot">Select Time Slot</Label>
                  <Select value={selectedSlot} onValueChange={setSelectedSlot}>
                    <SelectTrigger id="time-slot" className="transition-all duration-200 hover:border-teal-400">
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot.id} value={slot.id} disabled={!slot.available}>
                          {slot.time} {!slot.available && "(Unavailable)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleBooking}
                  disabled={isLoading || !selectedStation || !selectedFuelType || !selectedSlot}
                  className="w-full bg-teal-600 hover:bg-teal-700 transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      Processing...
                    </div>
                  ) : (
                    "Book Now"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </ScaleIn>
        ) : (
          <ScaleIn>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardHeader className="bg-teal-600 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Booking Confirmed!</CardTitle>
                  <Ticket className="h-6 w-6" />
                </div>
                <CardDescription className="text-teal-100">Your token has been generated successfully</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6 flex flex-col items-center justify-center">
                  <div className="mb-4 rounded-lg border-2 border-dashed border-teal-600 px-8 py-4 animate-pulse">
                    <h2 className="text-center text-3xl font-bold text-teal-600">{booking.tokenNumber}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">Show this token at the station</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-teal-500" />
                    <div>
                      <p className="text-sm font-medium">Station</p>
                      <p className="text-sm text-muted-foreground">{getStationName(booking.stationId)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Fuel className="h-5 w-5 text-teal-500" />
                    <div>
                      <p className="text-sm font-medium">Fuel Type</p>
                      <p className="text-sm text-muted-foreground">{getFuelTypeName(booking.fuelTypeId)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-teal-500" />
                    <div>
                      <p className="text-sm font-medium">Time Slot</p>
                      <p className="text-sm text-muted-foreground">{getSlotTime(booking.slotId)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-teal-500" />
                    <div>
                      <p className="text-sm font-medium">Date</p>
                      <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button
                  onClick={() => router.push("/status")}
                  className="w-full bg-teal-600 hover:bg-teal-700 transition-all duration-300 hover:scale-105"
                >
                  Check Live Status
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNewBooking}
                  className="w-full transition-all duration-300 hover:bg-teal-50 dark:hover:bg-teal-950"
                >
                  Book Another Slot
                </Button>
              </CardFooter>
            </Card>
          </ScaleIn>
        )}
      </div>

      <SlideUp delay={0.3} className="mt-16 rounded-xl bg-muted p-8">
        <h2 className="text-2xl font-bold">Booking Guidelines</h2>
        <ul className="mt-4 space-y-2 text-muted-foreground">
          <li>• Arrive 5 minutes before your scheduled slot</li>
          <li>• Tokens are valid for 15 minutes after the scheduled time</li>
          <li>• You can cancel or reschedule up to 1 hour before your slot</li>
          <li>• Payment to be made at the station</li>
          <li>• Keep your token number handy for verification</li>
        </ul>
      </SlideUp>
    </div>
  )
}
