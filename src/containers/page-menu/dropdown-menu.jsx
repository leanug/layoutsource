import React, { useState } from 'react'
import { CaretDown, CaretUp } from '@/components'

export function DropdownMenu({ setSortBy }) {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('Latest')

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }

  const handleClick = (sortBy) => {
    setSortBy(sortBy)
    toggleDropdown()
    setSelectedFilter(getFilterText(sortBy))
  }

  const getFilterText = (sortBy) => {
    // Mapping sortBy values to their corresponding text representations
    const filterTextMap = {
      updatedAt: 'Latest',
      views: 'Popular',
      likes: 'Likes',
    }

    // Return the mapped text for the given sortBy value
    // If no mapping is found, it defaults to the original sortBy value
    return filterTextMap[sortBy] || sortBy
  }

  return (
    <div className="relative flex justify-end">
      <button
        onClick={toggleDropdown}
        className={`
          py-2 pl-4 pr-3 border-gray-200 dark:border-gray-400 border rounded-lg ml-auto
          flex items-center gap-5
          ${dropdownVisible ? 'ring ring-blue-200 border-blue-300' : ''}
        `}
      >
        {selectedFilter}
        {dropdownVisible ? (
          <CaretUp className="w-6 h-6 p-0 fill-gray-800 dark:fill-gray-50 transform rotate-180 transition-transform duration-300" />
        ) : (
          <CaretDown className="w-6 h-6 fill-gray-800 dark:fill-gray-50" />
        )}
      </button>
      {dropdownVisible && (
        <div className="absolute z-40 mt-12 p-4 bg-white rounded-lg shadow-lg mr-0 w-44 border-gray-300">
          {/* Additional content goes here */}
          <button
            onClick={() => handleClick('updatedAt')}
            className="block hover:bg-gray-50 py-2 px-4 dark:text-gray-800 w-full text-start"
          >
            Latest
          </button>
          <button
            onClick={() => handleClick('views')}
            className="block hover:bg-gray-50 py-2 px-4 dark:text-gray-800 w-full text-start"
          >
            Popular
          </button>
          <button
            onClick={() => handleClick('likes')}
            className="block hover:bg-gray-50 py-2 px-4 dark:text-gray-800 w-full text-start"
          >
            Likes
          </button>
        </div>
      )}
    </div>
  )
}
