import { useRouter } from 'next/router'

import { Custom404 } from '@/components'

/**
 * Catch all page for non existing urls
 */
const NotFoundPage = () => {
  const router = useRouter()

  // Handle undefined routes
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return <Custom404 />
}

export default NotFoundPage
