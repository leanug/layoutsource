import { Category, Layout } from '@/api'

export { default } from './category'

export async function getServerSideProps (context) {
  const { query, params } = context
  const { page = 1 } = query // if page is undefined, page = 1
  const { category } = params

  const categoryCtrl = new Category()
  const responseCategory = await categoryCtrl.getBySlug(category)
  
  const layoutCtrl = new Layout()
  const responseLayouts = await layoutCtrl.getLayoutsByCategory({ slug: category, page })
  
  // Response code = 500, category is not found in the database
  if (!responseCategory) {
    // Handle the case where the category does not exist
    return {
      props: {
        data: null
      },
    };
  }

  return {
    props: {
      data: {
        category: responseCategory,
        layouts: responseLayouts.data,
        pagination: responseLayouts.meta.pagination,
      },
    }
  }
}