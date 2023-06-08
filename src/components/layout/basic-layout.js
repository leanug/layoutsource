import Head from 'next/head';
import Header from './';

const BasicLayout = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={ `text-gamma transition duration-300 flex flex-col h-screen` }>
        <Header />
        <main className={`flex-1 dark:bg-psi dark:text-white`}>
          {children}
        </main>
        <footer>
          <div>footer</div>
        </footer>
      </div>
    </>
  );
};

export default BasicLayout;
