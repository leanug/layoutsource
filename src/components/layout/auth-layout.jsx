import Head from 'next/head'
import { useRouter } from 'next/router'

import {
  BackToTopButton,
  Header,
  Modal,
  ShowcaseModal,
  Notification,
  Footer,
  AsideMenu,
  SearchBarFull,
  ScreenLoadingIndicator,
} from '@/components'
import { useAuth, useAuthProtection, useFetchLikedDesigns } from '@/hooks'

/*
 * Layout component for logged in users
 */
export const AuthLayout = ({ children }) => {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  // Protected routes and username check
  useAuthProtection(user, loading, router)

  // Fetch a list of liked designs and store it
  useFetchLikedDesigns(user?.id)

  if (!router || (loading && !user)) return <ScreenLoadingIndicator />

  return (
    <>
      <div className="h-full">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div
          className={`
          text-gray-950 transition duration-300 flex flex-col 
            min-h-screen font-inter dark:text-white
          `}
        >
          <Header user={user} />
          <SearchBarFull />
          <main className={`flex-1`}>{children}</main>
          <Footer />
        </div>
        <AsideMenu user={user} loading={loading} logout={logout} />
      </div>
      <Modal />
      <ShowcaseModal />
      <Notification />
      <BackToTopButton />
    </>
  )
}
