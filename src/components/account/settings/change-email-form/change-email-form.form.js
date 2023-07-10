import * as Yup from 'yup'

export function initialValues(email) {
  return {
    email: email || '' // retorna el nombre en el formulario de entrada
  }
}

// Yup schema for the form validation
export function validationSchema() {
  return Yup.object({
    email: Yup.string().email().required(true),
  })
}