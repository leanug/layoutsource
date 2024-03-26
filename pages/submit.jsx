import { SubmitDesignForm, UserLayout } from '@/components'

function SubmitPage() {
  return (
    <section className="section-full h-full flex items-center">
      <SubmitDesignForm />
    </section>
  )
}

SubmitPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default SubmitPage
