import Link from 'next/link';
import { useAuth } from '@/hooks'
import { useRouter } from 'next/router';

export function AsideMenu ({ isOpen, closeMenu }) {
  const { user, logout } = useAuth()
  const router = useRouter()
  
  if (! isOpen) {
    return null;
  }

  const logoutHandler = () => {
    // Perform the logout action (e.g., clearing user data from state or cookies)
    logout()
    
    // Redirect to the login page
    router.push('/join/sign-in') // Replace '/login' with the actual login route
  };
  

  return (
    <div className="absolute top-20 right-4 bg-white rounded-md shadow max-w-xs w-full">
      <button className='p-3' onClick={closeMenu}>X</button>
      {/* Your aside menu content */}
      <ul className='p-10 flex flex-col gap-4'>
        <li>
          <Link href={`/${ user?.username || '' }`}>Profile</Link>
        </li>
        <li>
          <Link href={'/account/settings'}>Settings</Link>
        </li>
        {
          user ? (
            <li>
              <button onClick={ logoutHandler }>Logout</button>
            </li>
          ) : null
        }
      </ul>
      
    </div>
  )
}
