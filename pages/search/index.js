import { sanitizeQueryString } from "@/utils";
import { PaginatedDesigns, NoResults } from "@/components"
import { useDesigns } from "@/hooks"
import { useEffect } from 'react';
import { useRouter } from 'next/router'

export default function SearchPage () {
  const router = useRouter()
  const { 
    loading, 
    fetchDesignsByQuery, 
    designs, 
    pagination 
  } = useDesigns([])
  const { s } = router.query; // Access the query parameters from the URL
  const safeQuery = sanitizeQueryString(s)

  useEffect(() => {
    if(safeQuery) {
      fetchDesignsByQuery(safeQuery, 1)
    }
  }, [router.query]);

  return (
    <section>
     {
        designs?.length ? (
          <>
            <div className="flex flex-row justify-between section-full mb-3">
              <h1 className="text-center">Query: { safeQuery }</h1>
              <div>
                2020 results
                <button className="border rounded-full p-3 bg-slate-100">Filter</button>
              </div>
            </div>
            <PaginatedDesigns 
              designs={ designs } 
              loading={ loading }
              totalPages={ pagination.total }
              fetchDesigns={ () => fetchDesignsByQuery(safeQuery) }
            />
          </>
        ) : (
          <NoResults text="No results" />
        )
      }
    </section>
  )
}