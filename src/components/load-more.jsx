/*
 * Load more collections or designs
 */
export function LoadMore(props) {
  const { pagination, pageHandler, page, loading } = props
  const { totalPages } = pagination

  if (loading) return null

  return (page || 0) < (totalPages || 0) ? (
    <div className="flex justify-center my-12">
      <button className="btn" type="button" onClick={() => pageHandler()}>
        Load More
      </button>
    </div>
  ) : null
}
