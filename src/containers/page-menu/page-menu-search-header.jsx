export function PageMenuSearchHeader({ searchQuery }) {
  return (
    <h1 className="text-center font-normal text-xl">
      Results Matching:{' '}
      <span className="font-semibold">{searchQuery || '-'}</span>
    </h1>
  )
}
