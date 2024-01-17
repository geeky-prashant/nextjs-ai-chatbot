import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ToastProvider } from '@/components/providers/toast-provider'
import { ThemeProvider } from './ThemeProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '365Bot',
  description: 'Intelligent Notes Taking Bot',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link
            rel="icon"
            href="/icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
          <link
            rel="apple-touch-icon"
            href="/apple-icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
        </head>
        <body className={inter.className}>
          <ToastProvider />
          <ThemeProvider
            attribute="class"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
