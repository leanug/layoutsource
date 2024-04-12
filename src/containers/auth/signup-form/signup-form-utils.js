import * as Yup from 'yup'

export function initialValues() {
  return {
    email: '',
    password: '',
  }
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email(true).required(true),
    password: Yup.string()
      .required('Please enter your password.')
      .min(8, 'Password must be at least 6 characters'),
  })
}
