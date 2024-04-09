import { useRouter } from 'next/router'
import { useState, useRef } from 'react'

import { useFormik } from 'formik'

import { initialValues, validationSchema } from './register-form-utils'
import { Auth } from '@/api'
import { useAuth } from '@/hooks'
import {
  EyeSolid,
  EyeSlashSolid,
  TriangleExclamationSolid,
  LoadingIndicator,
} from '@/components'

const authCtrl = new Auth()

export function RegisterForm() {
  const calledPush = useRef(false)
  const { login } = useAuth()
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false) // Initialize the loading state
  const router = useRouter()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false, // prevent validation on input change
    
    onSubmit: async (formValue) => {
      setLoading(true) // Start loading when form is submitted
      const response = await authCtrl.register({ ...formValue })
      if (response.success) {
        setErrorMsg('')
        setError(false)
        login(response.data.jwt)

        if (!calledPush.current) {
          calledPush.current = true
          setLoading(false)
          router.push('/')
        }
      } else {
        setLoading(false)
        setError(true)
        setErrorMsg(response.error.message)
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
            <label htmlFor="username" className="form-control w-full">
              <div className="label">
                <span className="label-text">Username</span>
              </div>

              <input
                type="text"
                id="username"
                className={`
                  grow input input-bordered w-full
                  ${formik.errors.username && formik.touched.username ? 'input-error' : ''}
                `}
                placeholder="Email"
                onChange={formik.handleChange}
                defaultValue={formik.values.username}
              />

              {formik.errors.username && (
              <div className="label">
                <span className="label-text-alt text-red-500">{formik.errors.username}</span>
              </div>
            )}
            </label>
          </div>
          {/* End Username input */}

          {/* Email input */}
          <div className="mb-5">
            <label htmlFor="email" className="form-control w-full">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              
              <input
                type="email"
                id="email"
                className={`
                grow input input-bordered w-full
                  ${formik.errors.email && formik.touched.email ? 'input-error' : ''}
                `}
                placeholder="Email"
                onChange={formik.handleChange}
                defaultValue={formik.values.email}
              />

              {formik.errors.email && (
                <div className="label">
                  <span className="label-text-alt text-red-500">{formik.errors.email}</span>
                </div>
              )}
            </label>
          </div>
          {/* End Email input */}

          {/* Password */}
          <div className="mb-5 relative">
            <label htmlFor="password" className="form-control w-full">
              <div className="label">
                <span className="label-text">Password:</span>
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
            </label>
          </div>
          {/* End Password */}

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary dark:text-white w-full relative"
            disabled={formik.isSubmitting}
          >
            <span>Sign up</span>
            {loading ? (
              <div className="absolute inset-0 right-3 flex justify-end items-center">
                <LoadingIndicator />
              </div>
            ) : null}
          </button>
          {/* End Submit */}
        </form>
      </div>
    </section>
  )
}
