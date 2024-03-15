import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { ScreenLoadingIndicator } from '@/components'

/**
 * Catch all page for non existing urls
 */
const NotFoundPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (router) router.push('/404')
  }, [router])

  return <ScreenLoadingIndicator />
}

export default NotFoundPage
