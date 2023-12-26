import "./globals.scss"
import Navbar from "@/components/Navbar"
import { Inter } from "next/font/google"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap"
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
