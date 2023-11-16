import Link from 'next/link'

import Account from './account'
import { Navigation, SearchBar } from './'

import { useDarkModeStore } from '@/store'

export const Header = ({ toggleMenu }) => {  
  const { toggleDarkMode } = useDarkModeStore()

  const darkModeHandler = () => {
    toggleDarkMode()
  }

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
        <button
          onClick={ darkModeHandler }
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          D
        </button>
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