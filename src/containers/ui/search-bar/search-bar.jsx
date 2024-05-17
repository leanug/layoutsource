'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid'

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
  }

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      const encodedSearchText = encodeURIComponent(searchText)
      router.push(`/search?s=${encodedSearchText}`)
    }
  }

  const clearSearchText = () => {
    setSearchText('')
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="relative form-control w-full">
        <button
          onClick={clearSearchText}
          className="absolute btn-sm right-3 top-1/2 transform -translate-y-1/2 btn btn-circle"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
        <input
          className="py-1 input input-bordered w-full"
          type="text"
          placeholder="Search"
          value={searchText}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <button onClick={handleSearch} className="btn btn-square">
        <MagnifyingGlassIcon className="w-6 h-6" />
      </button>
    </div>
  )
}
