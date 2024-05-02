'use client'

import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { Header, Footer, Modal, Notification } from '@/components'
import { useUser } from '@/hooks'

export function BaseLayout({ children }) {
  const pathname = usePathname()
  const { status, data } = useSession()
  useUser(status, data?.user) // Set user data

  // Check if the current route is /auth/signin or /auth/signup
  const isAuthRoute = pathname === '/auth/signin' || pathname === '/auth/signup'

  return (
    <div className="relative">
      <div className="h-full">
        <div className="transition duration-300 flex flex-col min-h-screen font-inter">
          {/* Conditionally render the Header based on the route */}
          {!isAuthRoute && <Header />}
          <main className={`flex-1`}>{children}</main>
          {/* Conditionally render the Footer based on the route */}
          {!isAuthRoute && <Footer />}
        </div>
      </div>
      <Modal />
      <Notification />
    </div>
  )
}
