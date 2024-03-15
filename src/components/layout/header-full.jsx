import Link from 'next/link'
import React from 'react';

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

const HeaderFull = () => {
  const { toggleBar, isOpen: isFullBarOpen } = useFullSearchBarStore()
  console.count('header-full')
  return (
    <header
      className={`
        section-full flex flex-row gap-5 justify-between py-6 
        font-semibold items-center
      `}
    >
      <Link className="block w-40" href="/">
        <span className="sr-only">Layoutsource home page</span>
        <Logo />
      </Link>
      <div className="hidden xl:flex flex-row gap-5 w-full items-center">
        <Navigation />
        <SearchBar />
        <DarkModeButton /> 
        <Link href="/submit" className="btn-secondary min-w-40">
          Submit design
        </Link>
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
        <Account />
      </div>
    </header>
  )
}

export default HeaderFull
