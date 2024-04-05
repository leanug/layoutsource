import { useFormik } from 'formik'

import { initialValues, validationSchema } from './submit-design-form-utils'
import { useAuth } from '@/hooks'
import { UserLayout } from '@/api'
import { PrimaryButton } from '@/components'
import { useNotificationStore } from '@/store'

export function SubmitDesignForm() {
  const { addNotification } = useNotificationStore()
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
          status: false,
        }
        const response = await userLayoutCtrl.create(user.id, data)

        if (response.success) {
          // Notify the user of successful collection creation
          addNotification(`Your website was sent!`, 'success')
        } else {
          addNotification(`Oops! Something went wrong`, 'error')
        }
      } finally {
        formik.handleReset() // reinicia el formulario y lo deja vacio
      }
    },
  })

  return (
    <div className="max-w-xl mx-auto mt-20">
      <h1 className="text-xl font-medium mb-3">Add a website</h1>
      <p className="mb-5">
        Have a website layout to suggest? You can submit the URL to the website
        and a link to the image representing the layout. Our team will review
        your suggestion, and if approved, it will be added to the site. Thank
        you for your contribution!
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="label" htmlFor="title">
            Website Title
          </label>
          <input
            id="title"
            name="title"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            className={`form-input ${
              formik.errors.title
                ? 'border border-red-500'
                : 'border border-gray-300'
            }`}
          />
          {formik.errors.title && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="label" htmlFor="url">
            Website URL
          </label>
          <input
            id="url"
            name="url"
            placeholder="https://..."
            value={formik.values.url}
            onChange={formik.handleChange}
            className={`form-input ${
              formik.errors.url
                ? 'border border-red-500'
                : 'border border-gray-300'
            }`}
          />
          {formik.errors.url && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.url}</p>
          )}
        </div>
        <div className="w-full text-right mt-6">
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </div>
      </form>
    </div>
  )
}
