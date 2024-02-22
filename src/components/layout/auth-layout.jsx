import Head from 'next/head'
import Link from 'next/link'

import { HouseSolid, Notification } from '@/components'

export const AuthLayout = ({ children }) => {
  return (
    <div className={`relative`}>
      <div className="absolute left-4 top-4">
        <Link
          href="/"
          className="text-gray-500 flex flex-row gap-2.5 items-center"
        >
          <HouseSolid className="w-5 h-5 fill-gray-500" />
          Home
        </Link>
      </div>
      <div className="h-full">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div
          className={`
          text-slate-900 transition duration-300 flex flex-col 
            min-h-screen font-inter
          `}
        >
          <main
            className={`flex-1 flex items-center justify-center flex-col px-2.5`}
          >
            {children}
          </main>
        </div>
      </div>
      <Notification />
    </div>
  )
}
