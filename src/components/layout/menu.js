import { useRouter } from "next/router"
import Link from 'next/link';
import { useEffect, useState } from "react"

const Menu = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter()

  const onSearchClick = () => {
    if (searchText.trim() !== "") {
      const encodedSearchText = encodeURIComponent(searchText);
      router.push(`/search?s=${encodedSearchText}`);
    }
  };

  return (
    <div className="flex flex-row">
      <nav className="p-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="/designs/home-pages">Home Pages</Link>
          </li>
          <li>
            <Link href="/designs/inner-pages">Inner Pages</Link>
          </li>
          <li>
            <Link href="/designs/landing-pages">Landing Pages</Link>
          </li>
          <li>
            <Link href="/designs/components">Components</Link>
          </li>
        </ul>
      </nav>
      <input
        id="search-layouts"
        className="p-2 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-purple-500"
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={ (e) => setSearchText(e.target.value) }
      />
      <button 
        className="w-28 h-10 rounded-lg justify-start items-start inline-flex"
        onClick={ onSearchClick }
      >
        <div className="px-4 py-2.5 bg-violet-500 rounded-lg shadow border border-violet-500 justify-center items-center gap-2 flex">
          <div className="text-white text-sm font-semibold font-inter leading-tight">
            Search
          </div>
        </div>
      </button>
    </div>
  )
}

export default Menu