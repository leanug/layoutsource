import Head from 'next/head'

import { useAuth, useFetchLikedDesigns } from '@/hooks'
import {
  Modal,
  ShowcaseModal,
  Notification,
  Footer,
  AsideMenu,
  SearchBarFull,
  Header,
} from '@/components'
import HeaderFull from '@/components/layout/header-full'

/*
 * Layout component for logged in users
 */
export const UserLayout = ({ children }) => {
  const { user, logout } = useAuth()

  console.log('userId= ',user?.id);

  // Fetch a list of liked designs
  useFetchLikedDesigns(user?.id)

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
          {user ? <HeaderFull /> : <Header />}
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
