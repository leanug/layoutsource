'use client'

import { useState } from 'react'

import Image from 'next/image'

import { useUser } from '@/hooks'
import { Dropdown } from './dropdown'

import fallbackImg from '@/assets/images/avatar.svg'

/**
 * Account Component
 *
 * @component
 * @description Represents the user account component with buttons for user actions.
 *
 * @param {Object} props - The component properties.
 * @param {Object} props.user - The user object, containing user information.
 * @param {Function} props.goToAccount - Function to navigate to the user account page.
 * @param {Function} props.toggleMenu - Function to toggle the user menu.
 * @param {Function} props.goToLogin - Function to navigate to the login page.
 *
 * @returns {JSX.Element} The rendered Account component.
 */
export function Account({ signOut }) {
  const [isOpen, setIsOpen] = useState(false)

  const { user } = useUser()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex flex-row gap-2 pt-1">
      <div className="relative">
        <button
          onClick={toggleDropdown}
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <Image
              src={user?.picture || fallbackImg}
              alt="User Avatar"
              width={'36'}
              height={'36'}
              className="w-full h-full object-cover rounded-full"
              placeholder="empty" // use 'empty' for a blank placeholder
              priority={false}
            />
          </div>
        </button>
        {isOpen ? (
          <Dropdown
            isOpen={isOpen}
            user={user}
            setIsOpen={setIsOpen}
            signOut={signOut}
          />
        ) : null}
      </div>
    </div>
  )
}
