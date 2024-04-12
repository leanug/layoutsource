import Design from './design'

export function DesignsGrid({ designs }) {
  // Loading
  if (!designs?.length) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-9">
      {designs?.map((item) => (
        <Design key={item.id} design={item} />
      ))}
    </div>
  )
}
