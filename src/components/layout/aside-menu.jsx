import Image from 'next/image'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { DarkModeButton, LoadingIndicator, Navigation } from '@/components'
import { useAsideMenuStore } from '@/store'

import fallbackImg from '@/assets/images/avatar.svg'

export function AsideMenu({ user, logout }) {
  const router = useRouter()
  const menuRef = useRef(null)
  const { isOpen, toggleMenu } = useAsideMenuStore()

  useEffect(() => {
    if (isOpen) {
      const handleOutsideClick = (event) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target) &&
          event.target.closest('[id]')?.id !== 'userAsideMenuButton'
        ) {
          toggleMenu()
        }
      }

      document.addEventListener('click', handleOutsideClick)

      return () => {
        document.removeEventListener('click', handleOutsideClick)
      };
    }
  }, [isOpen, toggleMenu])

  const logoutHandler = () => {
    // Close the menu
    toggleMenu()

    // Perform the logout action (e.g., clearing user data from state or cookies)
    logout()

    // Redirect to the login page
    router.push('/join/sign-in') // Replace '/login' with the actual login route
  }

  // Check if user is still loading
  if (!user) {
    return (
      <div
        ref={menuRef}
        className={`
          absolute top-20 right-0 sm:right-4 bg-white rounded-xl
          max-w-md w-full transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}
        `}
      >
        <div className="my-5">
          <LoadingIndicator />
        </div>
      </div>
    )
  }

  const renderMenuContent = () => {
    return (
      <ul className="p-8 flex flex-col gap-4 border-gray-100 w-full">
        <li className="flex items-center border-b border-gray-100 pb-7">
          <Image
            src={user?.avatar?.url || fallbackImg}
            alt="User Avatar"
            width={20}
            height={20}
            className="w-14 h-14 object-cover rounded-full"
            placeholder="empty"
          />
          <div className="ml-2">
            <p className="text-md font-medium">{user?.name || ''}</p>
            <p className="text-sm text-gray-500">{user?.username || ''}</p>
          </div>
        </li>

        {/* Navigation */}
        <Navigation vertical={ true } />

        {/* Account */}
        <li className="w-full block border-t border-gray-100 pt-5">
          <Link 
            className="w-full block" 
            href={`/${user?.username || ''}`} 
            onClick={toggleMenu}
          >
            Profile
          </Link>
        </li>
        <li className="w-full block">
          <Link 
            className="w-full block" 
            href={`/${user?.username || ''}/liked`} 
            onClick={toggleMenu}
          >
            Liked Designs
          </Link>
        </li>
        <li className="w-full block">
          <Link 
            className="w-full block" 
            href={`/${user?.username || ''}/submited`} 
            onClick={toggleMenu}
          >
            Submited
          </Link>
        </li>
        <li className="w-full block">
          <Link
            className="w-full block"
            href={`/${user?.username || ''}/collections`}
            onClick={toggleMenu}
          >
            Collections
          </Link>
        </li>
        <li className="border-t border-gray-100 pt-5 mt-2">
          <Link
            className="w-full block"
            href={'/account/settings'} 
            onClick={toggleMenu}
          >
            Settings
          </Link>
        </li>
        <li className="border-t border-gray-100 pt-5 mt-2">
          <DarkModeButton />
        </li>
        {user ? (
          <li className="border-t border-gray-100 pt-5 mt-2">
            <button onClick={logoutHandler}>Logout</button>
          </li>
        ) : null}
      </ul>
    )
  }

  return (
    <div
      ref={menuRef}
      className={`
        absolute top-[72px] sm:right-4 bg-white sm:rounded-lg shadow-xl
        sm:max-w-md w-full transition-opacity duration-200
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 hidden'}
      `}
    >
      {renderMenuContent()}
    </div>
  )
}
