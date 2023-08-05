import * as Yup from 'yup'

export function initialValues() {
  return {
    url: '',
    title: '',
    image: '', 
  }
}

// Yup schema for the form validation
export function validationSchema() {
  return Yup.object({
    url: Yup.string().url().required('URL is required'),
    title: Yup.string(),
    image: Yup.string().url(),
  })
}