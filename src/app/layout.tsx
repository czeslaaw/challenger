import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Logo } from "./components/Logo"
import { Search } from "./components/Search"
import "./globals.css"
import { database } from "@/lib/mock-db"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TicketSwap",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locations = await database.getLocations()

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-3xl mx-auto p-4 my-4 grid gap-5">
          <Logo />
          <Search locations={locations} />
          {children}
        </main>
      </body>
    </html>
  )
}
