import Head from 'next/head'

import { useAuth, useFetchLikedDesigns } from '@/hooks'
import { LikedDesigns } from '@/api'
import { useDarkModeStore } from '@/store'

import {
  Modal,
  ShowcaseModal,
  Notification,
  Header,
  HeaderUser,
  Footer,
  AsideMenu,
  SearchBarFull,
} from '@/components'

const likedDesignsCtrl = new LikedDesigns()

export const BasicLayout = ({ children }) => {
  const { darkMode } = useDarkModeStore()
  const { user, logout } = useAuth()

  // Fetch all liked designs and save them to the zustand store for liked designs
  useFetchLikedDesigns(user, likedDesignsCtrl)

  return (
    <div className={`relative ${darkMode ? 'dark' : ''}`}>
      <div className="dark:bg-gray-900 h-full">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div
          className={`
          text-slate-900 transition duration-300 flex flex-col 
            min-h-screen font-inter dark:text-white
          `}
        >
          {user ? <HeaderUser /> : <Header />}
          <SearchBarFull />
          <main className={`flex-1`}>{children}</main>
          <Footer />
        </div>
        <AsideMenu user={user} logout={logout} />
      </div>
      <Modal />
      <ShowcaseModal />
      <Notification />
    </div>
  )
}
