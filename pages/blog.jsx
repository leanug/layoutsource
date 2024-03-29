import Link from 'next/link'
import Image from 'next/image'

import { DefaultLayout } from '@/components'

export default function HomePage() {
  return (
    <>
      <section className="section-full lg:mb-10">
       <h1>This is a blog</h1>
      </section>
    </>
  )
}

HomePage.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>
}