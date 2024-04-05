import { useRouter } from 'next/router'

import { sanitizeQueryString } from '@/utils'
import { DesignsGridWrapper, AuthLayout } from '@/components'
import { useSearchDesigns } from '@/hooks'
import { PageMenu } from '@/containers'

/**
 * SearchPage component for displaying search results.
 * @component
 * @returns {JSX.Element} SearchPage component JSX
 */
function SearchPage() {
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
  return <AuthLayout>{page}</AuthLayout>
}

export default SearchPage
