import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ComparisonProvider } from "@/context/comparison-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Salford & Co. Real Estate",
  description: "Sri Lanka's premier real estate management platform",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <ComparisonProvider>
            {children}
            <Toaster />
          </ComparisonProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
