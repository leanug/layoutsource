import { useRouter } from 'next/router'

import { LikedDesigns, Nav, Info, UserLayout } from '@/components'
import { useAuth } from '@/hooks'
import { sanitizeQueryString } from '@/utils'

function UserLikedDesignsPage() {
  const { user } = useAuth()
  const router = useRouter()

  const { user: userSlug } = router.query
  const safeUserSlug = sanitizeQueryString(userSlug)

  if (safeUserSlug !== user.username) {
    router.push('/404')
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
