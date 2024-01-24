import * as Yup from 'yup'

export function initialValues(initialData = {}) {
  return {
    name: initialData.name || '',
    email: initialData.email || '',
    //avatar: initialData.avatar || '',
    location: initialData.location || '',
    bio: initialData.bio || '',
    website: initialData.website || '',
    username: initialData.username || '',
  };
}

// Yup schema for the form validation
export function validationSchema() {
  return Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    bio: Yup.string().max(350, 'Bio must be at most 350 characters'),
    location: Yup.string().max(250, 'Location must be at most 250 characters'),
    website: Yup.string().url('Invalid URL format'),
    username: Yup.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be at most 20 characters'),
  });
}