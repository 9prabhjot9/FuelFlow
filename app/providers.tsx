"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <ClerkProvider>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ClerkProvider>
  )
}
