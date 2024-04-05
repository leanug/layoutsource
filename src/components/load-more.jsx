import { SecondaryButton } from '@/components'

export function LoadMore(props) {
  const { totalItems, totalPages, handlePage, page, message } = props

  return (page || 0) < (totalPages || 0) ? (
    <div className="flex justify-center my-12">
      <SecondaryButton type="secondary-gray" onClick={() => handlePage()}>
        Load More
      </SecondaryButton>
    </div>
  ) : totalItems ? (
    <div className="flex justify-center my-12">
      <p className="text-center">{message}</p>
    </div>
  ) : null
}
