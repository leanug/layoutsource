import { Category } from '@/api'
import { ENV } from '@/utils';
import { isValidSlug, isValidType } from '@/utils/validation'

export { default } from './category'

export async function getServerSideProps (context) {
  const { params: { type, category: slug } } = context;
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
    // Gets category list by type (home-pages, landing-pages, ...)
    const categoriesResponse = await categoryCtrl.getCategoriesByType(type)
    
    if (categoriesResponse)
      return {
        props: {
          data: {
            categories: categoriesResponse.data,
          },
        }
      }

    throw new Error('Error fetching data')
  } catch (error) {
    if(ENV.IS_DEV) {
      console.error(error)
    }
  }

  return {
    props: {
      data: null
    },
  }; 
}