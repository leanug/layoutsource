import { useRouter } from "next/router"
import { 
  Nav, 
  Info, 
  UserDesigns 
} from "@/components"
import { useAuth } from "@/hooks"
import { sanitizeQueryString } from '@/utils'

function TestPage() {
  const { user } = useAuth()
  const router = useRouter()

  const { user: userSlug } = router.query;
  const safeUserSlug = sanitizeQueryString(userSlug)

  if(! user) {
    return null;
  }
  
  if(safeUserSlug !== user.username) {
    router.push('/')
  }

  return (
    <section className="section-full">
      <Info user={ user } />
      <div className="h-4 w-full"></div>
      <div className="py-10">
        <Nav 
          activeTab={ 'submitted' } 
          slug={ safeUserSlug }
        />
        <div className="mt-10">
          <UserDesigns />
        </div>
      </div>
    </section>
  )
}
export default TestPage