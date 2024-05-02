'use client'

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
      <button onClick={toggleDropdown} className=" btn">
        {selectedFilter}
        {dropdownVisible ? (
          <CaretUp className="w-4 h-4 p-0 fill-gray-800 dark:fill-gray-50 transform rotate-180 transition-transform duration-300" />
        ) : (
          <CaretDown className="w-4 h-4 fill-gray-800 dark:fill-gray-50" />
        )}
      </button>
      {dropdownVisible && (
        <ul className="absolute mt-14 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          {/* Additional content goes here */}
          <li>
            <button onClick={() => handleClick('updatedAt')}>Latest</button>
          </li>
          <li>
            <button onClick={() => handleClick('views')}>Popular</button>
          </li>
          <li>
            <button onClick={() => handleClick('likes')}>Likes</button>
          </li>
        </ul>
      )}
    </div>
  )
}
