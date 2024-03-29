import { useRouter } from 'next/router'

import { sanitizeQueryString } from '@/utils'
import { DesignsGridWrapper, UserLayout } from '@/components'
import { useAuthProtection, useSearchDesigns } from '@/hooks'
import { PageMenu } from '@/containers'

/**
 * SearchPage component for displaying search results.
 * @component
 * @returns {JSX.Element} SearchPage component JSX
 */
function SearchPage() {
  useAuthProtection() // Check if user is logged in

  const router = useRouter()
  const { s } = router.query // Access the query parameters from the URL
  const safeQuery = sanitizeQueryString(s)

  useSearchDesigns(safeQuery)

  return (
    <>
      <PageMenu searchQuery={safeQuery} displaySearchQueryData={true} />
      <DesignsGridWrapper />
    </>
  )
}

SearchPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default SearchPage
