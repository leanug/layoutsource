import { useRouter } from 'next/router'

import { Collections, Nav, Info, UserLayout } from '@/components'
import { useAuth } from '@/hooks'
import { sanitizeQueryString } from '@/utils'

function CollectionsPage() {
  const { user } = useAuth()
  const router = useRouter()

  const { user: userSlug } = router.query
  const safeUserSlug = sanitizeQueryString(userSlug)

  if (!safeUserSlug || safeUserSlug !== user.username) {
    router.push('/404')
  }

  return (
    <section className="section-full">
      <Info user={user} />
      <div className="h-4 w-full"></div>
      <div className="py-10">
        <Nav activeTab={'collections'} slug={safeUserSlug} />
        <div className="mt-10">
          <Collections />
        </div>
      </div>
    </section>
  )
}

CollectionsPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default CollectionsPage
