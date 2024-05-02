import UploadDesignForm from '@/admin/designs/designs-form'

const Admin = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="font-extrabold mb-3 dark:text-white text-gray-950">
        Admin
      </h1>
      <UploadDesignForm />
    </div>
  )
}

export default Admin
