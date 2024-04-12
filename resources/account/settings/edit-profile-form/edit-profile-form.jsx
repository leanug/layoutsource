import { useState } from 'react'

import { useFormik } from 'formik'

import { initialValues, validationSchema } from './edit-profile-form-settings'
import { useAuth } from '@/hooks'
import { User } from '@/api'
import { compareAndUpdate } from '@/utils'
import { useNotificationStore } from '@/store'
import { LoadingIndicator } from '@/components'

export function EditProfileForm() {
  const [loading, setLoading] = useState(false) // Initialize the loading state
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
      try {
        setLoading(true)
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
      } finally {
        setLoading(false)
      }
      
    },
  })

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="identifier" className="form-control w-full">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              type="text"
              id="name"
              name="name"
              className={`
                grow input input-bordered w-full
                ${formik.errors.name && formik.touched.name ? 'input-error' : ''}
              `}
              placeholder="Name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && (
              <div className="label">
                <span className="label-text-alt text-red-500">{formik.errors.name}</span>
              </div>
            )}
          </label>
        </div>
        
        <div className="mb-3">
          <label htmlFor="identifier" className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              id="email"
              name="email"
              className={`
                grow input input-bordered w-full
                ${formik.errors.email && formik.touched.email ? 'input-error' : ''}
              `}
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && (
              <div className="label">
                <span className="label-text-alt text-red-500">{formik.errors.email}</span>
              </div>
            )}
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="identifier" className="form-control w-full">
            <div className="label">
              <span className="label-text">Bio</span>
            </div>
            <textarea
              type="text"
              id="bio"
              name="bio"
              placeholder="Bio"
              className={`
                grow textarea textarea-bordered
                ${formik.errors.bio && formik.touched.bio ? 'input-error' : ''}
              `}
              onChange={formik.handleChange}
              value={formik.values.bio}
            />
            {formik.errors.bio && (
              <div className="label">
                <span className="label-text-alt text-red-500">{formik.errors.bio}</span>
              </div>
            )}
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="identifier" className="form-control w-full">
            <div className="label">
              <span className="label-text">Location</span>
            </div>
            <input
              type="text"
              id="location"
              name="location"
              className={`
                grow input input-bordered w-full
                ${formik.errors.location && formik.touched.location ? 'input-error' : ''}
              `}
              placeholder="Location"
              onChange={formik.handleChange}
              value={formik.values.location}
            />
            {formik.errors.location && (
              <div className="label">
                <span className="label-text-alt text-red-500">{formik.errors.location}</span>
              </div>
            )}
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="identifier" className="form-control w-full">
            <div className="label">
              <span className="label-text">Your website</span>
            </div>
            <input
              type="text"
              id="website"
              name="website"
              className={`
                grow input input-bordered w-full
                ${formik.errors.website && formik.touched.website ? 'input-error' : ''}
              `}
              placeholder="Your website"
              onChange={formik.handleChange}
              value={formik.values.website}
            />
            {formik.errors.website && (
              <div className="label">
                <span className="label-text-alt text-red-500">{formik.errors.website}</span>
              </div>
            )}
          </label>
        </div>

        <div className="mb-6">
          <label htmlFor="identifier" className="form-control w-full">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              id="username"
              name="username"
              className={`
                grow input input-bordered w-full
                ${formik.errors.username && formik.touched.username ? 'input-error' : ''}
              `}
              placeholder="Username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.errors.username && (
              <div className="label">
                <span className="label-text-alt text-red-500">{formik.errors.username}</span>
              </div>
            )}
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary dark:text-white w-full relative"
          disabled={formik.isSubmitting}
        >
          <span>Update</span>
          {loading ? (
            <div className="absolute inset-0 right-3 flex justify-end items-center">
              <LoadingIndicator />
            </div>
          ) : null}
        </button>
      </form>
    </div>
  )
}
