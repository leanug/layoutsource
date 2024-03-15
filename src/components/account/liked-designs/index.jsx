import { useLikedDesigns } from '@/hooks'
import { DesignsGridWrapper } from '@/components'

/* 
 * User page liked designs component
 */
export function LikedDesigns({ userId }) {
  const { loading, designs, pagination, handlePage, page } =
    useLikedDesigns(userId)

  return (
    <div className="mt-10">
      <DesignsGridWrapper
        designs={designs || []}
        loading={loading}
        totalPages={pagination?.totalPages || 0}
        totalItems={pagination?.totalItems || 0}
        handlePage={handlePage}
        page={page}
      />
    </div>
  )
}
