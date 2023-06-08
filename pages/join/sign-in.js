import LoginForm from '@/components/auth/login-form'
import Link from 'next/link'
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';

function SignIn() {
  const router = useRouter()
  const { user } = useAuth()
  
  console.log('user', user);
  if (user) {
    router.push('/')
    return null // No flicker after push
  }

  return (
    <>
     <LoginForm />
      <div>
        <Link href="/join/sign-up">You don't have an account?</Link>
      </div>
    </>
  )
}

export default SignIn;
