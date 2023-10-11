import { useRouter } from 'next/router';
import { useAside, useAuth } from '@/hooks'; 

const Account = ({ toggleMenu }) => {
  const { user } = useAuth()
  const router = useRouter()

  const goToLogin = () => router.push('/join/sign-in')
  const goToAccount = () => router.push('/account')

  return (
    <div className='flex flex-row gap-2'>
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        onClick={ user ? goToAccount : goToLogin }  
      >
        User
      </button>
      <button onClick={ toggleMenu }>O</button>
    </div>
  )
}

export default Account