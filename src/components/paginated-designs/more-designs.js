import { Button } from '@/components'

export function MoreDesigns ({ totalDesigns, totalPages, handlePage }) {

  return (
    (totalDesigns || 0) < (totalPages || 0) ? (
      <div className="flex justify-center my-12">
        <Button
          type="secondary-gray"
          onClick={ () => handlePage() }
        >
          Load More
        </Button>
      </div>
    ) : (
      totalDesigns ? (
        <div className="flex justify-center my-12">
          <p className="text-center">You've seen all the designs.</p>
        </div>
      ) : null
    )
  )
}