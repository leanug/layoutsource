// pages/[user]/[...slug].js

import { Custom404 } from '@/components'
import { useRouter } from 'next/router'

/**
 * Catch all page for non existing urls
 */
const NotFoundPage = () => {
  const router = useRouter()

  // Handle undefined routes
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Custom404 />
  )
}

export default NotFoundPage
