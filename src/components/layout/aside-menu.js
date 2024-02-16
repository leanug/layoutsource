import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { LoadingIndicator } from '@/components'

import fallbackImg from '@/assets/images/avatar.svg'

export function AsideMenu({ isOpen, closeMenu, user, logout }) {
  const router = useRouter()
  const menuRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      const handleOutsideClick = (event) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target) &&
          event.target.closest('[id]')?.id !== 'userAsideMenuButton'
        ) {
          closeMenu()
        }
      }

      document.addEventListener('click', handleOutsideClick)

      return () => {
        document.removeEventListener('click', handleOutsideClick)
      };
    }
  }, [isOpen, closeMenu])

  const logoutHandler = () => {
    // Close the menu
    closeMenu()

    // Perform the logout action (e.g., clearing user data from state or cookies)
    logout()
    
    // Redirect to the login page
    router.push('/join/sign-in') // Replace '/login' with the actual login route
  }

  // Check if user is still loading
  if (! user) {
    return (
      <div 
        ref={ menuRef } 
        className={`
          absolute top-20 right-4 bg-white rounded-md shadow 
          max-w-xs w-full transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}
        `}
      >
        <div className='my-5'>
          <LoadingIndicator />
        </div>
      </div>
    )
  }

  const renderMenuContent = () => {
    if (!user) {
      return (
        <div className='my-5'>
          <LoadingIndicator />
        </div>
      );
    }
  
    return (
      <ul className='p-8 flex flex-col gap-4'>
        <li className="flex items-center mb-1.5">
          <Image
            src={ user?.avatar?.url || fallbackImg }
            alt="User Avatar"
            width={20}
            height={20}
            className="w-14 h-14 object-cover rounded-full"
            placeholder="empty"
          />
          <div className="ml-2">
            <p className="text-md font-medium">{ user?.name || '' }</p>
            <p className="text-sm text-gray-500">{ user?.username || '' }</p>
          </div>
        </li>
        <li>
          <Link 
            href={`/${ user?.username || '' }`} 
            onClick={ closeMenu }
          >Profile</Link>
        </li>
        <li>
          <Link 
            href={`/${ user?.username || '' }/liked`} 
            onClick={ closeMenu }
          >Liked Designs</Link>
        </li>
        <li>
          <Link 
            href={`/${ user?.username || '' }/submited`} 
            onClick={ closeMenu }
          >Submited</Link>
        </li>
        <li>
          <Link 
            href={`/${ user?.username || '' }/collections`} 
            onClick={ closeMenu }
          >Collections</Link>
        </li>
        <li className='border-t border-gray-500 pt-4 mt-2'>
          <Link 
            href={'/account/settings'}
            onClick={ closeMenu }
          >Settings</Link>
        </li>
        {
          user ? (
            <li className='border-t border-gray-500 pt-4 mt-2'>
              <button onClick={ logoutHandler }>Logout</button>
            </li>
          ) : null
        }
      </ul>
    );
  };

  return (
    <div 
      ref={ menuRef } 
      className={`
        absolute top-20 right-4 bg-white rounded-md shadow 
        max-w-xs w-full transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}
      `}
    >
      {renderMenuContent()}
    </div>
  )
}
