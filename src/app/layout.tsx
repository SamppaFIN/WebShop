import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { Navbar } from "@/components/layout/Navbar"
import { CartDrawer } from "@/components/layout/CartDrawer"
import { Footer } from "@/components/layout/Footer"
import { Starfield } from "@/components/layout/Starfield"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: { default: "WebShop", template: "%s | WebShop" },
  description: "Moderni verkkokauppa — löydä mitä tarvitset",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased bg-transparent">
        <Starfield />
        <ThemeProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1 relative z-10 bg-background/30">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
