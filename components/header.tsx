import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Droplet } from "lucide-react"
import { AuthButton } from "./auth-button"

export default function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
          <Droplet className="h-6 w-6 text-teal-500" />
          <span className="text-xl font-bold">FuelFlow</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-all duration-300 hover:text-teal-600 dark:hover:text-teal-400 hover:underline underline-offset-4"
          >
            Home
          </Link>
          <Link
            href="/how-it-works"
            className="text-sm font-medium transition-all duration-300 hover:text-teal-600 dark:hover:text-teal-400 hover:underline underline-offset-4"
          >
            How It Works
          </Link>
          <Link
            href="/booking"
            className="text-sm font-medium transition-all duration-300 hover:text-teal-600 dark:hover:text-teal-400 hover:underline underline-offset-4"
          >
            Book a Slot
          </Link>
          <Link
            href="/status"
            className="text-sm font-medium transition-all duration-300 hover:text-teal-600 dark:hover:text-teal-400 hover:underline underline-offset-4"
          >
            Live Status
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="default"
            size="sm"
            className="bg-teal-600 hover:bg-teal-700 transition-all duration-300 hover:scale-105"
          >
            <Link href="/booking">Book Now</Link>
          </Button>
          <AuthButton />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
