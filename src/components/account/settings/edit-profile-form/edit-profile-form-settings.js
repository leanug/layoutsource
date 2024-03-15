import * as Yup from 'yup'

export function initialValues(initialData = {}) {
  return {
    name: initialData.name || '',
    email: initialData.email || '',
    location: initialData.location || '',
    bio: initialData.bio || '',
    website: initialData.website || '',
    username: initialData.username || '',
  }
}

// Yup schema for the form validation
export function validationSchema() {
  return Yup.object({
    name: Yup.string()
      .max(100, 'Name must be at most 100 characters')
      .matches(
        /^[a-zA-Z\s\-']+$/,
        'Name can only contain letters, spaces, hyphens, and apostrophes',
      ),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    bio: Yup.string()
      .max(350, 'Bio must be at most 350 characters')
      .matches(
        /^[a-zA-Z0-9\s\-',.!?]+$/,
        'Bio can only contain letters, spaces, hyphens, and apostrophes',
      ),
    location: Yup.string()
      .max(250, 'Location must be at most 250 characters')
      .matches(
        /^[a-zA-Z0-9\s\-',.!?]+$/,
        'Bio can only contain letters, spaces, hyphens, and apostrophes',
      ),
    website: Yup.string().url('Invalid URL format'),
    username: Yup.string()
      .matches(
        /^[a-zA-Z0-9]+$/,
        'Username can only contain letters and numbers',
      )
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be at most 20 characters'),
  })
}
