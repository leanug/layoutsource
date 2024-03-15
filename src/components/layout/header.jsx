import Link from 'next/link'
import { useRouter } from 'next/router'

import { DarkModeButton, Logo } from '@/components'

export const Header = () => {
  const router = useRouter()

  const goToLogin = () => router.push('/join/sign-in')
  const goToSignup = () => router.push('/join/sign-up')

  return (
    <header className="section-full flex flex-row justify-between py-6 font-semibold items-center">
      {/* Logo and site title */}
      <Link className="block w-40" href="/">
        <span className="sr-only">Layoutsource home page</span>
        <Logo />
      </Link>

      {/* Buttons */}
      <div className="flex md:flex-row gap-5 items-center">
        {/* Submit design button */}
        <DarkModeButton />

        <div className="hidden xl:flex flex-row gap-5 items-center">
          <Link href="/submit" className="">
            Submit website
          </Link>
        </div>

        
      </div>
    </header>
  )
}
