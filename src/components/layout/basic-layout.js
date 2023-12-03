import Head from 'next/head'

import { Header, Footer, AsideMenu } from './'

import { useAside } from '@/hooks'

import { useDarkModeStore } from '@/store'

import { Modal, ShowcaseModal, Notification } from '@/components'

export const BasicLayout = ({ children }) => {
  const { toggleMenu, closeMenu, isOpen } = useAside()
  const { darkMode } = useDarkModeStore();

  return (
    <div className={`relative ${ darkMode ? 'dark' : '' } `}>
      <div className='dark:bg-slate-900 h-full'>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className={ `text-gamma transition duration-300 flex flex-col min-h-screen font-inter dark:text-white` }>
          <Header toggleMenu={ toggleMenu } />
          <main className={`flex-1`}>
            {children}
          </main>
          <Footer />
        </div>
        <AsideMenu 
          isOpen={ isOpen } 
          closeMenu={ closeMenu }
        />
      </div>
      <Modal />
      <ShowcaseModal />
      <Notification />
    </div>
  );
};
