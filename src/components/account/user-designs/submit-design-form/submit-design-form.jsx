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
        <div className="mb-3">
          <label htmlFor="identifier" className="form-control w-full">
            <div className="label">
              <span className="label-text">Website Title</span>
            </div>
            <input
              type="text"
              id="title"
              name="title"
              className={`
                grow input input-bordered w-full
                ${formik.errors.title && formik.touched.title ? 'input-error' : ''}
              `}
              placeholder="Website Title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            {formik.errors.title && formik.touched.title && (
              <div className="label">
                <span className="label-text-alt text-red-500">{formik.errors.title}</span>
              </div>
            )}
          </label>
        </div>

        <div className="mb-6">
          <label htmlFor="identifier" className="form-control w-full">
            <div className="label">
              <span className="label-text">Website URL</span>
            </div>
            <input
              type="text"
              id="url"
              name="url"
              className={`
                grow input input-bordered w-full
                ${formik.errors.url && formik.touched.url ? 'input-error' : ''}
              `}
              placeholder="https://..."
              onChange={formik.handleChange}
              value={formik.values.url}
            />
            {formik.errors.url && formik.touched.url && (
              <div className="label">
                <span className="label-text-alt text-red-500">{formik.errors.url}</span>
              </div>
            )}
          </label>
        </div>

        <div className="w-full text-right">
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </div>
      </form>
    </div>
  )
}
