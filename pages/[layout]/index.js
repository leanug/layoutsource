import { Layout } from "@/api";

export { default } from './layout'

export async function getServerSideProps(context) {
  const { params: { layout } } = context
  const layoutCtrl = new Layout()
  const response = await layoutCtrl.getLayoutBySlug( layout )

  return {
    props: {
      data: response
    }
  }
}