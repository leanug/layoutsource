import { Inter } from 'next/font/google'
import './globals.css'

import { BaseLayout, NextAuthProvider } from '@/components'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Layoutloom - Discover Creative Website Designs for Your Projects',
  description: `Explore endless inspiration for your creative designs and projects with Layoutloom. 
     Discover curated website designs to ignite creativity and foster innovation.`,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <BaseLayout>{children}</BaseLayout>
        </NextAuthProvider>
      </body>
    </html>
  )
}
