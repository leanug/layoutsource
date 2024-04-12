import { SubmitDesignForm, AuthLayout } from '@/components'

function SubmitPage() {
  return (
    <section className="section-full h-full flex items-center">
      <SubmitDesignForm />
    </section>
  )
}

SubmitPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default SubmitPage
