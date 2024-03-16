import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { sanitizeQueryString } from '@/utils'
import { DesignsGridWrapper, UserLayout } from '@/components'
import { useSearchDesigns } from '@/hooks'
import { PageMenu } from '@/containers'
import { useDesignsStore } from '@/store'

/**
 * SearchPage component for displaying search results.
 * @component
 * @returns {JSX.Element} SearchPage component JSX
 */
function SearchPage() {
  const router = useRouter()
  const { s } = router.query // Access the query parameters from the URL
  const safeQuery = sanitizeQueryString(s)

  const { setQuery, query } = useDesignsStore()

  useEffect(() => {
    console.log('safeQuery', safeQuery)
    console.log(safeQuery !== query && safeQuery !== '')
    if (safeQuery !== query) {
      setQuery(safeQuery)
    }
  }, [safeQuery, query, setQuery])

  useSearchDesigns()

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
