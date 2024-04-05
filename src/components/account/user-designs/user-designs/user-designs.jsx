import { LoadingIndicator } from '@/components'
import DesignItem from './design-item'
import { useUserDesigns, useAuth } from '@/hooks'

/*
 * User suggested designs
 */
export function UserDesigns() {
  const { user } = useAuth()
  const { designs, loading } = useUserDesigns(user.id)

  if ((loading && !designs?.length) || loading) {
    return (
      <div className="w-full flex justify-center">
        <LoadingIndicator />
      </div>
    )
  }

  if (!loading && !designs?.length) {
    return <div>No websites uploaded yet</div>
  }

  return (
    <ul className="flex flex-col gap-1">
      {designs.map((item) => (
        <DesignItem key={item.id} item={item} />
      ))}
    </ul>
  )
}
