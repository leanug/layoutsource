import { useFormik } from 'formik'
import { initialValues, validationSchema } from '.'
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
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 mx-[4px]">
      {/* Title */}
      <label htmlFor="title" className="form-control w-full">
        <div className="label">
          <span className="label-text">Title:</span>
        </div>
        <input
          name="title"
          id="title"
          label="Collection title"
          placeholder="Title..."
          value={formik.values.title}
          onChange={formik.handleChange}
          className={`
            input input-bordered w-full
            ${formik.errors.title && formik.touched.title ? 'input-error' : ''}
          `}
        />
        {formik.errors.title && (
          <div className="label">
            <span className="label-text-alt text-red-500">{formik.errors.title}</span>
          </div>
        )}
      </label>

      {/* Description */}
      <label htmlFor="description" className="form-control w-full">
        <div className="label">
          <span className="label-text">Collection Description:</span>
        </div>
        <textarea
          id="description"
          name="description"
          placeholder="Description..."
          value={formik.values.description}
          onChange={formik.handleChange}
          className={`
            textarea textarea-bordered w-full
            ${formik.errors.description && formik.touched.description ? 'input-error' : ''}
          `}
        />
        {formik.errors.description && (
          <div className="label">
            <span className="label-text-alt text-red-500">{formik.errors.description}</span>
          </div>
        )}
      </label>
      
      {/* Submit */}
      <button className="btn btn-primary mt-3 text-white" type="submit">Create collection</button>
    </form>
  )
}
