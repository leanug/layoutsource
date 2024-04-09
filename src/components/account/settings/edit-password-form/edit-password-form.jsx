import { useState } from 'react'

import { useFormik } from 'formik'

import { initialValues, validationSchema } from './edit-password-form.form'
import { useNotificationStore } from '@/store'
import { Auth } from '@/api'
import { LoadingIndicator, EyeSlashSolid, EyeSolid } from '@/components'

export function EditPasswordForm() {
  const [loading, setLoading] = useState(false) // Initialize the loading state
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
      try {
        setLoading(true)
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
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <h1 className="mb-4 font-semibold text-lg">Change your password</h1>
      <div className="mb-3">
        <div className="label">
          <span className="label-text">Current Password</span>
        </div>
        
        {/* Button */}
        <label htmlFor="currentPassword" className="input input-bordered flex items-center gap-2">
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            id="currentPassword"
            name="currentPassword"
            className={`
              grow
              ${formik.errors.password && formik.touched.password ? 'input-error' : ''}
            `}
            placeholder="Current Password"
            onChange={formik.handleChange}
          />                
          <button onClick={(event) => handleToggleCurrentPassword(event)}>
          {!showCurrentPassword ? (
            <EyeSlashSolid className="w-5 h-5 fill-gray-600 dark:fill-gray-200" />
          ) : (
            <EyeSolid className="w-5 h-5 fill-gray-600 dark:fill-gray-200" />
          )}
        </button>
        </label>
          {/* End Button */}
        
        {formik.touched.currentPassword && formik.errors.currentPassword && (
          <div className="label">
            <span className="label-text-alt text-red-500">{formik.errors.currentPassword}</span>
          </div>
        )}
      </div>

      <div className="mb-3">
        <div className="label">
          <span className="label-text">New Password</span>
        </div>
        
        {/* Button */}
        <label htmlFor="password" className="input input-bordered flex items-center gap-2">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            className={`
              grow
              ${formik.errors.password && formik.touched.password ? 'input-error' : ''}
            `}
            placeholder="Enter new password"
            onChange={formik.handleChange}
          />                
          <button onClick={(event) => handleTogglePassword(event)}>
          {!showPassword ? (
            <EyeSlashSolid className="w-5 h-5 fill-gray-600 dark:fill-gray-200" />
          ) : (
            <EyeSolid className="w-5 h-5 fill-gray-600 dark:fill-gray-200" />
          )}
        </button>
        </label>
          {/* End Button */}
        
        {formik.touched.password && formik.errors.password && (
          <div className="label">
            <span className="label-text-alt text-red-500">{formik.errors.password}</span>
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="label">
          <span className="label-text">Password Confirmation</span>
        </div>
        
        {/* Button */}
        <label htmlFor="passwordConfirmation" className="input input-bordered flex items-center gap-2">
          <input
            type={showPasswordConfirmation ? 'text' : 'password'}
            id="passwordConfirmation"
            name="passwordConfirmation"
            className={`
              grow
              ${formik.errors.passwordConfirmation && formik.touched.passwordConfirmation ? 'input-error' : ''}
            `}
            placeholder="Password Confirmation"
            onChange={formik.handleChange}
          />                
          <button onClick={(event) => handleTogglePasswordConfirmation(event)}>
          {!showPasswordConfirmation ? (
            <EyeSlashSolid className="w-5 h-5 fill-gray-600 dark:fill-gray-200" />
          ) : (
            <EyeSolid className="w-5 h-5 fill-gray-600 dark:fill-gray-200" />
          )}
        </button>
        </label>
          {/* End Button */}
        
        {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
          <div className="label">
            <span className="label-text-alt text-red-500">{formik.errors.passwordConfirmation}</span>
          </div>
        )}
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
  )
}
