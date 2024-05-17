import { useFormik } from 'formik'

import { initialValues, validationSchema } from '.'
import { generateRandomSlug } from '@/utils'
import { useCollectionStore, useNotificationStore } from '@/store'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useModalStore } from '@/store'


/**
 * AddCollectionForm component for creating a new collection.
 *
 * @param {Object} props - Component props.
 * @param {number} props.designId - The ID of the design associated with the collection.
 * @param {number} props.userId - The ID of the user creating the collection.
 * @param {function} props.handleModal - A function to handle modal state.
 * @returns {JSX.Element} - The rendered component.
 */
export function AddCollectionForm({ designId, userId }) {
  const { addNotification } = useNotificationStore()
  const { handleModal } = useModalStore()
  const { setCollections } = useCollectionStore()

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
          slug: 'col-' + generateRandomSlug(),
          totalDesigns: 1,
          user: userId,
        }

        // Create a new collection
        const response = await fetch('/api/collections/add', {
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if (response?.ok) {
          const result = await response.json()

          // Add the new collection to the collections store
          setCollections(result.data)
          console.log('data: ', data)
          // Update collection store
          addNotification('Collection created', 'success')
        } else {
          addNotification('Error creating collection', 'error')
        }
      } finally {
        // Reset the form and close the modal
        formik.handleReset()
        handleModal(false) // Close modal
      }
    },
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-3 mx-[4px]"
    >
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
            <span className="label-text-alt text-red-500">
              {formik.errors.title}
            </span>
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
            <span className="label-text-alt text-red-500">
              {formik.errors.description}
            </span>
          </div>
        )}
      </label>

      {/* Submit */}
      <button
        className="btn btn-primary no-animation mt-3 text-white"
        type="submit"
      >
        <PlusIcon className="h-6 w-6" /> Create collection
      </button>
    </form>
  )
}
