import { useRouter } from 'next/router'

import { useAuth } from '@/hooks'
import { sanitizeQueryString, sanitizeSlug } from '@/utils'
import { Nav, Info } from '@/components'

export function UserSectionWrapper({children}) {
  const { user } = useAuth()
  const router = useRouter()

  const { user: userSlug } = router.query
  const safeUserSlug = sanitizeQueryString(userSlug)
  const tabSlug = router.pathname.split('/').pop()
  const safeActiveTab = sanitizeSlug(tabSlug)
  // Pathname equals /[user] or /[user]/liked
  const activeTab = safeActiveTab === 'user' ? 'liked' : safeActiveTab

  // Prevent user page flicker
  if (!user || safeUserSlug !== user?.username) return null

  return (
    <section className="section-full">
      <Info user={user} />
      <div className="h-4 w-full"></div>
      <div className="py-10">
        <Nav activeTab={activeTab} slug={safeUserSlug} />
        <div className="mt-10">
          {children}
        </div>
      </div>
    </section>
  )
}