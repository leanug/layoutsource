import { ENV } from '@/utils';
import { Layout } from '@/api';

export { default } from './search'

export async function getServerSideProps (context) {
  const {
    query: { s, page = 1 },
  } = context

  const layoutCtrl = new Layout()

  try {
    const response = await layoutCtrl.searchDesigns({ s, page })

    if(! response?.data) {
      if(ENV.IS_DEV) {
        console.error(`No data found for: ${ s }, ${ response }`)
      }
      return {
        props: {
          data: null
        }
      }
    }

    return {
      props: {
        data: {
          designs: response?.data,
          pagination: response?.meta.pagination,
          searchText: s
        }
      }
    }
  } catch (error) {
    if(ENV.IS_DEV) {
      console.error('Error fetching searched design. ',error)
    }
    return {
      props: {
        data: null
      }
    }
  }
}