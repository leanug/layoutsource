import Link from 'next/link'

import { RegisterForm } from '@/containers'
import { HouseSolid, JoinLayout } from '@/components'

function SignUp() {
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

      <RegisterForm />

      <div className="mt-4 text-center">
        You already have an account?
        <Link href="/join/sign-in" className="btn btn-link text-[16px]">
          Log in
        </Link>
      </div>
    </>
  )
}

SignUp.getLayout = (page) => {
  return <JoinLayout>{page}</JoinLayout>
}

export default SignUp
