// showcase/[slug]/index.js

import { ENV, updateRelatedDesigns } from '@/utils'
import { isValidSlug } from '@/utils'
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

  if (!isValidSlug(designSlug)) {
    return {
      props: {
        data: null,
        success: false,
      },
    }
  }

  try {
    const slugResponse = await layoutCtrl.getDesignBySlug(designSlug)

    if (!slugResponse?.success) {
      throw new Error(
        `No data found for designSlug: ${designSlug}, ${slugResponse}`,
      )
    }

    const categorySlug =
      slugResponse.data[0].attributes.categories.data[0].attributes.slug
    const relatedDesignsResponse = await layoutCtrl.getDesigns({
      category: categorySlug,
      page: 1,
      pageSize: 5,
    })

    let updatedRelatedDesigns = []
    if (relatedDesignsResponse.success) {
      updatedRelatedDesigns = updateRelatedDesigns(
        relatedDesignsResponse.data.designs,
        slugResponse.data[0].id,
      )
    }

    return {
      props: {
        data: {
          relatedDesigns: updatedRelatedDesigns,
          design: slugResponse.data[0].attributes,
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
        error: {
          status: error?.status,
          message:
            error?.userMessage || error?.message || 'Oops! An error occured',
        },
      },
    }
  }
}
