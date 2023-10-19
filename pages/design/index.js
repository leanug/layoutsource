import { ENV } from '@/utils';
import { isValidSlug } from "@/utils"
import { Layout } from "@/api";

export { default } from './[design]'

/**
 * Get server-side props for the design page.
 *
 * @param {object} context - The context object from Next.js.
 * @param {object} context.params - The params object containing route parameters.
 * @param {string} context.params.design - The design slug extracted from the URL.
 * @returns {object} - An object containing props for the design page.
 */
export async function getServerSideProps(context) {
  console.log(context);
  const { params: { design: designSlug } } = context
  const layoutCtrl = new Layout()

  if(! isValidSlug(designSlug)) {
    return {
      props: {
        data: null
      }
    }
  }

  try {
    const response = await layoutCtrl.getLayoutBySlug(designSlug)
    
    if(! response?.data) {
      if(ENV.IS_DEV) {
        console.error(`No data found for designSlug: ${ designSlug }, ${ response }`)
      }
      return {
        props: {
          data: null
        }
      }
    }

    return {
      props: {
        data: response
      }
    }
  } catch (error) {
    if(ENV.IS_DEV) {
      console.error('Error fetching design. ',error)
    }
    return {
      props: {
        data: null
      }
    }
  }  
}