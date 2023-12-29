import "./globals.scss"
import Navbar from "@/components/Navbar"
import { Inter } from "next/font/google"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap"
})

export const dynamic = "force-dynamic"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Navbar />
        <div className="container" style={{ marginTop: "3rem" }}>
          {children}
        </div>
      </body>
    </html>
  )
}
