// showcase/[slug]/index.js

import { ENV, updateRelatedDesigns } from '@/utils'
import { sanitizeSlug } from '@/utils'
import { Layout } from '@/api'

export { default } from './slug'

/**
 * Get server-side props for the design page.
 *
 * @param {object} context - The context object from Next.js.
 * @param {object} context.params - The params object containing route parameters.
 * @param {string} context.params.design - The design slug extracted from the URL.
 * @returns {object} - An object containing props for the design page.
 */
export async function getServerSideProps(context) {
  const layoutCtrl = new Layout()
  const {
    params: { slug: designSlug },
  } = context

  const safeSlug = sanitizeSlug(designSlug)

  if (!safeSlug) {
    return {
      props: {
        data: null,
        success: false,
      },
    }
  }

  try {
    const designResponse = await layoutCtrl.getDesignBySlug(designSlug)

    if (!designResponse?.success) {
      throw new Error(
        `No data found for designSlug: ${designSlug}, ${designResponse}`,
      )
    }

    // Fetch related designs by category
    const categorySlug =
      designResponse.data.design.categories[0].attributes.slug
    const relatedDesignsResponse = await layoutCtrl.getDesigns({
      category: categorySlug,
      page: 1,
      pageSize: 5,
    })

    let updatedRelatedDesigns = []
    if (relatedDesignsResponse.success) {
      updatedRelatedDesigns = updateRelatedDesigns(
        relatedDesignsResponse.data.designs,
        designResponse.data.id,
      )
    }

    return {
      props: {
        data: {
          relatedDesigns: updatedRelatedDesigns,
          design: designResponse.data.design,
        },
        success: true,
      },
    }
  } catch (error) {
    if (ENV.IS_DEV) {
      console.error('Error fetching design. ', error)
    }
    return {
      props: {
        success: false,
        data: {
          relatedDesigns: [],
          design: [],
        },
        error: {
          status: error?.status || null,
          message:
            error?.userMessage || error?.message || 'Oops! An error occured',
        },
      },
    }
  }
}
