import * as Yup from 'yup'

export function initialValues() {
  return {
    currentPassword: '',
    password: '',
    passwordConfirmation: '',
  }
}

export function validationSchema() {
  return Yup.object({
    currentPassword: Yup.string()
      .trim()
      .required('Current password is required')
      .min(6, 'Password must be at least 6 characters long')
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
        'Password can only contain letters, numbers, and special characters',
      ),

    password: Yup.string()
      .trim()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long')
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
        'Password can only contain letters, numbers, and special characters',
      ),

    passwordConfirmation: Yup.string()
      .trim()
      .required('Password confirmation is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  })
}
