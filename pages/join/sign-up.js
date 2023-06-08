import RegisterForm from '@/components/auth/register-form';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks';


function SignUp() {
  const router = useRouter()
  const { user } = useAuth()
  
  if (user) {
    router.push('/')
    return null // No flicker after push
  }

  return (
    <RegisterForm />
  );
}

export default SignUp;
