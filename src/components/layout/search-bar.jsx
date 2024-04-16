'user client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
    <div className="relative w-full form-control">
      <MagnifyingGlassSolid
        className={`
          w-5 h-5 fill-gray-400 dark:fill-gray-300 absolute left-5 top-1/2 
          transform -translate-y-1/2  text-gray-400
        `}
      />
      <input
        className={`
          pl-14 py-1 input input-bordered w-full bg-gray-50 dark:bg-gray-700
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