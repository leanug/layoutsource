import { useFormik } from 'formik'

import { initialValues, validationSchema } from '.';

import { useNotificationStore } from '@/store';

/**
 * AddCollectionForm component for creating a new collection.
 *
 * @param {Object} props - Component props.
 * @param {number} props.designId - The ID of the design associated with the collection.
 * @param {number} props.userId - The ID of the user creating the collection.
 * @param {function} props.handleModal - A function to handle modal state.
 * @returns {JSX.Element} - The rendered component.
 */
export function EditCollectionForm(props) {
  const { 
    userId, 
    collectionId, 
    description, 
    title, 
    collectionCtrl, 
    handleModal,
    setTitle,
    setDescription
  } = props

  const { addNotification } = useNotificationStore()

  const formik = useFormik({
    initialValues: initialValues(title, description),
    validationSchema: validationSchema(),
    validateOnChange: false, // prevent validation on input change

    /**
     * Handle form submission.
     *
     * @param {Object} formValue - The form values submitted.
     * @returns {Promise<void>} - A Promise that resolves when submission is complete.
     */
    onSubmit: async (formValue) => {
      try {
        const data = { ...formValue }
        
        // Create a new collection using the collectionCtrl service
        const response = await collectionCtrl.update(collectionId, data, userId)

        if(response?.success) {
          addNotification(response?.message || '', 'success')
          setTitle(formValue.title)
          setDescription(formValue.description)
        } else {
          addNotification(response?.error.message || '', 'error')
        }
      } finally {
        // Reset the form and close the modal
        formik.handleReset()
        handleModal() // Close modal
      }
    }
  })

  return (
    <form onSubmit={ formik.handleSubmit } className='flex flex-col gap-3'>
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-gray-700">Title:</label>
        <input
          name="title"
          label="Collection title"
          placeholder="Title..."
          value={ formik.values.title }
          onChange={ formik.handleChange }
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        {formik.errors.title && (
          <p className="text-red-500 text-sm">{ formik.errors.title }</p>
        )}
      </div>
      
      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-gray-700">Collection Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description..."
          value={ formik.values.description }
          onChange={ formik.handleChange }
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        {formik.errors.description && (
          <p className="text-red-500 text-sm">{formik.errors.description}</p>
        )}
      </div>
      
      {/* Submit */}
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mr-2"
        type="submit"
      >
        Update
      </button>
    </form>
  )
}