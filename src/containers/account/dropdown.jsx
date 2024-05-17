'use client'

import { useEffect, useRef } from 'react'

import Link from 'next/link'

/**
 * Dropdown Component
 */
export function Dropdown({ signOut, isOpen, setIsOpen, user }) {
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false)
        }
      }

      document.addEventListener('click', handleClickOutside)

      return () => {
        document.removeEventListener('click', handleClickOutside)
      }
    }
  }, [isOpen, setIsOpen])

  return (
    <ul
      ref={dropdownRef}
      tabIndex={0}
      className="absolute top-12 right-0 z-[1] p-4 shadow menu menu-xl dropdown-content bg-base-100 rounded-box w-56"
    >
      <li>
        <Link href={`/${user?.username}`} className="justify-between">
          Profile
        </Link>
      </li>
      <div className="divider"></div>
      <li>
        <Link href={`/${user?.username}/settings`} className="justify-between">
          Settings
        </Link>
      </li>
      <li>
        <Link href={`/support`} className="justify-between">
          Support
        </Link>
      </li>
      <div className="divider"></div>
      <li>
        <button onClick={signOut}>Logout</button>
      </li>
    </ul>
  )
}
