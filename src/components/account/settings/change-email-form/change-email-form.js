import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './change-email-form.form';
import { useAuth } from '@/hooks';
import { User } from '@/api'

function ChangeEmailForm() {
  const { user } = useAuth()
  const userCtrl = new User()
  
  const formik = useFormik({
    initialValues: initialValues(user?.email),
    validationSchema: validationSchema(),
    validateOnChange: false, // prevent validation on input change
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateMe(user.id, formValue)
      } catch (error) {
        console.error(error);
      }
    }
  })

  return (
    <Form onSubmit={ formik.handleSubmit }>
      <Form.Input
        name="email"
        label="New Email"
        placeholder="Enter new email..."
        value={ formik.values.email }
        onChange={ formik.handleChange }
        error={ formik.errors.email }
      />
      
      <Button primary type="submit" loading={ formik.isSubmitting }>
        Change Email
      </Button>
    </Form>
  );
}

export default ChangeEmailForm;
