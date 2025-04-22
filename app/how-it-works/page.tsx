import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarClock, Ticket, Car } from "lucide-react"
import { FadeIn, SlideUp, StaggerChildren, StaggerItem } from "@/components/animations"

export default function HowItWorks() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <FadeIn className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How FuelFlow Works</h1>
        <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
          Our 3-step booking system makes getting fuel quick and convenient. Here's how it works.
        </p>
      </FadeIn>

      <StaggerChildren className="mt-16 grid gap-8 md:grid-cols-3">
        <StaggerItem>
          <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-2xl font-bold text-teal-800 dark:bg-teal-900 dark:text-teal-100">
              1
            </div>
            <CardHeader className="pt-8">
              <CardTitle className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-teal-500" />
                Book a Time Slot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Choose a convenient 10-minute time slot from the available options. Select your preferred petrol station
                and fuel type.
              </p>
              <Image
                src="/gas.jpeg"
                width={400}
                height={200}
                alt="Booking calendar interface"
                className="mt-4 rounded-lg object-cover h-[200px] w-full"
              />
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-2xl font-bold text-teal-800 dark:bg-teal-900 dark:text-teal-100">
              2
            </div>
            <CardHeader className="pt-8">
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5 text-teal-500" />
                Receive Your Token
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get a unique digital token with your booking details. This token is your pass to skip the regular queue.
              </p>
              <Image
                src="/token.png"
                width={400}
                height={200}
                alt="Digital token display"
                className="mt-4 rounded-lg object-cover h-[200px] w-full"
              />
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-2xl font-bold text-teal-800 dark:bg-teal-900 dark:text-teal-100">
              3
            </div>
            <CardHeader className="pt-8">
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-teal-500" />
                Skip the Queue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Arrive at your scheduled time, show your token to the attendant, and get served immediately without
                waiting in line.
              </p>
              <Image
                src="/queu.jpg"
                width={400}
                height={200}
                alt="Person skipping queue at petrol pump"
                className="mt-4 rounded-lg object-cover h-[200px] w-full"
              />
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerChildren>

      <SlideUp delay={0.3} className="mt-16 rounded-xl bg-muted p-8">
        <h2 className="text-2xl font-bold">Important Information</h2>
        <ul className="mt-4 space-y-2 text-muted-foreground">
          <li>• Arrive 5 minutes before your scheduled slot</li>
          <li>• Tokens are valid for 15 minutes after the scheduled time</li>
          <li>• You can cancel or reschedule up to 1 hour before your slot</li>
          <li>• Priority service for emergency vehicles and senior citizens</li>
          <li>• Check the Live Status page to see the current token being served</li>
        </ul>
      </SlideUp>

      <FadeIn delay={0.5} className="mt-16 flex flex-col items-center justify-center space-y-4 text-center">
        <h2 className="text-2xl font-bold">Ready to Try It?</h2>
        <p className="max-w-[600px] text-muted-foreground">
          Book your first fuel slot now and experience the convenience of FuelFlow.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-2 bg-teal-600 hover:bg-teal-700 transition-all duration-300 hover:scale-105"
        >
          <Link href="/booking">Book a Slot Now</Link>
        </Button>
      </FadeIn>
    </div>
  )
}
