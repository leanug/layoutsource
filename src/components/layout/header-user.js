import Link from 'next/link'

import {
  Account,
  DarkModeButton,
  Navigation,
  SearchBar,
  MagnifyingGlassSolid,
  CircleXmarkSolid,
} from '@/components'
import { useFullSearchBarStore } from '@/store'

export const HeaderUser = () => {
  const { toggleBar, isOpen: isFullBarOpen } = useFullSearchBarStore()

  return (
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
