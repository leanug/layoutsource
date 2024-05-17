export function PageMenuCollectionHeader({
  collectionTitle,
  collectionDescription,
}) {
  return (
    <div>
      <h1 className="font-semibold text-2xl mb-3">{collectionTitle}</h1>
      <h2>{collectionDescription}</h2>
    </div>
  )
}
