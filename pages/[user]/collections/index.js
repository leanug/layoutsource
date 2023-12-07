import { useRouter } from "next/router"
import { Collections, Nav, Info, Custom404 } from "@/components"
import { useAuth } from "@/hooks"
import { sanitizeQueryString } from '@/utils'

function CollectionsPage() {
  const { user } = useAuth()
  const router = useRouter()
  
  const { user: userSlug } = router.query;
  const safeUserSlug = sanitizeQueryString(userSlug)

  if(! user) {
    return null
  }
  
  if(safeUserSlug !== user.username) {
    return <Custom404 />
  }

  return (
    <section className="section-full">
      <Info user={ user } />
      <div className="h-4 w-full"></div>
      <div className="py-10">
        <Nav 
          activeTab={ 'collections' }
          slug={ safeUserSlug }
        />
        <div className="mt-10">
          <Collections />
        </div>
      </div>
    </section>
  )
}
export default CollectionsPage