import { ShowcaseDesign, UserLayout } from '@/components'

/**
 * LayoutPage component displays information about a design layout.
 *
 * @param {object} props - The component props.
 * @param {object|null} props.data - The data representing the design layout or null if no data is available.
 * @returns {JSX.Element} - Returns the JSX element to render the layout page.
 */
function ShowcaseDesignPage({ data }) {
  console.count('ShowcaseDesignPage')

  return (
    <section className="mb-32 section-full">
      <ShowcaseDesign data={data} />
    </section>
  )
}

// Define the getLayout function to conditionally render layouts
ShowcaseDesignPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default ShowcaseDesignPage
