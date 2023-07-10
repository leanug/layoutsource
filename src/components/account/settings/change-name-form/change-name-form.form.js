import * as Yup from 'yup'

export function initialValues(name) {
  return {
    name: name || '' // retorna el nombre en el formulario de entrada
  }
}

// Yup schema for the form validation
export function validationSchema() {
  return Yup.object({
    name: Yup.string().required(true),
  })
}