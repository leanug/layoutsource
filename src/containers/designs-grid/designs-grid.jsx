import Design from './design'

export function DesignsGrid({ designs }) {
  console.count('DesignsGrid')

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
      {designs?.map((item) => (
        <Design key={item.id} design={item} />
      ))}
    </div>
  )
}
