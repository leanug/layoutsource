import { useRouter } from 'next/router'

import {
  LikedDesigns,
  Nav,
  Info,
  Custom404,
  LoadingIndicator,
} from '@/components'
import { useAuth } from '@/hooks'
import { sanitizeQueryString } from '@/utils'

function UserLikedDesignsPage() {
  const { user } = useAuth()
  const router = useRouter()

  const { user: userSlug } = router.query
  const safeUserSlug = sanitizeQueryString(userSlug)

  // Check if user is loaded
  if (!user) {
    return (
      <section style={{ height: '90vh' }}>
        <LoadingIndicator />
      </section>
    )
  }

  if (safeUserSlug !== user.username) {
    return <Custom404 />
  }

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
export default UserLikedDesignsPage
