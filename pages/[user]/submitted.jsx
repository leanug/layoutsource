import { useRouter } from 'next/router'

import { Nav, Info, UserDesigns, UserLayout } from '@/components'
import { useAuth } from '@/hooks'
import { sanitizeQueryString } from '@/utils'

function UserSubmittedDesignsPage() {
  const { user } = useAuth()
  const router = useRouter()

  // Check valid user
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
        <Nav activeTab={'submitted'} slug={safeUserSlug} />
        <div className="mt-10">
          <UserDesigns userId={user.id} />
        </div>
      </div>
    </section>
  )
}

UserSubmittedDesignsPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default UserSubmittedDesignsPage
