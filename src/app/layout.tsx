import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VHKD&TTKN quiz made by Vanh',
  description: 'Học đi mấy con lợn',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
