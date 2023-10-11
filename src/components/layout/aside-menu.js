import Link from 'next/link';
import { useAuth } from '@/hooks';

export function AsideMenu ({ isOpen, closeMenu }) {
  const { user, logout } = useAuth()

  if (! isOpen) {
    return null;
  }

  return (
    <div className="absolute top-20 right-4 bg-white rounded-md shadow max-w-xs w-full">
      <button className='p-3' onClick={closeMenu}>X</button>
      {/* Your aside menu content */}
      <ul className='p-10 flex flex-col gap-4'>
        <li>
          <Link href={`/user/${ user?.username || '' }`}>Profile</Link>
        </li>
        <li>
          <Link href={'/user/settings'}>Settings</Link>
        </li>
        {
          user ? (
            <li>
              <button onClick={ logout }>Logout</button>
            </li>
          ) : null
        }
      </ul>
      
    </div>
  )
}
