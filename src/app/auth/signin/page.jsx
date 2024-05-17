import Link from 'next/link'

import SignInForm from '@/containers/auth/signin-form'
import { HomeIcon } from '@heroicons/react/24/solid'

function SignIn() {
  return (
    <>
      {/* Back link */}
      <div className="absolute left-4 top-4">
        <Link
          href="/"
          className="text-gray-500 dark:text-gray-100 flex flex-row gap-2.5 items-center"
        >
          <HomeIcon className="w-6 h-6" />
          Home
        </Link>
      </div>
      {/* End Back link */}

      <SignInForm />

      <div className="text-center">
        <Link href="/auth/signup" className="btn btn-link">
          You don&apos;t have an account?
        </Link>
      </div>
    </>
  )
}

export default SignIn
