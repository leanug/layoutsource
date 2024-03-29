import { useRouter } from 'next/router'

import {
  LikedDesigns,
  Nav,
  Info,
  UserLayout,
  LoadingIndicator,
} from '@/components'
import { useAuth, useAuthProtection } from '@/hooks'
import { sanitizeQueryString } from '@/utils'
import { useEffect } from 'react'

function LikedDesignsPage() {
  useAuthProtection()

  const { user, loading } = useAuth()
  const router = useRouter()

  const { user: userSlug } = router.query
  const safeUserSlug = sanitizeQueryString(userSlug)

  useEffect(() => {
    // Invalid data
    if (!loading && (!safeUserSlug || safeUserSlug !== user?.username)) {
      router.push('/404')
    }
  }, [router, safeUserSlug, user, loading])

  if (!user) return null

  return (
    <section className="section-full">
      <Info user={user} />
      <div className="h-4 w-full"></div>
      <div className="py-10">
        <Nav activeTab={'liked'} slug={safeUserSlug} />
        <div className="mt-10">
          <LikedDesigns userId={user.id} />
        </div>
      </div>
    </section>
  )
}

LikedDesignsPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default LikedDesignsPage
