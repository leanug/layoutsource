import React, { useState } from 'react'
import { ColorSelector } from '.'


export function DropdownMenu ({ handleSorting }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Latest')

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  }

  const handleClick = (sortBy) => {
    handleSorting(sortBy)
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
    return filterTextMap[sortBy] || sortBy;
  };


  return (
    <div className="relative flex justify-end">
      <button
        onClick={toggleDropdown}
        className={`py-2 px-4 bg-green-500 text-white rounded-lg ml-auto ${
          dropdownVisible ? 'ring ring-green-300' : ''
        }`}
      >
       { selectedFilter }
      </button>
      {
        dropdownVisible && (
          <div className="absolute z-40 mt-10 p-2 bg-gray-100 rounded-lg shadow-lg mr-0">
            {/* Additional content goes here */}
            <button 
              onClick={ () => handleClick('updatedAt') } 
              className="block hover:bg-gray-200 py-2 px-4 dark:text-gray-800"
            >
              Latest
            </button>
            <button 
              onClick={ () => handleClick('views') } 
              className="block hover:bg-gray-200 py-2 px-4 dark:text-gray-800"
            >
              Popular
            </button>
            <button 
              onClick={ () => handleClick('likes') } 
              className="block hover:bg-gray-200 py-2 px-4 dark:text-gray-800"
            >
              Likes
            </button>
            <ColorSelector />
          </div>
        )
      }
    </div>
  );
}