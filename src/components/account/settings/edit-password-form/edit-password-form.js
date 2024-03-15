import { useState } from 'react'

import { useFormik } from 'formik'

import { initialValues, validationSchema } from './edit-password-form.form'
import { useNotificationStore } from '@/store'
import { Auth } from '@/api'
import { LoadingIndicator, EyeSlashSolid, EyeSolid } from '@/components'

export function EditPasswordForm() {
  const { addNotification } = useNotificationStore()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false)

  const authCtrl = new Auth()

  const initialData = {
    currentPassword: '',
    password: '',
    passwordConfirmation: '',
  }

  const handleToggleCurrentPassword = (event) => {
    event.preventDefault()
    setShowCurrentPassword(!showCurrentPassword)
  }

  const handleTogglePassword = (event) => {
    event.preventDefault()
    setShowPassword(!showPassword)
  }

  const handleTogglePasswordConfirmation = (event) => {
    event.preventDefault()
    setShowPasswordConfirmation(!showPasswordConfirmation)
  }

  const formik = useFormik({
    initialValues: initialValues(initialData),
    validationSchema: validationSchema(),
    validateOnChange: false, // prevent validation on input change
    onSubmit: async (formValue, { resetForm }) => {
      // Update password
      const response = await authCtrl.changePassword(formValue)

      if (response?.success) {
        resetForm() // Reset form

        // Notify user success update
        addNotification(
          `Your password has been successfully updated.`,
          'success',
        )
      } else {
        // Notify update error
        addNotification(`Oops! ${response.error.message}`, 'error')
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div className="mb-5">
        <label htmlFor="currentPassword" className="label">
          Current Password
        </label>
        <div className="relative">
          <input
            id="currentPassword"
            name="currentPassword"
            type={showCurrentPassword ? 'text' : 'password'}
            placeholder="Enter the current password..."
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            className={`form-input ${
              formik.touched.currentPassword && formik.errors.currentPassword
                ? 'border-red-500'
                : ''
            }`}
          />
          <button
            className="absolute top-1/2 transform -translate-y-1/2 right-4"
            onClick={(event) => handleToggleCurrentPassword(event)}
          >
            {showCurrentPassword ? (
              <EyeSlashSolid className="w-5 h-5 fill-gray-600 dark:fill-gray-300" />
            ) : (
              <EyeSolid className="w-5 h-5 fill-gray-600 dark:fill-gray-300" />
            )}
          </button>
        </div>
        {formik.touched.currentPassword && formik.errors.currentPassword && (
          <p className="text-red-500 text-sm mt-2">
            {formik.errors.currentPassword}
          </p>
        )}
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="label">
          New Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter new password..."
            value={formik.values.password}
            onChange={formik.handleChange}
            className={`form-input ${
              formik.touched.password && formik.errors.password
                ? 'border-red-500'
                : ''
            }`}
          />
          <button
            className="absolute top-1/2 transform -translate-y-1/2 right-4"
            onClick={(event) => handleTogglePassword(event)}
          >
            {showPassword ? (
              <EyeSlashSolid className="w-5 h-5 fill-gray-600 dark:fill-gray-300" />
            ) : (
              <EyeSolid className="w-5 h-5 fill-gray-600 dark:fill-gray-300" />
            )}
          </button>
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm mt-2">{formik.errors.password}</p>
        )}
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="label">
          Password Confirmation
        </label>
        <div className="relative">
          <input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type={showPasswordConfirmation ? 'text' : 'password'}
            placeholder="Retype the new password"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            className={`form-input ${
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
                ? 'border-red-500'
                : ''
            }`}
          />
          <button
            className="absolute top-1/2 transform -translate-y-1/2 right-4"
            onClick={(event) => handleTogglePasswordConfirmation(event)}
          >
            {showPasswordConfirmation ? (
              <EyeSlashSolid className="w-5 h-5 fill-gray-600 dark:fill-gray-300" />
            ) : (
              <EyeSolid className="w-5 h-5 fill-gray-600 dark:fill-gray-300" />
            )}
          </button>
        </div>
        {formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation && (
            <p className="text-red-500 text-sm mt-2">
              {formik.errors.passwordConfirmation}
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
  )
}
