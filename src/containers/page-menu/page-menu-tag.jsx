export function PageMenuTag({ tag }) {
  return (
    <h1 className="text-center font-normal text-xl">
      Tags: <span className="font-semibold">{tag || '-'}</span>
    </h1>
  )
}
