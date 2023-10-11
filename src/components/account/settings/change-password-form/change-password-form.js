import { useFormik } from 'formik'
import { initialValues, validationSchema } from './change-password-form.form';
import { useAuth } from '@/hooks';
import { User } from '@/api'

export function ChangePasswordForm() {
  const { user, updateUser } = useAuth()
  const userCtrl = new User()
  
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false, // prevent validation on input change
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateMe(user.id, { password: formValue.password })
        // falta el mail de verification y todo eso, para probar que el dueño es quien hizo
        // el cambio
        console.log('new password sent', formValue);
        formik.handleReset() // reinicia el formulario y lo deja vacio
      } catch (error) {
        console.error(error);
      }
    }
  })

  return (
    <form onSubmit={ formik.handleSubmit }>
      <input
        name="password"
        label="New Password"
        placeholder="Enter new password..."
        value={ formik.values.password }
        onChange={ formik.handleChange }
        error={ formik.errors.password }
        type="password"
      />
      <input
        name="repeatPassword"
        label="Repeat Password"
        placeholder="Repeat your new password..."
        value={ formik.values.repeatPassword }
        onChange={ formik.handleChange }
        error={ formik.errors.repeatPassword }
      />

      <button primary type="submit" loading={ formik.isSubmitting }>
        Change Password
      </button>
    </form>
  );
}
