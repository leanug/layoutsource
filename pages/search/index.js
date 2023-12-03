import { useRouter } from 'next/router'

import { sanitizeQueryString } from "@/utils";

import { 
  PaginatedDesigns, 
  NoResults 
} from "@/components"

import { PageMenu } from '@/containers'

import { useSearchDesigns } from "@/hooks"

import { Layout } from '@/api';

const layoutCtrl = new Layout()


/**
 * SearchPage component for displaying search results.
 * @component
 * @returns {JSX.Element} SearchPage component JSX
 */
export default function SearchPage () {
  const router = useRouter()
  const { s } = router.query; // Access the query parameters from the URL
  const safeQuery = sanitizeQueryString(s)

  const { 
    designs, 
    pagination, 
    handleSorting, 
    handlePage, 
    loading 
  } = useSearchDesigns(safeQuery, layoutCtrl)
  
  return (
    <section>
     {
        designs?.length ? (
          <>
            {/* Component for sorting and displaying search query information */}
            <PageMenu 
              query={ safeQuery }
              designCount={ pagination?.totalItems || 0 }
              handleSorting={ handleSorting }
              displaySearchQueryData={ true }
            />
            {/* Component for displaying search results with pagination */}
            <PaginatedDesigns 
              designs={ designs } 
              loading={ loading }
              totalPages={ pagination?.totalPages || 0 }
              totalItems={ pagination?.totalItems || 0 }
              handlePage={ handlePage }
            />
          </>
        ) : (
          <NoResults text="No results" />
        )
      }
    </section>
  )
}