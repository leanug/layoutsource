import { useEffect } from "react"
import { useAuth, useDesigns } from "@/hooks"
import { PaginatedDesigns, NoResults } from "@/components"

export function LikedDesigns() {
  const { user } = useAuth()
  const {  } = useDesigns([])
  const { 
    loading, 
    fetchLikedDesigns, 
    designs, 
    pagination 
  } = useDesigns([])

  useEffect(() => {
    fetchLikedDesigns(user.id, 1)
  }, [user.id])

  return (
    <div className="mt-10">
      {
        designs?.length ? (
          <PaginatedDesigns 
            designs={ designs } 
            loading={ loading }
            totalPages={ pagination.total }
            fetchDesigns={ () => fetchLikedDesigns(user.id) }
          />
        ) : null
      }
    </div>
  )
}