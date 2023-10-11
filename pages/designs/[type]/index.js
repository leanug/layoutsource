import { Layout, Category } from '@/api'
import { isValidType } from '@/utils/validation';
import { ENV } from '@/utils';

export { default } from './type'

/**
 * Retrieves data for the DesignsByTypePage component during server-side rendering.
 *
 * @param {object} context - The context object provided by Next.js.
 * @param {object} context.params - The parameters from the URL.
 * @param {string} context.params.type - The type of the designs (homes, landings, components...)
 * @returns {Promise<{ props: { data: object|null } }>} A promise that resolves to the props for the PageTypePage component.
 */
export async function getServerSideProps (context) {
  const { params: { type } } = context;
  const layoutCtrl = new Layout()
  const categoryCtrl = new Category()
  
  // Validate the 'type' parameter
  if (! isValidType(type)) {
    return {
      props: {
        data: null
      },
    }
  }

  try {
    const layoutsResponse = await layoutCtrl.getLayoutsByType({ 
      slug: type,
      page: 1
    })

    const categoriesResponse = await categoryCtrl.getCategoriesByType(type)
    
    if (layoutsResponse && categoriesResponse)
      return {
        props: {
          data: {
            layouts: layoutsResponse.data,
            type: type,
            pagination: layoutsResponse.meta.pagination,
            categories: categoriesResponse.data,
            categorySlug: 'all'
          },
        }
      }

    if (! layoutsResponse) 
      throw new Error('Error fetching layouts data');

    if (! categoriesResponse) 
      throw new Error('Error fetching categories data');
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      data: null
    },
  };
}