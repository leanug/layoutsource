import { useRouter } from 'next/router'
import Image from 'next/image'

import { useAuth } from '@/hooks'
import { CaretDown, MenuSolid } from '@/components'
import { useAsideMenuStore } from '@/store'

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
export function Account({ user }) {
  const router = useRouter()
  const { toggleMenu } = useAsideMenuStore()

  const goToAccount = () => router.push(`/${user.username}`)

  if (!user) return null

  return (
    <div className="flex flex-row gap-2">
      <button className="w-10 h-10 hidden xl:block" onClick={goToAccount}>
        <Image
          src={user?.avatar?.url || fallbackImg}
          alt="User Avatar"
          width={'30'}
          height={'30'}
          className="w-full h-full object-cover rounded-full"
          placeholder="empty" // use 'empty' for a blank placeholder
          priority={false}
        />
      </button>
      <button id="userAsideMenuButton" onClick={toggleMenu}>
        {/* Show burger icon for screens smaller than md */}
        <MenuSolid className="w-6 h-6 fill-slate-900 dark:fill-slate-50 block xl:hidden" />
        {/* Show caret icon for screens md and larger */}
        <CaretDown className="w-6 h-6 fill-slate-900 dark:fill-slate-50 hidden xl:block" />
      </button>
    </div>
  )
}
