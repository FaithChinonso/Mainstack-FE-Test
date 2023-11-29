import type { Metadata } from "next"
import ParentContainer from "../components/ParentContainer"
import "./globals.css"

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
      <body>
        <ParentContainer>{children}</ParentContainer>
      </body>
    </html>
  )
}
