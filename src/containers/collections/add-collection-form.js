import { useFormik } from 'formik'
import { initialValues, validationSchema } from './'
import { Collection } from '@/api'
import { generateRandomSlug } from '@/utils'
import { useNotificationStore } from '@/store'
import { PrimaryButton } from '@/components'

const collectionCtrl = new Collection()

/**
 * AddCollectionForm component for creating a new collection.
 *
 * @param {Object} props - Component props.
 * @param {number} props.designId - The ID of the design associated with the collection.
 * @param {number} props.userId - The ID of the user creating the collection.
 * @param {function} props.handleModal - A function to handle modal state.
 * @returns {JSX.Element} - The rendered component.
 */
export function AddCollectionForm({ designId, userId, handleModal }) {
  const { addNotification } = useNotificationStore()

  const formik = useFormik({
    initialValues: initialValues(),
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
        const data = {
          ...formValue,
          designs: [designId],
          slug: generateRandomSlug(),
          totalDesigns: 1,
          user: userId,
        }

        // Create a new collection using the collectionCtrl service
        const response = await collectionCtrl.create(data)

        if (response?.success) {
          addNotification(response?.message || '', 'success')
        } else {
          addNotification(response?.error.message || '', 'error')
        }
      } finally {
        // Reset the form and close the modal
        formik.handleReset()
        handleModal() // Close modal
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
      {/* Title */}
      <div className="px-[2px]">
        <label htmlFor="title" className="block">
          Title:
        </label>
        <input
          name="title"
          id="title"
          label="Collection title"
          placeholder="Title..."
          value={formik.values.title}
          onChange={formik.handleChange}
          className={`
            form-input
            ${formik.errors.title && formik.touched.title ? 'border-red-500' : 'border-gray-300'}
          `}
        />
        {formik.errors.title && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div className="px-[2px]">
        <label htmlFor="description" className="block">
          Collection Description:
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Description..."
          value={formik.values.description}
          onChange={formik.handleChange}
          className={`
          form-input
            ${formik.errors.description && formik.touched.description ? 'border-red-500' : 'border-gray-300'}
          `}
        />
        {formik.errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.description}
          </p>
        )}
      </div>

      {/* Submit */}
      <PrimaryButton type="submit">Create collection</PrimaryButton>
    </form>
  )
}
