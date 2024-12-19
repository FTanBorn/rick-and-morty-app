import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rick and Morty App',
  description: 'Character listing app with filters'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
