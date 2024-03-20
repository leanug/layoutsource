import { UserLayout } from '@/components'

const DesignTagsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-4xl font-extrabold text-center mb-4">
        Design tags page
      </h2>
      <p className="text-xl text-center mb-10">
        The page you are looking for does not exist, it might have been moved or
        deleted.
      </p>
    </div>
  )
}

DesignTagsPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default DesignTagsPage
