import * as Yup from 'yup'

export function initialValues() {
  return {
    identifier: '',
    password: ''
  }
}

export function validationSchema() {
  return Yup.object({
    identifier: Yup.string().required('Email or username is required'),
    password: Yup.string().required('Password is required')
  })
}