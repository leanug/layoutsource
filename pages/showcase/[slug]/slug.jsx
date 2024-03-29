import { ShowcaseDesign, UserLayout } from '@/components'
import { DesignsGrid } from '@/containers'

/**
 * LayoutPage component displays information about a design layout.
 *
 * @param {object} props - The component props.
 * @param {object|null} props.data - The data representing the design layout or null if no data is available.
 * @returns {JSX.Element} - Returns the JSX element to render the layout page.
 */
function ShowcaseDesignPage({ data }) {
  const { design, relatedDesigns } = data
  console.count('ShowcaseDesignPage')

  return (
    <>
      <section className="section-full">
        <ShowcaseDesign design={design} />
      </section>

      {/* Related designs */}
      {relatedDesigns.length > 1 ? (
        <section className="section-full mt-20 mb-32">
          <h2 className="text-xl font-semibold mb-8">You might also like:</h2>
          <DesignsGrid designs={relatedDesigns} />
        </section>
      ) : null}
    </>
  )
}

// Define the getLayout function to conditionally render layouts
ShowcaseDesignPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default ShowcaseDesignPage
