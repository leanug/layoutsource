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
    <div className="w-full">
      <form onSubmit={ formik.handleSubmit }>
        <div className="mb-5">
          <label 
            htmlFor="name" 
            className="label"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
            value={ formik.values.name }
            className={`border border-gray-300 py-3 px-4 w-full rounded-lg ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>
        <div className="mb-5">
          <label 
            htmlFor="email" 
            className="label"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`border border-gray-300 py-3 px-4 w-full rounded-lg ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-5">
          <label 
            htmlFor="bio" 
            className="label"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bio}
            className={`border border-gray-300 py-3 px-4 w-full rounded-lg ${
              formik.touched.bio && formik.errors.bio
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.bio && formik.errors.bio && (
            <p className="text-red-500 text-sm mt-1">{ formik.errors.bio }</p>
          )}
        </div>

        <div className="mb-5">
          <label 
            htmlFor="location" 
            className="label"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
            value={ formik.values.location }
            className={`border border-gray-300 py-3 px-4 w-full rounded-lg ${
              formik.touched.location && formik.errors.location
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.location && formik.errors.location && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.location}</p>
          )}
        </div>

        <div className="mb-5">
          <label 
            htmlFor="website" 
            className="label"
          >
            Your website
          </label>
          <input
            type="text"
            id="website"
            name="website"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.website}
            className={`border border-gray-300 py-3 px-4 w-full rounded-lg ${
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
          className="btn-primary ml-auto mt-6"
          disabled={formik.isSubmitting}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}