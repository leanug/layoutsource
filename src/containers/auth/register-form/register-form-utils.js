import * as Yup from 'yup'

export function initialValues() {
  return {
    username: '',
    email: '',
    password: '',
  }
}

export function validationSchema() {
  return Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters long'),
    email: Yup.string().email(true).required(true),
    password: Yup.string()
      .required('Please enter your password.')
      .min(8, 'Password must be at least 8 characters'),
  })
}
