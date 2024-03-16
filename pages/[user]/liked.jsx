import { useRouter } from 'next/router'

import { LikedDesigns, Nav, Info, UserLayout } from '@/components'
import { useAuth } from '@/hooks'
import { sanitizeQueryString } from '@/utils'

function LikedDesignsPage() {
  const { user } = useAuth()
  const router = useRouter()
  console.count('LikedDesignsPage')
  const { user: userSlug } = router.query
  const safeUserSlug = sanitizeQueryString(userSlug)

  // Invalid username slug
  if (!safeUserSlug || safeUserSlug !== user?.username) {
    router.push('/404')
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

LikedDesignsPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default LikedDesignsPage
