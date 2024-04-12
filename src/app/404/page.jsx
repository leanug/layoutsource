import Link from 'next/link'

import { NotFoundLayout } from '@/components'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-6xl font-extrabold mb-3 dark:text-white text-gray-950">
        404
      </h1>
      <h2 className="text-4xl font-extrabold text-center mb-4 dark:text-white text-gray-950">
        Oops, page not found
      </h2>
      <p className="text-xl text-center mb-10 dark:text-white text-gray-950">
        The page you are looking for does not exist, it might have been moved or
        deleted.
      </p>
      <Link href="/" className="btn btn-primary btn-lg">
        Go Home
      </Link>
    </div>
  )
}

NotFoundPage.getLayout = (page) => {
  return <NotFoundLayout>{page}</NotFoundLayout>
}

export default NotFoundPage
