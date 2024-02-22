import { useRouter } from 'next/router'

import { LoginForm } from '@/components'
import { useAuth } from '@/hooks'

function SignIn() {
  const router = useRouter()
  const { user } = useAuth()

  if (user) {
    router.push('/')
    return null // No flicker after push
  }

  return <LoginForm />
}

export default SignIn
