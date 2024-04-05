import {
  EditProfileForm,
  EditImageForm,
  SettingsMenu,
  AuthLayout,
} from '@/components'

function UserSettingsPage() {
  return (
    <section className="section-full mt-20">
      <div className="flex flex-row mx-auto gap-8 w-full max-w-3xl">
        <div className="w-48 mb-8 md:mb-0">
          <SettingsMenu currentPage={'general'} />
        </div>
        <div className="w-full">
          <div className="mb-10">
            <EditImageForm />
          </div>
          <EditProfileForm />
        </div>
      </div>
    </section>
  )
}

UserSettingsPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default UserSettingsPage
