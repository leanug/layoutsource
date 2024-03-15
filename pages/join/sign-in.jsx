import Link from 'next/link'

import { LoginForm } from '@/containers'
import { HouseSolid } from '@/components'

function SignIn() {
  return (
    <>
      {/* Back link */}
      <div className="absolute left-4 top-4">
        <Link
          href="/"
          className="text-gray-500 flex flex-row gap-2.5 items-center"
        >
          <HouseSolid className="w-5 h-5 fill-gray-500" />
          Home
        </Link>
      </div>
      {/* End Back link */}

      <LoginForm />
    </>
  )
}

export default SignIn
