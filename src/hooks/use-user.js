'use client'

import { useEffect } from 'react'

import { useUserStore } from '@/store/use-user-store'

export function useUser(status, sessionUser) {
  const { setUser, user } = useUserStore()

  useEffect(() => {
    if (status === 'authenticated') {
      setUser(sessionUser)
    }
  }, [sessionUser, status, setUser])

  return { user }
}
