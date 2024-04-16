'use client'

import { useState } from 'react'

import FormInput from './form-input'

function UploadDesignForm() {
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    slug: '',
    image: '',
    cover: '',
    tags: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formData)
    // Simulate uploading process
    try {
      // Your upload logic here
      // Example:
      // const formData = new FormData();
      // formData.append('file', file);
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();
      // console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="w-full max-w-[420px]">
      <div className="mx-auto container">
        <h1 className="form-title text-center mb-7">Upload Design</h1>

        {/* Upload form */}
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <FormInput
            label="Title"
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />
          {/* End Title */}

          <FormInput
            label="Link"
            id="link"
            name="link"
            type="text"
            value={formData.link}
            onChange={handleChange}
          />

          <FormInput
            label="Image"
            id="image"
            name="image"
            type="text"
            value={formData.image}
            onChange={handleChange}
          />

          <FormInput
            label="Cover"
            id="cover"
            name="cover"
            type="text"
            value={formData.cover}
            onChange={handleChange}
          />

          <FormInput
            label="Slug"
            id="slug"
            name="slug"
            type="text"
            value={formData.slug}
            onChange={handleChange}
          />

          <FormInput
            label="Tags"
            id="tags"
            name="tags"
            type="text"
            value={formData.tags}
            onChange={handleChange}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full relative mt-3"
          >
            Upload
          </button>
          {/* End Submit Button */}
        </form>
        {/* End Upload form */}
      </div>
    </section>
  )
}

export default UploadDesignForm
