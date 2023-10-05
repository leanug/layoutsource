import { useFormik } from 'formik'
import { initialValues, validationSchema } from './';
import { Collection } from "@/api"
import { useContext } from 'react';
import { NotificationContext } from "@/contexts"

const collectionCtrl = new Collection()

export function AddCollectionForm({ designId, userId, handleModal }) {
  let { handleNotification } = useContext(NotificationContext)
  const formik = useFormik({
    initialValues: initialValues('Title'),
    validationSchema: validationSchema(),
    validateOnChange: false, // prevent validation on input change

    onSubmit: async (formValue) => {
      try {
        const data = { 
          ...formValue,
          user: userId,
          designs: designId
        }
        /* controlar resultado, cerrar modal y mostrar notificacion man */
        const result = await collectionCtrl.create(data)

        if (! result.data ) {
          console.log(result.data);
          handleNotification({ 
            message: result.error,
            type: 'error'
          })
        } else {
          handleNotification({ 
            message: 'New collection created.',
            type: 'error'
          })
        }
      } catch (error) {
        handleNotification({ 
          message: 'Error creating collection. Try again later',
          type: 'error'
        })
      } finally {
        handleModal() // Close modal
      }
    }
  })

  return (
    <form onSubmit={ formik.handleSubmit }>
      {/* Title */}
      <div>
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          label="Collection title"
          placeholder="Title..."
          value={ formik.values.title }
          onChange={ formik.handleChange }
          error={ formik.errors.title }
        />
      </div>
      
      {/* Description */}
      <div>
        <label htmlFor="description">Collection Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description..."
          value={ formik.values.description }
          onChange={ formik.handleChange }
          error={ formik.errors.description }
        />
      </div>
      
      {/* Submit */}
      <button primary type="submit">
        Create collection
      </button>
      <button onClick={handleNotification}>Notifications</button>
    </form>
  )
}