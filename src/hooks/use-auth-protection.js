import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useAuth } from '@/hooks' // Import your authentication context

export function useAuthProtection() {
  const router = useRouter()
  const { user, loading } = useAuth() // Retrieve user authentication status from context
  const isInitialRender = useRef(true)

  useEffect(() => {
    // Skip the initial render
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (!loading && !user) {
      router.replace('/join/sign-in') // Redirect to login page if user is not authenticated
    }
  }, [user, loading, router])
}
