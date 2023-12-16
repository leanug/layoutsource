import { NoResults, ShowcaseDesign } from '@/components'

import { useAuth } from '@/hooks'

/**
 * LayoutPage component displays information about a design layout.
 *
 * @param {object} props - The component props.
 * @param {object|null} props.data - The data representing the design layout or null if no data is available.
 * @returns {JSX.Element} - Returns the JSX element to render the layout page.
 */
export default function LayoutPage ({ data }) {
  const { user } = useAuth()

  if(! data || ! user) {
    return (
      <NoResults text="No designs found." />
    )
  }

  return (
    <ShowcaseDesign userId={ user } data={ data } />
  )
}