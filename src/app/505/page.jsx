import Link from 'next/link'

const ServerErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-6xl font-extrabold mb-3 dark:text-white text-gray-950">
        505
      </h1>
      <h2 className="text-4xl font-extrabold text-center mb-4 dark:text-white text-gray-950">
        Oops! Something went wrong on our end. Our team has been notified and is
        working to fix the issue. Please try again later.
      </h2>
      {/* <p className="text-xl text-center mb-10 dark:text-white text-gray-950">
        The page you are looking for does not exist, it might have been moved or
        deleted.
      </p> */}
      <Link href="/" className="btn btn-primary btn-lg">
        Go Home
      </Link>
    </div>
  )
}

export default ServerErrorPage
