import { Auth } from "@/api";
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./login-form.form";
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
        console.log(error);
      }
    }
  })
  return (
    <section className='flex flex-grow h-full items-center'>
      <div className='w-full max-w-[460px] mx-auto mb-10 container'>
        <form onSubmit={ formik.handleSubmit }>
          <div className="mb-2.5">
            <label htmlFor="identifier">Email or username:</label>
            <input
              name="identifier" /* Required by Strapi for login in */
              type="text" 
              error={ formik.errors.identifier }
              id="identifier" 
              className={`border ${formik.errors.identifier && formik.touched.identifier ? 'border-red-500' : 'border-gray-400'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}              
              placeholder="Email or username"
              onChange={ formik.handleChange }
              value={ formik.values.identifier }
            />
          </div>
          <div className="mb-2.5">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              error={ formik.errors.password }
              id="password"
              name="password" /* Required by Strapi for login in */
              className={`border ${formik.errors.password && formik.touched.password ? 'border-red-500' : 'border-gray-400'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}              placeholder="Password"
              onChange={ formik.handleChange }
            />
          </div>
          <button
           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
           type="submit"
           fluid
           loading={ formik.isSubmitting }
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  )
}

export default LoginForm