// app/layout.tsx
'use client'

import './globals.css'
import { SessionProvider } from 'next-auth/react'
import LocaleProvider from './components/Language/LocaleProvider'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ru' suppressHydrationWarning>
      <body className='h-full'>
        <SessionProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
