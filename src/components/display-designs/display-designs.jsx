/**
 * DisplayDesigns component displays a list of layouts based on the provided type.
 * It supports loading more layouts using a "Load More" button.
 *
 * @returns {JSX.Element} React component.
 */
export function DisplayDesigns(props) {
  const { designsList, LoadingIndicator } = props

  return (
    <section className="section-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-9">
        {designsList}
      </div>
      {LoadingIndicator}
    </section>
  )
}
