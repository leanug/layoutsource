import { AuthProvider } from '@/contexts'
import '../src/app/globals.css'
import Layout from '@/components/layout/'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component { ...pageProps } />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
