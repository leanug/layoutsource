import Image from 'next/image'
import { useState } from 'react'

import * as Yup from 'yup'
import { useFormik } from 'formik'

import { useAuth } from '@/hooks'
import { Upload, User } from '@/api'
import { useNotificationStore } from '@/store'

import fallbackImg from '@/assets/images/avatar.svg'

export function EditImageForm() {
  const [showButtons, setShowButtons] = useState(false)
  const { addNotification } = useNotificationStore()
  const { user, updateUser } = useAuth()

  const userCtrl = new User()
  const uploadCtrl = new Upload()

  const handleShowButtons = () => setShowButtons((showButtons) => !showButtons)

  /*
   * Change profile image
   * Steps:
   * 1.- Upload the image to the media folder and get the id of the uploaded image
   * 2.- Update the current user's avatar with the id of the image
   */
  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object({}),
    validateOnChange: false, // prevent validation on input change

    onSubmit: async (formFileData) => {
      // Don't upload until a file has been selected
      if (formFileData?.file) {
        // Check file type
        const allowedTypes = [
          'image/png',
          'image/jpeg',
          'image/jpg',
          'image/gif',
        ]
        if (!allowedTypes.includes(formFileData.file.type)) {
          addNotification(
            `
            Invalid file type. 
            Please select an image with format PNG, JPEG, JPG, or GIF.
          `,
            'error',
          )
          return
        }

        // Check file size (between 0 and 740 KB)
        const maxSize = 740 * 1024 // 740 KB in bytes
        if (formFileData.file.size <= 0 || formFileData.file.size > maxSize) {
          addNotification(
            `
            Invalid file size. Please select an image between 0 
            and ${maxSize / 1024} KB.`,
            'error',
          )
          return
        }

        // Upload the file
        const data = new FormData()
        data.append('files', formFileData?.file)
        const uploadResult = await uploadCtrl.upload(data)

        // Check if the upload was successful
        if (uploadResult.success) {
          const uploadedFileId = uploadResult.data[0].id
          const data = { avatar: uploadedFileId }

          // Link the avatar's id for the user in the User collection
          // to the id of the image uploaded to the media folder
          const updateMeResult = await userCtrl.updateMe(user.id, data)

          if (updateMeResult.success) {
            updateUser('avatar', uploadResult.data[0])
            addNotification(
              `
              Image updated successfully. Please note that changes may not be 
              reflected immediately.
            `,
              'success',
            )
          } else {
            addNotification(
              `
              Image upload failed. Please try again later.
            `,
              'error',
            )
          }
        } else {
          addNotification(`File upload failed.`, 'error')
        }
      }
    },
  })

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-row gap-3 items-center">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <Image
            src={user.avatar?.url || fallbackImg}
            alt="User Avatar"
            width={'30'}
            height={'30'}
            className="w-full h-full object-cover rounded-full"
            placeholder="empty" // use 'empty' for a blank placeholder
          />
        </div>

        {!showButtons && (
          <button className="btn btn-primary dark:text-white" onClick={handleShowButtons}>
            Upload a new image
          </button>
        )}

        <form onSubmit={formik.handleSubmit}>
          {showButtons ? (
            <>
              <div>
                <input
                  className="mb-1.5"
                  id="file"
                  name="file"
                  type="file"
                  onChange={(event) => {
                    formik.setFieldValue('file', event.currentTarget.files[0])
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formik.isSubmitting}
              >
                Upload image
              </button>
            </>
          ) : null}
        </form>
      </div>
    </div>
  )
}
