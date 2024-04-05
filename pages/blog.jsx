import { AuthLayout } from '@/components'

export default function BlogPage() {
  return (
    <>
      <section className="section-full lg:mb-10">
        <h1 className="text-center text-2xl mt-20">🚧 Blog page under construction! 🚧</h1>
      </section>
    </>
  )
}

BlogPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}