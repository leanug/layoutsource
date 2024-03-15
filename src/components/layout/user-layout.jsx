import Head from 'next/head'

import { useAuth, useFetchLikedDesigns } from '@/hooks'
import {
  Modal,
  ShowcaseModal,
  Notification,
  Footer,
  AsideMenu,
  SearchBarFull,
  ScreenLoadingIndicator,
} from '@/components'
import HeaderFull from '@/components/layout/header-full'
import useProtectedRoute from '@/hooks/use-protected-route'

/*
 * Layout component for logged in users
 */
export const UserLayout = ({ children }) => {
  const { user, loading, logout } = useAuth()

  useProtectedRoute({ user, loading })

  // Fetch a list of liked designs
  useFetchLikedDesigns(user?.id)

  // Check if user is loading or if user is not logged in
  if (loading || !user) {
    return <ScreenLoadingIndicator />
  }

  // User is logged in
  return (
    <>
      <div className="h-full">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div
          className={`
          text-slate-900 transition duration-300 flex flex-col 
            min-h-screen font-inter dark:text-white
          `}
        >
          <HeaderFull />
          <SearchBarFull />
          <main className={`flex-1`}>{children}</main>
          <Footer />
        </div>
        <AsideMenu user={user} logout={logout} />
      </div>
      <Modal />
      <ShowcaseModal />
      <Notification />
    </>
  )
}
