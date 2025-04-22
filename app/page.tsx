import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Droplet, Users } from "lucide-react"
import { FadeIn, SlideUp, SlideInLeft, SlideInRight, StaggerChildren, StaggerItem } from "@/components/animations"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-teal-50 to-white dark:from-teal-950 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <SlideInLeft className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Skip the Queue, Save Your Time
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  FuelFlow is a smart fuel token booking system designed to reduce long queues at petrol pumps. Book a
                  10-minute slot, get a token, and fuel up without waiting.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
                  <Link href="/booking">Book a Slot</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/how-it-works">Learn How It Works</Link>
                </Button>
              </div>
            </SlideInLeft>
            <SlideInRight className="mx-auto lg:ml-auto">
              <Image
                src="/main.webp"
                width={550}
                height={550}
                alt="FuelFlow App Interface"
                className="rounded-xl object-cover"
              />
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Smart Features for a Smooth Experience
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                FuelFlow combines technology with convenience to make your fuel stops efficient and hassle-free.
              </p>
            </div>
          </FadeIn>
          <StaggerChildren className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <StaggerItem>
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Clock className="h-8 w-8 text-teal-500" />
                  <CardTitle>Time Slot Booking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Book a 10-minute time slot in advance and arrive just in time for your turn.
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Droplet className="h-8 w-8 text-teal-500" />
                  <CardTitle>Unique Tokens</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get a unique digital token that guarantees your spot without standing in line.
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Users className="h-8 w-8 text-teal-500" />
                  <CardTitle>Queue Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Real-time updates on current token being served and estimated waiting time.
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Benefits for Everyone</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                A small change that brings a big impact to customers, staff, and the community.
              </p>
            </div>
          </FadeIn>
          <StaggerChildren className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Reduced Crowding",
                description:
                  "Minimize congestion at petrol stations by distributing customer arrivals throughout the day.",
              },
              {
                title: "Helps Senior Citizens",
                description:
                  "Elderly customers can avoid long waits in uncomfortable conditions with our priority booking system.",
              },
              {
                title: "Emergency Support",
                description: "Special provisions for emergency vehicles and drivers who need immediate service.",
              },
              {
                title: "Better Customer Experience",
                description: "Customers enjoy a stress-free, predictable experience without wasting time in queues.",
              },
              {
                title: "Improved Staff Efficiency",
                description: "Station staff can better manage their workflow with predictable customer arrivals.",
              },
              {
                title: "Environmental Impact",
                description: "Reduced idling time in queues means less unnecessary emissions and fuel wastage.",
              },
            ].map((benefit, index) => (
              <StaggerItem key={index}>
                <Card className="transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container px-4 md:px-6">
          <SlideUp className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Skip the Queue?</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Book your fuel slot now and experience the convenience of FuelFlow.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 transition-all duration-300 hover:scale-105"
              >
                <Link href="/booking">Book a Slot Now</Link>
              </Button>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  )
}
