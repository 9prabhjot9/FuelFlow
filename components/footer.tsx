import Link from "next/link"
import { Droplet } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
          <Droplet className="h-5 w-5 text-teal-500" />
          <span className="text-lg font-semibold">FuelFlow</span>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="/"
            className="text-xs transition-all duration-300 hover:text-teal-600 dark:hover:text-teal-400 hover:underline underline-offset-4"
          >
            Home
          </Link>
          <Link
            href="/how-it-works"
            className="text-xs transition-all duration-300 hover:text-teal-600 dark:hover:text-teal-400 hover:underline underline-offset-4"
          >
            How It Works
          </Link>
          <Link
            href="/booking"
            className="text-xs transition-all duration-300 hover:text-teal-600 dark:hover:text-teal-400 hover:underline underline-offset-4"
          >
            Book a Slot
          </Link>
          <Link
            href="/status"
            className="text-xs transition-all duration-300 hover:text-teal-600 dark:hover:text-teal-400 hover:underline underline-offset-4"
          >
            Live Status
          </Link>
        </nav>
        <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} FuelFlow. All rights reserved.</div>
      </div>
    </footer>
  )
}
