import { useRouter } from 'next/router';

import { AuthProvider } from '@/contexts'
import '../src/app/globals.css'
import { BasicLayout, AuthLayout } from '@/components'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const isAuthPage = router.pathname.startsWith('/join')

  return (
    <AuthProvider>
      {isAuthPage ? (
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      ) : (
        <BasicLayout>
          <Component {...pageProps} />
        </BasicLayout>
      )}
    </AuthProvider>
  )
}

export default MyApp
