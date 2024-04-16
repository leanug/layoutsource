import Link from 'next/link'

import { SignInForm } from '@/containers'
import { HouseSolid } from '@/components'

function SignIn() {
  return (
    <>
      {/* Back link */}
      <div className="absolute left-4 top-4">
        <Link
          href="/"
          className="text-gray-500 dark:text-gray-100 flex flex-row gap-2.5 items-center"
        >
          <HouseSolid className="w-5 h-5 fill-gray-500 dark:fill-gray-100" />
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
