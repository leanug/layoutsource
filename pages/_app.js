import { AuthProvider } from '@/contexts'
import { BaseLayout } from '@/components'
import '../src/app/globals.css'

export default function App({ Component, pageProps }) {
  // If page layout is available, use it. Else return the page
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <AuthProvider>
      <BaseLayout>{getLayout(<Component {...pageProps} />)}</BaseLayout>
    </AuthProvider>
  )
}
