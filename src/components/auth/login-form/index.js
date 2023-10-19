import { Auth } from "@/api";
import { ENV } from "@/utils";
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./login-form-utils";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks";

const authCtrl = new Auth()

function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await authCtrl.login(formValue)
        login(response.jwt)
        router.push("/")
      } catch (error) {
        if(ENV.IS_DEV) {
          console.log('Login error', error);
        }
      }
    }
  })
  return (
    <section className='flex flex-grow h-full items-center'>
      <div className='w-full max-w-[460px] mx-auto mb-10 container'>
      <form onSubmit={formik.handleSubmit}>
          <div className="mb-2.5">
            <label htmlFor="identifier" className="block text-gray-700">
              Email or username:
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              className={`w-full px-4 py-2 border ${formik.errors.identifier && formik.touched.identifier ? 'border-red-500' : 'border-gray-400'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Email or username"
              onChange={formik.handleChange}
              value={formik.values.identifier}
            />
            {formik.errors.identifier && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.identifier}</p>
            )}
          </div>
          <div className="mb-2.5">
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`w-full px-4 py-2 border ${formik.errors.password && formik.touched.password ? 'border-red-500' : 'border-gray-400'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Password"
              onChange={formik.handleChange}
            />
            {formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            disabled={formik.isSubmitting}
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  )
}

export default LoginForm