"use client"

import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TemporaryDrawer from '@/components/ui/navbar/navbar'
import { RecoilRoot } from 'recoil'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head />
    <body>
    <RecoilRoot>
    <TemporaryDrawer></TemporaryDrawer>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        >
        {children}
      </ThemeProvider>
          </RecoilRoot>
    </body>
  </html>
  )
}
