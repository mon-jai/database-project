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
        <div className="container mb-5" style={{ marginTop: "3rem" }}>
          {children}
        </div>
        <footer className="text-body-secondary bg-body-tertiary py-5">
          <div className="container">
            <p className="mb-1">© 2024 網路商店</p>
            <p className="mb-0">
              <a href="/">Contact us</a> or{" "}
              <a href="/">follow our Instagram</a>.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
