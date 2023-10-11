import { Layout, Category } from '@/api'
import { ENV } from '@/utils';
import { isValidSlug, isValidType } from '@/utils/validation'

export { default } from './category'

export async function getServerSideProps (context) {
  const { params: { type, category: slug } } = context;
  const layoutCtrl = new Layout()
  const categoryCtrl = new Category()
  
  // Validate the 'type' parameter
  if (! isValidType(type) || ! isValidSlug(slug)) {
    return {
      props: {
        data: null
      },
    }
  }

  try {
    const layoutsResponse = await layoutCtrl.getLayoutsByCategory({ 
      slug,
      page: 1
    })
  
    // Gets category list by type (home-pages, landing-pages, ...)
    const categoriesResponse = await categoryCtrl.getCategoriesByType(type)
    
    if (layoutsResponse && categoriesResponse)
      return {
        props: {
          data: {
            layouts: layoutsResponse.data,
            type: type,
            pagination: layoutsResponse.meta.pagination,
            categories: categoriesResponse.data,
            categorySlug: slug
          },
        }
      }

    throw new Error('Error fetching data')
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      data: null
    },
  }; 
}