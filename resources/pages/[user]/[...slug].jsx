import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import { ScreenLoadingIndicator } from '@/components'

/**
 * Catch all page for non existing urls
 */
const NotFoundPage = () => {
  const router = useRouter()
  const calledPush = useRef(false)

  useEffect(() => {
    if (calledPush.current) return
    if (router) {
      calledPush.current = true
      //router.push('/404')
    }
  }, [router])

  //return <ScreenLoadingIndicator />
}

export default NotFoundPage
