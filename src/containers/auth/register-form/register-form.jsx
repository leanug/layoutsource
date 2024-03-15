import { useRouter } from 'next/router'
import { useState } from 'react'

import { useFormik } from 'formik'

import { initialValues, validationSchema } from './register-form-utils'
import { Auth } from '@/api'
import { useLoading, useAuth } from '@/hooks'
import {
  EyeSolid,
  EyeSlashSolid,
  TriangleExclamationSolid,
  LoadingIndicator,
} from '@/components'

const authCtrl = new Auth()

export function RegisterForm() {
  const { login } = useAuth()
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { startLoading, stopLoading, loading } = useLoading() // Initialize the loading state
  const router = useRouter()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false, // prevent validation on input change
    onSubmit: async (formValue) => {
      startLoading() // Start loading when form is submitted
      try {
        const response = await authCtrl.register({ ...formValue })
        if (response.success) {
          setErrorMsg('')
          setError(false)
          login(response.data.jwt)
          router.push('/')
        } else {
          setError(true)
          setErrorMsg(response.error.message)
        }
      } finally {
        stopLoading()
      }
    },
  })

  const handleTogglePassword = (event) => {
    event.preventDefault()
    setShowPassword(!showPassword)
  }

  return (
    <section className="w-full max-w-[420px]">
      <div className="mx-auto mb-10 container">
        {/* Render loading indicator if loading */}

        <h1 className="form-title text-center mb-7">Register</h1>

        {/* Error login warning */}
        {error ? (
          <div className="bg-red-50 text-black rounded-lg p-5 flex gap-4 items-center mb-5">
            <TriangleExclamationSolid className="w-10 h-10 fill-red-500" />
            <p>{errorMsg}</p>
          </div>
        ) : null}
        {/* End error login warning */}

        {/* Login form */}
        <form
          onSubmit={formik.handleSubmit}
          className={formik.isSubmitting ? 'pointer-events-none' : ''}
        >
          {/* Username input */}
          <div className="mb-5">
            <label htmlFor="username" className="label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className={`
                form-input
                ${formik.errors.username && formik.touched.username ? 'border-red-500' : 'border-gray-300'}
              `}
              placeholder="Email"
              onChange={formik.handleChange}
              defaultValue={formik.values.username}
            />
            {formik.errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.username}
              </p>
            )}
          </div>
          {/* End Username input */}

          {/* Email input */}
          <div className="mb-5">
            <label htmlFor="email" className="label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className={`
                form-input
                ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'}
              `}
              placeholder="Email"
              onChange={formik.handleChange}
              defaultValue={formik.values.email}
            />
            {formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
          {/* End Email input */}

          {/* Password */}
          <div className="mb-5 relative">
            <label htmlFor="password" className="label">
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className={`
                  form-input
                  ${formik.errors.password && formik.touched.password ? 'border-red-500' : 'border-gray-300'} 
                `}
                placeholder="Password"
                onChange={formik.handleChange}
              />
              <button
                className="absolute top-1/2 transform -translate-y-1/2 right-4"
                onClick={(event) => handleTogglePassword(event)}
              >
                {showPassword ? (
                  <EyeSlashSolid className="w-5 h-5 fill-gray-600" />
                ) : (
                  <EyeSolid className="w-5 h-5 fill-gray-600" />
                )}
              </button>
            </div>
            {formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>
          {/* End Password */}

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary w-full relative"
            disabled={formik.isSubmitting}
          >
            <span>Register with email</span>
            {loading ? (
              <div className="absolute inset-0 right-3 flex justify-end items-center">
                <LoadingIndicator size="6" />
              </div>
            ) : null}
          </button>
          {/* End Submit */}
        </form>
      </div>
    </section>
  )
}
