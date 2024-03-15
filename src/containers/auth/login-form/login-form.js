import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'

import { useFormik } from 'formik'

import { initialValues, validationSchema } from './login-form-utils'
import { useAuth, useLoading } from '@/hooks'
import { Auth } from '@/api'
import {
  EyeSolid,
  EyeSlashSolid,
  TriangleExclamationSolid,
  LoadingIndicator,
} from '@/components'

const authCtrl = new Auth()

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()
  const { login } = useAuth()
  const { startLoading, stopLoading, loading } = useLoading() // Initialize the loading state

  const handleTogglePassword = (event) => {
    event.preventDefault()
    setShowPassword(!showPassword)
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      startLoading() // Start loading when form is submitted
      try {
        const response = await authCtrl.login(formValue)
        if (response.success) {
          setError(false)
          login(response.data.jwt)
          router.push('/')
        } else {
          setError(true)
        }
      } finally {
        stopLoading()
      }
    },
  })

  return (
    <section className="w-full max-w-[420px]">
      <div className="mx-auto mb-10 container">
        {/* Render loading indicator if loading */}
        {loading && <LoadingIndicator />}
        <h1 className="form-title text-center mb-7">Log in</h1>

        {/* Error login warning */}
        {error ? (
          <div className="bg-red-50 text-gray-900 rounded-lg p-5 flex gap-4 items-center mb-5">
            <TriangleExclamationSolid className="w-10 h-10 fill-red-500" />
            <p>Incorrect email or password. Please enter them again.</p>
          </div>
        ) : null}
        {/* End error login warning */}

        {/* Login form */}
        <form
          onSubmit={formik.handleSubmit}
          className={formik.isSubmitting ? 'pointer-events-none' : ''}
        >
          <div className="mb-4">
            <label htmlFor="identifier" className="label">
              Email:
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              className={`
                form-input
                ${formik.errors.identifier && formik.touched.identifier ? 'border-red-500' : 'border-gray-300'}
              `}
              placeholder="Email or username"
              onChange={formik.handleChange}
              value={formik.values.identifier}
            />
            {formik.errors.identifier && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.identifier}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-2.5 relative">
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

          <div className="text-end mt-2.5 mb-5">
            <Link
              href="/join/sign-up"
              className="text-blue-750 hover:text-blue-900 transition ease-in"
            >
              Forgot your password?{' '}
            </Link>
          </div>
          <button
            type="submit"
            className="btn-primary w-full relative"
            disabled={formik.isSubmitting}
          >
            <span>Log in</span>
            {loading ? (
              <div className="absolute inset-0 right-3 flex justify-end items-center">
                <LoadingIndicator size="6" />
              </div>
            ) : null}
          </button>
        </form>
        {/* End login form */}

        <div className="mt-3 text-center">
          <Link
            href="/join/sign-up"
            className="text-blue-750 hover:text-blue-900 transition ease-in"
          >
            You don&apos;t have an account?
          </Link>
        </div>
      </div>
    </section>
  )
}
