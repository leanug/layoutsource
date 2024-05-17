'use client'

import { usePathname } from 'next/navigation'

import {
  Header,
  Footer,
  Modal,
  Notification,
  ShowcaseDesign,
  SetUserDataStore,
  SetUserDesignsData,
} from '@/components'

export function BaseLayout({ children }) {
  const pathname = usePathname()

  // Check if the current route is /auth/signin or /auth/signup
  const isAuthRoute = pathname === '/auth/signin' || pathname === '/auth/signup'

  return (
    <SetUserDataStore>
      <SetUserDesignsData>
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
          <ShowcaseDesign />
        </div>
      </SetUserDesignsData>
    </SetUserDataStore>
  )
}
