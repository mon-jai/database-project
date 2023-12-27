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
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <body className={inter.variable}>
        <Navbar />
        <div className="container" style={{ marginTop: "3rem" }}>
          {children}
        </div>
      </body>
    </html>
  )
}
