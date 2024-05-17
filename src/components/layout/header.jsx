'use client'

import Link from 'next/link'
import React from 'react'

import { useSession } from 'next-auth/react'

import { Navigation, Logo } from '@/components'
import { SearchBar, Account } from '@/containers'

//import { useFullSearchBarStore } from '@/store'

export const Header = () => {
  //const { toggleBar, isOpen: isFullBarOpen } = useFullSearchBarStore()
  const { status } = useSession()

  return (
    <header className="section-full flex flex-row gap-5 justify-between py-6 font-semibold items-center">
      {/* Left */}
      <div className="flex flex-row gap-5 items-center w-1/3">
        {/* Logo */}
        <Link href={status === 'authenticated' ? '/designs/homepages' : '/'}>
          <span className="sr-only">Layoutloom home page</span>
          <Logo />
        </Link>
        {/* End Logo */}
        {status === 'authenticated' && <Navigation />}
      </div>
      {/* End Left */}

      {/* Middle */}
      <div className="flex items-center w-1/3 justify-center">
        {status === 'authenticated' && <SearchBar />}
      </div>
      {/* End Middle */}

      {/* Right */}
      <div className="flex w-1/3 flex-row gap-2.5 items-center justify-end">
        {status !== 'authenticated' ? (
          <Link href="/auth/signin" className="btn btn-neutral">
            Log in
          </Link>
        ) : null}

        {status === 'authenticated' && (
          <Link href="/buy" className="btn btn-primary">
            Buy now
          </Link>
        )}

        {status === 'authenticated' && <Account />}

        {/* <button className="xl:hidden" onClick={toggleBar}>
        {isFullBarOpen ? (
          <CircleXmarkSolid className="w-5 h-5 fill-gray-400 dark:fill-gray-300 text-gray-400" />
        ) : (
          <MagnifyingGlassSolid className="w-5 h-5 fill-gray-400 dark:fill-gray-300 text-gray-400" />
        )}
      </button> */}
      </div>
      {/* End Right */}
    </header>
  )
}
