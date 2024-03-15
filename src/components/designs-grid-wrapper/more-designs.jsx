import { SecondaryButton } from '@/components'

export function MoreDesigns(props) {
  const { totalItems, totalPages, handlePage, page } = props

  return (page || 0) < (totalPages || 0) ? (
    <div className="flex justify-center my-12">
      <SecondaryButton type="secondary-gray" onClick={() => handlePage()}>
        Load More
      </SecondaryButton>
    </div>
  ) : totalItems ? (
    <div className="flex justify-center my-12">
      <p className="text-center">You&apos;ve seen all the designs.</p>
    </div>
  ) : null
}
