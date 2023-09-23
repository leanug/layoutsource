import GridItem from "./grid-item"

export function GridLayouts ({ layouts }) {
  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {layouts.map((layout) => (
        <GridItem key={ layout.id } layout={ layout } />
      ))}
    </div>
  )
}