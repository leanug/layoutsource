import { useEffect } from 'react'
import { useRouter } from 'next/router'

function useProtectedRoute(props) {
  const { user, loading } = props
  const router = useRouter()

  useEffect(() => {
    // Check if loading is complete and user is not logged in
    if (!loading && !user) {
      // Redirect to login page
      // router.push('/join/sign-in')
      console.log('Use protected route: user not logged in')
    }
  }, [user, loading, router]) // Re-run effect when user or loading state changes
}

export default useProtectedRoute
