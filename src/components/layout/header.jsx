'use client'

import Link from 'next/link'
import React from 'react'
import { useSession, signOut } from 'next-auth/react'

import {
  //Account,
  Navigation,
  MagnifyingGlassSolid,
  CircleXmarkSolid,
  Logo,
} from '@/components'
import { SearchBar } from '@/containers'

//import { useFullSearchBarStore } from '@/store'

export const Header = () => {
  //const { toggleBar, isOpen: isFullBarOpen } = useFullSearchBarStore()
  const {status} = useSession()
  const user = false

  return (
    <header
      className={`
        section-full flex flex-row gap-5 justify-between py-6 
        font-semibold items-center
      `}
    >
     

      <div className="hidden xl:flex flex-row gap-5 items-center">
         {/* Logo */}
      <Link className="block w-60" href={user ? '/designs/homepages' : '/'}>
        <span className="sr-only">Layoutloom home page</span>
        <Logo />
      </Link>
      {/* End Logo */}
        {status === 'authenticated' ? <Navigation /> : null}
        {status === 'authenticated' ? <SearchBar /> : null}
      </div>
      <div className="flex flex-row gap-5 items-center">
        {/* <button className="xl:hidden" onClick={toggleBar}>
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
        </button> */}
        {/* {user ? <Account user={user} /> : null} */}
        {status === 'authenticated' ? (
          <>
          <Link href="/support" className="btn btn-outline btn-info">
            Support
          </Link>
          {/* <Link href="/admin" className="btn btn-link">
            Admin
          </Link> */}
          <button onClick={signOut} className="btn">
            Log out
          </button>
          </>
          
        ) : (
          <Link href="/auth/signin" className="btn btn-neutral">
            Log in
          </Link>
        )}
      </div>
    </header>
  )
}
