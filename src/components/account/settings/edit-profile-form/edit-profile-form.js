import { useFormik } from 'formik'

import { initialValues, validationSchema } from './edit-profile-form-settings'
import { useAuth } from '@/hooks'
import { User } from '@/api'
import { compareAndUpdate } from '@/utils'
import { useNotificationStore } from '@/store'
import { LoadingIndicator } from '@/components'

export function EditProfileForm() {
  const { user, updateUser } = useAuth()
  const { addNotification } = useNotificationStore()

  const userCtrl = new User()

  const initialData = {
    bio: user?.bio || '',
    email: user?.email || '',
    location: user?.location || '',
    name: user?.name || '',
    website: user?.website || '',
    username: user?.username || '',
  }

  const formik = useFormik({
    initialValues: initialValues(initialData),
    validationSchema: validationSchema(),
    validateOnChange: false, // prevent validation on input change

    onSubmit: async (formData) => {
      const response = await userCtrl.updateMe(user.id, formData)
      if (response.success) {
        // Function to compare initialData with formData and update user when values change
        compareAndUpdate(initialData, formData, updateUser)

        // Notify user success update
        addNotification(
          `Your user data has been successfully updated.`,
          'success',
        )
      } else {
        console.log(response)
        // Notify update error
        addNotification(`Oops! ${response.error.message}`, 'error')
      }
    },
  })

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`form-input ${
              formik.touched.name && formik.errors.name ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-2">{formik.errors.name}</p>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`form-input ${
              formik.touched.email && formik.errors.email
                ? 'border-red-500'
                : ''
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-2">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="bio" className="label">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bio}
            className={`form-input ${
              formik.touched.bio && formik.errors.bio ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.bio && formik.errors.bio && (
            <p className="text-red-500 text-sm mt-2">{formik.errors.bio}</p>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="location" className="label">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
            className={`form-input ${
              formik.touched.location && formik.errors.location
                ? 'border-red-500'
                : ''
            }`}
          />
          {formik.touched.location && formik.errors.location && (
            <p className="text-red-500 text-sm mt-2">
              {formik.errors.location}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="website" className="label">
            Your website
          </label>
          <input
            type="text"
            id="website"
            name="website"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.website}
            className={`form-input ${
              formik.touched.website && formik.errors.website
                ? 'border-red-500'
                : ''
            }`}
          />
          {formik.touched.website && formik.errors.website && (
            <p className="text-red-500 text-sm mt-2">{formik.errors.website}</p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className={`form-input ${
              formik.touched.username && formik.errors.username
                ? 'border-red-500'
                : ''
            }`}
          />
          <p className="text-sm mt-2.5">layoutloom.com/{user?.username}</p>
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-500 text-sm mt-2">
              {formik.errors.username}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={`
             ease-in text-white px-4 py-2.5
            rounded-lg font-semibold ml-auto mt-6 text-center w-52 flex justify-center 
            ${formik.isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? <LoadingIndicator size={6} /> : 'Update'}
        </button>
      </form>
    </div>
  )
}
