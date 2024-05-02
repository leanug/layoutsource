'use client'

import { useEffect, useState } from 'react'

import FormInput from './form-input'

function CreateSubcategoryForm() {
  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [parentSlug, setParentSlug] = useState('')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories/get')
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        } else {
          throw new Error('Failed to fetch categories')
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleParentSlugChange = (event) => {
    setParentSlug(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log({ title, selectedCategory })
      const slug = title.toLowerCase().replace(/\s+/g, '-')
      const response = await fetch('/api/admin/create-subcat', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          title,
          parentSlug,
          parent: selectedCategory,
          slug,
        }),
      })

      if (response.ok) {
        console.log('Subcategory created successfully')
      } else {
        console.error('Error creating subcategory:', response.statusText)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="w-full max-w-[420px]">
      <div className="mx-auto container">
        <h1 className="form-title text-center mb-7">Create subcategory</h1>

        {/* Upload form */}
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <FormInput
            label="Title"
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
          {/* End Title */}

          {/* Select category */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Select a Category:</span>
            </div>
            <select
              className="select select-bordered"
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="" disabled>
                Pick one
              </option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
          {/* End Select category */}

          {/* Checkbox for parentSlug */}
          <div className="form-control">
            <span className="label-text">Parent Slug:</span>
            <label className="cursor-pointer">
              <input
                type="checkbox"
                value="homepages"
                checked={parentSlug === 'homepages'}
                onChange={handleParentSlugChange}
              />
              <span className="ml-2">Homepages</span>
            </label>
            <label className="cursor-pointer">
              <input
                type="checkbox"
                value="subpages"
                checked={parentSlug === 'subpages'}
                onChange={handleParentSlugChange}
              />
              <span className="ml-2">Subpages</span>
            </label>
            <label className="cursor-pointer">
              <input
                type="checkbox"
                value="components"
                checked={parentSlug === 'components'}
                onChange={handleParentSlugChange}
              />
              <span className="ml-2">Components</span>
            </label>
          </div>
          {/* End Checkbox for parentSlug */}

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

export default CreateSubcategoryForm
