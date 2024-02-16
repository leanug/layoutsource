import * as Yup from 'yup'

export function initialValues() {
  return {
    password: '',
    repeatPassword: ''
  }
}

// Yup schema for the form validation
export function validationSchema() {
  return Yup.object({
    password: Yup.string().required(true),
    repeatPassword: Yup.string().required(true).oneOf([Yup.ref("password")], "The passwords you entered do not match"),
  })
}