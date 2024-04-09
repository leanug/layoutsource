import { useRouter } from 'next/router'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { useFormik } from 'formik'

import { initialValues, validationSchema } from './login-form-utils'
import { useAuth } from '@/hooks'
import { Auth } from '@/api'
import {
  EyeSolid,
  EyeSlashSolid,
  TriangleExclamationSolid,
  LoadingIndicator,
} from '@/components'

const authCtrl = new Auth()

export function LoginForm() {
  const calledPush = useRef(false)
  const [loading, setLoading] = useState(false) // Initialize the loading state
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleTogglePassword = (event) => {
    event.preventDefault()
    setShowPassword(!showPassword)
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,

    onSubmit: async (formValue) => {
      setLoading(true)
      const response = await authCtrl.login(formValue)
      if (response.success) {
        setError(false)
        login(response.data.jwt)

        if (!calledPush.current) {
          calledPush.current = true
          setLoading(false)
          router.push('/designs/homepages')
        }
      } else {
        calledPush.current = false
        setLoading(false)
        setError(true)
      }
    }
  })

  return (
    <section className="w-full max-w-[420px]">
      <div className="mx-auto mb-10 container">
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
            <label htmlFor="identifier" className="form-control w-full">
              <div className="label">
                <span className="label-text">Email or Username</span>
              </div>
              <input
                type="text"
                id="identifier"
                name="identifier"
                className={`
                  grow input input-bordered w-full
                  ${formik.errors.identifier && formik.touched.identifier ? 'input-error' : ''}
                `}
                placeholder="Email or username"
                onChange={formik.handleChange}
                value={formik.values.identifier}
              />
              {formik.errors.identifier && (
                <div className="label">
                  <span className="label-text-alt text-red-500">{formik.errors.identifier}</span>
                </div>
              )}
            </label>
          </div>

          {/* Password */}
          <div className="mb-2.5">
            <div className="label">
              <span className="label-text">Password</span>
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
                placeholder="Password"
                onChange={formik.handleChange}
              />                
              <button onClick={(event) => handleTogglePassword(event)}>
              {showPassword ? (
                <EyeSlashSolid className="w-5 h-5 fill-gray-600 dark:fill-gray-200" />
              ) : (
                <EyeSolid className="w-5 h-5 fill-gray-600 dark:fill-gray-200" />
              )}
            </button>
            </label>
             {/* End Button */}
            
            {formik.errors.password && (
              <div className="label">
                <span className="label-text-alt text-red-500">{formik.errors.password}</span>
              </div>
            )}
          </div>
          {/* End Password */}

          <div className="text-end mt-2.5 mb-5">
            {/* <Link
              href="/join/sign-up"
              className="text-blue-750 dark:text-blue-200 dark:hover:text-blue-400 hover:text-blue-900 transition ease-in"
            >
              Forgot your password?{' '}
            </Link> */}
          </div>
          <button
            type="submit"
            className="btn btn-primary dark:text-white w-full relative"
            disabled={formik.isSubmitting}
          >
            <span>Log in</span>
            {loading ? (
              <div className="absolute inset-0 right-3 flex justify-end items-center">
                <LoadingIndicator />
              </div>
            ) : null}
          </button>
        </form>
        {/* End login form */}

        <div className="mt-4 text-center">
          <Link
            href="/join/sign-up"
            className="text-blue-750 hover:text-blue-900 dark:text-blue-200 dark:hover:text-blue-400 transition ease-in"
          >
            You don&apos;t have an account?
          </Link>
        </div>
      </div>
    </section>
  )
}
