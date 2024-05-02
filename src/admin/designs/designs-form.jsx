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
    try {
      const response = await fetch('/api/admin/upload-design', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        console.log('Design created successfully')
        setFormData({
          title: '',
          link: '',
          slug: '',
          tags: '',
          image: '',
          cover: '',
        })
      } else {
        console.error('Error creating design:', response.statusText)
      }
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

          <div className="mb-2.5">
            <label htmlFor="cover" className="form-control w-full">
              <div className="label">
                <span className="label-text">Cover</span>
              </div>
              <input
                type="text"
                id="cover"
                name="cover"
                className="input input-bordered w-full"
                value={formData.cover}
                onChange={handleChange}
              />
            </label>
          </div>

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
