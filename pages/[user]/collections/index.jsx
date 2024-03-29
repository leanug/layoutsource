import { useRouter } from 'next/router'

import {
  Collections,
  Nav,
  Info,
  UserLayout,
  LoadingIndicator,
} from '@/components'
import { useAuth, useAuthProtection } from '@/hooks'
import { sanitizeQueryString } from '@/utils'

function CollectionsPage() {
  useAuthProtection()

  const { user, loading } = useAuth()
  const router = useRouter()

  const { user: userSlug } = router.query
  const safeUserSlug = sanitizeQueryString(userSlug)

  if (loading || !user || !router)
    return (
      <div className="w-full flex justify-center">
        <LoadingIndicator />
      </div>
    )

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
