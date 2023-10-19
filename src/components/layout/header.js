import Link from 'next/link';
import Account from './account';
import { Navigation, SearchBar } from './';

export const Header = ({ toggleMenu }) => {  
  return (
    <header className='section-full flex flex-row gap-3 justify-between py-6'>
      <div className="flex items-center gap-4">
        <Link href="/">
          LOGO
        </Link>
        <Navigation isOpenSearch={ false } />
      </div>
      <SearchBar />
      
      <div className='flex flex-row gap-4'>
      <Link href="/submit">
        <div className='bg-slate-200 w-40 rounded-md p-2 text-center'>
          Submit design
        </div>
      </Link>
        <Account toggleMenu={ toggleMenu } />
      </div>
    </header>
  );
};