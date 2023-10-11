import Link from 'next/link';
import Account from './account';
import { Navigation, SearchBar } from './';

export const Header = ({ toggleMenu }) => {  
  return (
    <header>
      <div className='section-full flex flex-row gap-3 justify-between mb-16 py-6'>
        <div className="flex items-center gap-4">
          <Link href="/">
            LOGO
          </Link>
          <Navigation isOpenSearch={ false } />
        </div>
        <SearchBar />
        <div className='flex flex-row gap-4'>
          <Account toggleMenu={ toggleMenu } />
        </div>
      </div>
    </header>
  );
};