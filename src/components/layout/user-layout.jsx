import Head from 'next/head'

import {
  Modal,
  ShowcaseModal,
  Notification,
  Footer,
  Header,
  AsideMenu,
  SearchBarFull,
  ScreenLoadingIndicator,
} from '@/components'
import HeaderFull from '@/components/layout/header-full'
import { useAuth, useFetchLikedDesigns } from '@/hooks'
import { useRouter } from 'next/router'

/*
 * Layout component for logged in users
 */
export const UserLayout = ({ children }) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  console.count('UserLayout')
  // Fetch a list of liked designs
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
          text-slate-900 transition duration-300 flex flex-col 
            min-h-screen font-inter dark:text-white
          `}
        >
          {user ? <HeaderFull /> : <Header />}
          <SearchBarFull />
          <main className={`flex-1`}>{children}</main>
          <Footer />
        </div>
        <AsideMenu />
      </div>
      <Modal />
      <ShowcaseModal />
      <Notification />
    </>
  )
}
