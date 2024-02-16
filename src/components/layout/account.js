import { useRouter } from 'next/router'
import Image from 'next/image'

import { useAuth } from '@/hooks'
import { CaretDown } from '@/components'

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
const Account = ({ toggleMenu }) => {
  const { user } = useAuth()
  const router = useRouter()

  const goToLogin = () => router.push('/join/sign-in')
  const goToAccount = () => router.push(`/${ user.username }`)

  return (
    <div className='flex flex-row gap-2'>
      {
        user ? (
          <>
            <button 
              className='w-10 h-10'
              onClick={ goToAccount }
            >
              <Image
                src={ user.avatar.url || fallbackImg }
                alt="User Avatar"
                width={'30'}
                height={'30'}
                className="w-full h-full object-cover rounded-full"
                placeholder="empty" // use 'empty' for a blank placeholder
                priority={ false }
              />
            </button>
            <button
              id="userAsideMenuButton" 
              onClick={ toggleMenu }
            >
              <CaretDown className="w-6 h-6 fill-slate-900 dark:fill-slate-50" />
            </button>
          </>
        ) : (
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={ goToLogin }
        >
          Login
        </button>
        )
      }
    </div>
  )
}

export default Account