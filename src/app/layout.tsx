import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quiz App - Kiểm tra kiến thức',
  description: 'Ứng dụng quiz để kiểm tra kiến thức với các câu hỏi thú vị',
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
