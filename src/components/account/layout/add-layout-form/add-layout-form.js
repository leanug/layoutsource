import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './add-layout-form-utils';
import { useAuth } from '@/hooks';
import { UserLayout } from '@/api'

export function AddLayoutForm () {
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
          image: formValue.image,
          title: formValue.title,
          status: false
        }
        await userLayoutCtrl.create(user.id, data)
        formik.handleReset() // reinicia el formulario y lo deja vacio
      } catch (error) {
        console.error(error);
      }
    }
  })

  return (
    <>
      <p>
        Have a website layout to suggest? You can submit the URL to the website and a link to the image representing the layout. Our team will review your suggestion, and if approved, it will be added to the site. Thank you for your contribution!
      </p>

      <Form onSubmit={ formik.handleSubmit }>
        <Form.Field>
          <label>Website URL</label>
          <Form.Input
            name="url"
            placeholder="https://..."
            value={formik.values.url}
            onChange={formik.handleChange}
            error={formik.errors.url}
          />
        </Form.Field>

        <Form.Field>
          <label>Website Title</label>
          <Form.Input
            name="title"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.errors.url}
          />
        </Form.Field>

        <Form.Field>
          <label>Image URL</label>
          <Form.Input
            name="image"
            placeholder="https://..."
            value={formik.values.image}
            onChange={formik.handleChange}
            error={formik.errors.image}
          />
        </Form.Field>

        <Button primary type="submit" loading={formik.isSubmitting}>
          Add Your Layout
        </Button>
      </Form>
    </>
  );
}