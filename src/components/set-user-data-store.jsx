import { useSession } from 'next-auth/react'

import { useUser } from '@/hooks'

export function SetUserDataStore({ children }) {
  const { status, data } = useSession()
  useUser(status, data?.user) // Set user data
  return <>{children}</>
}
