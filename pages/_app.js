import { AuthProvider, ModalProvider, NotificationProvider } from '@/contexts'
import '../src/app/globals.css'
import { BasicLayout } from '@/components/layout/'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ModalProvider>
          <BasicLayout>
            <Component { ...pageProps } />
          </BasicLayout>
        </ModalProvider>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default MyApp
