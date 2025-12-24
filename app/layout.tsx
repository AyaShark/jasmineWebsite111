import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jasmine - Discord Music Bot",
  description: "Jasmine is a premium Discord Music Bot for playing music from YouTube and Spotify แล้วอื่นๆอีกหลายอย่าง",
  icons: {
    icon: "https://img5.pic.in.th/file/secure-sv1/111a153edc20de838c.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th">
      <body className="font-sans antialiased bg-[#0f0f0f] text-[#e5e5e5]">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
