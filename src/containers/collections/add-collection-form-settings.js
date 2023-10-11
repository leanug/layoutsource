import * as Yup from 'yup'

export function initialValues(title, description) {
  return {
    title: title || '', 
    description: description || ''
  }
}

// Yup schema for the form validation
export function validationSchema() {
  return Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string() 
  })
}