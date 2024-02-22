import Link from 'next/link'
import { useRouter } from 'next/router'

export const Header = () => {
  const router = useRouter()

  const goToLogin = () => router.push('/join/sign-in')
  const goToSignup = () => router.push('/join/sign-up')

  return (
    <header className="section-full flex flex-row justify-between py-6 font-semibold items-center">
      {/* Logo and site title */}
      <Link href="/">
        <div className="flex items-center gap-28">
          <div className="w-6 h-6 bg-indigo-400"></div>
          Layoutsource
        </div>
      </Link>

      {/* Buttons */}
      <div className="flex flex-row gap-5 items-center">
        {/* Submit design button */}
        <div className="hidden xl:flex flex-row gap-5 items-center">
          <Link href="/submit" className="btn-secondary min-w-40">
            Submit design
          </Link>
        </div>

        {/* Login and signup buttons */}
        <div className="flex flex-row gap-5 items-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={goToLogin}
          >
            Login
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
            onClick={goToSignup}
          >
            Sign up
          </button>
        </div>
      </div>
    </header>
  )
}
