import { AuthLayout } from '@/components'

export default function AboutPage() {
  return (
    <>
      <section className="section-full lg:mb-10">
        <h1 className="text-center text-2xl mt-20">🚧 About page coming soon! 🚧</h1>
      </section>
    </>
  )
}

AboutPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}