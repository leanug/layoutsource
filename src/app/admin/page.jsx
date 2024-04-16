import UploadDesignForm from "@/containers/admin/designs-form"

const Admin = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-6xl font-extrabold mb-3 dark:text-white text-gray-950">
        Admin
      </h1>
      <UploadDesignForm />
    </div>
  )
}

export default Admin
