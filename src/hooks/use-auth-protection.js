import { useEffect, useRef } from 'react'

import { protectedRoutes, sanitizeSlug } from '@/utils'

export function useAuthProtection(user, loading, router) {
  const calledPush = useRef(false)

  // Protect Routes
  useEffect(() => {
    const { pathname } = router

    if (calledPush.current) return

    // Wrong username
    if (router?.query?.user) {
      const safeUserSlug = sanitizeSlug(router?.query?.user)
      if (!safeUserSlug || safeUserSlug !== user?.username) {
        calledPush.current = true
        router.push('/404')
      }
    }

    // Homepage hidden for logged in users
    if (user && pathname === '/') {
      calledPush.current = true
      router.replace('/designs/homepages')
    }

    // Log in and Register pages:
    // JoinLayout takes care of it

    const pathnameSegments = pathname.split('/')
    let isInProtectedRoute = false

    if (!loading && !user) {
      for (const segment of pathnameSegments) {
        if (protectedRoutes.includes('/' + segment)) {
          isInProtectedRoute = true
          break
        }
      }
      if (isInProtectedRoute) {
        calledPush.current = true
        router.replace('/join/sign-in') // Redirect to login page if user is not authenticated
      }
    }
  }, [user, loading, router])
}
