import { useState } from 'react'
import { useRouter } from 'next/router'

import { MagnifyingGlassSolid } from '@/components'

export function SearchBar() {
  const [searchText, setSearchText] = useState('')
  const router = useRouter()

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (searchText.trim() !== '') {
        const encodedSearchText = encodeURIComponent(searchText)
        router.push(`/search?s=${encodedSearchText}`)
      }
    }
  };

  return (
    <div className="relative w-full">
      <MagnifyingGlassSolid 
        className={`
          w-5 h-5 fill-gray-400 dark:fill-gray-300 absolute left-5 top-1/2 
          transform -translate-y-1/2  text-gray-400
        `}
      />
      <input
        id="search-layouts"
        className={`
          pl-14 p-2.5 rounded-lg w-full border border-gray-300 placeholder-gray-400 
          dark:text-white  focus:border-blue-500 font-normal
          bg-gray-50 dark:bg-gray-700 dark:border-gray-600
          ring-blue-100 focus:ring focus:outline-none
        `}
        type="text"
        placeholder="Search"
        value={searchText}
        onKeyDown={handleKeyDown}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  )
}