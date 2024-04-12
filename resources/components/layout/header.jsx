import Link from 'next/link'
import React from 'react'

import {
  Account,
  DarkModeButton,
  Navigation,
  SearchBar,
  MagnifyingGlassSolid,
  CircleXmarkSolid,
  Logo,
} from '@/components'
import { useFullSearchBarStore } from '@/store'

export const Header = ({ user }) => {
  const { toggleBar, isOpen: isFullBarOpen } = useFullSearchBarStore()

  return (
    <header
      className={`
        section-full flex flex-row gap-5 justify-between py-6 
        font-semibold items-center
      `}
    >
      <Link className="block w-40" href={user ? '/designs/homepages' : '/'}>
        <span className="sr-only">Layoutloom home page</span>
        <Logo />
      </Link>
      <div className="hidden xl:flex flex-row gap-5 w-full items-center">
        {user ? <Navigation /> : null}
        {user ? <SearchBar /> : null}
      </div>
      <div className="flex flex-row gap-5 items-center">
        <button className="xl:hidden" onClick={toggleBar}>
          {isFullBarOpen ? (
            <CircleXmarkSolid
              className={`
                w-5 h-5 fill-gray-400 dark:fill-gray-300 
                text-gray-400
              `}
            />
          ) : (
            <MagnifyingGlassSolid
              className={`
                w-5 h-5 fill-gray-400 dark:fill-gray-300 
                text-gray-400
              `}
            />
          )}
        </button>
        <div className="hidden xl:flex flex-row gap-2.5 w-full items-center">
          <DarkModeButton />
          {user ? (
            <Link href="/submit" className="btn min-w-40">
              Submit design
            </Link>
          ) : null}
        </div>
        {user ? <Account user={user} /> : null}
      </div>
    </header>
  )
}
