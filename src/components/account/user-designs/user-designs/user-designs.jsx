import { LoadingIndicator, NoResults } from '@/components'
import DesignItem from './design-item'
import { useUserDesigns } from '@/hooks'

/*
 * User suggested designs
 */
export function UserDesigns(props) {
  const { userId } = props
  const { designs, loading } = useUserDesigns(userId)

  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <LoadingIndicator />
      </div>
    )
  }

  if (!designs?.length) {
    return <NoResults text="No websites uploaded yet" />
  }

  return (
    <ul className="flex flex-col gap-1">
      {designs.map((item) => (
        <DesignItem key={item.id} item={item} />
      ))}
    </ul>
  )
}
