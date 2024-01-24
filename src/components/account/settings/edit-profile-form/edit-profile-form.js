import { useFormik } from 'formik'
import { 
  initialValues, 
  validationSchema 
} from './edit-profile-form-settings';
import { useAuth } from '@/hooks';
import { User } from '@/api'

export function EditProfileForm() {
  const { user } = useAuth()
  const userCtrl = new User()
 
  const initialData = {
    name: user.name || "",
    email: user.email || "",
    bio: user.bio || "",
    website: user.website || "",
    username: user.username || "",
  }

  const formik = useFormik({
    initialValues: initialValues(initialData),
    validationSchema: validationSchema(),
    validateOnChange: false, // prevent validation on input change

    onSubmit: async (formData) => {
      try {
        const result = await userCtrl.updateMe(user.id, formData)
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
  })

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-lg">
      <h2 className="font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
            value={ formik.values.name }
            className={`border border-gray-300 p-2 w-full rounded ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`border border-gray-300 p-2 w-full rounded ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Add the additional fields (bio, website, username) here */}
        {/* Example for the "Bio" field */}
        <div className="mb-4">
          <label htmlFor="bio" className="block text-gray-700 font-medium">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bio}
            className={`border border-gray-300 p-2 w-full rounded ${
              formik.touched.bio && formik.errors.bio
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.bio && formik.errors.bio && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.bio}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-medium">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
            className={`border border-gray-300 p-2 w-full rounded ${
              formik.touched.location && formik.errors.location
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.location && formik.errors.location && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.location}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="website" className="block text-gray-700 font-medium">
            Your website
          </label>
          <input
            type="text"
            id="website"
            name="website"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.website}
            className={`border border-gray-300 p-2 w-full rounded ${
              formik.touched.website && formik.errors.website
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.website && formik.errors.website && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.website}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={formik.isSubmitting}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}