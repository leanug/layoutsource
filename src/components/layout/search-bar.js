import { useState } from "react";
import { useRouter } from "next/router";

export function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (searchText.trim() !== "") {
        const encodedSearchText = encodeURIComponent(searchText);
        router.push(`/search?s=${encodedSearchText}`);
      }
    }
  };

  return (
    <input
      id="search-layouts"
      className="p-2 rounded-lg w-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-purple-500"
      type="text"
      placeholder="Search"
      value={searchText}
      onKeyDown={ handleKeyDown }
      onChange={ (e) => setSearchText(e.target.value) }
    />
  )
}