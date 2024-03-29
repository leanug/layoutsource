import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { LikedDesigns, Nav, Info, UserLayout } from '@/components'
import { useAuth, useAuthProtection } from '@/hooks'
import { sanitizeQueryString } from '@/utils'

function UserLikedDesignsPage() {
  useAuthProtection()
  const { user, loading } = useAuth()
  const router = useRouter()
  const { user: userSlug } = router.query
  const safeUserSlug = sanitizeQueryString(userSlug)

  useEffect(() => {
    if (!loading && safeUserSlug !== user?.username) {
      router.push('/404')
    }
  }, [router, user, safeUserSlug, loading])

  if (!user) return null

  return (
    <section className="section-full">
      <Info user={user} />
      {/* Spacer */}
      <div className="h-4 w-full"></div>
      {/* End Spacer */}
      <div className="py-10">
        <Nav activeTab={'liked'} slug={safeUserSlug} />
        <div className="mt-10">
          <LikedDesigns userId={user?.id} />
        </div>
      </div>
    </section>
  )
}

UserLikedDesignsPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default UserLikedDesignsPage
