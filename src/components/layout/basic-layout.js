import Head from 'next/head';
import { Header, Footer, AsideMenu } from './';
import { useAside } from '@/hooks';

export const BasicLayout = ({ children }) => {
  const { toggleMenu, closeMenu, isOpen } = useAside()

  return (
    <div className='relative'>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={ `text-gamma transition duration-300 flex flex-col h-screen font-inter` }>
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
      <div id="modal-root"></div>
      <div id="notification-root"></div>
    </div>
  );
};
