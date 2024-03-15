import { AuthProvider } from '@/contexts'
import { BaseLayout } from '@/components' // Import the BaseLayout component
import '../src/app/globals.css'

export default function App({ Component, pageProps }) {
  // If page layout is available, use it. Else return the page
  const getLayout = Component.getLayout || ((page) => page)
  console.count('_app.js')
  return (
    <AuthProvider>
      <BaseLayout>{getLayout(<Component {...pageProps} />)}</BaseLayout>
    </AuthProvider>
  )
}
