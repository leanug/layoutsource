import { useRouter } from 'next/router';
import { useAuth } from '@/hooks'; 

const Account = ({ toggleMenu }) => {
  const { user } = useAuth()
  const router = useRouter()

  const goToLogin = () => router.push('/join/sign-in')
  const goToAccount = () => router.push(`/${ user.username }`)

  return (
    <div className='flex flex-row gap-2'>
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        onClick={ user ? goToAccount : goToLogin }  
      >
        {user ? 'user' : 'Login'}
      </button>
      { 
        user ? (
        <button onClick={ toggleMenu }>O</button>
        ) : null
      }
    </div>
  )
}

export default Account