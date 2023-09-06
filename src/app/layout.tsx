import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enroute Cesar Gomez Next.js',
  description: 'React and Node application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
