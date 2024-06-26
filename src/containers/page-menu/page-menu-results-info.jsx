export function PageMenuResultsInfo({ totalItems }) {
  return (
    <span className="w-40 text-right font-normal mr-4">
      {totalItems} {totalItems === 1 ? 'result' : 'results'}
    </span>
  )
}
