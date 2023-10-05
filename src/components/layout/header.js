import Link from 'next/link';
import Account from './account';
import Menu from './menu';
import { useAuth } from '@/hooks'

export const Header = () => {  
  const { user, logout } = useAuth()

  return (
    <header>
      <div className='flex flex-row justify-between mb-16 px-3 md:px-10 py-6 max-w-screen-2xl mx-auto'>
        <div className="flex items-center gap-4">
          <Link href="/">
            LOGO
          </Link>
          <Menu isOpenSearch={ false } />
        </div>
        <div className='flex flex-row gap-4'>
        {user ?
          <div>
            {/* <p>{ user.firstname } { user.lastname }</p> */}
            <button onClick={ logout }>Logout</button>
          </div>
        : null}
          <Account />
        </div>
      </div>
    </header>
  );
};