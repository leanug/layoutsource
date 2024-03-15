import { ShowcaseDesign } from '@/components'

/**
 * LayoutPage component displays information about a design layout.
 *
 * @param {object} props - The component props.
 * @param {object|null} props.data - The data representing the design layout or null if no data is available.
 * @returns {JSX.Element} - Returns the JSX element to render the layout page.
 */
export default function ShowcaseDesignPage({ data }) {
  return (
    <section className="mb-32 section-full">
      <ShowcaseDesign data={data} />
    </section>
  )
}
