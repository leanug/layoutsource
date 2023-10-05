import Head from 'next/head';
import { Header, Footer } from './';

export const BasicLayout = ({ children }) => {
  return (
    <div className='relative'>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={ `text-gamma transition duration-300 flex flex-col h-screen font-inter` }>
        <Header />
        <main className={`flex-1`}>
          {children}
        </main>
        <Footer />
      </div>
      <div id="modal-root"></div>
      <div id="notification-root"></div>
    </div>
  );
};
