import { useFormik } from 'formik';
import { initialValues, validationSchema } from './edit-password-form.form';
import { useAuth } from '@/hooks';
import { User } from '@/api';
import { 
  SettingsMenu
} from "@/components";

export function EditPasswordForm() {
  const { user, updateUser } = useAuth();
  const userCtrl = new User();
  
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false, // prevent validation on input change
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateMe(user.id, { password: formValue.password });
        // falta el mail de verification y todo eso, para probar que el dueño es quien hizo
        // el cambio
        console.log('new password sent', formValue);
        formik.handleReset(); // reinicia el formulario y lo deja vacio
      } catch (error) {
        console.error(error);
      }
    }
  });

  return (
    <>
    <form 
      onSubmit={ formik.handleSubmit } 
      className="w-full"
    >
      <div className="mb-4">
        <label 
          htmlFor="oldPassword" 
          className="label"
        >
          Old Password
        </label>
        <input
          id="oldPassword"
          name="oldPassword"
          type="password"
          placeholder="Enter old password..."
          value={ formik.values.oldPassword }
          onChange={ formik.handleChange }
          className={`border border-gray-300 py-3 px-4 w-full rounded-lg ${
            formik.touched.location && formik.errors.location
              ? "border-red-500"
              : ""
          }`}
        />
      </div>
      <div className="mb-4">
        <label 
          htmlFor="password" 
          className="label"
        >
          New Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter new password..."
          value={formik.values.password}
          onChange={formik.handleChange}
          className={`border border-gray-300 py-3 px-4 w-full rounded-lg ${
            formik.touched.location && formik.errors.location
              ? "border-red-500"
              : ""
          }`}  
        />
      </div>
      <div className="mb-6">
        <label 
          htmlFor="repeatPassword" 
          className="label"
        >
          Repeat Password
        </label>
        <input
          id="repeatPassword"
          name="repeatPassword"
          type="password"
          placeholder="Repeat your new password..."
          value={formik.values.repeatPassword}
          onChange={ formik.handleChange }
          className={`border border-gray-300 py-3 px-4 w-full rounded-lg ${
            formik.touched.location && formik.errors.location
              ? "border-red-500"
              : ""
          }`}  
        />
      </div>
      <button
        type="submit"
        className="btn-primary ml-auto"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'Changing Password...' : 'Change Password'}
      </button>
    </form>
    </>
  )
}
