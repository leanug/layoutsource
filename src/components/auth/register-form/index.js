import { useFormik } from "formik";
import { initialValues, validationSchema } from "./register-form.form";
import { Auth } from "@/api";
import { useRouter } from "next/router";

const authCtrl = new Auth()

function RegisterForm() {
  const router = useRouter()
  
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false, // prevent validation on input change
    onSubmit: async (formValue) => {
      try {
        const username = Math.floor(Math.random() * 10001) + '';
        await authCtrl.register({...formValue, username })
        router.push('/join/sign-in')
      } catch (error) {
        console.error(error);
      }
    }
  })

  return (
    <section className='flex flex-grow h-full items-center'>
      <div className='w-full max-w-[460px] mx-auto mb-10 container'>
        <form onSubmit={ formik.handleSubmit }>
          <div className="mb-2.5">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              error={ formik.errors.email }
              id="email" 
              className={`border ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-400'} rounded-md px-4 py-2`}              
              placeholder="Email"
              onChange={ formik.handleChange }
              value={ formik.values.email }
            />
          </div>
          <div className="mb-2.5">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              error={ formik.errors.password }
              id="password" 
              className={`border ${formik.errors.password && formik.touched.password ? 'border-red-500' : 'border-gray-400'} rounded-md px-4 py-2`}              
              placeholder="Password"
              onChange={ formik.handleChange }
              value={ formik.values.password }
            />
          </div>
          <button
           className="uppercase px-3 text-white bg-black py-1 w-24 text-center cursor-pointer"
           type="submit"
           fluid
           loading={ formik.isSubmitting }
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}

export default RegisterForm;
