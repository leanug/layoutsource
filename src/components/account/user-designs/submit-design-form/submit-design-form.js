import { useFormik } from 'formik'
import { ENV } from '@/utils';
import { initialValues, validationSchema } from './submit-design-form-utils';
import { useAuth } from '@/hooks';
import { UserLayout } from '@/api'

export function SubmitDesignForm () {
  const { user } = useAuth()

  const userLayoutCtrl = new UserLayout()
   
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false, // prevent validation on input change
    onSubmit: async (formValue) => {
      try {
        const data = {
          url: formValue.url,
          title: formValue.title,
          status: false
        }
        const response = await userLayoutCtrl.create(user.id, data)

        if(response?.data) {
          // Notify the user of successful collection creation
          /* handleNotification({ 
            message: 'Your website was sent!',
            type: 'success'
          }) */
        } else {
          ENV.IS_DEV && console.error('Bad Request ', error);
          handleNotification({ 
            message: 'Oops! Something went wrong',
            type: 'error'
          })
        }
      } catch (error) {
        ENV.IS_DEV && console.error('Something went wrong ', error);
        /* handleNotification({ 
          message: 'Oops! Something went wrong',
          type: 'error'
        }) */
      } finally {
        formik.handleReset() // reinicia el formulario y lo deja vacio
      }
    }
  })

  return (
    <div className='max-w-xl mx-auto mt-20'>
      <h1>Add a website</h1>
      <p className='mb-8'>
        Have a website layout to suggest? You can submit the URL to the website and a link to the image representing the layout. Our team will review your suggestion, and if approved, it will be added to the site. Thank you for your contribution!
      </p>
      <form onSubmit={ formik.handleSubmit }>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="title">
            Website Title
          </label>
          <input
            id="title"
            name="title"
            placeholder="Title"
            value={formik.values.title}
            onChange={ formik.handleChange }
            className={`bg-gray-200 rounded-md p-2 focus:outline-none w-full ${
              formik.errors.title ? 'border border-red-500' : 'border border-gray-300'
            }`}
          />
          { formik.errors.title && (
            <p className="text-red-500 text-xs mt-1">{ formik.errors.title }</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="url">
            Website URL
          </label>
          <input
            id="url"
            name="url"
            placeholder="https://..."
            value={ formik.values.url }
            onChange={ formik.handleChange }
            className={`bg-gray-200 rounded-md p-2 focus:outline-none w-full ${
              formik.errors.url ? 'border border-red-500' : 'border border-gray-300'
            }`}
          />
          {formik.errors.url && (
            <p className="text-red-500 text-xs mt-1">{ formik.errors.url }</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}