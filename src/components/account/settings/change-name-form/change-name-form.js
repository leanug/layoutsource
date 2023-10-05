import { useFormik } from 'formik'
import { initialValues, validationSchema } from './change-name-form.form';
import { useAuth } from '@/hooks';
import { User } from '@/api'

export function ChangeNameForm() {
  const { user } = useAuth()
  const userCtrl = new User()
  
  const formik = useFormik({
    initialValues: initialValues(user?.name),
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
    <form onSubmit={ formik.handleSubmit }>
      <input
        name="name"
        label="New Name"
        placeholder="Enter new name..."
        value={ formik.values.name }
        onChange={ formik.handleChange }
        error={ formik.errors.name }
      />
      
      <button primary type="submit" loading={ formik.isSubmitting }>
        Change Name
      </button>
    </form>
  );
}