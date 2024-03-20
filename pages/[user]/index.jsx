import { useRouter } from 'next/router'
import { useEffect } from 'react'

import {
  LikedDesigns,
  Nav,
  Info,
  UserLayout,
  LoadingIndicator,
} from '@/components'
import { useAuth } from '@/hooks'
import { sanitizeQueryString } from '@/utils'

function UserLikedDesignsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { user: userSlug } = router.query
  const safeUserSlug = sanitizeQueryString(userSlug)

  useEffect(() => {
    if (safeUserSlug !== user?.username) {
      router.push('/404')
    }
  }, [router, user, safeUserSlug])

  if (!user) {
    return (
      <div className="w-full flex justify-center items-center">
        <LoadingIndicator />
      </div>
    )
  }

  return (
    <section className="section-full">
      <Info user={user} />
      {/* Spacer */}
      <div className="h-4 w-full"></div>
      {/* End Spacer */}
      <div className="py-10">
        <Nav activeTab={'liked'} slug={safeUserSlug} />
        <div className="mt-10">
          <LikedDesigns userId={user.id} />
        </div>
      </div>
    </section>
  )
}

UserLikedDesignsPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default UserLikedDesignsPage
