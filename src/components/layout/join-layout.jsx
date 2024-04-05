import Head from 'next/head'
import { useLayoutEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '@/hooks'
import { ScreenLoadingIndicator } from '@/components'

/**
 * Renders the layout for authentication pages, such as login and register forms.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to render within the layout.
 * @returns {ReactNode} The rendered authentication layout.
 */
export const JoinLayout = ({ children }) => {
  const router = useRouter()
  const { user, loading } = useAuth()
  const calledPush = useRef(false)

  useLayoutEffect(() => {
    if (calledPush.current) return
    if (user && router) {
      calledPush.current = true
      router.push('/')
    }
  }, [user, router])

  if (loading) return <ScreenLoadingIndicator />

  if (user) return null

  return (
    <div className={`relative ${user ? 'hidden' : ''}`}>
      <div className="h-full">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {/* Main content */}
        <div
          className={`
          text-slate-900 transition duration-300 flex flex-col 
            min-h-screen font-inter dark:text-white
          `}
        >
          <main
            className={`flex-1 flex items-center justify-center flex-col px-2.5`}
          >
            {children}
          </main>
        </div>
        {/* End Main content */}
      </div>
    </div>
  )
}
