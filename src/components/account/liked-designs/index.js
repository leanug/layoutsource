import { useLikedDesigns } from "@/hooks"

import { 
  LoadingIndicator, 
  NoResults, 
  PaginatedDesigns 
} from "@/components"

import { LikedDesigns as LikedDesignsService } from "@/api"

const likedDesignsCtrl = new LikedDesignsService()

export function LikedDesigns({ userId }) {
 
  const { 
    loading, 
    designs, 
    pagination,
    handlePage
  } = useLikedDesigns(userId, likedDesignsCtrl)

  console.log('LikedDesigns rendered')

  return (
    <div className="mt-10">
      {
        loading ? (
          <LoadingIndicator />
        ) : (
          designs?.length ? (
            <PaginatedDesigns 
              designs={ designs } 
              loading={ loading }
              totalPages={ pagination?.totalPages || 0 }
              totalItems={ pagination?.totalItems || 0 }
              handlePage={ handlePage }
            />
          ) : (
            <NoResults text="You don't have any favourite designs yet." />
          )
        )
      }
    </div>
  )
}