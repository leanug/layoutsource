import * as Yup from 'yup'

export function initialValues() {
  return {
    email: '',
    repeatEmail: ''
  }
}

// Yup schema for the form validation
export function validationSchema() {
  return Yup.object({
    email: Yup.string().email().required(true),
    repeatEmail: Yup.string().email().required(true).oneOf([Yup.ref("email")], "The emails you entered do not match"),
  })
}