import { useLikedDesigns } from '@/hooks'
import { DesignsGridWrapper } from '@/components'

/* 
 * User page liked designs component
 */
export function LikedDesigns({ userId }) {
  useLikedDesigns(userId)

  return (
    <div className="mt-10">
      <DesignsGridWrapper />
    </div>
  )
}
