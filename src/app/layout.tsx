import type { Metadata } from "next"
import { Inter } from "next/font/google"

import ParentContainer from "src/components/ParentContainer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mainstack",
  description: "Mainstack frontend test",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ParentContainer>{children}</ParentContainer>
      </body>
    </html>
  )
}
