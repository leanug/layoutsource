import { useEffect, useRef } from 'react'

import { ShowcaseDesign, AuthLayout } from '@/components'
import { RelatedDesignsGrid } from '@/containers'
import { useRouter } from 'next/router'

/**
 * LayoutPage component displays information about a design layout.
 *
 * @param {object} props - The component props.
 * @param {object|null} props.data - The data representing the design layout or null if no data is available.
 * @returns {JSX.Element} - Returns the JSX element to render the layout page.
 */
function ShowcaseDesignPage(props) {
  const {
    data: { design, relatedDesigns },
    success,
  } = props
  const calledPush = useRef(false)
  const router = useRouter()

  // 404 No design
  useEffect(() => {
    if (!success && !calledPush.current && router) {
      calledPush.current = true
      router.push('/404')
    }
  }, [success, router])

  if (!success) return null

  return (
    <>
      <section className="section-full">
        <ShowcaseDesign design={design} />
      </section>

      {/* Related designs */}
      {relatedDesigns.length > 1 ? (
        <section className="section-full mt-20 mb-32">
          <h2 className="text-xl font-semibold mb-8">You might also like:</h2>
          <RelatedDesignsGrid designs={relatedDesigns} />
        </section>
      ) : null}
    </>
  )
}

// Define the getLayout function to conditionally render layouts
ShowcaseDesignPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default ShowcaseDesignPage
