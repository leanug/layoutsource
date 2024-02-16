import Link from 'next/link'

import Account from './account'
import { Navigation, SearchBar } from './'
import { DarkModeButton, MobileMenuButton } from '@/components'

export const Header = ({ toggleMenu }) => (
  <header
    className={`
      section-full flex flex-row gap-5 justify-between py-6 
      font-semibold items-center
    `}
  >
    <Link href="/">
      <div className="flex items-center gap-28">
        <div className="w-6 h-6 bg-indigo-400"></div>
        Layoutsource
      </div>
    </Link>
    <div className="hidden xl:flex flex-row gap-5 w-full items-center">
      <Navigation />
      <SearchBar />
      <DarkModeButton />
      <Link href="/submit" className="btn-secondary min-w-40">
        Submit design
      </Link>
      <Account toggleMenu={toggleMenu} />
    </div>
    <MobileMenuButton />
  </header>
)
