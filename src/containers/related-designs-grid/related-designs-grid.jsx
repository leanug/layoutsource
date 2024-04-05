import Design from './design'

export function RelatedDesignsGrid({ designs }) {
  // Loading
  if (!designs?.length) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-9">
      {designs?.map((item) => (
        <Design key={item.id} design={item} />
      ))}
    </div>
  )
}
