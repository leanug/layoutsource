import { Layout } from '@/api';

export { default } from './search'

export async function getServerSideProps (context) {
  const {
    query: { s, page = 1 },
  } = context

  const layoutCtrl = new Layout()
  const response = await layoutCtrl.searchLayouts(s, page)

  return {
    props: {
      layouts: response.data,
      pagination: response.meta.pagination,
      searchText: s
    }
  }
}