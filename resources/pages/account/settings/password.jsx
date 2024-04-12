import { useAuth } from '@/hooks'
import {
  EditPasswordForm,
  SettingsMenu,
  AuthLayout,
} from '@/components'

function UserSettingsPage() {
  return (
    <section className="section-full mt-20">
      <div className="flex flex-row w-full mx-auto gap-8 max-w-3xl">
        <div className="w-48">
          <SettingsMenu currentPage={'password'} />
        </div>
        <div className="w-full">
          <EditPasswordForm />
        </div>
      </div>
    </section>
  )
}

UserSettingsPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default UserSettingsPage
