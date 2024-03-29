import { LoadingIndicator } from '@/components'
import Design from './design'

export function DesignsGrid({ designs }) {
  // Loading
  if (!designs?.length) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingIndicator />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
      {designs?.map((item) => (
        <Design key={item.id} design={item} />
      ))}
    </div>
  )
}
