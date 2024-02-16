import { AuthProvider } from '@/contexts'
import '../src/app/globals.css'
import { BasicLayout } from '@/components'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <BasicLayout>
        <Component {...pageProps} />
      </BasicLayout>
    </AuthProvider>
  )
}

export default MyApp
