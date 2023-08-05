import { useRouter } from 'next/router';
import { Icon, Button, Label } from 'semantic-ui-react'
import { AuthContext } from '@/contexts';
import { useAuth } from '@/hooks';

const Account = () => {
  const { user } = useAuth()
  const router = useRouter()

  const goToLogin = () => router.push('/join/sign-in')
  const goToAccount = () => router.push('/account')

  return (
    <div>
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        onClick={ user ? goToAccount : goToLogin }  
      >
        User
      </button>

    </div>
  )
}

export default Account