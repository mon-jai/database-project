import "./globals.scss"
import Navbar from "@/components/Navbar"
import { Inter, Noto_Sans_TC } from "next/font/google"
import { PropsWithChildren } from "react"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

const noto_sans_tc = Noto_Sans_TC({ variable: "--font-noto-sans-tc", preload: false })

export const dynamic = "force-dynamic"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`${inter.variable} ${noto_sans_tc.variable}`}>
      <body className={`${inter.variable} ${noto_sans_tc.variable} d-flex flex-column`}>
        <Navbar />
        <div className="container mb-5 flex-grow-1 d-flex flex-column" style={{ marginTop: "3rem" }}>
          {children}
        </div>
        <footer className="mt-auto py-5 bg-body-tertiary ">
          <div className="container text-body-secondary">
            <p className="mb-1">© 2024 網路商店</p>
            <p className="mb-0">
              <a href="/">Contact us</a> or <a href="/">follow our Instagram</a>.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
